import React, { useRef } from "react";
import { actions } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NoteHeader from "./noteHeader";
import ViewNoteBreadCrumbs from "./viewNoteBreadCrumbs";

import "./viewNote.css";

import n6Logo from "../../assets/svg/Common/Logo.svg";
import userIcon from "../../assets/svg/Common/userIcon.svg";
import logoutIcon from "../../assets/svg/Common/logoutIcon.svg";
import addItemIcon from "../../assets/svg/Common/addItemIcon.svg";
import cancelIcon from "../../assets/svg/Common/cancelIcon.svg";
import respondIcon from "../../assets/svg/Common/respondIcon.svg";
import attachmentIcon from "../../assets/svg/Common/attachmentIcon.svg";
import editNoteIcon from "../../assets/svg/Common/editNoteIcon.svg";

export default function ViewNote() {
  return (
    <>
      <NoteHeader />
      <ViewNoteBreadCrumbs />

      <div className="primary-note-container">
        <div className="primary-note">
          <div className="primary-note-title-container">
            <p>Note Title</p>
          </div>
          <div className="primary-note-content-container">
            {/*Content from text editor will go inside this container.*/}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            fermentum, neque non euismod facilisis, arcu turpis efficitur odio,
            ut aliquet orci augue a magna. In hendrerit nisl at eleifend
            blandit. Aliquam semper urna libero, a tristique tellus molestie ut.
            Sed ac neque mi. Quisque ac massa turpis. Nam sed risus sem.
            Phasellus consequat sem ac commodo suscipit. Donec semper tincidunt
            augue ut interdum. Donec condimentum, lectus non venenatis lobortis,
            nisl mauris vehicula quam, nec pharetra erat orci vel libero. Fusce
            nec finibus libero. In euismod hendrerit sapien nec lacinia.
            Maecenas rutrum justo faucibus nisl semper, id scelerisque massa
            euismod. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Vestibulum dapibus tincidunt
            eleifend. Curabitur justo arcu, interdum maximus lobortis quis,
            vehicula eget augue. Phasellus dictum lorem in augue mattis, aliquet
            pellentesque libero cursus. Vivamus in auctor est, eu molestie
            massa. Aliquam erat volutpat. Donec vitae aliquet dui. Integer id
            dapibus mi. Aliquam finibus, erat sed congue feugiat, elit diam
            ornare sapien, in ullamcorper diam mauris et ligula. Vestibulum
            vestibulum congue lorem et luctus. Nam a tellus porta, vestibulum
            odio nec, dictum magna. Sed urna neque, varius ut mauris vel,
            sodales volutpat orci. Aenean ac enim porttitor, facilisis turpis
            ac, iaculis mauris. Cras porta sapien eget facilisis pharetra.
            Aliquam sed lacus vitae velit aliquam condimentum. Phasellus eget
            tortor id odio ullamcorper malesuada. Praesent sit amet sem quam.
            Duis vitae congue lectus, sit amet ullamcorper libero. Suspendisse
            turpis neque, lacinia nec vehicula id, laoreet ut nisl. Morbi
            accumsan tempus lorem. Suspendisse blandit, turpis at lobortis
            sollicitudin, tellus dui mollis quam, id placerat sem orci et
            ligula. Fusce vel risus ornare, ultricies tellus vel, sodales augue.
            Fusce laoreet dui nibh, consectetur suscipit lorem sodales
            vulputate. Aenean sed mauris magna. Curabitur lacus turpis, blandit
            nec dolor eu, consectetur vehicula ante. Ut eros turpis, aliquam in
            quam nec, molestie scelerisque arcu. Maecenas lacus tellus, rutrum a
            interdum non, posuere quis augue. Cras egestas neque nisi, et
            vestibulum elit sodales quis. Duis venenatis urna metus, eget
            accumsan erat pulvinar id. Sed nisl arcu, dignissim non pharetra at,
            faucibus sed lorem. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Phasellus scelerisque gravida ex vitae feugiat. Nunc
            fermentum felis nec enim aliquam aliquet. Vivamus tempus convallis
            risus, pharetra vehicula eros maximus sit amet. Proin vulputate
            congue leo, non pulvinar nisi rutrum sed. Curabitur pellentesque
            porttitor rutrum. Proin eget tellus ullamcorper, sodales ex in,
            luctus nibh. Etiam libero erat, interdum et dui ac, blandit luctus
            eros. Nullam varius, turpis ac convallis vestibulum, nisi mi blandit
            quam, eget aliquam sem dolor semper purus. Suspendisse ornare vel
            sem id scelerisque. Nunc volutpat porta felis, in congue dui
            eleifend eget.
          </div>
          <div className="primary-note-info-and-options-container">
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
        <div className="respond-note">
          <div className="respond-note-content-container">
            {/*Content from text editor will go inside this container.*/}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              fermentum, neque non euismod facilisis, arcu turpis efficitur
              odio, ut aliquet orci augue a magna. In hendrerit nisl at eleifend
              blandit. Aliquam semper urna libero, a tristique tellus molestie
              ut. Sed ac neque mi. Quisque ac massa turpis. Nam sed risus sem.
              Phasellus consequat sem ac commodo suscipit. Donec semper
              tincidunt augue ut interdum. Donec condimentum, lectus non
              venenatis lobortis, nisl mauris vehicula quam, nec pharetra erat
              orci vel libero. Fusce nec finibus libero. In euismod hendrerit
              sapien nec lacinia. Maecenas rutrum justo faucibus nisl semper, id
              scelerisque massa euismod. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Vestibulum
              dapibus tincidunt eleifend. Curabitur justo arcu, interdum maximus
              lobortis quis, vehicula eget augue. Phasellus dictum lorem in
              augue mattis, aliquet pellentesque libero cursus. Vivamus in
              auctor est, eu molestie massa. Aliquam erat volutpat. Donec vitae
              aliquet dui. Integer id dapibus mi. Aliquam finibus, erat sed
              congue feugiat, elit diam ornare sapien, in ullamcorper diam
              mauris et ligula. Vestibulum vestibulum congue lorem et luctus.
              Nam a tellus porta, vestibulum odio nec, dictum magna. Sed urna
              neque, varius ut mauris vel, sodales volutpat orci. Aenean ac enim
              porttitor, facilisis turpis ac, iaculis mauris. Cras porta sapien
              eget facilisis pharetra. Aliquam sed lacus vitae velit aliquam
              condimentum. Phasellus eget tortor id odio ullamcorper malesuada.
              Praesent sit amet sem quam. Duis vitae congue lectus, sit amet
              ullamcorper libero. Suspendisse turpis neque, lacinia nec vehicula
              id, laoreet ut nisl. Morbi accumsan tempus lorem. Suspendisse
              blandit, turpis at lobortis sollicitudin, tellus dui mollis quam,
              id placerat sem orci et ligula. Fusce vel risus ornare, ultricies
              tellus vel, sodales augue. Fusce laoreet dui nibh, consectetur
              suscipit lorem sodales vulputate. Aenean sed mauris magna.
              Curabitur lacus turpis, blandit nec dolor eu, consectetur vehicula
              ante. Ut eros turpis, aliquam in quam nec, molestie scelerisque
              arcu. Maecenas lacus tellus, rutrum a interdum non, posuere quis
              augue. Cras egestas neque nisi, et vestibulum elit sodales quis.
              Duis venenatis urna metus, eget accumsan erat pulvinar id. Sed
              nisl arcu, dignissim non pharetra at, faucibus sed lorem. Interdum
              et malesuada fames ac ante ipsum primis in faucibus. Phasellus
              scelerisque gravida ex vitae feugiat. Nunc fermentum felis nec
              enim aliquam aliquet. Vivamus tempus convallis risus, pharetra
              vehicula eros maximus sit amet. Proin vulputate congue leo, non
              pulvinar nisi rutrum sed. Curabitur pellentesque porttitor rutrum.
              Proin eget tellus ullamcorper, sodales ex in, luctus nibh. Etiam
              libero erat, interdum et dui ac, blandit luctus eros. Nullam
              varius, turpis ac convallis vestibulum, nisi mi blandit quam, eget
              aliquam sem dolor semper purus. Suspendisse ornare vel sem id
              scelerisque. Nunc volutpat porta felis, in congue dui eleifend
              eget.
            </p>
          </div>
          <div className="respond-note-info-and-options-container">
            <div className="respond-note-author-info-container">
              <div className="respond-note-author-name">
                <p>Author Name</p>
              </div>
              <div className="respond-note-timestamp">
                <p>mmm dd, yyyy hh:mm AM</p>
              </div>
            </div>
            <div className="respond-note-read-status-container">
              <p>Unread</p>
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
