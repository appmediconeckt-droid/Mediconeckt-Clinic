import React, { useState } from "react";
import "./PaymentSettings.css";

export default function PaymentSettings() {
  const [onlinePayment, setOnlinePayment] = useState(true);
  const [upiBank, setUpiBank] = useState(true);
  const [cash, setCash] = useState(true);

  return (
    <div className="payment-container">
      <h2 className="heading">Payment Settings</h2>

      <div className="payment-box">
        <div className="label">Online Payment</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={onlinePayment}
            onChange={() => setOnlinePayment(!onlinePayment)}
          />
          <span className="slider round"></span>
        </label>
        <span className={`status ${onlinePayment ? "on" : "off"}`}>
          {onlinePayment ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="payment-box">
        <div className="label">UPI / Bank Details</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={upiBank}
            onChange={() => setUpiBank(!upiBank)}
          />
          <span className="slider round"></span>
        </label>
        <span className={`status ${upiBank ? "on" : "off"}`}>
          {upiBank ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="payment-box">
        <div className="label">Cash Payment</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={cash}
            onChange={() => setCash(!cash)}
          />
          <span className="slider round"></span>
        </label>
        <span className={`status ${cash ? "on" : "off"}`}>
          {cash ? "Available" : "Unavailable"}
        </span>
      </div>
    </div>
  );
}
