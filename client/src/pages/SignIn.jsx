import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import {
  InputField,
  Button,
} from "../components/AuthComponents/AuthComponent.jsx";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

// Presentational SignIn form only (no container, no navigation)
const SignInForm = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { username, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate("/");
      setUsername("");
      setPassword("");
      setLoading(false);
      setError("");
    } catch (error) {
      console.log("SignIn Error: ", error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSignIn}>
      <h1 className="text-3xl font-bold mb-4 text-white">Sign In</h1>
      <span className="text-xs text-slate-400 mt-4 mb-2 inline-block">
        Use your username & password
      </span>
      <InputField
        type="text"
        placeholder="Username"
        icon={User}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      <a
        href="#"
        className="text-xs text-slate-400 my-4 hover:text-[#6F00FF] transition-colors block"
      >
        Forgot Your Password?
      </a>
      <div className="mt-4">
        <Button disabled={loading}>{loading ? "Loading..." : "Sign In"}</Button>
      </div>
    </form>
  );
};

export default SignInForm;
