import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "./dashboard.css";

import { useSelector, useDispatch } from "react-redux";

export default function UpdateProjectForm({
    setShowUpdateProjectFrom,
}) {

    return (
        <>
            <div className="update-project-form-background">
                <div className="update-project-form-box">
                    <div className="update-project-form-title">
                        <p>Create Project</p>
                    </div>
                    <div className="update-project-form-container">
                        <form className="update-project-form">
                            <div className="update-project-form-name">
                                <label for="new-project-name">Project Name</label>
                                <input type="text" id="new-project-name" name="new-project-name" />
                            </div>
                            <div className="update-company-form-select">
                                <label for="company-list">
                                    Company Name
                                </label>
                                <Dropdown
                                    className="dropdown-root"
                                    id="company-list"
                                    name="company-list"
                                    
                                    placeholder="Select an option"
                                />
                            </div>
                            <div className="update-project-form-description">
                                <label for="new-project-description">Description</label>
                                <textarea id="new-project-description" name="new-project-description" />
                            </div>
                        </form>
                        <div className="update-project-form-box-buttons">
                            <div >
                                <p>Update</p>
                            </div>
                            <div onClick={() => { setShowUpdateProjectFrom(false); }}>
                                <p>Cancel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
