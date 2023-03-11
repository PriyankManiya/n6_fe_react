import React, { useEffect, useState } from "react";

import "./dashboard.css";


export default function AddProjectFormNext({ setShowAddProjectFromNext }) {
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
                                <label for="new-project-name">Project Name<sup>*</sup></label>
                                <input type="text" id="new-project-name" name="new-project-name" />
                            </div>
                            <div className="add-project-form-description">
                                <label for="new-project-description">Description</label>
                                <textarea id="new-project-description" name="new-project-description" />
                            </div>
                        </form>
                        <div className="add-project-form-box-buttons">
                            <div >
                                <p>Create</p>
                            </div>
                            <div onClick={() => { setShowAddProjectFromNext(false); }}>
                                <p>Cancel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}