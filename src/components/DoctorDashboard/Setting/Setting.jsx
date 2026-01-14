// SettingsPage.jsx
import React, { useState } from "react";
import "./Setting.css";
import { Link, useNavigate } from "react-router-dom";
import ProfessionalProfileTable from "./Profile/DoctorProfile";
import ClinicSettings from "./ClinicSetting/ClinicUpload";
import ProfileCard from "./SettingProfileQR/profileQR";
import PaymentSettings from "./PaymentSetting/PaymentSettings";

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 🔥 NEW
  const [deleteSuccess, setDeleteSuccess] = useState(false); // 🔥 NEW

  const navigate = useNavigate();

  function MenuItem({ id, icon, label }) {
    const isActive = active === id;
    return (
      <button
        onClick={() => setActive(id)}
        className={`settingitem ${isActive ? "active" : ""}`}
      >
        <span className="settingicon">{icon}</span>
        <span className="settingtext">{label}</span>
      </button>
    );
  }

  return (
    <div className="settings-ss p-4">
      <div className="settings-wrapper">
        {/* Sidebar */}
        <aside className="set-side">
          <div className="set-side-box">
            <div className="header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
              <h2 className="mb-3">Settings</h2>
            </div>

            <MenuItem id="profile" icon="👤" label="Profile" />
            {/* <MenuItem id="account" icon="🔒" label="Account" /> */}
            <MenuItem id="clinic" icon="🏥" label="Clinic" />
            <MenuItem
              id="payment"
              icon={<i className="fa-solid fa-credit-card m-lg-1"></i>}
              label="Payment"
            />

            <MenuItem id="profileQR" icon="👤" label="ProfileQR" />

            <hr className="separator" />

            <button
              className="settingitem"
              onClick={() => setShowChangePassword(true)}
            >
              <span className="settingicon">🔑</span> Change Password
            </button>

            <button
              className="settingitem logout"
              onClick={() => setShowLogoutConfirm(true)}
            >
              <span className="settingicon">⛔</span> Logout
            </button>
          </div>

          <div className="set-side-box mt-2">
            <div className="set-side-sub">More</div>
            <MenuItem id="Help" label="Help & Support" />
            <MenuItem id="Privacy" label="Privacy" />

            {/* 🔥 DELETE ACCOUNT BUTTON */}
            <button
              className="more-item text-center"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="all-tab">
          <div className="form-box">
            {active === "profile" && <ProfessionalProfileTable />}
            {active === "account" && <div>Account</div>}
            {active === "clinic" && <ClinicSettings />}
            {active === "payment" && <PaymentSettings />}
            {active === "profileQR" && <ProfileCard />}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-title">Change Password</div>
            <form>
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm Password" />
              <div className="show">
                <button
                  className="btn-light"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
                <button className="btn-primary m-lg-2">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-title">Confirm Logout</div>
            <p>Are you sure?</p>
            <div className="show">
              <button
                className="btn-light"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <Link to="/login">
                <button className="btn-danger m-lg-2">Logout</button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ✅ DELETE ACCOUNT MODAL */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-title">Delete Account</div>
            <p>This action cannot be undone. Are you sure?</p>
            <div className="show">
              <button
                className="btn-light"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn-danger m-lg-2"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteSuccess(true);

                  setTimeout(() => {
                    navigate("/login"); // redirect
                  }, 2500);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ DELETE SUCCESS MESSAGE */}
      {deleteSuccess && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-title text-success">Account Deleted!</div>
            <p>Your account has been deleted successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
