import Image from "next/image";
import Navbar from "./components/navbar/page";
import HomePage from "./components/home/page";
import LeftComp from "./components/leftComp/page";
import RightComp from "./components/rightComp/page";
import Login from "./auth/login/page";



export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className="flex">
        <LeftComp/>
        <HomePage/>
        <RightComp/>
      </div>
      {/* <Login/> */}
    </main>
  );
}
