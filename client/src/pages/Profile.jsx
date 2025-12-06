import React, { useState, useRef } from "react";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setUserData } from "../redux/userSlice.js";

const Profile = () => {
  let { userData } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [name, setName] = useState(userData?.name || "");
  let [frontendImage, setFrontendImage] = useState(userData?.image || dp);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();
  let [saving, setSaving] = useState(false);

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#6F00FF]/20 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-10">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/50 border border-white/10 hover:bg-[#6F00FF] transition-all duration-300 backdrop-blur-md shadow-lg"
          title="Back to Chat"
        >
          <IoIosArrowRoundBack className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-fade-in-up">
        <div className="p-8 flex flex-col items-center">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
            Edit Profile
          </h1>

          {/* Profile Image Section */}
          <div
            className="relative group cursor-pointer mb-8 animate-fade-in"
            onClick={() => image.current.click()}
          >
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#6F00FF] to-indigo-500 shadow-2xl shadow-[#6F00FF]/20">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-800">
                <img
                  src={frontendImage}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-10 h-10 bg-slate-900 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#6F00FF] transition-all duration-300 shadow-lg group-hover:scale-110">
              <IoCameraOutline className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Form Section */}
          <form className="w-full flex flex-col gap-6" onSubmit={handleProfile}>
            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />

            <div className="space-y-5">
              <div className="input-group">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full h-12 bg-slate-950/50 border border-white/10 rounded-xl px-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#6F00FF] focus:ring-1 focus:ring-[#6F00FF] transition-all duration-300"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="input-group">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
                  Username
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full h-12 bg-slate-950/30 border border-white/5 rounded-xl px-4 text-slate-500 cursor-not-allowed select-none"
                  value={userData?.username || ""}
                />
              </div>

              <div className="input-group">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  readOnly
                  className="w-full h-12 bg-slate-950/30 border border-white/5 rounded-xl px-4 text-slate-500 cursor-not-allowed select-none"
                  value={userData?.email || ""}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#6F00FF] to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-[#6F00FF]/25 hover:shadow-[#6F00FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
