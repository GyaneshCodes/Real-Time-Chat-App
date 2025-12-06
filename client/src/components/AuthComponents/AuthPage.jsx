import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "../../pages/SignIn.jsx";
import SignUpForm from "../../pages/SignUp.jsx";

// --- Main Application Component (container + overlay animation) ---
const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // animation state: true => show Sign Up panel, false => show Sign In
  const [isActive, setIsActive] = useState(false);

  // keep local state in sync with URL on mount / when URL changes
  useEffect(() => {
    if (location.pathname === "/signup") setIsActive(true);
    else setIsActive(false);
  }, [location.pathname]);

  // helper to set animation state then navigate after animation completes
  const animateAndNavigate = (targetActive, path) => {
    setIsActive(targetActive);
    const ANIMATION_MS = 700; // should match CSS transition duration
    setTimeout(() => navigate(path), ANIMATION_MS);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-5 font-sans relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6F00FF]/10 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Montserrat', sans-serif; }
      `}</style>

      <div
        className={`relative bg-slate-900 border border-white/10 rounded-[30px] shadow-2xl overflow-hidden w-full max-w-[850px] min-h-[550px] ${
          isActive ? "active" : ""
        } group z-10`}
      >
        {/* SIGN UP FORM PANE */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out
          w-full md:w-1/2 left-0 z-10
          ${
            isActive
              ? "opacity-100 translate-x-0 md:translate-x-full z-50"
              : "opacity-0 z-0 md:z-10"
          }
          flex flex-col items-center justify-center px-10 text-center bg-slate-900`}
        >
          <SignUpForm />
        </div>

        {/* SIGN IN FORM PANE */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out
          w-full md:w-1/2 left-0 z-20
          ${
            isActive
              ? "opacity-0 -translate-x-full md:translate-x-[100%]"
              : "opacity-100 translate-x-0 md:translate-x-0"
          }
          flex flex-col items-center justify-center px-10 text-center bg-slate-900`}
        >
          <SignInForm />
        </div>

        {/* TOGGLE OVERLAY */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-[100] hidden md:block
          ${
            isActive
              ? "-translate-x-full rounded-r-[150px]"
              : "rounded-l-[150px]"
          }`}
        >
          <div
            className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-[#6F00FF] to-indigo-600 text-white transform transition-transform duration-700 ease-in-out
             ${isActive ? "translate-x-1/2" : "translate-x-0"}
          `}
          >
            {/* Left Panel (Sign In Prompt) */}
            <div
              className={`absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-transform duration-700 ease-in-out
              ${isActive ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm leading-6 mb-8 text-slate-200">
                Enter your personal details to use all of site features
              </p>
              <button
                className="bg-transparent border border-white w-40 text-white hover:bg-white/20 rounded-xl h-10 font-bold uppercase text-sm transition-colors"
                onClick={() => animateAndNavigate(false, "/signin")}
              >
                Sign In
              </button>
            </div>

            {/* Right Panel (Sign Up Prompt) */}
            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-transform duration-700 ease-in-out
              ${isActive ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm leading-6 mb-8 text-slate-200">
                Register with your personal details to use all of site features
              </p>
              <button
                className="bg-transparent border border-white w-40 text-white hover:bg-white/20 rounded-xl h-10 font-bold uppercase text-sm transition-colors"
                onClick={() => animateAndNavigate(true, "/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center md:hidden z-50">
          <button
            onClick={() => {
              const next = !isActive;
              animateAndNavigate(next, next ? "/signup" : "/signin");
            }}
            className="text-[#6F00FF] hover:text-[#5a00cc] text-sm font-bold transition-colors"
          >
            {isActive
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
