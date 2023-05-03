import React, { useEffect, useState } from "react";

import "../../css/general.css";
import "../../css/userList.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";

import NewCompanyModal from "./newCompanyModal";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";

export default function CompanyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [companModalOpen, setCompanyModalOpen] = useState(false);
  const [companyDetails, setcompanyDetails] = useState({});

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const companiesListData = useSelector(
    (state) => state.companies.companies_list
  );

  const setToken = (data) => dispatch(actions.setToken(data));
  const setUserData = (data) => dispatch(actions.setUserData(data));
  const setComapniesData = (data) => dispatch(actions.setComapniesData(data));

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
    getUserInfo();
    getCompanyList();
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
  const updateCompanyStatus = (uid, is_active) => {
    try {
      // Get user data
      axios
        .put(
          `${baseUrl}/company/`,
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
            getCompanyList();
          }
        });
    } catch (error) {
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  /**
   * It fetches the list of users from the backend and sets the state of the usersListData variable
   */
  const getCompanyList = () => {
    try {
      // Get Companies List data
      axios
        .get(`${baseUrl}/company/list/`, {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            setComapniesData(data.data);
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
      {companModalOpen && (
        <NewCompanyModal
          setOpenModal={setCompanyModalOpen}
          companyDetails={companyDetails}
        />
      )}

      <div className="general-top-bar">
        <div className="general-top-bar-info-box">
          <div className="general-top-bar-logo-box">
            <img src={n6Logo} alt="N6 Logo" title="N6" onClick={navigateHome} />
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
          <p className="breadcrumbs-titles">Manage Companies</p>
        </div>

        <div className="btn-box">
          <div
            className="add-project-button"
            onClick={() => {
                setcompanyDetails({});
                setCompanyModalOpen(true)

                }}
          >
            <div>
              <img src={addItemIcon} alt="Add User Icon" />
            </div>
            <div>
              <p>Add Company</p>
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
              <p>Mobile Number</p>
            </div>
          </div>
          <div>
            <p>Status</p>
          </div>
        </div>
        {companiesListData.length > 0 &&
          companiesListData.map((company, index) => {
            return (
              <div
                className="user-box"
                
              >
                <div title="ss" onClick={() => {
                  setcompanyDetails({ ...companyDetails, ...company });
                  setCompanyModalOpen(true);
                }}>
                  <div>
                    <p>{index + 1}.</p>
                  </div>
                  <div>
                    <p>{company.name}</p>
                  </div>
                  <div>
                    <p>{company.email_address}</p>
                  </div>
                  <div>
                    <p>{company.mobile_num}</p>
                  </div>
                </div>
                <div>
                  {
                    <label className="user-box-toggle-btn">
                      <input
                        type="checkbox"
                        checked={company.is_active}
                        onClick={() => {
                          updateCompanyStatus(company.id, company.is_active);
                        }}
                      />
                      <span className="slider round"></span>
                    </label>
                  }
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
