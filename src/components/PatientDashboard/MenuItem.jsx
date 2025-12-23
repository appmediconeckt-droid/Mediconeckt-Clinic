import React from "react";

export default function MenuItem({ id, icon, label, active, setActive }) {
  const isActive = active === id;
  
  return (
    <button
      onClick={() => setActive(id)}
      className={`patient-settingitem ${isActive ? "patient-active" : ""}`}
    >
      <span className="patient-settingicon">{icon}</span>
      <span className="patient-settingtext">{label}</span>
    </button>
  );
}                