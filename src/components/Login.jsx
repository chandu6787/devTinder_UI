import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Feed from "./Feed";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("vikram@gmail.com");
  const [password, setPassword] = useState("Vikram@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data));
       navigate("/feed");
    } catch (error) {
      setError(
        error?.response?.data || error.message || "Login failed",
      );
      console.log(error); 
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Find your perfect match in the tech world. Whether you're a frontend
            developer, backend engineer, or AI enthusiast, DevTinder helps you
            connect with people who share your interests, ambitions, and love
            for technology.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                            {error && <div className="alert alert-error mb-4">{error}</div>}

              </div>
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
