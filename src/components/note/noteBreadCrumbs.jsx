import React, { useEffect } from "react";
import "../../css/general.css";
import "../../css/note.css";
import "../../css/model.css";


import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify, ToastType } from "../utils";


export default function NoteBreadCrumbs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const baseUrl = useSelector((state) => state.auth.base_url);
    const authToken = useSelector((state) => state.auth.token);
    const projectData = useSelector((state) => state.projects.project);
    const setUserData = (data) => dispatch(actions.setUserData(data));

    const navigateDashboard = () => navigate("/dashboard");

    useEffect(() => {
        getUserInfo();
    }, []);

    /**
     * It gets the user data from the backend and sets it to the state
     */
    const getUserInfo = () => {
        try {
            // Get user data
            axios
                .get(`${baseUrl}/cred/profile/`, {
                    headers: {
                        Authorization: "Bearer " + authToken,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        // notify(ToastType.SUCCESS, data.msg);
                        setUserData(data.data);
                    }
                });
        } catch (error) {
            console.log("error >>>> ", error);
            notify(ToastType.ERROR, "Something went wrong. Please try again later.");
        }
    };

    return (
        <>
            <div className="general-bread-and-btn-bar">
                <div className="breadcrumbs-box">
                    <p className="breadcrumbs-titles breadcrumbs-titles-links" onClick={navigateDashboard}>N6</p>
                    <p className="breadcrumbs-arrows">&nbsp;&#62;&nbsp;</p>
                    <p className="breadcrumbs-titles breadcrumbs-titles-links" onClick={navigateDashboard}>Dashboard</p>
                    <p className="breadcrumbs-arrows">&nbsp;&#62;&nbsp;</p>
                    <p className="breadcrumbs-titles">{projectData.name}</p>
                </div>
            </div>
        </>
    );
}
