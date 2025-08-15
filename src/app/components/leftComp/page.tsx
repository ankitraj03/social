"use client";
import { FaHome, FaFire, FaUser } from "react-icons/fa";
import { useSocket } from "@/context/SocketContext";

const LeftComp = () => {
    const { onlineUsers } = useSocket();

    return (
        <>

            <div className="hidden lg:flex w-[15%] h-full bg-black text-white py-4 flex-col justify-between">
                <div className="space-y-4 px-4">
                    <div className="space-y-3 border-b border-gray-700 pb-4">
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                            <FaHome size={20} />
                            <span>Home</span>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                            <FaFire size={20} />
                            <span>Popular</span>
                        </div>
                    </div>

                    <div className="border-b border-gray-700 pb-4">
                        <h2 className="text-lg font-bold text-gray-400 mb-3">Active Users</h2>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {onlineUsers.length > 0 ? (
                                onlineUsers.map((user, index) => (
                                    <div
                                        key={user._id || user.socketId || index} 
                                        className="flex items-center space-x-2"
                                    >
                                        <FaUser size={18} />
                                        <span>{user.username}</span>
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-500">No users online</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center p-6">
                    <FaUser size={36} className="mx-auto" />
                </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-black text-white flex justify-around py-3 border-t border-gray-700 z-50">
                <button className="flex flex-col items-center text-sm hover:text-gray-300">
                    <FaHome size={20} />
                    <span className="text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center text-sm hover:text-gray-300">
                    <FaFire size={20} />
                    <span className="text-xs">Popular</span>
                </button>
                <button className="flex flex-col items-center text-sm hover:text-gray-300">
                    <FaUser size={20} />
                    <span className="text-xs">Profile</span>
                </button>
            </div>
        </>
    );
};

export default LeftComp;
