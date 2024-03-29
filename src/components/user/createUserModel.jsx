import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../../css/model.css";
import "../../css/createUserModel.css";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";

export default function CreateUserModel({ setOpenModal, getUserList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Select User Role");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const baseUrl = useSelector((state) => state.auth.base_url);
  const authToken = useSelector((state) => state.auth.token);

  const rolesListData = useSelector((state) => state.user.userRoleslist);
  const createUserVal = useSelector((state) => state.user.createUser);

  const setCreateUser = (data) => dispatch(actions.setCreateUser(data));
  const setDefaultCreateUser = () => dispatch(actions.setDefaultCreateUser());

  /**
   * It takes a userId as an argument and then makes an axios post request to the backend with the
   * userId and some other data
   */
  const createCred = (userId) => {
    console.log("userId >>>> ", userId);
    let userReq = { user: userId, ...createUserVal };
    delete userReq.first_name;
    delete userReq.last_name;
    delete userReq.email_address;
    delete userReq.mobile_number;
    delete userReq.company;

    axios
      .post(`${baseUrl}/cred/register/`, {
        ...userReq,
      })
      .then((res) => {
        let data = res.data;
        if (data.status === 200 || data.status === 201) {
          notify(ToastType.SUCCESS, `${data.msg}`);
        } else {
          notify(
            ToastType.ERROR,
            "Something went wrong. Please try again later."
          );
        }
        setDefaultCreateUser();
        getUserList();
      });
  };

  /**
   * It creates a user and then creates a credential for that user
   */
  const createUser = () => {
    try {
      axios
        .post(
          `${baseUrl}/user/`,
          {
            ...createUserVal,
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
            setCreateUser({ user: data.data.id });
            console.log("data >>>> ", data.data.id);
            createCred(data.data.id);
            notify(ToastType.SUCCESS, data.msg);
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

  /* Fetching the user roles list from the backend and setting the state of the user role list data */
  useEffect(() => {
    setRoles([]);
    rolesListData &&
      rolesListData.map((item) => {
        setRoles((userRoles) => [
          ...userRoles,
          { value: item.id, label: item.role },
        ]);
      });
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Create User</h1>
        </div>
        <p>Please enter the information for the user below</p>

        <div>
        <div style={{marginTop:"15px"}}></div>
          {/* <div>First Name*</div> */}
          <input
            style={{ marginBottom: "0px" }}
            type="text"
            value={firstName}
            className="login-input"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
              setCreateUser({ first_name: e.target.value });
            }}
          />
        </div>

        <div>
          {/* <div>Last Name*</div> */}
          <div style={{marginTop:"15px"}}></div>
          <input
            style={{ marginBottom: "0px" }}
            type="text"
            value={lastName}
            className="login-input"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
              setCreateUser({ last_name: e.target.value });
            }}
          />
        </div>
        <div>
          {/* <div>Email Address*</div> */}
          <div style={{marginTop:"15px"}}></div>
          <input
            style={{ marginBottom: "0px" }}
            type="email"
            value={email}
            className="login-input"
            placeholder="Email Address*"
            onChange={(e) => {
              setEmail(e.target.value);
              setCreateUser({ email_address: e.target.value });
            }}
          />
        </div>
        <div>
          {/* <div>Mobile Number*</div> */}
          <div style={{marginTop:"15px"}}></div>
          <input
            style={{ marginBottom: "0px" }}
            type="number"
            value={mobile}
            className="login-input"
            placeholder="Mobile Number*"
            onChange={(e) => {
              setMobile(e.target.value);
              setCreateUser({ mobile_num: e.target.value });
            }}
          />
        </div>
        <div>
        <div style={{marginTop:"15px"}}></div>
          {/* <div>Role*</div> */}
          {rolesListData && rolesListData.length > 0 && (
            <Dropdown
              options={roles}
              onChange={(e) => {
                setSelectedRole(e.value);
                setCreateUser({ user_level: e.value });
              }}
              value={selectedRole}
              placeholder="Select User Role"
            />
          )}
        </div>
        <div>
          {/* <div>Username*</div> */}
          <div style={{marginTop:"15px"}}></div>
          <input
            style={{ marginBottom: "0px" }}
            type="text"
            className="login-input"
            placeholder="Username"
            value={Username}
            onChange={(e) => {
              setUsername(e.target.value);
              setCreateUser({ user_name: e.target.value });
            }}
          />
        </div>
        <div>
          {/* <div>Password*</div> */}
          <div style={{marginTop:"15px"}}></div>
          <input
            style={{ marginBottom: "0px" }}
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setCreateUser({ password: e.target.value });
            }}
          />
        </div>
        <div>
          {/* <div>Confirm Password*</div> */}
          <div style={{marginTop:"15px"}}></div>
          <input
            style={{ marginBottom: "0px" }}
            type="password"
            className="login-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setCreateUser({ password2: e.target.value });
            }}
          />
        </div>
        <div className="footer">
          <div className="add-company-form-box-buttons">
            <div
              onClick={() => {
                createUser();
                setOpenModal(false);
              }}
            >
              <p>Create</p>
            </div>
            <div
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <p>Cancel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
