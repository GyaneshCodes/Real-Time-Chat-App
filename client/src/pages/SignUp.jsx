import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import {
  InputField,
  Button,
} from "../components/AuthComponents/AuthComponent.jsx";
import axios from "axios";
import { serverUrl } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

// Presentational SignUp form only (no container, no navigation)
const SignUpForm = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/profile");
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setError("");
    } catch (error) {
      console.log("SignUp Error: ", error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSignUp}>
      <h1 className="text-3xl font-bold mb-4 text-white">Create Account</h1>
      <span className="text-xs text-slate-400 mt-4 mb-2 inline-block">
        Use your email for registration
      </span>
      <InputField
        type="text"
        placeholder="Username"
        icon={User}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="email"
        placeholder="Email"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      <div className="mt-4">
        <Button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
