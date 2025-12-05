import React from "react";
import SideBar from "../components/HomeComponents/SideBar.jsx";
import MessageArea from "../components/HomeComponents/MessageArea.jsx";
import getMessages from "../hooks/getMessages.jsx";

const Home = () => {
  getMessages();
  return (
    <div className="w-full h-[100vh] flex overflow-hidden">
      <SideBar />
      <MessageArea />
    </div>
  );
};

export default Home;
