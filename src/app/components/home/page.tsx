"use client";
import { useState, useEffect } from "react";
import Cards from "../cards/page";
import { useAuth } from "@/context/AuthContext";
import { FaUser, FaPaperPlane } from "react-icons/fa";

type Post = {
  _id?: string;
  username: string;
  gossip: string;
  time: string;
  upvote?: number;
  downvote?: number;
};

const Home = () => {
  const API_POST_SAVE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/post/share";
  // const API_POST_GET =
  //   API_POST_SAVE.replace(/\/share\/?$/i, "") || "http://localhost:5000/api/post";

  const { user } = useAuth();

  const [gossip, setGossip] = useState("");
  const [messages, setMessages] = useState<Post[]>([]);

  const addMessage = (msg: Post) => {
    setMessages((prev) => {
      const exists = prev.some((m) => {
        if (m._id && msg._id) return m._id === msg._id;
        return (
          m.time === msg.time &&
          m.username === msg.username &&
          m.gossip === msg.gossip
        );
      });
      if (exists) return prev;
      return [msg, ...prev];
    });
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await fetch(API_POST_GET);
  //       const data = await res.json();
  //       const posts: Post[] = Array.isArray(data) ? data.reverse() : [];
  //       setMessages(posts);
  //     } catch (err) {
  //       console.error("Error fetching posts:", err);
  //     }
  //   };

  //   fetchPosts();
  // }, [API_POST_GET]);

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
        throw new Error(`Save failed: ${text}`);
      }

      const saved: Post = await res.json();
      addMessage(saved);
      setGossip("");
    } catch (error) {
      console.error("Error submitting gossip:", error);
    }
  };

  return (
    <div className="w-[70%] border-l-1 border-r-1">
      <div className="p-14">
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
            className="border-0 mx-5 border-b-1 text-gray-700 w-[80%] focus:outline-none focus:border-b-1 focus:ring-0"
          />
          <span
            onClick={handleSubmit}
            className="bg-gray-600 text-center py-4 px-8 rounded-2xl cursor-pointer"
          >
            <FaPaperPlane />
          </span>
        </div>
      </div>
      <hr className="text-white w-full" />
      <hr className="text-white my-8 w-full" />

      <div>
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

      <div>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
