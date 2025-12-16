import React, { useState } from "react";
import "./PatientSignup.css";

export default function PatientSignup() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // Step 1: Personal
    fullName: "",
    gender: "",
    dob: "",
    photo: null,

    // Step 2: Contact
    phone: "",
    email: "",
    altPhone: "",

    // Step 3: Address
    flat: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    // Step 4: Medical Info
    blood: "",
    height: "",
    weight: "",
    allergies: "",
    conditions: "",
    medications: "",
    report: null,

    // Step 5: Account Login
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const handleSubmit = () => {
    console.log("FINAL FORM DATA:", form);
    alert("Signup Successful!");
  };

  return (
    <div className="signup-container">
      <h2>Patient Signup - Step {step}/6</h2>

      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <div className="form-section">
          <h3>Personal Details</h3>

          <input name="fullName" placeholder="Full Name" onChange={handleChange} />

          <select name="gender" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="date" name="dob" onChange={handleChange} />

          <label>Profile Photo</label>
          <input type="file" name="photo" onChange={handleChange} />

          <button onClick={next}>Next</button>
        </div>
      )}

      {/* ---------------- STEP 2 ---------------- */}
      {step === 2 && (
        <div className="form-section">
          <h3>Contact Details</h3>

          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="altPhone" placeholder="Alternate Phone" onChange={handleChange} />

          <div className="btn-row">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* ---------------- STEP 3 ---------------- */}
      {step === 3 && (
        <div className="form-section">
          <h3>Address Details</h3>

          <input name="flat" placeholder="Flat / House No" onChange={handleChange} />
          <input name="street" placeholder="Street / Area" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />

          <div className="btn-row">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* ---------------- STEP 4 ---------------- */}
      {step === 4 && (
        <div className="form-section">
          <h3>Medical Information</h3>

          <input name="blood" placeholder="Blood Group" onChange={handleChange} />
          <input name="height" placeholder="Height (cm)" onChange={handleChange} />
          <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
          <input name="allergies" placeholder="Any Allergies" onChange={handleChange} />
          <input name="conditions" placeholder="Medical Conditions" onChange={handleChange} />
          <input name="medications" placeholder="Current Medications" onChange={handleChange} />

          <label>Upload Medical Report</label>
          <input type="file" name="report" onChange={handleChange} />

          <div className="btn-row">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* ---------------- STEP 5 ---------------- */}
      {step === 5 && (
        <div className="form-section">
          <h3>Account Details</h3>

          <input name="username" placeholder="Username" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

          <div className="btn-row">
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* ---------------- STEP 6 ---------------- */}
      {step === 6 && (
        <div className="form-section">
          <h3>Review Your Details</h3>

          <pre className="review-box">{JSON.stringify(form, null, 2)}</pre>

          <div className="btn-row">
            <button onClick={back}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
