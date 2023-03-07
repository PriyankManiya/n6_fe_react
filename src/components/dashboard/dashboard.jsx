import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import { notify, ToastType } from "../utils";

import logo_svg from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";
import projectIcon from "../../assets/svg/Common/projectIcon.svg";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNoteId, setselectedNoteId] = useState(0);
  const [selectedNoteStatus, setselectedNoteStatus] = useState(true);

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const projectsListData = useSelector((state) => state.projects.project_list);

  const setToken = (data) => dispatch(actions.setToken(data));
  const setUserData = (data) => dispatch(actions.setUserData(data));
  const setProjectsData = (data) => dispatch(actions.setProjectsData(data));
  const setProjectData = (data) => dispatch(actions.setProjectData(data));

  const resetStore = () => dispatch(actions.reset());
  const navigateHome = () => navigate("/");
  const navigateUserList = () => navigate("/user-list");

  const navigateNotes = (id) => {
    for (let i = 0; i < projectsListData.length; i++) {
      if (projectsListData[i].id === id) {
        setProjectData(projectsListData[i]);
        break;
      }
    }
    navigate("/note/" + id);
  };

  const refreshPage = () => window.location.reload(false);

  const logoutUser = () => {
    setToken("");
    resetStore();
    navigateHome();
  };

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
            console.log("Setting Data");
            setUserData(data.data);
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
    console.log("Projects Called");
  };

  const getProjects = () => {
    try {
      // Get projects data
      axios
        .get(`${baseUrl}/project/list/`, {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            setProjectsData(data.data);
            // Loading Set

            console.log("Loading called");
            setIsLoading(false);
            console.log("Loading Should be off now");
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
    // }
  };

  useEffect(() => {
    getUserInfo();
    getProjects();
  }, []);

  function Model({ setOpenModal }) {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">
            {/* <h1>Are You Sure You Want to Continue?</h1> */}
          </div>
          <div className="body">
            <p>Are You Sure You Want to Continue?</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                // selectedNoteStatus === true
                //   ? disableNote(selectedNoteId)
                //   : enableNote(selectedNoteId);

                setOpenModal(false);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {modalOpen && <Model setOpenModal={setModalOpen} />}
      <div className="top-bar">
        <div className="logo-box" onClick={navigateHome}>
          <div className="logo">
            <img
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
          <p>N6 &nbsp;</p> <p> &#62; Dashboard </p>
        </div>
        {userData.user_level_id !== 1 ? (
          <></>
        ) : (
          <div className="create-options-box">
            <div className="manage-users-button" onClick={navigateUserList}>
              <img src={userIcon} alt="User Icon" width={25} height={25} />
              <p>Manage Users</p>
            </div>
            <div className="add-project-button">
              <img
                src={addItemIcon}
                alt="Add Project Icon"
                width={25}
                height={30}
              />
              <p>Add Project</p>
            </div>
          </div>
        )}
      </div>

      <div className="project-list-box">
        {isLoading === true ? (
          <div> Fetching Data ..... </div>
        ) : (
          projectsListData.map((project, index) => {
            console.log("Project is active", project.is_active);
            return (
              <div className="project-box">
                <div
                  className="project-info-box"
                  style={{
                    backgroundColor:
                      project.is_active === false ? "#9da2b3" : "",
                  }}
                >
                  <div onClick={() => navigateNotes(project.id)}>
                    <div>
                      <img
                        src={projectIcon}
                        alt="Project Icon"
                        width={35}
                        height={25}
                      />
                    </div>
                    <div>
                      <p>{project.name}</p>
                      <p>{project.company.name}</p>
                    </div>
                  </div>

                  <div className="project-options" onClick={() => {}}>
                    <div>
                      {userData.user_level_id === 1 ? (
                        <Menu
                          menuButton={
                            <MenuButton
                              className="menu-block"
                              style={{
                                backgroundColor:
                                  project.is_active === false
                                    ? "#9da2b3"
                                    : "#1e3a8a",
                              }}
                            >
                              <span className="kebab-icon-dashboard"></span>
                              <span className="kebab-icon-dashboard"></span>
                              <span className="kebab-icon-dashboard"></span>
                            </MenuButton>
                          }
                          transition
                        >
                          <MenuItem
                            onClick={() => {
                              setselectedNoteStatus(project.is_active);
                              setselectedNoteId(project.id);
                              setModalOpen(true);
                            }}
                          >
                            {project.is_active
                              ? "Disable Project"
                              : "Enable Project"}
                          </MenuItem>
                          <MenuItem>Manage Access</MenuItem>
                          <MenuItem>Update Details</MenuItem>
                        </Menu>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigateNotes(project.id)}
                  className="project-description-box"
                >
                  <p>{project.description}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
