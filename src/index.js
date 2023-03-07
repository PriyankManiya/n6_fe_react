import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import store, { persistor } from "./store"; 
import { PersistGate } from "redux-persist/integration/react"; 


import App from './App';
import Login from './components/auth/login';
import NewPassword from './components/auth/newPassword';
import Forgetpassword from './components/auth/forgotPassword';
import ResetPasswordLink from './components/auth/resetPasswordLink';
import Dashboard from './components/dashboard/dashboard';
import Note from './components/note/note';
import NoteCreate from './components/note/create';
import UserList from './components/user/userList';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* wrap your app with PersistGate */}
      <React.StrictMode>
        <Router>
        <ToastContainer />
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/forget-password" element={<Forgetpassword />} />
            <Route path="/reset-password-link/:uid/:token" element={<ResetPasswordLink />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/note/:id" element={<Note />} />
            <Route path="/note-create" element={<NoteCreate />} />
            <Route path="/user-list" element={<UserList />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
