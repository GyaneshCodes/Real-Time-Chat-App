import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../../redux/userSlice.js";
import { RiEmojiStickerLine, RiSendPlane2Fill } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage.jsx";
import ReceiverMessage from "./ReceiverMessage.jsx";
import axios from "axios";
import { serverUrl } from "../../main.jsx";
import { setMessages } from "../../redux/messageSlice.js";

const MessageArea = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { selectedUser, userData, socket, onlineUsers } = useSelector(
    (state) => state.user
  );
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  let { messages } = useSelector((state) => state.message);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendImage == null) {
      return null;
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log("Send message error: ", error);
    }
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });

    return () => socket.off("newMessage");
  }, [messages, setMessages, socket]);

  if (!selectedUser) {
    return (
      <div className="hidden lg:flex w-full h-full flex-col justify-center items-center bg-slate-950 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6F00FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-4 p-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#6F00FF] to-indigo-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-[#6F00FF]/25">
            <span className="text-4xl text-white">👋</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F00FF] to-indigo-400">
              Chatify
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Select a conversation from the sidebar to start chatting globally
            with your friends.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 relative">
      {/* Header */}
      <div className="h-20 px-6 flex items-center justify-between bg-slate-900/80 backdrop-blur-md border-b border-white/5 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className=" p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
          >
            <IoIosArrowRoundBack className="w-8 h-8" />
          </button>

          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-white/10">
            <img
              src={selectedUser?.image || dp}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg leading-tight">
              {selectedUser?.name || "user"}
            </h2>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  onlineUsers?.includes(selectedUser?._id)
                    ? "bg-green-500"
                    : "bg-slate-500"
                } inline-block`}
              ></span>
              {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-950">
        {messages &&
          messages.map((mess) =>
            mess.sender === userData._id ? (
              <SenderMessage
                key={mess._id}
                image={mess.image}
                message={mess.message}
              />
            ) : (
              <ReceiverMessage
                key={mess._id}
                image={mess.image}
                message={mess.message}
              />
            )
          )}
        {/* Spacer for bottom input area */}
        <div className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950 shrink-0 relative z-20">
        {showPicker && (
          <div className="absolute bottom-24 left-6 z-50">
            <EmojiPicker
              theme="dark"
              width={300}
              height={400}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}

        {frontendImage && (
          <div className="absolute bottom-24 right-6 p-2 bg-slate-900 rounded-xl border border-white/10 shadow-lg animate-fade-in-up">
            <div className="relative">
              <img
                src={frontendImage}
                alt=""
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setFrontendImage(null);
                  setBackendImage(null);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white flex items-center justify-center text-xs hover:bg-rose-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <form
          className="max-w-4xl mx-auto flex items-center gap-3 p-2 bg-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-sm"
          onSubmit={handleSendMessage}
        >
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="p-3 text-slate-400 hover:text-[#6F00FF] transition-colors rounded-xl hover:bg-white/5"
          >
            <RiEmojiStickerLine className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => image.current.click()}
            className="p-3 text-slate-400 hover:text-[#6F00FF] transition-colors rounded-xl hover:bg-white/5"
          >
            <FaImages className="w-6 h-6" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={image}
            hidden
            onChange={handleImage}
          />

          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-base px-2"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {(input.length > 0 || backendImage) && (
            <button
              type="submit"
              className="p-3 bg-[#6F00FF] hover:bg-[#5a00cc] text-white rounded-xl shadow-lg shadow-[#6F00FF]/20 transition-all transform active:scale-95"
            >
              <RiSendPlane2Fill className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
