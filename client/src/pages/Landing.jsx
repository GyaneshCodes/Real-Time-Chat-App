import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Shield,
  Zap,
  Globe,
  Users,
  ArrowRight,
} from "lucide-react";
import logo from "../../public/logo.png";
import { useSelector } from "react-redux";

const Landing = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) navigate("/", { replace: true });
  }, [userData]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6F00FF] to-indigo-500 flex items-center justify-center shadow-lg shadow-[#6F00FF]/20">
              <img src={logo} alt="" />
              {/* <MessageSquare className="w-6 h-6 text-white" /> */}
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Chatify
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/signin"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-full bg-[#6F00FF] hover:bg-[#5800cc] text-white text-sm font-semibold transition-all shadow-lg shadow-[#6F00FF]/25 hover:shadow-[#6F00FF]/40 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
              Live now v2.0
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Connect Instantly, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F00FF] to-indigo-400">
              Communicate Freely.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience real-time messaging with a premium interface. Secure,
            fast, and designed for modern conversations. Join millions
            connecting today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              Start Chatting Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/signin"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              Existing User?
            </Link>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6F00FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"></div>
      </header>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-[#6F00FF]" />}
              title="Lightning Fast"
              description="Real-time delivery with zero latency. Your messages arrive the moment you send them."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-[#6F00FF]" />}
              title="Secure & Private"
              description="End-to-end encryption ensures your conversations stay private and secure."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-[#6F00FF]" />}
              title="Global Reach"
              description="Connect with friends and colleagues anywhere in the world instantly."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            © 2025 Chatify. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#6F00FF]/50 transition-colors group">
    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-slate-500 hover:text-[#6F00FF] transition-colors text-sm"
  >
    {children}
  </a>
);

export default Landing;
