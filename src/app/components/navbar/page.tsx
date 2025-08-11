'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [visible, setVisible] = useState(false);


    const handleVisible = () => {
        setVisible((prev) => !prev);
    };


    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("http://localhost:5000/api/users/me", {
                    credentials: "include",
                });
                if (!res.ok) {
                    setUser(null);
                    return;
                }
                const data = await res.json();
                setUser(data);
            } catch {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

 
    const onLogout = async () => {
        try {
            await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            setVisible(false);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="flex justify-between p-6 border-1">
            <div>LOGO</div>
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
                            className="cursor-pointer bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                        >
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {visible && (
                        <button
                            onClick={onLogout}
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
