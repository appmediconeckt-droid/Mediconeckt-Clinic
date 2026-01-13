import React from "react";
import "./QRcode.css";

export default function QRcode() {
  // Example: ID for a specific doctor. You would likely get this from props or context.
  const doctorId = "dr_smith";

  return (
    <div className="qrapl p-4">
      {/* ------- Card 1 ------- */}
      <div className="qrcode">
        <div className="qr-box">
          {/* QR Code now points to the dynamic doctor profile route */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(
              `http://localhost:5173/doctor/${doctorId}`
            )}`}
            alt="Doctor Profile QR Code"
          />
        </div>
        <div className="card-header">Doctor Profile QR Code</div>
        <div className="card-footer">Scan for Details</div>
        <div className="card-footer">Download</div>
      </div>

      {/* ... Rest of your code for Card 2 and Card 3 remains the same ... */}
    </div>
  );
}