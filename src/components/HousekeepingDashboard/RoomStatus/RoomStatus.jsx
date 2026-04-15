import React, { useState, useEffect } from 'react';
import './RoomStatus.css';
import {
  FaBed,
  FaBroom,
  FaShower,
  FaToilet,
  FaTrashAlt,
  FaTools,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaHourglassHalf,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
  FaDoorOpen,
  FaDoorClosed,
  FaUser,
  FaUserSlash,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSnowflake,
  FaFan,
  FaTv,
  FaWifi,
  FaBath,
  FaCouch,
  FaChair
} from 'react-icons/fa';

const RoomStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCleaning, setSelectedCleaning] = useState('all');
  
  // Room Status Data with comprehensive details
  const [rooms, setRooms] = useState([
    { 
      id: 1, 
      roomNo: 'ICU-101', 
      type: 'ICU Suite', 
      ward: 'ICU',
      status: 'Occupied',
      patientName: 'Mr. Sharma',
      patientId: 'P-2024-001',
      doctor: 'Dr. Verma',
      cleaningStatus: 'Cleaned',
      lastCleaned: 'Today 08:00 AM',
      nextCleaning: 'Today 08:00 PM',
      cleaningType: 'Sterilization',
      cleaningSchedule: 'Every 8 hours',
      maintenanceStatus: 'OK',
      pendingIssues: 0,
      amenities: ['AC', 'TV', 'WiFi', 'Attached Bath'],
      housekeepingNotes: 'Use hospital-grade disinfectant',
      floor: '1st Floor',
      bedCount: 1,
      priority: 'High',
      cleaningStaff: 'Rajesh Kumar',
      supervisor: 'Mrs. Gupta',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15'
    },
    { 
      id: 2, 
      roomNo: 'GEN-205', 
      type: 'Deluxe AC', 
      ward: 'General Ward',
      status: 'Vacant',
      patientName: null,
      patientId: null,
      doctor: null,
      cleaningStatus: 'Pending',
      lastCleaned: 'Yesterday 02:00 PM',
      nextCleaning: 'ASAP',
      cleaningType: 'Deep Cleaning',
      cleaningSchedule: 'Daily',
      maintenanceStatus: 'AC Needs Repair',
      pendingIssues: 2,
      amenities: ['AC', 'TV', 'WiFi', 'Private Bath'],
      housekeepingNotes: 'Prepare for new admission',
      floor: '2nd Floor',
      bedCount: 2,
      priority: 'Medium',
      cleaningStaff: 'Priya Sharma',
      supervisor: 'Mr. Patel',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10'
    },
    { 
      id: 3, 
      roomNo: 'VIP-301', 
      type: 'VIP Suite', 
      ward: 'Private Ward',
      status: 'Occupied',
      patientName: 'Mrs. Kapoor',
      patientId: 'P-2024-002',
      doctor: 'Dr. Singh',
      cleaningStatus: 'In Progress',
      lastCleaned: 'Today 07:00 AM',
      nextCleaning: 'Today 03:00 PM',
      cleaningType: 'Premium Cleaning',
      cleaningSchedule: 'Twice Daily',
      maintenanceStatus: 'OK',
      pendingIssues: 0,
      amenities: ['AC', 'TV', 'WiFi', 'Attached Bath', 'Sofa', 'Fridge'],
      housekeepingNotes: 'VIP patient - extra attention required',
      floor: '3rd Floor',
      bedCount: 1,
      priority: 'Critical',
      cleaningStaff: 'Amit Singh',
      supervisor: 'Mrs. Gupta',
      lastMaintenance: '2024-01-18',
      nextMaintenance: '2024-02-18'
    },
    { 
      id: 4, 
      roomNo: 'OPD-05', 
      type: 'Consultation Room', 
      ward: 'OPD',
      status: 'Occupied',
      patientName: null,
      patientId: null,
      doctor: 'Dr. Reddy',
      cleaningStatus: 'Needs Attention',
      lastCleaned: 'Yesterday 05:00 PM',
      nextCleaning: 'After OPD Hours',
      cleaningType: 'Surface Cleaning',
      cleaningSchedule: 'Every 4 hours',
      maintenanceStatus: 'Light Repair Needed',
      pendingIssues: 1,
      amenities: ['AC', 'Chair', 'Examination Table'],
      housekeepingNotes: 'High traffic area',
      floor: 'Ground Floor',
      bedCount: 0,
      priority: 'High',
      cleaningStaff: 'Sunita Verma',
      supervisor: 'Mr. Patel',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-02-12'
    },
    { 
      id: 5, 
      roomNo: 'OT-01', 
      type: 'Operation Theater', 
      ward: 'Operation Theater',
      status: 'Under Maintenance',
      patientName: null,
      patientId: null,
      doctor: null,
      cleaningStatus: 'Under Maintenance',
      lastCleaned: 'Yesterday 10:00 PM',
      nextCleaning: 'After Maintenance',
      cleaningType: 'Sterilization',
      cleaningSchedule: 'After Each Surgery',
      maintenanceStatus: 'Equipment Calibration',
      pendingIssues: 3,
      amenities: ['AC', 'OT Lights', 'Ventilator', 'Monitors'],
      housekeepingNotes: 'Critical equipment - handle with care',
      floor: '2nd Floor',
      bedCount: 1,
      priority: 'Critical',
      cleaningStaff: 'Sanjay Mehta',
      supervisor: 'Dr. Kumar',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-01-21'
    },
    { 
      id: 6, 
      roomNo: 'EMERG-02', 
      type: 'Emergency Bay', 
      ward: 'Emergency',
      status: 'Occupied',
      patientName: 'Emergency Case',
      patientId: 'P-2024-003',
      doctor: 'Emergency Team',
      cleaningStatus: 'Emergency Clean Required',
      lastCleaned: '30 mins ago',
      nextCleaning: 'Immediate',
      cleaningType: 'Rapid Sanitization',
      cleaningSchedule: 'After Each Case',
      maintenanceStatus: 'OK',
      pendingIssues: 0,
      amenities: ['AC', 'Emergency Equipment', 'Monitor'],
      housekeepingNotes: 'Rapid response required',
      floor: 'Ground Floor',
      bedCount: 1,
      priority: 'Critical',
      cleaningStaff: 'Vikram Patel',
      supervisor: 'Head Nurse',
      lastMaintenance: '2024-01-19',
      nextMaintenance: '2024-02-19'
    },
    { 
      id: 7, 
      roomNo: 'GEN-112', 
      type: 'General Ward Bed', 
      ward: 'General Ward',
      status: 'Occupied',
      patientName: 'Mr. Joshi',
      patientId: 'P-2024-004',
      doctor: 'Dr. Mehta',
      cleaningStatus: 'Cleaned',
      lastCleaned: 'Today 09:30 AM',
      nextCleaning: 'Today 09:30 PM',
      cleaningType: 'Regular Cleaning',
      cleaningSchedule: 'Twice Daily',
      maintenanceStatus: 'OK',
      pendingIssues: 0,
      amenities: ['Fan', 'Bedside Table', 'Curtain'],
      housekeepingNotes: 'Regular maintenance',
      floor: '1st Floor',
      bedCount: 1,
      priority: 'Medium',
      cleaningStaff: 'Anita Desai',
      supervisor: 'Mrs. Gupta',
      lastMaintenance: '2024-01-14',
      nextMaintenance: '2024-02-14'
    },
    { 
      id: 8, 
      roomNo: 'ISO-201', 
      type: 'Isolation Room', 
      ward: 'Isolation Ward',
      status: 'Occupied',
      patientName: 'Isolation Case',
      patientId: 'P-2024-005',
      doctor: 'Dr. Khan',
      cleaningStatus: 'Biohazard Cleaning',
      lastCleaned: 'Today 06:00 AM',
      nextCleaning: 'Today 06:00 PM',
      cleaningType: 'Biohazard Decontamination',
      cleaningSchedule: 'Every 12 hours',
      maintenanceStatus: 'OK',
      pendingIssues: 0,
      amenities: ['AC', 'Negative Pressure', 'Isolation Equipment'],
      housekeepingNotes: 'Use PPE kit - Biohazard protocol',
      floor: '2nd Floor',
      bedCount: 1,
      priority: 'High',
      cleaningStaff: 'Mohammed Khan',
      supervisor: 'Dr. Kumar',
      lastMaintenance: '2024-01-16',
      nextMaintenance: '2024-02-16'
    },
    { 
      id: 9, 
      roomNo: 'PEDI-102', 
      type: 'Pediatric Room', 
      ward: 'Pediatrics',
      status: 'Vacant',
      patientName: null,
      patientId: null,
      doctor: null,
      cleaningStatus: 'Pending',
      lastCleaned: 'Yesterday 03:00 PM',
      nextCleaning: 'Before Admission',
      cleaningType: 'Child-Friendly Cleaning',
      cleaningSchedule: 'Daily',
      maintenanceStatus: 'Toys Sanitization Required',
      pendingIssues: 1,
      amenities: ['AC', 'TV', 'Toys', 'Parent Bed'],
      housekeepingNotes: 'Use child-safe disinfectants',
      floor: '1st Floor',
      bedCount: 1,
      priority: 'Medium',
      cleaningStaff: 'Priya Sharma',
      supervisor: 'Mrs. Gupta',
      lastMaintenance: '2024-01-13',
      nextMaintenance: '2024-02-13'
    },
    { 
      id: 10, 
      roomNo: 'MAT-303', 
      type: 'Maternity Suite', 
      ward: 'Maternity',
      status: 'Occupied',
      patientName: 'Mrs. Patel',
      patientId: 'P-2024-006',
      doctor: 'Dr. Desai',
      cleaningStatus: 'Cleaned',
      lastCleaned: 'Today 10:00 AM',
      nextCleaning: 'Today 10:00 PM',
      cleaningType: 'Special Cleaning',
      cleaningSchedule: 'Twice Daily',
      maintenanceStatus: 'OK',
      pendingIssues: 0,
      amenities: ['AC', 'TV', 'WiFi', 'Attached Bath', 'Baby Cot'],
      housekeepingNotes: 'Mother and baby care area',
      floor: '3rd Floor',
      bedCount: 1,
      priority: 'High',
      cleaningStaff: 'Sunita Verma',
      supervisor: 'Mrs. Gupta',
      lastMaintenance: '2024-01-17',
      nextMaintenance: '2024-02-17'
    },
  ]);

  // Statistics
  const [stats, setStats] = useState({
    totalRooms: 150,
    occupied: 98,
    vacant: 42,
    underMaintenance: 10,
    cleanedToday: 112,
    pendingCleaning: 25,
    inProgress: 13,
    needsAttention: 8,
    criticalRooms: 15
  });

  // Ward summary
  const [wardSummary, setWardSummary] = useState({
    'ICU': { total: 15, occupied: 12, vacant: 2, underMaintenance: 1 },
    'General Ward': { total: 60, occupied: 45, vacant: 12, underMaintenance: 3 },
    'Private Ward': { total: 25, occupied: 20, vacant: 4, underMaintenance: 1 },
    'OPD': { total: 20, occupied: 15, vacant: 3, underMaintenance: 2 },
    'Operation Theater': { total: 8, occupied: 5, vacant: 1, underMaintenance: 2 },
    'Emergency': { total: 10, occupied: 8, vacant: 1, underMaintenance: 1 },
    'Pediatrics': { total: 12, occupied: 8, vacant: 3, underMaintenance: 1 }
  });

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, status: newStatus } : room
    ));
  };

  // Handle cleaning status change
  const handleCleaningChange = (id, newStatus) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, cleaningStatus: newStatus } : room
    ));
  };

  // Handle assign staff
  const handleAssignStaff = (id, staffName) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, cleaningStaff: staffName } : room
    ));
  };

  // Handle add issue
  const handleAddIssue = (id) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, pendingIssues: room.pendingIssues + 1 } : room
    ));
  };

  // Handle mark as cleaned
  const handleMarkCleaned = (id) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setRooms(rooms.map(room => 
      room.id === id ? { 
        ...room, 
        cleaningStatus: 'Cleaned',
        lastCleaned: `Today ${timeString}`
      } : room
    ));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Occupied': return 'hk-room-status-occupied';
      case 'Vacant': return 'hk-room-status-vacant';
      case 'Under Maintenance': return 'hk-room-status-maintenance';
      default: return 'hk-room-status-default';
    }
  };

  // Get cleaning status color
  const getCleaningColor = (status) => {
    switch(status) {
      case 'Cleaned': return 'hk-room-cleaning-cleaned';
      case 'In Progress': return 'hk-room-cleaning-inprogress';
      case 'Pending': return 'hk-room-cleaning-pending';
      case 'Needs Attention': return 'hk-room-cleaning-needsattention';
      case 'Under Maintenance': return 'hk-room-cleaning-maintenance';
      case 'Biohazard Cleaning': return 'hk-room-cleaning-biohazard';
      case 'Emergency Clean Required': return 'hk-room-cleaning-emergency';
      default: return 'hk-room-cleaning-default';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'hk-room-priority-critical';
      case 'High': return 'hk-room-priority-high';
      case 'Medium': return 'hk-room-priority-medium';
      case 'Low': return 'hk-room-priority-low';
      default: return 'hk-room-priority-default';
    }
  };

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'AC': return <FaSnowflake title="Air Conditioner" />;
      case 'TV': return <FaTv title="Television" />;
      case 'WiFi': return <FaWifi title="WiFi" />;
      case 'Attached Bath': return <FaBath title="Attached Bathroom" />;
      case 'Private Bath': return <FaBath title="Private Bathroom" />;
      case 'Sofa': return <FaCouch title="Sofa" />;
      case 'Fan': return <FaFan title="Fan" />;
      case 'Chair': return <FaChair title="Chair" />;
      default: return null;
    }
  };

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchTerm === '' || 
      room.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.doctor?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesWard = selectedWard === 'all' || room.ward === selectedWard;
    const matchesType = selectedType === 'all' || room.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    const matchesCleaning = selectedCleaning === 'all' || room.cleaningStatus === selectedCleaning;
    
    return matchesSearch && matchesWard && matchesType && matchesStatus && matchesCleaning;
  });

  // Calculate statistics
  useEffect(() => {
    const newStats = {
      totalRooms: rooms.length,
      occupied: rooms.filter(r => r.status === 'Occupied').length,
      vacant: rooms.filter(r => r.status === 'Vacant').length,
      underMaintenance: rooms.filter(r => r.status === 'Under Maintenance').length,
      cleanedToday: rooms.filter(r => r.cleaningStatus === 'Cleaned').length,
      pendingCleaning: rooms.filter(r => r.cleaningStatus === 'Pending').length,
      inProgress: rooms.filter(r => r.cleaningStatus === 'In Progress').length,
      needsAttention: rooms.filter(r => r.cleaningStatus === 'Needs Attention').length,
      criticalRooms: rooms.filter(r => r.priority === 'Critical').length
    };
    setStats(newStats);
  }, [rooms]);

  return (
    <div className="hk-room-container">
      {/* Header */}
      <div className="hk-room-header">
        <div className="hk-room-title-section">
          <h1 className="hk-room-title">
            <FaBed className="hk-room-title-icon" />
            Room Status Management
          </h1>
          <p className="hk-room-subtitle">
            Monitor and manage room occupancy, cleaning status, and maintenance across all hospital wards
          </p>
        </div>
        <div className="hk-room-header-actions">
          <button className="hk-room-btn-primary">
            <FaPlus /> Add New Room
          </button>
          <button className="hk-room-btn-secondary">
            <FaPrint /> Print Report
          </button>
          <button className="hk-room-btn-refresh">
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="hk-room-stats-section">
        <h2 className="hk-room-section-title">
          <FaMapMarkerAlt /> Room Overview
        </h2>
        <div className="hk-room-stats-grid">
          <div className="hk-room-stat-card hk-room-stat-total">
            <div className="hk-room-stat-icon">
              <FaDoorOpen />
            </div>
            <div className="hk-room-stat-content">
              <h3>{stats.totalRooms}</h3>
              <p>Total Rooms</p>
            </div>
            <div className="hk-room-stat-trend">
              <span className="hk-room-trend-up">↑ 5%</span>
            </div>
          </div>

          <div className="hk-room-stat-card hk-room-stat-occupied">
            <div className="hk-room-stat-icon">
              <FaUser />
            </div>
            <div className="hk-room-stat-content">
              <h3>{stats.occupied}</h3>
              <p>Occupied</p>
            </div>
            <div className="hk-room-stat-detail">
              {Math.round((stats.occupied / stats.totalRooms) * 100)}% occupied
            </div>
          </div>

          <div className="hk-room-stat-card hk-room-stat-vacant">
            <div className="hk-room-stat-icon">
              <FaUserSlash />
            </div>
            <div className="hk-room-stat-content">
              <h3>{stats.vacant}</h3>
              <p>Vacant</p>
            </div>
            <div className="hk-room-stat-detail">
              {Math.round((stats.vacant / stats.totalRooms) * 100)}% vacant
            </div>
          </div>

          <div className="hk-room-stat-card hk-room-stat-cleaned">
            <div className="hk-room-stat-icon">
              <FaBroom />
            </div>
            <div className="hk-room-stat-content">
              <h3>{stats.cleanedToday}</h3>
              <p>Cleaned Today</p>
            </div>
            <div className="hk-room-stat-detail">
              {Math.round((stats.cleanedToday / stats.totalRooms) * 100)}% clean
            </div>
          </div>

          <div className="hk-room-stat-card hk-room-stat-maintenance">
            <div className="hk-room-stat-icon">
              <FaTools />
            </div>
            <div className="hk-room-stat-content">
              <h3>{stats.underMaintenance}</h3>
              <p>Under Maintenance</p>
            </div>
            <div className="hk-room-stat-trend">
              <span className="hk-room-trend-neutral">→ 0%</span>
            </div>
          </div>

          <div className="hk-room-stat-card hk-room-stat-critical">
            <div className="hk-room-stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="hk-room-stat-content">
              <h3>{stats.criticalRooms}</h3>
              <p>Critical Rooms</p>
            </div>
            <div className="hk-room-stat-trend">
              <span className="hk-room-trend-up">↑ 3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ward Summary */}
      <div className="hk-room-ward-section">
        <h2 className="hk-room-section-title">
          <FaMapMarkerAlt /> Ward-wise Room Status
        </h2>
        <div className="hk-room-ward-grid">
          {Object.entries(wardSummary).map(([ward, data]) => (
            <div key={ward} className="hk-room-ward-card">
              <h3 className="hk-room-ward-name">{ward}</h3>
              <div className="hk-room-ward-stats">
                <div className="hk-room-ward-stat">
                  <span className="hk-room-ward-stat-label">Total:</span>
                  <span className="hk-room-ward-stat-value">{data.total}</span>
                </div>
                <div className="hk-room-ward-stat">
                  <span className="hk-room-ward-stat-label">Occupied:</span>
                  <span className="hk-room-ward-stat-value hk-room-ward-occupied">{data.occupied}</span>
                </div>
                <div className="hk-room-ward-stat">
                  <span className="hk-room-ward-stat-label">Vacant:</span>
                  <span className="hk-room-ward-stat-value hk-room-ward-vacant">{data.vacant}</span>
                </div>
                <div className="hk-room-ward-stat">
                  <span className="hk-room-ward-stat-label">Maintenance:</span>
                  <span className="hk-room-ward-stat-value hk-room-ward-maintenance">{data.underMaintenance}</span>
                </div>
              </div>
              <div className="hk-room-ward-occupancy">
                <div className="hk-room-occupancy-bar">
                  <div 
                    className="hk-room-occupancy-fill"
                    style={{ width: `${(data.occupied / data.total) * 100}%` }}
                  ></div>
                </div>
                <div className="hk-room-occupancy-text">
                  {Math.round((data.occupied / data.total) * 100)}% Occupancy
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="hk-room-filters-section">
        <div className="hk-room-search-container">
          <FaSearch className="hk-room-search-icon" />
          <input
            type="text"
            placeholder="Search by room number, patient name, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hk-room-search-input"
          />
        </div>

        <div className="hk-room-filter-group">
          <select 
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="hk-room-filter-select"
          >
            <option value="all">All Wards</option>
            <option value="ICU">ICU</option>
            <option value="General Ward">General Ward</option>
            <option value="Private Ward">Private Ward</option>
            <option value="OPD">OPD</option>
            <option value="Operation Theater">Operation Theater</option>
            <option value="Emergency">Emergency</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Maternity">Maternity</option>
            <option value="Isolation Ward">Isolation Ward</option>
          </select>

          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="hk-room-filter-select"
          >
            <option value="all">All Room Types</option>
            <option value="ICU Suite">ICU Suite</option>
            <option value="Deluxe AC">Deluxe AC</option>
            <option value="VIP Suite">VIP Suite</option>
            <option value="General Ward Bed">General Ward Bed</option>
            <option value="Operation Theater">Operation Theater</option>
            <option value="Consultation Room">Consultation Room</option>
            <option value="Emergency Bay">Emergency Bay</option>
            <option value="Isolation Room">Isolation Room</option>
            <option value="Pediatric Room">Pediatric Room</option>
            <option value="Maternity Suite">Maternity Suite</option>
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="hk-room-filter-select"
          >
            <option value="all">All Occupancy Status</option>
            <option value="Occupied">Occupied</option>
            <option value="Vacant">Vacant</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>

          <select 
            value={selectedCleaning}
            onChange={(e) => setSelectedCleaning(e.target.value)}
            className="hk-room-filter-select"
          >
            <option value="all">All Cleaning Status</option>
            <option value="Cleaned">Cleaned</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Emergency Clean Required">Emergency Clean Required</option>
          </select>

          <button className="hk-room-filter-btn">
            <FaFilter /> Apply Filters
          </button>
          <button className="hk-room-reset-btn">
            <FaSync /> Reset
          </button>
        </div>
      </div>

      {/* Main Room Table */}
      <div className="hk-room-table-section">
        <div className="hk-room-table-header">
          <h2 className="hk-room-section-title">
            <FaBed /> Room Status Details
          </h2>
          <div className="hk-room-table-info">
            <span className="hk-room-table-count">
              Showing {filteredRooms.length} of {rooms.length} rooms
            </span>
            <button className="hk-room-btn-export">
              <FaDownload /> Export Data
            </button>
          </div>
        </div>

        <div className="hk-room-table-container">
          <table className="hk-room-table">
            <thead>
              <tr>
                <th className="hk-room-th-room">Room Details</th>
                <th className="hk-room-th-patient">Patient/Doctor</th>
                <th className="hk-room-th-cleaning">Cleaning Status</th>
                <th className="hk-room-th-maintenance">Maintenance</th>
                <th className="hk-room-th-amenities">Amenities</th>
                <th className="hk-room-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hk-room-table-row">
                  {/* Room Details Column */}
                  <td className="hk-room-td-details">
                    <div className="hk-room-details">
                      <div className="hk-room-basic-info">
                        <div className="hk-room-number-section">
                          <FaDoorClosed className="hk-room-door-icon" />
                          <div>
                            <div className="hk-room-number">{room.roomNo}</div>
                            <div className="hk-room-type">{room.type}</div>
                          </div>
                        </div>
                        <div className="hk-room-meta">
                          <span className="hk-room-ward">{room.ward}</span>
                          <span className="hk-room-floor">{room.floor}</span>
                          <span className="hk-room-beds">
                            <FaBed /> {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      <div className="hk-room-status-group">
                        <select 
                          className={`hk-room-status-select ${getStatusColor(room.status)}`}
                          value={room.status}
                          onChange={(e) => handleStatusChange(room.id, e.target.value)}
                        >
                          <option value="Occupied">Occupied</option>
                          <option value="Vacant">Vacant</option>
                          <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                        
                        <div className="hk-room-priority-badge">
                          <span className={`hk-room-priority-dot ${getPriorityColor(room.priority)}`}></span>
                          {room.priority}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Patient/Doctor Column */}
                  <td className="hk-room-td-patient">
                    <div className="hk-room-patient-info">
                      {room.status === 'Occupied' ? (
                        <>
                          <div className="hk-room-patient-details">
                            <div className="hk-room-patient-name">
                              <FaUser /> {room.patientName}
                            </div>
                            <div className="hk-room-patient-id">
                              ID: {room.patientId}
                            </div>
                            <div className="hk-room-doctor">
                              <FaUser /> Dr: {room.doctor}
                            </div>
                          </div>
                          <div className="hk-room-notes">
                            <small>{room.housekeepingNotes}</small>
                          </div>
                        </>
                      ) : (
                        <div className="hk-room-vacant-info">
                          <FaDoorOpen className="hk-room-vacant-icon" />
                          <div className="hk-room-vacant-text">Room Available</div>
                          <div className="hk-room-vacant-subtext">Ready for admission</div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Cleaning Status Column */}
                  <td className="hk-room-td-cleaning">
                    <div className="hk-room-cleaning-info">
                      <div className="hk-room-cleaning-status">
                        <select 
                          className={`hk-room-cleaning-select ${getCleaningColor(room.cleaningStatus)}`}
                          value={room.cleaningStatus}
                          onChange={(e) => handleCleaningChange(room.id, e.target.value)}
                        >
                          <option value="Cleaned">Cleaned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Pending">Pending</option>
                          <option value="Needs Attention">Needs Attention</option>
                          <option value="Under Maintenance">Under Maintenance</option>
                          <option value="Emergency Clean Required">Emergency Clean Required</option>
                          <option value="Biohazard Cleaning">Biohazard Cleaning</option>
                        </select>
                        
                        <button 
                          className="hk-room-clean-btn"
                          onClick={() => handleMarkCleaned(room.id)}
                          title="Mark as Cleaned"
                        >
                          <FaBroom />
                        </button>
                      </div>
                      
                      <div className="hk-room-cleaning-details">
                        <div className="hk-room-cleaning-time">
                          <FaClock /> Last: {room.lastCleaned}
                        </div>
                        <div className="hk-room-cleaning-next">
                          <FaCalendarAlt /> Next: {room.nextCleaning}
                        </div>
                      </div>
                      
                      <div className="hk-room-cleaning-staff">
                        <div className="hk-room-staff-assign">
                          <FaUser /> 
                          <select 
                            className="hk-room-staff-select"
                            value={room.cleaningStaff}
                            onChange={(e) => handleAssignStaff(room.id, e.target.value)}
                          >
                            <option>Rajesh Kumar</option>
                            <option>Priya Sharma</option>
                            <option>Amit Singh</option>
                            <option>Sunita Verma</option>
                            <option>Vikram Patel</option>
                            <option>Sanjay Mehta</option>
                            <option>Anita Desai</option>
                            <option>Mohammed Khan</option>
                          </select>
                        </div>
                        <div className="hk-room-supervisor">
                          Sup: {room.supervisor}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Maintenance Column */}
                  <td className="hk-room-td-maintenance">
                    <div className="hk-room-maintenance-info">
                      <div className="hk-room-maintenance-status">
                        {room.maintenanceStatus === 'OK' ? (
                          <div className="hk-room-maintenance-ok">
                            <FaCheckCircle /> All Systems OK
                          </div>
                        ) : (
                          <div className="hk-room-maintenance-issues">
                            <FaExclamationTriangle /> {room.maintenanceStatus}
                          </div>
                        )}
                      </div>
                      
                      <div className="hk-room-issues-count">
                        <button 
                          className="hk-room-issue-btn"
                          onClick={() => handleAddIssue(room.id)}
                        >
                          <FaTools /> Issues: {room.pendingIssues}
                        </button>
                      </div>
                      
                      <div className="hk-room-maintenance-dates">
                        <div className="hk-room-last-maintenance">
                          Last: {room.lastMaintenance}
                        </div>
                        <div className="hk-room-next-maintenance">
                          Next: {room.nextMaintenance}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Amenities Column */}
                  <td className="hk-room-td-amenities">
                    <div className="hk-room-amenities">
                      <div className="hk-room-amenities-list">
                        {room.amenities.map((amenity, index) => (
                          <span key={index} className="hk-room-amenity">
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                      <div className="hk-room-cleaning-type">
                        <FaShower /> {room.cleaningType}
                      </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="hk-room-td-actions">
                    <div className="hk-room-action-buttons">
                      <button 
                        className="hk-room-action-btn hk-room-action-view"
                        title="View Room Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="hk-room-action-btn hk-room-action-edit"
                        title="Edit Room Information"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="hk-room-action-btn hk-room-action-clean"
                        title="Schedule Cleaning"
                      >
                        <FaBroom />
                      </button>
                      <button 
                        className="hk-room-action-btn hk-room-action-maintenance"
                        title="Report Maintenance"
                      >
                        <FaTools />
                      </button>
                      <button 
                        className="hk-room-action-btn hk-room-action-print"
                        title="Print Room Info"
                      >
                        <FaPrint />
                      </button>
                    </div>
                    
                    <div className="hk-room-quick-actions">
                      <button className="hk-room-quick-btn hk-room-btn-checkin">
                        Check-in
                      </button>
                      <button className="hk-room-quick-btn hk-room-btn-checkout">
                        Check-out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="hk-room-no-results">
            <FaBed className="hk-room-no-results-icon" />
            <h3>No rooms found matching your criteria</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="hk-room-table-footer">
          <div className="hk-room-pagination">
            <button className="hk-room-page-btn">← Previous</button>
            <span className="hk-room-page-info">Page 1 of 3</span>
            <button className="hk-room-page-btn">Next →</button>
          </div>
          
          <div className="hk-room-summary">
            <div className="hk-room-summary-stats">
              <span className="hk-room-summary-item">
                <span className="hk-room-summary-dot hk-room-summary-occupied"></span>
                Occupied: {stats.occupied}
              </span>
              <span className="hk-room-summary-item">
                <span className="hk-room-summary-dot hk-room-summary-vacant"></span>
                Vacant: {stats.vacant}
              </span>
              <span className="hk-room-summary-item">
                <span className="hk-room-summary-dot hk-room-summary-cleaned"></span>
                Cleaned: {stats.cleanedToday}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Room Operations */}
      <div className="hk-room-quick-ops">
        <h2 className="hk-room-section-title">
          <FaBroom /> Quick Room Operations
        </h2>
        <div className="hk-room-ops-grid">
          <button className="hk-room-op-btn hk-room-op-checkout">
            <FaDoorOpen /> Bulk Check-out
          </button>
          <button className="hk-room-op-btn hk-room-op-cleaning">
            <FaBroom /> Bulk Cleaning
          </button>
          <button className="hk-room-op-btn hk-room-op-maintenance">
            <FaTools /> Schedule Maintenance
          </button>
          <button className="hk-room-op-btn hk-room-op-report">
            <FaPrint /> Generate Report
          </button>
          <button className="hk-room-op-btn hk-room-op-notify">
            <FaClock /> Send Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomStatus;