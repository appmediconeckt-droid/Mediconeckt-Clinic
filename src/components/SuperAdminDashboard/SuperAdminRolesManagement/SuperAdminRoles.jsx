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
            icon: <FaCrown className="role-mgmt-icon-superadmin" />
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
            icon: <FaUserShield className="role-mgmt-icon-admin" />
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
            icon: <FaUserMd className="role-mgmt-icon-doctor" />
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
            icon: <FaUserNurse className="role-mgmt-icon-nurse" />
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
            icon: <FaUserInjured className="role-mgmt-icon-patient" />
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
            icon: <FaFileInvoiceDollar className="role-mgmt-icon-billing" />
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
            icon: <FaUserTie className="role-mgmt-icon-hr" />
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
                if (name.includes('Super')) return <FaCrown className="role-mgmt-icon-superadmin" />;
                if (name.includes('Admin')) return <FaUserShield className="role-mgmt-icon-admin" />;
                if (name.includes('Doctor')) return <FaUserMd className="role-mgmt-icon-doctor" />;
                if (name.includes('Nurse')) return <FaUserNurse className="role-mgmt-icon-nurse" />;
                if (name.includes('Patient')) return <FaUserInjured className="role-mgmt-icon-patient" />;
                return <FaShieldAlt className="role-mgmt-icon-default" />;
            case 'custom':
                if (name.includes('Billing')) return <FaFileInvoiceDollar className="role-mgmt-icon-billing" />;
                if (name.includes('HR')) return <FaUserTie className="role-mgmt-icon-hr" />;
                return <FaShieldAlt className="role-mgmt-icon-custom" />;
            default:
                return <FaShieldAlt className="role-mgmt-icon-default" />;
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
            case 'system': return 'role-mgmt-type-system';
            case 'custom': return 'role-mgmt-type-custom';
            default: return 'role-mgmt-type-default';
        }
    };

    // Get role level badge color
    const getLevelColor = (level) => {
        switch (level) {
            case 'system': return 'role-mgmt-level-system';
            case 'hospital': return 'role-mgmt-level-hospital';
            case 'department': return 'role-mgmt-level-department';
            case 'user': return 'role-mgmt-level-user';
            default: return 'role-mgmt-level-default';
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
        <div className="role-mgmt-container">
            <div className="role-mgmt-main-content">
                {/* Header */}
                <div className="role-mgmt-header">
                    <div className="role-mgmt-header-left">
                        <h1 className="role-mgmt-title">
                            <FaShieldAlt className="role-mgmt-title-icon" />
                            Role Management
                        </h1>
                        <p className="role-mgmt-subtitle">
                            Manage system roles and permissions
                        </p>
                    </div>
                    <div className="role-mgmt-header-right">
                        <button
                            className="role-mgmt-btn role-mgmt-btn-primary"
                            onClick={() => setShowAddModal(true)}
                        >
                            <FaPlus className="role-mgmt-btn-icon" />
                            Create New Role
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="role-mgmt-stats-grid">
                    <motion.div
                        className="role-mgmt-stat-card role-mgmt-stat-card-gold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="role-mgmt-stat-icon">
                            <FaShieldAlt />
                        </div>
                        <div className="role-mgmt-stat-content">
                            <h3 className="role-mgmt-stat-value">{totalRoles}</h3>
                            <p className="role-mgmt-stat-label">Total Roles</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="role-mgmt-stat-card role-mgmt-stat-card-gold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="role-mgmt-stat-icon">
                            <FaCrown />
                        </div>
                        <div className="role-mgmt-stat-content">
                            <h3 className="role-mgmt-stat-value">{systemRoles}</h3>
                            <p className="role-mgmt-stat-label">System Roles</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="role-mgmt-stat-card role-mgmt-stat-card-gold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="role-mgmt-stat-icon">
                            <FaUserShield />
                        </div>
                        <div className="role-mgmt-stat-content">
                            <h3 className="role-mgmt-stat-value">{customRolesCount}</h3>
                            <p className="role-mgmt-stat-label">Custom Roles</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="role-mgmt-stat-card role-mgmt-stat-card-gold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <div className="role-mgmt-stat-icon">
                            <FaUsers />
                        </div>
                        <div className="role-mgmt-stat-content">
                            <h3 className="role-mgmt-stat-value">{activeRoles}</h3>
                            <p className="role-mgmt-stat-label">Active Roles</p>
                        </div>
                    </motion.div>
                </div>

                {/* Search and Filter Bar */}
                <div className="role-mgmt-search-filter">
                    <div className="role-mgmt-search-box">
                        <FaSearch className="role-mgmt-search-icon" />
                        <input
                            type="text"
                            placeholder="Search by role name, description, or type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="role-mgmt-search-input"
                        />
                        {searchTerm && (
                            <button
                                className="role-mgmt-search-clear"
                                onClick={() => setSearchTerm('')}
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    <div className="role-mgmt-filter-buttons">
                        <button
                            className={`role-mgmt-filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Roles
                        </button>
                        <button
                            className={`role-mgmt-filter-btn ${filter === 'system' ? 'active' : ''}`}
                            onClick={() => setFilter('system')}
                        >
                            System
                        </button>
                        <button
                            className={`role-mgmt-filter-btn ${filter === 'custom' ? 'active' : ''}`}
                            onClick={() => setFilter('custom')}
                        >
                            Custom
                        </button>
                        <button
                            className={`role-mgmt-filter-btn ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <select
                            className="role-mgmt-level-filter"
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
                <div className="role-mgmt-table-container">
                    {loading ? (
                        <div className="role-mgmt-loading">
                            <div className="role-mgmt-spinner"></div>
                            <div className="role-mgmt-loading-text">
                                <h3>Loading Roles...</h3>
                                <p>Please wait while we fetch role data</p>
                            </div>
                        </div>
                    ) : (
                        <div className="role-mgmt-table-wrapper">
                            <table className="role-mgmt-table">
                                <thead>
                                    <tr>
                                        <th className="role-mgmt-col-role">Role</th>
                                        <th className="role-mgmt-col-type">Type & Level</th>
                                        <th className="role-mgmt-col-permissions">Permissions</th>
                                        <th className="role-mgmt-col-users">Users</th>
                                        <th className="role-mgmt-col-status">Status</th>
                                        <th className="role-mgmt-col-actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRoles.map((role, index) => (
                                        <motion.tr
                                            key={role.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className={!role.isActive ? 'role-mgmt-row-inactive' : ''}
                                        >
                                            <td>
                                                <div className="role-mgmt-info">
                                                    <div className="role-mgmt-avatar">
                                                        {role.icon}
                                                    </div>
                                                    <div className="role-mgmt-details">
                                                        <div className="role-mgmt-name-row">
                                                            <strong>{role.name}</strong>
                                                            {role.isDefault && (
                                                                <span className="role-mgmt-default-badge">Default</span>
                                                            )}
                                                        </div>
                                                        <small>{role.description}</small>
                                                        <small className="role-mgmt-meta">
                                                            ID: {role.id} • Created: {role.createdAt}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="role-mgmt-type-level">
                                                    <span className={`role-mgmt-badge ${getTypeColor(role.type)}`}>
                                                        {role.type.toUpperCase()}
                                                    </span>
                                                    <span className={`role-mgmt-badge ${getLevelColor(role.level)}`}>
                                                        {role.level.toUpperCase()}
                                                    </span>
                                                    {role.cannotEdit && (
                                                        <span className="role-mgmt-locked-badge">
                                                            <FaLock /> Locked
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="role-mgmt-permissions-info">
                                                    <div className="role-mgmt-permissions-count">
                                                        {getPermissionCount(role)}/{getTotalPermissions()} permissions
                                                    </div>
                                                    <div className="role-mgmt-permissions-preview">
                                                        {role.permissions.slice(0, 3).map((perm, idx) => (
                                                            <span key={idx} className="role-mgmt-permission-chip">
                                                                {perm.split('.')[1]}
                                                            </span>
                                                        ))}
                                                        {role.permissions.length > 3 && (
                                                            <span className="role-mgmt-more-permissions">
                                                                +{role.permissions.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="role-mgmt-users-info">
                                                    <div className="role-mgmt-user-count">
                                                        <FaUsers />
                                                        <span>{role.userCount} users</span>
                                                    </div>
                                                    <small>Assigned to this role</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="role-mgmt-status-cell">
                                                    <div className="role-mgmt-status-toggle">
                                                        <button
                                                            className={`role-mgmt-status-toggle-btn ${role.isActive ? 'active' : 'inactive'}`}
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
                                                <div className="role-mgmt-action-buttons">
                                                    <button
                                                        className="role-mgmt-action-btn role-mgmt-action-view"
                                                        onClick={() => openViewModal(role)}
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        className="role-mgmt-action-btn role-mgmt-action-edit"
                                                        onClick={() => openEditModal(role)}
                                                        disabled={role.cannotEdit}
                                                        title={role.cannotEdit ? "Cannot edit system role" : "Edit Role"}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="role-mgmt-action-btn role-mgmt-action-duplicate"
                                                        onClick={() => openDuplicateModal(role)}
                                                        title="Duplicate Role"
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                    <button
                                                        className="role-mgmt-action-btn role-mgmt-action-delete"
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
                                <div className="role-mgmt-no-results">
                                    <FaShieldAlt className="role-mgmt-no-results-icon" />
                                    <h4>No roles found</h4>
                                    <p>Try adjusting your search or filter criteria</p>
                                    <button
                                        className="role-mgmt-btn role-mgmt-btn-primary"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        <FaPlus className="role-mgmt-btn-icon" />
                                        Create New Role
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Create Role Modal */}
                {showAddModal && (
                    <div className="role-mgmt-modal-overlay">
                        <motion.div
                            className="role-mgmt-modal role-mgmt-modal-create"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="role-mgmt-modal-header">
                                <h3 className="role-mgmt-modal-title">
                                    <FaPlus className="role-mgmt-modal-title-icon" />
                                    Create New Role
                                </h3>
                                <button
                                    className="role-mgmt-modal-close"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetRoleForm();
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleCreateRole}>
                                <div className="role-mgmt-modal-body">
                                    <div className="role-mgmt-form-sections">
                                        {/* Basic Information */}
                                        <div className="role-mgmt-form-section">
                                            <h4 className="role-mgmt-section-title">
                                                <FaShieldAlt className="role-mgmt-section-title-icon" />
                                                Basic Information
                                            </h4>
                                            <div className="role-mgmt-form-grid">
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Role Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={roleForm.name}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
                                                        required
                                                        placeholder="e.g., Billing Manager"
                                                    />
                                                </div>
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Description</label>
                                                    <textarea
                                                        name="description"
                                                        value={roleForm.description}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
                                                        rows="2"
                                                        placeholder="Describe the role's purpose and responsibilities"
                                                    />
                                                </div>
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Role Type</label>
                                                    <select
                                                        name="type"
                                                        value={roleForm.type}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
                                                    >
                                                        <option value="custom">Custom Role</option>
                                                        <option value="system">System Role</option>
                                                    </select>
                                                </div>
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Access Level</label>
                                                    <select
                                                        name="level"
                                                        value={roleForm.level}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
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
                                        <div className="role-mgmt-form-section">
                                            <div className="role-mgmt-permissions-header">
                                                <h4 className="role-mgmt-section-title">
                                                    <FaLock className="role-mgmt-section-title-icon" />
                                                    Permissions
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="role-mgmt-select-all-btn"
                                                    onClick={handleSelectAll}
                                                >
                                                    {roleForm.permissions.length === getTotalPermissions() ?
                                                        'Deselect All' : 'Select All'}
                                                </button>
                                            </div>

                                            <div className="role-mgmt-permissions-container">
                                                {permissionCategories.map(category => (
                                                    <div key={category.id} className="role-mgmt-permission-category">
                                                        <div className="role-mgmt-category-header">
                                                            <div className="role-mgmt-category-title">
                                                                {category.icon}
                                                                <h5>{category.name}</h5>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="role-mgmt-category-select-all"
                                                                onClick={() => handleSelectAllInCategory(category.id)}
                                                            >
                                                                Select All
                                                            </button>
                                                        </div>

                                                        <div className="role-mgmt-permissions-list">
                                                            {category.permissions.map(permission => (
                                                                <div key={permission.id} className="role-mgmt-permission-item">
                                                                    <label className="role-mgmt-permission-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={roleForm.permissions.includes(permission.id)}
                                                                            onChange={() => handlePermissionToggle(permission.id)}
                                                                        />
                                                                        <span className="role-mgmt-checkmark"></span>
                                                                    </label>
                                                                    <div className="role-mgmt-permission-details">
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

                                            <div className="role-mgmt-permissions-summary">
                                                <span className="role-mgmt-selected-count">
                                                    {roleForm.permissions.length} permissions selected
                                                </span>
                                                <span className="role-mgmt-total-count">
                                                    Total: {getTotalPermissions()} permissions
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="role-mgmt-modal-footer">
                                    <button
                                        type="button"
                                        className="role-mgmt-btn role-mgmt-btn-secondary"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            resetRoleForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="role-mgmt-btn role-mgmt-btn-primary"
                                    >
                                        <FaShieldAlt className="role-mgmt-btn-icon" />
                                        Create Role
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Edit Role Modal */}
                {showEditModal && selectedRole && (
                    <div className="role-mgmt-modal-overlay">
                        <motion.div
                            className="role-mgmt-modal role-mgmt-modal-edit"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="role-mgmt-modal-header">
                                <h3 className="role-mgmt-modal-title">
                                    <FaEdit className="role-mgmt-modal-title-icon" />
                                    Edit Role: {selectedRole.name}
                                </h3>
                                <button
                                    className="role-mgmt-modal-close"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        resetRoleForm();
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleUpdateRole}>
                                <div className="role-mgmt-modal-body">
                                    <div className="role-mgmt-form-sections">
                                        <div className="role-mgmt-form-section">
                                            <h4 className="role-mgmt-section-title">
                                                <FaShieldAlt className="role-mgmt-section-title-icon" />
                                                Basic Information
                                            </h4>
                                            <div className="role-mgmt-form-grid">
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Role Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={roleForm.name}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
                                                        required
                                                    />
                                                </div>
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Description</label>
                                                    <textarea
                                                        name="description"
                                                        value={roleForm.description}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
                                                        rows="2"
                                                    />
                                                </div>
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Role Type</label>
                                                    <select
                                                        name="type"
                                                        value={roleForm.type}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
                                                    >
                                                        <option value="custom">Custom Role</option>
                                                        <option value="system">System Role</option>
                                                    </select>
                                                </div>
                                                <div className="role-mgmt-form-group">
                                                    <label className="role-mgmt-form-label">Access Level</label>
                                                    <select
                                                        name="level"
                                                        value={roleForm.level}
                                                        onChange={handleRoleFormChange}
                                                        className="role-mgmt-form-control"
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
                                        <div className="role-mgmt-form-section">
                                            <div className="role-mgmt-permissions-header">
                                                <h4 className="role-mgmt-section-title">
                                                    <FaLock className="role-mgmt-section-title-icon" />
                                                    Permissions
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="role-mgmt-select-all-btn"
                                                    onClick={handleSelectAll}
                                                >
                                                    {roleForm.permissions.length === getTotalPermissions() ?
                                                        'Deselect All' : 'Select All'}
                                                </button>
                                            </div>

                                            <div className="role-mgmt-permissions-container">
                                                {permissionCategories.map(category => (
                                                    <div key={category.id} className="role-mgmt-permission-category">
                                                        <div className="role-mgmt-category-header">
                                                            <div className="role-mgmt-category-title">
                                                                {category.icon}
                                                                <h5>{category.name}</h5>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="role-mgmt-category-select-all"
                                                                onClick={() => handleSelectAllInCategory(category.id)}
                                                            >
                                                                Select All
                                                            </button>
                                                        </div>

                                                        <div className="role-mgmt-permissions-list">
                                                            {category.permissions.map(permission => (
                                                                <div key={permission.id} className="role-mgmt-permission-item">
                                                                    <label className="role-mgmt-permission-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={roleForm.permissions.includes(permission.id)}
                                                                            onChange={() => handlePermissionToggle(permission.id)}
                                                                        />
                                                                        <span className="role-mgmt-checkmark"></span>
                                                                    </label>
                                                                    <div className="role-mgmt-permission-details">
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

                                            <div className="role-mgmt-permissions-summary">
                                                <span className="role-mgmt-selected-count">
                                                    {roleForm.permissions.length} permissions selected
                                                </span>
                                                <span className="role-mgmt-total-count">
                                                    Total: {getTotalPermissions()} permissions
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="role-mgmt-modal-footer">
                                    <button
                                        type="button"
                                        className="role-mgmt-btn role-mgmt-btn-secondary"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            resetRoleForm();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="role-mgmt-btn role-mgmt-btn-primary"
                                    >
                                        <FaEdit className="role-mgmt-btn-icon" />
                                        Update Role
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* View Role Details Modal */}
                {showViewModal && selectedRole && (
                    <div className="role-mgmt-modal-overlay">
                        <motion.div
                            className="role-mgmt-modal role-mgmt-modal-view"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="role-mgmt-modal-header">
                                <h3 className="role-mgmt-modal-title">
                                    <FaEye className="role-mgmt-modal-title-icon" />
                                    Role Details
                                </h3>
                                <button
                                    className="role-mgmt-modal-close"
                                    onClick={() => setShowViewModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="role-mgmt-modal-body">
                                <div className="role-mgmt-details-view">
                                    <div className="role-mgmt-details-header">
                                        <div className="role-mgmt-avatar-large">
                                            {selectedRole.icon}
                                        </div>
                                        <div className="role-mgmt-details-title">
                                            <h3>{selectedRole.name}</h3>
                                            <div className="role-mgmt-meta-badges">
                                                <span className={`role-mgmt-badge ${getTypeColor(selectedRole.type)}`}>
                                                    {selectedRole.type.toUpperCase()}
                                                </span>
                                                <span className={`role-mgmt-badge ${getLevelColor(selectedRole.level)}`}>
                                                    {selectedRole.level.toUpperCase()}
                                                </span>
                                                {selectedRole.isDefault && (
                                                    <span className="role-mgmt-default-badge">Default</span>
                                                )}
                                                {selectedRole.isActive ? (
                                                    <span className="role-mgmt-status-badge active">Active</span>
                                                ) : (
                                                    <span className="role-mgmt-status-badge inactive">Inactive</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="role-mgmt-details-grid">
                                        <div className="role-mgmt-detail-section">
                                            <h4><span className="role-mgmt-detail-icon">ℹ️</span>Basic Information</h4>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Description:</span>
                                                <span className="role-mgmt-detail-value">{selectedRole.description}</span>
                                            </div>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Role ID:</span>
                                                <span className="role-mgmt-detail-value">{selectedRole.id}</span>
                                            </div>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Created On:</span>
                                                <span className="role-mgmt-detail-value">{selectedRole.createdAt}</span>
                                            </div>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Created By:</span>
                                                <span className="role-mgmt-detail-value">{selectedRole.createdBy}</span>
                                            </div>
                                        </div>

                                        <div className="role-mgmt-detail-section">
                                            <h4><FaUsers className="role-mgmt-detail-icon" />Usage Information</h4>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Users Assigned:</span>
                                                <span className="role-mgmt-detail-value">{selectedRole.userCount} users</span>
                                            </div>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Permissions Count:</span>
                                                <span className="role-mgmt-detail-value">
                                                    {getPermissionCount(selectedRole)}/{getTotalPermissions()}
                                                </span>
                                            </div>
                                            <div className="role-mgmt-detail-item">
                                                <span className="role-mgmt-detail-label">Status:</span>
                                                <span className="role-mgmt-detail-value">
                                                    {selectedRole.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="role-mgmt-permissions-section">
                                        <h4><FaLock className="role-mgmt-section-title-icon" />Assigned Permissions</h4>
                                        <div className="role-mgmt-permissions-grid">
                                            {permissionCategories.map(category => {
                                                const categoryPermissions = category.permissions.filter(p =>
                                                    selectedRole.permissions.includes(p.id)
                                                );

                                                if (categoryPermissions.length === 0) return null;

                                                return (
                                                    <div key={category.id} className="role-mgmt-category-permissions">
                                                        <h5>{category.name} ({categoryPermissions.length})</h5>
                                                        <div className="role-mgmt-assigned-permissions">
                                                            {categoryPermissions.map(permission => (
                                                                <div key={permission.id} className="role-mgmt-assigned-permission">
                                                                    <FaCheck className="role-mgmt-check-icon" />
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

                            <div className="role-mgmt-modal-footer">
                                <button
                                    type="button"
                                    className="role-mgmt-btn role-mgmt-btn-secondary"
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
                    <div className="role-mgmt-modal-overlay">
                        <motion.div
                            className="role-mgmt-modal role-mgmt-modal-delete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="role-mgmt-modal-header">
                                <h3 className="role-mgmt-modal-title">
                                    <FaTrash className="role-mgmt-modal-title-icon role-mgmt-text-danger" />
                                    Delete Role
                                </h3>
                                <button
                                    className="role-mgmt-modal-close"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="role-mgmt-modal-body">
                                <div className="role-mgmt-delete-warning">
                                    <FaTrash className="role-mgmt-delete-icon" />
                                    <h4>Are you sure you want to delete this role?</h4>

                                    <div className="role-mgmt-delete-info">
                                        <div className="role-mgmt-delete-info-item">
                                            <span>Role Name:</span>
                                            <strong>{selectedRole.name}</strong>
                                        </div>
                                        <div className="role-mgmt-delete-info-item">
                                            <span>Type:</span>
                                            <span className={`role-mgmt-badge ${getTypeColor(selectedRole.type)}`}>
                                                {selectedRole.type}
                                            </span>
                                        </div>
                                        <div className="role-mgmt-delete-info-item">
                                            <span>Users Assigned:</span>
                                            <strong>{selectedRole.userCount} users</strong>
                                        </div>
                                        <div className="role-mgmt-delete-info-item">
                                            <span>Permissions:</span>
                                            <strong>{getPermissionCount(selectedRole)} permissions</strong>
                                        </div>
                                    </div>

                                    {selectedRole.userCount > 0 && (
                                        <div className="role-mgmt-warning-alert">
                                            <FaTimes className="role-mgmt-alert-icon" />
                                            <span>
                                                This role is assigned to {selectedRole.userCount} user(s).
                                                Deleting it will remove their access.
                                            </span>
                                        </div>
                                    )}

                                    <div className="role-mgmt-consequences-alert">
                                        <span className="role-mgmt-alert-icon">⚠️</span>
                                        <span>This action cannot be undone. Users will lose access immediately.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="role-mgmt-modal-footer">
                                <button
                                    type="button"
                                    className="role-mgmt-btn role-mgmt-btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="role-mgmt-btn role-mgmt-btn-danger"
                                    onClick={handleDeleteRole}
                                    disabled={selectedRole.cannotDelete}
                                >
                                    <FaTrash className="role-mgmt-btn-icon" />
                                    Delete Role
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Duplicate Role Modal */}
                {showDuplicateModal && selectedRole && (
                    <div className="role-mgmt-modal-overlay">
                        <motion.div
                            className="role-mgmt-modal role-mgmt-modal-duplicate"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="role-mgmt-modal-header">
                                <h3 className="role-mgmt-modal-title">
                                    <FaCopy className="role-mgmt-modal-title-icon" />
                                    Duplicate Role
                                </h3>
                                <button
                                    className="role-mgmt-modal-close"
                                    onClick={() => setShowDuplicateModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="role-mgmt-modal-body">
                                <div className="role-mgmt-duplicate-info">
                                    <FaCopy className="role-mgmt-duplicate-icon" />
                                    <h4>Duplicate "{selectedRole.name}" role?</h4>
                                    <p className="role-mgmt-text-muted">
                                        This will create a copy of the role with all its permissions.
                                    </p>

                                    <div className="role-mgmt-duplicate-details">
                                        <div className="role-mgmt-duplicate-item">
                                            <span>Original Role:</span>
                                            <strong>{selectedRole.name}</strong>
                                        </div>
                                        <div className="role-mgmt-duplicate-item">
                                            <span>Permissions:</span>
                                            <strong>{getPermissionCount(selectedRole)} permissions</strong>
                                        </div>
                                        <div className="role-mgmt-duplicate-item">
                                            <span>New Role Name:</span>
                                            <strong>{selectedRole.name} (Copy)</strong>
                                        </div>
                                    </div>

                                    <div className="role-mgmt-info-alert">
                                        <FaCheck className="role-mgmt-alert-icon" />
                                        <span>The duplicated role will be inactive by default and can be modified.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="role-mgmt-modal-footer">
                                <button
                                    type="button"
                                    className="role-mgmt-btn role-mgmt-btn-secondary"
                                    onClick={() => setShowDuplicateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="role-mgmt-btn role-mgmt-btn-primary"
                                    onClick={handleDuplicateRole}
                                >
                                    <FaCopy className="role-mgmt-btn-icon" />
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

export default SuperAdminRoles;