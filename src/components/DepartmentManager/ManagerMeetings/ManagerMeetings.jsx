import React, { useState, useEffect } from 'react';
import './ManagerMeetings.css';

const ManagerMeetings = () => {
  const [activeView, setActiveView] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    agenda: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'department',
    department: '',
    participants: [],
    location: 'Conference Room A',
    priority: 'medium',
    status: 'scheduled'
  });

  // Sample meetings data
  const sampleMeetings = [
    {
      id: 1,
      title: 'Monthly Department Review',
      agenda: 'Review department performance and discuss improvement strategies',
      date: '2024-01-20',
      startTime: '10:00',
      endTime: '11:30',
      type: 'department',
      department: 'Cardiology',
      participants: ['Dr. Smith', 'Dr. Johnson', 'Nurse Manager', 'Admin Head'],
      location: 'Conference Room A',
      priority: 'high',
      status: 'scheduled',
      organizer: 'Dr. Smith',
      minutes: 'Pending',
      recording: false
    },
    {
      id: 2,
      title: 'Emergency Protocol Discussion',
      agenda: 'Discuss and update emergency response protocols',
      date: '2024-01-18',
      startTime: '14:00',
      endTime: '15:30',
      type: 'emergency',
      department: 'Emergency',
      participants: ['Emergency Head', 'Dr. Brown', 'Safety Officer', 'IT Head'],
      location: 'Emergency Meeting Room',
      priority: 'high',
      status: 'scheduled',
      organizer: 'Emergency Head',
      minutes: 'Pending',
      recording: true
    },
    {
      id: 3,
      title: 'Patient Safety Committee',
      agenda: 'Review patient safety incidents and prevention measures',
      date: '2024-01-15',
      startTime: '11:00',
      endTime: '12:30',
      type: 'committee',
      department: 'Quality Assurance',
      participants: ['QA Head', 'Dr. Wilson', 'Nursing Head', 'Pharmacist'],
      location: 'Board Room',
      priority: 'medium',
      status: 'completed',
      organizer: 'QA Head',
      minutes: 'Available',
      recording: true
    },
    {
      id: 4,
      title: 'Staff Training Planning',
      agenda: 'Plan monthly staff training sessions and skill development',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '10:00',
      type: 'training',
      department: 'HR',
      participants: ['HR Manager', 'Training Head', 'Department Heads'],
      location: 'Training Room 2',
      priority: 'medium',
      status: 'scheduled',
      organizer: 'HR Manager',
      minutes: 'Pending',
      recording: false
    },
    {
      id: 5,
      title: 'Equipment Procurement Review',
      agenda: 'Review equipment requirements and procurement process',
      date: '2024-01-17',
      startTime: '15:00',
      endTime: '16:30',
      type: 'procurement',
      department: 'Operations',
      participants: ['Operations Head', 'Finance Head', 'Medical Heads'],
      location: 'Conference Room B',
      priority: 'medium',
      status: 'in-progress',
      organizer: 'Operations Head',
      minutes: 'In Progress',
      recording: true
    },
    {
      id: 6,
      title: 'Infection Control Meeting',
      agenda: 'Discuss infection rates and control measures',
      date: '2024-01-14',
      startTime: '13:00',
      endTime: '14:00',
      type: 'medical',
      department: 'Infection Control',
      participants: ['IC Officer', 'Dr. Miller', 'Nursing Supervisor'],
      location: 'IC Department',
      priority: 'high',
      status: 'completed',
      organizer: 'IC Officer',
      minutes: 'Available',
      recording: false
    },
    {
      id: 7,
      title: 'Budget Planning Session',
      agenda: 'Quarterly budget review and planning for next quarter',
      date: '2024-01-25',
      startTime: '10:30',
      endTime: '12:00',
      type: 'finance',
      department: 'Finance',
      participants: ['Finance Head', 'Hospital Admin', 'Department Heads'],
      location: 'Finance Conference Room',
      priority: 'high',
      status: 'scheduled',
      organizer: 'Finance Head',
      minutes: 'Pending',
      recording: true
    },
    {
      id: 8,
      title: 'IT System Upgrade Discussion',
      agenda: 'Plan upcoming IT system upgrades and maintenance',
      date: '2024-01-19',
      startTime: '16:00',
      endTime: '17:00',
      type: 'it',
      department: 'IT',
      participants: ['IT Manager', 'System Admin', 'Department Representatives'],
      location: 'IT Meeting Room',
      priority: 'medium',
      status: 'scheduled',
      organizer: 'IT Manager',
      minutes: 'Pending',
      recording: false
    }
  ];

  useEffect(() => {
    setMeetings(sampleMeetings);
  }, []);

  const filteredMeetings = meetings.filter(meeting => {
    if (activeView === 'upcoming') {
      return meeting.status === 'scheduled' || meeting.status === 'in-progress';
    } else if (activeView === 'past') {
      return meeting.status === 'completed';
    } else if (activeView === 'cancelled') {
      return meeting.status === 'cancelled';
    } else if (activeView === 'all') {
      return true;
    }
    return meeting.type === activeView;
  }).filter(meeting => 
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.agenda.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMeeting = (e) => {
    e.preventDefault();
    const newId = meetings.length + 1;
    const meetingToAdd = {
      ...newMeeting,
      id: newId,
      organizer: 'Manager',
      minutes: 'Pending',
      recording: newMeeting.recording
    };
    
    setMeetings([...meetings, meetingToAdd]);
    setShowAddMeetingModal(false);
    resetNewMeeting();
  };

  const resetNewMeeting = () => {
    setNewMeeting({
      title: '',
      agenda: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'department',
      department: '',
      participants: [],
      location: 'Conference Room A',
      priority: 'medium',
      status: 'scheduled',
      recording: false
    });
  };

  const handleViewMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingDetailsModal(true);
  };

  const handleDeleteMeeting = (id) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      setMeetings(meetings.filter(meeting => meeting.id !== id));
    }
  };

  const handleStartMeeting = (id) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === id ? { ...meeting, status: 'in-progress' } : meeting
    ));
    alert('Meeting started!');
  };

  const handleEndMeeting = (id) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === id ? { ...meeting, status: 'completed' } : meeting
    ));
    alert('Meeting ended!');
  };

  const meetingTypes = [
    { id: 'all', name: 'All Meetings', icon: '📅', color: '#3498db' },
    { id: 'upcoming', name: 'Upcoming', icon: '⏰', color: '#2ecc71' },
    { id: 'past', name: 'Past Meetings', icon: '✅', color: '#95a5a6' },
    { id: 'department', name: 'Department', icon: '🏥', color: '#9b59b6' },
    { id: 'emergency', name: 'Emergency', icon: '🚨', color: '#e74c3c' },
    { id: 'committee', name: 'Committee', icon: '👥', color: '#f39c12' },
    { id: 'training', name: 'Training', icon: '🎓', color: '#1abc9c' },
    { id: 'finance', name: 'Finance', icon: '💰', color: '#27ae60' },
  ];

  const departments = [
    'Cardiology', 'Emergency', 'Surgery', 'Pediatrics', 'Orthopedics',
    'Neurology', 'Oncology', 'Radiology', 'Pathology', 'Pharmacy',
    'Nursing', 'Administration', 'HR', 'IT', 'Operations',
    'Quality Assurance', 'Infection Control', 'Maintenance'
  ];

  const meetingRooms = [
    'Conference Room A', 'Conference Room B', 'Board Room', 
    'Emergency Meeting Room', 'Training Room 1', 'Training Room 2',
    'IT Meeting Room', 'Finance Conference Room', 'Department Meeting Room'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#2ecc71' },
    { value: 'medium', label: 'Medium', color: '#f39c12' },
    { value: 'high', label: 'High', color: '#e74c3c' }
  ];

  const getMeetingStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const upcoming = meetings.filter(m => 
      (m.status === 'scheduled' || m.status === 'in-progress') && 
      new Date(m.date) >= new Date(today)
    ).length;
    
    const todayMeetings = meetings.filter(m => m.date === today).length;
    const highPriority = meetings.filter(m => m.priority === 'high' && m.status === 'scheduled').length;
    
    return { upcoming, todayMeetings, highPriority };
  };

  const stats = getMeetingStats();

  return (
    <div className="hms-meetings-container">
      {/* Header Section */}
      <div className="hms-meetings-header">
        <div className="hms-header-content">
          <h1 className="hms-main-title">Hospital Meetings Management</h1>
          <p className="hms-subtitle">Schedule, manage, and track hospital meetings efficiently</p>
        </div>
        <button 
          className="hms-add-meeting-btn"
          onClick={() => setShowAddMeetingModal(true)}
        >
          <i className="fas fa-plus-circle"></i> Schedule New Meeting
        </button>
      </div>

      {/* Quick Stats */}
      <div className="hms-meeting-stats">
        <div className="hms-stat-card">
          <div className="hms-stat-icon upcoming">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{stats.upcoming}</h3>
            <p>Upcoming Meetings</p>
          </div>
        </div>
        
        <div className="hms-stat-card">
          <div className="hms-stat-icon today">
            <i className="fas fa-clock"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{stats.todayMeetings}</h3>
            <p>Today's Meetings</p>
          </div>
        </div>
        
        <div className="hms-stat-card">
          <div className="hms-stat-icon high-priority">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{stats.highPriority}</h3>
            <p>High Priority</p>
          </div>
        </div>
        
        <div className="hms-stat-card">
          <div className="hms-stat-icon departments">
            <i className="fas fa-hospital-alt"></i>
          </div>
          <div className="hms-stat-content">
            <h3>{departments.length}</h3>
            <p>Departments</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="hms-meetings-controls">
        <div className="hms-search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search meetings by title, agenda, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hms-search-input"
          />
        </div>
        
        <div className="hms-quick-filters">
          <div className="hms-date-filter">
            <label>Filter by Date:</label>
            <input type="date" className="hms-date-input" />
          </div>
          <div className="hms-priority-filter">
            <label>Priority:</label>
            <select className="hms-priority-select">
              <option value="">All Priorities</option>
              {priorities.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Meeting Type Tabs */}
      <div className="hms-meeting-tabs">
        {meetingTypes.map(type => (
          <button
            key={type.id}
            className={`hms-meeting-tab ${activeView === type.id ? 'active' : ''}`}
            onClick={() => setActiveView(type.id)}
            style={{ '--tab-color': type.color }}
          >
            <span className="hms-tab-icon">{type.icon}</span>
            <span className="hms-tab-name">{type.name}</span>
            <span className="hms-tab-count">
              {type.id === 'all' ? meetings.length :
               type.id === 'upcoming' ? stats.upcoming :
               type.id === 'past' ? meetings.filter(m => m.status === 'completed').length :
               meetings.filter(m => m.type === type.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Meetings Grid/List */}
      <div className="hms-meetings-grid">
        {filteredMeetings.length === 0 ? (
          <div className="hms-no-meetings">
            <i className="fas fa-calendar-times"></i>
            <h3>No meetings found</h3>
            <p>Try adjusting your search or schedule a new meeting</p>
          </div>
        ) : (
          filteredMeetings.map(meeting => (
            <div key={meeting.id} className="hms-meeting-card">
              <div className="hms-meeting-header">
                <div className="hms-meeting-type">
                  <span className={`hms-type-badge ${meeting.type}`}>
                    {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
                  </span>
                  <span className={`hms-priority-badge ${meeting.priority}`}>
                    <i className={`fas fa-${meeting.priority === 'high' ? 'exclamation-triangle' : 
                                         meeting.priority === 'medium' ? 'exclamation-circle' : 'circle'}`}></i>
                    {meeting.priority}
                  </span>
                </div>
                <div className="hms-meeting-actions">
                  {meeting.status === 'scheduled' && (
                    <button 
                      className="hms-action-btn start"
                      onClick={() => handleStartMeeting(meeting.id)}
                      title="Start Meeting"
                    >
                      <i className="fas fa-play"></i>
                    </button>
                  )}
                  {meeting.status === 'in-progress' && (
                    <button 
                      className="hms-action-btn end"
                      onClick={() => handleEndMeeting(meeting.id)}
                      title="End Meeting"
                    >
                      <i className="fas fa-stop"></i>
                    </button>
                  )}
                  <button 
                    className="hms-action-btn view"
                    onClick={() => handleViewMeeting(meeting)}
                    title="View Details"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    className="hms-action-btn delete"
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              
              <div className="hms-meeting-body">
                <h3 className="hms-meeting-title">{meeting.title}</h3>
                <p className="hms-meeting-agenda">{meeting.agenda}</p>
                
                <div className="hms-meeting-details">
                  <div className="hms-detail-item">
                    <i className="fas fa-calendar-day"></i>
                    <div>
                      <span className="hms-detail-label">Date</span>
                      <span className="hms-detail-value">{meeting.date}</span>
                    </div>
                  </div>
                  
                  <div className="hms-detail-item">
                    <i className="fas fa-clock"></i>
                    <div>
                      <span className="hms-detail-label">Time</span>
                      <span className="hms-detail-value">{meeting.startTime} - {meeting.endTime}</span>
                    </div>
                  </div>
                  
                  <div className="hms-detail-item">
                    <i className="fas fa-hospital"></i>
                    <div>
                      <span className="hms-detail-label">Department</span>
                      <span className="hms-detail-value">{meeting.department}</span>
                    </div>
                  </div>
                  
                  <div className="hms-detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <span className="hms-detail-label">Location</span>
                      <span className="hms-detail-value">{meeting.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hms-participants">
                  <div className="hms-participants-header">
                    <i className="fas fa-users"></i>
                    <span>Participants ({meeting.participants.length})</span>
                  </div>
                  <div className="hms-participants-list">
                    {meeting.participants.slice(0, 3).map((participant, index) => (
                      <span key={index} className="hms-participant-tag">
                        {participant.split(' ')[0]}
                      </span>
                    ))}
                    {meeting.participants.length > 3 && (
                      <span className="hms-more-participants">
                        +{meeting.participants.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="hms-meeting-footer">
                <div className="hms-status-info">
                  <span className={`hms-status-badge ${meeting.status}`}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                  <span className="hms-organizer">
                    <i className="fas fa-user-tie"></i> {meeting.organizer}
                  </span>
                </div>
                <div className="hms-meeting-extras">
                  {meeting.recording && (
                    <span className="hms-recording-indicator">
                      <i className="fas fa-video"></i> Recording
                    </span>
                  )}
                  <span className="hms-minutes-indicator">
                    <i className="fas fa-file-alt"></i> {meeting.minutes}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Meetings Timeline */}
      <div className="hms-timeline-section">
        <h2 className="hms-timeline-title">
          <i className="fas fa-stream"></i> Today's Timeline
        </h2>
        <div className="hms-timeline">
          {meetings
            .filter(m => m.date === new Date().toISOString().split('T')[0])
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(meeting => (
              <div key={meeting.id} className="hms-timeline-item">
                <div className="hms-timeline-time">
                  <span>{meeting.startTime}</span>
                  <span className="hms-timeline-duration">- {meeting.endTime}</span>
                </div>
                <div className="hms-timeline-content">
                  <h4>{meeting.title}</h4>
                  <p className="hms-timeline-location">
                    <i className="fas fa-map-marker-alt"></i> {meeting.location}
                  </p>
                  <div className="hms-timeline-tags">
                    <span className={`hms-timeline-priority ${meeting.priority}`}>
                      {meeting.priority}
                    </span>
                    <span className="hms-timeline-department">
                      {meeting.department}
                    </span>
                  </div>
                </div>
                <button 
                  className="hms-timeline-action"
                  onClick={() => handleViewMeeting(meeting)}
                >
                  <i className="fas fa-external-link-alt"></i>
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Add Meeting Modal */}
      {showAddMeetingModal && (
        <div className="hms-modal-overlay">
          <div className="hms-modal-content">
            <div className="hms-modal-header">
              <h2>Schedule New Meeting</h2>
              <button 
                className="hms-modal-close"
                onClick={() => setShowAddMeetingModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddMeeting} className="hms-meeting-form">
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Meeting Title *</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    required
                    placeholder="Enter meeting title"
                  />
                </div>
                
                <div className="hms-form-group">
                  <label>Meeting Type *</label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                    required
                  >
                    <option value="department">Department Meeting</option>
                    <option value="emergency">Emergency Meeting</option>
                    <option value="committee">Committee Meeting</option>
                    <option value="training">Training Session</option>
                    <option value="finance">Finance Meeting</option>
                    <option value="it">IT Meeting</option>
                    <option value="medical">Medical Review</option>
                    <option value="procurement">Procurement Meeting</option>
                  </select>
                </div>
              </div>
              
              <div className="hms-form-group">
                <label>Agenda *</label>
                <textarea
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                  required
                  placeholder="Describe meeting agenda and objectives..."
                  rows="3"
                />
              </div>
              
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="hms-form-group">
                  <label>Start Time *</label>
                  <input
                    type="time"
                    value={newMeeting.startTime}
                    onChange={(e) => setNewMeeting({...newMeeting, startTime: e.target.value})}
                    required
                  />
                </div>
                
                <div className="hms-form-group">
                  <label>End Time *</label>
                  <input
                    type="time"
                    value={newMeeting.endTime}
                    onChange={(e) => setNewMeeting({...newMeeting, endTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Department *</label>
                  <select
                    value={newMeeting.department}
                    onChange={(e) => setNewMeeting({...newMeeting, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div className="hms-form-group">
                  <label>Location *</label>
                  <select
                    value={newMeeting.location}
                    onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                    required
                  >
                    {meetingRooms.map(room => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="hms-form-row">
                <div className="hms-form-group">
                  <label>Priority *</label>
                  <select
                    value={newMeeting.priority}
                    onChange={(e) => setNewMeeting({...newMeeting, priority: e.target.value})}
                    required
                  >
                    {priorities.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="hms-form-group">
                  <label className="hms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={newMeeting.recording}
                      onChange={(e) => setNewMeeting({...newMeeting, recording: e.target.checked})}
                    />
                    <span>Record Meeting</span>
                  </label>
                </div>
              </div>
              
              <div className="hms-form-group">
                <label>Participants (Add names separated by commas)</label>
                <input
                  type="text"
                  placeholder="e.g., Dr. Smith, Nurse Manager, Admin Head"
                  onChange={(e) => setNewMeeting({
                    ...newMeeting,
                    participants: e.target.value.split(',').map(p => p.trim()).filter(p => p)
                  })}
                />
              </div>
              
              <div className="hms-form-actions">
                <button
                  type="button"
                  className="hms-cancel-btn"
                  onClick={() => setShowAddMeetingModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="hms-submit-btn"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting Details Modal */}
      {showMeetingDetailsModal && selectedMeeting && (
        <div className="hms-modal-overlay">
          <div className="hms-modal-content details-modal">
            <div className="hms-modal-header">
              <h2>Meeting Details</h2>
              <button 
                className="hms-modal-close"
                onClick={() => setShowMeetingDetailsModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="hms-meeting-details-content">
              <div className="hms-details-header">
                <h3>{selectedMeeting.title}</h3>
                <div className="hms-details-tags">
                  <span className={`hms-details-type ${selectedMeeting.type}`}>
                    {selectedMeeting.type}
                  </span>
                  <span className={`hms-details-priority ${selectedMeeting.priority}`}>
                    {selectedMeeting.priority} Priority
                  </span>
                  <span className={`hms-details-status ${selectedMeeting.status}`}>
                    {selectedMeeting.status}
                  </span>
                </div>
              </div>
              
              <div className="hms-details-grid">
                <div className="hms-detail-card">
                  <div className="hms-detail-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="hms-detail-content">
                    <h4>Date & Time</h4>
                    <p>{selectedMeeting.date}</p>
                    <p className="hms-detail-subtext">{selectedMeeting.startTime} - {selectedMeeting.endTime}</p>
                  </div>
                </div>
                
                <div className="hms-detail-card">
                  <div className="hms-detail-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="hms-detail-content">
                    <h4>Location</h4>
                    <p>{selectedMeeting.location}</p>
                  </div>
                </div>
                
                <div className="hms-detail-card">
                  <div className="hms-detail-icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="hms-detail-content">
                    <h4>Department</h4>
                    <p>{selectedMeeting.department}</p>
                  </div>
                </div>
                
                <div className="hms-detail-card">
                  <div className="hms-detail-icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div className="hms-detail-content">
                    <h4>Organizer</h4>
                    <p>{selectedMeeting.organizer}</p>
                  </div>
                </div>
              </div>
              
              <div className="hms-agenda-section">
                <h4>Agenda</h4>
                <div className="hms-agenda-content">
                  {selectedMeeting.agenda}
                </div>
              </div>
              
              <div className="hms-participants-section">
                <h4>Participants ({selectedMeeting.participants.length})</h4>
                <div className="hms-participants-grid">
                  {selectedMeeting.participants.map((participant, index) => (
                    <div key={index} className="hms-participant-card">
                      <div className="hms-participant-avatar">
                        {participant.charAt(0)}
                      </div>
                      <div className="hms-participant-info">
                        <h5>{participant}</h5>
                        <p>Invited</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="hms-meeting-actions-details">
                {selectedMeeting.status === 'scheduled' && (
                  <button 
                    className="hms-action-btn start"
                    onClick={() => {
                      handleStartMeeting(selectedMeeting.id);
                      setShowMeetingDetailsModal(false);
                    }}
                  >
                    <i className="fas fa-play"></i> Start Meeting
                  </button>
                )}
                {selectedMeeting.status === 'in-progress' && (
                  <button 
                    className="hms-action-btn end"
                    onClick={() => {
                      handleEndMeeting(selectedMeeting.id);
                      setShowMeetingDetailsModal(false);
                    }}
                  >
                    <i className="fas fa-stop"></i> End Meeting
                  </button>
                )}
                <button className="hms-action-btn secondary">
                  <i className="fas fa-edit"></i> Edit Details
                </button>
                <button className="hms-action-btn secondary">
                  <i className="fas fa-file-export"></i> Export Minutes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerMeetings;