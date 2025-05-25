import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
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
      }
    } catch (err) {
      setError(err.response.data);
      console.log("Error " + err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      setIsLogin(true);
      setFirstName("");
      setLastName("");
      setEmailId("");
      setPassword("");
    } catch (err) {
      setError(err.response.data);
      console.log("Error " + err.message);
    }
  };

  console.log(isLogin, "isLogin");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          {!isLogin && (
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Enter Your First Name
                </legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Enter Your Last Name
                </legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                />
              </fieldset>
            </div>
          )}
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

          <p
            className="text-white-500 underline cursor-pointer my-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Create One"
              : "Already have an account"}
          </p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
