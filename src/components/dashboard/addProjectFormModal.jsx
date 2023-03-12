import "react-dropdown/style.css";
import "./dashboard.css";

import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { actions } from "../../store";
import axios from "axios";
import { notify, ToastType } from "../utils";

import { useSelector, useDispatch } from "react-redux";

export default function AddProjectForm({
  setShowAddProjectFrom,
  setShowAddProjectFromNext,
  projectId,
}) {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("Select an option");

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const [companyInfo, setCompanyInfo] = useState({});

  const setCreateProject = (data) => dispatch(actions.setCreateProject(data));
  const setComapniesData = (data) => dispatch(actions.setComapniesData(data));
  

  const companiesListData = useSelector(
    (state) => state.companies.companies_list
  );

  const projectsListData = useSelector((state) => state.projects.project_list);

  const findselectedCompany = () => {
    projectId !== 0 &&
      projectsListData.filter((item) => {
        if (item.id === projectId) {
          setSelectedCompany({
            value: item.company.id,
            label: item.company.name,
          });
          setCreateProject({
            id: item.id,
            company: item.company.id,
            name: item.name,
            description: item.description,
          });
        }
      });
  };

  const addCompany = (info) => {
    try {
      axios
        .post(
          `${baseUrl}/company/`,
          {
            ...info,
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
            getCompanyList();
            setCompanyListData();
            setCreateProject({ company: data.data.id });
            notify(ToastType.SUCCESS, "Company Added Successfully");
          } else {
            notify(
              ToastType.ERROR,
              data.msg || "Something went wrong. Please try again later."
            );
          }
        });
    } catch (error) {
      console.log("error >>>> ", error);
      notify(ToastType.ERROR, "Something went wrong. Please try again later.");
    }
  };

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

  const setCompanyListData = () => {
    setCompanies([]);
    companiesListData.map((item) => {
      setCompanies((companies) => [
        ...companies,
        { value: item.id, label: item.name },
      ]);
    });
  };
  useEffect(() => {
    setCompanyListData();
    findselectedCompany();
  }, []);

  return (
    <>
      <div className="add-project-form-background">
        <div className="add-project-form-box">
          <div className="add-project-form-title">
            <p>Create Project</p>
          </div>
          <div className="add-company-form-box">
            <form className="add-company-form">
              <div className="add-company-form-select-title">
                <p>Select Company for the Project</p>
              </div>
              <div className="add-company-form-select">
                <label for="company-list">
                  Company Name<sup>*</sup>
                </label>
                <Dropdown
                  className="dropdown-root"
                  id="company-list"
                  name="company-list"
                  options={companies}
                  onChange={(e) => {
                    setSelectedCompany(e);
                    setCreateProject({ company: e.value });
                  }}
                  value={selectedCompany}
                  placeholder="Select an option"
                />
              </div>
              <div className="add-company-form-new-title">
                <p>-----OR-----</p>
                <p>Add new Company</p>
              </div>
              <div className="add-company-form-new-name">
                <label for="new-company-name">
                  Company Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  id="new-company-name"
                  name="new-company-name"
                  onChange={(e) =>
                    setCompanyInfo({ ...companyInfo, name: e.target.value })
                  }
                />
              </div>
              <div className="add-company-form-new-email">
                <label for="new-company-email">
                  Email<sup>*</sup>
                </label>
                <input
                  type="text"
                  id="new-company-email"
                  name="new-company-email"
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      email_address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="add-company-form-new-mobile">
                <label for="new-company-mobile-number">Mobile Number</label>
                <input
                  type="text"
                  id="new-company-mobile-number"
                  name="new-company-mobile-number"
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      mobile_num: e.target.value,
                    })
                  }
                />
              </div>
            </form>
            <div className="add-company-form-box-buttons">
              <div
                onClick={() => {
                  if (
                    companyInfo.name &&
                    companyInfo.email_address &&
                    companyInfo.mobile_num
                  ) {
                    // dispatch(actions.createCompany(companyInfo));
                    addCompany(companyInfo);
                  } else {
                  }

                  setShowAddProjectFromNext(true);
                  setShowAddProjectFrom(false);
                }}
              >
                <p>Next</p>
              </div>
              <div
                onClick={() => {
                  setShowAddProjectFrom(false);
                }}
              >
                <p>Cancel</p>
              </div>
            </div>
        </>
    );
}
