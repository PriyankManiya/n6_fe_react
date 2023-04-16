import "react-dropdown/style.css";
import "../../css/model.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";

import { notify, ToastType } from "../utils";

export default function NewCompanyModel({ setOpenModal, companyDetails }) {
  const dispatch = useDispatch();

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const [companyInfo, setCompanyInfo] = useState({});

  const setComapniesData = (data) => dispatch(actions.setComapniesData(data));

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

  const updateCompany = (info) => {
    try {
      axios
        .put(
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

  useEffect(() => {
    setCompanyInfo(companyDetails);
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Create Company</h1>
        </div>
        <div className="add-company-form-new-name">
          <label for="new-company-name">
            Company Name<sup>*</sup>
          </label>
          <input
            type="text"
            id="new-company-name"
            name="new-company-name"
            value={companyInfo.name}
            onChange={(e) =>
              setCompanyInfo({ ...companyInfo, name: e.target.value })
            }
          />
        </div>
        <div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>Email*</div>
          <input
            style={{ marginBottom: "0px" }}
            type="email"
            className="login-input"
            placeholder="Email"
            value={companyInfo.email_address}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                email_address: e.target.value,
              })
            }
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
            value={companyInfo.mobile_num}
            onChange={(e) =>
              setCompanyInfo({
                ...companyInfo,
                mobile_num: e.target.value,
              })
            }
          />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              // eslint-disable-next-line no-lone-blocks
              {
                companyDetails.id
                  ? updateCompany(companyInfo)
                  : addCompany(companyInfo);
              }
              setOpenModal(false);
            }}
          >
            {companyDetails.id ? "Update" : "Create"}
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
