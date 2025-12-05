import React, { useState } from "react";
import { Chrome, Facebook, Eye, EyeOff, Lock } from "lucide-react";

export const SocialIcons = () => (
  <div className="flex justify-center gap-2 mt-4">
    <a
      href="#"
      className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <Chrome size={20} />
    </a>
    <a
      href="#"
      className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <Facebook size={20} />
    </a>
  </div>
);

export const InputField = ({
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  // Use parent value if provided, else use internal state
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e) => {
    if (isControlled) {
      onChange?.(e); // call parent onChange
    } else {
      setInternalValue(e.target.value); // use internal state
    }
  };

  const isPasswordField = type === "password";
  const hasValue = currentValue.length > 0;

  return (
    <div className="relative w-full my-2">
      <input
        type={isPasswordField && showPassword ? "text" : type}
        placeholder={placeholder}
        required
        value={currentValue}
        onChange={handleChange}
        className="w-full py-3 px-4 bg-gray-100 rounded-lg border-none outline-none text-sm font-medium text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-400/50"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
        {isPasswordField ? (
          hasValue ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-gray-700 transition-colors cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          ) : (
            <Lock size={18} />
          )
        ) : (
          <Icon size={18} />
        )}
      </div>
    </div>
  );
};

export const Button = ({ children, onClick, variant = "primary" }) => {
  const baseStyle =
    "w-full h-10 rounded-lg font-semibold text-sm uppercase tracking-wide cursor-pointer transition-all duration-300";
  const variants = {
    primary: "bg-[#BF00FF] text-white shadow-md hover:bg-[#a600dd]",
    outline:
      "bg-transparent border border-white text-white hover:bg-white/20 w-40",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};
