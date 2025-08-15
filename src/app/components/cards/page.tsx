type Reaction = {
  type: "upvote" | "downvote";
  count: number;
};

const reactions: Reaction[] = [
  { type: "upvote", count: 0 },
  { type: "downvote", count: 0 },
];

const Cards: React.FC = () => {
  return (
    <div className="bg-[#3a3a3a] text-white rounded-3xl p-4 max-w-3xl mx-auto mt-8 shadow-md">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold">Ankit</h2>
        <span className="text-sm font-mono opacity-70">2:51:40</span>
      </div>

      <hr className="border-gray-500 my-2" />

      <p className="text-lg break-words">
        I am saying that fuckkkkk u alll
      </p>

      <div className="flex justify-end items-center gap-4 text-xl mt-4">
        {reactions.map((reaction, index) => (
          <div key={index} className="flex items-center gap-1 cursor-pointer select-none">
            <span>{reaction.type === "upvote" ? "⬆️" : "⬇️"}</span>
            <span className="text-sm">{reaction.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
  