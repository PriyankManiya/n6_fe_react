import React, { useRef, useState } from "react";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { notify, ToastType } from "../utils";

import "../../css/noteCreate.css";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";
import cancelIcon from "../../assets/svg/Common/cancelIcon.svg";
import attachmentIcon from "../../assets/svg/Common/attachmentIcon.svg";

export default function NoteCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [topic, _setTopic] = useState("");
    const [content_html, _setContentHtml] = useState("");
    const [attachments, _setAttachments] = useState();

    const editorRef = useRef(null);

    const baseUrl = useSelector((state) => state.auth.base_url);
    const authToken = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    const projectData = useSelector((state) => state.projects.project);

    const setToken = (data) => dispatch(actions.setToken(data));
    const setUserData = (data) => dispatch(actions.setUserData(data));
    const setNotesData = (data) => dispatch(actions.setNotesData(data));

    const resetStore = () => dispatch(actions.reset());
    const navigateLogin = () => navigate("/");
    const navigateDashboard = () => navigate("/dashboard");
    const navigateToProject = (id) => navigate("/note/" + id);
    const navigateNote = () => navigate(-1);

    /**
     * It clears the token and resets the store.
     */
    const logoutUser = () => {
        setToken("");
        resetStore();
        navigateLogin();
    };

    /**
     * It saves the content of the editor and the attachments to the database.
     */
    const saveContent = async () => {
        console.log("topic >>>> ");
        if (editorRef.current) {
            console.log("content_html >>>> ", editorRef.current.getContent());
        }

        _postNote();
    };

    /**
     * _postNote() is a function that creates a new note
     */
    const _postNote = () => {
        try {
            axios
                .post(
                    `${baseUrl}/note/`,
                    {
                        user: userData.id,
                        project: projectData.id,
                        topic,
                        content_html: editorRef.current.getContent(),
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
                        notify(ToastType.SUCCESS, "Note Created Successfully.");
                        navigateToProject(projectData.id);
                    }
                });
        } catch (error) {
            console.log("error >>>> ", error);
            notify(ToastType.ERROR, "Something went wrong. Please try again later.");
        }
    };

    const saveAttachments = async (noteId, file) => {

        console.log("file is saveAttachments >>>> ", file);
        console.log("file is saveAttachments >>>> ", typeof file);
        // try {
        //   axios
        //     .post(
        //       `${baseUrl}/attachment/`,
        //       {
        //         note: noteId,
        //         file,
        //       },
        //       {
        //         headers: {
        //           Authorization: "Bearer " + authToken,
        //           "Content-Type": "application/json",
        //         },
        //       }
        //     )
        //     .then((res) => {
        //       let data = res.data;
        //       if (data.status === 200 || data.status === 201) {
        //         notify(ToastType.SUCCESS, "Attachment Created Successfully.");
        //         //   navigateToProject(projectData.id);
        //       }
        //     });
        // } catch (error) {
        //   console.log("error >>>> ", error);
        //   notify(ToastType.ERROR, "Something went wrong. Please try again later.");
        // }
    };

    function ShowTinyEditor() {
        return (
            <>
                <Editor
                    value={content_html}
                    className="create-note-editor"
                    apiKey="bk8m1npjoyflppg2j0luatg8am9fxl65b97tkgewkcgt89d4"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                        height: 500,
                        resize: false,
                        menubar: "edit insert format",
                        plugins: ["lists", "code", "paste code wordcount"],
                        toolbar:
                            "undo redo | " +
                            "bold italic underline backcolor | numlist bullist | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                />
            </>
        );
    }

    return (
        <>
            <div className="general-top-bar">
                <div className="general-top-bar-info-box">
                    <div className="general-top-bar-logo-box">
                        <img src={n6Logo} alt="N6 Logo" title="N6" />
                    </div>
                    <div
                        className="general-top-bar-username-box"
                        title="{userData.user_name}"
                    >
                        <div>
                            <img src={userIcon} alt="User Icon" />
                        </div>
                        <div>
                            <p>{userData.user_name}</p>
                        </div>
                    </div>
                </div>
                <div className="general-top-bar-project-info">
                    <p>{projectData.name}</p>
                    <p>&nbsp; &nbsp; &#x2022; &nbsp; &nbsp;</p>
                    <p>{projectData.company.name}</p>
                </div>
                <div
                    className="general-top-bar-logout-box"
                    title="Logout"
                    onClick={() => logoutUser()}
                >
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
                        Only use the words. They are seperated with p tags below. */}
                    <p>N6</p>
                    <p>&nbsp;&#62;&nbsp;</p>
                    <p onClick={navigateDashboard}>Dashboard</p>
                    <p>&nbsp;&#62;&nbsp;</p>
                    <p onClick={() => navigateToProject(projectData.id)}>
                        {projectData.name}
                    </p>
                    <p>&nbsp;&#62;&nbsp;</p>
                    <p>Create Note</p>
                </div>
            </div>

            <div className="create-note-input-title">
                <input
                    placeholder="Enter Title"
                    value={topic}
                    onChange={(e) => _setTopic(e.target.value)}
                />
            </div>

            <div className="create-note-editor-box">
                <ShowTinyEditor />
            </div>

            <div className="create-note-attachment-box">
                <div className="create-note-attachment-button">
                    <Dropzone onDrop={(acceptedFiles) => _setAttachments(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <img src={attachmentIcon} alt="Attachment Icon" />
                                    <p>Click to attach files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="create-note-attachment-list"></div>
            </div>
            <div className="note-buttons-bar">
                <div>
                    <div onClick={() => saveContent()} className="note-save-button">
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
