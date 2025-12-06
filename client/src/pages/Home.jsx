import React from "react";
import SideBar from "../components/HomeComponents/SideBar.jsx";
import MessageArea from "../components/HomeComponents/MessageArea.jsx";
import getMessages from "../hooks/getMessages.jsx";

const Home = () => {
  getMessages();
  return (
    <div className="w-full h-screen flex overflow-hidden bg-slate-950">
      <SideBar />
      <MessageArea />
    </div>
  );
};

export default Home;
