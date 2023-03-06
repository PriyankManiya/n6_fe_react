import React, { useState } from "react";
import axios from "axios";
import { notify, ToastType } from "../utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import new_foget_svg from "../../assets/svg/Authentication/new_forget.svg";
import logo_svg from "../../assets/svg/Common/Logo.svg";

export default function Forgetpassword() {
  const navigate = useNavigate();
  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const [user_name, _setUserName] = useState("");

  const navigateSignIn = () => navigate("/login");

  const forgetPassword = async () => {
    let response;
    try {
      response = await axios.post(
        `${baseUrl}/cred/send-reset-password/`,
        {
          user_name,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        }
      );
      let data = response.data;

      if (data.status === 200) {
        notify(ToastType.SUCCESS, data.msg);
      }
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Please Provide Valid Username");
    }
  };

  return (
    <div className="login-container">
      <div className="login-row ">
        <div className="col-md-6 text-center verticle_divider">
          <div className="login_svg">
            <img
              src={new_foget_svg}
              alt="forget-password"
              width={500}
              height={400}
            />
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div>
            <div className="logo">
              <img src={logo_svg} alt="Logo" width={100} height={120} />
            </div>
            <div className="login-title">Forgot Password</div>
            <div className="login-label">Enter your Username</div>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={user_name}
              onChange={(e) => _setUserName(e.target.value)}
            />
            <div className="login-label-forget"></div>

            <div className="back-login">
              <div onClick={navigateSignIn}>Back to sign in</div>
            </div>
            <div>
              <button
                className="login-button btn-theme"
                onClick={forgetPassword}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
