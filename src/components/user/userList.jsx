import React, { useEffect, useState } from "react";

import "../../css/general.css";
import "../../css/userList.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";
import CreateCompanyModal from "./createCompanyModal";
import CreateUserModel from "./createUserModel";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [companModalOpen, setCompanyModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const usersListData = useSelector((state) => state.user.userslist);

  const setToken = (data) => dispatch(actions.setToken(data));
  const setUserData = (data) => dispatch(actions.setUserData(data));
  const setUsersListData = (data) => dispatch(actions.setUsersListData(data));
  const setUserRoleListData = (data) =>
    dispatch(actions.setUserRoleListData(data));

  const resetStore = () => dispatch(actions.reset());
  const navigateHome = () => navigate("/");
  const navigateDashboard = () => navigate("/dashboard");
  /**
   * It clears the token and resets the store.
   */

  const logoutUser = () => {
    setToken("");
    resetStore();
    navigateHome();
  };

  /* A react hook that is called when the component is mounted. */
  useEffect(() => {
    getUserRolesList();
    getUserInfo();
    getUserList();
  }, []);

  /**
   * It fetches the user data from the backend and sets the state of the user data
   */
  const getUserInfo = () => {
    try {
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
            setUserData(data.data);
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  /**
   * It updates the user status by sending a PUT request to the server
   */
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
            notify(ToastType.SUCCESS, "Status updated successfully.");
            getUserList();
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  /**
   * It fetches the list of users from the backend and sets the state of the usersListData variable
   */
  const getUserList = () => {
    try {
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
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  /**
   * It fetches the user roles list from the backend and sets the state of the user role list data
   */
  const getUserRolesList = () => {
    try {
      axios
        .get(`${baseUrl}/user/roles/`, {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            setUserRoleListData(data.data);
          } else {
            notify(
              ToastType.ERROR,
              "Something went wrong. Please try again later."
            );
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      {userModalOpen && (
        <CreateUserModel
          setOpenModal={setUserModalOpen}
          getUserList={getUserList}
        />
      )}
      {companModalOpen && (
        <CreateCompanyModal
          setOpenModal={setCompanyModalOpen}
          setUserModalOpen={setUserModalOpen}
        />
      )}
      {isLoading === true ? (
        <div className="general-loader-box">
          <div className="general-loader">Loading...</div>
        </div>
      ) : (
        <>
          <div className="general-top-bar">
            <div className="general-top-bar-info-box">
              <div className="general-top-bar-logo-box">
                <img
                  src={n6Logo}
                  alt="N6 Logo"
                  title="N6"
                  onClick={navigateHome}
                />
              </div>
              <div
                className="general-top-bar-username-box"
                title={userData.user_name}
              >
                <div>
                  <img src={userIcon} alt="User Icon" />
                </div>
                <div>
                  <p>{userData.user_name}</p>
                </div>
              </div>
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

          <div className="general-bread-and-btn-bar">
            <div className="breadcrumbs-box">
              <p
                className="breadcrumbs-titles breadcrumbs-titles-links"
                onClick={navigateDashboard}
              >
                N6
              </p>
              <p className="breadcrumbs-arrows">&nbsp;&#62;&nbsp;</p>
              <p
                className="breadcrumbs-titles breadcrumbs-titles-links"
                onClick={navigateDashboard}
              >
                Dashboard
              </p>
              <p className="breadcrumbs-arrows">&nbsp;&#62;&nbsp;</p>
              <p className="breadcrumbs-titles">Manage Users</p>
            </div>

            <div className="btn-box">
              <div
                className="add-project-button"
                onClick={() => setCompanyModalOpen(true)}
              >
                <div>
                  <img src={addItemIcon} alt="Add User Icon" />
                </div>
                <div>
                  <p>Add User</p>
                </div>
              </div>
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
                    <div
                      title={user.user.first_name + " " + user.user.last_name}
                    >
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
                        <p>{user.user_level.role}</p>
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
      )}
    </>
  );
}
