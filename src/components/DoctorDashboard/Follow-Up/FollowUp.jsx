import React, { useState, useEffect } from 'react';
import './FollowUp.css';

function PatientFollowUp() {
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
      case 'completed': return 'pfu-status-badge-completed';
      case 'pending': return 'pfu-status-badge-pending';
      case 'scheduled': return 'pfu-status-badge-scheduled';
      default: return 'pfu-status-badge-pending';
    }
  };

  // Get type badge class
  const getTypeClass = (type) => {
    switch(type) {
      case 'urgent': return 'pfu-type-badge-urgent';
      case 'routine': return 'pfu-type-badge-routine';
      case 'consultation': return 'pfu-type-badge-consultation';
      default: return 'pfu-type-badge-routine';
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

  // Handle delete patient
  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(prev => prev.filter(patient => patient.id !== patientId));
    }
  };

  return (
    <div className="pfu-container">
      <header className="pfu-header">
        <h1 className="pfu-title">
          <i className="fas fa-clipboard-check pfu-title-icon"></i>
          Patient Follow-up Management
        </h1>
        <p className="pfu-subtitle">Track and manage patient follow-ups efficiently</p>
      </header>

      <div className="pfu-dashboard">
        <div className="pfu-stats-cards">
          <div className="pfu-stat-card pfu-stat-total">
            <div className="pfu-stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="pfu-stat-content">
              <h3 className="pfu-stat-number">{patients.length}</h3>
              <p className="pfu-stat-label">Total Patients</p>
            </div>
          </div>
          
          <div className="pfu-stat-card pfu-stat-pending">
            <div className="pfu-stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="pfu-stat-content">
              <h3 className="pfu-stat-number">
                {patients.filter(p => p.followUpStatus === 'pending').length}
              </h3>
              <p className="pfu-stat-label">Pending Follow-ups</p>
            </div>
          </div>
          
          <div className="pfu-stat-card pfu-stat-upcoming">
            <div className="pfu-stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="pfu-stat-content">
              <h3 className="pfu-stat-number">{getUpcomingCount()}</h3>
              <p className="pfu-stat-label">Upcoming (7 days)</p>
            </div>
          </div>
          
          <div className="pfu-stat-card pfu-stat-completed">
            <div className="pfu-stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="pfu-stat-content">
              <h3 className="pfu-stat-number">
                {patients.filter(p => p.followUpStatus === 'completed').length}
              </h3>
              <p className="pfu-stat-label">Completed</p>
            </div>
          </div>
        </div>

        <div className="pfu-controls">
          <div className="pfu-search-container">
            <i className="fas fa-search pfu-search-icon"></i>
            <input
              type="text"
              placeholder="Search patients by name, phone or doctor..."
              className="pfu-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="pfu-filter-group">
            <select 
              className="pfu-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
            
            <select 
              className="pfu-filter-select"
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
            className="pfu-add-button"
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus"></i> Add New Follow-up
          </button>
        </div>

        <div className="pfu-table-container">
          <div className="pfu-table-header">
            <div className="pfu-table-row pfu-table-header-row">
              <div className="pfu-table-col pfu-col-patient">Patient Details</div>
              <div className="pfu-table-col pfu-col-date">Last Visit</div>
              <div className="pfu-table-col pfu-col-followup">Follow-up Date</div>
              <div className="pfu-table-col pfu-col-status">Status</div>
              <div className="pfu-table-col pfu-col-type">Type</div>
              <div className="pfu-table-col pfu-col-doctor">Doctor</div>
              <div className="pfu-table-col pfu-col-actions">Actions</div>
            </div>
          </div>
          
          <div className="pfu-table-body ">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <div className="pfu-table-row pfu-table-data-row"  key={patient.id}>
                  <div className="pfu-table-col pfu-col-patient">
                    <div className="pfu-patient-info">
                      <div className="pfu-patient-avatar">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="pfu-patient-details">
                        <h4 className="pfu-patient-name">{patient.name}</h4>
                        <p className="pfu-patient-meta">Age: {patient.age} | Phone: {patient.phone}</p>
                        <p className="pfu-patient-notes">{patient.notes}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pfu-table-col pfu-col-date">
                    {formatDate(patient.lastVisit)}
                  </div>
                  
                  <div className="pfu-table-col pfu-col-followup">
                    <div className="pfu-followup-date">
                      {formatDate(patient.followUpDate)}
                    </div>
                  </div>
                  
                  <div className="pfu-table-col pfu-col-status">
                    <span className={`pfu-status-badge ${getStatusClass(patient.followUpStatus)}`}>
                      {patient.followUpStatus.charAt(0).toUpperCase() + patient.followUpStatus.slice(1)}
                    </span>
                  </div>
                  
                  <div className="pfu-table-col pfu-col-type">
                    <span className={`pfu-type-badge ${getTypeClass(patient.followUpType)}`}>
                      {patient.followUpType.charAt(0).toUpperCase() + patient.followUpType.slice(1)}
                    </span>
                  </div>
                  
                  <div className="pfu-table-col pfu-col-doctor">
                    <div className="pfu-doctor-info">
                      <i className="fas fa-user-md pfu-doctor-icon"></i>
                      <span>{patient.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="pfu-table-col pfu-col-actions">
                    <div className="pfu-action-buttons">
                      <select 
                        className="pfu-status-select"
                        value={patient.followUpStatus}
                        onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <button 
                        className="pfu-action-btn pfu-call-btn"
                        onClick={() => window.open(`tel:${patient.phone}`)}
                        title={`Call ${patient.name}`}
                      >
                        <i className="fas fa-phone"></i>
                      </button>
                      
                      <button 
                        className="pfu-action-btn pfu-delete-btn"
                        onClick={() => handleDeletePatient(patient.id)}
                        title="Delete patient"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="pfu-no-results">
                <i className="fas fa-search pfu-no-results-icon"></i>
                <h3>No patients found</h3>
                <p>Try changing your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="pfu-modal-overlay">
          <div className="pfu-modal">
            <div className="pfu-modal-header">
              <h2 className="pfu-modal-title">Add New Follow-up</h2>
              <button 
                className="pfu-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="pfu-modal-body">
              <div className="pfu-form-group">
                <label className="pfu-form-label">Patient Name *</label>
                <input
                  type="text"
                  name="name"
                  className="pfu-form-input"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                />
              </div>
              
              <div className="pfu-form-row">
                <div className="pfu-form-group pfu-form-half">
                  <label className="pfu-form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="pfu-form-input"
                    value={newPatient.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                  />
                </div>
                
                <div className="pfu-form-group pfu-form-half">
                  <label className="pfu-form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="pfu-form-input"
                    value={newPatient.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                  />
                </div>
              </div>
              
              <div className="pfu-form-row">
                <div className="pfu-form-group pfu-form-half">
                  <label className="pfu-form-label">Follow-up Date *</label>
                  <input
                    type="date"
                    name="followUpDate"
                    className="pfu-form-input"
                    value={newPatient.followUpDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="pfu-form-group pfu-form-half">
                  <label className="pfu-form-label">Follow-up Type</label>
                  <select
                    name="followUpType"
                    className="pfu-form-input"
                    value={newPatient.followUpType}
                    onChange={handleInputChange}
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>
              </div>
              
              <div className="pfu-form-group">
                <label className="pfu-form-label">Doctor</label>
                <input
                  type="text"
                  name="doctor"
                  className="pfu-form-input"
                  value={newPatient.doctor}
                  onChange={handleInputChange}
                  placeholder="Doctor's name"
                />
              </div>
              
              <div className="pfu-form-group">
                <label className="pfu-form-label">Notes</label>
                <textarea
                  name="notes"
                  className="pfu-form-textarea"
                  value={newPatient.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes..."
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="pfu-modal-footer">
              <button 
                className="pfu-btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="pfu-btn-primary"
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

export default PatientFollowUp;