import React, { useState, useEffect } from 'react';
import './AssistantEquipmentInventory.css';
import {
    FiHome, FiPackage, FiSearch, FiPlus,
    FiFilter, FiEdit, FiEye, FiSettings,
    FiAlertCircle, FiClock, FiCalendar,
    FiTrendingUp, FiTrendingDown, FiMenu,
    FiX, FiBell, FiTool, FiActivity,
    FiCheckCircle, FiAlertTriangle, FiInfo,
    FiDownload, FiUpload, FiRefreshCw,
    FiBarChart2, FiPieChart, FiGrid
} from 'react-icons/fi';
import {
    FaHospital, FaSyringe, FaHeartbeat,
    FaStethoscope, FaBed, FaProcedures,
    FaPrescriptionBottleAlt, FaXRay,
    FaMicroscope, FaTint, FaThermometerHalf,
    FaShieldAlt, FaCapsules, FaClinicMedical,
    FaUserMd, FaAmbulance, FaVial
} from 'react-icons/fa';

const AssistantEquipmentInventory = () => {
    const [activeMenu, setActiveMenu] = useState('equipment');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [notifications, setNotifications] = useState(6);
    const [currentDate, setCurrentDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Inventory Overview Data
    const inventoryOverview = [
        {
            id: 1,
            title: 'Total Equipment',
            value: '1,248',
            icon: <FiPackage />,
            color: '#a78bfa',
            info: 'Registered in inventory system',
            trend: '+8%',
            trendUp: true
        },
        {
            id: 2,
            title: 'Operational',
            value: '1,156',
            icon: <FiCheckCircle />,
            color: '#10b981',
            info: 'Currently in working condition',
            trend: '+3%',
            trendUp: true
        },
        {
            id: 3,
            title: 'Under Maintenance',
            value: '64',
            icon: <FiTool />,
            color: '#f59e0b',
            info: 'Scheduled for service',
            trend: '-2%',
            trendUp: false
        },
        {
            id: 4,
            title: 'Critical Stock',
            value: '28',
            icon: <FiAlertCircle />,
            color: '#ef4444',
            info: 'Needs immediate attention',
            trend: '+5%',
            trendUp: true
        }
    ];

    // Equipment Data
    const equipmentData = [
        {
            id: 'EQ001',
            name: 'Ventilator Machine',
            category: 'Critical Care',
            manufacturer: 'Philips',
            model: 'V60',
            location: 'ICU 1',
            status: 'operational',
            lastMaintenance: '2024-01-15',
            nextMaintenance: '2024-02-15',
            usageHours: 2450,
            urgency: 'low'
        },
        {
            id: 'EQ002',
            name: 'CT Scan Machine',
            category: 'Radiology',
            manufacturer: 'Siemens',
            model: 'SOMATOM',
            location: 'Radiology Dept',
            status: 'maintenance',
            lastMaintenance: '2024-01-10',
            nextMaintenance: '2024-01-30',
            usageHours: 8760,
            urgency: 'high'
        },
        {
            id: 'EQ003',
            name: 'ECG Monitor',
            category: 'Cardiology',
            manufacturer: 'GE Healthcare',
            model: 'MAC 5500',
            location: 'Cardiology Ward',
            status: 'operational',
            lastMaintenance: '2024-01-20',
            nextMaintenance: '2024-03-20',
            usageHours: 1200,
            urgency: 'low'
        },
        {
            id: 'EQ004',
            name: 'Ultrasound Machine',
            category: 'Diagnostics',
            manufacturer: 'Mindray',
            model: 'DC-70',
            location: 'Diagnostic Center',
            status: 'reserved',
            lastMaintenance: '2024-01-18',
            nextMaintenance: '2024-04-18',
            usageHours: 3200,
            urgency: 'medium'
        },
        {
            id: 'EQ005',
            name: 'Infusion Pump',
            category: 'Medication',
            manufacturer: 'Baxter',
            model: 'Sigma Spectrum',
            location: 'ICU 2',
            status: 'outofservice',
            lastMaintenance: '2024-01-05',
            nextMaintenance: '2024-02-05',
            usageHours: 4500,
            urgency: 'high'
        },
        {
            id: 'EQ006',
            name: 'Blood Analyzer',
            category: 'Laboratory',
            manufacturer: 'Roche',
            model: 'Cobas 6000',
            location: 'Pathology Lab',
            status: 'operational',
            lastMaintenance: '2024-01-22',
            nextMaintenance: '2024-03-22',
            usageHours: 2800,
            urgency: 'medium'
        },
        {
            id: 'EQ007',
            name: 'Patient Monitor',
            category: 'Monitoring',
            manufacturer: 'Philips',
            model: 'IntelliVue MX40',
            location: 'General Ward',
            status: 'operational',
            lastMaintenance: '2024-01-25',
            nextMaintenance: '2024-03-25',
            usageHours: 1800,
            urgency: 'low'
        },
        {
            id: 'EQ008',
            name: 'Defibrillator',
            category: 'Emergency',
            manufacturer: 'Zoll',
            model: 'X Series',
            location: 'Emergency Dept',
            status: 'maintenance',
            lastMaintenance: '2024-01-12',
            nextMaintenance: '2024-01-28',
            usageHours: 950,
            urgency: 'high'
        }
    ];

    // Category Data
    const categoryData = [
        {
            id: 1,
            name: 'Critical Care',
            icon: <FaHeartbeat />,
            totalItems: 156,
            operational: 142,
            maintenance: 14,
            color: '#ef4444'
        },
        {
            id: 2,
            name: 'Diagnostic',
            icon: <FaStethoscope />,
            totalItems: 89,
            operational: 85,
            maintenance: 4,
            color: '#3b82f6'
        },
        {
            id: 3,
            name: 'Surgical',
            icon: <FaProcedures />,
            totalItems: 234,
            operational: 228,
            maintenance: 6,
            color: '#8b5cf6'
        },
        {
            id: 4,
            name: 'Laboratory',
            icon: <FaMicroscope />,
            totalItems: 167,
            operational: 162,
            maintenance: 5,
            color: '#10b981'
        },
        {
            id: 5,
            name: 'Monitoring',
            icon: <FaBed />,
            totalItems: 312,
            operational: 305,
            maintenance: 7,
            color: '#f59e0b'
        },
        {
            id: 6,
            name: 'Medication',
            icon: <FaPrescriptionBottleAlt />,
            totalItems: 198,
            operational: 194,
            maintenance: 4,
            color: '#8b5cf6'
        }
    ];

    // Maintenance Schedule
    const maintenanceData = [
        {
            id: 1,
            equipment: 'CT Scan Machine',
            type: 'Preventive Maintenance',
            assignedTo: 'Tech Team A',
            startDate: '2024-01-28',
            endDate: '2024-01-30',
            progress: 65,
            priority: 'High'
        },
        {
            id: 2,
            equipment: 'Defibrillator',
            type: 'Calibration',
            assignedTo: 'Bio-Medical Dept',
            startDate: '2024-01-27',
            endDate: '2024-01-28',
            progress: 40,
            priority: 'Critical'
        },
        {
            id: 3,
            equipment: 'Ventilator - ICU 1',
            type: 'Filter Replacement',
            assignedTo: 'Nursing Staff',
            startDate: '2024-01-29',
            endDate: '2024-01-29',
            progress: 20,
            priority: 'Medium'
        },
        {
            id: 4,
            equipment: 'Blood Analyzer',
            type: 'Software Update',
            assignedTo: 'IT Support',
            startDate: '2024-01-30',
            endDate: '2024-01-31',
            progress: 10,
            priority: 'Low'
        }
    ];

    // Stock Alerts
    const alertData = [
        {
            id: 1,
            type: 'critical',
            title: 'Oxygen Cylinders Low',
            description: 'Stock below minimum threshold',
            item: 'Medical Oxygen',
            currentStock: 12,
            minimumStock: 50,
            unit: 'Cylinders',
            time: '2 hours ago'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Syringes Running Low',
            description: 'Reorder recommended',
            item: 'Disposable Syringes',
            currentStock: 450,
            minimumStock: 1000,
            unit: 'Pieces',
            time: '5 hours ago'
        },
        {
            id: 3,
            type: 'info',
            title: 'Gloves Inventory Check',
            description: 'Monthly consumption report',
            item: 'Surgical Gloves',
            currentStock: 8500,
            minimumStock: 5000,
            unit: 'Pairs',
            time: '1 day ago'
        },
        {
            id: 4,
            type: 'critical',
            title: 'IV Fluids Critical',
            description: 'Emergency restock needed',
            item: 'Normal Saline',
            currentStock: 35,
            minimumStock: 200,
            unit: 'Bottles',
            time: '3 hours ago'
        }
    ];


    // Set current date
    useEffect(() => {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        setCurrentDate(now.toLocaleDateString('en-US', options));
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleNotificationClick = () => {
        setNotifications(0);
    };

    const filteredEquipment = equipmentData.filter(equipment => {
        const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipment.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || equipment.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'operational': return 'assistant-equipment-status-operational';
            case 'maintenance': return 'assistant-equipment-status-maintenance';
            case 'outofservice': return 'assistant-equipment-status-outofservice';
            case 'reserved': return 'assistant-equipment-status-reserved';
            default: return 'assistant-equipment-status-operational';
        }
    };

    const getUrgencyBadgeClass = (urgency) => {
        switch (urgency) {
            case 'high': return 'assistant-equipment-urgency-high';
            case 'medium': return 'assistant-equipment-urgency-medium';
            case 'low': return 'assistant-equipment-urgency-low';
            default: return 'assistant-equipment-urgency-low';
        }
    };

    const getCardIconStyle = (color) => ({
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
    });

    const getCategoryIconStyle = (color) => ({
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        color: color
    });

    const getAlertIconClass = (type) => {
        switch (type) {
            case 'critical': return 'assistant-equipment-alerticon critical';
            case 'warning': return 'assistant-equipment-alerticon warning';
            case 'info': return 'assistant-equipment-alerticon info';
            default: return 'assistant-equipment-alerticon info';
        }
    };

    const getAlertCardClass = (type) => {
        switch (type) {
            case 'critical': return 'assistant-equipment-alertcard critical';
            case 'warning': return 'assistant-equipment-alertcard warning';
            case 'info': return 'assistant-equipment-alertcard info';
            default: return 'assistant-equipment-alertcard info';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'operational': return <FiCheckCircle />;
            case 'maintenance': return <FiTool />;
            case 'outofservice': return <FiAlertTriangle />;
            case 'reserved': return <FiInfo />;
            default: return <FiInfo />;
        }
    };

    return (
        <div className="assistant-equipment-wrapper">
            {/* Sidebar */}
          

          
            <div className="assistant-equipment-main ">
               
               

                {/* Dashboard Content */}
                <div className="assistant-equipment-content">
                    {/* Welcome Section */}
                    <div className="assistant-equipment-welcome">
                        <h2 className="assistant-equipment-welcometitle">Equipment & Inventory Dashboard</h2>
                        <p className="assistant-equipment-welcomesubtitle">
                            Monitor medical equipment status, track inventory levels, and manage maintenance schedules.
                            Ensure optimal equipment availability for patient care.
                        </p>
                    </div>

                    {/* Inventory Overview */}
                    <div className="assistant-equipment-overview">
                        {inventoryOverview.map(card => (
                            <div key={card.id} className="assistant-equipment-statscard">
                                <div className="assistant-equipment-cardheader">
                                    <h3 className="assistant-equipment-cardtitle">{card.title}</h3>
                                    <div className="assistant-equipment-cardicon" style={getCardIconStyle(card.color)}>
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="assistant-equipment-cardvalue">{card.value}</div>
                                <div className="assistant-equipment-cardinfo">{card.info}</div>
                                <div className={`assistant-equipment-cardtrend ${card.trendUp ? 'assistant-equipment-trendup' : 'assistant-equipment-trenddown'}`}>
                                    {card.trendUp ? <FiTrendingUp /> : <FiTrendingDown />}
                                    {card.trend} from last month
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Equipment Table */}
                    <div className="assistant-equipment-tablecontainer">
                        <div className="assistant-equipment-tableheader">
                            <h3 className="assistant-equipment-tabletitle">Equipment Registry</h3>
                            <div className="assistant-equipment-tablecontrols">
                                <input
                                    type="text"
                                    className="assistant-equipment-searchinput"
                                    placeholder="Search equipment..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <select
                                    className="assistant-equipment-searchinput"
                                    style={{ minWidth: '150px' }}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="operational">Operational</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="outofservice">Out of Service</option>
                                    <option value="reserved">Reserved</option>
                                </select>
                                <button className="assistant-equipment-addbutton">
                                    <FiPlus /> Add Equipment
                                </button>
                            </div>
                        </div>

                        <div className="assistant-equipment-tablewrapper">
                            <table className="assistant-equipment-datatable">
                                <thead className="assistant-equipment-tablehead">
                                    <tr className="assistant-equipment-headerrow">
                                        <th>Equipment</th>
                                        <th>Category</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Last Maintenance</th>
                                        <th>Usage Hours</th>
                                        <th>Urgency</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEquipment.map(equipment => (
                                        <tr key={equipment.id} className="assistant-equipment-tablerow">
                                            <td>
                                                <div className="assistant-equipment-equipmentinfo">
                                                    <div className="assistant-equipment-equipmenticon">
                                                        {getStatusIcon(equipment.status)}
                                                    </div>
                                                    <div>
                                                        <div className="assistant-equipment-equipmentname">{equipment.name}</div>
                                                        <div className="assistant-equipment-equipmentid">{equipment.id} • {equipment.manufacturer} {equipment.model}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{equipment.category}</td>
                                            <td>{equipment.location}</td>
                                            <td>
                                                <span className={`assistant-equipment-statusbadge ${getStatusBadgeClass(equipment.status)}`}>
                                                    {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                                                </span>
                                            </td>
                                            <td>{equipment.lastMaintenance}</td>
                                            <td>{equipment.usageHours.toLocaleString()} hrs</td>
                                            <td>
                                                <span className={`assistant-equipment-urgencybadge ${getUrgencyBadgeClass(equipment.urgency)}`}>
                                                    {equipment.urgency.toUpperCase()}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="assistant-equipment-actionbuttons">
                                                    <button className="assistant-equipment-actionbtn" title="View Details">
                                                        <FiEye />
                                                    </button>
                                                    <button className="assistant-equipment-actionbtn" title="Edit">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="assistant-equipment-actionbtn" title="Maintenance">
                                                        <FiTool />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Categories Overview */}
                    <div className="assistant-equipment-categories">
                        <div className="assistant-equipment-categoriesheader">
                            <h3 className="assistant-equipment-categoriestitle">Equipment Categories</h3>
                        </div>

                        <div className="assistant-equipment-categoriesgrid">
                            {categoryData.map(category => (
                                <div key={category.id} className="assistant-equipment-categorycard">
                                    <div className="assistant-equipment-categoryicon" style={getCategoryIconStyle(category.color)}>
                                        {category.icon}
                                    </div>
                                    <h4 className="assistant-equipment-categoryname">{category.name}</h4>
                                    <div className="assistant-equipment-categorystats">
                                        <div className="assistant-equipment-categorystat">
                                            <div className="assistant-equipment-categoryvalue">{category.totalItems}</div>
                                            <div className="assistant-equipment-categorylabel">Total</div>
                                        </div>
                                        <div className="assistant-equipment-categorystat">
                                            <div className="assistant-equipment-categoryvalue">{category.operational}</div>
                                            <div className="assistant-equipment-categorylabel">Operational</div>
                                        </div>
                                        <div className="assistant-equipment-categorystat">
                                            <div className="assistant-equipment-categoryvalue">{category.maintenance}</div>
                                            <div className="assistant-equipment-categorylabel">Maintenance</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Maintenance Schedule */}
                    <div className="assistant-equipment-maintenance">
                        <div className="assistant-equipment-maintenanceheader">
                            <h3 className="assistant-equipment-maintenancetitle">Maintenance Schedule</h3>
                            <button className="assistant-equipment-addbutton">
                                <FiPlus /> Schedule Maintenance
                            </button>
                        </div>

                        <div className="assistant-equipment-maintenancelist">
                            {maintenanceData.map(item => (
                                <div key={item.id} className="assistant-equipment-maintenanceitem">
                                    <div className="assistant-equipment-maintenanceicon">
                                        <FiTool />
                                    </div>
                                    <div className="assistant-equipment-maintenanceinfo">
                                        <h4 className="assistant-equipment-maintenancename">{item.equipment}</h4>
                                        <div className="assistant-equipment-maintenancedetails">
                                            {item.type} • Assigned to: {item.assignedTo} • Priority: {item.priority}
                                        </div>
                                        <div className="assistant-equipment-maintenancetime">
                                            <FiCalendar />
                                            {item.startDate} - {item.endDate}
                                        </div>
                                    </div>
                                    <div className="assistant-equipment-maintenanceprogress">
                                        <div className="assistant-equipment-progressbar">
                                            <div className="assistant-equipment-progressfill" style={{ width: `${item.progress}%` }}></div>
                                        </div>
                                        <div className="assistant-equipment-progresstext">{item.progress}% Complete</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stock Alerts */}
                    <div className="assistant-equipment-alerts">
                        <div className="assistant-equipment-alertsheader">
                            <h3 className="assistant-equipment-alertstitle">Stock Alerts</h3>
                            <button className="assistant-equipment-addbutton">
                                <FiPlus /> Place Order
                            </button>
                        </div>

                        <div className="assistant-equipment-alertsgrid">
                            {alertData.map(alert => (
                                <div key={alert.id} className={getAlertCardClass(alert.type)}>
                                    <div className="assistant-equipment-alertheader">
                                        <div className={getAlertIconClass(alert.type)}>
                                            <FiAlertCircle />
                                        </div>
                                        <div className="assistant-equipment-alertinfo">
                                            <h4>{alert.title}</h4>
                                            <p>{alert.description}</p>
                                        </div>
                                    </div>

                                    <div className="assistant-equipment-alertdetails">
                                        <div className="assistant-equipment-alertdetail">
                                            <span className="assistant-equipment-alertlabel">Item:</span>
                                            <span className="assistant-equipment-alertvalue">{alert.item}</span>
                                        </div>
                                        <div className="assistant-equipment-alertdetail">
                                            <span className="assistant-equipment-alertlabel">Current Stock:</span>
                                            <span className="assistant-equipment-alertvalue">{alert.currentStock} {alert.unit}</span>
                                        </div>
                                        <div className="assistant-equipment-alertdetail">
                                            <span className="assistant-equipment-alertlabel">Minimum Required:</span>
                                            <span className="assistant-equipment-alertvalue">{alert.minimumStock} {alert.unit}</span>
                                        </div>
                                        <div className="assistant-equipment-alertdetail">
                                            <span className="assistant-equipment-alertlabel">Alert Time:</span>
                                            <span className="assistant-equipment-alertvalue">{alert.time}</span>
                                        </div>
                                    </div>

                                    <button className="assistant-equipment-alertaction">
                                        Order Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantEquipmentInventory;