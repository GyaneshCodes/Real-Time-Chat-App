import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

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
    <div className="relative w-full my-3">
      <input
        type={isPasswordField && showPassword ? "text" : type}
        placeholder={placeholder}
        required
        value={currentValue}
        onChange={handleChange}
        className="w-full py-3 px-4 bg-slate-900 border border-white/10 rounded-xl outline-none text-sm font-medium text-white placeholder-slate-500 focus:border-[#6F00FF] focus:ring-1 focus:ring-[#6F00FF] transition-all duration-300"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
        {isPasswordField ? (
          hasValue ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-[#6F00FF] transition-colors cursor-pointer"
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

export const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled,
}) => {
  const baseStyle =
    "w-full h-11 rounded-xl font-bold text-sm uppercase tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-center";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#6F00FF] to-indigo-600 text-white shadow-lg shadow-[#6F00FF]/25 hover:shadow-[#6F00FF]/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border border-white text-white hover:bg-white/10 w-40 backdrop-blur-sm",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
