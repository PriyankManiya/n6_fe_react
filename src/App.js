import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.token);

  const navigateLogin = () => navigate("/login");
  const navigateDashboard = () => navigate("/dashboard");

  // Call function when authToken changes
  useEffect(() => {
    if (authToken !== null && authToken !== "") {
      navigateDashboard();
      console.log("Auth token set: ", authToken);
    } else {
      navigateLogin();
    }
  }, [authToken]);

  return (
    <div className="App">
      <ToastContainer />
    </div>
  );
}

export default App;
