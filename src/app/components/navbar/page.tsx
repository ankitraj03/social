'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [visible, setVisible] = useState(false);


    const handleVisible = () => {
        setVisible((prev) => !prev);
    };


    const handleLogout = async () => {
    await logout();
    setVisible(false);
  };

    return (
        <div className="flex justify-between p-6 border-1">
            <div>GOSSIP<span className="text-amber-300">BOX</span></div>
            <div>
                <ul className="flex items-center gap-4">
                    <li>btn1</li>
                    <li>btn2</li>
                    <li>btn3</li>

                    {!user ? (
                        <Link href="/auth/login">Get Started</Link>
                    ) : (
                        <div
                            onClick={handleVisible}
                            className="cursor-pointer bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                        >
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {visible && (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
