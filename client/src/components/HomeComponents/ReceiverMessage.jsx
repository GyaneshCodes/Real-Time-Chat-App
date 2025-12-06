import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import dp from "../../assets/dp.webp";

const ReceiverMessage = ({ image, message }) => {
  let scroll = useRef();
  let { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  return (
    <div className="flex items-end gap-3 group animate-fade-in-up">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-slate-800">
        <img
          src={selectedUser.image || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bubble */}
      <div
        ref={scroll}
        className="flex flex-col items-start w-[45%] lg:w-[30%]"
      >
        <div className="px-5 py-3 rounded-2xl rounded-tl-sm bg-slate-800 border border-white/5 text-slate-200 shadow-sm">
          {image && (
            <div className="mb-2 rounded-lg overflow-hidden bg-slate-900 border border-white/5">
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

export default ReceiverMessage;
