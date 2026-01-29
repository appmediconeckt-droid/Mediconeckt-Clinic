import React, { useState, useEffect } from 'react';
import './SuperAdminNotifications.css';

const SuperAdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    soundEnabled: true,
    desktopAlerts: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '06:00',
    digestFrequency: 'daily',
    importantOnly: false
  });

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: 'Security Alert: Multiple Failed Login Attempts',
      message: '5 failed login attempts detected from IP 203.0.113.5',
      type: 'security',
      priority: 'critical',
      timestamp: '2024-01-15 14:30:25',
      read: false,
      icon: 'fa-shield-alt',
      color: '#D63031',
      actions: [
        { label: 'Block IP', icon: 'fa-ban', action: 'block' },
        { label: 'Review Logs', icon: 'fa-file-alt', action: 'logs' }
      ]
    },
    {
      id: 2,
      title: 'System Performance Warning',
      message: 'CPU usage consistently above 85% for 15 minutes',
      type: 'performance',
      priority: 'high',
      timestamp: '2024-01-15 13:45:10',
      read: false,
      icon: 'fa-tachometer-alt',
      color: '#E17055',
      actions: [
        { label: 'View Metrics', icon: 'fa-chart-line', action: 'metrics' },
        { label: 'Optimize', icon: 'fa-wrench', action: 'optimize' }
      ]
    },
    {
      id: 3,
      title: 'Database Backup Completed Successfully',
      message: 'Nightly database backup completed. Size: 45.2 GB',
      type: 'backup',
      priority: 'low',
      timestamp: '2024-01-15 03:15:00',
      read: true,
      icon: 'fa-database',
      color: '#00B894',
      actions: [
        { label: 'Verify Backup', icon: 'fa-check-circle', action: 'verify' },
        { label: 'Download', icon: 'fa-download', action: 'download' }
      ]
    },
    {
      id: 4,
      title: 'New User Registration',
      message: 'John Doe (john.doe@example.com) registered as a new user',
      type: 'user',
      priority: 'medium',
      timestamp: '2024-01-15 10:20:15',
      read: false,
      icon: 'fa-user-plus',
      color: '#0984E3',
      actions: [
        { label: 'View Profile', icon: 'fa-user', action: 'profile' },
        { label: 'Approve', icon: 'fa-check', action: 'approve' }
      ]
    },
    {
      id: 5,
      title: 'SSL Certificate Expiring Soon',
      message: 'SSL certificate for admin.example.com expires in 15 days',
      type: 'security',
      priority: 'high',
      timestamp: '2024-01-14 18:45:30',
      read: true,
      icon: 'fa-lock',
      color: '#FDCB6E',
      actions: [
        { label: 'Renew Now', icon: 'fa-redo', action: 'renew' },
        { label: 'Schedule', icon: 'fa-calendar', action: 'schedule' }
      ]
    },
    {
      id: 6,
      title: 'API Rate Limit Exceeded',
      message: 'API gateway exceeded rate limit of 1000 requests/minute',
      type: 'api',
      priority: 'medium',
      timestamp: '2024-01-14 16:10:45',
      read: true,
      icon: 'fa-code',
      color: '#6C5CE7',
      actions: [
        { label: 'Adjust Limits', icon: 'fa-sliders-h', action: 'adjust' },
        { label: 'View Analytics', icon: 'fa-chart-bar', action: 'analytics' }
      ]
    },
    {
      id: 7,
      title: 'Storage Space Running Low',
      message: 'Only 15% storage space remaining on backup server',
      type: 'storage',
      priority: 'high',
      timestamp: '2024-01-14 12:30:20',
      read: false,
      icon: 'fa-hdd',
      color: '#E17055',
      actions: [
        { label: 'Clean Up', icon: 'fa-broom', action: 'cleanup' },
        { label: 'Add Storage', icon: 'fa-plus-circle', action: 'add' }
      ]
    },
    {
      id: 8,
      title: 'Scheduled Maintenance Complete',
      message: 'System maintenance completed successfully. All services restored.',
      type: 'system',
      priority: 'low',
      timestamp: '2024-01-14 04:00:00',
      read: true,
      icon: 'fa-tools',
      color: '#00CEC9',
      actions: [
        { label: 'View Report', icon: 'fa-file-alt', action: 'report' },
        { label: 'Schedule Next', icon: 'fa-calendar-alt', action: 'schedule' }
      ]
    },
    {
      id: 9,
      title: 'New Software Update Available',
      message: 'Version 3.2.1 available with security patches and performance improvements',
      type: 'update',
      priority: 'medium',
      timestamp: '2024-01-13 22:15:10',
      read: false,
      icon: 'fa-cloud-download-alt',
      color: '#0984E3',
      actions: [
        { label: 'Update Now', icon: 'fa-rocket', action: 'update' },
        { label: 'Release Notes', icon: 'fa-book', action: 'notes' }
      ]
    },
    {
      id: 10,
      title: 'Payment Received',
      message: 'Payment of $2,500 received from Acme Corp for enterprise plan',
      type: 'payment',
      priority: 'low',
      timestamp: '2024-01-13 14:40:35',
      read: true,
      icon: 'fa-money-bill-wave',
      color: '#00B894',
      actions: [
        { label: 'View Invoice', icon: 'fa-file-invoice', action: 'invoice' },
        { label: 'Send Receipt', icon: 'fa-receipt', action: 'receipt' }
      ]
    },
    {
      id: 11,
      title: 'User Account Locked',
      message: 'Account locked for user jane.smith@example.com due to multiple failed attempts',
      type: 'security',
      priority: 'medium',
      timestamp: '2024-01-13 11:25:50',
      read: true,
      icon: 'fa-user-lock',
      color: '#D63031',
      actions: [
        { label: 'Unlock Account', icon: 'fa-unlock', action: 'unlock' },
        { label: 'Reset Password', icon: 'fa-key', action: 'reset' }
      ]
    },
    {
      id: 12,
      title: 'High Traffic Alert',
      message: 'Unusual traffic spike detected - 250% increase in requests',
      type: 'performance',
      priority: 'high',
      timestamp: '2024-01-12 19:05:15',
      read: true,
      icon: 'fa-chart-line',
      color: '#E17055',
      actions: [
        { label: 'Scale Resources', icon: 'fa-server', action: 'scale' },
        { label: 'Traffic Analysis', icon: 'fa-chart-pie', action: 'analysis' }
      ]
    }
  ];

  const notificationTypes = [
    { id: 'all', label: 'All', icon: 'fa-bell', count: mockNotifications.length },
    { id: 'security', label: 'Security', icon: 'fa-shield-alt', count: mockNotifications.filter(n => n.type === 'security').length },
    { id: 'performance', label: 'Performance', icon: 'fa-tachometer-alt', count: mockNotifications.filter(n => n.type === 'performance').length },
    { id: 'system', label: 'System', icon: 'fa-cog', count: mockNotifications.filter(n => n.type === 'system').length },
    { id: 'user', label: 'User', icon: 'fa-users', count: mockNotifications.filter(n => n.type === 'user').length },
    { id: 'update', label: 'Updates', icon: 'fa-cloud-download-alt', count: mockNotifications.filter(n => n.type === 'update').length }
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
    updateUnreadCount();
  }, [activeFilter, notifications]);

  const loadNotifications = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  };

  const filterNotifications = () => {
    if (activeFilter === 'all') {
      setFilteredNotifications([...notifications]);
    } else if (activeFilter === 'unread') {
      setFilteredNotifications(notifications.filter(n => !n.read));
    } else {
      setFilteredNotifications(notifications.filter(n => n.type === activeFilter));
    }
  };

  const updateUnreadCount = () => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // Update browser tab title
    document.title = unread > 0 ? `(${unread}) Notifications - Super Admin` : 'Notifications - Super Admin';
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    if (selectedNotification?.id === id) {
      setSelectedNotification(prev => prev ? { ...prev, read: true } : null);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.read));
    setSelectedNotification(null);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleActionClick = (notificationId, action) => {
    console.log(`Action ${action} clicked for notification ${notificationId}`);
    // Handle different actions
    switch(action) {
      case 'block':
        alert('Block IP action triggered');
        break;
      case 'view':
        alert('View details action triggered');
        break;
      default:
        alert(`${action} action triggered`);
    }
    
    // Mark as read after action
    markAsRead(notificationId);
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'critical': return 'superadmin-notif-priority-critical';
      case 'high': return 'superadmin-notif-priority-high';
      case 'medium': return 'superadmin-notif-priority-medium';
      case 'low': return 'superadmin-notif-priority-low';
      default: return 'superadmin-notif-priority-info';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMs = now - notificationTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return notificationTime.toLocaleDateString();
  };

  const renderNotificationItem = (notification) => (
    <div 
      key={notification.id}
      className={`superadmin-notif-item ${notification.read ? '' : 'superadmin-notif-unread'} ${selectedNotification?.id === notification.id ? 'superadmin-notif-selected' : ''}`}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="superadmin-notif-item-header">
        <div className="superadmin-notif-icon" style={{ backgroundColor: notification.color }}>
          <i className={`fas ${notification.icon}`}></i>
        </div>
        
        <div className="superadmin-notif-content">
          <div className="superadmin-notif-title">
            {notification.title}
            {!notification.read && (
              <span className="superadmin-notif-unread-dot"></span>
            )}
          </div>
          <div className="superadmin-notif-time">{getTimeAgo(notification.timestamp)}</div>
        </div>
        
        <div className="superadmin-notif-priority">
          <span className={`superadmin-notif-priority-badge ${getPriorityBadgeClass(notification.priority)}`}>
            {notification.priority}
          </span>
        </div>
      </div>
      
      <div className="superadmin-notif-item-body">
        <div className="superadmin-notif-message">{notification.message}</div>
      </div>
      
      <div className="superadmin-notif-item-actions">
        <div className="superadmin-notif-actions">
          {notification.actions.map((action, index) => (
            <button
              key={index}
              className="superadmin-notif-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(notification.id, action.action);
              }}
            >
              <i className={`fas ${action.icon}`}></i>
              {action.label}
            </button>
          ))}
        </div>
        
        <div className="superadmin-notif-meta">
          <button 
            className="superadmin-notif-meta-btn"
            onClick={(e) => {
              e.stopPropagation();
              markAsRead(notification.id);
            }}
            title="Mark as read"
          >
            <i className="fas fa-check"></i>
          </button>
          
          <button 
            className="superadmin-notif-meta-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification(notification.id);
            }}
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="superadmin-notifications-container">
      {/* Header */}
      <div className="superadmin-notif-header">
        <div className="superadmin-notif-header-main">
          <h1 className="superadmin-notif-title">
            <i className="fas fa-crown superadmin-notif-crown"></i>
            Notifications Center
          </h1>
          <p className="superadmin-notif-subtitle">
            Stay updated with system alerts and important messages
          </p>
        </div>
        
        <div className="superadmin-notif-stats">
          <div className="superadmin-notif-stat-card">
            <div className="superadmin-notif-stat-icon">
              <i className="fas fa-bell"></i>
            </div>
            <div>
              <div className="superadmin-notif-stat-value">{notifications.length}</div>
              <div className="superadmin-notif-stat-label">Total</div>
            </div>
          </div>
          
          <div className="superadmin-notif-stat-card">
            <div className="superadmin-notif-stat-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <div className="superadmin-notif-stat-value">{unreadCount}</div>
              <div className="superadmin-notif-stat-label">Unread</div>
            </div>
          </div>
          
          <div className="superadmin-notif-stat-card">
            <div className="superadmin-notif-stat-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <div className="superadmin-notif-stat-value">
                {notifications.filter(n => n.priority === 'critical' || n.priority === 'high').length}
              </div>
              <div className="superadmin-notif-stat-label">Urgent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="superadmin-notif-actions-bar">
        <button 
          className="superadmin-notif-action-btn-primary"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <i className="fas fa-check-double"></i>
          Mark All as Read
        </button>
        
        <button 
          className="superadmin-notif-action-btn-secondary"
          onClick={deleteAllRead}
        >
          <i className="fas fa-trash"></i>
          Delete Read
        </button>
        
        <button 
          className="superadmin-notif-action-btn-secondary"
          onClick={() => setShowSettings(!showSettings)}
        >
          <i className="fas fa-cog"></i>
          Settings
        </button>
        
        <button 
          className="superadmin-notif-action-btn-secondary"
          onClick={loadNotifications}
          disabled={loading}
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
          Refresh
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="superadmin-notif-settings-panel">
          <div className="superadmin-notif-settings-header">
            <h3 className="superadmin-notif-settings-title">
              <i className="fas fa-sliders-h"></i>
              Notification Settings
            </h3>
            <button 
              className="superadmin-notif-settings-close"
              onClick={() => setShowSettings(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="superadmin-notif-settings-content">
            <div className="superadmin-notif-settings-grid">
              <div className="superadmin-notif-setting-item">
                <label className="superadmin-notif-setting-label">
                  <i className="fas fa-envelope"></i>
                  Email Alerts
                </label>
                <label className="superadmin-notif-setting-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.emailAlerts}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailAlerts: e.target.checked }))}
                  />
                  <span className="superadmin-notif-setting-toggle-slider"></span>
                </label>
              </div>
              
              <div className="superadmin-notif-setting-item">
                <label className="superadmin-notif-setting-label">
                  <i className="fas fa-bell"></i>
                  Push Notifications
                </label>
                <label className="superadmin-notif-setting-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                  />
                  <span className="superadmin-notif-setting-toggle-slider"></span>
                </label>
              </div>
              
              <div className="superadmin-notif-setting-item">
                <label className="superadmin-notif-setting-label">
                  <i className="fas fa-volume-up"></i>
                  Sound Alerts
                </label>
                <label className="superadmin-notif-setting-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.soundEnabled}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                  />
                  <span className="superadmin-notif-setting-toggle-slider"></span>
                </label>
              </div>
              
              <div className="superadmin-notif-setting-item">
                <label className="superadmin-notif-setting-label">
                  <i className="fas fa-desktop"></i>
                  Desktop Alerts
                </label>
                <label className="superadmin-notif-setting-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.desktopAlerts}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, desktopAlerts: e.target.checked }))}
                  />
                  <span className="superadmin-notif-setting-toggle-slider"></span>
                </label>
              </div>
              
              <div className="superadmin-notif-setting-item">
                <label className="superadmin-notif-setting-label">
                  <i className="fas fa-moon"></i>
                  Quiet Hours
                </label>
                <label className="superadmin-notif-setting-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.quietHours}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, quietHours: e.target.checked }))}
                  />
                  <span className="superadmin-notif-setting-toggle-slider"></span>
                </label>
              </div>
            </div>
            
            {notificationSettings.quietHours && (
              <div className="superadmin-notif-settings-time">
                <div className="superadmin-notif-setting-time-group">
                  <label>Start Time</label>
                  <input 
                    type="time" 
                    value={notificationSettings.quietStart}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, quietStart: e.target.value }))}
                    className="superadmin-notif-time-input"
                  />
                </div>
                
                <div className="superadmin-notif-setting-time-group">
                  <label>End Time</label>
                  <input 
                    type="time" 
                    value={notificationSettings.quietEnd}
                    onChange={(e) => setNotificationSettings(prev => ({ ...prev, quietEnd: e.target.value }))}
                    className="superadmin-notif-time-input"
                  />
                </div>
              </div>
            )}
            
            <div className="superadmin-notif-settings-frequency">
              <label className="superadmin-notif-setting-label">
                <i className="fas fa-calendar-alt"></i>
                Digest Frequency
              </label>
              <select 
                value={notificationSettings.digestFrequency}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, digestFrequency: e.target.value }))}
                className="superadmin-notif-frequency-select"
              >
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          
          <div className="superadmin-notif-settings-footer">
            <button className="superadmin-notif-settings-save-btn">
              <i className="fas fa-save"></i>
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="superadmin-notif-content">
        {/* Left Column - Filters & Notifications List */}
        <div className="superadmin-notif-left-column">
          {/* Filters */}
          <div className="superadmin-notif-filters">
            <h3 className="superadmin-notif-filters-title">
              <i className="fas fa-filter"></i>
              Filter by Type
            </h3>
            
            <div className="superadmin-notif-filters-list">
              {notificationTypes.map(type => (
                <button
                  key={type.id}
                  className={`superadmin-notif-filter-btn ${activeFilter === type.id ? 'superadmin-notif-filter-active' : ''}`}
                  onClick={() => setActiveFilter(type.id)}
                >
                  <div className="superadmin-notif-filter-icon">
                    <i className={`fas ${type.icon}`}></i>
                  </div>
                  <div className="superadmin-notif-filter-info">
                    <div className="superadmin-notif-filter-label">{type.label}</div>
                    <div className="superadmin-notif-filter-count">{type.count}</div>
                  </div>
                </button>
              ))}
              
              <button
                className={`superadmin-notif-filter-btn ${activeFilter === 'unread' ? 'superadmin-notif-filter-active' : ''}`}
                onClick={() => setActiveFilter('unread')}
              >
                <div className="superadmin-notif-filter-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="superadmin-notif-filter-info">
                  <div className="superadmin-notif-filter-label">Unread</div>
                  <div className="superadmin-notif-filter-count">{unreadCount}</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Notifications List */}
          <div className="superadmin-notif-list-container">
            <div className="superadmin-notif-list-header">
              <h3 className="superadmin-notif-list-title">
                <i className="fas fa-list"></i>
                Notifications
                <span className="superadmin-notif-list-count">{filteredNotifications.length}</span>
              </h3>
              
              <div className="superadmin-notif-list-search">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search notifications..."
                  className="superadmin-notif-search-input"
                />
              </div>
            </div>
            
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
                ) : filteredNotifications.length === 0 ? (
              <div className="superadmin-notif-empty">
                <i className="fas fa-bell-slash"></i>
                <h3>No notifications found</h3>
                <p>You're all caught up! No new notifications at the moment.</p>
              </div>
            ) : (
              <div className="superadmin-notif-list">
                {filteredNotifications.map(renderNotificationItem)}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Notification Details & Stats */}
        <div className="superadmin-notif-right-column">
          {/* Notification Details */}
          {selectedNotification ? (
            <div className="superadmin-notif-details-panel">
              <div className="superadmin-notif-details-header">
                <div className="superadmin-notif-details-title">
                  <div className="superadmin-notif-details-icon" style={{ backgroundColor: selectedNotification.color }}>
                    <i className={`fas ${selectedNotification.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="superadmin-notif-details-title-text">{selectedNotification.title}</h3>
                    <div className="superadmin-notif-details-meta">
                      <span className={`superadmin-notif-details-priority ${getPriorityBadgeClass(selectedNotification.priority)}`}>
                        {selectedNotification.priority}
                      </span>
                      <span className="superadmin-notif-details-time">{selectedNotification.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="superadmin-notif-details-close"
                  onClick={() => setSelectedNotification(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="superadmin-notif-details-body">
                <div className="superadmin-notif-details-section">
                  <h4 className="superadmin-notif-details-subtitle">
                    <i className="fas fa-comment-alt"></i>
                    Message
                  </h4>
                  <div className="superadmin-notif-details-message">
                    {selectedNotification.message}
                  </div>
                </div>
                
                <div className="superadmin-notif-details-section">
                  <h4 className="superadmin-notif-details-subtitle">
                    <i className="fas fa-info-circle"></i>
                    Details
                  </h4>
                  <div className="superadmin-notif-details-info">
                    <div className="superadmin-notif-detail-item">
                      <label>Type</label>
                      <div className="superadmin-notif-detail-value">{selectedNotification.type}</div>
                    </div>
                    
                    <div className="superadmin-notif-detail-item">
                      <label>Priority</label>
                      <div className="superadmin-notif-detail-value">
                        <span className={`superadmin-notif-priority-badge ${getPriorityBadgeClass(selectedNotification.priority)}`}>
                          {selectedNotification.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="superadmin-notif-detail-item">
                      <label>Status</label>
                      <div className="superadmin-notif-detail-value">
                        <span className={`superadmin-notif-status ${selectedNotification.read ? 'superadmin-notif-status-read' : 'superadmin-notif-status-unread'}`}>
                          {selectedNotification.read ? 'Read' : 'Unread'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="superadmin-notif-detail-item">
                      <label>Timestamp</label>
                      <div className="superadmin-notif-detail-value">{selectedNotification.timestamp}</div>
                    </div>
                    
                    <div className="superadmin-notif-detail-item">
                      <label>Time Ago</label>
                      <div className="superadmin-notif-detail-value">{getTimeAgo(selectedNotification.timestamp)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="superadmin-notif-details-section">
                  <h4 className="superadmin-notif-details-subtitle">
                    <i className="fas fa-bolt"></i>
                    Quick Actions
                  </h4>
                  <div className="superadmin-notif-details-actions">
                    {selectedNotification.actions.map((action, index) => (
                      <button
                        key={index}
                        className="superadmin-notif-details-action-btn"
                        onClick={() => handleActionClick(selectedNotification.id, action.action)}
                      >
                        <i className={`fas ${action.icon}`}></i>
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="superadmin-notif-details-footer">
                <button 
                  className="superadmin-notif-details-footer-btn"
                  onClick={() => markAsRead(selectedNotification.id)}
                  disabled={selectedNotification.read}
                >
                  <i className="fas fa-check"></i>
                  {selectedNotification.read ? 'Already Read' : 'Mark as Read'}
                </button>
                
                <button 
                  className="superadmin-notif-details-footer-btn"
                  onClick={() => deleteNotification(selectedNotification.id)}
                >
                  <i className="fas fa-trash"></i>
                  Delete Notification
                </button>
                
                <button 
                  className="superadmin-notif-details-footer-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selectedNotification, null, 2));
                    alert('Notification details copied to clipboard!');
                  }}
                >
                  <i className="fas fa-copy"></i>
                  Copy Details
                </button>
              </div>
            </div>
          ) : (
            <div className="superadmin-notif-stats-panel">
              {/* Statistics */}
              <div className="superadmin-notif-stats-card">
                <h3 className="superadmin-notif-stats-title">
                  <i className="fas fa-chart-pie"></i>
                  Notification Statistics
                </h3>
                
                <div className="superadmin-notif-stats-content">
                  <div className="superadmin-notif-stat-chart">
                    {['critical', 'high', 'medium', 'low'].map(priority => {
                      const count = notifications.filter(n => n.priority === priority).length;
                      const percentage = (count / notifications.length) * 100;
                      
                      return (
                        <div key={priority} className="superadmin-notif-stat-chart-item">
                          <div className="superadmin-notif-stat-chart-label">
                            <span className={`superadmin-notif-stat-chart-dot ${getPriorityBadgeClass(priority)}`}></span>
                            {priority}
                          </div>
                          <div className="superadmin-notif-stat-chart-bar">
                            <div 
                              className={`superadmin-notif-stat-chart-fill ${getPriorityBadgeClass(priority)}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="superadmin-notif-stat-chart-value">
                            {count} ({percentage.toFixed(1)}%)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="superadmin-notif-stats-card">
                <h3 className="superadmin-notif-stats-title">
                  <i className="fas fa-history"></i>
                  Recent Activity
                </h3>
                
                <div className="superadmin-notif-activity-list">
                  {notifications.slice(0, 5).map(notification => (
                    <div key={notification.id} className="superadmin-notif-activity-item">
                      <div className="superadmin-notif-activity-icon" style={{ color: notification.color }}>
                        <i className={`fas ${notification.icon}`}></i>
                      </div>
                      <div className="superadmin-notif-activity-content">
                        <div className="superadmin-notif-activity-title">{notification.title}</div>
                        <div className="superadmin-notif-activity-meta">
                          <span className="superadmin-notif-activity-time">{getTimeAgo(notification.timestamp)}</span>
                          <span className={`superadmin-notif-activity-priority ${getPriorityBadgeClass(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="superadmin-notif-activity-unread"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="superadmin-notif-stats-card">
                <h3 className="superadmin-notif-stats-title">
                  <i className="fas fa-lightbulb"></i>
                  Notification Tips
                </h3>
                
                <div className="superadmin-notif-tips">
                  <div className="superadmin-notif-tip">
                    <i className="fas fa-check-circle"></i>
                    Review high-priority notifications immediately
                  </div>
                  <div className="superadmin-notif-tip">
                    <i className="fas fa-check-circle"></i>
                    Keep unread notifications under 10 for better focus
                  </div>
                  <div className="superadmin-notif-tip">
                    <i className="fas fa-check-circle"></i>
                    Use quiet hours during focused work sessions
                  </div>
                  <div className="superadmin-notif-tip">
                    <i className="fas fa-check-circle"></i>
                    Configure email digests for non-urgent notifications
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="superadmin-notif-footer">
        <div className="superadmin-notif-footer-info">
          <div className="superadmin-notif-footer-stat">
            <i className="fas fa-bell"></i>
            <div>
              <div className="superadmin-notif-footer-value">Last notification: {notifications.length > 0 ? getTimeAgo(notifications[0].timestamp) : 'N/A'}</div>
              <div className="superadmin-notif-footer-label">Latest Activity</div>
            </div>
          </div>
          
          <div className="superadmin-notif-footer-stat">
            <i className="fas fa-clock"></i>
            <div>
              <div className="superadmin-notif-footer-value">Auto-refresh: 30s</div>
              <div className="superadmin-notif-footer-label">Refresh Rate</div>
            </div>
          </div>
          
          <div className="superadmin-notif-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="superadmin-notif-footer-value">Alert Retention: 90 days</div>
              <div className="superadmin-notif-footer-label">Storage Policy</div>
            </div>
          </div>
        </div>
        
        <div className="superadmin-notif-footer-actions">
          <button className="superadmin-notif-footer-btn">
            <i className="fas fa-download"></i>
            Export Logs
          </button>
          <button className="superadmin-notif-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help & Support
          </button>
          <button className="superadmin-notif-footer-btn">
            <i className="fas fa-bell-slash"></i>
            Snooze Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNotifications; 