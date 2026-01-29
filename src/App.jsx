import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import { useState } from "react";
import Login from "./authtication/Login";
import LandingPage from "./authtication/MainLendingpage";
import DoctorLandingPage from "./authtication/doctorLandingPage";
import Signup from "./authtication/Signup";
import DoctorDashboard from "./components/DoctorDashboard/Dashboard/DoctorDashboard";
import DoctorCalendar from "./components/DoctorDashboard/Calendar/Calendar";
import DoctorProfileFlow from "./components/DoctorDashboard/DoctorProfile/ActivateProfile";
import DoctorProfile from "./components/DoctorDashboard/Setting/Profile/DoctorProfile";
import QRcode from "./components/DoctorDashboard/AppointmentQR/AllQRcode";
import AppointmentList from "./components/DoctorDashboard/AppointmentList/Appointment List";
import SettingsPage from "./components/DoctorDashboard/Setting/Setting";
import NotificationPage from "./components/DoctorDashboard/Notification/NotificationPage";
import ForgotPassword from "./authtication/ForgotPassword";
import PatientSignup from "./authtication/PatientSignup";
import ClinicPage from "./components/DoctorDashboard/ClinicAllView/ClinicPage";
import WalkInAppointment from "./components/DoctorDashboard/Walk-in/WalkInAppointment";
import PatientLandingPage from "./authtication/patientLandingPage";
import PatientDashboard from "./components/PatientDashboard/PatientDashboard/PatientDashboard";
import PatientAppointment from "./components/PatientDashboard/BookAppointment/PatientAppointment";
import AppointmentBooking from "./components/PatientDashboard/BookAppointment/AppointmentBookingModal";
import Walkin from "./authtication/Walkin";
import PatientNotification from "./components/PatientDashboard/Notification/PatientNotification";
import WalkinClinic from "./authtication/WalkinClinic";
import WalkinAppointment from "./authtication/WalkinAppointment";
import PatientSettingsPage from "./components/PatientDashboard/PatientSetting/SettingsPage";
import QRBooking from "./components/PatientDashboard/QRBooking";
import PatientSms from "./components/PatientDashboard/PatientChat/PatientSms";
import DoctorChatPanel from "./components/PatientDashboard/PatientChat/DoctorChat";
import DoctorChat from "./components/DoctorDashboard/DoctorDashboardChat/DoctorChat";
import PatientList from "./components/DoctorDashboard/DoctorDashboardChat/DoctorSmsPatient";
import DoctorDetailPage from "./authtication/DoctorDetailPage";
import Cardiologist from "./authtication/Cardiologist";
import DentalClinic from "./authtication/Dentist";
import NeuroCareClinic from "./authtication/Neurologist";
import OrthoCareClinic from "./authtication/Orthopedic";
import EyeCareSpecialists from "./authtication/Eye-Specialist";
import SkinCareClinic from "./authtication/Skin-Specialist";
import PediatricCareClinic from "./authtication/Pediatrician";
import WomenHealthCare from "./authtication/Gynecologist";
import MindCareClinic from "./authtication/Psychiatrist";
import EntCareClinic from "./authtication/Ent-Specialist";
import PhysiotherapyClinic from "./authtication/Physiotherapist";
import GeneralPhysicianClinic from "./authtication/General-Physician";
import FollowUp from "./components/DoctorDashboard/Follow-Up/FollowUp";
import PatientDetailsPage from "./components/DoctorDashboard/PatientAppointmentDetails/PatientDetailsPage";
import HospitalSignup from "./authtication/Hospital/HospitalSignup";
import NurseDashboard from "./components/Nurse/NurseDashboard/NurseDashboard";
import NursePatientList from "./components/Nurse/PatientList/NursePatientList";
import VitalSigns from "./components/Nurse/VitalSigns/VitalSigns";
import NurseMedicationPage from "./components/Nurse/Medication/NurseMedicationPage";
import NurseShiftManagement from "./components/Nurse/Shift & Duty Management/NurseShiftManagement";
import NurseEmergencyMenu from "./components/Nurse/Emergency/NurseEmergencyMenu";
import NurseNotifications from "./components/Nurse/NurseNotifications/NurseNotifications";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import SystemSettings from "./components/Admin/SystemSettings/SystemSettings";
import UserManagement from "./components/Admin/UserManagement/UserManagement";
import MedicalAssistantDashboard from "./components/MedicalAssistant/MedicalAssistantDashboard/MedicalAssistantDashboard";
import ManagerDashboard from "./components/DepartmentManager/Dashboard/ManagerDashboard";
import ManagerReports from "./components/DepartmentManager/ManagerReports/ManagerReports";
import SuperAdminDashboard from "./components/SuperAdminDashboard/SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminHospitals from "./components/SuperAdminDashboard/SuperAdminHospitals/SuperAdminHospitals";
import SuperAdminUsers from "./components/SuperAdminDashboard/SuperAdminUsers/SuperAdminUsers";
import SuperAdminRoles from "./components/SuperAdminDashboard/SuperAdminRolesManagement/SuperAdminRoles";
import DoctorUserManagement from "./components/DoctorDashboard/DoctorUserManagement/DoctorUserManagement";
import SuperAdminAnalyticsMenu from "./components/SuperAdminDashboard/SuperAdminAnalyticsMenu/SuperAdminAnalyticsMenu";
import SuperAdminAuditLogs from "./components/SuperAdminDashboard/SuperAdminAuditLogs/SuperAdminAuditLogs";
import SuperAdminSystemHealth from "./components/SuperAdminDashboard/SuperAdminSystemHealth/SuperAdminSystemHealth";
import SuperAdminBackupRestore from "./components/SuperAdminDashboard/SuperAdminBackupRestore/SuperAdminBackupRestore";
import SuperAdminSystemSettings from "./components/SuperAdminDashboard/SuperAdminSystemSettings/SuperAdminSystemSettings";
import SuperAdminNotifications from "./components/SuperAdminDashboard/SuperAdminNotifications/SuperAdminNotifications";
import HospitalConfigMenu from "./components/Admin/hospital-config/HospitalConfigMenu";
import AdminAuditLogs from "./components/Admin/AdminAuditLogs/AuditLogs";
import AdminBackupRestore from "./components/Admin/BackupRestore/AdminBackupRestore";
import AssistantScheduleRooms from "./components/MedicalAssistant/Schedule & Rooms/AssistantScheduleRooms";
import AssistantPatientsTeam from "./components/MedicalAssistant/AssistantPatientsTeam/AssistantPatientsTeam";
import AssistantEquipmentInventory from "./components/MedicalAssistant/AssistantEquipmentInventory/AssistantEquipmentInventory";
import AssistantLogsReports from "./components/MedicalAssistant/AssistantLogsReports/AssistantLogsReports";
import Chatbot from "./components/PatientDashboard/ChatBot/Chatbot";
import LabTechnicianDashboard from "./components/LabTechnicianDashboard/LabTechnicianDashboard/LabTechnicianDashboard";
import TestRequestsMenu from "./components/LabTechnicianDashboard/TestRequestsMenu/TestRequestsMenu";
import LabReportsMenu from "./components/LabTechnicianDashboard/LabReportsMenu/LabReportsMenu";
import SpecimenMenu from "./components/LabTechnicianDashboard/SpecimenMenu/SpecimenMenu";
import MaintenanceMenu from "./components/LabTechnicianDashboard/MaintenanceMenu/MaintenanceMenu";
import InventoryMenu from "./components/LabTechnicianDashboard/InventoryMenu/InventoryMenu";
import HousekeepingDashboard from "./components/HousekeepingDashboard/Dashboard/HousekeepingDashboard";
import CleaningSchedule from "./components/HousekeepingDashboard/CleaningSchedule/CleaningSchedule";
import RoomStatus from "./components/HousekeepingDashboard/RoomStatus/RoomStatus";
import SuppliesManagement from "./components/HousekeepingDashboard/Supplies/SuppliesManagement";
import MaintenanceManagement from "./components/HousekeepingDashboard/MaintenanceManagement/MaintenanceManagement";
import HousekeepingApp from "./components/HousekeepingDashboard/HousekeepingApp/HousekeepingApp";
import SupervisorDashboard from "./components/SupervisorDashboard/SupervisorDashboard/SupervisorDashboard";
import StaffManagement from "./components/SupervisorDashboard/StaffManagement/StaffManagement";
import ShiftManagement from "./components/SupervisorDashboard/ShiftManagement/ShiftManagement";
import PerformanceManagement from "./components/SupervisorDashboard/PerformanceManagement/PerformanceManagement";
import IncidentsManagement from "./components/SupervisorDashboard/IncidentsManagement/IncidentsManagement";
import AllocationManagement from "./components/SupervisorDashboard/AllocationManagement/AllocationManagement";
import ManagerBudget from "./components/DepartmentManager/ManagerBudget/ManagerBudget";
import StaffPerformance from "./components/DepartmentManager/StaffPerformance/StaffPerformance";
import ManagerPolicies from "./components/DepartmentManager/ManagerPolicies/ManagerPolicies";
import ManagerMeetings from "./components/DepartmentManager/ManagerMeetings/ManagerMeetings";
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
    location.pathname === "/patientsignup" ||
    location.pathname === "/patient" ||
    location.pathname === "/appointmentbooking" ||
    location.pathname === "/walkinclinic" ||
    location.pathname === "/qrappointment" ||
    location.pathname === "/walk-in-appointment" ||
    location.pathname === "/cardiologist" ||
    location.pathname === "/dentist" ||
    location.pathname === "/neurologist" ||
    location.pathname === "/orthopedic" ||
    location.pathname === "/eye-specialist" ||
    location.pathname === "/skin-specialist" ||
    location.pathname === "/pediatrician" ||
    location.pathname === "/gynecologist" ||
    location.pathname === "/psychiatrist" ||
    location.pathname === "/ent-specialist" ||
    location.pathname === "/physiotherapist" ||
    location.pathname === "/general-physician" ||
    location.pathname === "/hospital-signup" ||
    location.pathname.startsWith("/doctor-details/");

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
          <Route path="/appointmentbooking" element={<Walkin />} />
          <Route path="/walkinclinic" element={<WalkinClinic />} />
          <Route path="/walk-in-appointment" element={<WalkinAppointment />} />
          <Route path="/qrappointment" element={<QRBooking />} />
          <Route path="/doctor-details/:id" element={<DoctorDetailPage />} />
          <Route path="/cardiologist" element={<Cardiologist />} />
          <Route path="/dentist" element={<DentalClinic />} />
          <Route path="/neurologist" element={<NeuroCareClinic />} />
          <Route path="/orthopedic" element={<OrthoCareClinic />} />
          <Route path="/eye-specialist" element={<EyeCareSpecialists />} />
          <Route path="/skin-specialist" element={<SkinCareClinic />} />
          <Route path="/pediatrician" element={<PediatricCareClinic />} />
          <Route path="/gynecologist" element={<WomenHealthCare />} />
          <Route path="/psychiatrist" element={<MindCareClinic />} />
          <Route path="/ent-specialist" element={<EntCareClinic />} />
          <Route path="/physiotherapist" element={<PhysiotherapyClinic />} />
          <Route path="/general-physician" element={<GeneralPhysicianClinic />} />
          <Route path="/hospital-signup" element={<HospitalSignup />} />

          {/* Doctor Details */}



        </Routes>
      ) : (
        // Main Layout
        <div className="main-content">
          <Sidebar
            collapsed={isSidebarCollapsed}
            menuItemClick={menusidebarcollaps}
          />

          <div
            className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""
              }`}
          >
            <Routes>
              {/* Super-Admin-Dashboard */}
              <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/superadmin/hospitals" element={<SuperAdminHospitals />} />
              <Route path="/superadmin/users" element={<SuperAdminUsers />} />
              <Route path="/superadmin/roles" element={<SuperAdminRoles />} />
              <Route path="/superadmin/analytics" element={<SuperAdminAnalyticsMenu />} />
              <Route path="/superadmin/audit-logs" element={<SuperAdminAuditLogs />} />
              <Route path="/superadmin/system-health" element={<SuperAdminSystemHealth />} />
              <Route path="/superadmin/backup" element={<SuperAdminBackupRestore />} />
              <Route path="/superadmin/settings" element={<SuperAdminSystemSettings />} />
              <Route path="/superadmin/notifications" element={<SuperAdminNotifications />} />





              {/* Admin-Dashboard */}
              <Route path="/hospital/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/hospital/system-settings" element={<SystemSettings />} />
              <Route path="/hospital/user-management" element={<UserManagement />} />
              <Route path="/hospital/hospital-config" element={<HospitalConfigMenu />} />
              <Route path="/hospital/audit-logs" element={<AdminAuditLogs />} />
              <Route path="/hospital/backup" element={<AdminBackupRestore />} />



              {/* DepartmentManager */}
              <Route path="/hospital/manager-dashboard" element={<ManagerDashboard />} />
              <Route path="/hospital/department-reports" element={<ManagerReports />} />
              <Route path="/hospital/budget" element={<ManagerBudget />} />
              <Route path="/hospital/staff-performance" element={<StaffPerformance />} />
              <Route path="/hospital/policy" element={<ManagerPolicies />} />
              <Route path="/hospital/meetings" element={<ManagerMeetings />} />




              {/* Medical-Assistant-Dashboard */}
              <Route path="/hospital/assistant-dashboard" element={<MedicalAssistantDashboard />} />
              <Route path="/hospital/assistant-schedule-rooms" element={<AssistantScheduleRooms />} />
               <Route path="/hospital/assistant-patients-team" element={<AssistantPatientsTeam />} />
               <Route path="/hospital/assistant-inventory" element={<AssistantEquipmentInventory />} />
               <Route path="/hospital/assistant-logs-reports" element={<AssistantLogsReports />} />




              {/* Doctor Dashboard */}
              <Route path="/doctordashboard" element={<DoctorDashboard />} />
              <Route path="/doctorcalendar" element={<DoctorCalendar />} />
              <Route path="/doctorprofile" element={<DoctorProfileFlow />} />
              {/* <Route path="/doctorprofile" element={<DoctorProfile />} /> */}
              <Route path="/qrcode" element={<QRcode />} />
              <Route path="/appointmentlist" element={<AppointmentList />} />
              <Route path="/setting" element={<SettingsPage />} />
              <Route path="/doctor-notifications" element={<NotificationPage />} />
              <Route path="/clinicpage" element={<ClinicPage />} />
              <Route path="/walkinappointment" element={<WalkInAppointment />} />
              <Route path="/patient-sms" element={<PatientList />} />
              <Route path="/patient-chat/:patientId" element={<DoctorChat />} />
              <Route path="/followup" element={<FollowUp />} />
              <Route path="/patient-details" element={<PatientDetailsPage />} />
              <Route path="/doctor-user-management" element={<DoctorUserManagement />} />



              {/* Patient Dashboard */}
              <Route path="/patientdashboard" element={<PatientDashboard />} />
              <Route path="/patientappointment" element={<PatientAppointment />} />
              <Route path="/patient-appointment" element={<AppointmentBooking />} />
              <Route path="/patient-notifications" element={<PatientNotification />} />
              <Route path="/patient-settings" element={<PatientSettingsPage />} />
              <Route path="/doctor-sms" element={<PatientSms />} />
              <Route path="/doctor-chat/:doctorId" element={<DoctorChatPanel />} />
              <Route path="/chatbot" element={<Chatbot />} />

         
              {/* Nurse-Dashboard */}
              <Route path="/hospital/nurse-dashboard" element={<NurseDashboard />} />
              <Route path="/hospital/patient-list" element={<NursePatientList />} />
              <Route path="/hospital/vital-signs" element={<VitalSigns />} />
              <Route path="/hospital/medication" element={<NurseMedicationPage />} />
              <Route path="/hospital/shift-report" element={<NurseShiftManagement />} />
              <Route path="/hospital/emergency-cases" element={<NurseEmergencyMenu />} />
              <Route path="/hospital/nurse-notifications" element={<NurseNotifications />} />

              {/* Lab-Technician-Dashboard */}
              <Route path="/hospital/lab-dashboard" element={<LabTechnicianDashboard />} />
              <Route path="/hospital/test-requests" element={<TestRequestsMenu />} />
              <Route path="/hospital/lab-reports" element={<LabReportsMenu />} />
              <Route path="/hospital/specimen" element={<SpecimenMenu />} />
               <Route path="/hospital/equipment-maintenance" element={<MaintenanceMenu />} />
                <Route path="/hospital/lab-inventory" element={<InventoryMenu />} />




                {/* Housekeeping--Dashboard */}
              <Route path="/hospital/housekeeping-dashboard" element={<HousekeepingDashboard />} />
              <Route path="/hospital/cleaning-schedule" element={<CleaningSchedule />} />
              <Route path="/hospital/room-status" element={<RoomStatus />} />
              <Route path="/hospital/supplies-inventory" element={<SuppliesManagement />} />
              <Route path="/hospital/maintenance-requests" element={<MaintenanceManagement />} />
              <Route path="/hospital/housekeeping-report" element={<HousekeepingApp />} />




              {/* Supervisor-Dashboard */}
              <Route path="/hospital/supervisor-dashboard" element={<SupervisorDashboard />} />
              <Route path="/hospital/staff-management" element={<StaffManagement />} />
              <Route path="/hospital/shift-management" element={<ShiftManagement />} />
              <Route path="/hospital/performance" element={<PerformanceManagement />} />
               <Route path="/hospital/incident-reports" element={<IncidentsManagement />} />
               <Route path="/hospital/resource-allocation" element={<AllocationManagement />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
