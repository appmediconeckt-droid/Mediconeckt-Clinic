import React, { useState, useEffect } from 'react';
import './ManagerPolicies.css';

const ManagerPolicies = () => {
  const [activeTab, setActiveTab] = useState('hospital');
  const [searchTerm, setSearchTerm] = useState('');
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    title: '',
    category: 'hospital',
    department: '',
    description: '',
    version: '1.0',
    status: 'active',
    effectiveDate: '',
  });

  // Sample policies data
  const samplePolicies = [
    {
      id: 1,
      title: 'Patient Privacy and Confidentiality',
      category: 'hospital',
      department: 'All',
      description: 'Guidelines for protecting patient information and maintaining confidentiality.',
      version: '2.1',
      status: 'active',
      lastUpdated: '2024-01-15',
      effectiveDate: '2024-02-01',
      updatedBy: 'Dr. Smith',
    },
    {
      id: 2,
      title: 'Emergency Response Protocol',
      category: 'hospital',
      department: 'Emergency',
      description: 'Procedures for handling emergency situations and disaster management.',
      version: '3.0',
      status: 'active',
      lastUpdated: '2024-01-10',
      effectiveDate: '2024-01-20',
      updatedBy: 'Dr. Johnson',
    },
    {
      id: 3,
      title: 'Staff Dress Code Policy',
      category: 'hr',
      department: 'All',
      description: 'Guidelines for professional attire and appearance in the hospital.',
      version: '1.5',
      status: 'active',
      lastUpdated: '2024-01-05',
      effectiveDate: '2024-01-15',
      updatedBy: 'HR Manager',
    },
    {
      id: 4,
      title: 'Medication Administration',
      category: 'medical',
      department: 'Pharmacy',
      description: 'Protocols for safe medication administration and documentation.',
      version: '2.3',
      status: 'active',
      lastUpdated: '2024-01-08',
      effectiveDate: '2024-01-18',
      updatedBy: 'Pharmacy Head',
    },
    {
      id: 5,
      title: 'Infection Control Measures',
      category: 'medical',
      department: 'Infection Control',
      description: 'Standards for preventing and controlling infections in healthcare settings.',
      version: '4.0',
      status: 'active',
      lastUpdated: '2024-01-12',
      effectiveDate: '2024-01-25',
      updatedBy: 'Infection Control Officer',
    },
    {
      id: 6,
      title: 'Leave and Attendance Policy',
      category: 'hr',
      department: 'All',
      description: 'Rules and regulations regarding employee leave and attendance.',
      version: '1.8',
      status: 'active',
      lastUpdated: '2024-01-03',
      effectiveDate: '2024-01-10',
      updatedBy: 'HR Manager',
    },
    {
      id: 7,
      title: 'Equipment Maintenance',
      category: 'operations',
      department: 'Maintenance',
      description: 'Schedule and procedures for medical equipment maintenance.',
      version: '2.0',
      status: 'active',
      lastUpdated: '2024-01-07',
      effectiveDate: '2024-01-17',
      updatedBy: 'Maintenance Head',
    },
    {
      id: 8,
      title: 'Data Security Policy',
      category: 'it',
      department: 'IT',
      description: 'Guidelines for protecting hospital data and IT systems.',
      version: '3.2',
      status: 'active',
      lastUpdated: '2024-01-14',
      effectiveDate: '2024-01-28',
      updatedBy: 'IT Manager',
    },
  ];

  useEffect(() => {
    setPolicies(samplePolicies);
    filterPolicies();
  }, []);

  useEffect(() => {
    filterPolicies();
  }, [activeTab, searchTerm, policies]);

  const filterPolicies = () => {
    let filtered = policies.filter(policy => 
      policy.category === activeTab || activeTab === 'all'
    );
    
    if (searchTerm) {
      filtered = filtered.filter(policy =>
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPolicies(filtered);
  };

  const handleAddPolicy = (e) => {
    e.preventDefault();
    const newId = policies.length + 1;
    const policyToAdd = {
      ...newPolicy,
      id: newId,
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: 'Manager',
    };
    
    setPolicies([...policies, policyToAdd]);
    setShowAddPolicyModal(false);
    setNewPolicy({
      title: '',
      category: 'hospital',
      department: '',
      description: '',
      version: '1.0',
      status: 'active',
      effectiveDate: '',
    });
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(policy => policy.id !== id));
    }
  };

  const handleDownloadPolicy = (policy) => {
    // Simulate download
    alert(`Downloading policy: ${policy.title}`);
  };

  const categories = [
    { id: 'all', name: 'All Policies', icon: '📋', count: policies.length },
    { id: 'hospital', name: 'Hospital Policies', icon: '🏥', count: policies.filter(p => p.category === 'hospital').length },
    { id: 'medical', name: 'Medical Policies', icon: '🩺', count: policies.filter(p => p.category === 'medical').length },
    { id: 'hr', name: 'HR Policies', icon: '👥', count: policies.filter(p => p.category === 'hr').length },
    { id: 'operations', name: 'Operations', icon: '⚙️', count: policies.filter(p => p.category === 'operations').length },
    { id: 'it', name: 'IT Policies', icon: '💻', count: policies.filter(p => p.category === 'it').length },
  ];

  const departments = [
    'All', 'Emergency', 'ICU', 'Surgery', 'Pharmacy', 
    'Radiology', 'Laboratory', 'Administration', 'Maintenance', 'IT'
  ];

  return (
    <div className="hospital-manager-container">
      {/* Header Section */}
      <div className="hms-manager-header">
        <div className="hms-header-content">
          <h1 className="hms-main-title">Hospital Policy Management</h1>
          <p className="hms-subtitle">Manage and review all hospital policies and procedures</p>
        </div>
        <button 
          className="hms-add-policy-btn"
          onClick={() => setShowAddPolicyModal(true)}
        >
          <i className="fas fa-plus-circle"></i> Add New Policy
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="hms-search-filter-section">
        <div className="hms-search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search policies by title, department, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hms-search-input"
          />
        </div>
        <div className="hms-filter-options">
          <select className="hms-department-filter">
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept.toLowerCase()}>{dept}</option>
            ))}
          </select>
          <select className="hms-status-filter">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Policy Categories */}
      <div className="hms-category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`hms-category-tab ${activeTab === category.id ? 'active' : ''}`}
            onClick={() => setActiveTab(category.id)}
          >
            <span className="hms-tab-icon">{category.icon}</span>
            <span className="hms-tab-name">{category.name}</span>
            <span className="hms-tab-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Policies Grid */}
      <div className="hms-policies-grid">
        {filteredPolicies.length === 0 ? (
          <div className="hms-no-policies">
            <i className="fas fa-file-alt"></i>
            <h3>No policies found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredPolicies.map(policy => (
            <div key={policy.id} className="hms-policy-card">
              <div className="hms-policy-header">
                <div className="hms-policy-category">
                  <span className={`hms-category-badge ${policy.category}`}>
                    {policy.category.toUpperCase()}
                  </span>
                  <span className={`hms-status-badge ${policy.status}`}>
                    {policy.status}
                  </span>
                </div>
                <div className="hms-policy-actions">
                  <button 
                    className="hms-action-btn download"
                    onClick={() => handleDownloadPolicy(policy)}
                    title="Download"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                  <button 
                    className="hms-action-btn edit"
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="hms-action-btn delete"
                    onClick={() => handleDeletePolicy(policy.id)}
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div className="hms-policy-body">
                <h3 className="hms-policy-title">{policy.title}</h3>
                <p className="hms-policy-description">{policy.description}</p>
                
                <div className="hms-policy-meta">
                  <div className="hms-meta-item">
                    <i className="fas fa-hospital"></i>
                    <span>{policy.department}</span>
                  </div>
                  <div className="hms-meta-item">
                    <i className="fas fa-code-branch"></i>
                    <span>v{policy.version}</span>
                  </div>
                  <div className="hms-meta-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{policy.effectiveDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="hms-policy-footer">
                <div className="hms-updated-info">
                  <i className="fas fa-user-md"></i>
                  <span>Updated by {policy.updatedBy}</span>
                  <span className="hms-update-date">on {policy.lastUpdated}</span>
                </div>
                <button className="hms-view-details-btn">
                  View Details <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics Section */}
      <div className="hms-statistics-section">
        <div className="hms-stat-card">
          <div className="hms-stat-icon total">
            <i className="fas fa-file-contract"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{policies.length}</h3>
            <p>Total Policies</p>
          </div>
        </div>
        
        <div className="hms-stat-card">
          <div className="hms-stat-icon active">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{policies.filter(p => p.status === 'active').length}</h3>
            <p>Active Policies</p>
          </div>
        </div>
        
        <div className="hms-stat-card">
          <div className="hms-stat-icon departments">
            <i className="fas fa-sitemap"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{[...new Set(policies.map(p => p.department))].length}</h3>
            <p>Departments Covered</p>
          </div>
        </div>
        
        <div className="hms-stat-card">
          <div className="hms-stat-icon updates">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{policies.filter(p => 
              new Date(p.lastUpdated) > new Date(Date.now() - 30*24*60*60*1000)
            ).length}</h3>
            <p>Updated in Last 30 Days</p>
          </div>
        </div>
      </div>

      {/* Add Policy Modal */}
      {showAddPolicyModal && (
        <div className="hms-modal-overlay">
          <div className="hms-modal-content">
            <div className="hms-modal-header">
              <h2>Add New Policy</h2>
              <button 
                className="hms-modal-close"
                onClick={() => setShowAddPolicyModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddPolicy} className="hms-policy-form">
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Policy Title *</label>
                  <input
                    type="text"
                    value={newPolicy.title}
                    onChange={(e) => setNewPolicy({...newPolicy, title: e.target.value})}
                    required
                    placeholder="Enter policy title"
                  />
                </div>
                
                <div className="hms-form-group">
                  <label>Category *</label>
                  <select
                    value={newPolicy.category}
                    onChange={(e) => setNewPolicy({...newPolicy, category: e.target.value})}
                    required
                  >
                    <option value="hospital">Hospital Policy</option>
                    <option value="medical">Medical Policy</option>
                    <option value="hr">HR Policy</option>
                    <option value="operations">Operations</option>
                    <option value="it">IT Policy</option>
                  </select>
                </div>
              </div>
              
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Department *</label>
                  <select
                    value={newPolicy.department}
                    onChange={(e) => setNewPolicy({...newPolicy, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div className="hms-form-group">
                  <label>Status *</label>
                  <select
                    value={newPolicy.status}
                    onChange={(e) => setNewPolicy({...newPolicy, status: e.target.value})}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Version *</label>
                  <input
                    type="text"
                    value={newPolicy.version}
                    onChange={(e) => setNewPolicy({...newPolicy, version: e.target.value})}
                    required
                    placeholder="e.g., 1.0"
                  />
                </div>
                
                <div className="hms-form-group">
                  <label>Effective Date *</label>
                  <input
                    type="date"
                    value={newPolicy.effectiveDate}
                    onChange={(e) => setNewPolicy({...newPolicy, effectiveDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="hms-form-group">
                <label>Description *</label>
                <textarea
                  value={newPolicy.description}
                  onChange={(e) => setNewPolicy({...newPolicy, description: e.target.value})}
                  required
                  placeholder="Enter policy description and details..."
                  rows="4"
                />
              </div>
              
              <div className="hms-form-actions">
                <button
                  type="button"
                  className="hms-cancel-btn"
                  onClick={() => setShowAddPolicyModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hms-submit-btn"
                >
                  Add Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerPolicies;