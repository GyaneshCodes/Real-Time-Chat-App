import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../../assets/dp.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
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
      className={`lg:w-[30%] w-full h-full lg:block bg-slate-900/50 backdrop-blur-sm border-r border-white/5 relative flex flex-col ${
        !selectedUser ? "block" : "hidden"
      }`}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Chatify
          </h1>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#6F00FF] cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/profile")}
            >
              <img
                src={userData.image || dp}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoIosSearch className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="w-full bg-slate-950/50 border border-white/5 text-slate-200 text-sm rounded-xl focus:ring-[#6F00FF] focus:border-[#6F00FF] block pl-10 p-3 outline-none transition-all placeholder-slate-600"
            placeholder="Search users..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSearch(e.target.value.length > 0);
            }}
          />
          {search && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => {
                setInput("");
                setSearch(false);
              }}
            >
              <RxCross2 className="h-4 w-4 text-slate-500 hover:text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Search Results Or User List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 scrollbar-hide">
        {search && input.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">
              Search Results
            </div>
            {searchData?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                online={onlineUsers?.includes(user._id)}
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  setInput("");
                  setSearch(false);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">
              Active Conversations
            </div>
            {otherUsers?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                online={onlineUsers?.includes(user._id)}
                onClick={() => dispatch(setSelectedUser(user))}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/5 bg-slate-900/80 absolute bottom-0 w-full">
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 text-slate-400 hover:text-rose-500 transition-colors w-full px-4 py-2 rounded-lg hover:bg-white/5"
        >
          <BiLogOutCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

const UserListItem = ({ user, online, onClick }) => (
  <div
    className="group w-full p-3 flex items-center gap-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5 active:bg-[#6F00FF]/10 active:scale-[0.99] border border-transparent hover:border-white/5"
    onClick={onClick}
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800">
        <img
          src={user.image || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
      )}
    </div>
    <div className="flex-1">
      <h3 className="text-slate-200 font-medium text-sm group-hover:text-white transition-colors">
        {user.name || user.username}
      </h3>
      <p className="text-slate-500 text-xs truncate max-w-[150px]">
        Scan to start chatting
      </p>
    </div>
  </div>
);

export default SideBar;
