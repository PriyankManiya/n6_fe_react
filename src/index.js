import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import Login from "./components/auth/login";
import ClientLogin from "./components/auth/ClientLogin";
import NewPassword from "./components/auth/newPassword";
import Forgetpassword from "./components/auth/forgotPassword";
import ResetPasswordLink from "./components/auth/resetPasswordLink";
import Dashboard from "./components/dashboard/dashboard";
import Note from "./components/note/note";
import NoteCreate from "./components/note/noteCreate";
import UserList from "./components/user/userList";
import CompanyList from "./components/company/companyList";

import ViewNote from "./components/note/viewNote";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {" "}
      {/* wrap your app with PersistGate */}
      <React.StrictMode>
        <Router>
          <ToastContainer />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/forget-password" element={<Forgetpassword />} />
            <Route
              path="/reset-password-link/:uid/:token"
              element={<ResetPasswordLink />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/note/:id" element={<Note />} />
            <Route path="/note-create/:noteId?/:slug?" element={<NoteCreate />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/company-list" element={<CompanyList />} />
            <Route path="/viewnote/:id" element={<ViewNote />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
