import React, { useEffect, useState } from "react";
import "./dashboard.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import { notify, ToastType } from "../utils";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import projectIcon from "../../assets/svg/Common/projectIcon.svg";

/* Modals - Kishan J */
import AddProjectForm from "./addProjectFormModal";
import AddProjectFormNext from "./addProjectFormNextModal";
import UpdateProjectFormNext from "./updateProjectFormModal";
import UpdateProjectForm from "./updateProjectFormModal";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  /* Modals - Kishan J */
  const [showAddProjectForm, setShowAddProjectFrom] = useState(false);
  const [showAddProjectFormNext, setShowAddProjectFromNext] = useState(false);

  const [selectedProjectId, setselectedProjectId] = useState(0);
  const [selectedProjectStatus, setselectedProjectStatus] = useState(true);

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const projectsListData = useSelector((state) => state.projects.project_list);

  const setToken = (data) => dispatch(actions.setToken(data));
  const setUserData = (data) => dispatch(actions.setUserData(data));
  const setProjectsData = (data) => dispatch(actions.setProjectsData(data));
  const setProjectData = (data) => dispatch(actions.setProjectData(data));
  const setComapniesData = (data) => dispatch(actions.setComapniesData(data));
  const setDefaultCreateProject = () => dispatch(actions.setDefaultCreateProject());

  const resetStore = () => dispatch(actions.reset());
  const navigateHome = () => navigate("/");
  const navigateUserList = () => navigate("/user-list");

/**
 * It takes the id of the project that was clicked on, and then it loops through the projectsListData
 * array to find the project with the matching id. Once it finds the matching project, it sets the
 * projectData state to that project, and then it navigates to the note page
 */
  const navigateNotes = (id) => {
    for (let i = 0; i < projectsListData.length; i++) {
      if (projectsListData[i].id === id) {
        setProjectData(projectsListData[i]);
        break;
      }
    }
    navigate("/note/" + id);
  };

/**
 * It clears the token and resets the store.
 */
  const logoutUser = () => {
    setToken("");
    resetStore();
    navigateHome();
  };

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

  /**
   * It fetches the list of projects from the backend and sets the state of the component
   */
  const getProjects = () => {
    try {
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
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

  /**
   * It fetches the list of companies from the backend and sets the state of the component
   */
  const getCompanyList = () => {
    try {
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

  /**
   * A function that is used to update the status of a project.
   */
  const UpdateProjectStatus = (id, is_active) => {
    try {
      axios
        .delete(`${baseUrl}/project/`, {
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
          data: {
            id,
            is_active,
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.status === 200) {
            notify(ToastType.SUCCESS, data.msg);
            getProjects();
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

  useEffect(() => {
    getUserInfo();
    getProjects();
    getCompanyList();
  }, []);

  /* The above code is a React component that is used to display a modal. */
  function Model({ setOpenModal }) {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title"></div>
          <div className="body">
            <p>Are You Sure You Want to Continue?</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                UpdateProjectStatus(selectedProjectId, !selectedProjectStatus);

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
      {showAddProjectForm && (
        <AddProjectForm
          setShowAddProjectFrom={setShowAddProjectFrom}
          setShowAddProjectFromNext={setShowAddProjectFromNext}
          projectId={selectedProjectId}
        />
      )}
      {showAddProjectFormNext && (
        <AddProjectFormNext
          setShowAddProjectFromNext={setShowAddProjectFromNext}
          projectId={selectedProjectId}
        />
      )}
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
          <p>N6 &#62;</p>&nbsp;<p>Dashboard</p>
        </div>

        {userData.user_level_id !== 1 ? (
          <></>
        ) : (
          <div className="btn-box">
            <div className="manage-user-button" onClick={navigateUserList}>
              <div>
                <img src={userIcon} alt="User Icon" />
              </div>
              <div>
                <p>Manage Users</p>
              </div>
            </div>
            <div
              className="add-project-button"
              onClick={() => {
                setDefaultCreateProject()
                setShowAddProjectFrom(true)}}
            >
              <div>
                <img src={projectIcon} alt="Project Icon" />
              </div>
              <div>
                <p>Add Project</p>
              </div>
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
                              setselectedProjectStatus(project.is_active);
                              setselectedProjectId(project.id);
                              setModalOpen(true);
                            }}
                          >
                            {project.is_active
                              ? "Disable Project"
                              : "Enable Project"}
                          </MenuItem>
                          <MenuItem>Manage Access</MenuItem>
                          <MenuItem
                            onClick={() => {
                              setselectedProjectId(project.id);
                              setShowAddProjectFrom(true);
                            }}
                          >
                            Update Details
                          </MenuItem>
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
