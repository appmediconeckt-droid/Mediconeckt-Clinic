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
import SettingsPage from "./components/DoctorDashboard/Setting";
import NotificationPage from "./components/DoctorDashboard/NotificationPage";
import ForgotPassword from "./authtication/ForgotPassword";
import PatientSignup from "./authtication/PatientSignup";
import ClinicPage from "./components/DoctorDashboard/ClinicPage";
import WalkInAppointment from "./components/DoctorDashboard/WalkInAppointment";
import PatientLandingPage from "./authtication/patientLandingPage";
import PatientDashboard from "./components/PatientDashboard/PatientDashboard";
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
    location.pathname === "/signup" ||
    location.pathname === "/forgotpassword" ||
    location.pathname === "/patientsignup"||
    location.pathname === "/patient"

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
          <Route path="/patientsignup" element={<PatientSignup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/patient" element={<PatientLandingPage />} />

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
              <Route path="/doctorprofile" element={<DoctorProfileFlow />} />
              <Route path="/doctorprofile" element={<DoctorProfile />} />
              <Route path="/qrcode" element={<QRcode />} />
              <Route path="/appointmentlist" element={<AppointmentList />} />
              <Route path="/setting" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/clinicpage" element={<ClinicPage />} />
              <Route path="/walkinappointment" element={<WalkInAppointment />} />

            </Routes>
            <Routes>
              {/* Patient Dashboard */}
              <Route path="/patientdashboard" element={<PatientDashboard />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
