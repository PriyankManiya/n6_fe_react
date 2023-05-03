import React, { useState } from "react";
import axios from "axios";
import { notify, ToastType } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

import client_login from "../../assets/svg/Authentication/client_login.svg";
import logo_svg from "../../assets/svg/Common/Logo.svg";

const ClientLogin = () => {
  const navigate = useNavigate();

  const base_url = useSelector((state) => state.auth.base_url);

  const [username, _setUsername] = useState("");
  const [password, _setPassword] = useState("");

  const dispatch = useDispatch();
  const setToken = (data) => dispatch(actions.setToken(data));

  const navigateForgetPasswd = () => navigate("/forget-password");
  const navigateToProject = () => navigate("/note/23");

/**
 * It sends a POST request to the server with the username and password, and if the response is
 * successful, it sets the token and navigates to the dashboard
 */
  const loginUser = async () => {
    let response;
    try {
      response = await axios.post(`${base_url}/cred/login/`, {
        'username': 'max_philler',
        'password': 'Password1',
      });
      let data = response.data;

      if (data.status === 200) {
        notify(ToastType.SUCCESS, data.msg);
        setToken(data.access_token);
        navigateToProject();
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
            <img src={client_login} alt="login" width={550} height={450} />
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div>
            <div className="logo">
              <img src={logo_svg} alt="Logo" width={100} height={120} />
            </div>
            <div className="login-title">Welcome</div>
            <div>Please check your email for OTP</div>
            <div style={{display:"flex", marginTop: "20px"}}>
            <input
              type="text"
              className="login-input"
              style={{width:"50px", marginRight:"10px"}}
            />
            <input
              type="text"
              className="login-input"
              style={{width:"50px", marginRight:"10px"}}
            />
            <input
              type="text"
              className="login-input"
              style={{width:"50px", marginRight:"10px"}}
            />
            <input
              type="text"
              className="login-input"
              style={{width:"50px", marginRight:"10px"}}
            />
            <input
              type="text"
              className="login-input"
              style={{width:"50px", marginRight:"10px"}}
            />
            <input
              type="text"
              className="login-input"
              style={{width:"50px", marginRight:"10px"}}
            />
            </div>
            <div className="forgot-password">
              <div onClick={navigateForgetPasswd}>Resend Code ?</div>
            </div>
            <div>
              <button
                className="login-button btn-theme"
                onClick={() => loginUser()}
              >
                Login
              </button>
            </div>
            <div>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
