import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res?.data));
      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(BASE_URL + "/signup", { emailId, password, firstName, lastName }, { withCredentials: true });
      dispatch(addUser(res?.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Branding */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-rose-400 text-sm font-medium">For developers, by developers</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Find your dev<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              soulmate
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            Connect with frontend devs, backend engineers, and AI builders who share your passion for technology.
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {["React", "Node.js", "Python", "Rust", "Go", "AI/ML"].map((tech) => (
              <span key={tech} className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="w-full max-w-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-8">
            {/* Toggle Tabs */}
            <div className="flex bg-gray-800/60 rounded-xl p-1 mb-8">
              <button
                onClick={() => { setShowLogin(true); setError(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${showLogin ? "bg-rose-500 text-white shadow" : "text-gray-400 hover:text-white"}`}
              >
                Login
              </button>
              <button
                onClick={() => { setShowLogin(false); setError(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${!showLogin ? "bg-rose-500 text-white shadow" : "text-gray-400 hover:text-white"}`}
              >
                Sign Up
              </button>
            </div>

            <div className="space-y-4">
              {!showLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-gray-800 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-gray-800 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full bg-gray-800 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (showLogin ? handleLogin() : handleSignup())}
                  className="w-full bg-gray-800 border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all"
                />
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 text-rose-400 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={showLogin ? handleLogin : handleSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {showLogin ? "Logging in..." : "Creating account..."}
                  </span>
                ) : showLogin ? "Login" : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
