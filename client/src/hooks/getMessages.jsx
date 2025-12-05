import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main.jsx";
import { setOtherUsers } from "../redux/userSlice.js";
import { setMessages } from "../redux/messageSlice.js";

const getMessages = () => {
  let dispatch = useDispatch();
  let { userData, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    // if we already have user data, don't refetch
    // if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setMessages(result.data));
      } catch (error) {
        // log server response body if available (helps debugging 400/401/500)
        console.log(
          "other user error:",
          error?.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, [selectedUser, userData]);
};

export default getMessages;
