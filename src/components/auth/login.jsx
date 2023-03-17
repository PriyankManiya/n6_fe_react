import React, { useState } from "react";
import axios from "axios";
import { notify, ToastType } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

import login_svg from "../../assets/svg/Authentication/login.svg";
import logo_svg from "../../assets/svg/Common/Logo.svg";

const Login = () => {
  const navigate = useNavigate();

  const base_url = useSelector((state) => state.auth.base_url);

  const [username, _setUsername] = useState("");
  const [password, _setPassword] = useState("");

  const dispatch = useDispatch();
  const setToken = (data) => dispatch(actions.setToken(data));

  const navigateForgetPasswd = () => navigate("/forget-password");
  const navigateDashboard = () => navigate("/dashboard");

/**
 * It sends a POST request to the server with the username and password, and if the response is
 * successful, it sets the token and navigates to the dashboard
 */
  const loginUser = async () => {
    let response;
    try {
      response = await axios.post(`${base_url}/cred/login/`, {
        username,
        password,
      });
      let data = response.data;

      if (data.status === 200) {
        notify(ToastType.SUCCESS, data.msg);
        setToken(data.access_token);
        navigateDashboard();
      }
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, error.response.data.msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-row ">
        <div className="col-md-6 text-center verticle_divider">
          <div className="login_svg">
            <img src={login_svg} alt="login" width={550} height={450} />
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div>
            <div className="logo">
              <img src={logo_svg} alt="Logo" width={100} height={120} />
            </div>
            <div className="login-title">Welcome Back</div>
            <div>{base_url}</div>
            <div className="login-label">Username*</div>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              onChange={(e) => _setUsername(e.target.value)}
            />
            <div className="login-label">Password*</div>
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              onChange={(e) => _setPassword(e.target.value)}
            />
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label className="remember-me-label" htmlFor="remember-me">
                Remember Me
              </label>
            </div>
            <div>
              <button
                className="login-button btn-theme"
                onClick={() => loginUser()}
              >
                Login
              </button>
            </div>
            <div className="forgot-password">
              <div onClick={navigateForgetPasswd}>Forgot Your Password?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
