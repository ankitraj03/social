import Image from "next/image";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import LeftComp from "./components/LeftComp";
import RightComp from "./components/RightComp";
import Login from "./auth/Login";



export default function Home() {
  return (
    <main>
      {/* <Navbar/>
      <div className="flex">
        <LeftComp/>
        <HomePage/>
        <RightComp/>
      </div> */}
      <Login/>
    </main>
  );
}
