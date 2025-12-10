import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { useState } from "react";
import Login from "./authtication/Login";
import LandingPage from "./authtication/MainLendingpage";
import DoctorLandingPage from "./authtication/doctorLandingPage";
import Signup from "./authtication/Signup";
import DoctorDashboard from "./components/DoctorDashboard/DoctorDashboard";
import DoctorCalendar from "./components/DoctorDashboard/Calendar";
import DoctorProfileFlow from "./components/DoctorDashboard/ActivateProfile";
import DoctorProfile from "./components/DoctorDashboard/DoctorProfile";
import QRcode from "./components/DoctorDashboard/AllQRcode";
import AppointmentList from "./components/DoctorDashboard/Appointment List";
// import Setting from "./components/DoctorDashboard/Setting";
// import PatientDashboard from "./components/PatientDashboard/PatientDashboard";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/doctor" ||
    location.pathname === "/signup";

  return (
    <>
      {/* Show navbar only if layout is visible */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}

      {/* If layout is hidden (login/signup) — show only routes */}
      {hideLayout ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor" element={<DoctorLandingPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        // Main Layout
        <div className="main-content">
          <Sidebar
            collapsed={isSidebarCollapsed}
            menuItemClick={menusidebarcollaps}
          />

          <div
            className={`right-side-content ${
              isSidebarCollapsed ? "collapsed" : ""
            }`}
          >
            <Routes>
              {/* Doctor Dashboard */}
              <Route path="/doctordashboard" element={<DoctorDashboard />} />
              <Route path="/doctorcalendar" element={<DoctorCalendar />} />
              <Route path="/doctorprofileflow" element={<DoctorProfileFlow />} />
              <Route path="/doctorprofile" element={<DoctorProfile />} />
              <Route path="/qrcode" element={<QRcode />} />
              <Route path="/appointmentlist" element={<AppointmentList />} />
              {/* <Route path="/setting" element={<Setting />} /> */}
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
