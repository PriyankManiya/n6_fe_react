import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "./dashboard.css";

import { useSelector, useDispatch } from "react-redux";

export default function AddProjectForm({
  setShowAddProjectFrom,
  setShowAddProjectFromNext,
}) {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("Select an option");

  const companiesListData = useSelector(
    (state) => state.companies.companies_list
  );

  useEffect(() => {
    setCompanies([]);
    companiesListData.map((item) => {
      setCompanies((companies) => [
        ...companies,
        { value: item.id, label: item.name },
      ]);
    });
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
                />
              </div>
              <div className="add-company-form-new-mobile">
                <label for="new-company-mobile-number">Mobile Number</label>
                <input
                  type="text"
                  id="new-company-mobile-number"
                  name="new-company-mobile-number"
                />
              </div>
            </form>
            <div className="add-company-form-box-buttons">
              <div
                onClick={() => {
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
          </div>
        </div>
      </div>
    </>
  );
}
