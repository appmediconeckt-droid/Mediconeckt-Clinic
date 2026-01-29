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
    FaChartBar
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
            case 'active': return 'status-badge-active';
            case 'pending': return 'status-badge-pending';
            case 'inactive': return 'status-badge-inactive';
            default: return 'status-badge-inactive';
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
        <div className="superadmin-users-container">
            <div className="superadmin-main-content">
                {/* Header */}
                <div className="superadmin-users-header">
                    <div className="header-left">
                        <h1 className="superadmin-title">
                            <FaUsers className="me-2" />
                            User Management
                        </h1>
                        <p className="superadmin-subtitle">
                            Manage Hospital Administrators and User Permissions
                        </p>
                    </div>
                    <div className="header-right">
                        <button
                            className="superadmin-btn superadmin-btn-primary"
                            onClick={() => setShowAddAdminModal(true)}
                        >
                            <FaShieldAlt className="me-2" />
                            Add New Admin
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="superadmin-stats-grid">
                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="stat-icon">
                            <FaBuilding />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{hospitals.length}</h3>
                            <p className="stat-label">Total Hospitals</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="stat-icon">
                            <FaUserMd />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">
                                {hospitals.reduce((sum, h) => sum + h.totalDoctors, 0)}
                            </h3>
                            <p className="stat-label">Total Doctors</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="stat-icon">
                            <FaUsers />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">
                                {hospitals.reduce((sum, h) => sum + h.totalStaff, 0)}
                            </h3>
                            <p className="stat-label">Total Staff</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <div className="stat-icon">
                            <FaUserInjured />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">
                                {hospitals.reduce((sum, h) => sum + h.totalPatients, 0).toLocaleString()}
                            </h3>
                            <p className="stat-label">Total Patients</p>
                        </div>
                    </motion.div>
                </div>

                {/* Hospitals Statistics Section */}
                <div className="hospitals-stats-section">
                    <h3 className="section-title">
                        <FaHospital className="me-2" />
                        Hospitals Statistics
                    </h3>
                    <div className="hospitals-grid">
                        {hospitals.map((hospital, index) => (
                            <motion.div
                                key={hospital.id}
                                className="hospital-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="hospital-card-header">
                                    <div className="hospital-avatar">
                                        <FaBuilding />
                                    </div>
                                    <div className="hospital-info">
                                        <h4>{hospital.name}</h4>
                                        <span className="hospital-id">{hospital.id}</span>
                                    </div>
                                </div>
                                
                                <div className="hospital-stats">
                                    <div className="stat-row">
                                        <span className="stat-label">
                                            <FaUserMd /> Doctors:
                                        </span>
                                        <span className="stat-value">{hospital.totalDoctors}</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">
                                            <FaUserNurse /> Staff:
                                        </span>
                                        <span className="stat-value">{hospital.totalStaff}</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">
                                            <FaUserInjured /> Patients:
                                        </span>
                                        <span className="stat-value">{hospital.totalPatients.toLocaleString()}</span>
                                    </div>
                                    <div className="stat-row">
                                        <span className="stat-label">
                                            <FaShieldAlt /> Admins:
                                        </span>
                                        <span className="stat-value">{hospital.activeAdmins}</span>
                                    </div>
                                </div>
                                
                                <div className="hospital-departments">
                                    <small>Departments: {hospital.departments.join(', ')}</small>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="search-filter-bar">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or hospital..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                            >
                                <FaTimesCircle />
                            </button>
                        )}
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Admins
                        </button>
                        <button
                            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            Pending
                        </button>
                        <select
                            className="hospital-filter"
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
                <div className="users-table-container">
                     {loading ? (
                    <div className="superadmin-hospitals-loading">
                        <div className="loading-container">
                            <div className="gold-spinner">
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                            </div>
                            <div className="loading-text">
                                <h3>Loading...</h3>
                               
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="table-wrapper">
                            <table className="superadmin-table">
                                <thead>
                                    <tr>
                                        <th className="user-col">Administrator</th>
                                        <th className="hospital-col">Hospital</th>
                                        <th className="contact-col">Contact</th>
                                        <th className="role-col">Designation</th>
                                        <th className="status-col">Status</th>
                                        <th className="actions-col">Actions</th>
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
                                                <div className="user-info">
                                                    <img 
                                                        src={user.avatar} 
                                                        alt={`${user.firstName} ${user.lastName}`}
                                                        className="user-avatar"
                                                    />
                                                    <div className="user-details">
                                                        <strong>{user.firstName} {user.lastName}</strong>
                                                        <small>ID: {user.id}</small>
                                                        <small>Joined: {formatDate(user.joinDate)}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="hospital-info">
                                                    <strong>{user.hospitalName}</strong>
                                                    <small>ID: {user.hospitalId}</small>
                                                    <small>{user.department}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-info">
                                                    <div className="contact-item">
                                                        <FaEnvelope />
                                                        <span>{user.email}</span>
                                                        {user.emailVerified && 
                                                            <FaCheckCircle className="verified-icon" />
                                                        }
                                                    </div>
                                                    <div className="contact-item">
                                                        <FaPhone />
                                                        <span>{formatPhoneNumber(user.phone)}</span>
                                                        {user.phoneVerified && 
                                                            <FaCheckCircle className="verified-icon" />
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="role-info">
                                                    <span className="role-badge">{user.designation}</span>
                                                    <small>{user.department}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="status-cell">
                                                    <span className={`status-badge ${getStatusColor(user.status)}`}>
                                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                    </span>
                                                    <small>Last login: {formatDate(user.lastLogin)}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="action-btn view-btn"
                                                        onClick={() => handleViewUser(user)}
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        className="action-btn edit-btn"
                                                        onClick={() => handleEditUser(user)}
                                                        title="Edit User"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="action-btn password-btn"
                                                        onClick={() => handleResetPassword(user)}
                                                        title="Reset Password"
                                                    >
                                                        <FaKey />
                                                    </button>
                                                    <button
                                                        className="action-btn delete-btn"
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
                                <div className="no-results">
                                    <FaUsers className="mb-3" size={48} />
                                    <h4>No administrators found</h4>
                                    <p>Try adjusting your search or filter criteria</p>
                                    <button
                                        className="superadmin-btn superadmin-btn-primary mt-3"
                                        onClick={() => setShowAddAdminModal(true)}
                                    >
                                        <FaShieldAlt className="me-2" />
                                        Add New Admin
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Add Admin Modal */}
                {showAddAdminModal && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal add-admin-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaShieldAlt className="me-2" />
                                    Create New Administrator
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowAddAdminModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleCreateAdmin}>
                                <div className="modal-body">
                                    <div className="form-sections">
                                        {/* Personal Information Section */}
                                        <div className="form-section">
                                            <h4 className="section-title">
                                                <FaUserMd className="me-2" />
                                                Personal Information
                                            </h4>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">First Name *</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={adminForm.firstName}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="Enter first name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Last Name *</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={adminForm.lastName}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="Enter last name"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Verification Section */}
                                        <div className="form-section">
                                            <h4 className="section-title">
                                                <FaPhone className="me-2" />
                                                Contact Verification
                                            </h4>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">Email Address *</label>
                                                    <div className="input-with-button">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={adminForm.email}
                                                            onChange={handleAdminFormChange}
                                                            className="form-control"
                                                            required
                                                            placeholder="admin@hospital.com"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="otp-btn"
                                                            onClick={sendEmailOtp}
                                                            disabled={emailOtpSent || otpTimer > 0}
                                                        >
                                                            {emailOtpSent ? 'Resend OTP' : 'Send OTP'}
                                                        </button>
                                                    </div>
                                                    {emailOtpSent && (
                                                        <div className="otp-verification">
                                                            <input
                                                                type="text"
                                                                name="emailOtp"
                                                                value={adminForm.emailOtp}
                                                                onChange={handleAdminFormChange}
                                                                className="otp-input"
                                                                placeholder="Enter 6-digit OTP"
                                                                maxLength="6"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="verify-btn"
                                                                onClick={verifyEmailOtp}
                                                                disabled={adminForm.emailVerified}
                                                            >
                                                                {adminForm.emailVerified ? 'Verified ✓' : 'Verify'}
                                                            </button>
                                                            {otpTimer > 0 && (
                                                                <span className="otp-timer">
                                                                    {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Phone Number *</label>
                                                    <div className="input-with-button">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={adminForm.phone}
                                                            onChange={handleAdminFormChange}
                                                            className="form-control"
                                                            required
                                                            placeholder="+91-9876543210"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="otp-btn"
                                                            onClick={sendPhoneOtp}
                                                            disabled={phoneOtpSent || otpTimer > 0}
                                                        >
                                                            {phoneOtpSent ? 'Resend OTP' : 'Send OTP'}
                                                        </button>
                                                    </div>
                                                    {phoneOtpSent && (
                                                        <div className="otp-verification">
                                                            <input
                                                                type="text"
                                                                name="phoneOtp"
                                                                value={adminForm.phoneOtp}
                                                                onChange={handleAdminFormChange}
                                                                className="otp-input"
                                                                placeholder="Enter 6-digit OTP"
                                                                maxLength="6"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="verify-btn"
                                                                onClick={verifyPhoneOtp}
                                                                disabled={adminForm.phoneVerified}
                                                            >
                                                                {adminForm.phoneVerified ? 'Verified ✓' : 'Verify'}
                                                            </button>
                                                            {otpTimer > 0 && (
                                                                <span className="otp-timer">
                                                                    {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hospital Assignment Section */}
                                        <div className="form-section">
                                            <h4 className="section-title">
                                                <FaHospital className="me-2" />
                                                Hospital Assignment
                                            </h4>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">Select Hospital *</label>
                                                    <select
                                                        name="hospitalId"
                                                        value={adminForm.hospitalId}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
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
                                                <div className="form-group">
                                                    <label className="form-label">Designation *</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={adminForm.designation}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="e.g., Hospital Administrator"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Department *</label>
                                                    <input
                                                        type="text"
                                                        name="department"
                                                        value={adminForm.department}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="e.g., Administration"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Password Section */}
                                        <div className="form-section">
                                            <h4 className="section-title">
                                                <FaKey className="me-2" />
                                                Set Password
                                            </h4>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">Password *</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={adminForm.password}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="Minimum 8 characters"
                                                        minLength="8"
                                                    />
                                                    <small className="password-hint">
                                                        Must contain at least 8 characters with uppercase, lowercase, and numbers
                                                    </small>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Confirm Password *</label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={adminForm.confirmPassword}
                                                        onChange={handleAdminFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="Re-enter password"
                                                    />
                                                    {adminForm.password && adminForm.confirmPassword && 
                                                        adminForm.password !== adminForm.confirmPassword && (
                                                            <small className="error-text">Passwords do not match</small>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verification Status */}
                                        <div className="verification-status">
                                            <div className={`status-item ${adminForm.emailVerified ? 'verified' : 'pending'}`}>
                                                <FaEnvelope />
                                                <span>Email {adminForm.emailVerified ? 'Verified' : 'Pending'}</span>
                                            </div>
                                            <div className={`status-item ${adminForm.phoneVerified ? 'verified' : 'pending'}`}>
                                                <FaPhone />
                                                <span>Phone {adminForm.phoneVerified ? 'Verified' : 'Pending'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="superadmin-btn superadmin-btn-secondary"
                                        onClick={() => setShowAddAdminModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="superadmin-btn superadmin-btn-primary"
                                        disabled={!adminForm.emailVerified || !adminForm.phoneVerified}
                                    >
                                        <FaShieldAlt className="me-2" />
                                        Create Administrator
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* View User Modal */}
                {showViewModal && selectedUser && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal view-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaEye className="me-2" />
                                    Administrator Details
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="user-details-view">
                                    <div className="user-header">
                                        <img 
                                            src={selectedUser.avatar} 
                                            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                            className="user-avatar-large"
                                        />
                                        <div className="user-title">
                                            <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
                                            <div className="user-meta">
                                                <span className="role-badge">{selectedUser.designation}</span>
                                                <span className={`status-badge ${getStatusColor(selectedUser.status)}`}>
                                                    {selectedUser.status.toUpperCase()}
                                                </span>
                                                <span className="id-badge">ID: {selectedUser.id}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="details-grid">
                                        <div className="detail-section">
                                            <h4><FaBuilding className="me-2" />Hospital Information</h4>
                                            <div className="detail-item">
                                                <span className="detail-label">Hospital:</span>
                                                <span className="detail-value">{selectedUser.hospitalName}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Hospital ID:</span>
                                                <span className="detail-value">{selectedUser.hospitalId}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Department:</span>
                                                <span className="detail-value">{selectedUser.department}</span>
                                            </div>
                                        </div>

                                        <div className="detail-section">
                                            <h4><FaPhoneAlt className="me-2" />Contact Details</h4>
                                            <div className="detail-item">
                                                <span className="detail-label">Email:</span>
                                                <span className="detail-value">
                                                    {selectedUser.email}
                                                    {selectedUser.emailVerified && 
                                                        <FaCheckCircle className="verified-icon" />
                                                    }
                                                </span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Phone:</span>
                                                <span className="detail-value">
                                                    {formatPhoneNumber(selectedUser.phone)}
                                                    {selectedUser.phoneVerified && 
                                                        <FaCheckCircle className="verified-icon" />
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div className="detail-section">
                                            <h4><FaCalendar className="me-2" />Activity Details</h4>
                                            <div className="detail-item">
                                                <span className="detail-label">Join Date:</span>
                                                <span className="detail-value">{formatDate(selectedUser.joinDate)}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Last Login:</span>
                                                <span className="detail-value">{formatDate(selectedUser.lastLogin)}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Status:</span>
                                                <span className="detail-value">{selectedUser.status}</span>
                                            </div>
                                        </div>

                                        <div className="detail-section">
                                            <h4><FaShieldAlt className="me-2" />Permissions</h4>
                                            <div className="permissions-list">
                                                {selectedUser.permissions.map((permission, index) => (
                                                    <span key={index} className="permission-badge">
                                                        {permission}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-secondary"
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
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal delete-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaTrash className="me-2 text-danger" />
                                    Delete Administrator
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="delete-warning">
                                    <FaTrash className="text-danger mb-3" size={48} />
                                    <h4>Are you sure you want to delete this administrator?</h4>
                                    <p className="text-muted">
                                        This will permanently remove <strong>{selectedUser.firstName} {selectedUser.lastName}</strong> 
                                        from <strong>{selectedUser.hospitalName}</strong>.
                                    </p>
                                    
                                    <div className="user-info-card">
                                        <div className="info-item">
                                            <span>Name:</span>
                                            <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Hospital:</span>
                                            <strong>{selectedUser.hospitalName}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Designation:</span>
                                            <strong>{selectedUser.designation}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Email:</span>
                                            <strong>{selectedUser.email}</strong>
                                        </div>
                                    </div>

                                    <div className="warning-alert">
                                        <FaTimesCircle className="me-2" />
                                        <span>This action cannot be undone. The user will lose all access immediately.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-danger"
                                    onClick={confirmDeleteUser}
                                >
                                    <FaTrash className="me-2" />
                                    Delete Administrator
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Reset Password Modal */}
                {showResetPasswordModal && selectedUser && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal password-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaKey className="me-2" />
                                    Reset Password
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowResetPasswordModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="reset-password-info">
                                    <FaKey className="text-warning mb-3" size={48} />
                                    <h4>Reset password for {selectedUser.firstName} {selectedUser.lastName}</h4>
                                    <p className="text-muted">
                                        A password reset link will be sent to:
                                    </p>
                                    
                                    <div className="reset-details">
                                        <div className="detail-item">
                                            <FaEnvelope />
                                            <span>{selectedUser.email}</span>
                                        </div>
                                        <div className="detail-item">
                                            <FaPhone />
                                            <span>{formatPhoneNumber(selectedUser.phone)}</span>
                                        </div>
                                    </div>

                                    <div className="info-alert">
                                        <FaCheckCircle className="me-2" />
                                        <span>The user will receive instructions to set a new password.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-secondary"
                                    onClick={() => setShowResetPasswordModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-primary"
                                    onClick={confirmResetPassword}
                                >
                                    <FaKey className="me-2" />
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

// Add missing FaSearch component
const FaSearch = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
);

export default SuperAdminUsers;