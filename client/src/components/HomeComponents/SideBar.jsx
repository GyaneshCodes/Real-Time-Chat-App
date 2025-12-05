import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../../assets/dp.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../main.jsx";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  let { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  let [input, setInput] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/signin");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setSearchData(result.data));
    } catch (error) {
      console.log("Search error: ", error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);

  return (
    <div
      className={`lg:w-[30%] w-full h-full lg:block bg-slate-200 relative overflow-hidden ${
        !selectedUser ? "block" : "hidden"
      }`}
    >
      <div
        className="w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden bg-[#6F00FF] text-gray-300 flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer fixed bottom-[20px] left-[10px]"
        onClick={handleLogOut}
      >
        <BiLogOutCircle className="w-[25px] h-[25px]" />
      </div>

      {input.length > 0 && (
        <div className="w-[100%] h-[350px] overflow-y-auto flex flex-col gap-[10px] items-center justify-center bg-slate-200 absolute top-[320px] z-30">
          {searchData?.map((user) => (
            <div
              className="w-[80%] h-[70px] flex justify-start items-center gap-[20px] px-[10px] rounded-lg bg-slate-100 hover:bg-violet-100 cursor-pointer transition-all duration-200 border-b-2 border-gray-400"
              onClick={() => {
                dispatch(setSelectedUser(user));
                setInput("");
                setSearch(false);
              }}
            >
              <div className="relative rounded-full bg-white flex justify-center items-center">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center ">
                  <img src={user.image || dp} alt="" className="h-[100%]" />
                </div>

                {onlineUsers?.includes(user._id) && (
                  <span className="w-[12px] h-[12px] rounded-full bg-green-500 absolute bottom-[6px] right-[-1px] shadow-gray-500 shadow-md"></span>
                )}
              </div>
              <h1 className="text-gray-800 font-semibold text-[20px]">
                {user.name || user.username}
              </h1>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-[300px] bg-[#6F00FF] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]">
        <h1 className="text-white font-bold text-[25px]">Chatify</h1>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-bold text-[25px]">
            Hii, {userData.name || "user"}
          </h1>

          <div
            className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-white cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img src={userData.image || dp} alt="" className="h-[100%]" />
          </div>
        </div>

        <div className="w-full flex items-center gap-[20px] overflow-y-auto py-[10px]">
          {!search && (
            <div
              className="w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden bg-white flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer"
              onClick={() => setSearch(true)}
            >
              <IoIosSearch className="w-[25px] h-[25px]" />
            </div>
          )}
          {search && (
            <form className="w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative">
              <IoIosSearch className="w-[25px] h-[25px]" />
              <input
                type="text"
                placeholder="Search Users..."
                className="w-full h-full p-[10px] outline-0 border-0 text-[17px]"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <RxCross2
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => setSearch(false)}
              />
            </form>
          )}

          {!search &&
            otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div
                    className="relative rounded-full shadow-gray-500 shadow-lg bg-white flex justify-center items-center mt-[10px] cursor-pointer"
                    onClick={() => dispatch(setSelectedUser(user))}
                  >
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center ">
                      <img src={user.image || dp} alt="" className="h-[100%]" />
                    </div>
                    <span className="w-[12px] h-[12px] rounded-full bg-green-500 absolute bottom-[6px] right-[-1px] shadow-gray-500 shadow-md"></span>
                  </div>
                )
            )}
        </div>
      </div>

      <div className="w-full h-[60%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
        {otherUsers?.map((user) => (
          <div
            className="w-[90%] h-[60px] flex justify-start items-center gap-[20px] shadow-gray-500 shadow-lg bg-white rounded-full hover:bg-violet-100 cursor-pointer transition-all duration-200"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative rounded-full shadow-gray-500 shadow-lg bg-white flex justify-center items-center mt-[10px]">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center ">
                <img src={user.image || dp} alt="" className="h-[100%]" />
              </div>

              {onlineUsers?.includes(user._id) && (
                <span className="w-[12px] h-[12px] rounded-full bg-green-500 absolute bottom-[6px] right-[-1px] shadow-gray-500 shadow-md"></span>
              )}
            </div>
            <h1 className="text-gray-800 font-semibold text-[20px]">
              {user.name || user.username}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
