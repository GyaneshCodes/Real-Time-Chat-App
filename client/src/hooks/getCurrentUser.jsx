import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main.jsx";
import { setUserData } from "../redux/userSlice.js";

const getCurrentUser = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // if we already have user data, don't refetch
    if (userData) return;

    let cancelled = false;
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        if (!cancelled) dispatch(setUserData(result.data));
      } catch (error) {
        // log server response body if available (helps debugging 400/401/500)
        console.log(
          "current user error:",
          error?.response?.data || error.message
        );
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [userData]);
};

export default getCurrentUser;
