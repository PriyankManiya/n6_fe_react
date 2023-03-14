import React, { useRef } from 'react';
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "./viewNote.css";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";
import cancelIcon from "../../assets/svg/Common/cancelIcon.svg";
import attachmentIcon from "../../assets/svg/Common/attachmentIcon.svg";

export default function create() {

    return (
        <>
            <div className="general-top-bar">
                <div className="general-top-bar-info-box">
                    <div className="general-top-bar-logo-box">
                        <img src={n6Logo} alt="N6 Logo" title="N6" />
                    </div>
                    <div className="general-top-bar-username-box" title="User Name">
                        <div>
                            <img src={userIcon} alt="User Icon" />
                        </div>
                        <div>
                            <p>User Name</p>
                        </div>
                    </div>
                </div>
                <div className="general-top-bar-project-info">
                    <p>Project-1</p>
                    <p>&nbsp; &nbsp; &#x2022; &nbsp; &nbsp;</p>
                    <p>Company-1</p>
                </div>
                <div className="general-top-bar-logout-box" title="Logout">
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
                    {/* Do not include '>' and spaces for linking to other pages.
                        Only use the words. They are seperated with p tags below. */ }
                    <p>N6</p>
                    <p>&nbsp;&#62;&nbsp;</p>
                    <p>Dashboard</p>
                    <p>&nbsp;&#62;&nbsp;</p>
                    <p>Astradone</p>
                    <p>&nbsp;&#62;&nbsp;</p>
                    <p>View Note</p>
                </div>
            </div>

            <div className="primary-note-container">
                <div className="primary-note">
                    <div className="primary-note-title-container">
                        <p></p>
                    </div>
                    <div className="primary-note-content-container">

                    </div>
                    <div className="primary-note-info-and-respond-container">

                    </div>
                </div>
                <div className="primary-note-attachments-container">
                    
                </div>
            </div>

            <div className="note-buttons-bar">
                <div>
                    <div className="note-save-button">
                        <div>
                            <img src={addItemIcon} alt="Save Note Icon" />
                        </div>
                        <div>
                            <p>Save</p>
                        </div>
                    </div>
                    <div className="note-cancel-button">
                        <div>
                            <img src={cancelIcon} alt="Cancel Icon" />
                        </div>
                        <div>
                            <p>Cancel</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}