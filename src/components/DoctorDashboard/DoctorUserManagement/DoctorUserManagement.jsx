import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaUserNurse, FaUsers, 
  FaMicroscope, FaBroom, FaUserTie, FaFileInvoiceDollar,
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter,
  FaIdCard,
  FaEnvelope, FaPhone, FaCalendarAlt,
  FaGraduationCap, FaBriefcase, FaCertificate, FaMoneyBillWave,
  FaBuilding, FaUserCircle,
  FaSave, FaTimes, FaEye, FaEyeSlash, FaLock, FaUnlock,
  FaChevronDown, FaChevronUp, FaSortUp, FaSortDown,
  FaCheck, FaTimesCircle, FaChevronRight, FaHospitalUser,
  FaInfoCircle, FaKey, FaStethoscope
} from 'react-icons/fa';
import './DoctorUserManagement.css';
import { API_BASE_URL, getAuthHeaders } from '../../../redux/apiConfig';

const USERS_BASE_URL = `${API_BASE_URL}/users`;
const MASKED_PASSWORD = '********';

const DoctorUserManagement = () => {
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
  const [apiStatus, setApiStatus] = useState('idle');
  const [isSaving, setIsSaving] = useState(false);

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

  const roleAliases = {
    nurse: 'nurse',
    assistant: 'assistant',
    medical_assistant: 'assistant',
    'medical assistant': 'assistant',
    technician: 'technician',
    lab_technician: 'technician',
    'lab technician': 'technician',
    housekeeping: 'housekeeping',
    housekeeping_staff: 'housekeeping',
    'housekeeping staff': 'housekeeping',
    supervisor: 'supervisor',
    manager: 'manager',
    department_manager: 'manager',
    'department manager': 'manager',
    billing: 'billing',
    billing_staff: 'billing',
    'billing staff': 'billing',
  };

  const normalizeRole = (role) => {
    const normalized = String(role || '').trim().toLowerCase();
    return roleAliases[normalized] || normalized;
  };

  const unwrapApiArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.users)) return payload.users;
    if (Array.isArray(payload?.data?.users)) return payload.data.users;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
  };

  const unwrapApiObject = (payload) => payload?.user || payload?.data?.user || payload?.data || payload || {};

  const getStaffIdField = (role) => {
    switch (role) {
      case 'nurse': return 'nurseId';
      case 'assistant': return 'assistantId';
      case 'technician': return 'technicianId';
      case 'housekeeping': return 'staffId';
      case 'supervisor': return 'supervisorId';
      case 'manager': return 'managerId';
      case 'billing': return 'billingId';
      default: return '';
    }
  };

  const getStaffIdFromUser = (user, role) => (
    user.nurseId || user.nurse_id ||
    user.assistantId || user.assistant_id ||
    user.technicianId || user.technician_id ||
    user.staffId || user.staff_id ||
    user.supervisorId || user.supervisor_id ||
    user.managerId || user.manager_id ||
    user.billingId || user.billing_id ||
    user.employeeId || user.employee_id ||
    user.staff_code ||
    (role ? '' : user.id)
  );

  const normalizeUser = (user) => {
    const role = normalizeRole(user.role || user.user_role);
    const staffIdField = getStaffIdField(role);
    const staffId = getStaffIdFromUser(user, role);

    return {
      ...user,
      id: user.id || user._id || user.user_id || user.userId,
      fullName: user.fullName || user.full_name || user.fullname || user.name || '',
      email: user.email || '',
      phone: user.phone || user.contact_number || user.phone_number || user.mobile || '',
      emailVerified: Boolean(user.emailVerified ?? user.email_verified ?? user.is_email_verified ?? false),
      phoneVerified: Boolean(user.phoneVerified ?? user.phone_verified ?? user.is_phone_verified ?? false),
      role,
      status: String(user.status || (user.is_active === false ? 'inactive' : 'active')).toLowerCase(),
      password: MASKED_PASSWORD,
      createdAt: user.createdAt || user.created_at || user.created_date || '',
      lastLogin: user.lastLogin || user.last_login || '',
      nurseId: user.nurseId || user.nurse_id || (staffIdField === 'nurseId' ? staffId : ''),
      assistantId: user.assistantId || user.assistant_id || (staffIdField === 'assistantId' ? staffId : ''),
      technicianId: user.technicianId || user.technician_id || (staffIdField === 'technicianId' ? staffId : ''),
      staffId: user.staffId || user.staff_id || (staffIdField === 'staffId' ? staffId : ''),
      supervisorId: user.supervisorId || user.supervisor_id || (staffIdField === 'supervisorId' ? staffId : ''),
      managerId: user.managerId || user.manager_id || (staffIdField === 'managerId' ? staffId : ''),
      billingId: user.billingId || user.billing_id || (staffIdField === 'billingId' ? staffId : ''),
      licenseNumber: user.licenseNumber || user.license_number || '',
      labType: user.labType || user.lab_type || '',
      assignedArea: user.assignedArea || user.assigned_area || '',
      teamSize: user.teamSize || user.team_size || '',
      employeesUnder: user.employeesUnder || user.employees_under || '',
      budgetResponsibility: user.budgetResponsibility || user.budget_responsibility || '',
      softwareExpertise: user.softwareExpertise || user.software_expertise || '',
    };
  };

  const buildUserPayload = (data, role) => {
    const staffIdField = getStaffIdField(role);
    const payload = {
      ...data,
      role,
      full_name: data.fullName,
      fullname: data.fullName,
      name: data.fullName,
      contact_number: data.phone,
      phone_number: data.phone,
      email_verified: data.emailVerified,
      phone_verified: data.phoneVerified,
      employee_id: staffIdField ? data[staffIdField] : undefined,
      license_number: data.licenseNumber,
      lab_type: data.labType,
      assigned_area: data.assignedArea,
      team_size: data.teamSize,
      employees_under: data.employeesUnder,
      budget_responsibility: data.budgetResponsibility,
      software_expertise: data.softwareExpertise,
    };

    if (!payload.password || payload.password === MASKED_PASSWORD) {
      delete payload.password;
    }

    delete payload.confirmPassword;
    return payload;
  };

  const syncCountersFromUsers = (userList) => {
    const nextCounters = {
      nurse: 1,
      assistant: 1,
      technician: 1,
      housekeeping: 1,
      supervisor: 1,
      manager: 1,
      billing: 1
    };

    userList.forEach((user) => {
      const roleInfo = allRoles.find((role) => role.value === user.role);
      const staffId = getStaffIdFromUser(user, user.role);
      if (!roleInfo || !staffId) return;

      const number = Number(String(staffId).replace(roleInfo.idPrefix, '').replace(/\D/g, ''));
      if (!Number.isNaN(number)) {
        nextCounters[user.role] = Math.max(nextCounters[user.role], number + 1);
      }
    });

    setIdCounters(nextCounters);
  };

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

  const loadUsers = async () => {
    try {
      setApiStatus('loading');
      const response = await axios.get(USERS_BASE_URL, { headers: getAuthHeaders() });
      const staffUsers = unwrapApiArray(response.data)
        .map(normalizeUser)
        .filter((user) => allRoles.some((role) => role.value === user.role));

      setUsers(staffUsers);
      syncCountersFromUsers(staffUsers);
      setApiStatus('succeeded');
    } catch (error) {
      setApiStatus('failed');
      showNotification(error.response?.data?.message || error.response?.data?.error || 'Failed to load users', 'error');
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (!Object.prototype.hasOwnProperty.call(initialData, field.name)) {
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

  const isValidPhoneNumber = (phone) => /^\d{10}$/.test(String(phone || '').trim());

  const handleSendPhoneVerification = () => {
    if (!formData.phone) {
      showNotification('Please enter phone number first', 'error');
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      showNotification('Please enter a valid 10-digit phone number', 'error');
      setShowPhoneVerification(false);
      setPhoneVerificationCode('');
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
    if (!isValidPhoneNumber(formData.phone)) {
      showNotification('Please enter a valid 10-digit phone number', 'error');
      setFormData(prev => ({ ...prev, phoneVerified: false }));
      return;
    }

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
    const isPasswordChanged = formData.password && formData.password !== MASKED_PASSWORD;

    if (!isEditing || isPasswordChanged) {
      if (formData.password !== formData.confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return false;
      }

      if (!formData.password || formData.password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return false;
      }
    }

    if (isEditing && formData.confirmPassword && formData.confirmPassword !== MASKED_PASSWORD && formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return false;
    }

    // Phone number validation (basic)
    if (!isValidPhoneNumber(formData.phone)) {
      showNotification('Please enter a valid 10-digit phone number', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const payload = buildUserPayload(formData, selectedRole);

    try {
      setIsSaving(true);

      if (isEditing) {
        const response = await axios.patch(`${USERS_BASE_URL}/${editingUserId}`, payload, {
          headers: getAuthHeaders(),
        });
        const updatedUser = normalizeUser({ ...formData, ...unwrapApiObject(response.data), id: editingUserId, role: selectedRole });

        setUsers(prev => prev.map(user => 
          user.id === editingUserId 
            ? { ...user, ...updatedUser, password: MASKED_PASSWORD }
            : user
        ));
        showNotification('User updated successfully!');
      } else {
        const response = await axios.post(`${USERS_BASE_URL}/register`, payload, {
          headers: getAuthHeaders(),
        });
        const createdUser = normalizeUser({
          ...formData,
          ...unwrapApiObject(response.data),
          role: selectedRole,
          status: unwrapApiObject(response.data).status || 'active',
        });

        setUsers(prev => {
          const nextUsers = [...prev, createdUser];
          syncCountersFromUsers(nextUsers);
          return nextUsers;
        });
        showNotification(`${allRoles.find(r => r.value === selectedRole)?.label} created successfully!`);
      }

      handleCancel();
    } catch (error) {
      showNotification(error.response?.data?.message || error.response?.data?.error || 'Failed to save user', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedRole(user.role);
    setFormData({
      ...user,
      password: MASKED_PASSWORD,
      confirmPassword: MASKED_PASSWORD
    });
    setIsEditing(true);
    setEditingUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const previousUsers = users;
      setUsers(prev => prev.filter(user => user.id !== userId));

      try {
        await axios.delete(`${USERS_BASE_URL}/${userId}`, { headers: getAuthHeaders() });
        showNotification('User deleted successfully!');
      } catch (error) {
        setUsers(previousUsers);
        showNotification(error.response?.data?.message || error.response?.data?.error || 'Failed to delete user', 'error');
      }
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
    <div className="doctor-user-management-container">
      {/* Doctor Theme Watermark */}
      <div className="doctor-theme-watermark">
        <FaStethoscope />
      </div>
      
      {notification.show && (
        <div className={`doctor-notification ${notification.type}`}>
          {notification.type === 'success' && <FaCheck />}
          {notification.type === 'error' && <FaTimesCircle />}
          {notification.type === 'info' && <FaInfoCircle />}
          {notification.message}
        </div>
      )}

      <div className="doctor-management-header doctor-medical-border">
        <div className="doctor-header-title">
          <h1><FaHospitalUser className="doctor-stethoscope-icon" /> Staff Management System</h1>
          <p className="doctor-subtitle">Manage all staff accounts and permissions</p>
        </div>
        <div className="doctor-header-actions">
          <button 
            className="doctor-add-user-btn"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            <FaPlus /> Add New Staff
          </button>
        </div>
      </div>

      {apiStatus === 'loading' && !showForm && (
        <div className="doctor-empty-state">
          <FaUsers size={42} />
          <h3>Loading staff members...</h3>
        </div>
      )}

      {apiStatus === 'loading' && !showForm ? null : showForm ? (
        <div className="doctor-user-form-container">
          <div className="doctor-form-header">
            <h2>{isEditing ? 'Edit User' : 'Create New Staff Member'}</h2>
            <button className="doctor-close-form-btn" onClick={handleCancel}>
              <FaTimes />
            </button>
          </div>

          {!selectedRole ? (
            <div className="doctor-role-selection">
              <h3>Select Staff Role</h3>
              <p className="doctor-role-selection-subtitle">Choose the role for the new staff account</p>
              
              <div className="doctor-auto-id-notice">
                <FaInfoCircle /> Note: All IDs are auto-generated and cannot be modified
              </div>
              
              <div className="doctor-role-grid">
                {allRoles.map(role => (
                  <div 
                    key={role.value}
                    className="doctor-role-card-select"
                    onClick={() => handleRoleSelect(role.value)}
                    style={{ borderLeftColor: role.color }}
                  >
                    <div className="doctor-role-icon" style={{ color: role.color }}>
                      {role.icon}
                    </div>
                    <div className="doctor-role-info">
                      <h4>{role.label}</h4>
                      <p className="doctor-role-id-info">ID Format: {role.idPrefix}XXX</p>
                      <p className="doctor-role-stats">{stats[role.value] || 0} users</p>
                    </div>
                    <FaChevronRight className="doctor-role-arrow" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="doctor-user-form">
              <div className="doctor-form-role-header">
                <div className="doctor-selected-role-display">
                  {getRoleInfo(selectedRole).icon}
                  <span>{getRoleInfo(selectedRole).label}</span>
                  <span className="doctor-form-mode">{isEditing ? 'Edit Mode' : 'Create Mode'}</span>
                </div>
                {getAutoGeneratedIdFields().map(field => (
                  <div key={field.name} className="doctor-auto-id-display">
                    <FaKey /> {field.label}: <strong>{formData[field.name]}</strong>
                    <span className="doctor-auto-id-note">(Auto-generated)</span>
                  </div>
                ))}
              </div>

              <div className="doctor-form-sections">
                <div className="doctor-form-section">
                  <h3 className="doctor-section-title">Basic Information</h3>
                  <div className="doctor-form-grid">
                    <div className="doctor-form-group">
                      <label>
                        <FaUserCircle className="doctor-field-icon" />
                        Full Name
                        <span className="doctor-required">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="doctor-form-group">
                      <label>
                        <FaEnvelope className="doctor-field-icon" />
                        Email
                        <span className="doctor-required">*</span>
                      </label>
                      <div className="doctor-verification-field">
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          required
                          disabled={formData.emailVerified}
                        />
                        <div className="doctor-verification-controls">
                          {formData.emailVerified ? (
                            <span className="doctor-verified-badge">
                              <FaCheck /> Verified
                            </span>
                          ) : (
                            <button 
                              type="button"
                              className="doctor-verify-btn"
                              onClick={handleSendEmailVerification}
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>
                      {showEmailVerification && !formData.emailVerified && (
                        <div className="doctor-verification-code-input">
                          <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={emailVerificationCode}
                            onChange={(e) => setEmailVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <button 
                            type="button"
                            className="doctor-verify-code-btn"
                            onClick={handleVerifyEmail}
                          >
                            <FaCheck /> Verify Code
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="doctor-form-group">
                      <label>
                        <FaPhone className="doctor-field-icon" />
                        Phone Number
                        <span className="doctor-required">*</span>
                      </label>
                      <div className="doctor-verification-field">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          required
                          disabled={formData.phoneVerified}
                        />
                        <div className="doctor-verification-controls">
                          {formData.phoneVerified ? (
                            <span className="doctor-verified-badge">
                              <FaCheck /> Verified
                            </span>
                          ) : (
                            <button 
                              type="button"
                              className="doctor-verify-btn"
                              onClick={handleSendPhoneVerification}
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>
                      {showPhoneVerification && !formData.phoneVerified && (
                        <div className="doctor-verification-code-input">
                          <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={phoneVerificationCode}
                            onChange={(e) => setPhoneVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <button 
                            type="button"
                            className="doctor-verify-code-btn"
                            onClick={handleVerifyPhone}
                          >
                            <FaCheck /> Verify Code
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="doctor-form-group">
                      <label>
                        <FaLock className="doctor-field-icon" />
                        Password
                        <span className="doctor-required">*</span>
                      </label>
                      <div className="doctor-password-input-group">
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
                          className="doctor-password-toggle"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <small className="doctor-password-hint">Minimum 6 characters</small>
                    </div>

                    <div className="doctor-form-group">
                      <label>
                        <FaLock className="doctor-field-icon" />
                        Confirm Password
                        <span className="doctor-required">*</span>
                      </label>
                      <div className="doctor-password-input-group">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword || ''}
                          onChange={handleInputChange}
                          required
                        />
                        <button 
                          type="button"
                          className="doctor-password-toggle"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <small className="doctor-password-error">Passwords do not match!</small>
                      )}
                    </div>
                  </div>
                </div>

                {Object.entries(getFormTemplate(selectedRole)).filter(([sectionName]) => sectionName !== 'basic').map(([sectionName, fields]) => (
                  <div key={sectionName} className="doctor-form-section">
                    <h3 className="doctor-section-title">
                      {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Information
                    </h3>
                    <div className="doctor-form-grid">
                      {fields.map(field => (
                        <div key={field.name} className="doctor-form-group">
                          <label>
                            {field.icon && <span className="doctor-field-icon">{field.icon}</span>}
                            {field.label}
                            {field.required && <span className="doctor-required">*</span>}
                            {field.readOnly && field.description && (
                              <span className="doctor-field-description">({field.description})</span>
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
                              className={field.readOnly ? 'doctor-read-only-field' : ''}
                            />
                          ) : field.type === 'select' ? (
                            <select
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              required={field.required}
                              disabled={field.readOnly}
                              className={field.readOnly ? 'doctor-read-only-field' : ''}
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
                              className={field.readOnly ? 'doctor-read-only-field' : ''}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="doctor-verification-status">
                <h4>Verification Status</h4>
                <div className="doctor-verification-badges">
                  <span className={`doctor-verification-badge ${formData.emailVerified ? 'verified' : 'pending'}`}>
                    {formData.emailVerified ? <FaCheck /> : <FaTimesCircle />}
                    Email {formData.emailVerified ? 'Verified' : 'Pending'}
                  </span>
                  <span className={`doctor-verification-badge ${formData.phoneVerified ? 'verified' : 'pending'}`}>
                    {formData.phoneVerified ? <FaCheck /> : <FaTimesCircle />}
                    Phone {formData.phoneVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="doctor-form-actions">
                <button type="submit" className="doctor-submit-btn" disabled={isSaving}>
                  <FaSave /> {isSaving ? 'Saving...' : isEditing ? 'Update Staff' : 'Create Staff'}
                </button>
                <button type="button" className="doctor-cancel-btn" onClick={handleCancel} disabled={isSaving}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <>
          <div className="doctor-dashboard-stats">
            <div className="doctor-stat-card total">
              <div className="doctor-stat-icon">
                <FaUsers />
              </div>
              <div className="doctor-stat-info">
                <h3>Total Staff</h3>
                <p>{stats.total}</p>
              </div>
            </div>
            {allRoles.map(role => (
              stats[role.value] > 0 && (
                <div key={role.value} className="doctor-stat-card" style={{ borderColor: role.color }}>
                  <div className="doctor-stat-icon" style={{ color: role.color }}>
                    {role.icon}
                  </div>
                  <div className="doctor-stat-info">
                    <h3>{role.label}</h3>
                    <p>{stats[role.value]}</p>
                    <small className="doctor-id-prefix">ID: {role.idPrefix}XXX</small>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="doctor-controls-container">
            <div className="doctor-search-container">
              <FaSearch className="doctor-search-icon" />
              <input
                type="text"
                placeholder="Search staff by name, email, phone, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="doctor-search-input"
              />
            </div>
            
            <div className="doctor-filters-container">
              <div className="doctor-filter-group">
                <FaFilter className="doctor-filter-icon" />
                <select 
                  value={filterRole} 
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="doctor-filter-select"
                >
                  <option value="all">All Roles</option>
                  {allRoles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="doctor-sort-controls">
                <span>Sort by:</span>
                <select 
                  value={sortConfig.key}
                  onChange={(e) => handleSort(e.target.value)}
                  className="doctor-sort-select"
                >
                  <option value="fullName">Name</option>
                  <option value="role">Role</option>
                  <option value="status">Status</option>
                  <option value="createdAt">Created Date</option>
                  <option value="experience">Experience</option>
                </select>
                <button 
                  className="doctor-sort-direction"
                  onClick={() => handleSort(sortConfig.key)}
                >
                  {sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />}
                </button>
              </div>
            </div>
          </div>

          <div className="doctor-users-table-container">
            <table className="doctor-users-table">
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
                      <td className="doctor-user-id">
                        <div className="doctor-id-display">
                          <FaIdCard className="doctor-id-icon" />
                          <span className="doctor-id-value">
                            {user.nurseId || user.technicianId || user.billingId || 
                             user.assistantId || user.staffId || user.supervisorId || 
                             user.managerId || `#${user.id}`}
                          </span>
                          <span className="doctor-auto-generated-tag">Auto ID</span>
                        </div>
                      </td>
                      <td className="doctor-user-info">
                        <div className="doctor-user-avatar" style={{ background: getRoleInfo(user.role).color }}>
                          {getRoleInfo(user.role).icon}
                        </div>
                        <div className="doctor-user-details">
                          <h4>{user.fullName}</h4>
                          <p className="doctor-user-email">{user.email}</p>
                        </div>
                      </td>
                      <td>
                        <div className="doctor-contact-info">
                          <p><FaPhone /> {user.phone}</p>
                          <div className="doctor-verification-status-small">
                            <span className={`doctor-verification-indicator ${user.emailVerified ? 'verified' : 'pending'}`}>
                              <FaEnvelope size={12} /> {user.emailVerified ? '✓' : '✗'}
                            </span>
                            <span className={`doctor-verification-indicator ${user.phoneVerified ? 'verified' : 'pending'}`}>
                              <FaPhone size={12} /> {user.phoneVerified ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="doctor-role-badge" style={{ 
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
                          <div className="doctor-professional-info">
                            <span className="doctor-shift">
                              <FaCalendarAlt /> {user.shift} Shift
                            </span>
                            {user.ward && <span><FaBuilding /> {user.ward}</span>}
                          </div>
                        )}
                        {user.role === 'technician' && (
                          <div className="doctor-professional-info">
                            <span className="doctor-lab-type">
                              <FaMicroscope /> {user.labType}
                            </span>
                          </div>
                        )}
                        {user.role === 'billing' && (
                          <div className="doctor-professional-info">
                            <span className="doctor-user-department">
                              <FaFileInvoiceDollar /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'assistant' && (
                          <div className="doctor-professional-info">
                            <span className="doctor-user-department">
                              <FaUsers /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'supervisor' && (
                          <div className="doctor-professional-info">
                            <span className="doctor-user-department">
                              <FaUserTie /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'manager' && (
                          <div className="doctor-professional-info">
                            <span className="doctor-user-department">
                              <FaUserTie /> {user.department}
                            </span>
                          </div>
                        )}
                        {user.role === 'housekeeping' && (
                          <div className="doctor-professional-info">
                            <span className="doctor-assigned-area">
                              <FaBuilding /> {user.assignedArea}
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`doctor-status-badge ${user.status}`}>
                          {user.status === 'active' ? <FaUnlock /> : <FaLock />}
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="doctor-action-buttons">
                          <button 
                            className="doctor-edit-btn"
                            onClick={() => handleEdit(user)}
                            title="Edit User"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="doctor-view-btn"
                            onClick={() => toggleDetails(user.id)}
                            title={showDetails[user.id] ? "Hide Details" : "View Details"}
                          >
                            {showDetails[user.id] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                          <button 
                            className="doctor-delete-btn"
                            onClick={() => handleDelete(user.id)}
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showDetails[user.id] && (
                      <tr className="doctor-details-row">
                        <td colSpan="7">
                          <div className="doctor-user-details-expanded">
                            <h4>Detailed Information</h4>
                            <div className="doctor-details-grid">
                              <div className="doctor-detail-item">
                                <FaIdCard /> <strong>Staff ID:</strong> 
                                <span className="doctor-id-display-detail">
                                  {user.nurseId || user.technicianId || user.billingId || 
                                   user.assistantId || user.staffId || user.supervisorId || 
                                   user.managerId}
                                </span>
                                <span className="doctor-id-type">(Auto-generated)</span>
                              </div>
                              <div className="doctor-detail-item">
                                <FaEnvelope /> <strong>Email Verification:</strong> 
                                <span className={`doctor-verification-detail ${user.emailVerified ? 'verified' : 'pending'}`}>
                                  {user.emailVerified ? 'Verified' : 'Pending'}
                                </span>
                              </div>
                              <div className="doctor-detail-item">
                                <FaPhone /> <strong>Phone Verification:</strong> 
                                <span className={`doctor-verification-detail ${user.phoneVerified ? 'verified' : 'pending'}`}>
                                  {user.phoneVerified ? 'Verified' : 'Pending'}
                                </span>
                              </div>
                              {user.experience && (
                                <div className="doctor-detail-item">
                                  <FaBriefcase /> <strong>Experience:</strong> {user.experience} years
                                </div>
                              )}
                              <div className="doctor-detail-item">
                                <FaCalendarAlt /> <strong>Joined:</strong> {user.createdAt}
                              </div>
                              <div className="doctor-detail-item">
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
              <div className="doctor-empty-state">
                <FaSearch size={48} />
                <h3>No staff members found</h3>
                <p>{searchTerm ? "Try a different search term" : "Add your first staff member to get started"}</p>
                {!searchTerm && (
                  <button className="doctor-add-first-btn" onClick={() => setShowForm(true)}>
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

export default DoctorUserManagement;
