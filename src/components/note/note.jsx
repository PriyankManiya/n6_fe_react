import React, { useEffect, useState } from "react";
import "../../css/note.css";
import "../../css/model.css";

import axios from "axios";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import { notify, ToastType } from "../utils";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import noteIcon from "../../assets/svg/Common/noteIcon.svg";
import NoteBreadCrumbs from "./noteBreadCrumbs";
import NoteHeader from "./noteHeader";

import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";
import cancelIcon from "../../assets/svg/Common/cancelIcon.svg";

export default function Note() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNoteId, setselectedNoteId] = useState(0);
    const [selectedNoteStatus, setselectedNoteStatus] = useState(true);

    const { id } = useParams();
    const baseUrl = useSelector((state) => state.auth.base_url);
    const authToken = useSelector((state) => state.auth.token);
    const userData = useSelector((state) => state.user.userData);
    const notesListData = useSelector((state) => state.notes.notes_list);
    const projectData = useSelector((state) => state.projects.project);

    const setToken = (data) => dispatch(actions.setToken(data));
    const setUserData = (data) => dispatch(actions.setUserData(data));
    const setNotesData = (data) => dispatch(actions.setNotesData(data));

  const resetStore = () => dispatch(actions.reset());
  const navigateLogin = () => navigate("/");
  const navigateDashboard = () => navigate("/dashboard");
  const navigateViewNote = (id) => navigate("/viewnote/" + id);
  const navigateNoteCreate = () => navigate("/note-create/");


    useEffect(() => {
        getUserInfo();
        getNotes(id);
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

    /**
     * It gets the notes data from the backend and sets the state of the notes data
     */
    const getNotes = (id) => {
        if (id) {
            try {
                // Get Notes data
                axios
                    .get(`${baseUrl}/note/list/${id}`, {
                        headers: {
                            Authorization: "Bearer " + authToken,
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        let data = res.data;
                        if (data.status === 200) {
                            setNotesData(data.data);
                        }
                    });
            } catch (error) {
                console.log("error >>>> ", error);
                notify(
                    ToastType.ERROR,
                    "Something went wrong. Please try again later."
                );
            }
        }
    };

    /**
     * It takes a noteId as an argument and then makes a DELETE request to the server with the noteId as
     * the data
     */
    const disableNote = (noteId) => {
        try {
            axios
                .delete(`${baseUrl}/note/`, {
                    headers: {
                        Authorization: "Bearer " + authToken,
                        "Content-Type": "application/json",
                    },
                    data: {
                        id: noteId,
                    },
                })
                .then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        getNotes(id);
                    }
                });
        } catch (error) {
            console.log("error >>>> ", error);
            notify(ToastType.ERROR, "Something went wrong. Please try again later.");
        }
    };

    /**
     * It enables a note by making a PUT request to the server
     */
    const enableNote = (noteId) => {
        try {
            axios
                .put(
                    `${baseUrl}/note/`,
                    { id: noteId },
                    {
                        headers: {
                            Authorization: "Bearer " + authToken,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    let data = res.data;
                    if (data.status === 200) {
                        getNotes(id);
                    }
                });
        } catch (error) {
            console.log("error >>>> ", error);
            notify(ToastType.ERROR, "Something went wrong. Please try again later.");
        }
    };

    /**
     * This function is a modal that pops up when the user clicks the delete button
     * @returns A modal that is displayed when the user clicks on the delete button.
     */
    function Model({ setOpenModal }) {
        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        {/* <h1>Are You Sure You Want to Continue?</h1> */}
                    </div>
                    <div className="body">
                        <p>Are You Sure You Want to Continue?</p>
                    </div>
                    <div className="footer">
                        <button
                            onClick={() => {
                                selectedNoteStatus === true
                                    ? disableNote(selectedNoteId)
                                    : enableNote(selectedNoteId);

                                setOpenModal(false);
                            }}
                        >
                            Yes
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

    return (
        <>
            {modalOpen && <Model setOpenModal={setModalOpen} />}

            <NoteHeader />
            <NoteBreadCrumbs />

            {notesListData.map((note) => {
                return (
                    <div className="note-list-box" onClick={()=>navigateViewNote(note.id)}>
                        <div
                            className="note-box"
                            style={{
                                backgroundColor:
                                    note.is_active === true ? "white" : "lightgrey",
                            }}
                        >
                            <div className="note-info-box" onClick={() => { }}>
                                <div>
                                    <img src={noteIcon} alt="Note Icon" width={35} height={35} />
                                </div>
                                <div>
                                    <p>{note.topic}</p>
                                    <p>
                                        Create By {note.user.first_name} {note.user.last_name}
                                    </p>
                                </div>
                            </div>
                            <div className="note-options">
                                <div>
                                    {userData.user_level_id === 1 ? (
                                        <Menu
                                            menuButton={
                                                <MenuButton
                                                    className="menu-block"
                                                    style={{
                                                        backgroundColor:
                                                            note.is_active === true ? "white" : "lightgrey",
                                                    }}
                                                >
                                                    <span className="kebab-icon-note"></span>
                                                    <span className="kebab-icon-note"></span>
                                                    <span className="kebab-icon-note"></span>
                                                </MenuButton>
                                            }
                                            transition
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    setselectedNoteStatus(note.is_active);
                                                    setselectedNoteId(note.id);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                {note.is_active ? "Disable Note" : "Enable Note"}
                                            </MenuItem>
                                        </Menu>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            })}
            <div className="bottom-spacer">&nbsp;</div>
            <div className="note-buttons-bar">
                <div>
                    <div className="note-create-button" onClick={navigateNoteCreate}>
                        <div>
                            <img src={addItemIcon} alt="Create Note Icon" />
                        </div>
                        <div>
                            <p>Create</p>
                        </div>
                    </div>
                    <div className="note-go-back-button">
                        <div>
                            <img src={cancelIcon} alt="Go Back Icon" />
                        </div>
                        <div>
                            <p>Go Back</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
