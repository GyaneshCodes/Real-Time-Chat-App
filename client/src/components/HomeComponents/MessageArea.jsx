import React, { useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../../redux/userSlice.js";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage.jsx";
import ReceiverMessage from "./ReceiverMessage.jsx";
import axios from "axios";
import { serverUrl } from "../../main.jsx";
import { setMessages } from "../../redux/messageSlice.js";
import { useEffect } from "react";

const MessageArea = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { selectedUser, userData, socket } = useSelector((state) => state.user);
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
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });

    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  return (
    <div
      className={`lg:w-[70%] ${
        selectedUser ? "flex" : "hidden"
      } lg:flex w-full h-full relative bg-slate-200 border-l-2 border-gray-300`}
    >
      {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col">
          <div className="w-full h-[100px] bg-[#4900a8] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center gap-[20px] px-[20px]">
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <IoIosArrowRoundBack className="w-[40px] h-[40px] text-gray-300 cursor-pointer hover:text-gray-400 transition-all duration-200" />
            </div>

            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg bg-white cursor-pointer">
              <img
                src={selectedUser?.image || dp}
                alt=""
                className="h-[100%]"
              />
            </div>

            <h1 className="text-white font-semibold text-[20px]">
              {selectedUser?.name || "user"}
            </h1>
          </div>

          <div className="w-full h-[78%] flex flex-col py-[60px] px-[20px] overflow-auto gap-[20px]">
            {/* Emoji setup */}
            {showPicker && (
              <div className="absolute bottom-[120px] left-[20px]">
                <EmojiPicker
                  width={250}
                  height={350}
                  className="shadow-lg z-[100]"
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}

            {messages &&
              messages.map((mess) =>
                mess.sender == userData._id ? (
                  <SenderMessage image={mess.image} message={mess.message} />
                ) : (
                  <ReceiverMessage image={mess.image} message={mess.message} />
                )
              )}

            {/* Sender and Receiver messages here */}
          </div>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">
            Welcome to Chatify
          </h1>
          <span className="text-gray-700 font-semibold text-[30px]">
            Chat Friendly!
          </span>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center">
          <img
            src={frontendImage}
            alt=""
            className="w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-gray-400 shadow-lg"
          />

          <form
            className="w-[95%] lg:w-[70%] h-[60px] bg-[#4900a8] rounded-full shadow-gray-400 shadow-lg flex items-center gap-[20px] px-[20px]"
            onSubmit={handleSendMessage}
          >
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="w-[25px] h-[25px] text-white cursor-pointer hover:text-gray-200 transition-all duration-100" />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />

            <input
              type="text"
              className="w-full h-full outline-none border-0 text-[19px] text-white bg-transparent placeholder-gray-100"
              placeholder="Message"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />

            <div onClick={() => image.current.click()}>
              <FaImages className="w-[25px] h-[25px] text-white cursor-pointer hover:text-gray-200 transition-all duration-100" />
            </div>

            {input.length > 0 ||
              (backendImage != null && (
                <button>
                  <RiSendPlane2Fill className="w-[25px] h-[25px] text-white cursor-pointer hover:text-gray-200 transition-all duration-100" />
                </button>
              ))}
          </form>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
