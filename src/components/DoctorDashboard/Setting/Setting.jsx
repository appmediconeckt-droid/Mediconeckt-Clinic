// SettingsPage.jsx
import React, { useState, useEffect } from "react";
import "./Setting.css";
import { Link, useNavigate } from "react-router-dom";
import ClinicSettings from "./ClinicSetting/ClinicUpload";
import ProfileCard from "./SettingProfileQR/profileQR";
import PaymentSettings from "./PaymentSetting/PaymentSettings";

export default function SettingsPage() {
  const [active, setActive] = useState("clinic");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function MenuItem({ id, icon, label }) {
    const isActive = active === id;
    return (
      <button
        onClick={() => {
          setActive(id);
          if (isMobile) setShowMobileMenu(false);
        }}
        className={`sp-setting-item ${isActive ? "sp-active" : ""}`}
      >
        <span className="sp-setting-icon">{icon}</span>
        <span className="sp-setting-text">{label}</span>
      </button>
    );
  }

  return (
    <div className="sp-container p-3 p-lg-4">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sp-mobile-header">
          <h2 className="sp-mobile-title">Settings</h2>
          <button 
            className="sp-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      )}
      
      <div className="sp-wrapper">
        {/* Sidebar */}
        <aside className={`sp-sidebar  ${isMobile && showMobileMenu ? "sp-mobile-open" : ""} `}>
          <div className="sp-sidebar-box">
            {!isMobile && (
              <div className="sp-header d-flex justify-content-between align-items-center mb-3">
                <h2 className="sp-title">Settings</h2>
              </div>
            )}
            
            <MenuItem id="clinic" icon="🏥" label="Clinic" />
            <MenuItem 
              id="payment" 
              icon={<i className="fa-solid fa-credit-card sp-icon"></i>} 
              label="Payment" 
            />
            <MenuItem id="profileQR" icon="👤" label="ProfileQR" />

            <hr className="sp-separator" />

            <button
              className="sp-setting-item"
              onClick={() => {
                setShowChangePassword(true);
                if (isMobile) setShowMobileMenu(false);
              }}
            >
              <span className="sp-setting-icon">🔑</span> Change Password
            </button>

            <button
              className="sp-setting-item sp-logout"
              onClick={() => {
                setShowLogoutConfirm(true);
                if (isMobile) setShowMobileMenu(false);
              }}
            >
              <span className="sp-setting-icon">⛔</span> Logout
            </button>
          </div>

          <div className="sp-sidebar-box sp-mt-2">
            <div className="sp-side-sub">More</div>
            <MenuItem id="Help" icon="❓" label="Help & Support" />
            <MenuItem id="Privacy" icon="🔒" label="Privacy" />

            {/* Delete Account Button */}
            <button
              className="sp-more-item sp-delete-btn"
              onClick={() => {
                setShowDeleteConfirm(true);
                if (isMobile) setShowMobileMenu(false);
              }}
            >
              <i className="fa-solid fa-trash-can sp-icon"></i> Delete Account
            </button>
          </div>
          
          {/* Mobile close button */}
          {isMobile && (
            <button 
              className="sp-close-menu"
              onClick={() => setShowMobileMenu(false)}
            >
              <i className="fa-solid fa-times"></i> Close Menu
            </button>
          )}
        </aside>

        {/* Mobile overlay */}
        {isMobile && showMobileMenu && (
          <div className="sp-mobile-overlay" onClick={() => setShowMobileMenu(false)}></div>
        )}

        {/* Content */}
        <div className="sp-content">
          <div className="sp-form-box">
            {active === "account" && <div>Account</div>}
            {active === "clinic" && <ClinicSettings />}
            {active === "payment" && <PaymentSettings />}
            {active === "profileQR" && <ProfileCard />}
            {active === "Help" && (
              <div className="sp-help-section">
                <h3 className="sp-section-title">Help & Support</h3>
                <p>Contact us for any assistance</p>
              </div>
            )}
            {active === "Privacy" && (
              <div className="sp-privacy-section">
                <h3 className="sp-section-title">Privacy Policy</h3>
                <p>Your privacy is important to us</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="sp-modal-overlay">
          <div className="sp-modal-box">
            <div className="sp-modal-title">Change Password</div>
            <form className="sp-modal-form">
              <input type="password" placeholder="Current Password" className="sp-input" />
              <input type="password" placeholder="New Password" className="sp-input" />
              <input type="password" placeholder="Confirm Password" className="sp-input" />
              <div className="sp-modal-actions">
                <button
                  type="button"
                  className="sp-btn sp-btn-light"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
                <button type="button" className="sp-btn sp-btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="sp-modal-overlay">
          <div className="sp-modal-box">
            <div className="sp-modal-title">Confirm Logout</div>
            <p className="sp-modal-text">Are you sure you want to logout?</p>
            <div className="sp-modal-actions">
              <button
                className="sp-btn sp-btn-light"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <Link to="/login" className="sp-link">
                <button className="sp-btn sp-btn-danger">Logout</button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="sp-modal-overlay">
          <div className="sp-modal-box">
            <div className="sp-modal-title sp-text-danger">Delete Account</div>
            <p className="sp-modal-text">This action cannot be undone. All your data will be permanently deleted. Are you sure?</p>
            <div className="sp-modal-actions">
              <button
                className="sp-btn sp-btn-light"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="sp-btn sp-btn-danger"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteSuccess(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 2500);
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Message */}
      {deleteSuccess && (
        <div className="sp-modal-overlay">
          <div className="sp-modal-box">
            <div className="sp-modal-title sp-text-success">
              <i className="fa-solid fa-check-circle sp-icon-success"></i> Account Deleted!
            </div>
            <p className="sp-modal-text">Your account has been deleted successfully.</p>
            <p className="sp-modal-text">Redirecting to login page...</p>
          </div>
        </div>
      )}
    </div>
  );
}