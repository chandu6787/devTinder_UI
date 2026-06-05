import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [error,setError]=useState();
  const userData=useSelector((store)=>store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}profile/view`, {
        withCredentials: true,
      });
      console.log(res);
      if (res?.data) dispatch(addUser(res.data));
    } catch (error) {

      navigate("/login");
      console.log(error);
  
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    
      <Footer />
    </div>
  );
};

export default Body;
