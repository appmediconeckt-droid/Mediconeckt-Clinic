import React, { useState, useEffect } from 'react';
import './SuperAdminBackupRestore.css';

const SuperAdminBackupRestore = () => {
  const [backups, setBackups] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [activeTab, setActiveTab] = useState('backups');
  const [loading, setLoading] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(null);
  const [storageMetrics, setStorageMetrics] = useState(null);

  // Mock backups data
  const mockBackups = [
    {
      id: 1,
      name: 'Full_System_Backup_2024-01-15',
      type: 'full',
      size: '45.2 GB',
      status: 'completed',
      createdAt: '2024-01-15 02:00:00',
      completedAt: '2024-01-15 03:30:00',
      location: 'Primary DC - NAS',
      retentionDays: 90,
      verified: true,
      checksum: 'a1b2c3d4e5f67890',
      includes: ['Database', 'Files', 'Configurations', 'Logs']
    },
    {
      id: 2,
      name: 'Database_Backup_2024-01-14',
      type: 'incremental',
      size: '12.8 GB',
      status: 'completed',
      createdAt: '2024-01-14 02:00:00',
      completedAt: '2024-01-14 02:45:00',
      location: 'Secondary DC - Cloud',
      retentionDays: 30,
      verified: true,
      checksum: 'b2c3d4e5f67890a1',
      includes: ['Database Only']
    },
    {
      id: 3,
      name: 'Configuration_Backup_2024-01-13',
      type: 'partial',
      size: '2.1 GB',
      status: 'completed',
      createdAt: '2024-01-13 02:00:00',
      completedAt: '2024-01-13 02:15:00',
      location: 'Primary DC - NAS',
      retentionDays: 365,
      verified: true,
      checksum: 'c3d4e5f67890a1b2',
      includes: ['System Config', 'Security Settings']
    },
    {
      id: 4,
      name: 'Weekly_Full_Backup_2024-01-12',
      type: 'full',
      size: '44.8 GB',
      status: 'completed',
      createdAt: '2024-01-12 02:00:00',
      completedAt: '2024-01-12 03:25:00',
      location: 'Both Locations',
      retentionDays: 90,
      verified: true,
      checksum: 'd4e5f67890a1b2c3',
      includes: ['Database', 'Files', 'Configurations']
    },
    {
      id: 5,
      name: 'Database_Backup_2024-01-11',
      type: 'incremental',
      size: '1.2 GB',
      status: 'failed',
      createdAt: '2024-01-11 02:00:00',
      completedAt: null,
      location: 'Primary DC - NAS',
      retentionDays: 30,
      verified: false,
      checksum: null,
      includes: ['Database Only'],
      error: 'Storage quota exceeded'
    },
    {
      id: 6,
      name: 'Emergency_Backup_2024-01-10',
      type: 'full',
      size: '45.5 GB',
      status: 'completed',
      createdAt: '2024-01-10 14:30:00',
      completedAt: '2024-01-10 16:00:00',
      location: 'Secondary DC - Cloud',
      retentionDays: 90,
      verified: true,
      checksum: 'e5f67890a1b2c3d4',
      includes: ['Full System']
    },
    {
      id: 7,
      name: 'User_Files_Backup_2024-01-09',
      type: 'partial',
      size: '18.3 GB',
      status: 'completed',
      createdAt: '2024-01-09 02:00:00',
      completedAt: '2024-01-09 02:45:00',
      location: 'Primary DC - NAS',
      retentionDays: 60,
      verified: true,
      checksum: 'f67890a1b2c3d4e5',
      includes: ['User Uploads', 'Documents']
    },
    {
      id: 8,
      name: 'Scheduled_Backup_2024-01-08',
      type: 'incremental',
      size: '0.8 GB',
      status: 'in_progress',
      createdAt: '2024-01-08 02:00:00',
      completedAt: null,
      location: 'Both Locations',
      retentionDays: 30,
      verified: false,
      checksum: null,
      includes: ['Database Changes']
    }
  ];

  // Mock schedules data
  const mockSchedules = [
    {
      id: 1,
      name: 'Daily Database Backup',
      frequency: 'daily',
      time: '02:00',
      type: 'incremental',
      retention: 30,
      location: 'Both Locations',
      enabled: true,
      lastRun: '2024-01-14 02:00:00',
      nextRun: '2024-01-15 02:00:00'
    },
    {
      id: 2,
      name: 'Weekly Full Backup',
      frequency: 'weekly',
      day: 'sunday',
      time: '02:00',
      type: 'full',
      retention: 90,
      location: 'Primary DC - NAS',
      enabled: true,
      lastRun: '2024-01-12 02:00:00',
      nextRun: '2024-01-19 02:00:00'
    },
    {
      id: 3,
      name: 'Monthly Archive',
      frequency: 'monthly',
      day: 'first',
      time: '03:00',
      type: 'full',
      retention: 365,
      location: 'Secondary DC - Cloud',
      enabled: true,
      lastRun: '2024-01-01 03:00:00',
      nextRun: '2024-02-01 03:00:00'
    },
    {
      id: 4,
      name: 'Configuration Backup',
      frequency: 'daily',
      time: '01:00',
      type: 'partial',
      retention: 365,
      location: 'Primary DC - NAS',
      enabled: false,
      lastRun: '2024-01-10 01:00:00',
      nextRun: 'Disabled'
    }
  ];

  // Mock storage metrics
  const mockStorageMetrics = {
    totalStorage: '500 GB',
    usedStorage: '245.8 GB',
    availableStorage: '254.2 GB',
    backupCount: 42,
    oldestBackup: '2023-10-15',
    newestBackup: '2024-01-15',
    compressionRatio: '2.3:1',
    retentionPolicies: {
      daily: 30,
      weekly: 90,
      monthly: 365,
      yearly: 1825
    }
  };

  useEffect(() => {
    loadBackupData();
  }, []);

  const loadBackupData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBackups(mockBackups);
      setSchedules(mockSchedules);
      setStorageMetrics(mockStorageMetrics);
      setLoading(false);
    }, 1500);
  };

  const handleCreateBackup = () => {
    setCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      const newBackup = {
        id: backups.length + 1,
        name: `Manual_Backup_${new Date().toISOString().split('T')[0]}`,
        type: 'full',
        size: '0 GB',
        status: 'in_progress',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        completedAt: null,
        location: 'Primary DC - NAS',
        retentionDays: 90,
        verified: false,
        checksum: null,
        includes: ['Full System']
      };
      
      setBackups([newBackup, ...backups]);
      setCreatingBackup(false);
      
      // Simulate progress
      setTimeout(() => {
        setBackups(prev => prev.map(b => 
          b.id === newBackup.id ? { ...b, status: 'completed', size: '45.3 GB', verified: true } : b
        ));
      }, 5000);
    }, 2000);
  };

  const handleRestoreBackup = (backupId) => {
    const backup = backups.find(b => b.id === backupId);
    if (!backup || backup.status !== 'completed') return;
    
    setRestoreProgress({
      backupId,
      progress: 0,
      status: 'preparing',
      estimatedTime: '15 minutes'
    });
    
    // Simulate restore progress
    const interval = setInterval(() => {
      setRestoreProgress(prev => {
        if (!prev) return prev;
        
        const newProgress = prev.progress + 5;
        let status = prev.status;
        
        if (newProgress >= 100) {
          status = 'completed';
          clearInterval(interval);
          setTimeout(() => setRestoreProgress(null), 3000);
        } else if (newProgress >= 50) {
          status = 'restoring_data';
        } else if (newProgress >= 20) {
          status = 'extracting_files';
        }
        
        return {
          ...prev,
          progress: Math.min(newProgress, 100),
          status
        };
      });
    }, 500);
  };

  const handleDeleteBackup = (backupId) => {
    if (window.confirm('Are you sure you want to delete this backup? This action cannot be undone.')) {
      setBackups(prev => prev.filter(b => b.id !== backupId));
    }
  };

  const handleToggleSchedule = (scheduleId) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId ? { ...schedule, enabled: !schedule.enabled } : schedule
    ));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed': return 'superadmin-backup-status-completed';
      case 'in_progress': return 'superadmin-backup-status-in-progress';
      case 'failed': return 'superadmin-backup-status-failed';
      case 'scheduled': return 'superadmin-backup-status-scheduled';
      default: return 'superadmin-backup-status-pending';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'full': return 'superadmin-backup-type-full';
      case 'incremental': return 'superadmin-backup-type-incremental';
      case 'partial': return 'superadmin-backup-type-partial';
      default: return 'superadmin-backup-type-other';
    }
  };

  const formatBytes = (sizeStr) => {
    if (!sizeStr) return '0 GB';
    return sizeStr;
  };

  const getBackupIcon = (type) => {
    switch (type) {
      case 'full': return 'fa-database';
      case 'incremental': return 'fa-file-export';
      case 'partial': return 'fa-file-alt';
      default: return 'fa-archive';
    }
  };

  const renderBackupCard = (backup) => (
    <div 
      key={backup.id}
      className={`superadmin-backup-card ${selectedBackup?.id === backup.id ? 'superadmin-backup-selected' : ''}`}
      onClick={() => setSelectedBackup(selectedBackup?.id === backup.id ? null : backup)}
    >
      <div className="superadmin-backup-card-header">
        <div className="superadmin-backup-card-title">
          <i className={`fas ${getBackupIcon(backup.type)}`}></i>
          <span className="superadmin-backup-name">{backup.name}</span>
        </div>
        <div className="superadmin-backup-card-actions">
          <span className={`superadmin-backup-status-badge ${getStatusBadgeClass(backup.status)}`}>
            {backup.status.replace('_', ' ')}
          </span>
          <span className={`superadmin-backup-type-badge ${getTypeBadgeClass(backup.type)}`}>
            {backup.type}
          </span>
        </div>
      </div>
      
      <div className="superadmin-backup-card-body">
        <div className="superadmin-backup-info-row">
          <div className="superadmin-backup-info-item">
            <i className="fas fa-hdd"></i>
            <span className="superadmin-backup-info-label">Size:</span>
            <span className="superadmin-backup-info-value">{formatBytes(backup.size)}</span>
          </div>
          <div className="superadmin-backup-info-item">
            <i className="fas fa-calendar"></i>
            <span className="superadmin-backup-info-label">Created:</span>
            <span className="superadmin-backup-info-value">{backup.createdAt}</span>
          </div>
          <div className="superadmin-backup-info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span className="superadmin-backup-info-label">Location:</span>
            <span className="superadmin-backup-info-value">{backup.location}</span>
          </div>
        </div>
        
        <div className="superadmin-backup-info-row">
          <div className="superadmin-backup-info-item">
            <i className="fas fa-shield-alt"></i>
            <span className="superadmin-backup-info-label">Verified:</span>
            <span className={`superadmin-backup-verified ${backup.verified ? 'superadmin-backup-verified-yes' : 'superadmin-backup-verified-no'}`}>
              {backup.verified ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="superadmin-backup-info-item">
            <i className="fas fa-clock"></i>
            <span className="superadmin-backup-info-label">Retention:</span>
            <span className="superadmin-backup-info-value">{backup.retentionDays} days</span>
          </div>
          <div className="superadmin-backup-info-item">
            <i className="fas fa-tasks"></i>
            <span className="superadmin-backup-info-label">Includes:</span>
            <span className="superadmin-backup-info-value">{backup.includes.length} items</span>
          </div>
        </div>
      </div>
      
      <div className="superadmin-backup-card-footer">
        <button 
          className="superadmin-backup-action-btn superadmin-backup-action-restore"
          onClick={(e) => {
            e.stopPropagation();
            handleRestoreBackup(backup.id);
          }}
          disabled={backup.status !== 'completed' || !backup.verified}
        >
          <i className="fas fa-undo"></i>
          Restore
        </button>
        <button 
          className="superadmin-backup-action-btn superadmin-backup-action-download"
          onClick={(e) => e.stopPropagation()}
          disabled={backup.status !== 'completed'}
        >
          <i className="fas fa-download"></i>
          Download
        </button>
        <button 
          className="superadmin-backup-action-btn superadmin-backup-action-delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteBackup(backup.id);
          }}
        >
          <i className="fas fa-trash"></i>
          Delete
        </button>
      </div>
    </div>
  );

  const renderScheduleCard = (schedule) => (
    <div key={schedule.id} className="superadmin-backup-schedule-card">
      <div className="superadmin-backup-schedule-header">
        <div className="superadmin-backup-schedule-title">
          <i className="fas fa-calendar-alt"></i>
          <span className="superadmin-backup-schedule-name">{schedule.name}</span>
        </div>
        <div className="superadmin-backup-schedule-toggle">
          <label className="superadmin-backup-toggle">
            <input 
              type="checkbox" 
              checked={schedule.enabled}
              onChange={() => handleToggleSchedule(schedule.id)}
            />
            <span className="superadmin-backup-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div className="superadmin-backup-schedule-body">
        <div className="superadmin-backup-schedule-info">
          <div className="superadmin-backup-schedule-row">
            <i className="fas fa-sync-alt"></i>
            <span className="superadmin-backup-schedule-label">Frequency:</span>
            <span className="superadmin-backup-schedule-value">{schedule.frequency}</span>
          </div>
          
          <div className="superadmin-backup-schedule-row">
            <i className="fas fa-clock"></i>
            <span className="superadmin-backup-schedule-label">Time:</span>
            <span className="superadmin-backup-schedule-value">{schedule.time}</span>
          </div>
          
          {schedule.frequency === 'weekly' && (
            <div className="superadmin-backup-schedule-row">
              <i className="fas fa-calendar-day"></i>
              <span className="superadmin-backup-schedule-label">Day:</span>
              <span className="superadmin-backup-schedule-value">{schedule.day}</span>
            </div>
          )}
          
          {schedule.frequency === 'monthly' && (
            <div className="superadmin-backup-schedule-row">
              <i className="fas fa-calendar-day"></i>
              <span className="superadmin-backup-schedule-label">Day:</span>
              <span className="superadmin-backup-schedule-value">{schedule.day}</span>
            </div>
          )}
          
          <div className="superadmin-backup-schedule-row">
            <i className="fas fa-database"></i>
            <span className="superadmin-backup-schedule-label">Type:</span>
            <span className={`superadmin-backup-type-badge ${getTypeBadgeClass(schedule.type)}`}>
              {schedule.type}
            </span>
          </div>
          
          <div className="superadmin-backup-schedule-row">
            <i className="fas fa-history"></i>
            <span className="superadmin-backup-schedule-label">Retention:</span>
            <span className="superadmin-backup-schedule-value">{schedule.retention} days</span>
          </div>
          
          <div className="superadmin-backup-schedule-row">
            <i className="fas fa-map-marker-alt"></i>
            <span className="superadmin-backup-schedule-label">Location:</span>
            <span className="superadmin-backup-schedule-value">{schedule.location}</span>
          </div>
        </div>
        
        <div className="superadmin-backup-schedule-timeline">
          <div className="superadmin-backup-schedule-timeline-item">
            <div className="superadmin-backup-timeline-label">Last Run</div>
            <div className="superadmin-backup-timeline-value">{schedule.lastRun}</div>
          </div>
          
          <div className="superadmin-backup-schedule-timeline-item">
            <div className="superadmin-backup-timeline-label">Next Run</div>
            <div className="superadmin-backup-timeline-value">{schedule.nextRun}</div>
          </div>
        </div>
      </div>
      
      <div className="superadmin-backup-schedule-footer">
        <button className="superadmin-backup-schedule-action-btn">
          <i className="fas fa-edit"></i>
          Edit
        </button>
        <button className="superadmin-backup-schedule-action-btn">
          <i className="fas fa-play"></i>
          Run Now
        </button>
        <button className="superadmin-backup-schedule-action-btn">
          <i className="fas fa-history"></i>
          History
        </button>
      </div>
    </div>
  );

  return (
    <div className="superadmin-backup-restore-container">
      {/* Header */}
      <div className="superadmin-backup-header">
        <div className="superadmin-backup-header-main">
          <h1 className="superadmin-backup-title">
            <i className="fas fa-crown superadmin-backup-crown"></i>
            Backup & Restore Management
          </h1>
          <p className="superadmin-backup-subtitle">
            Secure data protection and disaster recovery solutions
          </p>
        </div>
        
        <div className="superadmin-backup-quick-stats">
          <div className="superadmin-backup-stat-card">
            <div className="superadmin-backup-stat-icon">
              <i className="fas fa-database"></i>
            </div>
            <div>
              <div className="superadmin-backup-stat-value">{backups.length}</div>
              <div className="superadmin-backup-stat-label">Total Backups</div>
            </div>
          </div>
          
          <div className="superadmin-backup-stat-card">
            <div className="superadmin-backup-stat-icon">
              <i className="fas fa-hdd"></i>
            </div>
            <div>
              <div className="superadmin-backup-stat-value">
                {backups.reduce((sum, b) => {
                  const size = parseFloat(b.size);
                  return sum + (isNaN(size) ? 0 : size);
                }, 0).toFixed(1)} GB
              </div>
              <div className="superadmin-backup-stat-label">Total Size</div>
            </div>
          </div>
          
          <div className="superadmin-backup-stat-card">
            <div className="superadmin-backup-stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="superadmin-backup-stat-value">
                {backups.filter(b => b.status === 'completed' && b.verified).length}
              </div>
              <div className="superadmin-backup-stat-label">Verified</div>
            </div>
          </div>
          
          <div className="superadmin-backup-stat-card">
            <div className="superadmin-backup-stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div>
              <div className="superadmin-backup-stat-value">{schedules.length}</div>
              <div className="superadmin-backup-stat-label">Schedules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="superadmin-backup-actions">
        <button 
          className="superadmin-backup-primary-btn"
          onClick={handleCreateBackup}
          disabled={creatingBackup}
        >
          <i className={`fas fa-plus-circle ${creatingBackup ? 'fa-spin' : ''}`}></i>
          {creatingBackup ? 'Creating Backup...' : 'Create New Backup'}
        </button>
        
        <button className="superadmin-backup-secondary-btn">
          <i className="fas fa-upload"></i>
          Upload Backup
        </button>
        
        <button className="superadmin-backup-secondary-btn">
          <i className="fas fa-cog"></i>
          Settings
        </button>
        
        <button 
          className="superadmin-backup-secondary-btn"
          onClick={loadBackupData}
          disabled={loading}
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
          Refresh
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="superadmin-backup-tabs">
        <button 
          className={`superadmin-backup-tab ${activeTab === 'backups' ? 'superadmin-backup-tab-active' : ''}`}
          onClick={() => setActiveTab('backups')}
        >
          <i className="fas fa-database"></i>
          Backups
          <span className="superadmin-backup-tab-badge">{backups.length}</span>
        </button>
        
        <button 
          className={`superadmin-backup-tab ${activeTab === 'schedules' ? 'superadmin-backup-tab-active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          <i className="fas fa-calendar-alt"></i>
          Schedules
          <span className="superadmin-backup-tab-badge">{schedules.length}</span>
        </button>
        
        <button 
          className={`superadmin-backup-tab ${activeTab === 'storage' ? 'superadmin-backup-tab-active' : ''}`}
          onClick={() => setActiveTab('storage')}
        >
          <i className="fas fa-hdd"></i>
          Storage
        </button>
        
        <button 
          className={`superadmin-backup-tab ${activeTab === 'logs' ? 'superadmin-backup-tab-active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <i className="fas fa-history"></i>
          Logs
        </button>
        
        <button 
          className={`superadmin-backup-tab ${activeTab === 'settings' ? 'superadmin-backup-tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i>
          Settings
        </button>
      </div>

      {/* Restore Progress Bar */}
      {restoreProgress && (
        <div className="superadmin-backup-restore-progress">
          <div className="superadmin-backup-progress-header">
            <i className="fas fa-undo"></i>
            <span>Restoring Backup</span>
            <button 
              className="superadmin-backup-progress-close"
              onClick={() => setRestoreProgress(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="superadmin-backup-progress-body">
            <div className="superadmin-backup-progress-info">
              <div className="superadmin-backup-progress-status">
                Status: {restoreProgress.status.replace('_', ' ')}
              </div>
              <div className="superadmin-backup-progress-time">
                Estimated: {restoreProgress.estimatedTime}
              </div>
            </div>
            
            <div className="superadmin-backup-progress-bar">
              <div 
                className="superadmin-backup-progress-fill"
                style={{ width: `${restoreProgress.progress}%` }}
              >
                <span className="superadmin-backup-progress-text">{restoreProgress.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="superadmin-backup-content">
        {/* Left Column - Backups/Schedules List */}
        <div className="superadmin-backup-left-column">
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
                ) : activeTab === 'backups' ? (
            <div className="superadmin-backup-list">
              <div className="superadmin-backup-list-header">
                <h3 className="superadmin-backup-list-title">
                  <i className="fas fa-list"></i>
                  All Backups
                </h3>
                <div className="superadmin-backup-list-filters">
                  <select className="superadmin-backup-filter-select">
                    <option value="all">All Types</option>
                    <option value="full">Full</option>
                    <option value="incremental">Incremental</option>
                    <option value="partial">Partial</option>
                  </select>
                  
                  <select className="superadmin-backup-filter-select">
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <input 
                    type="text" 
                    placeholder="Search backups..."
                    className="superadmin-backup-search"
                  />
                </div>
              </div>
              
              <div className="superadmin-backup-cards-grid">
                {backups.length === 0 ? (
                  <div className="superadmin-backup-empty">
                    <i className="fas fa-database"></i>
                    <p>No backups found</p>
                    <button 
                      className="superadmin-backup-primary-btn"
                      onClick={handleCreateBackup}
                    >
                      Create Your First Backup
                    </button>
                  </div>
                ) : (
                  backups.map(renderBackupCard)
                )}
              </div>
            </div>
          ) : activeTab === 'schedules' ? (
            <div className="superadmin-backup-schedules">
              <div className="superadmin-backup-schedules-header">
                <h3 className="superadmin-backup-schedules-title">
                  <i className="fas fa-calendar-alt"></i>
                  Backup Schedules
                </h3>
                <button className="superadmin-backup-schedules-add-btn">
                  <i className="fas fa-plus"></i>
                  Add Schedule
                </button>
              </div>
              
              <div className="superadmin-backup-schedules-grid">
                {schedules.map(renderScheduleCard)}
              </div>
            </div>
          ) : activeTab === 'storage' && storageMetrics ? (
            <div className="superadmin-backup-storage">
              <h3 className="superadmin-backup-storage-title">
                <i className="fas fa-hdd"></i>
                Storage Overview
              </h3>
              
              <div className="superadmin-backup-storage-metrics">
                <div className="superadmin-backup-storage-card">
                  <div className="superadmin-backup-storage-progress">
                    <div className="superadmin-backup-storage-circle">
                      <div 
                        className="superadmin-backup-storage-fill"
                        style={{ 
                          background: `conic-gradient(
                            #FFD700 0% ${(parseFloat(storageMetrics.usedStorage) / 500) * 100}%,
                            #FFEC8B ${(parseFloat(storageMetrics.usedStorage) / 500) * 100}% 100%
                          )`
                        }}
                      >
                        <div className="superadmin-backup-storage-inner">
                          <span className="superadmin-backup-storage-used">{storageMetrics.usedStorage}</span>
                          <span className="superadmin-backup-storage-total">of {storageMetrics.totalStorage}</span>
                        </div>
                      </div>
                    </div>
                    <div className="superadmin-backup-storage-label">Storage Usage</div>
                  </div>
                </div>
                
                <div className="superadmin-backup-storage-info">
                  <div className="superadmin-backup-storage-info-item">
                    <div className="superadmin-backup-storage-info-label">Available Storage</div>
                    <div className="superadmin-backup-storage-info-value">{storageMetrics.availableStorage}</div>
                  </div>
                  
                  <div className="superadmin-backup-storage-info-item">
                    <div className="superadmin-backup-storage-info-label">Total Backups</div>
                    <div className="superadmin-backup-storage-info-value">{storageMetrics.backupCount}</div>
                  </div>
                  
                  <div className="superadmin-backup-storage-info-item">
                    <div className="superadmin-backup-storage-info-label">Compression Ratio</div>
                    <div className="superadmin-backup-storage-info-value">{storageMetrics.compressionRatio}</div>
                  </div>
                  
                  <div className="superadmin-backup-storage-info-item">
                    <div className="superadmin-backup-storage-info-label">Oldest Backup</div>
                    <div className="superadmin-backup-storage-info-value">{storageMetrics.oldestBackup}</div>
                  </div>
                  
                  <div className="superadmin-backup-storage-info-item">
                    <div className="superadmin-backup-storage-info-label">Newest Backup</div>
                    <div className="superadmin-backup-storage-info-value">{storageMetrics.newestBackup}</div>
                  </div>
                </div>
              </div>
              
              <div className="superadmin-backup-retention">
                <h4 className="superadmin-backup-retention-title">Retention Policies</h4>
                <div className="superadmin-backup-retention-grid">
                  {Object.entries(storageMetrics.retentionPolicies).map(([key, days]) => (
                    <div key={key} className="superadmin-backup-retention-item">
                      <div className="superadmin-backup-retention-type">{key}</div>
                      <div className="superadmin-backup-retention-days">{days} days</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="superadmin-backup-tab-content">
              <i className="fas fa-cogs"></i>
              <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content will be available soon</p>
            </div>
          )}
        </div>
        
        {/* Right Column - Details Panel */}
        <div className="superadmin-backup-right-column">
          {/* Backup Details */}
          {selectedBackup ? (
            <div className="superadmin-backup-details-panel">
              <div className="superadmin-backup-details-header">
                <h3 className="superadmin-backup-details-title">
                  <i className="fas fa-info-circle"></i>
                  Backup Details
                </h3>
                <button 
                  className="superadmin-backup-details-close"
                  onClick={() => setSelectedBackup(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="superadmin-backup-details-content">
                <div className="superadmin-backup-details-section">
                  <h4 className="superadmin-backup-details-subtitle">Basic Information</h4>
                  <div className="superadmin-backup-details-grid">
                    <div className="superadmin-backup-detail-item">
                      <label>Backup Name</label>
                      <div className="superadmin-backup-detail-value">{selectedBackup.name}</div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Type</label>
                      <div className="superadmin-backup-detail-value">
                        <span className={`superadmin-backup-type-badge ${getTypeBadgeClass(selectedBackup.type)}`}>
                          {selectedBackup.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Status</label>
                      <div className="superadmin-backup-detail-value">
                        <span className={`superadmin-backup-status-badge ${getStatusBadgeClass(selectedBackup.status)}`}>
                          {selectedBackup.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Size</label>
                      <div className="superadmin-backup-detail-value">{selectedBackup.size}</div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Created At</label>
                      <div className="superadmin-backup-detail-value">{selectedBackup.createdAt}</div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Completed At</label>
                      <div className="superadmin-backup-detail-value">{selectedBackup.completedAt || 'N/A'}</div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Location</label>
                      <div className="superadmin-backup-detail-value">{selectedBackup.location}</div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Retention</label>
                      <div className="superadmin-backup-detail-value">{selectedBackup.retentionDays} days</div>
                    </div>
                    
                    <div className="superadmin-backup-detail-item">
                      <label>Verified</label>
                      <div className="superadmin-backup-detail-value">
                        <span className={`superadmin-backup-verified ${selectedBackup.verified ? 'superadmin-backup-verified-yes' : 'superadmin-backup-verified-no'}`}>
                          {selectedBackup.verified ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    
                    {selectedBackup.checksum && (
                      <div className="superadmin-backup-detail-item">
                        <label>Checksum</label>
                        <div className="superadmin-backup-detail-value superadmin-backup-checksum">
                          {selectedBackup.checksum}
                        </div>
                      </div>
                    )}
                    
                    {selectedBackup.error && (
                      <div className="superadmin-backup-detail-item">
                        <label>Error</label>
                        <div className="superadmin-backup-detail-value superadmin-backup-error">
                          {selectedBackup.error}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="superadmin-backup-details-section">
                  <h4 className="superadmin-backup-details-subtitle">Included Items</h4>
                  <div className="superadmin-backup-included-items">
                    {selectedBackup.includes.map((item, index) => (
                      <div key={index} className="superadmin-backup-included-item">
                        <i className="fas fa-check-circle"></i>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="superadmin-backup-details-section">
                  <h4 className="superadmin-backup-details-subtitle">Quick Actions</h4>
                  <div className="superadmin-backup-details-actions">
                    <button 
                      className="superadmin-backup-details-action-btn"
                      onClick={() => handleRestoreBackup(selectedBackup.id)}
                      disabled={selectedBackup.status !== 'completed' || !selectedBackup.verified}
                    >
                      <i className="fas fa-undo"></i>
                      Restore This Backup
                    </button>
                    
                    <button 
                      className="superadmin-backup-details-action-btn"
                      disabled={selectedBackup.status !== 'completed'}
                    >
                      <i className="fas fa-download"></i>
                      Download Backup File
                    </button>
                    
                    <button 
                      className="superadmin-backup-details-action-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(selectedBackup, null, 2));
                        alert('Backup details copied to clipboard!');
                      }}
                    >
                      <i className="fas fa-copy"></i>
                      Copy Details
                    </button>
                    
                    <button 
                      className="superadmin-backup-details-action-btn superadmin-backup-details-action-delete"
                      onClick={() => handleDeleteBackup(selectedBackup.id)}
                    >
                      <i className="fas fa-trash"></i>
                      Delete Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="superadmin-backup-quick-actions">
              <div className="superadmin-backup-quick-card">
                <h3 className="superadmin-backup-quick-title">
                  <i className="fas fa-bolt"></i>
                  Quick Actions
                </h3>
                
                <div className="superadmin-backup-quick-buttons">
                  <button className="superadmin-backup-quick-btn">
                    <i className="fas fa-database"></i>
                    Backup Database
                  </button>
                  
                  <button className="superadmin-backup-quick-btn">
                    <i className="fas fa-file-archive"></i>
                    Backup Files
                  </button>
                  
                  <button className="superadmin-backup-quick-btn">
                    <i className="fas fa-cogs"></i>
                    Backup Config
                  </button>
                  
                  <button className="superadmin-backup-quick-btn">
                    <i className="fas fa-cloud-upload-alt"></i>
                    Cloud Sync
                  </button>
                </div>
              </div>
              
              <div className="superadmin-backup-quick-card">
                <h3 className="superadmin-backup-quick-title">
                  <i className="fas fa-chart-bar"></i>
                  Recent Activity
                </h3>
                
                <div className="superadmin-backup-activity-list">
                  {backups.slice(0, 5).map(backup => (
                    <div key={backup.id} className="superadmin-backup-activity-item">
                      <div className="superadmin-backup-activity-icon">
                        <i className={`fas ${getBackupIcon(backup.type)}`}></i>
                      </div>
                      <div className="superadmin-backup-activity-content">
                        <div className="superadmin-backup-activity-title">{backup.name}</div>
                        <div className="superadmin-backup-activity-meta">
                          <span className="superadmin-backup-activity-time">{backup.createdAt}</span>
                          <span className={`superadmin-backup-activity-status ${getStatusBadgeClass(backup.status)}`}>
                            {backup.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="superadmin-backup-quick-card">
                <h3 className="superadmin-backup-quick-title">
                  <i className="fas fa-shield-alt"></i>
                  Security Tips
                </h3>
                
                <div className="superadmin-backup-tips">
                  <div className="superadmin-backup-tip">
                    <i className="fas fa-check-circle"></i>
                    Store backups in multiple locations
                  </div>
                  <div className="superadmin-backup-tip">
                    <i className="fas fa-check-circle"></i>
                    Verify backups regularly
                  </div>
                  <div className="superadmin-backup-tip">
                    <i className="fas fa-check-circle"></i>
                    Encrypt sensitive backups
                  </div>
                  <div className="superadmin-backup-tip">
                    <i className="fas fa-check-circle"></i>
                    Test restore procedures quarterly
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="superadmin-backup-footer">
        <div className="superadmin-backup-footer-info">
          <div className="superadmin-backup-footer-stat">
            <i className="fas fa-history"></i>
            <div>
              <div className="superadmin-backup-footer-value">Last Full Backup: 2 days ago</div>
              <div className="superadmin-backup-footer-label">Backup Age</div>
            </div>
          </div>
          
          <div className="superadmin-backup-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="superadmin-backup-footer-value">Encryption: AES-256</div>
              <div className="superadmin-backup-footer-label">Security</div>
            </div>
          </div>
          
          <div className="superadmin-backup-footer-stat">
            <i className="fas fa-cloud"></i>
            <div>
              <div className="superadmin-backup-footer-value">Cloud Sync: Enabled</div>
              <div className="superadmin-backup-footer-label">Offsite Backup</div>
            </div>
          </div>
        </div>
        
        <div className="superadmin-backup-footer-actions">
          <button className="superadmin-backup-footer-btn">
            <i className="fas fa-file-export"></i>
            Export Report
          </button>
          <button className="superadmin-backup-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help & Support
          </button>
          <button className="superadmin-backup-footer-btn">
            <i className="fas fa-book"></i>
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminBackupRestore;