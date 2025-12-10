import React from "react";
import "./QRcode.css";

export default function QRcode() {
  return (
    <div className="qrapl p-4">
      
      {/* ------- Card 1 ------- */}
      <div className="qrcode">

        {/* QR Section */}
        <div className="qr-box">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://maps.app.goo.gl/BgcJF7e9bQwc7VuB6" alt="QR" />
        </div>

        <div className="card-header">Appointment QR Code</div>
        <div className="card-footer">Appointment Book</div>
        <div className="card-footer">Download</div>
      </div>

      {/* Connector Line */}
      <div className="connector"></div>

      {/* ------- Card 2 ------- */}
      <div className="qrcode">

        {/* QR Section */}
        <div className="qr-box">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=http://localhost:5173/doctorcalendar" alt="QR" />
        </div>

        <div className="card-header">Doctor Profile QR Code</div>
        <div className="card-footer">Doctor Profile</div>
        <div className="card-footer">Download</div>
      </div>

      {/* Connector Line */}
      <div className="connector"></div>

      {/* ------- Card 3 ------- */}
      <div className="qrcode">

        {/* QR Section */}
        <div className="qr-box">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Card3" alt="QR" />
        </div>

        <div className="card-header">Clinic Location And Profile QR Code</div>
        <div className="card-footer">Clinic Profile</div>
        <div className="card-footer">Download</div>
      </div>

    </div>
  );
}
