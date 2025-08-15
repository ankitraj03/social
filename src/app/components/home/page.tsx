"use client";
import { useState, useEffect } from "react";
import { FaUser, FaPaperPlane, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";

type Post = {
  _id?: string;
  username: string;
  gossip: string;
  time: string;
  upvote?: number;
  downvote?: number;
};

type VoteStatus = "up" | "down" | null;

const Home = () => {
  const API_POST_SAVE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/post/share";

  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const [gossip, setGossip] = useState("");
  const [messages, setMessages] = useState<Post[]>([]);
  const [votes, setVotes] = useState<Record<string, VoteStatus>>({});

  useEffect(() => {
    const fetchGossips = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/post/gossips");
        const data = await res.json();
        setMessages(data.reverse());
      } catch (error) {
        console.error("Error fetching gossips:", error);
      }
    };
    fetchGossips();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("gossipBroadcast", (msg: Post) => {
      setMessages((prev) => [msg, ...prev]);
    });

    return () => {
      socket.off("gossipBroadcast");
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGossip(e.target.value);
  };

  const handleSubmit = async () => {
    if (!user) return alert("Please login first");
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

      if (!res.ok) throw new Error("Save failed");

      socket?.emit("newGossip", submission);
      setGossip("");
    } catch (error) {
      console.error("Error submitting gossip:", error);
    }
  };

const handleUpvote = async (id?: string) => {
  if (!id) return;
  const currentVote = votes[id];
  let voteType: "up" | "none" | "switch" = "up";

  if (currentVote === "up") voteType = "none"; // undo
  else if (currentVote === "down") voteType = "switch"; // switch

  try {
    const res = await fetch(`http://localhost:5000/api/post/upvote/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: voteType }),
    });
    const updatedGossip: Post = await res.json();

    setMessages((prev) =>
      prev.map((msg) => (msg._id === id ? updatedGossip : msg))
    );

    setVotes((prev) => ({
      ...prev,
      [id]: voteType === "none" ? null : "up",
    }));
  } catch (err) {
    console.error("Upvote failed:", err);
  }
};

const handleDownvote = async (id?: string) => {
  if (!id) return;
  const currentVote = votes[id];
  let voteType: "down" | "none" | "switch" = "down";

  if (currentVote === "down") voteType = "none"; // undo
  else if (currentVote === "up") voteType = "switch"; // switch

  try {
    const res = await fetch(`http://localhost:5000/api/post/downvote/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: voteType }),
    });
    const updatedGossip: Post = await res.json();

    setMessages((prev) =>
      prev.map((msg) => (msg._id === id ? updatedGossip : msg))
    );

    setVotes((prev) => ({
      ...prev,
      [id]: voteType === "none" ? null : "down",
    }));
  } catch (err) {
    console.error("Downvote failed:", err);
  }
};


  return (
    <div className="w-full flex flex-col flex-1">
      <div className="p-4 lg:p-14">
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

      <div className="flex-1 overflow-y-auto scroll-auto space-y-4 px-4">
        {messages.map((msg, i) => (
          <div
            key={msg._id ?? `${msg.time}-${i}`}
            className="p-4 border-b border-gray-300 text-white flex justify-between items-start"
          >
            <div>
              <strong>{msg.username}:</strong> {msg.gossip}
              <div className="text-xs text-gray-500">
                {new Date(msg.time).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center space-y-2 ml-4">
              <button
                onClick={() => handleUpvote(msg._id)}
                className={`hover:text-green-400 ${
                  votes[msg._id || ""] === "up" ? "text-green-400" : ""
                }`}
              >
                <FaArrowUp />
                <span className="ml-1 text-sm">{msg.upvote || 0}</span>
              </button>
              <button
                onClick={() => handleDownvote(msg._id)}
                className={`hover:text-red-400 ${
                  votes[msg._id || ""] === "down" ? "text-red-400" : ""
                }`}
              >
                <FaArrowDown />
                <span className="ml-1 text-sm">{msg.downvote || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
