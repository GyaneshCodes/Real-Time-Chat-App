import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthPage from "./components/AuthComponents/AuthPage.jsx";
import getCurrentUser from "./hooks/getCurrentUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import getOtherUsers from "./hooks/getOtherUsers.jsx";
import { io } from "socket.io-client";
import { serverUrl } from "./main.jsx";
import { setOnlineUsers, setSocket } from "./redux/userSlice.js";
import Landing from "./pages/Landing.jsx";

const App = () => {
  getCurrentUser();
  getOtherUsers();
  let { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      const socketio = io(`${serverUrl}`, {
        query: {
          userId: userData?._id,
        },
      });

      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [userData]);
  return (
    <Routes>
      <Route
        path="/signin"
        element={!userData ? <AuthPage /> : <Navigate to={"/"} />}
      ></Route>
      <Route
        path="/signup"
        element={!userData ? <AuthPage /> : <Navigate to={"/profile"} />}
      ></Route>
      <Route
        path="/landing"
        element={!userData ? <Landing /> : <Navigate to={"/"} />}
      ></Route>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/landing"} />}
      ></Route>
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to={"/signin"} />}
      ></Route>
    </Routes>
  );
};

export default App;
