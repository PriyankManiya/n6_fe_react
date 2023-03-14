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
import respondIcon from "../../assets/svg/Common/respondIcon.svg";
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
                        <p>Note Title</p>
                    </div>
                    <div className="primary-note-content-container">
                        <p>
                            Welcome to the Online Course Blueprint for Awesome. This blueprint should be used as a guide and starting place to get your first (or twentieth) online course off the ground.

                            Most online courses start off with a great welcome post used to draw students in and prepare them for the road ahead.
                            It is very effective to add a video to this post to introduce yourself as the instructor.
                            Course and the lesson materials used for this course.

                            Welcome to the Online Course Blueprint for Awesome. This blueprint should be used as a guide and starting place to get your first (or twentieth) online course off the ground.
                        </p>
                    </div>
                    <div className="primary-note-info-and-respond-container">
                        <div className="primary-note-author-info-container">
                            <div className="primary-note-author-name">
                                <p>Author Name</p>
                            </div>
                            <div className="primary-note-timestamp">
                                <p>mmm dd, yyyy hh:mm AM</p>
                            </div>
                        </div>
                        <div className="primary-note-read-status-container">
                            <p>Unread</p>
                        </div>
                        <div className="primary-note-options-container">
                            <div className="primary-note-edit-button-container">
                                <div className="primary-note-edit-button">
                                    <div>
                                        
                                    </div>
                                    <div>
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>
                            <div className="primary-note-respond-button-container">
                                <div className="primary-note-respond-button">
                                    <div>
                                        <img src={respondIcon} alt="Respond Icon" />
                                    </div>
                                    <div>
                                        <p>Respond</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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