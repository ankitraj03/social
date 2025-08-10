import Cards from "./Cards";
const Home = () => {
    return (
        <div className="w-[70%] border-l-1 border-r-1">
            <div className="p-14 ">
                <div className="flex">
                    <div className="p-2 bg-green-50 rounded-full">avatar</div>
                    <input type="text" placeholder="share your thoughts" className="border-0 mx-5 border-b-1 text-gray-700 w-[80%] focus:outline-none focus:border-b-1 focus:ring-0" />
                    <hr />
                    <span className="bg-green-200 text-center p-2 rounded-2xl">Button</span>
                </div>
            </div>
            <hr className="text-white w-[100%]" />
            <hr className="text-white my-8 w-[100%]" />

            <div>
                <Cards/>
            </div>

        </div>
    )
};

export default Home;