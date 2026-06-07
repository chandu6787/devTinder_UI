import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {}
  };

  const navLinks = [
    { to: "/feed", label: "Discover" },
    { to: "/connections", label: "Connections" },
    { to: "/requests", label: "Requests" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-white/5 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/feed"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">🧑‍💻</span>
            <span className="text-white font-black text-xl tracking-tight">
              dev<span className="text-rose-500">Tinder</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === to
                      ? "bg-rose-500/20 text-rose-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side */}
          {user && (
            <div className="flex items-center gap-3">
              {/* Desktop profile dropdown */}
              <div className="hidden md:block relative">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 cursor-pointer transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-rose-500/40">
                      <img
                        src={user?.photoUrl}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-white font-medium">
                      {user?.firstName}
                    </span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={-1}
                    className="dropdown-content mt-2 w-52 rounded-xl border border-white/10 bg-gray-900 shadow-2xl p-1"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span>👤</span> Profile
                      </Link>
                    </li>
                    {navLinks.map(({ to, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors md:hidden"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                      >
                        <span>🚪</span> Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {user && menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-gray-950 px-4 py-3 space-y-1">
          <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setMenuOpen(false)}>
            👤 Profile
          </Link>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === to ? "text-rose-400 bg-rose-500/10" : "text-gray-300 hover:text-white hover:bg-white/5"}`} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
            🚪 Log out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
