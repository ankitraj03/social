import Navbar from "./components/navbar/page";
import HomePage from "./components/home/page";
import LeftComp from "./components/leftComp/page";
import RightComp from "./components/rightComp/page";




export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="hidden md:flex ">
        <LeftComp />
        <div className="w-[60%] min-h-[85vh] border-1 border-t-0">
          <HomePage />
        </div>
        <RightComp />
      </div>

      <div className="flex flex-col md:hidden flex-1 overflow-y-auto">
        <HomePage />
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black z-50">
        <LeftComp />
      </div>
    </main>
  );
}
