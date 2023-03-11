import React, { useEffect } from "react";

import "../../css/userList.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";

import logo_svg from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const usersListData = useSelector((state) => state.user.userslist);

  const setToken = (data) => dispatch(actions.setToken(data));
  const setUserData = (data) => dispatch(actions.setUserData(data));
  const setUsersListData = (data) => dispatch(actions.setUsersListData(data));

  const resetStore = () => dispatch(actions.reset());
  const navigateHome = () => navigate("/");
  const navigateDashboard = () => navigate("/dashboard");

  const logoutUser = () => {
    setToken("");
    resetStore();
    navigateHome();
  };

  useEffect(() => {
    getUserInfo();
    getUserList();
  }, []);

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
  const updateUserStatus = (uid, is_active) => {
    try {
      // Get user data
      axios
        .put(
          `${baseUrl}/cred/profile/`,
          {
            id: uid,
            is_active: !is_active,
          },
          {
            headers: {
              Authorization: "Bearer " + authToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            notify(ToastType.SUCCESS, "User status updated successfully.");
            getUserList();
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  const getUserList = () => {
    try {
      // Get User List data
      axios
        .get(`${baseUrl}/cred/list/`, {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            setUsersListData(data.data);
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="logo-box" >
          <div className="logo">
            <img
            onClick={navigateHome}
              src={logo_svg}
              alt="N6 Logo"
              title="N6 Logo"
              width={35}
              height={45.8}
            />
          </div>
        </div>
        <div className="user-name-box" title="User Name">
          <div className="user-name-square">
            <img src={userIcon} alt="User Icon" width={25} height={25} />
            <p>{userData.user_name}</p>
          </div>
        </div>
        <div className="empty-box">&nbsp;</div>
        <div
          className="log-out-box"
          title="User Name"
          onClick={() => logoutUser()}
        >
          <p>Log Out</p>
          <img src={logoutIcon} alt="Log Out Icon" width={17} height={18} />
        </div>
      </div>

      <div className="bread-and-btns-bar">
        <div className="breadcrumbs">
          <p>N6 &#62; </p>
          <p onClick={navigateDashboard}>Dashboard</p>
        </div>
        <div className="create-options-box">
          
        </div>
      </div>

      <div className="user-list-box">
        <div className="user-list-header-box">
          <div>
            <div>
              <p>#</p>
            </div>
            <div>
              <p>Name</p>
            </div>
            <div>
              <p>Email</p>
            </div>
            <div>
              <p>Company</p>
            </div>
            <div>
              <p>Role</p>
            </div>
          </div>
          <div>
            <p>Status</p>
          </div>
        </div>
        {usersListData.length > 0 &&
          usersListData.map((user, index) => {
            return (
              <div className="user-box">
                <div title="1">
                  <div>
                    <p>{index + 1}.</p>
                  </div>
                  <div>
                    <p>
                      {user.user.first_name} {user.user.last_name}
                    </p>
                  </div>
                  <div>
                    <p>{user.user.email_address}</p>
                  </div>
                  <div>
                    <p>{user.user.company.name}</p>
                  </div>
                  <div>
                    {/* <p>{user.user_level.role}</p> */}
                    <p>{user.id}</p>
                  </div>
                </div>
                <div>
                  {user.id !== userData.id && (
                    <label className="user-box-toggle-btn">
                      <input
                        type="checkbox"
                        checked={user.is_active}
                        onClick={() => {
                          updateUserStatus(user.id, user.is_active);
                        }}
                      />
                      <span className="slider round"></span>
                    </label>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}