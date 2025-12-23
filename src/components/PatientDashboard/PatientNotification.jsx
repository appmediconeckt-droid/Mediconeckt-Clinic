import React, { useState, useEffect } from 'react';
import './PatientNotification.css';

const PatientNotification = () => {
  // State for notifications
  const [notifications, setNotifications] = useState([]);
  
  // Initialize notifications
  useEffect(() => {
    const initialNotifications = [
      { id: 1, type: 'confirmation', title: 'Instant Confirmation', description: 'Your appointment is confirmed for tomorrow', time: '10:30 AM', date: 'Today', read: true },
      { id: 2, type: 'reminder', title: 'Reminder (1 Day Before)', description: 'Don\'t forget your appointment tomorrow', time: '9:00 AM', date: 'Yesterday', read: true },
      { id: 3, type: 'reminder', title: 'Reminder (1 Hour Before)', description: 'Your appointment starts in 1 hour', time: '10:00 AM', date: 'Today', read: true },
      { id: 4, type: 'appointment', title: 'Appointment Started', description: 'Dr. Smith has started your consultation', time: '10:30 AM', date: 'Today', read: false },
      { id: 5, type: 'appointment', title: 'Appointment Completed', description: 'Your consultation has been completed', time: '11:30 AM', date: 'Today', read: false },
      { id: 6, type: 'payment', title: 'Payment Success', description: 'Payment of $150 has been processed successfully', time: '11:35 AM', date: 'Today', read: false },
    ];
    
    setNotifications(initialNotifications);
  }, []);
  
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
    e.stopPropagation();
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Add a new notification for testing
  const addTestNotification = () => {
    const newId = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
    const types = ['appointment', 'payment', 'reminder', 'confirmation'];
    const titles = [
      'New Appointment Scheduled',
      'Payment Processing',
      'Upcoming Appointment Reminder',
      'Doctor Rescheduled Appointment',
      'Prescription Ready',
      'Test Results Available'
    ];
    
    const descriptions = [
      'Your appointment has been rescheduled to next Monday',
      'Your payment is being processed',
      'Your appointment is in 2 days',
      'Dr. Johnson has rescheduled your appointment',
      'Your prescription is ready for pickup',
      'Your lab test results are now available'
    ];
    
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    const newNotification = {
      id: newId,
      type: randomType,
      title: randomTitle,
      description: randomDesc,
      time: 'Just now',
      date: 'Today',
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
  
  return (
    <div className="patient-notification-container">
      <header className="patient-notification-header">
        <h1 className="patient-notification-title">Patient Notifications</h1>
        <p className="patient-notification-subtitle">Stay updated with your appointments and payments</p>
      </header>
      
      <div className="patient-notification-main">
        <div className="patient-notification-panel">
          <div className="patient-notification-panel-header">
            <div className="patient-notification-header-left">
              <h2 className="patient-notification-panel-title">All Notifications</h2>
              <span className="patient-notification-unread-count">{unreadCount} unread</span>
            </div>
            
            <div className="patient-notification-header-actions">
              <button className="patient-notification-action-btn mark-all-btn" onClick={markAllAsRead}>
                <i className="fas fa-check-double"></i> Mark all as read
              </button>
              <button className="patient-notification-action-btn add-btn" onClick={addTestNotification}>
                <i className="fas fa-plus"></i> Add Test
              </button>
              <button className="patient-notification-action-btn clear-btn" onClick={clearAllNotifications}>
                <i className="fas fa-trash"></i> Clear All
              </button>
            </div>
          </div>
          
          {notifications.length === 0 ? (
            <div className="patient-notification-empty">
              <div className="empty-icon">📭</div>
              <h3>No notifications yet</h3>
              <p>You're all caught up! New notifications will appear here.</p>
              <button className="patient-notification-action-btn add-btn" onClick={addTestNotification}>
                <i className="fas fa-plus"></i> Add Test Notification
              </button>
            </div>
          ) : (
            <div className="patient-notification-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`patient-notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="patient-notification-item-icon">
                    {notification.type === 'confirmation' && <div className="notification-icon confirmation"><i className="fas fa-check-circle"></i></div>}
                    {notification.type === 'reminder' && <div className="notification-icon reminder"><i className="fas fa-bell"></i></div>}
                    {notification.type === 'appointment' && <div className="notification-icon appointment"><i className="fas fa-calendar-check"></i></div>}
                    {notification.type === 'payment' && <div className="notification-icon payment"><i className="fas fa-credit-card"></i></div>}
                  </div>
                  
                  <div className="patient-notification-item-content">
                    <div className="patient-notification-item-header">
                      <h3 className="patient-notification-item-title">{notification.title}</h3>
                      <span className="patient-notification-item-time">{notification.time}</span>
                    </div>
                    <p className="patient-notification-item-description">{notification.description}</p>
                    <div className="patient-notification-item-footer">
                      <span className="patient-notification-item-date">{notification.date}</span>
                      <span className={`patient-notification-item-type ${notification.type}`}>{notification.type}</span>
                    </div>
                  </div>
                  
                  <div className="patient-notification-item-actions">
                    {!notification.read && (
                      <span className="unread-badge">NEW</span>
                    )}
                    <button 
                      className="patient-notification-delete-btn" 
                      onClick={(e) => deleteNotification(notification.id, e)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="patient-notification-footer">
        <p className="patient-footer-text">
          <i className="fas fa-info-circle"></i> Notifications are automatically cleared after 30 days
        </p>
      </footer>
    </div>
  );
};

export default PatientNotification;