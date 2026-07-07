// DoctorSmsPatient.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaCommentMedical, FaSearch, FaFilter } from 'react-icons/fa';
import { format } from 'date-fns';
import './DoctorSmsPatient.css';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    status: 'Stable',
    lastVisit: '2024-01-15',
    phone: '+1 (555) 123-4567',
    avatarColor: '#3498db',
    bloodGroup: 'O+'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    condition: 'Diabetes Type 2',
    status: 'Needs Attention',
    lastVisit: '2024-01-14',
    phone: '+1 (555) 234-5678',
    avatarColor: '#e74c3c',
    bloodGroup: 'A-'
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    condition: 'Arthritis',
    status: 'Improving',
    lastVisit: '2024-01-12',
    phone: '+1 (555) 345-6789',
    avatarColor: '#2ecc71',
    bloodGroup: 'B+'
  },
  {
    id: 4,
    name: 'Emily Davis',
    age: 29,
    gender: 'Female',
    condition: 'Asthma',
    status: 'Stable',
    lastVisit: '2024-01-10',
    phone: '+1 (555) 456-7890',
    avatarColor: '#9b59b6',
    bloodGroup: 'AB+'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    age: 67,
    gender: 'Male',
    condition: 'Heart Disease',
    status: 'Critical',
    lastVisit: '2024-01-13',
    phone: '+1 (555) 567-8901',
    avatarColor: '#f39c12',
    bloodGroup: 'O-'
  },
  {
    id: 6,
    name: 'Jennifer Lee',
    age: 41,
    gender: 'Female',
    condition: 'Migraine',
    status: 'Stable',
    lastVisit: '2024-01-11',
    phone: '+1 (555) 678-9012',
    avatarColor: '#1abc9c',
    bloodGroup: 'A+'
  }
];

const DoctorSmsPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [unreadCounts] = useState({
    1: 2,
    2: 5,
    3: 0,
    4: 1,
    5: 3,
    6: 0
  });
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    if (!status) return 'sms-patient-status-stable';
    
    switch (status.toLowerCase()) {
      case 'critical': return 'sms-patient-status-critical';
      case 'needs attention': return 'sms-patient-status-warning';
      case 'improving': return 'sms-patient-status-improving';
      case 'stable': return 'sms-patient-status-stable';
      default: return 'sms-patient-status-stable';
    }
  };

  const handlePatientClick = (patient) => {
    if (patient && patient.id) {
      navigate(`/patient-chat/${patient.id}`);
    }
  };

  const handleSmsClick = (patient, e) => {
    e.stopPropagation();
    if (patient && patient.id) {
      navigate(`/patient-chat/${patient.id}`);
    }
  };

  // Filter patients
  const filteredPatients = mockPatients.filter(patient => {
    if (!patient) return false;
    
    const matchesSearch = (patient.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.condition || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.phone || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      (patient.status || '').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="sms-patient-container">
      <div className="sms-patient-header">
        <div className="sms-patient-header-title">
          <h1 className="sms-patient-title">Patient Communications</h1>
          <p className="sms-patient-subtitle">Manage patient conversations and updates</p>
        </div>
        
        <div className="sms-patient-controls">
          <div className="sms-patient-search-wrapper">
            <div className="sms-patient-search-box">
              <FaSearch className="sms-patient-search-icon" />
              <input
                type="text"
                className="sms-patient-search-input"
                placeholder="Search patients by name, condition, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search patients"
              />
            </div>
            
            <button 
              className="sms-patient-mobile-filter-btn"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              aria-label="Toggle filters"
            >
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>

          <div className={`sms-patient-filters ${showMobileFilters ? 'sms-patient-filters-mobile-active' : ''}`}>
            <div className="sms-patient-filter-buttons">
              <button
                className={`sms-patient-filter-btn ${statusFilter === 'all' ? 'sms-patient-filter-active' : ''}`}
                onClick={() => {
                  setStatusFilter('all');
                  setShowMobileFilters(false);
                }}
              >
                All Patients
              </button>
              <button
                className={`sms-patient-filter-btn ${statusFilter === 'critical' ? 'sms-patient-filter-active' : ''}`}
                onClick={() => {
                  setStatusFilter('critical');
                  setShowMobileFilters(false);
                }}
              >
                Critical
              </button>
              <button
                className={`sms-patient-filter-btn ${statusFilter === 'needs attention' ? 'sms-patient-filter-active' : ''}`}
                onClick={() => {
                  setStatusFilter('needs attention');
                  setShowMobileFilters(false);
                }}
              >
                Needs Attention
              </button>
              <button
                className={`sms-patient-filter-btn ${statusFilter === 'stable' ? 'sms-patient-filter-active' : ''}`}
                onClick={() => {
                  setStatusFilter('stable');
                  setShowMobileFilters(false);
                }}
              >
                Stable
              </button>
              <button
                className={`sms-patient-filter-btn ${statusFilter === 'improving' ? 'sms-patient-filter-active' : ''}`}
                onClick={() => {
                  setStatusFilter('improving');
                  setShowMobileFilters(false);
                }}
              >
                Improving
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sms-patient-stats">
        <div className="sms-patient-stat-card">
          <span className="sms-patient-stat-number">{mockPatients.length}</span>
          <span className="sms-patient-stat-label">Total Patients</span>
        </div>
        <div className="sms-patient-stat-card">
          <span className="sms-patient-stat-number">{filteredPatients.length}</span>
          <span className="sms-patient-stat-label">Filtered</span>
        </div>
        <div className="sms-patient-stat-card">
          <span className="sms-patient-stat-number">
            {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
          </span>
          <span className="sms-patient-stat-label">Unread Messages</span>
        </div>
      </div>

      <div className="sms-patient-list">
        {filteredPatients.length === 0 ? (
          <div className="sms-patient-empty-state">
            <div className="sms-patient-empty-icon">👨‍⚕️</div>
            <h3 className="sms-patient-empty-title">No patients found</h3>
            <p className="sms-patient-empty-text">
              Try adjusting your search or filter criteria
            </p>
            <button 
              className="sms-patient-empty-btn"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredPatients.map(patient => (
            <div
              key={patient.id}
              className="sms-patient-card"
              onClick={() => handlePatientClick(patient)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePatientClick(patient)}
            >
              <div className="sms-patient-card-content">
                <div 
                  className="sms-patient-avatar" 
                  style={{ backgroundColor: patient.avatarColor || '#ccc' }}
                >
                  <span className="sms-patient-avatar-text">
                    {(patient.name || '').split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <div className="sms-patient-info">
                  <div className="sms-patient-header-info">
                    <div className="sms-patient-name-section">
                      <h3 className="sms-patient-name">{patient.name || 'Unknown Patient'}</h3>
                      <div className="sms-patient-badges">
                        <span className={`sms-patient-status ${getStatusClass(patient.status)}`}>
                          {patient.status || 'Stable'}
                        </span>
                        <span className="sms-patient-blood-group">
                          {patient.bloodGroup || 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="sms-patient-quick-info">
                      <span className="sms-patient-age-gender">
                        {patient.age || 'NA'} years, {patient.gender || 'NA'}
                      </span>
                      <span className="sms-patient-phone">
                        <FaPhone className="sms-patient-phone-icon" /> 
                        {patient.phone || 'No phone'}
                      </span>
                    </div>
                  </div>

                  <div className="sms-patient-details">
                    <div className="sms-patient-condition">
                      <strong>Condition:</strong> {patient.condition || 'No condition specified'}
                    </div>
                    
                    <div className="sms-patient-meta">
                      <span className="sms-patient-last-visit">
                        <strong>Last visit:</strong> {patient.lastVisit ? 
                          format(new Date(patient.lastVisit), 'MMM d, yyyy') : 
                          'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sms-patient-actions">
                  {(unreadCounts[patient.id] || 0) > 0 && (
                    <div className="sms-patient-unread-badge">
                      <span className="sms-patient-unread-count">{unreadCounts[patient.id]}</span>
                      <span className="sms-patient-unread-label">unread</span>
                    </div>
                  )}
                  <button
                    className="sms-patient-action-btn"
                    onClick={(e) => handleSmsClick(patient, e)}
                    aria-label={`Send SMS to ${patient.name}`}
                  >
                    <FaCommentMedical className="sms-patient-action-icon" />
                    <span className="sms-patient-action-text">Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorSmsPatient;