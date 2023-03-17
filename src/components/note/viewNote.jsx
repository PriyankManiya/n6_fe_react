import React, { useRef, useEffect } from "react";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NoteHeader from "./noteHeader";
import ViewNoteBreadCrumbs from "./viewNoteBreadCrumbs";

import axios from "axios";
import { notify, ToastType } from "../utils";

import "../../css/viewNote.css";

import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";
import cancelIcon from "../../assets/svg/Common/cancelIcon.svg";
import respondIcon from "../../assets/svg/Common/respondIcon.svg";
import editNoteIcon from "../../assets/svg/Common/editNoteIcon.svg";

export default function ViewNote() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const baseUrl = useSelector((state) => state.auth.base_url);
    const authToken = useSelector((state) => state.auth.token);
    const noteData = useSelector((state) => state.notes.note);

    const formateTIme = (dateString) => {
        const dateObj = new Date(dateString);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return dateObj.toLocaleDateString("en-US", options);
    };

    const setNoteData = (data) => dispatch(actions.setNoteData(data));

    const getRespondedNote = (id) => {
        if (id) {
            try {
                // Get Responded Note data
                axios
                    .get(
                        `${baseUrl}/note/respond/${id}`,

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
                            setNoteData(data.data);
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

    useEffect(() => {
        getRespondedNote(id);
    }, []);

    return (
        <>
            <NoteHeader />
            <ViewNoteBreadCrumbs noteName={noteData["original_note"]["topic"]} />

            <div className="primary-note-container">
                <div className="primary-note">
                    <div className="primary-note-title-container">
                        <p>{noteData["original_note"]["topic"]}</p>
                    </div>
                    <div className="primary-note-content-container">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: noteData["original_note"]["content_html"],
                            }}
                        ></div>
                    </div>
                    <div className="primary-note-info-and-options-container">
                        <div className="primary-note-author-info-container">
                            <div className="primary-note-author-name">
                                <p>
                                    {noteData["original_note"]["user"]["first_name"]}{" "}
                                    {noteData["original_note"]["user"]["last_name"]}
                                </p>
                            </div>
                            <div className="primary-note-timestamp">
                                <p>{formateTIme(noteData["original_note"]["created_at"])}</p>
                            </div>
                        </div>
                        <div className="primary-note-read-status-container">
                            <p>
                                {noteData["original_note"]["read_tf"] === true
                                    ? "Read"
                                    : "Unread"}
                            </p>
                        </div>
                        <div className="primary-note-options-container">
                            <div className="primary-note-edit-button-container">
                                <div className="primary-note-edit-button">
                                    <div>
                                        <img src={editNoteIcon} alt="Edit Note Icon" />
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
                <div className="primary-note-attachments-container"></div>
            </div>

            <div className="respond-note-container">
                {noteData["responded_note"].map((item, index) => {
                    return (
                        <div className="respond-note">
                            <div className="respond-note-content-container">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item["content_html"],
                                    }}
                                ></div>
                            </div>
                            <div className="respond-note-info-and-options-container">
                                <div className="respond-note-author-info-container">
                                    <div className="respond-note-author-name">
                                        <p>
                                            {item["user"]["first_name"]} {item["user"]["last_name"]}
                                        </p>
                                    </div>
                                    <div className="respond-note-timestamp">
                                        <p>{formateTIme(item["created_at"])}</p>
                                    </div>
                                </div>
                                <div className="respond-note-read-status-container">
                                    <p>{item["read_tf"] === true ? "Read" : "Unread"}</p>
                                </div>
                                <div className="respond-note-options-container">
                                    <div className="respond-note-edit-button-container">
                                        <div className="respond-note-edit-button">
                                            <div>
                                                <img src={editNoteIcon} alt="Edit Note Icon" />
                                            </div>
                                            <div>
                                                <p>Edit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="respond-note-attachments-container"></div>
            </div>

            <div className="bottom-spacer">&nbsp;</div>

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
