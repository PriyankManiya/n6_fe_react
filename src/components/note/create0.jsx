import "react-quill/dist/quill.snow.css";
import "../../css/quillEditor.css";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import React, { useState } from "react";
import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import logo_svg from "../../assets/svg/Common/Logo.svg";
import saveBtnIcon from "../../assets/svg/Common/save.png";
import cancelBtnIcon from "../../assets/svg/Common/cancel.png";

import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";

// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
];

export default function NoteCreate() {
    const [value, setValue] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const baseUrl = useSelector((state) => state.auth.base_url);
    const authToken = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    const notesListData = useSelector((state) => state.notes.notes_list);

    const setToken = (data) => dispatch(actions.setToken(data));
    const setUserData = (data) => dispatch(actions.setUserData(data));
    const setNotesData = (data) => dispatch(actions.setNotesData(data));

    const resetStore = () => dispatch(actions.reset());
    const navigateLogin = () => navigate("/");
    const navigateDashboard = () => navigate("/dashboard");
    const navigateNote = () => navigate(-1);

    const logoutUser = () => {
        setToken("");
        resetStore();
        navigateLogin();
    };

    return (
        <>
            <div className="top-bar">
                <div className="logo-box">
                    <div className="logo">
                        <img
                            src={logo_svg}
                            alt="N6 Logo"
                            title="N6 Logo"
                            width={35}
                            height={45.8}
                        />
                    </div>
                </div>
                <div className="user-name-box" title="User Name">
                    <div className="user-name-square">
                        <img src={userIcon} alt="User Icon" width={25} height={25} />
                        <p>{userData.user_name}</p>
                    </div>
                </div>
                <div className="empty-box">
                    &nbsp;
                    {notesListData[0].project.name} --{" "}
                    {notesListData[0].project.company.name}
                </div>
                <div
                    className="log-out-box"
                    title="User Name"
                    onClick={() => logoutUser()}
                >
                    <p>Log Out</p>
                    <img src={logoutIcon} alt="Log Out Icon" width={17} height={18} />
                </div>
            </div>

            <div className="breadcrumbs">
                <p>N6 &#62; Dashboard &#62; Astradone &#62; Create Note</p>
            </div>

            <div className="title-form">
                <form>
                    <input
                        className="title-input"
                        type="text"
                        placeholder="Enter Title"
                        tabIndex="1"
                    />
                </form>
            </div>

            <div className="Editor" style={{ margin: "70px" }}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your content here ..."
                    style={{ height: "300px" }}
                />
            </div>

            <div className="Attachment">
                <Dropzone
                    className="dropzone"
                    onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag and drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>

            <div className="bottom-bar">
                <button className="save" type="submit">
                    <img src={saveBtnIcon} alt="Save Note" width={26} height={26} /> Save
                </button>
                <button className="cancel" type="submit">
                    <img src={cancelBtnIcon} alt="Cancel" width={26} height={26} />
                    Cancel
                </button>
            </div>
        </>
    );
}
