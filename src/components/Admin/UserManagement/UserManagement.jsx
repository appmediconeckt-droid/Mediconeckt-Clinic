import React, { useState, useEffect } from 'react';
import { 
  FaUserNurse, FaUsers, 
  FaMicroscope, FaBroom, FaUserTie, FaFileInvoiceDollar,
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter,
  FaUserAlt, FaIdCard, FaCalendarCheck,
  FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt,
  FaGraduationCap, FaBriefcase, FaCertificate, FaMoneyBillWave,
  FaBuilding, FaUsersCog, FaStar, FaUserCircle,
  FaSave, FaTimes, FaEye, FaEyeSlash, FaLock, FaUnlock,
  FaChevronDown, FaChevronUp, FaSort, FaSortUp, FaSortDown,
  FaCheck, FaTimesCircle, FaChevronRight, FaHospitalUser,
  FaInfoCircle, FaKey
} from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    emailVerified: false,
    phoneVerified: false,
    password: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [showDetails, setShowDetails] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // ID generation counters for each role
  const [idCounters, setIdCounters] = useState({
    nurse: 1,
    assistant: 1,
    technician: 1,
    housekeeping: 1,
    supervisor: 1,
    manager: 1,
    billing: 1
  });

  const allRoles = [
    { value: "nurse", label: "Nurse", icon: <FaUserNurse />, color: "#8e44ad", idPrefix: "NUR" },
    { value: "assistant", label: "Medical Assistant", icon: <FaUsers />, color: "#f39c12", idPrefix: "MA" },
    { value: "technician", label: "Lab Technician", icon: <FaMicroscope />, color: "#d35400", idPrefix: "LT" },
    { value: "housekeeping", label: "Housekeeping Staff", icon: <FaBroom />, color: "#34495e", idPrefix: "HS" },
    { value: "supervisor", label: "Supervisor", icon: <FaUserTie />, color: "#c0392b", idPrefix: "SUP" },
    { value: "manager", label: "Department Manager", icon: <FaUserTie />, color: "#8e44ad", idPrefix: "MGR" },
    { value: "billing", label: "Billing Staff", icon: <FaFileInvoiceDollar />, color: "#27ae60", idPrefix: "BILL" },
  ];

  const roleFormTemplates = {
    nurse: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "nurseId", 
          label: "Nurse ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "licenseNumber", label: "Nursing License", type: "text", required: true, icon: <FaCertificate /> },
        { name: "shift", label: "Shift", type: "select", options: ["Morning", "Evening", "Night"], required: true, icon: <FaCalendarAlt /> },
        { name: "ward", label: "Assigned Ward", type: "text", icon: <FaBuilding /> },
        { name: "experience", label: "Years of Experience", type: "number", icon: <FaBriefcase /> },
        { name: "qualifications", label: "Qualifications", type: "textarea", icon: <FaGraduationCap /> },
      ]
    },
    assistant: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "assistantId", 
          label: "Assistant ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "department", label: "Department", type: "text", required: true, icon: <FaBuilding /> },
        { name: "shift", label: "Shift", type: "select", options: ["Morning", "Evening", "Night"], required: true, icon: <FaCalendarAlt /> },
        { name: "supervisor", label: "Supervisor", type: "text", icon: <FaUserTie /> },
        { name: "experience", label: "Years of Experience", type: "number", icon: <FaBriefcase /> },
      ]
    },
    technician: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "technicianId", 
          label: "Technician ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "labType", label: "Lab Type", type: "text", required: true, icon: <FaMicroscope /> },
        { name: "certifications", label: "Certifications", type: "textarea", required: true, icon: <FaCertificate /> },
        { name: "shift", label: "Shift", type: "select", options: ["Morning", "Evening", "Night"], required: true, icon: <FaCalendarAlt /> },
        { name: "experience", label: "Years of Experience", type: "number", icon: <FaBriefcase /> },
      ]
    },
    housekeeping: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "staffId", 
          label: "Staff ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "assignedArea", label: "Assigned Area", type: "text", required: true, icon: <FaBuilding /> },
        { name: "shift", label: "Shift", type: "select", options: ["Morning", "Evening", "Night"], required: true, icon: <FaCalendarAlt /> },
        { name: "supervisor", label: "Supervisor", type: "text", icon: <FaUserTie /> },
      ]
    },
    supervisor: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "supervisorId", 
          label: "Supervisor ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "department", label: "Department", type: "text", required: true, icon: <FaBuilding /> },
        { name: "teamSize", label: "Team Size", type: "number", icon: <FaUsers /> },
        { name: "experience", label: "Years of Experience", type: "number", icon: <FaBriefcase /> },
        { name: "responsibilities", label: "Responsibilities", type: "textarea", icon: <FaUserTie /> },
      ]
    },
    manager: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "managerId", 
          label: "Manager ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "department", label: "Department", type: "text", required: true, icon: <FaBuilding /> },
        { name: "employeesUnder", label: "Employees Under", type: "number", icon: <FaUsers /> },
        { name: "experience", label: "Years of Experience", type: "number", icon: <FaBriefcase /> },
        { name: "budgetResponsibility", label: "Budget Responsibility", type: "textarea", icon: <FaMoneyBillWave /> },
      ]
    },
    billing: {
      basic: [
        { name: "fullName", label: "Full Name", type: "text", required: true, icon: <FaUserCircle /> },
        { name: "email", label: "Email", type: "email", required: true, icon: <FaEnvelope /> },
        { name: "phone", label: "Phone Number", type: "tel", required: true, icon: <FaPhone /> },
        { name: "password", label: "Password", type: "password", required: true, icon: <FaLock /> },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: <FaLock /> },
      ],
      professional: [
        { 
          name: "billingId", 
          label: "Billing ID", 
          type: "text", 
          required: true, 
          icon: <FaIdCard />,
          readOnly: true,
          description: "Auto-generated ID"
        },
        { name: "department", label: "Department", type: "text", required: true, icon: <FaFileInvoiceDollar /> },
        { name: "shift", label: "Shift", type: "select", options: ["Morning", "Evening"], required: true, icon: <FaCalendarAlt /> },
        { name: "softwareExpertise", label: "Software Expertise", type: "textarea", icon: <FaFileInvoiceDollar /> },
      ]
    }
  };

  // Generate ID for a role
  const generateIdForRole = (role) => {
    const roleInfo = allRoles.find(r => r.value === role);
    if (!roleInfo) return '';
    
    const currentCounter = idCounters[role];
    const paddedCounter = currentCounter.toString().padStart(3, '0');
    const newId = `${roleInfo.idPrefix}${paddedCounter}`;
    
    // Increment counter for next use
    setIdCounters(prev => ({
      ...prev,
      [role]: currentCounter + 1
    }));
    
    return newId;
  };

  useEffect(() => {
    const mockUsers = [
      { 
        id: 2, 
        fullName: 'Jane Wilson', 
        email: 'jane.wilson@hospital.com', 
        phone: '9876543211',
        emailVerified: true,
        phoneVerified: true,
        role: 'nurse', 
        status: 'active',
        nurseId: 'NUR001',
        licenseNumber: 'NUR123456',
        shift: 'Morning',
        ward: 'ICU',
        experience: 8,
        password: '********',
        createdAt: '2023-02-20',
        lastLogin: '2024-01-19'
      },
      { 
        id: 6, 
        fullName: 'Emma Davis', 
        email: 'emma.davis@hospital.com', 
        phone: '9876543216',
        emailVerified: true,
        phoneVerified: false,
        role: 'nurse', 
        status: 'inactive',
        nurseId: 'NUR002',
        licenseNumber: 'NUR123457',
        shift: 'Night',
        ward: 'Emergency',
        experience: 5,
        password: '********',
        createdAt: '2023-05-20',
        lastLogin: '2024-01-15'
      },
      { 
        id: 9, 
        fullName: 'Robert Chen', 
        email: 'robert.chen@lab.com', 
        phone: '9876543220',
        emailVerified: true,
        phoneVerified: true,
        role: 'technician', 
        status: 'active',
        technicianId: 'LT001',
        labType: 'Pathology',
        certifications: 'Certified Lab Technician',
        shift: 'Morning',
        experience: 7,
        password: '********',
        createdAt: '2023-03-15',
        lastLogin: '2024-01-18'
      },
      { 
        id: 10, 
        fullName: 'Lisa Garcia', 
        email: 'lisa.garcia@billing.com', 
        phone: '9876543221',
        emailVerified: false,
        phoneVerified: true,
        role: 'billing', 
        status: 'active',
        billingId: 'BILL001',
        department: 'Finance',
        shift: 'Morning',
        softwareExpertise: 'MediSoft, QuickBooks',
        password: '********',
        createdAt: '2023-04-10',
        lastLogin: '2024-01-17'
      }
    ];
    setUsers(mockUsers);
    
    // Initialize counters based on existing users
    const counters = {
      nurse: 3, // We already have NUR001 and NUR002
      assistant: 1,
      technician: 2, // We have LT001
      housekeeping: 1,
      supervisor: 1,
      manager: 1,
      billing: 2 // We have BILL001
    };
    setIdCounters(counters);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleRoleSelect = (roleValue) => {
    setSelectedRole(roleValue);
    const template = roleFormTemplates[roleValue] || {};
    const initialData = {
      email: '',
      phone: '',
      emailVerified: false,
      phoneVerified: false,
      password: '',
      confirmPassword: ''
    };
    
    Object.values(template).forEach(section => {
      section.forEach(field => {
        if (!initialData.hasOwnProperty(field.name)) {
          // Generate ID for fields that should have auto-generated IDs
          if (field.readOnly && field.description === "Auto-generated ID") {
            initialData[field.name] = generateIdForRole(roleValue);
          } else {
            initialData[field.name] = '';
          }
        }
      });
    });
    
    setFormData(initialData);
    setShowForm(true);
    setIsEditing(false);
    setEditingUserId(null);
    setShowEmailVerification(false);
    setShowPhoneVerification(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    // Prevent editing of auto-generated ID fields
    const fieldConfig = Object.values(roleFormTemplates[selectedRole] || {})
      .flat()
      .find(field => field.name === name);
    
    if (fieldConfig?.readOnly && fieldConfig?.description === "Auto-generated ID") {
      return; // Do not allow editing of auto-generated IDs
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || '' : value
    }));

    // If email or phone is changed, reset verification status
    if (name === 'email') {
      setFormData(prev => ({ ...prev, emailVerified: false }));
    }
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phoneVerified: false }));
    }
  };

  const handleSendEmailVerification = () => {
    if (!formData.email) {
      showNotification('Please enter email first', 'error');
      return;
    }
    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);
    showNotification(`Email verification code sent to ${formData.email}\nCode: ${code} (for demo purposes)`, 'info');
    setShowEmailVerification(true);
  };

  const handleSendPhoneVerification = () => {
    if (!formData.phone) {
      showNotification('Please enter phone number first', 'error');
      return;
    }
    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);
    showNotification(`SMS verification code sent to ${formData.phone}\nCode: ${code} (for demo purposes)`, 'info');
    setShowPhoneVerification(true);
  };

  const handleVerifyEmail = () => {
    if (emailVerificationCode === '123456') { // Demo code
      setFormData(prev => ({ ...prev, emailVerified: true }));
      setShowEmailVerification(false);
      setEmailVerificationCode('');
      showNotification('Email verified successfully!');
    } else {
      showNotification('Invalid verification code. Please try again.', 'error');
    }
  };

  const handleVerifyPhone = () => {
    if (phoneVerificationCode === '123456') { // Demo code
      setFormData(prev => ({ ...prev, phoneVerified: true }));
      setShowPhoneVerification(false);
      setPhoneVerificationCode('');
      showNotification('Phone number verified successfully!');
    } else {
      showNotification('Invalid verification code. Please try again.', 'error');
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return false;
    }
    
    if (formData.password.length < 6) {
      showNotification('Password must be at least 6 characters long', 'error');
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return false;
    }

    // Phone number validation (basic)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      showNotification('Please enter a valid 10-digit phone number', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Remove confirmPassword from data to be saved
    const { confirmPassword, ...userData } = formData;
    
    if (isEditing) {
      setUsers(prev => prev.map(user => 
        user.id === editingUserId 
          ? { ...user, ...userData }
          : user
      ));
      showNotification('User updated successfully!');
    } else {
      const newUser = {
        id: users.length + 1,
        ...userData,
        role: selectedRole,
        status: 'active',
        password: '********',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0]
      };
      
      setUsers(prev => [...prev, newUser]);
      showNotification(`${allRoles.find(r => r.value === selectedRole)?.label} created successfully!`);
    }
    
    handleCancel();
  };

  const handleEdit = (user) => {
    setSelectedRole(user.role);
    setFormData({
      ...user,
      confirmPassword: user.password
    });
    setIsEditing(true);
    setEditingUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      showNotification('User deleted successfully!');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedRole('');
    setFormData({
      email: '',
      phone: '',
      emailVerified: false,
      phoneVerified: false,
      password: '',
      confirmPassword: ''
    });
    setIsEditing(false);
    setEditingUserId(null);
    setShowEmailVerification(false);
    setShowPhoneVerification(false);
    setEmailVerificationCode('');
    setPhoneVerificationCode('');
  };

  const toggleDetails = (userId) => {
    setShowDetails(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      user.nurseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.technicianId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.billingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.assistantId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.staffId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.supervisorId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.managerId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const getRoleInfo = (roleValue) => {
    return allRoles.find(r => r.value === roleValue) || {};
  };

  const getFormTemplate = (roleValue) => {
    return roleFormTemplates[roleValue] || {};
  };

  const getUserStats = () => {
    const stats = { total: users.length };
    allRoles.forEach(role => {
      stats[role.value] = users.filter(u => u.role === role.value).length;
    });
    return stats;
  };

  const stats = getUserStats();

  const getAutoGeneratedIdFields = () => {
    if (!selectedRole) return [];
    const template = roleFormTemplates[selectedRole];
    const allFields = [...(template.basic || []), ...(template.professional || [])];
    return allFields.filter(field => field.readOnly && field.description === "Auto-generated ID");
  };

  return (
    <div className="user-management-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' && <FaCheck />}
          {notification.type === 'error' && <FaTimesCircle />}
          {notification.type === 'info' && <FaInfoCircle />}
          {notification.message}
        </div>
      )}

      <div className="user-management-header">
        <div className="header-title">
          <h1><FaHospitalUser /> Staff Management System</h1>
          <p className="subtitle">Manage all staff accounts and permissions</p>
        </div>
        <div className="header-actions">
          <button 
            className="add-user-btn"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            <FaPlus /> Add New Staff
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="user-form-container">
          <div className="form-header">
            <h2>{isEditing ? 'Edit User' : 'Create New Staff Member'}</h2>
            <button className="close-form-btn" onClick={handleCancel}>
              <FaTimes />
            </button>
          </div>

          {!selectedRole ? (
            <div className="role-selection">
              <h3>Select Staff Role</h3>
              <p className="role-selection-subtitle">Choose the role for the new staff account</p>
              
              <div className="auto-id-notice">
                <FaInfoCircle /> Note: All IDs are auto-generated and cannot be modified
              </div>
              
              <div className="role-grid">
                {allRoles.map(role => (
                  <div 
                    key={role.value}
                    className="role-card-select"
                    onClick={() => handleRoleSelect(role.value)}
                    style={{ borderLeftColor: role.color }}
                  >
                    <div className="role-icon" style={{ color: role.color }}>
                      {role.icon}
                    </div>
                    <div className="role-info">
                      <h4>{role.label}</h4>
                      <p className="role-id-info">ID Format: {role.idPrefix}XXX</p>
                      <p className="role-stats">{stats[role.value] || 0} users</p>
                    </div>
                    <FaChevronRight className="role-arrow" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-role-header">
                <div className="selected-role-display">
                  {getRoleInfo(selectedRole).icon}
                  <span>{getRoleInfo(selectedRole).label}</span>
                  <span className="form-mode">{isEditing ? 'Edit Mode' : 'Create Mode'}</span>
                </div>
                {getAutoGeneratedIdFields().map(field => (
                  <div key={field.name} className="auto-id-display">
                    <FaKey /> {field.label}: <strong>{formData[field.name]}</strong>
                    <span className="auto-id-note">(Auto-generated)</span>
                  </div>
                ))}
              </div>

              <div className="form-sections">
                <div className="form-section">
                  <h3 className="section-title">Basic Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <FaUserCircle className="field-icon" />
                        Full Name
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <FaEnvelope className="field-icon" />
                        Email
                        <span className="required">*</span>
                      </label>
                      <div className="verification-field">
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          required
                          disabled={formData.emailVerified}
                        />
                        <div className="verification-controls">
                          {formData.emailVerified ? (
                            <span className="verified-badge">
                              <FaCheck /> Verified
                            </span>
                          ) : (
                            <button 
                              type="button"
                              className="verify-btn"
                              onClick={handleSendEmailVerification}
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>
                      {showEmailVerification && !formData.emailVerified && (
                        <div className="verification-code-input">
                          <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={emailVerificationCode}
                            onChange={(e) => setEmailVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <button 
                            type="button"
                            className="verify-code-btn"
                            onClick={handleVerifyEmail}
                          >
                            <FaCheck /> Verify Code
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaPhone className="field-icon" />
                        Phone Number
                        <span className="required">*</span>
                      </label>
                      <div className="verification-field">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          required
                          disabled={formData.phoneVerified}
                        />
                        <div className="verification-controls">
                          {formData.phoneVerified ? (
                            <span className="verified-badge">
                              <FaCheck /> Verified
                            </span>
                          ) : (
                            <button 
                              type="button"
                              className="verify-btn"
                              onClick={handleSendPhoneVerification}
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>
                      {showPhoneVerification && !formData.phoneVerified && (
                        <div className="verification-code-input">
                          <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={phoneVerificationCode}
                            onChange={(e) => setPhoneVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <button 
                            type="button"
                            className="verify-code-btn"
                            onClick={handleVerifyPhone}
                          >
                            <FaCheck /> Verify Code
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaLock className="field-icon" />
                        Password
                        <span className="required">*</span>
                      </label>
                      <div className="password-input-group">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          value={formData.password || ''}
                          onChange={handleInputChange}
                          required
                          minLength={6}
                        />
                        <button 
                          type="button"
                          className="password-toggle"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <small className="password-hint">Minimum 6 characters</small>
                    </div>

                    <div className="form-group">
                      <label>
                        <FaLock className="field-icon" />
                        Confirm Password
                        <span className="required">*</span>
                      </label>
                      <div className="password-input-group">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword || ''}
                          onChange={handleInputChange}
                          required
                        />
                        <button 
                          type="button"
                          className="password-toggle"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <small className="password-error">Passwords do not match!</small>
                      )}
                    </div>
                  </div>
                </div>

                {Object.entries(getFormTemplate(selectedRole)).filter(([sectionName]) => sectionName !== 'basic').map(([sectionName, fields]) => (
                  <div key={sectionName} className="form-section">
                    <h3 className="section-title">
                      {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Information
                    </h3>
                    <div className="form-grid">
                      {fields.map(field => (
                        <div key={field.name} className="form-group">
                          <label>
                            {field.icon && <span className="field-icon">{field.icon}</span>}
                            {field.label}
                            {field.required && <span className="required">*</span>}
                            {field.readOnly && field.description && (
                              <span className="field-description">({field.description})</span>
                            )}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              placeholder={field.placeholder || ''}
                              required={field.required}
                              readOnly={field.readOnly}
                              className={field.readOnly ? 'read-only-field' : ''}
                            />
                          ) : field.type === 'select' ? (
                            <select
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              required={field.required}
                              disabled={field.readOnly}
                              className={field.readOnly ? 'read-only-field' : ''}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options?.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              placeholder={field.placeholder || ''}
                              required={field.required}
                              readOnly={field.readOnly}
                              min={field.type === 'number' ? 0 : undefined}
                              className={field.readOnly ? 'read-only-field' : ''}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="verification-status">
                <h4>Verification Status</h4>
                <div className="verification-badges">
                  <span className={`verification-badge ${formData.emailVerified ? 'verified' : 'pending'}`}>
                    {formData.emailVerified ? <FaCheck /> : <FaTimesCircle />}
                    Email {formData.emailVerified ? 'Verified' : 'Pending'}
                  </span>
                  <span className={`verification-badge ${formData.phoneVerified ? 'verified' : 'pending'}`}>
                    {formData.phoneVerified ? <FaCheck /> : <FaTimesCircle />}
                    Phone {formData.phoneVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <FaSave /> {isEditing ? 'Update Staff' : 'Create Staff'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="stat-card total">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-info">
                <h3>Total Staff</h3>
                <p>{stats.total}</p>
              </div>
            </div>
            {allRoles.map(role => (
              stats[role.value] > 0 && (
                <div key={role.value} className="stat-card" style={{ borderColor: role.color }}>
                  <div className="stat-icon" style={{ color: role.color }}>
                    {role.icon}
                  </div>
                  <div className="stat-info">
                    <h3>{role.label}</h3>
                    <p>{stats[role.value]}</p>
                    <small className="id-prefix">ID: {role.idPrefix}XXX</small>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="controls-container">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search staff by name, email, phone, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filters-container">
              <div className="filter-group">
                <FaFilter className="filter-icon" />
                <select 
                  value={filterRole} 
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Roles</option>
                  {allRoles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="sort-controls">
                <span>Sort by:</span>
                <select 
                  value={sortConfig.key}
                  onChange={(e) => handleSort(e.target.value)}
                  className="sort-select"
                >
                  <option value="fullName">Name</option>
                  <option value="role">Role</option>
                  <option value="status">Status</option>
                  <option value="createdAt">Created Date</option>
                  <option value="experience">Experience</option>
                </select>
                <button 
                  className="sort-direction"
                  onClick={() => handleSort(sortConfig.key)}
                >
                  {sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />}
                </button>
              </div>
            </div>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>
                    Staff ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                  </th>
                  <th onClick={() => handleSort('fullName')}>
                    Staff Member {sortConfig.key === 'fullName' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                  </th>
                  <th>Contact & Verification</th>
                  <th onClick={() => handleSort('role')}>
                    Role {sortConfig.key === 'role' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                  </th>
                  <th>Professional Info</th>
                  <th onClick={() => handleSort('status')}>
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map(user => (
                  <React.Fragment key={user.id}>
                    <tr>
                      <td className="user-id">
                        <div className="id-display">
                          <FaIdCard className="id-icon" />
                          <span className="id-value">
                            {user.nurseId || user.technicianId || user.billingId || 
                             user.assistantId || user.staffId || user.supervisorId || 
                             user.managerId || `#${user.id}`}
                          </span>
                          <span className="auto-generated-tag">Auto ID</span>
                        </div>
                      </td>
                      <td className="user-info">
                        <div className="user-avatar" style={{ background: getRoleInfo(user.role).color }}>
                          {getRoleInfo(user.role).icon}
                        </div>
                        <div className="user-details">
                          <h4>{user.fullName}</h4>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <p><FaPhone /> {user.phone}</p>
                          <div className="verification-status-small">
                            <span className={`verification-indicator ${user.emailVerified ? 'verified' : 'pending'}`}>
                              <FaEnvelope size={12} /> {user.emailVerified ? '✓' : '✗'}
                            </span>
                            <span className={`verification-indicator ${user.phoneVerified ? 'verified' : 'pending'}`}>
                              <FaPhone size={12} /> {user.phoneVerified ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="role-badge" style={{ 
                          backgroundColor: getRoleInfo(user.role).color + '20',
                          color: getRoleInfo(user.role).color,
                          borderColor: getRoleInfo(user.role).color
                        }}>
                          {getRoleInfo(user.role).icon}
                          {getRoleInfo(user.role).label}
                        </span>
                      </td>
                      <td>
                        {user.role === 'nurse' && (
                          <div className="professional-info">
                            <span className="shift">
                              <FaCalendarAlt /> {user.shift} Shift
                            </span>
                            {user.ward && <span><FaBuilding /> {user.ward}</span>}
                          </div>
                        )}
                        {user.role === 'technician' && (
                          <div className="professional-info">
                            <span className="lab-type">
                              <FaMicroscope /> {user.labType}
                            </span>
                          </div>
                        )}
                        {user.role === 'billing' && (
                          <div className="professional-info">
                            <span className="user-department">
                              <FaFileInvoiceDollar /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'assistant' && (
                          <div className="professional-info">
                            <span className="user-department">
                              <FaUsers /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'supervisor' && (
                          <div className="professional-info">
                            <span className="user-department">
                              <FaUserTie /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'manager' && (
                          <div className="professional-info">
                            <span className="user-department">
                              <FaUserTie /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'housekeeping' && (
                          <div className="professional-info">
                            <span className="assigned-area">
                              <FaBuilding /> {user.assignedArea}
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === 'active' ? <FaUnlock /> : <FaLock />}
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEdit(user)}
                            title="Edit User"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="view-btn"
                            onClick={() => toggleDetails(user.id)}
                            title={showDetails[user.id] ? "Hide Details" : "View Details"}
                          >
                            {showDetails[user.id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(user.id)}
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showDetails[user.id] && (
                      <tr className="details-row">
                        <td colSpan="7">
                          <div className="user-details-expanded">
                            <h4>Detailed Information</h4>
                            <div className="details-grid">
                              <div className="detail-item">
                                <FaIdCard /> <strong>Staff ID:</strong> 
                                <span className="id-display-detail">
                                  {user.nurseId || user.technicianId || user.billingId || 
                                   user.assistantId || user.staffId || user.supervisorId || 
                                   user.managerId}
                                </span>
                                <span className="id-type">(Auto-generated)</span>
                              </div>
                              <div className="detail-item">
                                <FaEnvelope /> <strong>Email Verification:</strong> 
                                <span className={`verification-detail ${user.emailVerified ? 'verified' : 'pending'}`}>
                                  {user.emailVerified ? 'Verified' : 'Pending'}
                                </span>
                              </div>
                              <div className="detail-item">
                                <FaPhone /> <strong>Phone Verification:</strong> 
                                <span className={`verification-detail ${user.phoneVerified ? 'verified' : 'pending'}`}>
                                  {user.phoneVerified ? 'Verified' : 'Pending'}
                                </span>
                              </div>
                              {user.experience && (
                                <div className="detail-item">
                                  <FaBriefcase /> <strong>Experience:</strong> {user.experience} years
                                </div>
                              )}
                              <div className="detail-item">
                                <FaCalendarAlt /> <strong>Joined:</strong> {user.createdAt}
                              </div>
                              <div className="detail-item">
                                <FaLock /> <strong>Last Login:</strong> {user.lastLogin}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            
            {sortedUsers.length === 0 && (
              <div className="empty-state">
                <FaSearch size={48} />
                <h3>No staff members found</h3>
                <p>{searchTerm ? "Try a different search term" : "Add your first staff member to get started"}</p>
                {!searchTerm && (
                  <button className="add-first-btn" onClick={() => setShowForm(true)}>
                    <FaPlus /> Add First Staff
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;