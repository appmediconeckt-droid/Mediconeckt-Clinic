import React from "react";
import MenuItem from "../MenuItem";

export default function Sidebar({ 
  active, 
  setActive, 
  setShowChangePassword, 
  setShowLogoutConfirm, 
  setShowDeleteConfirm 
}) {
  return (
    <aside className="patient-set-side">
      <div className="patient-set-side-box">
        <div className="patient-header">
          <h2 className="patient-title">Settings</h2>
        </div>

        <MenuItem id="profile" icon="👤" label="Profile" active={active} setActive={setActive} />
        <MenuItem id="appointment" icon="📅" label="Appointments" active={active} setActive={setActive} />
        <MenuItem id="medical" icon="🏥" label="Medical Records" active={active} setActive={setActive} />
        
        <hr className="patient-separator" />

        <button
          className="patient-settingitem"
          onClick={() => setShowChangePassword(true)}
        >
          <span className="patient-settingicon">🔑</span> Change Password
        </button>

        <button
          className="patient-settingitem patient-logout"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <span className="patient-settingicon">⛔</span> Logout
        </button>
      </div>

      <div className="patient-set-side-box patient-mt-2">
        <div className="patient-set-side-sub">More</div>
        <MenuItem id="help" icon="❓" label="Help & Support" active={active} setActive={setActive} />
        <MenuItem id="privacy" icon="🔒" label="Privacy" active={active} setActive={setActive} />
        
        <button
          className="patient-more-item"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <span className="patient-settingicon">🗑️</span> Delete Account
        </button>
      </div>
    </aside>
  );
}