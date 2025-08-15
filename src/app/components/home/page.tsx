"use client";
import { useState, useEffect } from "react";
import Cards from "../cards/page";
import { useAuth } from "@/context/AuthContext";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";

type Post = {
  _id?: string;
  username: string;
  gossip: string;
  time: string;
  upvote?: number;
  downvote?: number;
};

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const Home = () => {
  const API_POST_SAVE =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api/post/share";

  const { user } = useAuth();
  const [gossip, setGossip] = useState("");
  const [messages, setMessages] = useState<Post[]>([]);

  useEffect(() => {
    
    const fetchGossips=async()=>{
      try{
        const res=await fetch('http://localhost:5000/api/post/gossips');
        const data= await res.json();
        setMessages(data);
      }catch{
        console.error("Error fetching gossips:");
      }
    };
    fetchGossips();



    socket.on("gossipBroadcast", (msg: Post) => {
      console.log("📩 New gossip:", msg);
      setMessages((prev) => [msg,...prev]); 
      console.log("✅ Connected to Socket.IO:", socket.id);
    });

    return () => {
      socket.off("gossipBroadcast");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGossip(e.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    if (!gossip.trim()) return;

    const submission: Post = {
      username: user?.username || "Anonymous",
      gossip,
      time: new Date().toISOString(),
      upvote: 0,
      downvote: 0,
    };

    try {
      const res = await fetch(API_POST_SAVE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (!res.ok) {
        const text = await res.text();
        throw Error(`Save failed: ${text}`);AbortController
      }

      socket.emit("newGossip", submission); 
      setGossip("");
    } catch (error) {
      console.error("Error submitting gossip:", error);
    }
  };


  

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="p-4 lg:p-14 ">
        <div className="flex">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg">
            {user ? user.username.charAt(0).toUpperCase() : <FaUser />}
          </div>

          <input
            type="text"
            name="gossip"
            value={gossip}
            onChange={handleChange}
            placeholder="share your thoughts"
            className="border-0 mx-5 border-b-1 text-gray-700 w-[80%] focus:outline-none"
          />
          <span
            onClick={handleSubmit}
            className="lg:bg-gray-600 text-center py-1 px-2 lg:py-4 lg:px-8 rounded-2xl cursor-pointer"
          >
            <FaPaperPlane />
          </span>
        </div>
      </div>

      <hr className="text-white w-full" />
      <hr className="text-white my-8 w-full" />

      <div className="flex-1 overflow-y-auto scroll-auto">
        {messages.map((msg, i) => (
          <div
            key={msg._id ?? `${msg.time}-${i}`}
            className="p-4 border-b border-gray-300 text-white"
          >
            <strong>{msg.username}:</strong> {msg.gossip}
            <div className="text-xs text-gray-500">
              {new Date(msg.time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Home;
