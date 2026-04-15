import React, { useState, useEffect } from 'react';
import './AssistantPatientsTeam.css';
import { 
  FiHome, FiUsers, FiUserPlus, FiSearch, 
  FiFilter, FiEdit, FiEye, FiMessageSquare,
  FiPhone, FiMail, FiCalendar, FiClock,
  FiActivity, FiTrendingUp, FiTrendingDown,
  FiMenu, FiX, FiBell, FiPlus,
  FiUser, FiUserCheck, FiUserX, FiHeart,
  FiFileText, FiShield
} from 'react-icons/fi';
import { 
  FaHospital, FaUserMd, FaUserNurse, 
  FaStethoscope, FaProcedures, FaBed,
  FaClipboardCheck, FaNotesMedical,
  FaAmbulance, FaPrescriptionBottleAlt,
  FaChartLine, FaUserInjured, FaRegHospital,
  FaRegUserCircle
} from 'react-icons/fa';

const AssistantPatientsTeam = () => {
  const [activeMenu, setActiveMenu] = useState('patients');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(8);
  const [currentDate, setCurrentDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  
  // Patients Overview Data
  const patientsOverview = [
    {
      id: 1,
      title: 'Total Patients',
      value: '1,248',
      icon: <FiUsers />,
      color: '#a78bfa',
      info: 'Currently registered in system',
      trend: '+12%',
      trendUp: true
    },
    {
      id: 2,
      title: 'Active Admissions',
      value: '186',
      icon: <FaBed />,
      color: '#8b5cf6',
      info: 'Patients currently admitted',
      trend: '+5%',
      trendUp: true
    },
    {
      id: 3,
      title: 'Critical Patients',
      value: '24',
      icon: <FaAmbulance />,
      color: '#ef4444',
      info: 'Requiring immediate attention',
      trend: '-3%',
      trendUp: false
    },
    {
      id: 4,
      title: 'Daily Appointments',
      value: '89',
      icon: <FiCalendar />,
      color: '#10b981',
      info: 'Scheduled for today',
      trend: '+8%',
      trendUp: true
    }
  ];

  // Patients Data
  const patientsData = [
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      condition: 'Hypertension',
      doctor: 'Dr. Sharma',
      room: 'Room 101',
      status: 'admitted',
      admissionDate: '2024-01-20',
      lastVisit: '2024-01-28'
    },
    {
      id: 'P002',
      name: 'Emma Wilson',
      age: 32,
      gender: 'Female',
      condition: 'Fractured Arm',
      doctor: 'Dr. Patel',
      room: 'Room 205',
      status: 'admitted',
      admissionDate: '2024-01-21',
      lastVisit: '2024-01-28'
    },
    {
      id: 'P003',
      name: 'Robert Brown',
      age: 58,
      gender: 'Male',
      condition: 'Diabetes Type 2',
      doctor: 'Dr. Gupta',
      room: 'Discharged',
      status: 'discharged',
      admissionDate: '2024-01-18',
      lastVisit: '2024-01-25'
    },
    {
      id: 'P004',
      name: 'Sarah Johnson',
      age: 29,
      gender: 'Female',
      condition: 'Pneumonia',
      doctor: 'Dr. Kumar',
      room: 'Room 312',
      status: 'critical',
      admissionDate: '2024-01-22',
      lastVisit: '2024-01-28'
    },
    {
      id: 'P005',
      name: 'Michael Chen',
      age: 65,
      gender: 'Male',
      condition: 'Heart Disease',
      doctor: 'Dr. Singh',
      room: 'ICU 3',
      status: 'critical',
      admissionDate: '2024-01-23',
      lastVisit: '2024-01-28'
    },
    {
      id: 'P006',
      name: 'Lisa Anderson',
      age: 41,
      gender: 'Female',
      condition: 'Post Surgery',
      doctor: 'Dr. Reddy',
      room: 'Room 108',
      status: 'stable',
      admissionDate: '2024-01-19',
      lastVisit: '2024-01-28'
    },
    {
      id: 'P007',
      name: 'David Miller',
      age: 52,
      gender: 'Male',
      condition: 'Kidney Stones',
      doctor: 'Dr. Kapoor',
      room: 'Room 214',
      status: 'admitted',
      admissionDate: '2024-01-24',
      lastVisit: '2024-01-28'
    },
    {
      id: 'P008',
      name: 'Priya Sharma',
      age: 28,
      gender: 'Female',
      condition: 'Pregnancy Care',
      doctor: 'Dr. Verma',
      room: 'Maternity 5',
      status: 'stable',
      admissionDate: '2024-01-25',
      lastVisit: '2024-01-28'
    }
  ];

  // Team Data
  const teamData = [
    {
      id: 'D001',
      name: 'Dr. Rajesh Sharma',
      role: 'Cardiologist',
      department: 'Cardiology',
      experience: '15 years',
      patients: 156,
      rating: 4.8,
      status: 'available',
      avatar: 'RS'
    },
    {
      id: 'D002',
      name: 'Dr. Priya Patel',
      role: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      experience: '12 years',
      patients: 124,
      rating: 4.7,
      status: 'available',
      avatar: 'PP'
    },
    {
      id: 'D003',
      name: 'Dr. Amit Gupta',
      role: 'Endocrinologist',
      department: 'Endocrinology',
      experience: '10 years',
      patients: 98,
      rating: 4.9,
      status: 'busy',
      avatar: 'AG'
    },
    {
      id: 'D004',
      name: 'Dr. Sunita Kumar',
      role: 'Pediatrician',
      department: 'Pediatrics',
      experience: '8 years',
      patients: 167,
      rating: 4.6,
      status: 'available',
      avatar: 'SK'
    },
    {
      id: 'N001',
      name: 'Nurse Anjali Singh',
      role: 'Head Nurse',
      department: 'ICU',
      experience: '7 years',
      patients: 45,
      rating: 4.9,
      status: 'available',
      avatar: 'AS'
    },
    {
      id: 'N002',
      name: 'Nurse Rohan Mehta',
      role: 'Emergency Nurse',
      department: 'Emergency',
      experience: '5 years',
      patients: 89,
      rating: 4.7,
      status: 'busy',
      avatar: 'RM'
    },
    {
      id: 'T001',
      name: 'Ravi Verma',
      role: 'Lab Technician',
      department: 'Pathology',
      experience: '6 years',
      patients: 234,
      rating: 4.8,
      status: 'available',
      avatar: 'RV'
    },
    {
      id: 'S001',
      name: 'Meena Reddy',
      role: 'Pharmacist',
      department: 'Pharmacy',
      experience: '9 years',
      patients: 312,
      rating: 4.9,
      status: 'available',
      avatar: 'MR'
    }
  ];

  // Recent Activities
  const activitiesData = [
    {
      id: 1,
      icon: <FiUserPlus />,
      text: 'New patient admitted - Michael Chen',
      user: 'Dr. Singh',
      time: '10 minutes ago'
    },
    {
      id: 2,
      icon: <FaNotesMedical />,
      text: 'Lab report updated for patient P004',
      user: 'Lab Technician',
      time: '25 minutes ago'
    },
    {
      id: 3,
      icon: <FaPrescriptionBottleAlt />,
      text: 'Medication dispensed for Room 205',
      user: 'Pharmacist',
      time: '1 hour ago'
    },
    {
      id: 4,
      icon: <FaClipboardCheck />,
      text: 'Patient P003 discharged successfully',
      user: 'Dr. Gupta',
      time: '2 hours ago'
    },
    {
      id: 5,
      icon: <FaProcedures />,
      text: 'Surgery completed for patient P006',
      user: 'Dr. Patel',
      time: '3 hours ago'
    }
  ];

  // Quick Stats
  const quickStats = [
    { label: 'Average Stay Duration', value: '5.2 days' },
    { label: 'Patient Satisfaction', value: '94%' },
    { label: 'Emergency Response Time', value: '8.5 mins' },
    { label: 'Readmission Rate', value: '3.2%' }
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

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeam = teamFilter === 'all' 
    ? teamData 
    : teamData.filter(member => 
        teamFilter === 'doctors' ? member.id.startsWith('D') :
        teamFilter === 'nurses' ? member.id.startsWith('N') :
        teamData
      );

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'admitted': return 'assistant-patients-status-admitted';
      case 'discharged': return 'assistant-patients-status-discharged';
      case 'critical': return 'assistant-patients-status-critical';
      case 'stable': return 'assistant-patients-status-stable';
      default: return 'assistant-patients-status-stable';
    }
  };

  const getCardIconStyle = (color) => ({
    background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
  });

  const getMemberStatusColor = (status) => {
    switch(status) {
      case 'available': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="assistant-patients-wrapper">
     
     

      
      <div className="assistant-patients-main ">
       
      
        {/* Dashboard Content */}
        <div className="assistant-patients-content">
          {/* Welcome Section */}
          <div className="assistant-patients-welcome">
            <h2 className="assistant-patients-welcometitle">Patient & Team Dashboard</h2>
            <p className="assistant-patients-welcomesubtitle">
              Manage patient records, monitor treatment progress, and coordinate with your medical team efficiently.
              Track patient statistics and team performance in real-time.
            </p>
          </div>

          {/* Patients Overview */}
          <div className="assistant-patients-overview">
            {patientsOverview.map(card => (
              <div key={card.id} className="assistant-patients-statscard">
                <div className="assistant-patients-cardheader">
                  <h3 className="assistant-patients-cardtitle">{card.title}</h3>
                  <div className="assistant-patients-cardicon" style={getCardIconStyle(card.color)}>
                    {card.icon}
                  </div>
                </div>
                <div className="assistant-patients-cardvalue">{card.value}</div>
                <div className="assistant-patients-cardinfo">{card.info}</div>
                <div className={`assistant-patients-cardtrend ${card.trendUp ? 'assistant-patients-trendup' : 'assistant-patients-trenddown'}`}>
                  {card.trendUp ? <FiTrendingUp /> : <FiTrendingDown />}
                  {card.trend} from last week
                </div>
              </div>
            ))}
          </div>

          {/* Patients Table */}
          <div className="assistant-patients-tablecontainer">
            <div className="assistant-patients-tableheader">
              <h3 className="assistant-patients-tabletitle">Patient Records</h3>
              <div className="assistant-patients-tablecontrols">
                <input
                  type="text"
                  className="assistant-patients-searchinput"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="assistant-patients-addbutton">
                  <FiUserPlus /> Add New Patient
                </button>
              </div>
            </div>
            
            <div className="assistant-patients-tablewrapper">
              <table className="assistant-patients-datatable">
                <thead className="assistant-patients-tablehead">
                  <tr className="assistant-patients-headerrow">
                    <th>Patient</th>
                    <th>Age/Gender</th>
                    <th>Condition</th>
                    <th>Doctor</th>
                    <th>Room</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map(patient => (
                    <tr key={patient.id} className="assistant-patients-tablerow">
                      <td>
                        <div className="assistant-patients-patientinfo">
                          <div className="assistant-patients-patientavatar">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="assistant-patients-patientname">{patient.name}</div>
                            <div className="assistant-patients-patientid">{patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{patient.age} yrs • {patient.gender}</td>
                      <td>{patient.condition}</td>
                      <td>{patient.doctor}</td>
                      <td>{patient.room}</td>
                      <td>
                        <span className={`assistant-patients-statusbadge ${getStatusBadgeClass(patient.status)}`}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="assistant-patients-actionbuttons">
                          <button className="assistant-patients-actionbtn" title="View Details">
                            <FiEye />
                          </button>
                          <button className="assistant-patients-actionbtn" title="Edit">
                            <FiEdit />
                          </button>
                          <button className="assistant-patients-actionbtn" title="Contact">
                            <FiMessageSquare />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team Management */}
          <div className="assistant-patients-teamcontainer">
            <div className="assistant-patients-teamheader">
              <h3 className="assistant-patients-teamtitle">Medical Team</h3>
              <div className="assistant-patients-teamfilter">
                <button 
                  className={`assistant-patients-filterbtn ${teamFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setTeamFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`assistant-patients-filterbtn ${teamFilter === 'doctors' ? 'active' : ''}`}
                  onClick={() => setTeamFilter('doctors')}
                >
                  Doctors
                </button>
                <button 
                  className={`assistant-patients-filterbtn ${teamFilter === 'nurses' ? 'active' : ''}`}
                  onClick={() => setTeamFilter('nurses')}
                >
                  Nurses
                </button>
                <button 
                  className={`assistant-patients-filterbtn ${teamFilter === 'staff' ? 'active' : ''}`}
                  onClick={() => setTeamFilter('staff')}
                >
                  Staff
                </button>
              </div>
            </div>
            
            <div className="assistant-patients-teamgrid">
              {filteredTeam.map(member => (
                <div key={member.id} className="assistant-patients-teamcard">
                  <div className="assistant-patients-teaminfo">
                    <div className="assistant-patients-teamavatar">
                      {member.avatar}
                    </div>
                    <div className="assistant-patients-teamdetails">
                      <h4 className="assistant-patients-teamname">{member.name}</h4>
                      <div className="assistant-patients-teamrole">
                        {member.role}
                        <span style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getMemberStatusColor(member.status),
                          display: 'inline-block'
                        }}></span>
                      </div>
                      <span className="assistant-patients-teamdepartment">
                        {member.department} • {member.experience}
                      </span>
                    </div>
                  </div>
                  
                  <div className="assistant-patients-teammetrics">
                    <div className="assistant-patients-metric">
                      <div className="assistant-patients-metricvalue">{member.patients}</div>
                      <div className="assistant-patients-metriclabel">Patients</div>
                    </div>
                    <div className="assistant-patients-metric">
                      <div className="assistant-patients-metricvalue">{member.rating}</div>
                      <div className="assistant-patients-metriclabel">Rating</div>
                    </div>
                    <div className="assistant-patients-metric">
                      <div className="assistant-patients-metricvalue">
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </div>
                      <div className="assistant-patients-metriclabel">Status</div>
                    </div>
                  </div>
                  
                  <div className="assistant-patients-teamactions">
                    <button className="assistant-patients-teamactionbtn">
                      <FiMessageSquare /> Message
                    </button>
                    <button className="assistant-patients-teamactionbtn">
                      <FiPhone /> Call
                    </button>
                    <button className="assistant-patients-teamactionbtn">
                      <FiEye /> Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="assistant-patients-activities">
            <div className="assistant-patients-activitiesheader">
              <h3 className="assistant-patients-activitiestitle">Recent Activities</h3>
            </div>
            
            <div className="assistant-patients-activitieslist">
              {activitiesData.map(activity => (
                <div key={activity.id} className="assistant-patients-activityitem">
                  <div className="assistant-patients-activityicon">
                    {activity.icon}
                  </div>
                  <div className="assistant-patients-activitycontent">
                    <div className="assistant-patients-activitytext">
                      {activity.text}
                    </div>
                    <div className="assistant-patients-activitytime">
                      <FiClock />
                      <span className="assistant-patients-activityuser">{activity.user}</span>
                      • {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="assistant-patients-quickstats">
            {quickStats.map((stat, index) => (
              <div key={index} className="assistant-patients-statbox">
                <div className="assistant-patients-statvalue">{stat.value}</div>
                <div className="assistant-patients-statlabel">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPatientsTeam;