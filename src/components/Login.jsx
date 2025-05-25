import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("hardik@gmail.com");
  const [password, setPassword] = useState("Hardik@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.firstName) {
        dispatch(addUser(response.data));
        navigate("/");
        console.log(response.data.firstName, "loginResponse");
      }
    } catch (err) {
      setError(err.response.data);
      console.log("Error " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Your Email ID</legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Your Password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
