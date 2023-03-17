import React, { useEffect } from "react";
import "../../css/note.css";
import "../../css/general.css";
import "../../css/model.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import NoteBreadCrumbs from "./noteBreadCrumbs";

export default function NoteHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const projectData = useSelector((state) => state.projects.project);

  const setToken = (data) => dispatch(actions.setToken(data));
  const setUserData = (data) => dispatch(actions.setUserData(data));

  const resetStore = () => dispatch(actions.reset());
  const navigateLogin = () => navigate("/");
  const navigateDashboard = () => navigate("/dashboard");

  /**
   * The useEffect hook is used to call the getUserInfo and getNotes functions when the component mounts
   */
  const logoutUser = () => {
    setToken("");
    resetStore();
    navigateLogin();
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  /**
   * It gets the user data from the backend and sets it to the state
   */
  const getUserInfo = () => {
    try {
      // Get user data
      axios
        .get(`${baseUrl}/cred/profile/`, {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            // notify(ToastType.SUCCESS, data.msg);
            setUserData(data.data);
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="general-top-bar">
        <div className="general-top-bar-info-box">
          <div className="general-top-bar-logo-box">
            <img src={n6Logo} alt="N6 Logo" title="N6" />
          </div>
          <div
            className="general-top-bar-username-box"
            title="{userData.user_name}"
          >
            <div>
              <img src={userIcon} alt="User Icon" />
            </div>
            <div>
              <p>{userData.user_name}</p>
            </div>
          </div>
        </div>
        <div className="general-top-bar-project-info">
          <p>{projectData.name}</p>
          <p>&nbsp; &nbsp; &#x2022; &nbsp; &nbsp;</p>
          <p>{projectData.company.name}</p>
        </div>
        <div
          className="general-top-bar-logout-box"
          title="Logout"
          onClick={() => logoutUser()}
        >
          <div>
            <p>Log Out</p>
          </div>
          <div>
            <img src={logoutIcon} alt="Logout Icon" />
          </div>
        </div>
      </div>

    </>
  );
}
