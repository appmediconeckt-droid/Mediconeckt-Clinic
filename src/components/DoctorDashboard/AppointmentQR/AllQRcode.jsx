import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./QRcode.css";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";

const getStoredDoctorId = () => {
  try {
    const userAuth = JSON.parse(localStorage.getItem("authUser") || "null");
    return (
      userAuth?.doctor_id ||
      userAuth?.doctorId ||
      userAuth?.user?.id ||
      userAuth?.id ||
      userAuth?._id ||
      userAuth?.user_id ||
      null
    );
  } catch {
    return null;
  }
};

export default function QRcode() {
  const [doctorData, setDoctorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const doctorId = useMemo(() => getStoredDoctorId(), []);
  const appOrigin = import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin;
  const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  const createAppointmentUrl = () => {
    const url = new URL("/walk-in-appointment", appOrigin);
    url.searchParams.set("doctorId", doctorId);
    return url.toString();
  };

  const createQrImageUrl = (targetUrl) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      targetUrl
    )}`;

  const downloadQr = async () => {
    try {
      const response = await fetch(createQrImageUrl(doctorAppointmentUrl));
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${doctorData?.full_name || "doctor"}-appointment-qr.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log("QR download error:", error);
      const link = document.createElement("a");
      link.href = `${createQrImageUrl(doctorAppointmentUrl)}&download=1`;
      link.download = "doctor-appointment-qr.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const getDoctorQR = async () => {
    try {
      if (!doctorId) {
        setError("Doctor ID not found. Please login again.");
        return;
      }

      setIsLoading(true);
      setError("");

      const doctorQrRes = await axios.get(`${API_BASE_URL}/users/doctor-qr/${doctorId}`, {
        headers: getAuthHeaders(),
      });

      setDoctorData(doctorQrRes.data?.data || doctorQrRes.data || null);
    } catch (error) {
      console.log("QR API Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "QR details load nahi ho pa rahi hain");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDoctorQR();
  }, []);

  const doctorAppointmentUrl = doctorId ? createAppointmentUrl() : "";
  const doctorName = doctorData?.full_name || doctorData?.name || "Dr. Sarah Mitchell";
  const doctorSpeciality = doctorData?.speciality || doctorData?.specialization || "Cardiologist";
  const qrImageUrl = doctorAppointmentUrl ? createQrImageUrl(doctorAppointmentUrl) : "";

  const copyLink = async () => {
    if (!doctorAppointmentUrl) return;
    try {
      await navigator.clipboard.writeText(doctorAppointmentUrl);
    } catch {
      const input = document.createElement("input");
      input.value = doctorAppointmentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
  };

  const shareQr = async () => {
    if (navigator.share && doctorAppointmentUrl) {
      await navigator.share({
        title: `${doctorName} QR Code`,
        text: "Scan this QR to view profile or book appointment.",
        url: doctorAppointmentUrl,
      });
    } else {
      await copyLink();
    }
  };

  return (
    <div className="doctor-qr-page">
      <header className="doctor-qr-header">
        <h1>Doctor Profile QR Code</h1>
        <p>Share your professional profile instantly with patients using a secure QR Code.</p>
      </header>

      {isLoading && <div className="doctor-qr-state">QR Loading...</div>}
      {error && <div className="doctor-qr-state doctor-qr-error">{error}</div>}

      {!isLoading && !error && doctorAppointmentUrl && (
        <div className="doctor-qr-layout">
          <section className="doctor-qr-card">
            <h2>Your Doctor QR Code</h2>
            <div className="doctor-qr-frame">
              <img src={qrImageUrl} alt="Doctor profile QR" />
            </div>

            <div className="doctor-identity-pill">
              <div className="doctor-avatar">
                {doctorData?.profile_image || doctorData?.profileImage ? (
                  <img src={doctorData.profile_image || doctorData.profileImage} alt={doctorName} />
                ) : (
                  <span>{doctorName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                )}
              </div>
              <div>
                <strong>{doctorName}</strong>
                <small>{doctorSpeciality}</small>
              </div>
              <span className="doctor-verified">✓</span>
            </div>

            <div className="doctor-qr-scan">
              <h3>Scan this QR Code to:</h3>
              <div className="doctor-qr-scan-grid">
                <span>♙ View Profile</span>
                <span>▦ Book Appointment</span>
                <span>▤ Start Chat</span>
                <span>⌕ Contact Clinic</span>
              </div>
            </div>
          </section>

          <aside className="doctor-qr-side">
            <section className="doctor-qr-panel">
              <h3>QR Management</h3>
              <button type="button" className="doctor-qr-primary" onClick={downloadQr}>⇩ Download QR</button>
              <div className="doctor-qr-actions">
                <button type="button" onClick={shareQr}>⌯ Share</button>
                <button type="button" onClick={() => window.print()}>▣ Print</button>
                <button type="button" onClick={copyLink}>↔ Copy Link</button>
                <button type="button" onClick={getDoctorQR}>⟳ Refresh</button>
              </div>
            </section>

            <section className="doctor-qr-panel">
              <h3>Quick Stats</h3>
              <div className="doctor-qr-stats">
                <div><span>Today's Scans</span><strong>42</strong><em>↗</em></div>
                <div><span>This Week</span><strong>186</strong><em>↗</em></div>
                <div><span>Appointments</span><strong>24</strong><em>↗</em></div>
                <div><span>Profile Views</span><strong>512</strong><em>→</em></div>
              </div>
            </section>

            <section className="doctor-qr-panel">
              <h3>QR Details</h3>
              <div className="doctor-qr-details">
                <p><span>QR Status</span><strong className="active">Active</strong></p>
                <p><span>Last Updated</span><strong>Today, 09:41 AM</strong></p>
                <p><span>Visibility</span><strong>Public</strong></p>
                <p><span>Expires</span><strong>Never</strong></p>
              </div>
              {isLocalhost && <small className="doctor-qr-note">Mobile scan ke liye LAN IP URL use karein.</small>}
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}
