import React from "react";

export default function Modals({
  showChangePassword,
  setShowChangePassword,
  showLogoutConfirm,
  setShowLogoutConfirm,
  showDeleteConfirm,
  setShowDeleteConfirm,
  deleteSuccess,
  setDeleteSuccess,
  navigate
}) {
  return (
    <>
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="patient-modal-overlay">
          <div className="patient-modal-box">
            <div className="patient-modal-title">Change Password</div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowChangePassword(false);
            }}>
              <input type="password" placeholder="Current Password" required />
              <input type="password" placeholder="New Password" required />
              <input type="password" placeholder="Confirm New Password" required />
              <div className="patient-show">
                <button
                  type="button"
                  className="patient-btn-light"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="patient-btn-primary patient-m-lg-2">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="patient-modal-overlay">
          <div className="patient-modal-box">
            <div className="patient-modal-title">Confirm Logout</div>
            <p>Are you sure you want to logout?</p>
            <div className="patient-show">
              <button
                className="patient-btn-light"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="patient-btn-danger patient-m-lg-2"
                onClick={() => navigate("/login")}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="patient-modal-overlay">
          <div className="patient-modal-box">
            <div className="patient-modal-title">⚠️ Delete Account</div>
            <p>This will permanently delete your account and all medical records. This action cannot be undone.</p>
            <div className="patient-show">
              <button
                className="patient-btn-light"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="patient-btn-danger patient-m-lg-2"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteSuccess(true);
                  setTimeout(() => navigate("/login"), 2000);
                }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Message */}
      {deleteSuccess && (
        <div className="patient-modal-overlay">
          <div className="patient-modal-box">
            <div className="patient-modal-title patient-text-success">✓ Account Deleted</div>
            <p>Your account has been successfully deleted.</p>
            <p>Redirecting to login page...</p>
          </div>
        </div>
      )}
    </>
  );
}