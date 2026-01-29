import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaShieldAlt,
    FaUserShield,
    FaUsers,
    FaHospital,
    FaUserMd,
    FaUserNurse,
    FaUserInjured,
    FaUserTie,
    FaFileInvoiceDollar,
    FaCog,
    FaCrown,
    FaCheck,
    FaTimes,
    FaEdit,
    FaTrash,
    FaCopy,
    FaPlus,
    FaSearch,
    FaFilter,
    FaLock,
    FaUnlock,
    FaEye,
    FaEyeSlash
} from 'react-icons/fa';
import './SuperAdminRoles.css';

const SuperAdminRoles = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Role Form States
    const [roleForm, setRoleForm] = useState({
        name: '',
        description: '',
        type: 'custom',
        level: 'hospital',
        isDefault: false,
        permissions: []
    });

    // Available permissions categories
    const permissionCategories = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: <FaCog />,
            permissions: [
                { id: 'dashboard.view', name: 'View Dashboard', description: 'Access to main dashboard' },
                { id: 'dashboard.analytics', name: 'View Analytics', description: 'Access to analytics reports' }
            ]
        },
        {
            id: 'hospitals',
            name: 'Hospitals',
            icon: <FaHospital />,
            permissions: [
                { id: 'hospitals.view', name: 'View Hospitals', description: 'View hospital list and details' },
                { id: 'hospitals.create', name: 'Create Hospitals', description: 'Add new hospitals' },
                { id: 'hospitals.edit', name: 'Edit Hospitals', description: 'Modify hospital information' },
                { id: 'hospitals.delete', name: 'Delete Hospitals', description: 'Remove hospitals from system' },
                { id: 'hospitals.manage', name: 'Manage Hospitals', description: 'Full hospital management' }
            ]
        },
        {
            id: 'users',
            name: 'Users',
            icon: <FaUsers />,
            permissions: [
                { id: 'users.view', name: 'View Users', description: 'View user list and details' },
                { id: 'users.create', name: 'Create Users', description: 'Add new users' },
                { id: 'users.edit', name: 'Edit Users', description: 'Modify user information' },
                { id: 'users.delete', name: 'Delete Users', description: 'Remove users from system' },
                { id: 'users.manage', name: 'Manage Users', description: 'Full user management' },
                { id: 'users.roles', name: 'Assign Roles', description: 'Assign roles to users' }
            ]
        },
        {
            id: 'doctors',
            name: 'Doctors',
            icon: <FaUserMd />,
            permissions: [
                { id: 'doctors.view', name: 'View Doctors', description: 'View doctor list and profiles' },
                { id: 'doctors.create', name: 'Create Doctors', description: 'Add new doctors' },
                { id: 'doctors.edit', name: 'Edit Doctors', description: 'Modify doctor information' },
                { id: 'doctors.delete', name: 'Delete Doctors', description: 'Remove doctors from system' },
                { id: 'doctors.schedule', name: 'Manage Schedules', description: 'Manage doctor schedules' },
                { id: 'doctors.appointments', name: 'View Appointments', description: 'View doctor appointments' }
            ]
        },
        {
            id: 'patients',
            name: 'Patients',
            icon: <FaUserInjured />,
            permissions: [
                { id: 'patients.view', name: 'View Patients', description: 'View patient list and records' },
                { id: 'patients.create', name: 'Create Patients', description: 'Add new patients' },
                { id: 'patients.edit', name: 'Edit Patients', description: 'Modify patient information' },
                { id: 'patients.delete', name: 'Delete Patients', description: 'Remove patients from system' },
                { id: 'patients.records', name: 'Medical Records', description: 'Access patient medical records' },
                { id: 'patients.billing', name: 'Patient Billing', description: 'Manage patient billing' }
            ]
        },
        {
            id: 'staff',
            name: 'Staff',
            icon: <FaUserNurse />,
            permissions: [
                { id: 'staff.view', name: 'View Staff', description: 'View staff list and details' },
                { id: 'staff.create', name: 'Create Staff', description: 'Add new staff members' },
                { id: 'staff.edit', name: 'Edit Staff', description: 'Modify staff information' },
                { id: 'staff.delete', name: 'Delete Staff', description: 'Remove staff from system' },
                { id: 'staff.schedule', name: 'Staff Schedule', description: 'Manage staff schedules' },
                { id: 'staff.performance', name: 'Performance', description: 'View staff performance' }
            ]
        },
        {
            id: 'administrators',
            name: 'Administrators',
            icon: <FaUserTie />,
            permissions: [
                { id: 'admins.view', name: 'View Admins', description: 'View administrator list' },
                { id: 'admins.create', name: 'Create Admins', description: 'Add new administrators' },
                { id: 'admins.edit', name: 'Edit Admins', description: 'Modify admin information' },
                { id: 'admins.delete', name: 'Delete Admins', description: 'Remove administrators' },
                { id: 'admins.roles', name: 'Manage Admin Roles', description: 'Assign roles to administrators' }
            ]
        },
        {
            id: 'billing',
            name: 'Billing & Finance',
            icon: <FaFileInvoiceDollar />,
            permissions: [
                { id: 'billing.view', name: 'View Billing', description: 'View billing and invoices' },
                { id: 'billing.create', name: 'Create Invoices', description: 'Generate new invoices' },
                { id: 'billing.edit', name: 'Edit Invoices', description: 'Modify existing invoices' },
                { id: 'billing.delete', name: 'Delete Invoices', description: 'Remove invoices' },
                { id: 'billing.reports', name: 'Financial Reports', description: 'Access financial reports' },
                { id: 'billing.settings', name: 'Billing Settings', description: 'Configure billing settings' }
            ]
        },
        {
            id: 'settings',
            name: 'System Settings',
            icon: <FaCog />,
            permissions: [
                { id: 'settings.general', name: 'General Settings', description: 'Modify general system settings' },
                { id: 'settings.security', name: 'Security Settings', description: 'Configure security settings' },
                { id: 'settings.notifications', name: 'Notification Settings', description: 'Configure notifications' },
                { id: 'settings.backup', name: 'Backup & Restore', description: 'Manage system backups' },
                { id: 'settings.audit', name: 'Audit Logs', description: 'View system audit logs' },
                { id: 'settings.api', name: 'API Settings', description: 'Configure API settings' }
            ]
        },
        {
            id: 'roles',
            name: 'Role Management',
            icon: <FaShieldAlt />,
            permissions: [
                { id: 'roles.view', name: 'View Roles', description: 'View all system roles' },
                { id: 'roles.create', name: 'Create Roles', description: 'Create new roles' },
                { id: 'roles.edit', name: 'Edit Roles', description: 'Modify existing roles' },
                { id: 'roles.delete', name: 'Delete Roles', description: 'Remove roles from system' },
                { id: 'roles.assign', name: 'Assign Roles', description: 'Assign roles to users' }
            ]
        }
    ];

    // Default system roles
    const defaultRoles = [
        {
            id: 'superadmin',
            name: 'Super Administrator',
            description: 'Full system access with all permissions',
            type: 'system',
            level: 'system',
            isDefault: true,
            isActive: true,
            permissions: permissionCategories.flatMap(category =>
                category.permissions.map(p => p.id)
            ),
            userCount: 1,
            createdAt: '2023-01-01',
            createdBy: 'System',
            cannotDelete: true,
            cannotEdit: true,
            icon: <FaCrown className="role-icon-superadmin" />
        },
        {
            id: 'hospital_admin',
            name: 'Hospital Administrator',
            description: 'Full access to hospital management and operations',
            type: 'system',
            level: 'hospital',
            isDefault: true,
            isActive: true,
            permissions: [
                'dashboard.view',
                'dashboard.analytics',
                'hospitals.view',
                'hospitals.edit',
                'users.view',
                'users.create',
                'users.edit',
                'doctors.view',
                'doctors.create',
                'doctors.edit',
                'patients.view',
                'patients.create',
                'patients.edit',
                'staff.view',
                'staff.create',
                'staff.edit',
                'billing.view',
                'billing.create',
                'billing.edit',
                'settings.general'
            ],
            userCount: 5,
            createdAt: '2023-01-15',
            createdBy: 'Super Admin',
            cannotDelete: true,
            cannotEdit: false,
            icon: <FaUserShield className="role-icon-admin" />
        },
        {
            id: 'doctor',
            name: 'Doctor',
            description: 'Medical practitioner with patient management access',
            type: 'system',
            level: 'hospital',
            isDefault: true,
            isActive: true,
            permissions: [
                'dashboard.view',
                'patients.view',
                'patients.create',
                'patients.edit',
                'patients.records',
                'doctors.view',
                'doctors.edit',
                'doctors.schedule',
                'doctors.appointments'
            ],
            userCount: 45,
            createdAt: '2023-02-01',
            createdBy: 'System',
            cannotDelete: false,
            cannotEdit: false,
            icon: <FaUserMd className="role-icon-doctor" />
        },
        {
            id: 'nurse',
            name: 'Nurse',
            description: 'Nursing staff with patient care access',
            type: 'system',
            level: 'hospital',
            isDefault: true,
            isActive: true,
            permissions: [
                'dashboard.view',
                'patients.view',
                'patients.edit',
                'patients.records',
                'staff.view',
                'staff.edit'
            ],
            userCount: 120,
            createdAt: '2023-02-10',
            createdBy: 'System',
            cannotDelete: false,
            cannotEdit: false,
            icon: <FaUserNurse className="role-icon-nurse" />
        },
        {
            id: 'patient',
            name: 'Patient',
            description: 'Patient access to personal records and appointments',
            type: 'system',
            level: 'user',
            isDefault: true,
            isActive: true,
            permissions: [
                'dashboard.view',
                'patients.view',
                'patients.edit',
                'doctors.appointments'
            ],
            userCount: 1250,
            createdAt: '2023-03-01',
            createdBy: 'System',
            cannotDelete: false,
            cannotEdit: false,
            icon: <FaUserInjured className="role-icon-patient" />
        }
    ];

    // Custom roles
    const customRoles = [
        {
            id: 'billing_manager',
            name: 'Billing Manager',
            description: 'Manages all billing and financial operations',
            type: 'custom',
            level: 'hospital',
            isDefault: false,
            isActive: true,
            permissions: [
                'dashboard.view',
                'billing.view',
                'billing.create',
                'billing.edit',
                'billing.delete',
                'billing.reports',
                'billing.settings',
                'patients.view',
                'patients.billing'
            ],
            userCount: 8,
            createdAt: '2024-01-15',
            createdBy: 'Hospital Admin',
            cannotDelete: false,
            cannotEdit: false,
            icon: <FaFileInvoiceDollar className="role-icon-billing" />
        },
        {
            id: 'hr_manager',
            name: 'HR Manager',
            description: 'Manages staff and human resources',
            type: 'custom',
            level: 'hospital',
            isDefault: false,
            isActive: true,
            permissions: [
                'dashboard.view',
                'staff.view',
                'staff.create',
                'staff.edit',
                'staff.delete',
                'staff.schedule',
                'staff.performance',
                'users.view',
                'users.create',
                'users.edit'
            ],
            userCount: 3,
            createdAt: '2024-02-01',
            createdBy: 'Hospital Admin',
            cannotDelete: false,
            cannotEdit: false,
            icon: <FaUserTie className="role-icon-hr" />
        }
    ];

    useEffect(() => {
        // Simulate API calls
        setTimeout(() => {
            setRoles([...defaultRoles, ...customRoles]);
            setPermissions(permissionCategories);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter roles based on search and filter
    const filteredRoles = roles.filter(role => {
        const matchesSearch =
            role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.type.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' ||
            role.type === filter ||
            role.level === filter ||
            (filter === 'active' && role.isActive) ||
            (filter === 'inactive' && !role.isActive) ||
            (filter === 'default' && role.isDefault) ||
            (filter === 'custom' && role.type === 'custom');

        return matchesSearch && matchesFilter;
    });

    // Handle role form input changes
    const handleRoleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoleForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle permission toggle
    const handlePermissionToggle = (permissionId) => {
        setRoleForm(prev => {
            const isSelected = prev.permissions.includes(permissionId);
            const newPermissions = isSelected
                ? prev.permissions.filter(id => id !== permissionId)
                : [...prev.permissions, permissionId];

            return {
                ...prev,
                permissions: newPermissions
            };
        });
    };

    // Select all permissions in a category
    const handleSelectAllInCategory = (categoryId) => {
        const categoryPermissions = permissionCategories
            .find(cat => cat.id === categoryId)
            ?.permissions.map(p => p.id) || [];

        setRoleForm(prev => {
            const allSelected = categoryPermissions.every(permission =>
                prev.permissions.includes(permission)
            );

            if (allSelected) {
                // Deselect all
                return {
                    ...prev,
                    permissions: prev.permissions.filter(permission =>
                        !categoryPermissions.includes(permission)
                    )
                };
            } else {
                // Select all missing ones
                const missingPermissions = categoryPermissions.filter(
                    permission => !prev.permissions.includes(permission)
                );
                return {
                    ...prev,
                    permissions: [...prev.permissions, ...missingPermissions]
                };
            }
        });
    };

    // Select all permissions
    const handleSelectAll = () => {
        const allPermissions = permissionCategories.flatMap(category =>
            category.permissions.map(p => p.id)
        );

        setRoleForm(prev => {
            if (prev.permissions.length === allPermissions.length) {
                // Deselect all
                return { ...prev, permissions: [] };
            } else {
                // Select all
                return { ...prev, permissions: allPermissions };
            }
        });
    };

    // Create new role
    const handleCreateRole = (e) => {
        e.preventDefault();

        if (!roleForm.name.trim()) {
            alert('Role name is required');
            return;
        }

        if (roles.some(role => role.name.toLowerCase() === roleForm.name.toLowerCase())) {
            alert('Role with this name already exists');
            return;
        }

        const newRole = {
            id: roleForm.name.toLowerCase().replace(/\s+/g, '_'),
            name: roleForm.name,
            description: roleForm.description,
            type: roleForm.type,
            level: roleForm.level,
            isDefault: roleForm.isDefault,
            isActive: true,
            permissions: roleForm.permissions,
            userCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
            createdBy: 'Super Admin',
            cannotDelete: false,
            cannotEdit: false,
            icon: getRoleIcon(roleForm.type, roleForm.name)
        };

        setRoles(prev => [...prev, newRole]);
        setShowAddModal(false);
        resetRoleForm();

        alert('Role created successfully!');
    };

    // Update existing role
    const handleUpdateRole = (e) => {
        e.preventDefault();

        if (!roleForm.name.trim()) {
            alert('Role name is required');
            return;
        }

        const updatedRoles = roles.map(role =>
            role.id === selectedRole.id
                ? {
                    ...role,
                    name: roleForm.name,
                    description: roleForm.description,
                    type: roleForm.type,
                    level: roleForm.level,
                    isDefault: roleForm.isDefault,
                    permissions: roleForm.permissions,
                    icon: getRoleIcon(roleForm.type, roleForm.name)
                }
                : role
        );

        setRoles(updatedRoles);
        setShowEditModal(false);
        resetRoleForm();

        alert('Role updated successfully!');
    };

    // Delete role
    const handleDeleteRole = () => {
        if (selectedRole.cannotDelete) {
            alert('This is a system role and cannot be deleted');
            return;
        }

        if (selectedRole.userCount > 0) {
            alert(`Cannot delete role. ${selectedRole.userCount} users are assigned to this role.`);
            return;
        }

        const updatedRoles = roles.filter(role => role.id !== selectedRole.id);
        setRoles(updatedRoles);
        setShowDeleteModal(false);

        alert('Role deleted successfully!');
    };

    // Duplicate role
    const handleDuplicateRole = () => {
        const duplicateRole = {
            ...selectedRole,
            id: `${selectedRole.id}_copy_${Date.now()}`,
            name: `${selectedRole.name} (Copy)`,
            isDefault: false,
            userCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
            createdBy: 'Super Admin',
            cannotDelete: false,
            cannotEdit: false
        };

        setRoles(prev => [...prev, duplicateRole]);
        setShowDuplicateModal(false);

        alert('Role duplicated successfully!');
    };

    // Toggle role active status
    const toggleRoleStatus = (roleId) => {
        const updatedRoles = roles.map(role =>
            role.id === roleId
                ? { ...role, isActive: !role.isActive }
                : role
        );
        setRoles(updatedRoles);
    };

    // Get role icon based on type and name
    const getRoleIcon = (type, name) => {
        switch (type) {
            case 'system':
                if (name.includes('Super')) return <FaCrown className="role-icon-superadmin" />;
                if (name.includes('Admin')) return <FaUserShield className="role-icon-admin" />;
                if (name.includes('Doctor')) return <FaUserMd className="role-icon-doctor" />;
                if (name.includes('Nurse')) return <FaUserNurse className="role-icon-nurse" />;
                if (name.includes('Patient')) return <FaUserInjured className="role-icon-patient" />;
                return <FaShieldAlt className="role-icon-default" />;
            case 'custom':
                if (name.includes('Billing')) return <FaFileInvoiceDollar className="role-icon-billing" />;
                if (name.includes('HR')) return <FaUserTie className="role-icon-hr" />;
                return <FaShieldAlt className="role-icon-custom" />;
            default:
                return <FaShieldAlt className="role-icon-default" />;
        }
    };

    // Open edit modal with role data
    const openEditModal = (role) => {
        if (role.cannotEdit) {
            alert('This is a system role and cannot be edited');
            return;
        }

        setSelectedRole(role);
        setRoleForm({
            name: role.name,
            description: role.description,
            type: role.type,
            level: role.level,
            isDefault: role.isDefault,
            permissions: [...role.permissions]
        });
        setShowEditModal(true);
    };

    // Open view modal
    const openViewModal = (role) => {
        setSelectedRole(role);
        setShowViewModal(true);
    };

    // Open delete modal
    const openDeleteModal = (role) => {
        setSelectedRole(role);
        setShowDeleteModal(true);
    };

    // Open duplicate modal
    const openDuplicateModal = (role) => {
        setSelectedRole(role);
        setShowDuplicateModal(true);
    };

    // Reset role form
    const resetRoleForm = () => {
        setRoleForm({
            name: '',
            description: '',
            type: 'custom',
            level: 'hospital',
            isDefault: false,
            permissions: []
        });
        setSelectedRole(null);
    };

    // Get role type badge color
    const getTypeColor = (type) => {
        switch (type) {
            case 'system': return 'role-type-system';
            case 'custom': return 'role-type-custom';
            default: return 'role-type-default';
        }
    };

    // Get role level badge color
    const getLevelColor = (level) => {
        switch (level) {
            case 'system': return 'role-level-system';
            case 'hospital': return 'role-level-hospital';
            case 'department': return 'role-level-department';
            case 'user': return 'role-level-user';
            default: return 'role-level-default';
        }
    };

    // Get permission count for a role
    const getPermissionCount = (role) => {
        return role.permissions.length;
    };

    // Get total permissions count
    const getTotalPermissions = () => {
        return permissionCategories.flatMap(cat => cat.permissions).length;
    };

    // Statistics
    const totalRoles = roles.length;
    const systemRoles = roles.filter(r => r.type === 'system').length;
    const customRolesCount = roles.filter(r => r.type === 'custom').length;
    const activeRoles = roles.filter(r => r.isActive).length;

    return (
        <div className="superadmin-roles-container">
            <div className="superadmin-main-content">
                {/* Header */}
                <div className="superadmin-roles-header">
                    <div className="header-left">
                        <h1 className="superadmin-title">
                            <FaShieldAlt className="me-2" />
                            Role Management
                        </h1>
                        <p className="superadmin-subtitle">
                            Manage system roles and permissions
                        </p>
                    </div>
                    <div className="header-right">
                        <button
                            className="superadmin-btn superadmin-btn-primary"
                            onClick={() => setShowAddModal(true)}
                        >
                            <FaPlus className="me-2" />
                            Create New Role
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
                            <FaShieldAlt />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{totalRoles}</h3>
                            <p className="stat-label">Total Roles</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="stat-icon">
                            <FaCrown />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{systemRoles}</h3>
                            <p className="stat-label">System Roles</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="stat-icon">
                            <FaUserShield />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{customRolesCount}</h3>
                            <p className="stat-label">Custom Roles</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card gold-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <div className="stat-icon">
                            <FaUsers />
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{activeRoles}</h3>
                            <p className="stat-label">Active Roles</p>
                        </div>
                    </motion.div>
                </div>

                {/* Search and Filter Bar */}
                <div className="search-filter-bar">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by role name, description, or type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchTerm('')}
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Roles
                        </button>
                        <button
                            className={`filter-btn ${filter === 'system' ? 'active' : ''}`}
                            onClick={() => setFilter('system')}
                        >
                            System
                        </button>
                        <button
                            className={`filter-btn ${filter === 'custom' ? 'active' : ''}`}
                            onClick={() => setFilter('custom')}
                        >
                            Custom
                        </button>
                        <button
                            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <select
                            className="level-filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Levels</option>
                            <option value="system">System Level</option>
                            <option value="hospital">Hospital Level</option>
                            <option value="department">Department Level</option>
                            <option value="user">User Level</option>
                        </select>
                    </div>
                </div>

                {/* Roles Table */}
                <div className="roles-table-container">
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
                                        <th className="role-col">Role</th>
                                        <th className="type-col">Type & Level</th>
                                        <th className="permissions-col">Permissions</th>
                                        <th className="users-col">Users</th>
                                        <th className="status-col">Status</th>
                                        <th className="actions-col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRoles.map((role, index) => (
                                        <motion.tr
                                            key={role.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className={!role.isActive ? 'inactive-role' : ''}
                                        >
                                            <td>
                                                <div className="role-info">
                                                    <div className="role-avatar">
                                                        {role.icon}
                                                    </div>
                                                    <div className="role-details">
                                                        <div className="role-name-row">
                                                            <strong>{role.name}</strong>
                                                            {role.isDefault && (
                                                                <span className="default-badge">Default</span>
                                                            )}
                                                        </div>
                                                        <small>{role.description}</small>
                                                        <small className="role-meta">
                                                            ID: {role.id} • Created: {role.createdAt}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="type-level-info">
                                                    <span className={`role-badge ${getTypeColor(role.type)}`}>
                                                        {role.type.toUpperCase()}
                                                    </span>
                                                    <span className={`role-badge ${getLevelColor(role.level)}`}>
                                                        {role.level.toUpperCase()}
                                                    </span>
                                                    {role.cannotEdit && (
                                                        <span className="locked-badge">
                                                            <FaLock /> Locked
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="permissions-info">
                                                    <div className="permissions-count">
                                                        {getPermissionCount(role)}/{getTotalPermissions()} permissions
                                                    </div>
                                                    <div className="permissions-preview">
                                                        {role.permissions.slice(0, 3).map((perm, idx) => (
                                                            <span key={idx} className="permission-chip">
                                                                {perm.split('.')[1]}
                                                            </span>
                                                        ))}
                                                        {role.permissions.length > 3 && (
                                                            <span className="more-permissions">
                                                                +{role.permissions.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="users-info">
                                                    <div className="user-count">
                                                        <FaUsers />
                                                        <span>{role.userCount} users</span>
                                                    </div>
                                                    <small>Assigned to this role</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="status-cell">
                                                    <div className="status-toggle">
                                                        <button
                                                            className={`status-toggle-btn ${role.isActive ? 'active' : 'inactive'}`}
                                                            onClick={() => toggleRoleStatus(role.id)}
                                                            disabled={role.cannotEdit}
                                                            title={role.isActive ? 'Deactivate Role' : 'Activate Role'}
                                                        >
                                                            {role.isActive ? <FaUnlock /> : <FaLock />}
                                                            <span>{role.isActive ? 'Active' : 'Inactive'}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="action-btn view-btn"
                                                        onClick={() => openViewModal(role)}
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        className="action-btn edit-btn"
                                                        onClick={() => openEditModal(role)}
                                                        disabled={role.cannotEdit}
                                                        title={role.cannotEdit ? "Cannot edit system role" : "Edit Role"}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="action-btn duplicate-btn"
                                                        onClick={() => openDuplicateModal(role)}
                                                        title="Duplicate Role"
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                    <button
                                                        className="action-btn delete-btn"
                                                        onClick={() => openDeleteModal(role)}
                                                        disabled={role.cannotDelete || role.userCount > 0}
                                                        title={role.cannotDelete ? "Cannot delete system role" :
                                                            role.userCount > 0 ? "Role has assigned users" : "Delete Role"}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredRoles.length === 0 && (
                                <div className="no-results">
                                    <FaShieldAlt className="mb-3" size={48} />
                                    <h4>No roles found</h4>
                                    <p>Try adjusting your search or filter criteria</p>
                                    <button
                                        className="superadmin-btn superadmin-btn-primary mt-3"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        <FaPlus className="me-2" />
                                        Create New Role
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Create Role Modal */}
                {showAddModal && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal create-role-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaPlus className="me-2" />
                                    Create New Role
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetRoleForm();
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleCreateRole}>
                                <div className="modal-body">
                                    <div className="form-sections">
                                        {/* Basic Information */}
                                        <div className="form-section">
                                            <h4 className="section-title">
                                                <FaShieldAlt className="me-2" />
                                                Basic Information
                                            </h4>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">Role Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={roleForm.name}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                        required
                                                        placeholder="e.g., Billing Manager"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        name="description"
                                                        value={roleForm.description}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                        rows="2"
                                                        placeholder="Describe the role's purpose and responsibilities"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Role Type</label>
                                                    <select
                                                        name="type"
                                                        value={roleForm.type}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                    >
                                                        <option value="custom">Custom Role</option>
                                                        <option value="system">System Role</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Access Level</label>
                                                    <select
                                                        name="level"
                                                        value={roleForm.level}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                    >
                                                        <option value="hospital">Hospital Level</option>
                                                        <option value="department">Department Level</option>
                                                        <option value="user">User Level</option>
                                                        <option value="system">System Level</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Permissions Selection */}
                                        <div className="form-section">
                                            <div className="permissions-header">
                                                <h4 className="section-title">
                                                    <FaLock className="me-2" />
                                                    Permissions
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="select-all-btn"
                                                    onClick={handleSelectAll}
                                                >
                                                    {roleForm.permissions.length === getTotalPermissions() ?
                                                        'Deselect All' : 'Select All'}
                                                </button>
                                            </div>

                                            <div className="permissions-container">
                                                {permissionCategories.map(category => (
                                                    <div key={category.id} className="permission-category">
                                                        <div className="category-header">
                                                            <div className="category-title">
                                                                {category.icon}
                                                                <h5>{category.name}</h5>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="category-select-all"
                                                                onClick={() => handleSelectAllInCategory(category.id)}
                                                            >
                                                                Select All
                                                            </button>
                                                        </div>

                                                        <div className="permissions-list">
                                                            {category.permissions.map(permission => (
                                                                <div key={permission.id} className="permission-item">
                                                                    <label className="permission-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={roleForm.permissions.includes(permission.id)}
                                                                            onChange={() => handlePermissionToggle(permission.id)}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <div className="permission-details">
                                                                        <strong>{permission.name}</strong>
                                                                        <small>{permission.description}</small>
                                                                        <code>{permission.id}</code>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="permissions-summary">
                                                <span className="selected-count">
                                                    {roleForm.permissions.length} permissions selected
                                                </span>
                                                <span className="total-count">
                                                    Total: {getTotalPermissions()} permissions
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="superadmin-btn superadmin-btn-secondary"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            resetRoleForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="superadmin-btn superadmin-btn-primary"
                                    >
                                        <FaShieldAlt className="me-2" />
                                        Create Role
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Edit Role Modal */}
                {showEditModal && selectedRole && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal edit-role-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaEdit className="me-2" />
                                    Edit Role: {selectedRole.name}
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        resetRoleForm();
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleUpdateRole}>
                                <div className="modal-body">
                                    {/* Same form as Create Modal, pre-filled with roleForm data */}
                                    <div className="form-sections">
                                        <div className="form-section">
                                            <h4 className="section-title">
                                                <FaShieldAlt className="me-2" />
                                                Basic Information
                                            </h4>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">Role Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={roleForm.name}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Description</label>
                                                    <textarea
                                                        name="description"
                                                        value={roleForm.description}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                        rows="2"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Role Type</label>
                                                    <select
                                                        name="type"
                                                        value={roleForm.type}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                    >
                                                        <option value="custom">Custom Role</option>
                                                        <option value="system">System Role</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Access Level</label>
                                                    <select
                                                        name="level"
                                                        value={roleForm.level}
                                                        onChange={handleRoleFormChange}
                                                        className="form-control"
                                                    >
                                                        <option value="hospital">Hospital Level</option>
                                                        <option value="department">Department Level</option>
                                                        <option value="user">User Level</option>
                                                        <option value="system">System Level</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Permissions Selection (Same as Create) */}
                                        <div className="form-section">
                                            <div className="permissions-header">
                                                <h4 className="section-title">
                                                    <FaLock className="me-2" />
                                                    Permissions
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="select-all-btn"
                                                    onClick={handleSelectAll}
                                                >
                                                    {roleForm.permissions.length === getTotalPermissions() ?
                                                        'Deselect All' : 'Select All'}
                                                </button>
                                            </div>

                                            <div className="permissions-container">
                                                {permissionCategories.map(category => (
                                                    <div key={category.id} className="permission-category">
                                                        <div className="category-header">
                                                            <div className="category-title">
                                                                {category.icon}
                                                                <h5>{category.name}</h5>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="category-select-all"
                                                                onClick={() => handleSelectAllInCategory(category.id)}
                                                            >
                                                                Select All
                                                            </button>
                                                        </div>

                                                        <div className="permissions-list">
                                                            {category.permissions.map(permission => (
                                                                <div key={permission.id} className="permission-item">
                                                                    <label className="permission-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={roleForm.permissions.includes(permission.id)}
                                                                            onChange={() => handlePermissionToggle(permission.id)}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <div className="permission-details">
                                                                        <strong>{permission.name}</strong>
                                                                        <small>{permission.description}</small>
                                                                        <code>{permission.id}</code>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="permissions-summary">
                                                <span className="selected-count">
                                                    {roleForm.permissions.length} permissions selected
                                                </span>
                                                <span className="total-count">
                                                    Total: {getTotalPermissions()} permissions
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="superadmin-btn superadmin-btn-secondary"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            resetRoleForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="superadmin-btn superadmin-btn-primary"
                                    >
                                        <FaEdit className="me-2" />
                                        Update Role
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* View Role Details Modal */}
                {showViewModal && selectedRole && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal view-role-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaEye className="me-2" />
                                    Role Details
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="role-details-view">
                                    <div className="role-header">
                                        <div className="role-avatar-large">
                                            {selectedRole.icon}
                                        </div>
                                        <div className="role-title">
                                            <h3>{selectedRole.name}</h3>
                                            <div className="role-meta-badges">
                                                <span className={`role-badge ${getTypeColor(selectedRole.type)}`}>
                                                    {selectedRole.type.toUpperCase()}
                                                </span>
                                                <span className={`role-badge ${getLevelColor(selectedRole.level)}`}>
                                                    {selectedRole.level.toUpperCase()}
                                                </span>
                                                {selectedRole.isDefault && (
                                                    <span className="default-badge">Default</span>
                                                )}
                                                {selectedRole.isActive ? (
                                                    <span className="status-badge active">Active</span>
                                                ) : (
                                                    <span className="status-badge inactive">Inactive</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="details-grid">
                                        <div className="detail-section">
                                            <h4><FaInfoCircle className="me-2" />Basic Information</h4>
                                            <div className="detail-item">
                                                <span className="detail-label">Description:</span>
                                                <span className="detail-value">{selectedRole.description}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Role ID:</span>
                                                <span className="detail-value">{selectedRole.id}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Created On:</span>
                                                <span className="detail-value">{selectedRole.createdAt}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Created By:</span>
                                                <span className="detail-value">{selectedRole.createdBy}</span>
                                            </div>
                                        </div>

                                        <div className="detail-section">
                                            <h4><FaUsers className="me-2" />Usage Information</h4>
                                            <div className="detail-item">
                                                <span className="detail-label">Users Assigned:</span>
                                                <span className="detail-value">{selectedRole.userCount} users</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Permissions Count:</span>
                                                <span className="detail-value">
                                                    {getPermissionCount(selectedRole)}/{getTotalPermissions()}
                                                </span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Status:</span>
                                                <span className="detail-value">
                                                    {selectedRole.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="permissions-section">
                                        <h4><FaLock className="me-2" />Assigned Permissions</h4>
                                        <div className="permissions-grid">
                                            {permissionCategories.map(category => {
                                                const categoryPermissions = category.permissions.filter(p =>
                                                    selectedRole.permissions.includes(p.id)
                                                );

                                                if (categoryPermissions.length === 0) return null;

                                                return (
                                                    <div key={category.id} className="category-permissions">
                                                        <h5>{category.name} ({categoryPermissions.length})</h5>
                                                        <div className="assigned-permissions">
                                                            {categoryPermissions.map(permission => (
                                                                <div key={permission.id} className="assigned-permission">
                                                                    <FaCheck className="check-icon" />
                                                                    <div>
                                                                        <strong>{permission.name}</strong>
                                                                        <small>{permission.description}</small>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
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

                {/* Delete Role Modal */}
                {showDeleteModal && selectedRole && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal delete-role-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaTrash className="me-2 text-danger" />
                                    Delete Role
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
                                    <h4>Are you sure you want to delete this role?</h4>

                                    <div className="role-info-card">
                                        <div className="info-item">
                                            <span>Role Name:</span>
                                            <strong>{selectedRole.name}</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Type:</span>
                                            <span className={`role-badge ${getTypeColor(selectedRole.type)}`}>
                                                {selectedRole.type}
                                            </span>
                                        </div>
                                        <div className="info-item">
                                            <span>Users Assigned:</span>
                                            <strong>{selectedRole.userCount} users</strong>
                                        </div>
                                        <div className="info-item">
                                            <span>Permissions:</span>
                                            <strong>{getPermissionCount(selectedRole)} permissions</strong>
                                        </div>
                                    </div>

                                    {selectedRole.userCount > 0 && (
                                        <div className="warning-alert">
                                            <FaTimes className="me-2" />
                                            <span>
                                                This role is assigned to {selectedRole.userCount} user(s).
                                                Deleting it will remove their access.
                                            </span>
                                        </div>
                                    )}

                                    <div className="consequences-alert">
                                        <FaTimesCircle className="me-2" />
                                        <span>This action cannot be undone. Users will lose access immediately.</span>
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
                                    onClick={handleDeleteRole}
                                    disabled={selectedRole.cannotDelete}
                                >
                                    <FaTrash className="me-2" />
                                    Delete Role
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Duplicate Role Modal */}
                {showDuplicateModal && selectedRole && (
                    <div className="modal-overlay">
                        <motion.div
                            className="superadmin-modal duplicate-role-modal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    <FaCopy className="me-2" />
                                    Duplicate Role
                                </h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowDuplicateModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="duplicate-info">
                                    <FaCopy className="text-warning mb-3" size={48} />
                                    <h4>Duplicate "{selectedRole.name}" role?</h4>
                                    <p className="text-muted">
                                        This will create a copy of the role with all its permissions.
                                    </p>

                                    <div className="role-details-card">
                                        <div className="detail-item">
                                            <span>Original Role:</span>
                                            <strong>{selectedRole.name}</strong>
                                        </div>
                                        <div className="detail-item">
                                            <span>Permissions:</span>
                                            <strong>{getPermissionCount(selectedRole)} permissions</strong>
                                        </div>
                                        <div className="detail-item">
                                            <span>New Role Name:</span>
                                            <strong>{selectedRole.name} (Copy)</strong>
                                        </div>
                                    </div>

                                    <div className="info-alert">
                                        <FaCheckCircle className="me-2" />
                                        <span>The duplicated role will be inactive by default and can be modified.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-secondary"
                                    onClick={() => setShowDuplicateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="superadmin-btn superadmin-btn-primary"
                                    onClick={handleDuplicateRole}
                                >
                                    <FaCopy className="me-2" />
                                    Duplicate Role
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Add missing FaInfoCircle component
const FaInfoCircle = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
);

// Add missing FaTimesCircle component
const FaTimesCircle = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
);

export default SuperAdminRoles;