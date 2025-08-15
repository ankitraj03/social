"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

type Gossip = {
  _id?: string;
  username: string;
  gossip: string;
  time: string;
  upvote?: number;
  downvote?: number;
};

const RightComp = () => {
  const [topGossip, setTopGossip] = useState<Gossip | null>(null);

  useEffect(() => {
    const fetchTopGossip = async () => {
      try {
        const res = await fetch("https://social-app-backend-yqfv.onrender.com/api/post/gossip/top");
        if (!res.ok) throw new Error("Failed to fetch top gossip");
        const data: Gossip = await res.json();
        setTopGossip(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopGossip();
  }, []);

  return (
    <div className="hidden lg:block lg:w-[25%] lg:bg-black lg:text-white">
      <div className="lg:p-4 w-[90%]">
        <div className="flex items-center bg-white rounded-md overflow-hidden m-3">
          <input
            type="text"
            placeholder="search"
            className="flex-1 px-3 py-2 text-black outline-none"
          />
          <div className="px-3">
            <FaSearch className="text-black" />
          </div>
        </div>

        <div className="border border-gray-500 rounded-xl p-4">
          <h2 className="text-xl font-bold">Gossip Of The</h2>
          <h2 className="text-xl font-bold border-b border-gray-500 mb-2">
            Day
          </h2>
          {topGossip ? (
            <div>
              <p className="text-sm leading-5 mb-2">{topGossip.gossip}</p>
              <p className="text-xs text-gray-400">
                — {topGossip.username} | {new Date(topGossip.time).toLocaleString()}
              </p>
              <p className="text-xs text-green-400 mt-1">
                Upvotes: {topGossip.upvote || 0}
              </p>
            </div>
          ) : (
            <p className="text-sm leading-5">
              No gossip available yet. Be the first to share!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightComp;
