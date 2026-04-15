import React, { useState, useEffect } from 'react';
import './PatientNotification.css';

const PatientNotification = () => {
  // State for notifications
  const [notifications, setNotifications] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'type', 'priority'
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-switch to card view on mobile
      if (window.innerWidth <= 768 && viewMode === 'table') {
        setViewMode('card');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  // Initialize notifications
  useEffect(() => {
    const initialNotifications = [
      { 
        id: 1, 
        type: 'confirmation', 
        title: 'Instant Confirmation', 
        description: 'Your appointment is confirmed for tomorrow', 
        time: '10:30 AM', 
        date: 'Today',
        priority: 'high',
        category: 'appointment',
        read: true 
      },
      { 
        id: 2, 
        type: 'reminder', 
        title: 'Reminder (1 Day Before)', 
        description: 'Don\'t forget your appointment tomorrow', 
        time: '9:00 AM', 
        date: 'Yesterday',
        priority: 'medium',
        category: 'reminder',
        read: true 
      },
      { 
        id: 3, 
        type: 'reminder', 
        title: 'Reminder (1 Hour Before)', 
        description: 'Your appointment starts in 1 hour', 
        time: '10:00 AM', 
        date: 'Today',
        priority: 'high',
        category: 'reminder',
        read: true 
      },
      { 
        id: 4, 
        type: 'appointment', 
        title: 'Appointment Started', 
        description: 'Dr. Smith has started your consultation', 
        time: '10:30 AM', 
        date: 'Today',
        priority: 'high',
        category: 'appointment',
        read: false 
      },
      { 
        id: 5, 
        type: 'appointment', 
        title: 'Appointment Completed', 
        description: 'Your consultation has been completed', 
        time: '11:30 AM', 
        date: 'Today',
        priority: 'medium',
        category: 'appointment',
        read: false 
      },
      { 
        id: 6, 
        type: 'payment', 
        title: 'Payment Success', 
        description: 'Payment of $150 has been processed successfully', 
        time: '11:35 AM', 
        date: 'Today',
        priority: 'low',
        category: 'payment',
        read: false 
      },
      { 
        id: 7, 
        type: 'prescription', 
        title: 'Prescription Ready', 
        description: 'Your prescription is ready for download', 
        time: '2:30 PM', 
        date: 'Yesterday',
        priority: 'medium',
        category: 'medical',
        read: true 
      },
      { 
        id: 8, 
        type: 'lab', 
        title: 'Test Results Available', 
        description: 'Your lab test results are now available', 
        time: '3:45 PM', 
        date: '2 days ago',
        priority: 'low',
        category: 'medical',
        read: true 
      },
    ];

    setNotifications(initialNotifications);
  }, []);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'date') {
      const dateOrder = { 'Today': 0, 'Yesterday': 1, '2 days ago': 2, 'Older': 3 };
      return dateOrder[a.date] - dateOrder[b.date];
    }
    if (sortBy === 'priority') {
      const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Delete notification
  const deleteNotification = (id, e) => {
    if (e) e.stopPropagation();
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Add a new notification for testing
  const addTestNotification = () => {
    const newId = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
    const types = ['appointment', 'payment', 'reminder', 'confirmation', 'prescription', 'lab'];
    const titles = [
      'New Appointment Scheduled',
      'Payment Processing',
      'Upcoming Appointment Reminder',
      'Doctor Rescheduled Appointment',
      'Prescription Ready',
      'Test Results Available',
      'Medical Report Generated',
      'Follow-up Appointment'
    ];

    const descriptions = [
      'Your appointment has been rescheduled to next Monday',
      'Your payment is being processed',
      'Your appointment is in 2 days',
      'Dr. Johnson has rescheduled your appointment',
      'Your prescription is ready for pickup',
      'Your lab test results are now available',
      'Your medical report has been generated',
      'Follow-up appointment scheduled for next week'
    ];

    const priorities = ['high', 'medium', 'low'];
    const categories = ['appointment', 'payment', 'reminder', 'medical'];

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const newNotification = {
      id: newId,
      type: randomType,
      title: randomTitle,
      description: randomDesc,
      time: 'Just now',
      date: 'Today',
      priority: randomPriority,
      category: randomCategory,
      read: false
    };

    setNotifications([newNotification, ...notifications]);
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  // Get type icon
  const getTypeIcon = (type) => {
    switch(type) {
      case 'confirmation': return 'fas fa-check-circle';
      case 'reminder': return 'fas fa-bell';
      case 'appointment': return 'fas fa-calendar-check';
      case 'payment': return 'fas fa-credit-card';
      case 'prescription': return 'fas fa-prescription-bottle';
      case 'lab': return 'fas fa-flask';
      default: return 'fas fa-info-circle';
    }
  };

  // Get priority icon
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return 'fas fa-exclamation-circle';
      case 'medium': return 'fas fa-exclamation-triangle';
      case 'low': return 'fas fa-arrow-down';
      default: return 'fas fa-circle';
    }
  };

  return (
    <div className="patient-notification-container">
      <header className="patient-notification-header">
        <div className="header-content">
          <h1 className="patient-notification-title">
            <i className="fas fa-bell"></i> Notifications
          </h1>
          <p className="patient-notification-subtitle">
            Stay updated with your healthcare activities
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-box total">
            <i className="fas fa-envelope"></i>
            <div>
              <span className="stat-number">{totalCount}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-box unread">
            <i className="fas fa-envelope-open"></i>
            <div>
              <span className="stat-number">{unreadCount}</span>
              <span className="stat-label">Unread</span>
            </div>
          </div>
        </div>
      </header>

      <div className="patient-notification-controls">
        <div className="controls-left">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
            <button 
              className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read
            </button>
          </div>

          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>
        </div>

        <div className="controls-right">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <i className="fas fa-table"></i>
            </button>
            <button 
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
              title="Card View"
            >
              <i className="fas fa-th-large"></i>
            </button>
          </div>

          <div className="action-buttons">
            <button className="action-btn mark-all-btn" onClick={markAllAsRead}>
              <i className="fas fa-check-double"></i>
              {!isMobile && ' Mark All Read'}
            </button>
            <button className="action-btn add-btn" onClick={addTestNotification}>
              <i className="fas fa-plus"></i>
              {!isMobile && ' Add Test'}
            </button>
            <button className="action-btn clear-btn" onClick={clearAllNotifications}>
              <i className="fas fa-trash"></i>
              {!isMobile && ' Clear All'}
            </button>
          </div>
        </div>
      </div>

      <div className="patient-notification-main">
        {sortedNotifications.length === 0 ? (
          <div className="patient-notification-empty">
            <div className="empty-icon">
              <i className="fas fa-bell-slash"></i>
            </div>
            <h3>No notifications found</h3>
            <p>You're all caught up! New notifications will appear here.</p>
            <button className="action-btn add-btn" onClick={addTestNotification}>
              <i className="fas fa-plus"></i> Add Test Notification
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <div className="notification-table-container">
            <table className="notification-table">
              <thead>
                <tr>
                  <th className="status-col">Status</th>
                  <th className="type-col">Type</th>
                  <th className="title-col">Title & Description</th>
                  <th className="priority-col">Priority</th>
                  <th className="date-col">Date & Time</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedNotifications.map(notification => (
                  <tr 
                    key={notification.id} 
                    className={`notification-row ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <td className="status-cell">
                      {!notification.read && (
                        <span className="unread-indicator">
                          <i className="fas fa-circle"></i>
                        </span>
                      )}
                    </td>
                    <td className="type-cell">
                      <div className="type-badge">
                        <i className={getTypeIcon(notification.type)}></i>
                        <span>{notification.type}</span>
                      </div>
                    </td>
                    <td className="title-cell">
                      <div className="notification-info">
                        <h4 className="notification-title">{notification.title}</h4>
                        <p className="notification-description">{notification.description}</p>
                      </div>
                    </td>
                    <td className="priority-cell">
                      <div className={`priority-badge ${notification.priority}`}>
                        <i className={getPriorityIcon(notification.priority)}></i>
                        <span>{notification.priority}</span>
                      </div>
                    </td>
                    <td className="date-cell">
                      <div className="datetime-info">
                        <div className="date">{notification.date}</div>
                        <div className="time">{notification.time}</div>
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="table-actions">
                        {!notification.read && (
                          <button 
                            className="action-icon mark-read-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            title="Mark as read"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                        <button 
                          className="action-icon delete-btn"
                          onClick={(e) => deleteNotification(notification.id, e)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="notification-cards">
            {sortedNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-card ${notification.read ? 'read' : 'unread'} ${notification.priority}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="patient-notification-card-header">
                  <div className="card-type">
                    <i className={getTypeIcon(notification.type)}></i>
                    <span className="type-label">{notification.type}</span>
                  </div>
                  <div className={`priority-indicator ${notification.priority}`}>
                    <i className={getPriorityIcon(notification.priority)}></i>
                  </div>
                </div>
                
                <div className="card-body">
                  <h3 className="card-title">{notification.title}</h3>
                  <p className="card-description">{notification.description}</p>
                </div>
                
                <div className="patient-card-footer">
                  <div className="datetime">
                    <i className="far fa-calendar"></i>
                    <span>{notification.date}</span>
                    <i className="far fa-clock"></i>
                    <span>{notification.time}</span>
                  </div>
                  
                  <div className="card-actions">
                    {!notification.read && (
                      <button 
                        className="card-action-btn mark-read"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    )}
                    <button 
                      className="card-action-btn delete"
                      onClick={(e) => deleteNotification(notification.id, e)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                {!notification.read && (
                  <div className="unread-badge">NEW</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="patient-notification-footer">
        <div className="footer-content">
          <div className="footer-info">
            <i className="fas fa-info-circle"></i>
            <span>Notifications are automatically cleared after 30 days</span>
          </div>
          <div className="footer-stats">
            <span className="stat">
              <i className="fas fa-eye"></i>
              {sortedNotifications.length} shown
            </span>
            <span className="stat">
              <i className="fas fa-filter"></i>
              Filter: {filter}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientNotification;