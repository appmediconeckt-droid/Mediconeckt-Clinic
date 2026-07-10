import React, { useState } from 'react';
import './PatientProfile.css';

const INITIAL = {
  fullName: 'Arun Kumar',
  dob: '15 Mar 1990',
  age: '34 Years',
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '+1 (555) 123-4567',
  email: 'arun.kumar@example.com',
  address: '123 Health Ave, Medical District',
  allergies: 'Penicillin',
  conditions: 'Hypertension',
  medications: 'Atorvastatin 10mg',
  emergencyName: 'Priya Kumar',
  emergencyPhone: '+1 (555) 987-6543',
  insuranceProvider: 'HealthGuard Insurance',
  policyNumber: 'HG-2024-88214',
};

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(INITIAL);
  const [form, setForm] = useState(INITIAL);

  const data = isEditing ? form : saved;

  const change = (field, value) => setForm((p) => ({ ...p, [field]: value }));
  const startEdit = () => { setForm(saved); setIsEditing(true); };
  const save = () => { setSaved(form); setIsEditing(false); };
  const cancel = () => { setForm(saved); setIsEditing(false); };

  // Rendered as a function call (not <Field/>) so inputs keep focus while typing
  const renderField = (label, field, full = false) => (
    <div className={`pprof-field ${full ? 'full' : ''}`} key={field}>
      <label className="pprof-label">{label}</label>
      {isEditing ? (
        <input
          className="pprof-input"
          value={data[field]}
          onChange={(e) => change(field, e.target.value)}
        />
      ) : (
        <div className="pprof-value">{data[field]}</div>
      )}
    </div>
  );

  const initials = saved.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('');

  return (
    <div className="pprof-page">

      {/* ===== Banner ===== */}
      <div className="pprof-banner">
        <div className="pprof-banner-inner">
          <div className="pprof-avatar-wrap">
            <img
              src="/patient-avatar.jpg"
              alt={saved.fullName}
              className="pprof-avatar"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="pprof-avatar-fallback">{initials}</div>
          </div>

          <div className="pprof-heading">
            <h1 className="pprof-name">{saved.fullName}</h1>
            <div className="pprof-sub">Patient · ID PK-9921</div>
            <div className="pprof-badges">
              <span className="pprof-badge"><span className="pprof-dot"></span> Stable</span>
              <span className="pprof-badge"><i className="fa-solid fa-droplet"></i> {saved.bloodGroup}</span>
            </div>
          </div>

          <div className="pprof-actions">
            {isEditing ? (
              <>
                <button className="pprof-btn pprof-btn-save" onClick={save}>
                  <i className="fa-solid fa-check"></i> Save
                </button>
                <button className="pprof-btn pprof-btn-cancel" onClick={cancel}>Cancel</button>
              </>
            ) : (
              <button className="pprof-btn pprof-btn-edit" onClick={startEdit}>
                <i className="fa-solid fa-pen"></i> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== Cards ===== */}
      <div className="pprof-grid">

        {/* Personal Info */}
        <section className="pprof-card">
          <h3 className="pprof-card-title"><i className="fa-solid fa-user"></i> Personal Information</h3>
          <div className="pprof-fields">
            {renderField('Full Name', 'fullName')}
            {renderField('Date of Birth', 'dob')}
            {renderField('Age', 'age')}
            {renderField('Gender', 'gender')}
            {renderField('Blood Group', 'bloodGroup')}
          </div>
        </section>

        {/* Contact Info */}
        <section className="pprof-card">
          <h3 className="pprof-card-title"><i className="fa-solid fa-address-book"></i> Contact Information</h3>
          <div className="pprof-fields">
            {renderField('Phone', 'phone')}
            {renderField('Email', 'email')}
            {renderField('Address', 'address', true)}
          </div>
        </section>

        {/* Medical Info */}
        <section className="pprof-card">
          <h3 className="pprof-card-title"><i className="fa-solid fa-notes-medical"></i> Medical Information</h3>
          <div className="pprof-fields">
            {renderField('Allergies', 'allergies')}
            {renderField('Chronic Conditions', 'conditions')}
            {renderField('Current Medications', 'medications', true)}
          </div>
        </section>

        {/* Emergency & Insurance */}
        <section className="pprof-card">
          <h3 className="pprof-card-title"><i className="fa-solid fa-shield-heart"></i> Emergency &amp; Insurance</h3>
          <div className="pprof-fields">
            {renderField('Emergency Contact', 'emergencyName')}
            {renderField('Emergency Phone', 'emergencyPhone')}
            {renderField('Insurance Provider', 'insuranceProvider')}
            {renderField('Policy Number', 'policyNumber')}
          </div>
        </section>

      </div>
    </div>
  );
}
