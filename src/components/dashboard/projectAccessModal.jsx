import "react-dropdown/style.css";
import "../../css/model.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";

import { notify, ToastType } from "../utils";

import updateAccess from "../../assets/svg/Common/update-access.svg";
import StratusUser from "./stratusUser"

export default function ProjectAccessModal({ setOpenModal }) {
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

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="add-project-form-title">
          <p>Update Access</p>
        </div>
        <div>
          <div
            style={{
              marginTop: "15px",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            Invite People to this Project
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "normal",
              marginTop: "8px",
              marginBottom: "12px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            Invite existing team members or add new ones
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #A9A4A4",
              borderRadius: "4px",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            <img
              src={updateAccess}
              alt="Update Access Icon"
              width={25}
              height={25}
            />
            <p style={{ paddingLeft: "10px" }}>Add team members ...</p>
          </div>
        </div>
        <div style={{ paddingTop: "25px" }}></div>
        <div>
          <StratusUser name="Jason Hollway" email="jasonhollway@gmail.com" />
          <div style={{ paddingTop: "15px" }}></div>
          <StratusUser name="Bonnie Lopez" email="bonnielopez@gmail.com" />
          <div style={{ paddingTop: "15px" }}></div>
          <StratusUser name="Timothy Graham" email="timothygraham@gmail.com" withLink={true} link="https://n6.com/?id=91asd....." />
          <div style={{ paddingTop: "15px" }}></div>
          <StratusUser name="Tyson Masha" email="tysonmasha@gmail.com" withLink={true} link="https://n6.com/?id=axsxd....." />
        </div>

        <div className="footer">
          <button
            onClick={() => {
              // eslint-disable-next-line no-lone-blocks
              {
              }
              setOpenModal(false);
            }}
          >
            {"Update"}
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
