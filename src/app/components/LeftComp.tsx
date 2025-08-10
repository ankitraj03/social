import { FaHome, FaFire, FaUser } from "react-icons/fa";

const LeftComp = () => {
    return (
        <div className="w-[15%] bg-black text-white py-4 flex flex-col justify-between">

            <div className="space-y-4 px-4">
                <div className="space-y-3 border-b border-gray-700 pb-4">
                    <div className="flex items-center space-x-2">
                        <FaHome size={20} />
                        <span>Home</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaFire size={20} />
                        <span>Popular</span>
                    </div>
                </div>


                <div className="border-b border-gray-700 pb-4">
                    <h2 className="text-lg font-bold text-gray-400 mb-3">Active Users</h2>
                    <div className="space-y-3">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <FaUser size={18} />
                                <span>user</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center space-x-2">
                        <span className="text-center">Home</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="mx-5">Home</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="mx-5">Home</span>
                    </div>

                <div className="text-center p-6">
                    <FaUser size={36} className="mx-auto" />
                </div>
            </div>

        </div>
    );
};

export default LeftComp;
