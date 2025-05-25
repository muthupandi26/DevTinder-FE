import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.userReducer);

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(response.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
