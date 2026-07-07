import React, { useState, useEffect } from 'react';
import './SuperAdminBackupRestore.css';

const BackupManagerSuperAdmin = () => {
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
      case 'completed': return 'backup-manager-sa-status-completed';
      case 'in_progress': return 'backup-manager-sa-status-in-progress';
      case 'failed': return 'backup-manager-sa-status-failed';
      case 'scheduled': return 'backup-manager-sa-status-scheduled';
      default: return 'backup-manager-sa-status-pending';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'full': return 'backup-manager-sa-type-full';
      case 'incremental': return 'backup-manager-sa-type-incremental';
      case 'partial': return 'backup-manager-sa-type-partial';
      default: return 'backup-manager-sa-type-other';
    }
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
      className={`backup-manager-sa-card ${selectedBackup?.id === backup.id ? 'backup-manager-sa-selected' : ''}`}
      onClick={() => setSelectedBackup(selectedBackup?.id === backup.id ? null : backup)}
    >
      <div className="backup-manager-sa-card-header">
        <div className="backup-manager-sa-card-title">
          <i className={`fas ${getBackupIcon(backup.type)}`}></i>
          <span className="backup-manager-sa-name">{backup.name}</span>
        </div>
        <div className="backup-manager-sa-card-actions">
          <span className={`backup-manager-sa-status-badge ${getStatusBadgeClass(backup.status)}`}>
            {backup.status.replace('_', ' ')}
          </span>
          <span className={`backup-manager-sa-type-badge ${getTypeBadgeClass(backup.type)}`}>
            {backup.type}
          </span>
        </div>
      </div>
      
      <div className="backup-manager-sa-card-body">
        <div className="backup-manager-sa-info-row">
          <div className="backup-manager-sa-info-item">
            <i className="fas fa-hdd"></i>
            <span className="backup-manager-sa-info-label">Size:</span>
            <span className="backup-manager-sa-info-value">{backup.size}</span>
          </div>
          <div className="backup-manager-sa-info-item">
            <i className="fas fa-calendar"></i>
            <span className="backup-manager-sa-info-label">Created:</span>
            <span className="backup-manager-sa-info-value">{backup.createdAt}</span>
          </div>
          <div className="backup-manager-sa-info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span className="backup-manager-sa-info-label">Location:</span>
            <span className="backup-manager-sa-info-value">{backup.location}</span>
          </div>
        </div>
        
        <div className="backup-manager-sa-info-row">
          <div className="backup-manager-sa-info-item">
            <i className="fas fa-shield-alt"></i>
            <span className="backup-manager-sa-info-label">Verified:</span>
            <span className={`backup-manager-sa-verified ${backup.verified ? 'backup-manager-sa-verified-yes' : 'backup-manager-sa-verified-no'}`}>
              {backup.verified ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="backup-manager-sa-info-item">
            <i className="fas fa-clock"></i>
            <span className="backup-manager-sa-info-label">Retention:</span>
            <span className="backup-manager-sa-info-value">{backup.retentionDays} days</span>
          </div>
          <div className="backup-manager-sa-info-item">
            <i className="fas fa-tasks"></i>
            <span className="backup-manager-sa-info-label">Includes:</span>
            <span className="backup-manager-sa-info-value">{backup.includes.length} items</span>
          </div>
        </div>
      </div>
      
      <div className="backup-manager-sa-card-footer">
        <button 
          className="backup-manager-sa-action-btn backup-manager-sa-action-restore"
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
          className="backup-manager-sa-action-btn backup-manager-sa-action-download"
          onClick={(e) => e.stopPropagation()}
          disabled={backup.status !== 'completed'}
        >
          <i className="fas fa-download"></i>
          Download
        </button>
        <button 
          className="backup-manager-sa-action-btn backup-manager-sa-action-delete"
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
    <div key={schedule.id} className="backup-manager-sa-schedule-card">
      <div className="backup-manager-sa-schedule-header">
        <div className="backup-manager-sa-schedule-title">
          <i className="fas fa-calendar-alt"></i>
          <span className="backup-manager-sa-schedule-name">{schedule.name}</span>
        </div>
        <div className="backup-manager-sa-schedule-toggle">
          <label className="backup-manager-sa-toggle">
            <input 
              type="checkbox" 
              checked={schedule.enabled}
              onChange={() => handleToggleSchedule(schedule.id)}
            />
            <span className="backup-manager-sa-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div className="backup-manager-sa-schedule-body">
        <div className="backup-manager-sa-schedule-info">
          <div className="backup-manager-sa-schedule-row">
            <i className="fas fa-sync-alt"></i>
            <span className="backup-manager-sa-schedule-label">Frequency:</span>
            <span className="backup-manager-sa-schedule-value">{schedule.frequency}</span>
          </div>
          
          <div className="backup-manager-sa-schedule-row">
            <i className="fas fa-clock"></i>
            <span className="backup-manager-sa-schedule-label">Time:</span>
            <span className="backup-manager-sa-schedule-value">{schedule.time}</span>
          </div>
          
          {schedule.frequency === 'weekly' && (
            <div className="backup-manager-sa-schedule-row">
              <i className="fas fa-calendar-day"></i>
              <span className="backup-manager-sa-schedule-label">Day:</span>
              <span className="backup-manager-sa-schedule-value">{schedule.day}</span>
            </div>
          )}
          
          {schedule.frequency === 'monthly' && (
            <div className="backup-manager-sa-schedule-row">
              <i className="fas fa-calendar-day"></i>
              <span className="backup-manager-sa-schedule-label">Day:</span>
              <span className="backup-manager-sa-schedule-value">{schedule.day}</span>
            </div>
          )}
          
          <div className="backup-manager-sa-schedule-row">
            <i className="fas fa-database"></i>
            <span className="backup-manager-sa-schedule-label">Type:</span>
            <span className={`backup-manager-sa-type-badge ${getTypeBadgeClass(schedule.type)}`}>
              {schedule.type}
            </span>
          </div>
          
          <div className="backup-manager-sa-schedule-row">
            <i className="fas fa-history"></i>
            <span className="backup-manager-sa-schedule-label">Retention:</span>
            <span className="backup-manager-sa-schedule-value">{schedule.retention} days</span>
          </div>
          
          <div className="backup-manager-sa-schedule-row">
            <i className="fas fa-map-marker-alt"></i>
            <span className="backup-manager-sa-schedule-label">Location:</span>
            <span className="backup-manager-sa-schedule-value">{schedule.location}</span>
          </div>
        </div>
        
        <div className="backup-manager-sa-schedule-timeline">
          <div className="backup-manager-sa-schedule-timeline-item">
            <div className="backup-manager-sa-timeline-label">Last Run</div>
            <div className="backup-manager-sa-timeline-value">{schedule.lastRun}</div>
          </div>
          
          <div className="backup-manager-sa-schedule-timeline-item">
            <div className="backup-manager-sa-timeline-label">Next Run</div>
            <div className="backup-manager-sa-timeline-value">{schedule.nextRun}</div>
          </div>
        </div>
      </div>
      
      <div className="backup-manager-sa-schedule-footer">
        <button className="backup-manager-sa-schedule-action-btn">
          <i className="fas fa-edit"></i>
          Edit
        </button>
        <button className="backup-manager-sa-schedule-action-btn">
          <i className="fas fa-play"></i>
          Run Now
        </button>
        <button className="backup-manager-sa-schedule-action-btn">
          <i className="fas fa-history"></i>
          History
        </button>
      </div>
    </div>
  );

  return (
    <div className="backup-manager-sa-container">
      {/* Header */}
      <div className="backup-manager-sa-header">
        <div className="backup-manager-sa-header-main">
          <h1 className="backup-manager-sa-title">
            <i className="fas fa-crown backup-manager-sa-crown"></i>
            Backup & Restore Management
          </h1>
          <p className="backup-manager-sa-subtitle">
            Secure data protection and disaster recovery solutions
          </p>
        </div>
        
        <div className="backup-manager-sa-quick-stats">
          <div className="backup-manager-sa-stat-card">
            <div className="backup-manager-sa-stat-icon">
              <i className="fas fa-database"></i>
            </div>
            <div>
              <div className="backup-manager-sa-stat-value">{backups.length}</div>
              <div className="backup-manager-sa-stat-label">Total Backups</div>
            </div>
          </div>
          
          <div className="backup-manager-sa-stat-card">
            <div className="backup-manager-sa-stat-icon">
              <i className="fas fa-hdd"></i>
            </div>
            <div>
              <div className="backup-manager-sa-stat-value">
                {backups.reduce((sum, b) => {
                  const size = parseFloat(b.size);
                  return sum + (isNaN(size) ? 0 : size);
                }, 0).toFixed(1)} GB
              </div>
              <div className="backup-manager-sa-stat-label">Total Size</div>
            </div>
          </div>
          
          <div className="backup-manager-sa-stat-card">
            <div className="backup-manager-sa-stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <div className="backup-manager-sa-stat-value">
                {backups.filter(b => b.status === 'completed' && b.verified).length}
              </div>
              <div className="backup-manager-sa-stat-label">Verified</div>
            </div>
          </div>
          
          <div className="backup-manager-sa-stat-card">
            <div className="backup-manager-sa-stat-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div>
              <div className="backup-manager-sa-stat-value">{schedules.length}</div>
              <div className="backup-manager-sa-stat-label">Schedules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="backup-manager-sa-actions">
        <button 
          className="backup-manager-sa-primary-btn"
          onClick={handleCreateBackup}
          disabled={creatingBackup}
        >
          <i className={`fas fa-plus-circle ${creatingBackup ? 'fa-spin' : ''}`}></i>
          {creatingBackup ? 'Creating Backup...' : 'Create New Backup'}
        </button>
        
        <button className="backup-manager-sa-secondary-btn">
          <i className="fas fa-upload"></i>
          Upload Backup
        </button>
        
        <button className="backup-manager-sa-secondary-btn">
          <i className="fas fa-cog"></i>
          Settings
        </button>
        
        <button 
          className="backup-manager-sa-secondary-btn"
          onClick={loadBackupData}
          disabled={loading}
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
          Refresh
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="backup-manager-sa-tabs">
        <button 
          className={`backup-manager-sa-tab ${activeTab === 'backups' ? 'backup-manager-sa-tab-active' : ''}`}
          onClick={() => setActiveTab('backups')}
        >
          <i className="fas fa-database"></i>
          Backups
          <span className="backup-manager-sa-tab-badge">{backups.length}</span>
        </button>
        
        <button 
          className={`backup-manager-sa-tab ${activeTab === 'schedules' ? 'backup-manager-sa-tab-active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          <i className="fas fa-calendar-alt"></i>
          Schedules
          <span className="backup-manager-sa-tab-badge">{schedules.length}</span>
        </button>
        
        <button 
          className={`backup-manager-sa-tab ${activeTab === 'storage' ? 'backup-manager-sa-tab-active' : ''}`}
          onClick={() => setActiveTab('storage')}
        >
          <i className="fas fa-hdd"></i>
          Storage
        </button>
        
        <button 
          className={`backup-manager-sa-tab ${activeTab === 'logs' ? 'backup-manager-sa-tab-active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <i className="fas fa-history"></i>
          Logs
        </button>
        
        <button 
          className={`backup-manager-sa-tab ${activeTab === 'settings' ? 'backup-manager-sa-tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i>
          Settings
        </button>
      </div>

      {/* Restore Progress Bar */}
      {restoreProgress && (
        <div className="backup-manager-sa-restore-progress">
          <div className="backup-manager-sa-progress-header">
            <i className="fas fa-undo"></i>
            <span>Restoring Backup</span>
            <button 
              className="backup-manager-sa-progress-close"
              onClick={() => setRestoreProgress(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="backup-manager-sa-progress-body">
            <div className="backup-manager-sa-progress-info">
              <div className="backup-manager-sa-progress-status">
                Status: {restoreProgress.status.replace('_', ' ')}
              </div>
              <div className="backup-manager-sa-progress-time">
                Estimated: {restoreProgress.estimatedTime}
              </div>
            </div>
            
            <div className="backup-manager-sa-progress-bar">
              <div 
                className="backup-manager-sa-progress-fill"
                style={{ width: `${restoreProgress.progress}%` }}
              >
                <span className="backup-manager-sa-progress-text">{restoreProgress.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="backup-manager-sa-content">
        {/* Left Column - Backups/Schedules List */}
        <div className="backup-manager-sa-left-column">
          {loading ? (
            <div className="backup-manager-sa-loading">
              <div className="backup-manager-sa-loading-container">
                <div className="backup-manager-sa-spinner">
                  <div className="backup-manager-sa-spinner-circle"></div>
                  <div className="backup-manager-sa-spinner-circle"></div>
                  <div className="backup-manager-sa-spinner-circle"></div>
                  <div className="backup-manager-sa-spinner-circle"></div>
                </div>
                <div className="backup-manager-sa-loading-text">
                  <h3>Loading Backup Data...</h3>
                  <p>Please wait while we fetch your backup information</p>
                </div>
              </div>
            </div>
          ) : activeTab === 'backups' ? (
            <div className="backup-manager-sa-list">
              <div className="backup-manager-sa-list-header">
                <h3 className="backup-manager-sa-list-title">
                  <i className="fas fa-list"></i>
                  All Backups
                </h3>
                <div className="backup-manager-sa-list-filters">
                  <select className="backup-manager-sa-filter-select">
                    <option value="all">All Types</option>
                    <option value="full">Full</option>
                    <option value="incremental">Incremental</option>
                    <option value="partial">Partial</option>
                  </select>
                  
                  <select className="backup-manager-sa-filter-select">
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <input 
                    type="text" 
                    placeholder="Search backups..."
                    className="backup-manager-sa-search"
                  />
                </div>
              </div>
              
              <div className="backup-manager-sa-cards-grid">
                {backups.length === 0 ? (
                  <div className="backup-manager-sa-empty">
                    <i className="fas fa-database"></i>
                    <p>No backups found</p>
                    <button 
                      className="backup-manager-sa-primary-btn"
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
            <div className="backup-manager-sa-schedules">
              <div className="backup-manager-sa-schedules-header">
                <h3 className="backup-manager-sa-schedules-title">
                  <i className="fas fa-calendar-alt"></i>
                  Backup Schedules
                </h3>
                <button className="backup-manager-sa-schedules-add-btn">
                  <i className="fas fa-plus"></i>
                  Add Schedule
                </button>
              </div>
              
              <div className="backup-manager-sa-schedules-grid">
                {schedules.map(renderScheduleCard)}
              </div>
            </div>
          ) : activeTab === 'storage' && storageMetrics ? (
            <div className="backup-manager-sa-storage">
              <h3 className="backup-manager-sa-storage-title">
                <i className="fas fa-hdd"></i>
                Storage Overview
              </h3>
              
              <div className="backup-manager-sa-storage-metrics">
                <div className="backup-manager-sa-storage-card">
                  <div className="backup-manager-sa-storage-progress">
                    <div className="backup-manager-sa-storage-circle">
                      <div 
                        className="backup-manager-sa-storage-fill"
                        style={{ 
                          background: `conic-gradient(
                            #FFD700 0% ${(parseFloat(storageMetrics.usedStorage) / 500) * 100}%,
                            #FFEC8B ${(parseFloat(storageMetrics.usedStorage) / 500) * 100}% 100%
                          )`
                        }}
                      >
                        <div className="backup-manager-sa-storage-inner">
                          <span className="backup-manager-sa-storage-used">{storageMetrics.usedStorage}</span>
                          <span className="backup-manager-sa-storage-total">of {storageMetrics.totalStorage}</span>
                        </div>
                      </div>
                    </div>
                    <div className="backup-manager-sa-storage-label">Storage Usage</div>
                  </div>
                </div>
                
                <div className="backup-manager-sa-storage-info">
                  <div className="backup-manager-sa-storage-info-item">
                    <div className="backup-manager-sa-storage-info-label">Available Storage</div>
                    <div className="backup-manager-sa-storage-info-value">{storageMetrics.availableStorage}</div>
                  </div>
                  
                  <div className="backup-manager-sa-storage-info-item">
                    <div className="backup-manager-sa-storage-info-label">Total Backups</div>
                    <div className="backup-manager-sa-storage-info-value">{storageMetrics.backupCount}</div>
                  </div>
                  
                  <div className="backup-manager-sa-storage-info-item">
                    <div className="backup-manager-sa-storage-info-label">Compression Ratio</div>
                    <div className="backup-manager-sa-storage-info-value">{storageMetrics.compressionRatio}</div>
                  </div>
                  
                  <div className="backup-manager-sa-storage-info-item">
                    <div className="backup-manager-sa-storage-info-label">Oldest Backup</div>
                    <div className="backup-manager-sa-storage-info-value">{storageMetrics.oldestBackup}</div>
                  </div>
                  
                  <div className="backup-manager-sa-storage-info-item">
                    <div className="backup-manager-sa-storage-info-label">Newest Backup</div>
                    <div className="backup-manager-sa-storage-info-value">{storageMetrics.newestBackup}</div>
                  </div>
                </div>
              </div>
              
              <div className="backup-manager-sa-retention">
                <h4 className="backup-manager-sa-retention-title">Retention Policies</h4>
                <div className="backup-manager-sa-retention-grid">
                  {Object.entries(storageMetrics.retentionPolicies).map(([key, days]) => (
                    <div key={key} className="backup-manager-sa-retention-item">
                      <div className="backup-manager-sa-retention-type">{key}</div>
                      <div className="backup-manager-sa-retention-days">{days} days</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="backup-manager-sa-tab-content">
              <i className="fas fa-cogs"></i>
              <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content will be available soon</p>
            </div>
          )}
        </div>
        
        {/* Right Column - Details Panel */}
        <div className="backup-manager-sa-right-column">
          {/* Backup Details */}
          {selectedBackup ? (
            <div className="backup-manager-sa-details-panel">
              <div className="backup-manager-sa-details-header">
                <h3 className="backup-manager-sa-details-title">
                  <i className="fas fa-info-circle"></i>
                  Backup Details
                </h3>
                <button 
                  className="backup-manager-sa-details-close"
                  onClick={() => setSelectedBackup(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="backup-manager-sa-details-content">
                <div className="backup-manager-sa-details-section">
                  <h4 className="backup-manager-sa-details-subtitle">Basic Information</h4>
                  <div className="backup-manager-sa-details-grid">
                    <div className="backup-manager-sa-detail-item">
                      <label>Backup Name</label>
                      <div className="backup-manager-sa-detail-value">{selectedBackup.name}</div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Type</label>
                      <div className="backup-manager-sa-detail-value">
                        <span className={`backup-manager-sa-type-badge ${getTypeBadgeClass(selectedBackup.type)}`}>
                          {selectedBackup.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Status</label>
                      <div className="backup-manager-sa-detail-value">
                        <span className={`backup-manager-sa-status-badge ${getStatusBadgeClass(selectedBackup.status)}`}>
                          {selectedBackup.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Size</label>
                      <div className="backup-manager-sa-detail-value">{selectedBackup.size}</div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Created At</label>
                      <div className="backup-manager-sa-detail-value">{selectedBackup.createdAt}</div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Completed At</label>
                      <div className="backup-manager-sa-detail-value">{selectedBackup.completedAt || 'N/A'}</div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Location</label>
                      <div className="backup-manager-sa-detail-value">{selectedBackup.location}</div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Retention</label>
                      <div className="backup-manager-sa-detail-value">{selectedBackup.retentionDays} days</div>
                    </div>
                    
                    <div className="backup-manager-sa-detail-item">
                      <label>Verified</label>
                      <div className="backup-manager-sa-detail-value">
                        <span className={`backup-manager-sa-verified ${selectedBackup.verified ? 'backup-manager-sa-verified-yes' : 'backup-manager-sa-verified-no'}`}>
                          {selectedBackup.verified ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    
                    {selectedBackup.checksum && (
                      <div className="backup-manager-sa-detail-item">
                        <label>Checksum</label>
                        <div className="backup-manager-sa-detail-value backup-manager-sa-checksum">
                          {selectedBackup.checksum}
                        </div>
                      </div>
                    )}
                    
                    {selectedBackup.error && (
                      <div className="backup-manager-sa-detail-item">
                        <label>Error</label>
                        <div className="backup-manager-sa-detail-value backup-manager-sa-error">
                          {selectedBackup.error}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="backup-manager-sa-details-section">
                  <h4 className="backup-manager-sa-details-subtitle">Included Items</h4>
                  <div className="backup-manager-sa-included-items">
                    {selectedBackup.includes.map((item, index) => (
                      <div key={index} className="backup-manager-sa-included-item">
                        <i className="fas fa-check-circle"></i>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="backup-manager-sa-details-section">
                  <h4 className="backup-manager-sa-details-subtitle">Quick Actions</h4>
                  <div className="backup-manager-sa-details-actions">
                    <button 
                      className="backup-manager-sa-details-action-btn"
                      onClick={() => handleRestoreBackup(selectedBackup.id)}
                      disabled={selectedBackup.status !== 'completed' || !selectedBackup.verified}
                    >
                      <i className="fas fa-undo"></i>
                      Restore This Backup
                    </button>
                    
                    <button 
                      className="backup-manager-sa-details-action-btn"
                      disabled={selectedBackup.status !== 'completed'}
                    >
                      <i className="fas fa-download"></i>
                      Download Backup File
                    </button>
                    
                    <button 
                      className="backup-manager-sa-details-action-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(selectedBackup, null, 2));
                        alert('Backup details copied to clipboard!');
                      }}
                    >
                      <i className="fas fa-copy"></i>
                      Copy Details
                    </button>
                    
                    <button 
                      className="backup-manager-sa-details-action-btn backup-manager-sa-details-action-delete"
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
            <div className="backup-manager-sa-quick-actions">
              <div className="backup-manager-sa-quick-card">
                <h3 className="backup-manager-sa-quick-title">
                  <i className="fas fa-bolt"></i>
                  Quick Actions
                </h3>
                
                <div className="backup-manager-sa-quick-buttons">
                  <button className="backup-manager-sa-quick-btn">
                    <i className="fas fa-database"></i>
                    Backup Database
                  </button>
                  
                  <button className="backup-manager-sa-quick-btn">
                    <i className="fas fa-file-archive"></i>
                    Backup Files
                  </button>
                  
                  <button className="backup-manager-sa-quick-btn">
                    <i className="fas fa-cogs"></i>
                    Backup Config
                  </button>
                  
                  <button className="backup-manager-sa-quick-btn">
                    <i className="fas fa-cloud-upload-alt"></i>
                    Cloud Sync
                  </button>
                </div>
              </div>
              
              <div className="backup-manager-sa-quick-card">
                <h3 className="backup-manager-sa-quick-title">
                  <i className="fas fa-chart-bar"></i>
                  Recent Activity
                </h3>
                
                <div className="backup-manager-sa-activity-list">
                  {backups.slice(0, 5).map(backup => (
                    <div key={backup.id} className="backup-manager-sa-activity-item">
                      <div className="backup-manager-sa-activity-icon">
                        <i className={`fas ${getBackupIcon(backup.type)}`}></i>
                      </div>
                      <div className="backup-manager-sa-activity-content">
                        <div className="backup-manager-sa-activity-title">{backup.name}</div>
                        <div className="backup-manager-sa-activity-meta">
                          <span className="backup-manager-sa-activity-time">{backup.createdAt}</span>
                          <span className={`backup-manager-sa-activity-status ${getStatusBadgeClass(backup.status)}`}>
                            {backup.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="backup-manager-sa-quick-card">
                <h3 className="backup-manager-sa-quick-title">
                  <i className="fas fa-shield-alt"></i>
                  Security Tips
                </h3>
                
                <div className="backup-manager-sa-tips">
                  <div className="backup-manager-sa-tip">
                    <i className="fas fa-check-circle"></i>
                    Store backups in multiple locations
                  </div>
                  <div className="backup-manager-sa-tip">
                    <i className="fas fa-check-circle"></i>
                    Verify backups regularly
                  </div>
                  <div className="backup-manager-sa-tip">
                    <i className="fas fa-check-circle"></i>
                    Encrypt sensitive backups
                  </div>
                  <div className="backup-manager-sa-tip">
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
      <div className="backup-manager-sa-footer">
        <div className="backup-manager-sa-footer-info">
          <div className="backup-manager-sa-footer-stat">
            <i className="fas fa-history"></i>
            <div>
              <div className="backup-manager-sa-footer-value">Last Full Backup: 2 days ago</div>
              <div className="backup-manager-sa-footer-label">Backup Age</div>
            </div>
          </div>
          
          <div className="backup-manager-sa-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="backup-manager-sa-footer-value">Encryption: AES-256</div>
              <div className="backup-manager-sa-footer-label">Security</div>
            </div>
          </div>
          
          <div className="backup-manager-sa-footer-stat">
            <i className="fas fa-cloud"></i>
            <div>
              <div className="backup-manager-sa-footer-value">Cloud Sync: Enabled</div>
              <div className="backup-manager-sa-footer-label">Offsite Backup</div>
            </div>
          </div>
        </div>
        
        <div className="backup-manager-sa-footer-actions">
          <button className="backup-manager-sa-footer-btn">
            <i className="fas fa-file-export"></i>
            Export Report
          </button>
          <button className="backup-manager-sa-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help & Support
          </button>
          <button className="backup-manager-sa-footer-btn">
            <i className="fas fa-book"></i>
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupManagerSuperAdmin;