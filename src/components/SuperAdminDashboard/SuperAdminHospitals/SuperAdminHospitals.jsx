import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SuperAdminHospitals.css';

const SuperAdminHospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        phone: '',
        email: '',
        website: '',
        type: 'private',
        beds: '',
        specialties: [],
        status: 'active'
    });

    // Mock data
    const mockHospitals = [
        {
            id: 1,
            name: 'Mediconeckt General Hospital',
            address: '123 Healthcare Street, Medical Complex',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            pincode: '400001',
            phone: '+91-9876543210',
            email: 'info@mediconect.com',
            website: 'www.mediconect.com',
            type: 'private',
            beds: 500,
            specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
            status: 'active',
            joinedDate: '2023-01-15',
            rating: 4.8,
            activeUsers: 245,
            departments: 15,
            doctors: 120,
            emergencyServices: true,
            ambulanceServices: true,
            insuranceAccepted: ['Private', 'Corporate']
        },
        {
            id: 2,
            name: 'City Government Hospital',
            address: '456 Public Health Road, Government Complex',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India',
            pincode: '110001',
            phone: '+91-9876543211',
            email: 'admin@cityhospital.gov',
            website: 'www.cityhospital.gov.in',
            type: 'government',
            beds: 1200,
            specialties: ['General Medicine', 'Pediatrics', 'Surgery'],
            status: 'active',
            joinedDate: '2023-03-20',
            rating: 4.5,
            activeUsers: 1200,
            departments: 25,
            doctors: 300,
            emergencyServices: true,
            ambulanceServices: true,
            insuranceAccepted: ['Government', 'CGHS']
        },
        {
            id: 3,
            name: 'Trust Medical Center',
            address: '789 Charity Lane, Trust Building',
            city: 'Bangalore',
            state: 'Karnataka',
            country: 'India',
            pincode: '560001',
            phone: '+91-9876543212',
            email: 'contact@trustmedical.org',
            website: 'www.trustmedical.org',
            type: 'trust',
            beds: 300,
            specialties: ['Oncology', 'Radiology', 'Pathology'],
            status: 'pending',
            joinedDate: '2023-05-10',
            rating: 4.3,
            activeUsers: 89,
            departments: 8,
            doctors: 45,
            emergencyServices: false,
            ambulanceServices: true,
            insuranceAccepted: ['Private']
        },
        {
            id: 4,
            name: 'Super Specialty Hospital',
            address: '321 Medical Hub, Tech Park Area',
            city: 'Chennai',
            state: 'Tamil Nadu',
            country: 'India',
            pincode: '600001',
            phone: '+91-9876543213',
            email: 'care@superspecialty.com',
            website: 'www.superspecialty.com',
            type: 'private',
            beds: 800,
            specialties: ['Cardiac Surgery', 'Neuro Surgery', 'Transplant'],
            status: 'active',
            joinedDate: '2023-02-28',
            rating: 4.9,
            activeUsers: 567,
            departments: 20,
            doctors: 200,
            emergencyServices: true,
            ambulanceServices: true,
            insuranceAccepted: ['Private', 'Corporate', 'International']
        },
        {
            id: 5,
            name: 'Rural Health Center',
            address: '654 Village Road, Rural Area',
            city: 'Hyderabad',
            state: 'Telangana',
            country: 'India',
            pincode: '500001',
            phone: '+91-9876543214',
            email: 'support@ruralhealth.in',
            website: 'www.ruralhealth.in',
            type: 'government',
            beds: 150,
            specialties: ['Primary Care', 'Maternity', 'Emergency'],
            status: 'inactive',
            joinedDate: '2023-04-05',
            rating: 4.2,
            activeUsers: 45,
            departments: 5,
            doctors: 20,
            emergencyServices: true,
            ambulanceServices: false,
            insuranceAccepted: ['Government']
        }
    ];

    useEffect(() => {
        setTimeout(() => {
            setHospitals(mockHospitals);
            setLoading(false);
        }, 2000);
    }, []);

    // Filter hospitals based on search and filter
    const filteredHospitals = hospitals.filter(hospital => {
        const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.type.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' ||
            hospital.status === filter ||
            hospital.type === filter;

        return matchesSearch && matchesFilter;
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submit for adding new hospital
    const handleAddHospital = (e) => {
        e.preventDefault();
        const newHospital = {
            id: hospitals.length + 1,
            ...formData,
            joinedDate: new Date().toISOString().split('T')[0],
            rating: 4.0,
            activeUsers: 0,
            departments: 0,
            doctors: 0,
            emergencyServices: false,
            ambulanceServices: false,
            insuranceAccepted: []
        };

        setHospitals(prev => [...prev, newHospital]);
        setShowAddModal(false);
        resetForm();
    };

    // Handle edit hospital
    const handleEditHospital = (e) => {
        e.preventDefault();
        const updatedHospitals = hospitals.map(hospital =>
            hospital.id === selectedHospital.id ? { ...selectedHospital, ...formData } : hospital
        );
        setHospitals(updatedHospitals);
        setShowEditModal(false);
        resetForm();
    };

    // Handle delete hospital
    const handleDeleteHospital = () => {
        const updatedHospitals = hospitals.filter(hospital => hospital.id !== selectedHospital.id);
        setHospitals(updatedHospitals);
        setShowDeleteModal(false);
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            phone: '',
            email: '',
            website: '',
            type: 'private',
            beds: '',
            specialties: [],
            status: 'active'
        });
        setSelectedHospital(null);
    };

    // Open edit modal with hospital data
    const openEditModal = (hospital) => {
        setSelectedHospital(hospital);
        setFormData({
            name: hospital.name,
            address: hospital.address,
            city: hospital.city,
            state: hospital.state,
            country: hospital.country,
            pincode: hospital.pincode || '',
            phone: hospital.phone,
            email: hospital.email,
            website: hospital.website || '',
            type: hospital.type,
            beds: hospital.beds.toString(),
            specialties: hospital.specialties,
            status: hospital.status
        });
        setShowEditModal(true);
    };

    // Open delete modal
    const openDeleteModal = (hospital) => {
        setSelectedHospital(hospital);
        setShowDeleteModal(true);
    };

    // Open view modal
    const openViewModal = (hospital) => {
        setSelectedHospital(hospital);
        setShowViewModal(true);
    };

    // Open settings modal
    const openSettingsModal = (hospital) => {
        setSelectedHospital(hospital);
        setShowSettingsModal(true);
    };

    // Toggle hospital status
    const toggleHospitalStatus = (hospitalId) => {
        setHospitals(prev => prev.map(hospital => {
            if (hospital.id === hospitalId) {
                return {
                    ...hospital,
                    status: hospital.status === 'active' ? 'inactive' : 'active'
                };
            }
            return hospital;
        }));
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'sa-hosp-badge-success';
            case 'inactive': return 'sa-hosp-badge-danger';
            case 'pending': return 'sa-hosp-badge-warning';
            default: return 'sa-hosp-badge-secondary';
        }
    };

    // Get type badge color
    const getTypeColor = (type) => {
        switch (type) {
            case 'private': return 'sa-hosp-badge-primary';
            case 'government': return 'sa-hosp-badge-info';
            case 'trust': return 'sa-hosp-badge-purple';
            default: return 'sa-hosp-badge-secondary';
        }
    };

    // Statistics
    const stats = {
        total: hospitals.length,
        active: hospitals.filter(h => h.status === 'active').length,
        pending: hospitals.filter(h => h.status === 'pending').length,
        totalBeds: hospitals.reduce((sum, h) => sum + parseInt(h.beds), 0),
        totalUsers: hospitals.reduce((sum, h) => sum + h.activeUsers, 0)
    };

    // Format phone number
    const formatPhoneNumber = (phone) => {
        return phone.replace(/(\d{2})(\d{10})/, '$1-$2');
    };

    return (
        <div className="sa-hospitals-container">
            <div className="sa-hospitals-content">
                {/* Header */}
                <div className="sa-hospitals-header">
                    <div className="sa-hosp-header-left">
                        <h1 className="sa-hosp-title">
                            <i className="fas fa-hospital me-2"></i>
                            Hospital Management
                        </h1>
                        <p className="sa-hosp-subtitle">Manage all hospital accounts and information</p>
                    </div>
                    <div className="sa-hosp-header-right">
                        <button
                            className="sa-hosp-btn sa-hosp-btn-primary"
                            onClick={() => setShowAddModal(true)}
                        >
                            <i className="fas fa-plus me-2"></i>
                            Add New Hospital
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="sa-hosp-stats-grid">
                    <motion.div
                        className="sa-hosp-stat-card sa-hosp-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="sa-hosp-stat-icon">
                            <i className="fas fa-hospital"></i>
                        </div>
                        <div className="sa-hosp-stat-content">
                            <h3 className="sa-hosp-stat-value">{stats.total}</h3>
                            <p className="sa-hosp-stat-label">Total Hospitals</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="sa-hosp-stat-card sa-hosp-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="sa-hosp-stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="sa-hosp-stat-content">
                            <h3 className="sa-hosp-stat-value">{stats.active}</h3>
                            <p className="sa-hosp-stat-label">Active Hospitals</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="sa-hosp-stat-card sa-hosp-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="sa-hosp-stat-icon">
                            <i className="fas fa-procedures"></i>
                        </div>
                        <div className="sa-hosp-stat-content">
                            <h3 className="sa-hosp-stat-value">{stats.totalBeds.toLocaleString()}</h3>
                            <p className="sa-hosp-stat-label">Total Beds</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="sa-hosp-stat-card sa-hosp-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <div className="sa-hosp-stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="sa-hosp-stat-content">
                            <h3 className="sa-hosp-stat-value">{stats.totalUsers.toLocaleString()}</h3>
                            <p className="sa-hosp-stat-label">Active Users</p>
                        </div>
                    </motion.div>
                </div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="sa-hospitals-loading">
                        <div className="sa-hosp-loading-container">
                            <div className="sa-hosp-spinner">
                                <div className="sa-hosp-spinner-circle"></div>
                                <div className="sa-hosp-spinner-circle"></div>
                                <div className="sa-hosp-spinner-circle"></div>
                                <div className="sa-hosp-spinner-circle"></div>
                            </div>
                            <div className="sa-hosp-loading-text">
                                <h3>Loading Hospital Data...</h3>
                                <p>Please wait while we fetch the latest information</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Search and Filter Bar */}
                        <div className="sa-hosp-search-filter-bar">
                            <div className="sa-hosp-search-box">
                                <i className="fas fa-search sa-hosp-search-icon"></i>
                                <input
                                    type="text"
                                    placeholder="Search hospitals by name, city, state, or type..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="sa-hosp-search-input"
                                />
                                {searchTerm && (
                                    <button
                                        className="sa-hosp-clear-search"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                            </div>

                            <div className="sa-hosp-filter-buttons">
                                <button
                                    className={`sa-hosp-filter-btn ${filter === 'all' ? 'sa-hosp-filter-active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All Hospitals
                                </button>
                                <button
                                    className={`sa-hosp-filter-btn ${filter === 'active' ? 'sa-hosp-filter-active' : ''}`}
                                    onClick={() => setFilter('active')}
                                >
                                    Active
                                </button>
                                <button
                                    className={`sa-hosp-filter-btn ${filter === 'pending' ? 'sa-hosp-filter-active' : ''}`}
                                    onClick={() => setFilter('pending')}
                                >
                                    Pending
                                </button>
                                <select
                                    className="sa-hosp-type-filter"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All Types</option>
                                    <option value="private">Private</option>
                                    <option value="government">Government</option>
                                    <option value="trust">Trust</option>
                                </select>
                            </div>
                        </div>

                        {/* Hospitals Table */}
                        <div className="sa-hospitals-table-container">
                            <div className="sa-hosp-table-wrapper">
                                <table className="sa-hosp-table">
                                    <thead>
                                        <tr>
                                            <th className="sa-hosp-name-col">Hospital Name</th>
                                            <th className="sa-hosp-location-col">Location</th>
                                            <th className="sa-hosp-type-col">Type</th>
                                            <th className="sa-hosp-beds-col">Beds</th>
                                            <th className="sa-hosp-status-col">Status</th>
                                            <th className="sa-hosp-rating-col">Rating</th>
                                            <th className="sa-hosp-actions-col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredHospitals.map((hospital) => (
                                            <motion.tr
                                                key={hospital.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className={hospital.status === 'inactive' ? 'sa-hosp-inactive-row' : ''}
                                            >
                                                <td>
                                                    <div className="sa-hosp-info">
                                                        <div className="sa-hosp-avatar">
                                                            <i className="fas fa-hospital"></i>
                                                        </div>
                                                        <div className="sa-hosp-details">
                                                            <strong className="sa-hosp-name">{hospital.name}</strong>
                                                            <small className="sa-hosp-contact">
                                                                <i className="fas fa-envelope me-1"></i>
                                                                {hospital.email}
                                                            </small>
                                                            <small className="sa-hosp-contact">
                                                                <i className="fas fa-phone me-1"></i>
                                                                {formatPhoneNumber(hospital.phone)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="sa-hosp-location-info">
                                                        <div className="sa-hosp-city-state">
                                                            <i className="fas fa-map-marker-alt me-1"></i>
                                                            {hospital.city}, {hospital.state}
                                                        </div>
                                                        <small className="sa-hosp-country">
                                                            {hospital.country}
                                                        </small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`sa-hosp-badge ${getTypeColor(hospital.type)}`}>
                                                        {hospital.type.charAt(0).toUpperCase() + hospital.type.slice(1)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="sa-hosp-beds-info">
                                                        <i className="fas fa-bed me-2"></i>
                                                        <span className="sa-hosp-beds-count">{hospital.beds.toLocaleString()}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="sa-hosp-status-cell">
                                                        <span className={`sa-hosp-badge ${getStatusColor(hospital.status)}`}>
                                                            {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                                                        </span>
                                                        <button
                                                            className="sa-hosp-status-toggle-btn"
                                                            onClick={() => toggleHospitalStatus(hospital.id)}
                                                            title={hospital.status === 'active' ? 'Deactivate' : 'Activate'}
                                                        >
                                                            <i className={`fas fa-power-off ${hospital.status === 'active' ? 'sa-hosp-text-success' : 'sa-hosp-text-danger'}`}></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="sa-hosp-rating-info">
                                                        <div className="sa-hosp-stars">
                                                            <i className="fas fa-star sa-hosp-text-warning"></i>
                                                            <i className="fas fa-star sa-hosp-text-warning"></i>
                                                            <i className="fas fa-star sa-hosp-text-warning"></i>
                                                            <i className="fas fa-star sa-hosp-text-warning"></i>
                                                            <i className={`fas fa-star ${hospital.rating >= 4.5 ? 'sa-hosp-text-warning' : 'sa-hosp-text-muted'}`}></i>
                                                        </div>
                                                        <div className="sa-hosp-rating-value">
                                                            {hospital.rating}/5.0
                                                            <small className="sa-hosp-users-count">({hospital.activeUsers} users)</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="sa-hosp-action-buttons">
                                                        <button
                                                            className="sa-hosp-action-btn sa-hosp-view-btn"
                                                            onClick={() => openViewModal(hospital)}
                                                            title="View Details"
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                        <button
                                                            className="sa-hosp-action-btn sa-hosp-edit-btn"
                                                            onClick={() => openEditModal(hospital)}
                                                            title="Edit Hospital"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="sa-hosp-action-btn sa-hosp-delete-btn"
                                                            onClick={() => openDeleteModal(hospital)}
                                                            title="Delete Hospital"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                        <button
                                                            className="sa-hosp-action-btn sa-hosp-settings-btn"
                                                            onClick={() => openSettingsModal(hospital)}
                                                            title="Hospital Settings"
                                                        >
                                                            <i className="fas fa-cog"></i>
                                                        </button>
                                                        <button
                                                            className="sa-hosp-action-btn sa-hosp-users-btn"
                                                            onClick={() => {/* View users */ }}
                                                            title="View Users"
                                                        >
                                                            <i className="fas fa-users"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>

                                {filteredHospitals.length === 0 && (
                                    <div className="sa-hosp-no-results">
                                        <i className="fas fa-hospital fa-3x mb-3"></i>
                                        <h4>No hospitals found</h4>
                                        <p>Try adjusting your search or filter criteria</p>
                                        <button
                                            className="sa-hosp-btn sa-hosp-btn-primary mt-3"
                                            onClick={() => setShowAddModal(true)}
                                        >
                                            <i className="fas fa-plus me-2"></i>
                                            Add New Hospital
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Add Hospital Modal */}
                {showAddModal && (
                    <div className="sa-hosp-modal-overlay">
                        <motion.div
                            className="sa-hosp-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sa-hosp-modal-header">
                                <h3 className="sa-hosp-modal-title">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Add New Hospital
                                </h3>
                                <button
                                    className="sa-hosp-modal-close"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <form onSubmit={handleAddHospital}>
                                <div className="sa-hosp-modal-body">
                                    <div className="sa-hosp-form-grid">
                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-hospital me-2"></i>
                                                Hospital Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                placeholder="Enter hospital name"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                Address *
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                placeholder="Full address"
                                                rows="2"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-city me-2"></i>
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-flag me-2"></i>
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-globe me-2"></i>
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-map-pin me-2"></i>
                                                Pincode
                                            </label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                placeholder="Postal code"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-phone me-2"></i>
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                placeholder="+91-9876543210"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-envelope me-2"></i>
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                placeholder="hospital@example.com"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-globe me-2"></i>
                                                Website
                                            </label>
                                            <input
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                placeholder="www.example.com"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-bed me-2"></i>
                                                Number of Beds *
                                            </label>
                                            <input
                                                type="number"
                                                name="beds"
                                                value={formData.beds}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                min="1"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-tag me-2"></i>
                                                Hospital Type *
                                            </label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            >
                                                <option value="private">Private Hospital</option>
                                                <option value="government">Government Hospital</option>
                                                <option value="trust">Trust Hospital</option>
                                            </select>
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">
                                                <i className="fas fa-info-circle me-2"></i>
                                                Status *
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            >
                                                <option value="active">Active</option>
                                                <option value="pending">Pending Approval</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="sa-hosp-modal-footer">
                                    <button
                                        type="button"
                                        className="sa-hosp-btn sa-hosp-btn-secondary"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="sa-hosp-btn sa-hosp-btn-primary"
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        Add Hospital
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Edit Hospital Modal */}
                {showEditModal && selectedHospital && (
                    <div className="sa-hosp-modal-overlay">
                        <motion.div
                            className="sa-hosp-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sa-hosp-modal-header">
                                <h3 className="sa-hosp-modal-title">
                                    <i className="fas fa-edit me-2"></i>
                                    Edit Hospital: {selectedHospital.name}
                                </h3>
                                <button
                                    className="sa-hosp-modal-close"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <form onSubmit={handleEditHospital}>
                                <div className="sa-hosp-modal-body">
                                    <div className="sa-hosp-form-grid">
                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Hospital Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Address *</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                rows="2"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Country *</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Beds *</label>
                                            <input
                                                type="number"
                                                name="beds"
                                                value={formData.beds}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                                min="1"
                                            />
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Hospital Type *</label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            >
                                                <option value="private">Private</option>
                                                <option value="government">Government</option>
                                                <option value="trust">Trust</option>
                                            </select>
                                        </div>

                                        <div className="sa-hosp-form-group">
                                            <label className="sa-hosp-form-label">Status *</label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="sa-hosp-form-control"
                                                required
                                            >
                                                <option value="active">Active</option>
                                                <option value="pending">Pending</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="sa-hosp-modal-footer">
                                    <button
                                        type="button"
                                        className="sa-hosp-btn sa-hosp-btn-secondary"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="sa-hosp-btn sa-hosp-btn-primary"
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        Update Hospital
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* View Hospital Details Modal */}
                {showViewModal && selectedHospital && (
                    <div className="sa-hosp-modal-overlay">
                        <motion.div
                            className="sa-hosp-modal sa-hosp-view-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sa-hosp-modal-header">
                                <h3 className="sa-hosp-modal-title">
                                    <i className="fas fa-eye me-2"></i>
                                    Hospital Details
                                </h3>
                                <button
                                    className="sa-hosp-modal-close"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="sa-hosp-modal-body">
                                <div className="sa-hosp-details-view">
                                    <div className="sa-hosp-details-header">
                                        <div className="sa-hosp-avatar-large">
                                            <i className="fas fa-hospital"></i>
                                        </div>
                                        <div className="sa-hosp-details-title">
                                            <h3>{selectedHospital.name}</h3>
                                            <div className="sa-hosp-details-meta">
                                                <span className={`sa-hosp-badge ${getTypeColor(selectedHospital.type)}`}>
                                                    {selectedHospital.type.toUpperCase()}
                                                </span>
                                                <span className={`sa-hosp-badge ${getStatusColor(selectedHospital.status)}`}>
                                                    {selectedHospital.status.toUpperCase()}
                                                </span>
                                                <span className="sa-hosp-badge sa-hosp-badge-secondary">
                                                    ID: HOS-{selectedHospital.id.toString().padStart(3, '0')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sa-hosp-details-grid">
                                        <div className="sa-hosp-detail-section">
                                            <h4><i className="fas fa-map-marker-alt me-2"></i>Location Details</h4>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Address:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.address}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">City:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.city}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">State:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.state}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Country:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.country}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Pincode:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.pincode || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="sa-hosp-detail-section">
                                            <h4><i className="fas fa-phone-alt me-2"></i>Contact Details</h4>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Phone:</span>
                                                <span className="sa-hosp-detail-value">{formatPhoneNumber(selectedHospital.phone)}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Email:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.email}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Website:</span>
                                                <span className="sa-hosp-detail-value">
                                                    {selectedHospital.website ? (
                                                        <a href={`https://${selectedHospital.website}`} target="_blank" rel="noopener noreferrer">
                                                            {selectedHospital.website}
                                                        </a>
                                                    ) : 'N/A'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="sa-hosp-detail-section">
                                            <h4><i className="fas fa-chart-line me-2"></i>Statistics</h4>
                                            <div className="sa-hosp-stats-grid-small">
                                                <div className="sa-hosp-stat-item-small">
                                                    <i className="fas fa-bed"></i>
                                                    <div>
                                                        <span className="sa-hosp-stat-number-small">{selectedHospital.beds.toLocaleString()}</span>
                                                        <span className="sa-hosp-stat-label-small">Total Beds</span>
                                                    </div>
                                                </div>
                                                <div className="sa-hosp-stat-item-small">
                                                    <i className="fas fa-user-md"></i>
                                                    <div>
                                                        <span className="sa-hosp-stat-number-small">{selectedHospital.doctors || 0}</span>
                                                        <span className="sa-hosp-stat-label-small">Doctors</span>
                                                    </div>
                                                </div>
                                                <div className="sa-hosp-stat-item-small">
                                                    <i className="fas fa-users"></i>
                                                    <div>
                                                        <span className="sa-hosp-stat-number-small">{selectedHospital.activeUsers.toLocaleString()}</span>
                                                        <span className="sa-hosp-stat-label-small">Active Users</span>
                                                    </div>
                                                </div>
                                                <div className="sa-hosp-stat-item-small">
                                                    <i className="fas fa-star"></i>
                                                    <div>
                                                        <span className="sa-hosp-stat-number-small">{selectedHospital.rating}/5</span>
                                                        <span className="sa-hosp-stat-label-small">Rating</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sa-hosp-detail-section">
                                            <h4><i className="fas fa-stethoscope me-2"></i>Specialties</h4>
                                            <div className="sa-hosp-specialties-list">
                                                {selectedHospital.specialties.map((specialty, index) => (
                                                    <span key={index} className="sa-hosp-specialty-badge">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="sa-hosp-detail-section">
                                            <h4><i className="fas fa-calendar-alt me-2"></i>Additional Info</h4>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Joined Date:</span>
                                                <span className="sa-hosp-detail-value">{selectedHospital.joinedDate}</span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Emergency Services:</span>
                                                <span className="sa-hosp-detail-value">
                                                    {selectedHospital.emergencyServices ? (
                                                        <span className="sa-hosp-text-success"><i className="fas fa-check-circle"></i> Available</span>
                                                    ) : (
                                                        <span className="sa-hosp-text-danger"><i className="fas fa-times-circle"></i> Not Available</span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="sa-hosp-detail-item">
                                                <span className="sa-hosp-detail-label">Ambulance Services:</span>
                                                <span className="sa-hosp-detail-value">
                                                    {selectedHospital.ambulanceServices ? (
                                                        <span className="sa-hosp-text-success"><i className="fas fa-check-circle"></i> Available</span>
                                                    ) : (
                                                        <span className="sa-hosp-text-danger"><i className="fas fa-times-circle"></i> Not Available</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sa-hosp-modal-footer">
                                <button
                                    type="button"
                                    className="sa-hosp-btn sa-hosp-btn-secondary"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="sa-hosp-btn sa-hosp-btn-primary"
                                    onClick={() => {
                                        setShowViewModal(false);
                                        openEditModal(selectedHospital);
                                    }}
                                >
                                    <i className="fas fa-edit me-2"></i>
                                    Edit Hospital
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedHospital && (
                    <div className="sa-hosp-modal-overlay">
                        <motion.div
                            className="sa-hosp-modal sa-hosp-delete-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sa-hosp-modal-header">
                                <h3 className="sa-hosp-modal-title">
                                    <i className="fas fa-exclamation-triangle sa-hosp-text-danger me-2"></i>
                                    Confirm Deletion
                                </h3>
                                <button
                                    className="sa-hosp-modal-close"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="sa-hosp-modal-body">
                                <div className="sa-hosp-delete-warning">
                                    <i className="fas fa-trash-alt fa-3x sa-hosp-text-danger mb-3"></i>
                                    <h4>Are you sure you want to delete this hospital?</h4>
                                    <p className="sa-hosp-text-muted">
                                        This action cannot be undone. This will permanently delete
                                        <strong> "{selectedHospital.name}"</strong> and all associated data.
                                    </p>

                                    <div className="sa-hosp-delete-info-card">
                                        <div className="sa-hosp-delete-info-item">
                                            <span>Hospital:</span>
                                            <strong>{selectedHospital.name}</strong>
                                        </div>
                                        <div className="sa-hosp-delete-info-item">
                                            <span>Location:</span>
                                            <strong>{selectedHospital.city}, {selectedHospital.state}</strong>
                                        </div>
                                        <div className="sa-hosp-delete-info-item">
                                            <span>Type:</span>
                                            <span className={`sa-hosp-badge ${getTypeColor(selectedHospital.type)}`}>
                                                {selectedHospital.type}
                                            </span>
                                        </div>
                                        <div className="sa-hosp-delete-info-item">
                                            <span>Active Users:</span>
                                            <strong>{selectedHospital.activeUsers.toLocaleString()}</strong>
                                        </div>
                                        <div className="sa-hosp-delete-info-item">
                                            <span>Total Beds:</span>
                                            <strong>{selectedHospital.beds.toLocaleString()}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sa-hosp-modal-footer">
                                <button
                                    type="button"
                                    className="sa-hosp-btn sa-hosp-btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="sa-hosp-btn sa-hosp-btn-danger"
                                    onClick={handleDeleteHospital}
                                >
                                    <i className="fas fa-trash me-2"></i>
                                    Delete Hospital
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdminHospitals;