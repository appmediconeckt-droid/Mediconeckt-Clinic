import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaUserMd, 
    FaUserNurse, 
    FaUserInjured, 
    FaUsers,
    FaHospital,
    FaBuilding,
    FaPhone,
    FaEnvelope,
    FaCalendar,
    FaShieldAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaEdit,
    FaTrash,
    FaEye,
    FaKey,
    FaChartBar,
    FaSearch
} from 'react-icons/fa';
import './SuperAdminUsers.css';

const SuperAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    // Admin Creation Form States
    const [adminForm, setAdminForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        hospitalId: '',
        designation: 'Hospital Administrator',
        department: 'Administration',
        emailOtp: '',
        phoneOtp: '',
        password: '',
        confirmPassword: '',
        emailVerified: false,
        phoneVerified: false
    });
    
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);

    // Mock hospitals data with statistics
    const mockHospitals = [
        {
            id: 'HOS-001',
            name: 'Mediconeckt General Hospital',
            totalDoctors: 45,
            totalStaff: 120,
            totalPatients: 1250,
            activeAdmins: 3,
            departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics']
        },
        {
            id: 'HOS-002',
            name: 'City Government Hospital',
            totalDoctors: 120,
            totalStaff: 300,
            totalPatients: 4500,
            activeAdmins: 5,
            departments: ['General Medicine', 'Surgery', 'Emergency', 'ICU']
        },
        {
            id: 'HOS-003',
            name: 'Trust Medical Center',
            totalDoctors: 25,
            totalStaff: 80,
            totalPatients: 850,
            activeAdmins: 2,
            departments: ['Oncology', 'Radiology', 'Pathology']
        }
    ];

    // Mock users data
    const mockUsers = [
        {
            id: 'ADM-001',
            firstName: 'Dr. Rajesh',
            lastName: 'Kumar',
            email: 'admin@mediconect.com',
            phone: '+91-9876543210',
            role: 'admin',
            hospitalId: 'HOS-001',
            hospitalName: 'Mediconeckt General Hospital',
            designation: 'Chief Administrator',
            department: 'Administration',
            status: 'active',
            lastLogin: '2024-01-15 14:30:00',
            joinDate: '2023-01-15',
            permissions: ['users:read', 'users:write', 'reports:view', 'settings:manage'],
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            emailVerified: true,
            phoneVerified: true
        },
        {
            id: 'ADM-002',
            firstName: 'Priya',
            lastName: 'Sharma',
            email: 'admin@cityhospital.gov',
            phone: '+91-9876543211',
            role: 'admin',
            hospitalId: 'HOS-002',
            hospitalName: 'City Government Hospital',
            designation: 'Hospital Administrator',
            department: 'Administration',
            status: 'active',
            lastLogin: '2024-01-14 10:15:00',
            joinDate: '2023-03-20',
            permissions: ['users:read', 'reports:view'],
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            emailVerified: true,
            phoneVerified: true
        },
        {
            id: 'ADM-003',
            firstName: 'Amit',
            lastName: 'Verma',
            email: 'admin@trustmedical.org',
            phone: '+91-9876543212',
            role: 'admin',
            hospitalId: 'HOS-003',
            hospitalName: 'Trust Medical Center',
            designation: 'System Administrator',
            department: 'IT Department',
            status: 'pending',
            lastLogin: '2024-01-10 09:45:00',
            joinDate: '2023-05-10',
            permissions: ['users:read', 'settings:manage'],
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            emailVerified: true,
            phoneVerified: false
        }
    ];

    useEffect(() => {
        // Simulate API calls
        setTimeout(() => {
            setHospitals(mockHospitals);
            setUsers(mockUsers);
            setLoading(false);
        }, 1000);
    }, []);

    // OTP Timer
    useEffect(() => {
        let interval;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    // Filter users based on search and filter
    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || user.status === filter;

        return matchesSearch && matchesFilter;
    });

    // Get hospital statistics
    const getHospitalStats = (hospitalId) => {
        const hospital = hospitals.find(h => h.id === hospitalId);
        return hospital || {
            totalDoctors: 0,
            totalStaff: 0,
            totalPatients: 0,
            activeAdmins: 0,
            departments: []
        };
    };

    // Handle admin form input changes
    const handleAdminFormChange = (e) => {
        const { name, value } = e.target;
        setAdminForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Send Email OTP
    const sendEmailOtp = () => {
        if (!adminForm.email) {
            alert('Please enter email first');
            return;
        }
        // Simulate OTP sending
        setEmailOtpSent(true);
        setOtpTimer(300); // 5 minutes
        alert(`OTP sent to ${adminForm.email}`);
    };

    // Send Phone OTP
    const sendPhoneOtp = () => {
        if (!adminForm.phone) {
            alert('Please enter phone number first');
            return;
        }
        // Simulate OTP sending
        setPhoneOtpSent(true);
        setOtpTimer(300); // 5 minutes
        alert(`OTP sent to ${adminForm.phone}`);
    };

    // Verify Email OTP
    const verifyEmailOtp = () => {
        if (adminForm.emailOtp === '123456') { // Mock OTP
            setAdminForm(prev => ({ ...prev, emailVerified: true }));
            alert('Email verified successfully!');
        } else {
            alert('Invalid OTP');
        }
    };

    // Verify Phone OTP
    const verifyPhoneOtp = () => {
        if (adminForm.phoneOtp === '123456') { // Mock OTP
            setAdminForm(prev => ({ ...prev, phoneVerified: true }));
            alert('Phone verified successfully!');
        } else {
            alert('Invalid OTP');
        }
    };

    // Handle admin creation
    const handleCreateAdmin = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!adminForm.emailVerified) {
            alert('Please verify email first');
            return;
        }
        if (!adminForm.phoneVerified) {
            alert('Please verify phone number first');
            return;
        }
        if (adminForm.password !== adminForm.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (adminForm.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        // Create new admin
        const newAdmin = {
            id: `ADM-${(users.length + 1).toString().padStart(3, '0')}`,
            firstName: adminForm.firstName,
            lastName: adminForm.lastName,
            email: adminForm.email,
            phone: adminForm.phone,
            role: 'admin',
            hospitalId: adminForm.hospitalId,
            hospitalName: hospitals.find(h => h.id === adminForm.hospitalId)?.name || '',
            designation: adminForm.designation,
            department: adminForm.department,
            status: 'active',
            lastLogin: new Date().toISOString().split('T')[0] + ' 00:00:00',
            joinDate: new Date().toISOString().split('T')[0],
            permissions: ['users:read', 'reports:view'],
            avatar: `https://ui-avatars.com/api/?name=${adminForm.firstName}+${adminForm.lastName}&background=ffd700&color=000`,
            emailVerified: true,
            phoneVerified: true
        };

        // Add to users list
        setUsers(prev => [...prev, newAdmin]);
        
        // Update hospital admin count
        setHospitals(prev => prev.map(hospital => 
            hospital.id === adminForm.hospitalId 
                ? { ...hospital, activeAdmins: hospital.activeAdmins + 1 }
                : hospital
        ));

        // Reset form and close modal
        setAdminForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            hospitalId: '',
            designation: 'Hospital Administrator',
            department: 'Administration',
            emailOtp: '',
            phoneOtp: '',
            password: '',
            confirmPassword: '',
            emailVerified: false,
            phoneVerified: false
        });
        setEmailOtpSent(false);
        setPhoneOtpSent(false);
        setShowAddAdminModal(false);
        
        alert('Admin created successfully!');
    };

    // Handle user actions
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleResetPassword = (user) => {
        setSelectedUser(user);
        setShowResetPasswordModal(true);
    };

    const confirmDeleteUser = () => {
        // Update hospital admin count
        setHospitals(prev => prev.map(hospital => 
            hospital.id === selectedUser.hospitalId 
                ? { ...hospital, activeAdmins: Math.max(0, hospital.activeAdmins - 1) }
                : hospital
        ));

        // Remove user
        setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
        setShowDeleteModal(false);
        alert('User deleted successfully!');
    };

    const confirmResetPassword = () => {
        // In real app, this would trigger an email/SMS with reset link
        alert(`Password reset link sent to ${selectedUser.email}`);
        setShowResetPasswordModal(false);
    };

    // Get status badge color
    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'sau-status-badge-active';
            case 'pending': return 'sau-status-badge-pending';
            case 'inactive': return 'sau-status-badge-inactive';
            default: return 'sau-status-badge-inactive';
        }
    };

    // Format phone number
    const formatPhoneNumber = (phone) => {
        return phone.replace(/(\d{2})(\d{10})/, '$1-$2');
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Statistics
    const totalAdmins = users.length;
    const activeAdmins = users.filter(u => u.status === 'active').length;
    const pendingAdmins = users.filter(u => u.status === 'pending').length;

    return (
        <div className="sau-container p-4">
            <div className="sau-main-content">
                {/* Header */}
                <div className="sau-header">
                    <div className="sau-header-left">
                        <h1 className="sau-title">
                            <FaUsers className="sau-title-icon" />
                            User Management
                        </h1>
                        <p className="sau-subtitle">
                            Manage Hospital Administrators and User Permissions
                        </p>
                    </div>
                    <div className="sau-header-right">
                        <button
                            className="sau-btn sau-btn-primary"
                            onClick={() => setShowAddAdminModal(true)}
                        >
                            <FaShieldAlt className="sau-btn-icon" />
                            Add New Admin
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="sau-stats-grid">
                    <motion.div
                        className="sau-stat-card sau-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="sau-stat-icon">
                            <FaBuilding />
                        </div>
                        <div className="sau-stat-content">
                            <h3 className="sau-stat-value">{hospitals.length}</h3>
                            <p className="sau-stat-label">Total Hospitals</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="sau-stat-card sau-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="sau-stat-icon">
                            <FaUserMd />
                        </div>
                        <div className="sau-stat-content">
                            <h3 className="sau-stat-value">
                                {hospitals.reduce((sum, h) => sum + h.totalDoctors, 0)}
                            </h3>
                            <p className="sau-stat-label">Total Doctors</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="sau-stat-card sau-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="sau-stat-icon">
                            <FaUsers />
                        </div>
                        <div className="sau-stat-content">
                            <h3 className="sau-stat-value">
                                {hospitals.reduce((sum, h) => sum + h.totalStaff, 0)}
                            </h3>
                            <p className="sau-stat-label">Total Staff</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="sau-stat-card sau-gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <div className="sau-stat-icon">
                            <FaUserInjured />
                        </div>
                        <div className="sau-stat-content">
                            <h3 className="sau-stat-value">
                                {hospitals.reduce((sum, h) => sum + h.totalPatients, 0).toLocaleString()}
                            </h3>
                            <p className="sau-stat-label">Total Patients</p>
                        </div>
                    </motion.div>
                </div>

                {/* Hospitals Statistics Section */}
                <div className="sau-hospitals-stats">
                    <h3 className="sau-section-title">
                        <FaHospital className="sau-section-icon" />
                        Hospitals Statistics
                    </h3>
                    <div className="sau-hospitals-grid">
                        {hospitals.map((hospital, index) => (
                            <motion.div
                                key={hospital.id}
                                className="sau-hospital-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="sau-hospital-card-header">
                                    <div className="sau-hospital-avatar">
                                        <FaBuilding />
                                    </div>
                                    <div className="sau-hospital-info">
                                        <h4>{hospital.name}</h4>
                                        <span className="sau-hospital-id">{hospital.id}</span>
                                    </div>
                                </div>
                                
                                <div className="sau-hospital-stats">
                                    <div className="sau-stat-row">
                                        <span className="sau-stat-label">
                                            <FaUserMd className="sau-stat-icon-small" /> Doctors:
                                        </span>
                                        <span className="sau-stat-value">{hospital.totalDoctors}</span>
                                    </div>
                                    <div className="sau-stat-row">
                                        <span className="sau-stat-label">
                                            <FaUserNurse className="sau-stat-icon-small" /> Staff:
                                        </span>
                                        <span className="sau-stat-value">{hospital.totalStaff}</span>
                                    </div>
                                    <div className="sau-stat-row">
                                        <span className="sau-stat-label">
                                            <FaUserInjured className="sau-stat-icon-small" /> Patients:
                                        </span>
                                        <span className="sau-stat-value">{hospital.totalPatients.toLocaleString()}</span>
                                    </div>
                                    <div className="sau-stat-row">
                                        <span className="sau-stat-label">
                                            <FaShieldAlt className="sau-stat-icon-small" /> Admins:
                                        </span>
                                        <span className="sau-stat-value">{hospital.activeAdmins}</span>
                                    </div>
                                </div>
                                
                                <div className="sau-hospital-departments">
                                    <small>Departments: {hospital.departments.join(', ')}</small>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="sau-search-filter-bar">
                    <div className="sau-search-box">
                        <FaSearch className="sau-search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or hospital..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="sau-search-input"
                        />
                        {searchTerm && (
                            <button
                                className="sau-clear-search"
                                onClick={() => setSearchTerm('')}
                            >
                                <FaTimesCircle />
                            </button>
                        )}
                    </div>

                    <div className="sau-filter-buttons">
                        <button
                            className={`sau-filter-btn ${filter === 'all' ? 'sau-filter-btn-active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Admins
                        </button>
                        <button
                            className={`sau-filter-btn ${filter === 'active' ? 'sau-filter-btn-active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`sau-filter-btn ${filter === 'pending' ? 'sau-filter-btn-active' : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            Pending
                        </button>
                        <select
                            className="sau-hospital-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Hospitals</option>
                            {hospitals.map(hospital => (
                                <option key={hospital.id} value={hospital.id}>
                                    {hospital.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Admin Users Table */}
                <div className="sau-users-table-container">
                    {loading ? (
                        <div className="sau-loading">
                            <div className="sau-loading-container">
                                <div className="sau-gold-spinner">
                                    <div className="sau-spinner-circle"></div>
                                    <div className="sau-spinner-circle"></div>
                                    <div className="sau-spinner-circle"></div>
                                    <div className="sau-spinner-circle"></div>
                                </div>
                                <div className="sau-loading-text">
                                    <h3>Loading...</h3>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="sau-table-wrapper">
                            <table className="sau-table">
                                <thead>
                                    <tr>
                                        <th className="sau-user-col">Administrator</th>
                                        <th className="sau-hospital-col">Hospital</th>
                                        <th className="sau-contact-col">Contact</th>
                                        <th className="sau-role-col">Designation</th>
                                        <th className="sau-status-col">Status</th>
                                        <th className="sau-actions-col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <td>
                                                <div className="sau-user-info">
                                                    <img 
                                                        src={user.avatar} 
                                                        alt={`${user.firstName} ${user.lastName}`}
                                                        className="sau-user-avatar"
                                                    />
                                                    <div className="sau-user-details">
                                                        <strong>{user.firstName} {user.lastName}</strong>
                                                        <small>ID: {user.id}</small>
                                                        <small>Joined: {formatDate(user.joinDate)}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="sau-hospital-info-cell">
                                                    <strong>{user.hospitalName}</strong>
                                                    <small>ID: {user.hospitalId}</small>
                                                    <small>{user.department}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="sau-contact-info">
                                                    <div className="sau-contact-item">
                                                        <FaEnvelope className="sau-contact-icon" />
                                                        <span>{user.email}</span>
                                                        {user.emailVerified && 
                                                            <FaCheckCircle className="sau-verified-icon" />
                                                        }
                                                    </div>
                                                    <div className="sau-contact-item">
                                                        <FaPhone className="sau-contact-icon" />
                                                        <span>{formatPhoneNumber(user.phone)}</span>
                                                        {user.phoneVerified && 
                                                            <FaCheckCircle className="sau-verified-icon" />
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="sau-role-info">
                                                    <span className="sau-role-badge">{user.designation}</span>
                                                    <small>{user.department}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="sau-status-cell">
                                                    <span className={`sau-status-badge ${getStatusColor(user.status)}`}>
                                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                    </span>
                                                    <small>Last login: {formatDate(user.lastLogin)}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="sau-action-buttons">
                                                    <button
                                                        className="sau-action-btn sau-view-btn"
                                                        onClick={() => handleViewUser(user)}
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        className="sau-action-btn sau-edit-btn"
                                                        onClick={() => handleEditUser(user)}
                                                        title="Edit User"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="sau-action-btn sau-password-btn"
                                                        onClick={() => handleResetPassword(user)}
                                                        title="Reset Password"
                                                    >
                                                        <FaKey />
                                                    </button>
                                                    <button
                                                        className="sau-action-btn sau-delete-btn"
                                                        onClick={() => handleDeleteUser(user)}
                                                        title="Delete User"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredUsers.length === 0 && (
                                <div className="sau-no-results">
                                    <FaUsers className="sau-no-results-icon" />
                                    <h4>No administrators found</h4>
                                    <p>Try adjusting your search or filter criteria</p>
                                    <button
                                        className="sau-btn sau-btn-primary sau-no-results-btn"
                                        onClick={() => setShowAddAdminModal(true)}
                                    >
                                        <FaShieldAlt className="sau-btn-icon" />
                                        Add New Admin
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Add Admin Modal */}
                {showAddAdminModal && (
                    <div className="sau-modal-overlay">
                        <motion.div
                            className="sau-modal sau-add-admin-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sau-modal-header">
                                <h3 className="sau-modal-title">
                                    <FaShieldAlt className="sau-modal-title-icon" />
                                    Create New Administrator
                                </h3>
                                <button
                                    className="sau-modal-close"
                                    onClick={() => setShowAddAdminModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleCreateAdmin}>
                                <div className="sau-modal-body">
                                    <div className="sau-form-sections">
                                        {/* Personal Information Section */}
                                        <div className="sau-form-section">
                                            <h4 className="sau-form-section-title">
                                                <FaUserMd className="sau-form-section-icon" />
                                                Personal Information
                                            </h4>
                                            <div className="sau-form-grid">
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">First Name *</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={adminForm.firstName}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                        placeholder="Enter first name"
                                                    />
                                                </div>
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Last Name *</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={adminForm.lastName}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                        placeholder="Enter last name"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Verification Section */}
                                        <div className="sau-form-section">
                                            <h4 className="sau-form-section-title">
                                                <FaPhone className="sau-form-section-icon" />
                                                Contact Verification
                                            </h4>
                                            <div className="sau-form-grid">
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Email Address *</label>
                                                    <div className="sau-input-with-button">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={adminForm.email}
                                                            onChange={handleAdminFormChange}
                                                            className="sau-form-control"
                                                            required
                                                            placeholder="admin@hospital.com"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="sau-otp-btn"
                                                            onClick={sendEmailOtp}
                                                            disabled={emailOtpSent || otpTimer > 0}
                                                        >
                                                            {emailOtpSent ? 'Resend OTP' : 'Send OTP'}
                                                        </button>
                                                    </div>
                                                    {emailOtpSent && (
                                                        <div className="sau-otp-verification">
                                                            <input
                                                                type="text"
                                                                name="emailOtp"
                                                                value={adminForm.emailOtp}
                                                                onChange={handleAdminFormChange}
                                                                className="sau-otp-input"
                                                                placeholder="Enter 6-digit OTP"
                                                                maxLength="6"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="sau-verify-btn"
                                                                onClick={verifyEmailOtp}
                                                                disabled={adminForm.emailVerified}
                                                            >
                                                                {adminForm.emailVerified ? 'Verified ✓' : 'Verify'}
                                                            </button>
                                                            {otpTimer > 0 && (
                                                                <span className="sau-otp-timer">
                                                                    {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Phone Number *</label>
                                                    <div className="sau-input-with-button">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={adminForm.phone}
                                                            onChange={handleAdminFormChange}
                                                            className="sau-form-control"
                                                            required
                                                            placeholder="+91-9876543210"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="sau-otp-btn"
                                                            onClick={sendPhoneOtp}
                                                            disabled={phoneOtpSent || otpTimer > 0}
                                                        >
                                                            {phoneOtpSent ? 'Resend OTP' : 'Send OTP'}
                                                        </button>
                                                    </div>
                                                    {phoneOtpSent && (
                                                        <div className="sau-otp-verification">
                                                            <input
                                                                type="text"
                                                                name="phoneOtp"
                                                                value={adminForm.phoneOtp}
                                                                onChange={handleAdminFormChange}
                                                                className="sau-otp-input"
                                                                placeholder="Enter 6-digit OTP"
                                                                maxLength="6"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="sau-verify-btn"
                                                                onClick={verifyPhoneOtp}
                                                                disabled={adminForm.phoneVerified}
                                                            >
                                                                {adminForm.phoneVerified ? 'Verified ✓' : 'Verify'}
                                                            </button>
                                                            {otpTimer > 0 && (
                                                                <span className="sau-otp-timer">
                                                                    {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hospital Assignment Section */}
                                        <div className="sau-form-section">
                                            <h4 className="sau-form-section-title">
                                                <FaHospital className="sau-form-section-icon" />
                                                Hospital Assignment
                                            </h4>
                                            <div className="sau-form-grid">
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Select Hospital *</label>
                                                    <select
                                                        name="hospitalId"
                                                        value={adminForm.hospitalId}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                    >
                                                        <option value="">Choose a hospital</option>
                                                        {hospitals.map(hospital => (
                                                            <option key={hospital.id} value={hospital.id}>
                                                                {hospital.name} ({hospital.id})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Designation *</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={adminForm.designation}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                        placeholder="e.g., Hospital Administrator"
                                                    />
                                                </div>
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Department *</label>
                                                    <input
                                                        type="text"
                                                        name="department"
                                                        value={adminForm.department}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                        placeholder="e.g., Administration"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Password Section */}
                                        <div className="sau-form-section">
                                            <h4 className="sau-form-section-title">
                                                <FaKey className="sau-form-section-icon" />
                                                Set Password
                                            </h4>
                                            <div className="sau-form-grid">
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Password *</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={adminForm.password}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                        placeholder="Minimum 8 characters"
                                                        minLength="8"
                                                    />
                                                    <small className="sau-password-hint">
                                                        Must contain at least 8 characters with uppercase, lowercase, and numbers
                                                    </small>
                                                </div>
                                                <div className="sau-form-group">
                                                    <label className="sau-form-label">Confirm Password *</label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={adminForm.confirmPassword}
                                                        onChange={handleAdminFormChange}
                                                        className="sau-form-control"
                                                        required
                                                        placeholder="Re-enter password"
                                                    />
                                                    {adminForm.password && adminForm.confirmPassword && 
                                                        adminForm.password !== adminForm.confirmPassword && (
                                                            <small className="sau-error-text">Passwords do not match</small>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verification Status */}
                                        <div className="sau-verification-status">
                                            <div className={`sau-status-item ${adminForm.emailVerified ? 'sau-verified' : 'sau-pending'}`}>
                                                <FaEnvelope />
                                                <span>Email {adminForm.emailVerified ? 'Verified' : 'Pending'}</span>
                                            </div>
                                            <div className={`sau-status-item ${adminForm.phoneVerified ? 'sau-verified' : 'sau-pending'}`}>
                                                <FaPhone />
                                                <span>Phone {adminForm.phoneVerified ? 'Verified' : 'Pending'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sau-modal-footer">
                                    <button
                                        type="button"
                                        className="sau-btn sau-btn-secondary"
                                        onClick={() => setShowAddAdminModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="sau-btn sau-btn-primary"
                                        disabled={!adminForm.emailVerified || !adminForm.phoneVerified}
                                    >
                                        <FaShieldAlt className="sau-btn-icon" />
                                        Create Administrator
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* View User Modal */}
                {showViewModal && selectedUser && (
                    <div className="sau-modal-overlay">
                        <motion.div
                            className="sau-modal sau-view-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sau-modal-header">
                                <h3 className="sau-modal-title">
                                    <FaEye className="sau-modal-title-icon" />
                                    Administrator Details
                                </h3>
                                <button
                                    className="sau-modal-close"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="sau-modal-body">
                                <div className="sau-user-details-view">
                                    <div className="sau-user-header">
                                        <img 
                                            src={selectedUser.avatar} 
                                            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                            className="sau-user-avatar-large"
                                        />
                                        <div className="sau-user-title">
                                            <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
                                            <div className="sau-user-meta">
                                                <span className="sau-role-badge">{selectedUser.designation}</span>
                                                <span className={`sau-status-badge ${getStatusColor(selectedUser.status)}`}>
                                                    {selectedUser.status.toUpperCase()}
                                                </span>
                                                <span className="sau-id-badge">ID: {selectedUser.id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sau-details-grid">
                                        <div className="sau-detail-section">
                                            <h4><FaBuilding className="sau-detail-icon" />Hospital Information</h4>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Hospital:</span>
                                                <span className="sau-detail-value">{selectedUser.hospitalName}</span>
                                            </div>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Hospital ID:</span>
                                                <span className="sau-detail-value">{selectedUser.hospitalId}</span>
                                            </div>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Department:</span>
                                                <span className="sau-detail-value">{selectedUser.department}</span>
                                            </div>
                                        </div>

                                        <div className="sau-detail-section">
                                            <h4><FaPhone className="sau-detail-icon" />Contact Details</h4>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Email:</span>
                                                <span className="sau-detail-value">
                                                    {selectedUser.email}
                                                    {selectedUser.emailVerified && 
                                                        <FaCheckCircle className="sau-verified-icon" />
                                                    }
                                                </span>
                                            </div>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Phone:</span>
                                                <span className="sau-detail-value">
                                                    {formatPhoneNumber(selectedUser.phone)}
                                                    {selectedUser.phoneVerified && 
                                                        <FaCheckCircle className="sau-verified-icon" />
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div className="sau-detail-section">
                                            <h4><FaCalendar className="sau-detail-icon" />Activity Details</h4>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Join Date:</span>
                                                <span className="sau-detail-value">{formatDate(selectedUser.joinDate)}</span>
                                            </div>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Last Login:</span>
                                                <span className="sau-detail-value">{formatDate(selectedUser.lastLogin)}</span>
                                            </div>
                                            <div className="sau-detail-item">
                                                <span className="sau-detail-label">Status:</span>
                                                <span className="sau-detail-value">{selectedUser.status}</span>
                                            </div>
                                        </div>

                                        <div className="sau-detail-section">
                                            <h4><FaShieldAlt className="sau-detail-icon" />Permissions</h4>
                                            <div className="sau-permissions-list">
                                                {selectedUser.permissions.map((permission, index) => (
                                                    <span key={index} className="sau-permission-badge">
                                                        {permission}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sau-modal-footer">
                                <button
                                    type="button"
                                    className="sau-btn sau-btn-secondary"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && selectedUser && (
                    <div className="sau-modal-overlay">
                        <motion.div
                            className="sau-modal sau-delete-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sau-modal-header">
                                <h3 className="sau-modal-title">
                                    <FaTrash className="sau-modal-title-icon sau-text-danger" />
                                    Delete Administrator
                                </h3>
                                <button
                                    className="sau-modal-close"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="sau-modal-body">
                                <div className="sau-delete-warning">
                                    <FaTrash className="sau-text-danger sau-delete-icon" />
                                    <h4>Are you sure you want to delete this administrator?</h4>
                                    <p className="sau-text-muted">
                                        This will permanently remove <strong>{selectedUser.firstName} {selectedUser.lastName}</strong> 
                                        from <strong>{selectedUser.hospitalName}</strong>.
                                    </p>
                                    
                                    <div className="sau-user-info-card">
                                        <div className="sau-info-item">
                                            <span>Name:</span>
                                            <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>
                                        </div>
                                        <div className="sau-info-item">
                                            <span>Hospital:</span>
                                            <strong>{selectedUser.hospitalName}</strong>
                                        </div>
                                        <div className="sau-info-item">
                                            <span>Designation:</span>
                                            <strong>{selectedUser.designation}</strong>
                                        </div>
                                        <div className="sau-info-item">
                                            <span>Email:</span>
                                            <strong>{selectedUser.email}</strong>
                                        </div>
                                    </div>

                                    <div className="sau-warning-alert">
                                        <FaTimesCircle className="sau-warning-icon" />
                                        <span>This action cannot be undone. The user will lose all access immediately.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sau-modal-footer">
                                <button
                                    type="button"
                                    className="sau-btn sau-btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="sau-btn sau-btn-danger"
                                    onClick={confirmDeleteUser}
                                >
                                    <FaTrash className="sau-btn-icon" />
                                    Delete Administrator
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Reset Password Modal */}
                {showResetPasswordModal && selectedUser && (
                    <div className="sau-modal-overlay">
                        <motion.div
                            className="sau-modal sau-password-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="sau-modal-header">
                                <h3 className="sau-modal-title">
                                    <FaKey className="sau-modal-title-icon" />
                                    Reset Password
                                </h3>
                                <button
                                    className="sau-modal-close"
                                    onClick={() => setShowResetPasswordModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="sau-modal-body">
                                <div className="sau-reset-password-info">
                                    <FaKey className="sau-reset-icon" />
                                    <h4>Reset password for {selectedUser.firstName} {selectedUser.lastName}</h4>
                                    <p className="sau-text-muted">
                                        A password reset link will be sent to:
                                    </p>
                                    
                                    <div className="sau-reset-details">
                                        <div className="sau-reset-detail-item">
                                            <FaEnvelope />
                                            <span>{selectedUser.email}</span>
                                        </div>
                                        <div className="sau-reset-detail-item">
                                            <FaPhone />
                                            <span>{formatPhoneNumber(selectedUser.phone)}</span>
                                        </div>
                                    </div>

                                    <div className="sau-info-alert">
                                        <FaCheckCircle className="sau-info-icon" />
                                        <span>The user will receive instructions to set a new password.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sau-modal-footer">
                                <button
                                    type="button"
                                    className="sau-btn sau-btn-secondary"
                                    onClick={() => setShowResetPasswordModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="sau-btn sau-btn-primary"
                                    onClick={confirmResetPassword}
                                >
                                    <FaKey className="sau-btn-icon" />
                                    Send Reset Link
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdminUsers;