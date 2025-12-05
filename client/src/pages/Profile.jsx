import React from "react";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setUserData } from "../redux/userSlice.js";

const Profile = () => {
  let { userData } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [name, setName] = useState(userData.name || "");
  let [frontendImage, setFrontendImage] = useState(userData.image || dp);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  let [saving, setSaving] = useState(false);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setSaving(false);
      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log("Error in profile: ", error);
      setSaving(false);
    }
  };
  return (
    <div className="w-full  h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]">
      <div className="fixed top-[20px] left-[20px]">
        <IoIosArrowRoundBack
          className="w-[50px] h-[50px] text-gray-600 cursor-pointer hover:text-gray-500 transition-all duration-200"
          onClick={() => navigate("/")}
        />
      </div>
      <div
        className=" bg-white rounded-full border-4 border-[#6F00FF] shadow-lg shadow-gray-400 cursor-pointer relative"
        onClick={() => image.current.click()}
      >
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center">
          <img src={frontendImage} alt="" className="h-[100%]" />
        </div>

        <div className="absolute bottom-4 text-gray-700 right-4 w-[35px] h-[35px] flex justify-center items-center bg-[#6F00FF] rounded-full shadow-gray-400 shadow-lg">
          <IoCameraOutline className="text-gray-700 w-[25px] h-[25px]" />
        </div>
      </div>
      <form
        className="w-[90%] max-w-[500px] flex flex-col gap-[20px] justify-center items-center"
        onSubmit={handleProfile}
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-[90%] h-[50px] outline-none border-2 border-[#6F00FF] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          readOnly
          className="w-[90%] h-[50px] outline-none border-2 border-[#6F00FF] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-500 text-[19px]"
          value={userData?.username}
        />
        <input
          type="email"
          readOnly
          className="w-[90%] h-[50px] outline-none border-2 border-[#6F00FF] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-500 text-[19px]"
          value={userData?.email}
        />
        <button
          className="w-[50%] h-10 rounded-lg font-semibold text-sm uppercase bg-[#BF00FF] text-white shadow-md hover:bg-[#a600dd] transition-all duration-300 cursor-pointer"
          disabled={saving}
        >
          {saving ? "saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
