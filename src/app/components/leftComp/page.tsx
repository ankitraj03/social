import { FaHome, FaFire, FaUser } from "react-icons/fa";

const LeftComp = () => {
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
