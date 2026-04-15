import React, { useState, useEffect } from 'react';
import './AssistantScheduleRooms.css';
import { 
  FiHome, FiCalendar, FiClock, FiUsers, 
  FiMapPin, FiSettings, FiBell, FiMenu, 
  FiX, FiPlus, FiFilter, FiChevronLeft,
  FiChevronRight, FiCheck, FiUser, FiEdit,
  FiTrash2, FiInfo
} from 'react-icons/fi';
import { 
  FaHospital, FaBed, FaUserMd, FaUserInjured,
  FaStethoscope, FaProcedures, FaFileMedical,
  FaWheelchair, FaClipboardList, FaCalendarAlt,
  FaDoorClosed, FaDoorOpen, FaTools
} from 'react-icons/fa';

const AssistantScheduleRooms = () => {
  const [activeMenu, setActiveMenu] = useState('schedule');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [currentDate, setCurrentDate] = useState('');
  const [roomFilter, setRoomFilter] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Schedule Overview Data
  const scheduleOverview = [
    {
      id: 1,
      title: 'Total Appointments Today',
      value: '42',
      icon: <FaCalendarAlt />,
      color: '#a78bfa',
      info: 'Scheduled for today',
      change: '+12% from yesterday'
    },
    {
      id: 2,
      title: 'Available Rooms',
      value: '18',
      icon: <FaDoorOpen />,
      color: '#10b981',
      info: 'Out of 50 total rooms',
      change: '2 rooms just vacated'
    },
    {
      id: 3,
      title: 'Doctors On Duty',
      value: '12',
      icon: <FaUserMd />,
      color: '#8b5cf6',
      info: 'Currently available',
      change: '3 on leave today'
    },
    {
      id: 4,
      title: 'Pending Admissions',
      value: '7',
      icon: <FaProcedures />,
      color: '#ef4444',
      info: 'Waiting for rooms',
      change: '2 new requests today'
    }
  ];

  // Rooms Data
  const roomsData = [
    {
      id: 'R101',
      type: 'General Ward',
      status: 'occupied',
      capacity: 4,
      currentOccupancy: 4,
      equipment: ['AC', 'TV', 'Oxygen'],
      currentPatient: 'John Smith',
      doctor: 'Dr. Sharma',
      admissionDate: '2024-01-20',
      notes: 'Post surgery recovery'
    },
    {
      id: 'R102',
      type: 'Private Room',
      status: 'available',
      capacity: 1,
      currentOccupancy: 0,
      equipment: ['AC', 'TV', 'Private Bath', 'WiFi'],
      currentPatient: null,
      doctor: null,
      admissionDate: null,
      notes: 'Ready for admission'
    },
    {
      id: 'R103',
      type: 'ICU',
      status: 'occupied',
      capacity: 2,
      currentOccupancy: 1,
      equipment: ['Ventilator', 'Monitor', 'Oxygen'],
      currentPatient: 'Emma Wilson',
      doctor: 'Dr. Patel',
      admissionDate: '2024-01-21',
      notes: 'Critical condition'
    },
    {
      id: 'R104',
      type: 'General Ward',
      status: 'maintenance',
      capacity: 4,
      currentOccupancy: 0,
      equipment: ['AC', 'Oxygen'],
      currentPatient: null,
      doctor: null,
      admissionDate: null,
      notes: 'Under maintenance until tomorrow'
    },
    {
      id: 'R105',
      type: 'Private Room',
      status: 'occupied',
      capacity: 1,
      currentOccupancy: 1,
      equipment: ['AC', 'TV', 'Private Bath', 'WiFi'],
      currentPatient: 'Robert Brown',
      doctor: 'Dr. Gupta',
      admissionDate: '2024-01-18',
      notes: 'Diabetes management'
    },
    {
      id: 'R201',
      type: 'Maternity Ward',
      status: 'available',
      capacity: 2,
      currentOccupancy: 0,
      equipment: ['AC', 'Baby Cot', 'Monitor'],
      currentPatient: null,
      doctor: null,
      admissionDate: null,
      notes: 'Ready for expectant mothers'
    },
    {
      id: 'R202',
      type: 'Pediatric Ward',
      status: 'occupied',
      capacity: 3,
      currentOccupancy: 2,
      equipment: ['AC', 'TV', 'Toys'],
      currentPatient: 'Sarah Johnson',
      doctor: 'Dr. Kumar',
      admissionDate: '2024-01-22',
      notes: 'Child pneumonia case'
    },
    {
      id: 'R203',
      type: 'General Ward',
      status: 'available',
      capacity: 4,
      currentOccupancy: 0,
      equipment: ['AC', 'Oxygen'],
      currentPatient: null,
      doctor: null,
      admissionDate: null,
      notes: 'Recently cleaned and sanitized'
    }
  ];

  // Appointments Data
  const appointmentsData = [
    {
      id: 'A001',
      patient: 'Michael Chen',
      doctor: 'Dr. Singh',
      time: '09:30',
      period: 'AM',
      purpose: 'Heart Checkup',
      room: 'Consultation 5',
      status: 'confirmed'
    },
    {
      id: 'A002',
      patient: 'Lisa Anderson',
      doctor: 'Dr. Reddy',
      time: '10:15',
      period: 'AM',
      purpose: 'Post Surgery Follow-up',
      room: 'Room 108',
      status: 'confirmed'
    },
    {
      id: 'A003',
      patient: 'David Miller',
      doctor: 'Dr. Kapoor',
      time: '11:00',
      period: 'AM',
      purpose: 'Blood Test Results',
      room: 'Lab 2',
      status: 'pending'
    },
    {
      id: 'A004',
      patient: 'Priya Sharma',
      doctor: 'Dr. Verma',
      time: '02:30',
      period: 'PM',
      purpose: 'Prenatal Checkup',
      room: 'Maternity Ward',
      status: 'confirmed'
    },
    {
      id: 'A005',
      patient: 'James Wilson',
      doctor: 'Dr. Nair',
      time: '03:45',
      period: 'PM',
      purpose: 'X-ray Review',
      room: 'Radiology',
      status: 'pending'
    }
  ];

  // Calendar Data
  const calendarDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const calendarDates = [
    { date: 15, schedules: ['Dr. Sharma - 9 AM', 'Room 101 Cleaning'] },
    { date: 16, schedules: ['ICU Training', 'Equipment Check'] },
    { date: 17, schedules: ['Staff Meeting', 'New Admissions'] },
    { date: 18, schedules: ['Dr. Patel - Full Day'] },
    { date: 19, schedules: ['Monthly Audit', 'Room Maintenance'] },
    { date: 20, schedules: ['Vaccination Day'] },
    { date: 21, schedules: ['Emergency Drill', 'New Equipment'] }
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

  const filteredRooms = roomFilter === 'all' 
    ? roomsData 
    : roomsData.filter(room => room.status === roomFilter);

  const getRoomStatusClass = (status) => {
    switch(status) {
      case 'occupied': return 'assistant-schedule-status-occupied';
      case 'available': return 'assistant-schedule-status-available';
      case 'maintenance': return 'assistant-schedule-status-maintenance';
      default: return 'assistant-schedule-status-available';
    }
  };

  const getCardIconStyle = (color) => ({
    background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
  });

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  return (
    <div className="assistant-schedule-wrapper">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="assistant-schedule-main ">
        {/* Navbar */}
    
        {/* Dashboard Content */}
        <div className="assistant-schedule-content">
          {/* Welcome Section */}
          <div className="assistant-schedule-welcome">
            <h2 className="assistant-schedule-welcometitle">Room & Schedule Management</h2>
            <p className="assistant-schedule-welcomesubtitle">
              Manage room allocations, view schedules, and track appointments in real-time. 
              Get instant updates on room availability and doctor schedules.
            </p>
          </div>

          {/* Schedule Overview */}
          <div className="assistant-schedule-overview">
            {scheduleOverview.map(card => (
              <div key={card.id} className="assistant-schedule-overviewcard">
                <div className="assistant-schedule-cardheader">
                  <h3 className="assistant-schedule-cardtitle">{card.title}</h3>
                  <div className="assistant-schedule-cardicon" style={getCardIconStyle(card.color)}>
                    {card.icon}
                  </div>
                </div>
                <div className="assistant-schedule-cardvalue">{card.value}</div>
                <div className="assistant-schedule-cardinfo">{card.info}</div>
                <div className="assistant-schedule-cardinfo" style={{color: card.color, marginTop: '8px'}}>
                  {card.change}
                </div>
              </div>
            ))}
          </div>

          {/* Calendar Section */}
          <div className="assistant-schedule-calendar">
            <div className="assistant-schedule-calendarheader">
              <h3 className="assistant-schedule-calendartitle">Weekly Schedule</h3>
              <div className="assistant-schedule-calendarcontrols">
                <button className="assistant-schedule-calendarbutton" onClick={handlePreviousWeek}>
                  <FiChevronLeft /> Previous Week
                </button>
                <button className="assistant-schedule-calendarbutton">
                  Today
                </button>
                <button className="assistant-schedule-calendarbutton" onClick={handleNextWeek}>
                  Next Week <FiChevronRight />
                </button>
              </div>
            </div>
            
            <div className="assistant-schedule-calendargrid">
              {calendarDays.map(day => (
                <div key={day} className="assistant-schedule-calendarday">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="assistant-schedule-calendargrid">
              {calendarDates.map((day, index) => (
                <div key={index} className="assistant-schedule-calendarcell">
                  <div className="assistant-schedule-calendardate">{day.date}</div>
                  {day.schedules.map((schedule, idx) => (
                    <div key={idx} className="assistant-schedule-scheduleitem">
                      {schedule}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Rooms Availability */}
          <div className="assistant-schedule-rooms">
            <div className="assistant-schedule-roomsheader">
              <h3 className="assistant-schedule-roomstitle">Rooms Availability</h3>
              <div className="assistant-schedule-roomsfilter">
                <button 
                  className={`assistant-schedule-filterbutton ${roomFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('all')}
                >
                  All Rooms
                </button>
                <button 
                  className={`assistant-schedule-filterbutton ${roomFilter === 'available' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('available')}
                >
                  Available
                </button>
                <button 
                  className={`assistant-schedule-filterbutton ${roomFilter === 'occupied' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('occupied')}
                >
                  Occupied
                </button>
                <button 
                  className={`assistant-schedule-filterbutton ${roomFilter === 'maintenance' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('maintenance')}
                >
                  Maintenance
                </button>
              </div>
            </div>
            
            <div className="assistant-schedule-roomsgrid">
              {filteredRooms.map(room => (
                <div key={room.id} className={`assistant-schedule-roomcard ${room.status}`}>
                  <div className="assistant-schedule-roomheader">
                    <h4 className="assistant-schedule-roomnumber">{room.id}</h4>
                    <span className={`assistant-schedule-roomstatus ${getRoomStatusClass(room.status)}`}>
                      {room.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="assistant-schedule-roominfo">
                    <div className="assistant-schedule-roomdetail">
                      <FaBed className="assistant-schedule-roomicon" />
                      <span>{room.type} • {room.currentOccupancy}/{room.capacity} beds</span>
                    </div>
                    
                    <div className="assistant-schedule-roomdetail">
                      <FaWheelchair className="assistant-schedule-roomicon" />
                      <span>Equipment: {room.equipment.join(', ')}</span>
                    </div>
                    
                    <div className="assistant-schedule-roomdetail">
                      <FiInfo className="assistant-schedule-roomicon" />
                      <span>{room.notes}</span>
                    </div>
                  </div>
                  
                  {room.currentPatient && (
                    <div className="assistant-schedule-roomcurrent">
                      <div className="assistant-schedule-roomcurrenttitle">Current Patient</div>
                      <div className="assistant-schedule-roompatient">{room.currentPatient}</div>
                      <div className="assistant-schedule-roomdoctor">Under: {room.doctor}</div>
                    </div>
                  )}
                  
                  {room.status === 'available' && (
                    <button className="assistant-schedule-actionbutton" style={{marginTop: '15px', width: '100%'}}>
                      <FiCheck /> Assign Patient
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="assistant-schedule-appointments">
            <div className="assistant-schedule-appointmentsheader">
              <h3 className="assistant-schedule-appointmentstitle">Today's Appointments</h3>
              <button className="assistant-schedule-calendarbutton">
                <FiPlus /> New Appointment
              </button>
            </div>
            
            <div className="assistant-schedule-appointmentslist">
              {appointmentsData.map(appointment => (
                <div key={appointment.id} className="assistant-schedule-appointmentcard">
                  <div className="assistant-schedule-appointmentinfo">
                    <div className="assistant-schedule-appointmenttime">
                      <div className="assistant-schedule-appointmenthour">{appointment.time}</div>
                      <div className="assistant-schedule-appointmentperiod">{appointment.period}</div>
                    </div>
                    
                    <div className="assistant-schedule-appointmentdetails">
                      <div className="assistant-schedule-appointmentpatient">{appointment.patient}</div>
                      <div className="assistant-schedule-appointmentdoctor">With: {appointment.doctor}</div>
                      <div className="assistant-schedule-appointmentpurpose">{appointment.purpose} • Room: {appointment.room}</div>
                    </div>
                  </div>
                  
                  <div className="assistant-schedule-appointmentactions">
                    <button className="assistant-schedule-actionbutton">
                      <FiEdit /> Edit
                    </button>
                    <button className="assistant-schedule-actionbutton">
                      <FiInfo /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantScheduleRooms;