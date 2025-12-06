import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import dp from "../../assets/dp.webp";

const SenderMessage = ({ image, message }) => {
  let scroll = useRef();
  let { userData } = useSelector((state) => state.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  return (
    <div className="flex items-end flex-row-reverse gap-3 group animate-fade-in-up">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
        <img
          src={userData.image || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bubble */}
      <div ref={scroll} className="flex flex-col items-end w-[45%] lg:w-[30%]">
        <div className="px-5 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#6F00FF] to-indigo-600 text-white shadow-lg shadow-[#6F00FF]/10">
          {image && (
            <div className="mb-2 rounded-lg overflow-hidden">
              <img src={image} alt="" className="max-w-full rounded-lg" />
            </div>
          )}
          {message && (
            <p className="text-[15px] leading-relaxed font-sans">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SenderMessage;
