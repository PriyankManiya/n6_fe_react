import React, { useState } from "react";
import axios from "axios";
import { notify, ToastType } from "../utils";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import new_pass_svg from "../../assets/svg/Authentication/new_pass.svg";
import logo_svg from "../../assets/svg/Common/Logo.svg";

export default function ResetPasswordLink() {
  const navigate = useNavigate();

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const { uid, token } = useParams();

  const [password, _setPasswd] = useState("");
  const [password2, _setPasswd2] = useState("");

  const navigateLogin = () => navigate("/login");

  const updatePassword = async () => {
    let response;
    try {
      response = await axios.post(
        `${baseUrl}/cred/reset-password/${uid}/${token}/`,
        {
          password,
          password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = response.data;

      if (data.status === 200) {
        notify(ToastType.SUCCESS, data.msg);
        navigateLogin();
      }
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Please Provide Valid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-row ">
        <div className="col-md-6 text-center verticle_divider">
          <div className="login_svg">
            <img src={new_pass_svg} alt="password" width={380} height={390} />
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div>
            <div className="logo">
              <img src={logo_svg} alt="Logo" width={100} height={120} />
            </div>
            <div className="login-title">New Password</div>
            <div className="login-label">Enter New Password</div>
            <input
              type="password"
              className="login-input"
              placeholder="New Password"
              value={password}
              onChange={(e) => _setPasswd(e.target.value)}
            />
            <div className="login-label">Confirm New Password</div>
            <input
              type="password"
              className="login-input"
              placeholder="Confirm New Password"
              value={password2}
              onChange={(e) => _setPasswd2(e.target.value)}
            />
            <div className="remember-me"></div>
            <div>
              <button
                className="login-button btn-theme"
                onClick={() => updatePassword()}
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
