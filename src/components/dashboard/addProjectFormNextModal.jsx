import "../../css/general.css";
import "../../css/dashboard.css";
import "../../css/dashboardModals.css";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store";
import axios from "axios";
import { notify, ToastType } from "../utils";

export default function AddProjectFormNext({
  setShowAddProjectFromNext,
  projectId,
}) {
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const createProject = useSelector((state) => state.projects.createProject);

  const setProjectsData = (data) => dispatch(actions.setProjectsData(data));

  const setCreateProject = (data) => dispatch(actions.setCreateProject(data));
  const setDefaultCreateProject = () =>
    dispatch(actions.setDefaultCreateProject());

  /**
   * It takes the data from the form and sends it to the backend to create a new project
   */
  const addProject = () => {
    try {
      axios
        .post(
          `${baseUrl}/project/`,
          {
            ...createProject,
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
          if (data.status === 200 || data.status === 201) {
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
    setDefaultCreateProject();
    setShowAddProjectFromNext(false);
  };

  /**
   * It updates the project details in the database
   */
  const updateProject = () => {
    try {
      axios
        .put(
          `${baseUrl}/project/`,
          {
            ...createProject,
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
          if (data.status === 200 || data.status === 201) {
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
    setDefaultCreateProject();
    setShowAddProjectFromNext(false);
  };

  /**
   * It fetches the data from the backend and sets the state of the component
   */
  const getProjects = () => {
    try {
      // Get projects data
      axios
        .get(`${baseUrl}/userProjectAccess/list/`, {
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
            console.log("Loading Should be off now");
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
    // }
  };

  return (
    <>
      <div className="add-project-form-background">
        <div className="add-project-form-box">
          <div className="add-project-form-title">
            <p>Create Project</p>
          </div>
          <div className="add-project-form-container">
            <form className="add-project-form">
              <div className="add-project-form-new-title">
                <p>Please enter the information for the project below</p>
              </div>
              <div className="add-project-form-name">
                <label for="new-project-name">
                  Project Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  id="new-project-name"
                  name="new-project-name"
                  value={createProject.name}
                  onChange={(e) => setCreateProject({ name: e.target.value })}
                />
              </div>
              <div className="add-project-form-description">
                <label for="new-project-description">Description</label>
                <textarea
                  id="new-project-description"
                  name="new-project-description"
                  value={createProject.description}
                  onChange={(e) =>
                    setCreateProject({ description: e.target.value })
                  }
                />
              </div>
            </form>
            <div className="add-project-form-box-buttons">
              <div
                onClick={() => {
                  if (projectId !== 0) {
                    updateProject();
                  } else {
                    addProject();
                  }
                }}
              >
                <p>{projectId === 0 ? "Create" : "Update"}</p>
              </div>
              <div
                onClick={() => {
                  setShowAddProjectFromNext(false);
                }}
              >
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
