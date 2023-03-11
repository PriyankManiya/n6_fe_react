import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../../css/model.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";

export default function CreateCompanyModel({ setOpenModal, setUserModalOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("Select an option");
  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const companiesListData = useSelector(
    (state) => state.companies.companies_list
  );

  const setComapniesData = (data) => dispatch(actions.setComapniesData(data));
  const setCreateUser = (data) => dispatch(actions.setCreateUser(data));

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

  useEffect(() => {
    getCompanyList();
    setCompanies([]);
    companiesListData.map((item) => {
      setCompanies((companies) => [
        ...companies,
        { value: item.id, label: item.name },
      ]);
    });
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Create Company</h1>
        </div>
        <p>Select Company to which the new User belongs</p>

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            Company Name*
          </div>
          <Dropdown
            options={companies}
            onChange={(e) => {
              setSelectedCompany(e);
              setCreateUser({  company: e.value });
            }}
            value={selectedCompany}
            placeholder="Select an option"
          />
        </div>
        <div>----- OR -----</div>
        <div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            Company Name*
          </div>
          <input
            style={{ marginBottom: "0px" }}
            type="text"
            className="login-input"
            placeholder="Company Name"
            onChange={(e) => {}}
          />
        </div>
        <div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>Email*</div>
          <input
            style={{ marginBottom: "0px" }}
            type="email"
            className="login-input"
            placeholder="Email"
            onChange={(e) => {}}
          />
        </div>
        <div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            Mobile Number*
          </div>
          <input
            style={{ marginBottom: "0px" }}
            type="number"
            className="login-input"
            placeholder="Mobile Number"
            onChange={(e) => {}}
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              // selectedNoteStatus === true
              //   ? disableNote(selectedNoteId)
              //   : enableNote(selectedNoteId);
              setOpenModal(false);
              setUserModalOpen(true);
            }}
          >
            Next
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
