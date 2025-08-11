import { FaSearch } from "react-icons/fa";

const RightComp = () => {
  return (
    <div className="w-[15%] bg-black text-white p-4 space-y-6">
      

      <div className="flex items-center bg-white rounded-md overflow-hidden">
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
        <h2 className="text-xl font-bold border-b border-gray-500 mb-2">Day</h2>
        <p className="text-sm leading-5">
          Hey guys, this is Ankit. I have developed this website as my web
          development practice. This is somewhat similar to X where people can
          share their thoughts and feelings. Hope you guys find it entertaining
          and useful.
        </p>
      </div>
    </div>
  );
};

export default RightComp;
