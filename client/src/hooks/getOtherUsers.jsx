import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main.jsx";
import { setOtherUsers } from "../redux/userSlice.js";

const getOtherUsers = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        // log server response body if available (helps debugging 400/401/500)
        console.log(
          "other user error:",
          error?.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, [userData]);
};

export default getOtherUsers;
