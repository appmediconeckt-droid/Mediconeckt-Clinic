import React, { useState, useEffect } from 'react';
import './FollowUp.css';

function FollowUp() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      age: 45,
      phone: '9876543210',
      lastVisit: '2024-01-15',
      followUpDate: '2024-01-30',
      followUpStatus: 'pending',
      followUpType: 'routine',
      notes: 'Blood pressure check required',
      doctor: 'Dr. Verma'
    },
    {
      id: 2,
      name: 'Priya Patel',
      age: 32,
      phone: '9876543211',
      lastVisit: '2024-01-18',
      followUpDate: '2024-01-25',
      followUpStatus: 'completed',
      followUpType: 'urgent',
      notes: 'Post-operative checkup',
      doctor: 'Dr. Gupta'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      age: 50,
      phone: '9876543212',
      lastVisit: '2024-01-10',
      followUpDate: '2024-02-05',
      followUpStatus: 'pending',
      followUpType: 'routine',
      notes: 'Diabetes monitoring',
      doctor: 'Dr. Singh'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 28,
      phone: '9876543213',
      lastVisit: '2024-01-20',
      followUpDate: '2024-01-28',
      followUpStatus: 'scheduled',
      followUpType: 'consultation',
      notes: 'Review test results',
      doctor: 'Dr. Rao'
    },
    {
      id: 5,
      name: 'Vikram Malhotra',
      age: 60,
      phone: '9876543214',
      lastVisit: '2024-01-05',
      followUpDate: '2024-02-10',
      followUpStatus: 'pending',
      followUpType: 'urgent',
      notes: 'Cardiac evaluation',
      doctor: 'Dr. Sharma'
    }
  ]);

  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    phone: '',
    followUpDate: '',
    followUpType: 'routine',
    notes: '',
    doctor: ''
  });

  // Filter patients based on status, type, and search term
  useEffect(() => {
    let result = patients;
    
    if (filterStatus !== 'all') {
      result = result.filter(patient => patient.followUpStatus === filterStatus);
    }
    
    if (filterType !== 'all') {
      result = result.filter(patient => patient.followUpType === filterType);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(patient => 
        patient.name.toLowerCase().includes(term) ||
        patient.phone.includes(term) ||
        patient.doctor.toLowerCase().includes(term)
      );
    }
    
    setFilteredPatients(result);
  }, [patients, filterStatus, filterType, searchTerm]);

  // Handle status change
  const handleStatusChange = (patientId, newStatus) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { ...patient, followUpStatus: newStatus }
        : patient
    ));
  };

  // Handle adding new patient
  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.followUpDate) {
      alert('Please fill in required fields (Name and Follow-up Date)');
      return;
    }
    
    const newPatientObj = {
      ...newPatient,
      id: patients.length + 1,
      age: parseInt(newPatient.age),
      lastVisit: new Date().toISOString().split('T')[0],
      followUpStatus: 'pending'
    };
    
    setPatients(prev => [...prev, newPatientObj]);
    setShowAddModal(false);
    setNewPatient({
      name: '',
      age: '',
      phone: '',
      followUpDate: '',
      followUpType: 'routine',
      notes: '',
      doctor: ''
    });
  };

  // Handle input change for new patient
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'fup-status-badge-completed';
      case 'pending': return 'fup-status-badge-pending';
      case 'scheduled': return 'fup-status-badge-scheduled';
      default: return 'fup-status-badge-pending';
    }
  };

  // Get type badge class
  const getTypeClass = (type) => {
    switch(type) {
      case 'urgent': return 'fup-type-badge-urgent';
      case 'routine': return 'fup-type-badge-routine';
      case 'consultation': return 'fup-type-badge-consultation';
      default: return 'fup-type-badge-routine';
    }
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get upcoming follow-ups count
  const getUpcomingCount = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return patients.filter(p => {
      const followUpDate = new Date(p.followUpDate);
      return followUpDate >= today && followUpDate <= nextWeek && p.followUpStatus !== 'completed';
    }).length;
  };

  return (
    <div className="fup-container">
      <header className="fup-header">
        <h1 className="fup-title">
          <i className="fas fa-clipboard-check fup-title-icon"></i>
          Patient Follow-up Management
        </h1>
        <p className="fup-subtitle">Track and manage patient follow-ups efficiently</p>
      </header>

      <div className="fup-dashboard">
        <div className="fup-stats-cards">
          <div className="fup-stat-card fup-stat-total">
            <div className="fup-stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">{patients.length}</h3>
              <p className="fup-stat-label">Total Patients</p>
            </div>
          </div>
          
          <div className="fup-stat-card fup-stat-pending">
            <div className="fup-stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">
                {patients.filter(p => p.followUpStatus === 'pending').length}
              </h3>
              <p className="fup-stat-label">Pending Follow-ups</p>
            </div>
          </div>
          
          <div className="fup-stat-card fup-stat-upcoming">
            <div className="fup-stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">{getUpcomingCount()}</h3>
              <p className="fup-stat-label">Upcoming (7 days)</p>
            </div>
          </div>
          
          <div className="fup-stat-card fup-stat-completed">
            <div className="fup-stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="fup-stat-content">
              <h3 className="fup-stat-number">
                {patients.filter(p => p.followUpStatus === 'completed').length}
              </h3>
              <p className="fup-stat-label">Completed</p>
            </div>
          </div>
        </div>

        <div className="fup-controls">
          <div className="fup-search-container">
            <i className="fas fa-search fup-search-icon"></i>
            <input
              type="text"
              placeholder="Search patients by name, phone or doctor..."
              className="fup-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="fup-filter-group">
            <select 
              className="fup-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
            
            <select 
              className="fup-filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
          
          <button 
            className="fup-add-button"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus"></i> Add New Follow-up
          </button>
        </div>

        <div className="fup-table-container">
          <div className="fup-table-header">
            <div className="fup-table-row fup-table-header-row">
              <div className="fup-table-col fup-col-patient">Patient Details</div>
              <div className="fup-table-col fup-col-date">Last Visit</div>
              <div className="fup-table-col fup-col-followup">Follow-up Date</div>
              <div className="fup-table-col fup-col-status">Status</div>
              <div className="fup-table-col fup-col-type">Type</div>
              <div className="fup-table-col fup-col-doctor">Doctor</div>
              <div className="fup-table-col fup-col-actions">Actions</div>
            </div>
          </div>
          
          <div className="fup-table-body">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <div className="fup-table-row fup-table-data-row" key={patient.id}>
                  <div className="fup-table-col fup-col-patient">
                    <div className="fup-patient-info">
                      <div className="fup-patient-avatar">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="fup-patient-details">
                        <h4 className="fup-patient-name">{patient.name}</h4>
                        <p className="fup-patient-meta">Age: {patient.age} | Phone: {patient.phone}</p>
                        <p className="fup-patient-notes">{patient.notes}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="fup-table-col fup-col-date">
                    {formatDate(patient.lastVisit)}
                  </div>
                  
                  <div className="fup-table-col fup-col-followup">
                    <div className="fup-followup-date">
                      {formatDate(patient.followUpDate)}
                    </div>
                  </div>
                  
                  <div className="fup-table-col fup-col-status">
                    <span className={`fup-status-badge ${getStatusClass(patient.followUpStatus)}`}>
                      {patient.followUpStatus.charAt(0).toUpperCase() + patient.followUpStatus.slice(1)}
                    </span>
                  </div>
                  
                  <div className="fup-table-col fup-col-type">
                    <span className={`fup-type-badge ${getTypeClass(patient.followUpType)}`}>
                      {patient.followUpType.charAt(0).toUpperCase() + patient.followUpType.slice(1)}
                    </span>
                  </div>
                  
                  <div className="fup-table-col fup-col-doctor">
                    <div className="fup-doctor-info">
                      <i className="fas fa-user-md fup-doctor-icon"></i>
                      <span>{patient.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="fup-table-col fup-col-actions">
                    <div className="fup-action-buttons">
                      <select 
                        className="fup-status-select"
                        value={patient.followUpStatus}
                        onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <button className="fup-action-btn fup-call-btn">
                        <i className="fas fa-phone"></i>
                      </button>
                      
                      <button className="fup-action-btn fup-notes-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="fup-no-results">
                <i className="fas fa-search fup-no-results-icon"></i>
                <h3>No patients found</h3>
                <p>Try changing your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fup-modal-overlay">
          <div className="fup-modal">
            <div className="fup-modal-header">
              <h2 className="fup-modal-title">Add New Follow-up</h2>
              <button 
                className="fup-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="fup-modal-body">
              <div className="fup-form-group">
                <label className="fup-form-label">Patient Name *</label>
                <input
                  type="text"
                  name="name"
                  className="fup-form-input"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                />
              </div>
              
              <div className="fup-form-row">
                <div className="fup-form-group fup-form-half">
                  <label className="fup-form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="fup-form-input"
                    value={newPatient.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                  />
                </div>
                
                <div className="fup-form-group fup-form-half">
                  <label className="fup-form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="fup-form-input"
                    value={newPatient.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                  />
                </div>
              </div>
              
              <div className="fup-form-row">
                <div className="fup-form-group fup-form-half">
                  <label className="fup-form-label">Follow-up Date *</label>
                  <input
                    type="date"
                    name="followUpDate"
                    className="fup-form-input"
                    value={newPatient.followUpDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="fup-form-group fup-form-half">
                  <label className="fup-form-label">Follow-up Type</label>
                  <select
                    name="followUpType"
                    className="fup-form-input"
                    value={newPatient.followUpType}
                    onChange={handleInputChange}
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>
              </div>
              
              <div className="fup-form-group">
                <label className="fup-form-label">Doctor</label>
                <input
                  type="text"
                  name="doctor"
                  className="fup-form-input"
                  value={newPatient.doctor}
                  onChange={handleInputChange}
                  placeholder="Doctor's name"
                />
              </div>
              
              <div className="fup-form-group">
                <label className="fup-form-label">Notes</label>
                <textarea
                  name="notes"
                  className="fup-form-textarea"
                  value={newPatient.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes..."
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="fup-modal-footer">
              <button 
                className="fup-btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="fup-btn-primary"
                onClick={handleAddPatient}
              >
                Add Follow-up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowUp;