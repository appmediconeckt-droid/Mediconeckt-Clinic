// React code implementing profile flow with Completed / Incompleted status
// Following the flow you provided (Personal Details + Consultation Settings)
// Single-file demo version

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DoctorProfileFlow() {
  const [profile, setProfile] = useState({
    // PERSONAL DETAILS
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",

    currentAddress: "",
    permanentAddress: "",

    aadhaar: "",
    pan: "",
    photo: null,

    // CONSULTATION SETTINGS
    availability: [], // { day: "Mon", time: "10:00 AM" }
    consultationType: "", // video / audio / chat / clinic
    fees: "",
    followUpFees: "",
  });

  const [statusPersonal, setStatusPersonal] = useState("Incomplete");
  const [statusConsultation, setStatusConsultation] = useState("Incomplete");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const validatePersonal = () => {
    if (
      profile.name &&
      profile.email &&
      profile.mobile &&
      profile.dob &&
      profile.gender &&
      profile.currentAddress &&
      profile.permanentAddress &&
      profile.aadhaar &&
      profile.pan
    ) {
      setStatusPersonal("Completed");
    } else {
      setStatusPersonal("Incomplete");
    }
  };

  const validateConsultation = () => {
    if (
      profile.availability.length > 0 &&
      profile.consultationType !== "" &&
      profile.fees !== ""
    ) {
      setStatusConsultation("Completed");
    } else {
      setStatusConsultation("Incomplete");
    }
  };

  const handleAvailabilityToggle = (day) => {
    let updated = [...profile.availability];

    if (updated.some((d) => d.day === day)) {
      updated = updated.filter((d) => d.day !== day);
    } else {
      updated.push({ day, time: "" });
    }

    setProfile({ ...profile, availability: updated });
  };

  return (
    <div className="p-4">
      <h2 className="">Doctor Profile</h2>

      {/* PERSONAL DETAILS */}
      <div className="card p-3 mb-4">
        <h4>
          Personal Details – <span>{statusPersonal}</span>
        </h4>

        <div className="row mt-3">
          <div className="col-md-4">
            <label>Name</label>
            <input
              className="form-control"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label>Email</label>
            <input
              className="form-control"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <div className="col-md-4">
            <label>Mobile</label>
            <input
              className="form-control"
              value={profile.mobile}
              onChange={(e) =>
                setProfile({ ...profile, mobile: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label>Gender</label>
            <select
              className="form-control"
              value={profile.gender}
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-3">
            <label>Aadhaar</label>
            <input
              className="form-control"
              value={profile.aadhaar}
              onChange={(e) =>
                setProfile({ ...profile, aadhaar: e.target.value })
              }
            />
          </div>

          <div className="col-md-3">
            <label>PAN</label>
            <input
              className="form-control"
              value={profile.pan}
              onChange={(e) => setProfile({ ...profile, pan: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-3">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              setProfile({ ...profile, photo: e.target.files[0] })
            }
          />
        </div>

        <button className="btn btn-success mt-3" onClick={validatePersonal}>
          Save Personal Details
        </button>
      </div>

      {/* CONSULTATION SETTINGS */}
      <div className="card p-3 mb-4">
        <h4>
          Consultation Settings – <span>{statusConsultation}</span>
        </h4>

        <h6 className="mt-3">Availability (Day + Time)</h6>
        <div className="d-flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d}
              className={
                profile.availability.some((x) => x.day === d)
                  ? "btn btn-primary"
                  : "btn btn-outline-primary"
              }
              onClick={() => handleAvailabilityToggle(d)}
            >
              {d}
            </button>
          ))}
        </div>

        {profile.availability.map((item, index) => (
          <div className="row mt-3" key={index}>
            <div className="col-md-4">
              <label>{item.day} Time</label>
              <input
                type="time"
                className="form-control"
                value={item.time}
                onChange={(e) => {
                  const updated = [...profile.availability];
                  updated[index].time = e.target.value;
                  setProfile({ ...profile, availability: updated });
                }}
              />
            </div>
          </div>
        ))}

        <div className="row mt-4">
          <div className="col-md-4">
            <label>Consultation Type</label>
            <select
              className="form-control"
              value={profile.consultationType}
              onChange={(e) =>
                setProfile({ ...profile, consultationType: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="chat">Chat</option>
              <option value="clinic">Clinic</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Consultation Fees</label>
            <input
              className="form-control"
              value={profile.fees}
              onChange={(e) => setProfile({ ...profile, fees: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <label>Follow-up Fees</label>
            <input
              className="form-control"
              value={profile.followUpFees}
              onChange={(e) =>
                setProfile({ ...profile, followUpFees: e.target.value })
              }
            />
          </div>
        </div>

        <button className="btn btn-success mt-3" onClick={validateConsultation}>
          Save Consultation Settings
        </button>
      </div>

      {/* FINAL STATUS */}
      <div className="card p-3 mb-5">
        <h4>Overall Profile Status</h4>
        <h5 className="mt-2">
          Personal: {statusPersonal} <br />
          Consultation: {statusConsultation}
        </h5>
      </div>
    </div>
  );
}
