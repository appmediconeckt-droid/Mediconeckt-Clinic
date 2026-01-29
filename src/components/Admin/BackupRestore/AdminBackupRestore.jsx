import React, { useState } from 'react';
import './AdminBackupRestore.css';

const AdminBackupRestore = () => {
  const [activeTab, setActiveTab] = useState('backup');
  const [selectedBackupType, setSelectedBackupType] = useState('full');
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [retentionPeriod, setRetentionPeriod] = useState(30);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [backupDescription, setBackupDescription] = useState('');
  const [backupLocation, setBackupLocation] = useState('local');
  const [restoreFile, setRestoreFile] = useState(null);
  const [restoreType, setRestoreType] = useState('full');
  const [restoreValidation, setRestoreValidation] = useState(true);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // Sample backup history data
  const [backupHistory, setBackupHistory] = useState([
    {
      id: 1,
      name: 'Full_System_Backup_2024_01_15',
      type: 'full',
      size: '2.4 GB',
      date: '2024-01-15 23:45:00',
      status: 'completed',
      encrypted: true,
      compressed: true,
      location: 'local',
      verified: true
    },
    {
      id: 2,
      name: 'Database_Backup_2024_01_14',
      type: 'database',
      size: '1.8 GB',
      date: '2024-01-14 23:45:00',
      status: 'completed',
      encrypted: true,
      compressed: true,
      location: 'cloud',
      verified: true
    },
    {
      id: 3,
      name: 'Files_Backup_2024_01_13',
      type: 'files',
      size: '850 MB',
      date: '2024-01-13 23:45:00',
      status: 'completed',
      encrypted: true,
      compressed: true,
      location: 'local',
      verified: true
    },
    {
      id: 4,
      name: 'Full_System_Backup_2024_01_12',
      type: 'full',
      size: '2.3 GB',
      date: '2024-01-12 23:45:00',
      status: 'completed',
      encrypted: true,
      compressed: true,
      location: 'cloud',
      verified: true
    },
    {
      id: 5,
      name: 'Incremental_Backup_2024_01_15_1200',
      type: 'incremental',
      size: '245 MB',
      date: '2024-01-15 12:00:00',
      status: 'completed',
      encrypted: false,
      compressed: true,
      location: 'local',
      verified: true
    },
    {
      id: 6,
      name: 'Database_Backup_2024_01_11',
      type: 'database',
      size: '1.7 GB',
      date: '2024-01-11 23:45:00',
      status: 'failed',
      encrypted: true,
      compressed: true,
      location: 'local',
      verified: false
    }
  ]);

  const backupTypes = [
    { id: 'full', name: 'Full System Backup', icon: 'fa-database', description: 'Complete backup of all system data including database and files' },
    { id: 'database', name: 'Database Only', icon: 'fa-server', description: 'Backup only the database (patients, users, appointments)' },
    { id: 'files', name: 'Files Only', icon: 'fa-folder', description: 'Backup uploaded files, documents, and images' },
    { id: 'incremental', name: 'Incremental Backup', icon: 'fa-layer-group', description: 'Backup only changes since last backup' }
  ];

  const frequencies = [
    { id: 'hourly', name: 'Hourly', icon: 'fa-clock' },
    { id: 'daily', name: 'Daily', icon: 'fa-calendar-day' },
    { id: 'weekly', name: 'Weekly', icon: 'fa-calendar-week' },
    { id: 'monthly', name: 'Monthly', icon: 'fa-calendar-alt' }
  ];

  const backupLocations = [
    { id: 'local', name: 'Local Server', icon: 'fa-hdd' },
    { id: 'cloud', name: 'Cloud Storage', icon: 'fa-cloud' },
    { id: 'external', name: 'External Drive', icon: 'fa-hdd' }
  ];

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const simulateBackupProcess = () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreatingBackup(false);
          
          // Add new backup to history
          const newBackup = {
            id: backupHistory.length + 1,
            name: `${selectedBackupType.charAt(0).toUpperCase() + selectedBackupType.slice(1)}_Backup_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}`,
            type: selectedBackupType,
            size: getEstimatedSize(),
            date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            status: 'completed',
            encrypted: encryptionEnabled,
            compressed: compressionEnabled,
            location: backupLocation,
            verified: true
          };
          
          setBackupHistory([newBackup, ...backupHistory]);
          showNotification('success', `Backup "${newBackup.name}" created successfully!`);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const simulateRestoreProcess = () => {
    setIsRestoring(true);
    setRestoreProgress(0);
    
    const interval = setInterval(() => {
      setRestoreProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRestoring(false);
          showNotification('success', 'System restore completed successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getEstimatedSize = () => {
    switch(selectedBackupType) {
      case 'full': return '2.5 GB';
      case 'database': return '1.8 GB';
      case 'files': return '900 MB';
      case 'incremental': return '250 MB';
      default: return '2.5 GB';
    }
  };

  const handleCreateBackup = () => {
    if (!backupDescription.trim()) {
      showNotification('warning', 'Please enter a backup description');
      return;
    }
    
    simulateBackupProcess();
  };

  const handleRestore = (backupId) => {
    const backup = backupHistory.find(b => b.id === backupId);
    if (!backup) {
      showNotification('error', 'Backup not found');
      return;
    }
    
    if (backup.status === 'failed') {
      showNotification('error', 'Cannot restore from a failed backup');
      return;
    }
    
    if (!backup.verified) {
      showNotification('warning', 'Backup not verified. Please verify before restoring.');
      return;
    }
    
    if (window.confirm(`Are you sure you want to restore from "${backup.name}"? This will replace current data.`)) {
      simulateRestoreProcess();
    }
  };

  const handleDeleteBackup = (backupId) => {
    const backup = backupHistory.find(b => b.id === backupId);
    if (backup && window.confirm(`Delete backup "${backup.name}"? This action cannot be undone.`)) {
      setBackupHistory(backupHistory.filter(b => b.id !== backupId));
      showNotification('info', `Backup "${backup.name}" deleted successfully`);
    }
  };

  const handleVerifyBackup = (backupId) => {
    const updatedHistory = backupHistory.map(backup => {
      if (backup.id === backupId) {
        return { ...backup, verified: true };
      }
      return backup;
    });
    setBackupHistory(updatedHistory);
    showNotification('success', 'Backup verified successfully');
  };

  const handleDownloadBackup = (backupId) => {
    const backup = backupHistory.find(b => b.id === backupId);
    if (backup) {
      showNotification('info', `Downloading backup: ${backup.name}`);
      // In real app, this would trigger file download
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith('.backup') || file.name.endsWith('.zip')) {
        setRestoreFile({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.name.includes('database') ? 'database' : 'full'
        });
        showNotification('success', 'Backup file loaded successfully');
      } else {
        showNotification('error', 'Invalid file type. Please upload a valid backup file.');
      }
    }
  };

  const handleScheduleBackup = () => {
    showNotification('success', `Backup scheduled: ${selectedBackupType} backup to run ${backupFrequency} at 11:45 PM`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return 'fa-check-circle';
      case 'failed': return 'fa-times-circle';
      case 'in_progress': return 'fa-spinner fa-spin';
      default: return 'fa-clock';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'admin-backup-status-completed';
      case 'failed': return 'admin-backup-status-failed';
      case 'in_progress': return 'admin-backup-status-progress';
      default: return 'admin-backup-status-pending';
    }
  };

  const getBackupTypeIcon = (type) => {
    switch(type) {
      case 'full': return 'fa-database';
      case 'database': return 'fa-server';
      case 'files': return 'fa-folder';
      case 'incremental': return 'fa-layer-group';
      default: return 'fa-archive';
    }
  };

  const getLocationIcon = (location) => {
    switch(location) {
      case 'local': return 'fa-hdd';
      case 'cloud': return 'fa-cloud';
      case 'external': return 'fa-hdd';
      default: return 'fa-server';
    }
  };

  return (
    <div className="admin-backup-restore-container">
      {/* Header */}
      <div className="admin-backup-header">
        <h1 className="admin-backup-title">
          <i className="fas fa-database"></i> Backup & Restore System
        </h1>
        <p className="admin-backup-subtitle">
          Protect your data with automated backups and easy restore options
        </p>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`admin-backup-notification admin-backup-notification-${notification.type}`}>
          <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
          <span>{notification.message}</span>
          <button className="admin-backup-notification-close" onClick={() => setNotification({ show: false, type: '', message: '' })}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="admin-backup-tabs">
        <button 
          className={`admin-backup-tab ${activeTab === 'backup' ? 'active' : ''}`}
          onClick={() => setActiveTab('backup')}
        >
          <i className="fas fa-save"></i> Create Backup
        </button>
        <button 
          className={`admin-backup-tab ${activeTab === 'restore' ? 'active' : ''}`}
          onClick={() => setActiveTab('restore')}
        >
          <i className="fas fa-history"></i> Restore Data
        </button>
        <button 
          className={`admin-backup-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <i className="fas fa-clipboard-list"></i> Backup History
        </button>
        <button 
          className={`admin-backup-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i> Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-backup-content">
        {/* Create Backup Tab */}
        {activeTab === 'backup' && (
          <div className="admin-backup-tab-content">
            <div className="admin-backup-card">
              <h2 className="admin-backup-card-title">
                <i className="fas fa-plus-circle"></i> Create New Backup
              </h2>
              
              <div className="admin-backup-form">
                <div className="admin-backup-form-group">
                  <label className="admin-backup-label">
                    <i className="fas fa-layer-group"></i> Backup Type
                  </label>
                  <div className="admin-backup-type-grid">
                    {backupTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`admin-backup-type-card ${selectedBackupType === type.id ? 'selected' : ''}`}
                        onClick={() => setSelectedBackupType(type.id)}
                      >
                        <div className="admin-backup-type-icon">
                          <i className={`fas ${type.icon}`}></i>
                        </div>
                        <div className="admin-backup-type-info">
                          <h4>{type.name}</h4>
                          <p>{type.description}</p>
                          <div className="admin-backup-type-size">
                            Estimated Size: {getEstimatedSize()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-backup-form-group">
                  <label className="admin-backup-label">
                    <i className="fas fa-map-marker-alt"></i> Storage Location
                  </label>
                  <div className="admin-backup-location-grid">
                    {backupLocations.map(location => (
                      <div 
                        key={location.id}
                        className={`admin-backup-location-card ${backupLocation === location.id ? 'selected' : ''}`}
                        onClick={() => setBackupLocation(location.id)}
                      >
                        <div className="admin-backup-location-icon">
                          <i className={`fas ${location.icon}`}></i>
                        </div>
                        <div className="admin-backup-location-name">
                          {location.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-backup-form-group">
                  <label className="admin-backup-label">
                    <i className="fas fa-clipboard"></i> Backup Description
                  </label>
                  <textarea
                    className="admin-backup-textarea"
                    placeholder="Describe this backup (e.g., 'Pre-update backup', 'Monthly database backup')"
                    value={backupDescription}
                    onChange={(e) => setBackupDescription(e.target.value)}
                    rows="3"
                  />
                </div>

                <div className="admin-backup-options-grid">
                  <div className="admin-backup-option">
                    <label className="admin-backup-option-label">
                      <input
                        type="checkbox"
                        checked={encryptionEnabled}
                        onChange={(e) => setEncryptionEnabled(e.target.checked)}
                        className="admin-backup-checkbox"
                      />
                      <span className="admin-backup-checkbox-custom"></span>
                      <i className="fas fa-lock"></i>
                      <span>Enable Encryption</span>
                    </label>
                    <p className="admin-backup-option-desc">Secures backup with AES-256 encryption</p>
                  </div>

                  <div className="admin-backup-option">
                    <label className="admin-backup-option-label">
                      <input
                        type="checkbox"
                        checked={compressionEnabled}
                        onChange={(e) => setCompressionEnabled(e.target.checked)}
                        className="admin-backup-checkbox"
                      />
                      <span className="admin-backup-checkbox-custom"></span>
                      <i className="fas fa-compress-alt"></i>
                      <span>Enable Compression</span>
                    </label>
                    <p className="admin-backup-option-desc">Reduces backup file size by up to 70%</p>
                  </div>
                </div>

                {isCreatingBackup ? (
                  <div className="admin-backup-progress-container">
                    <div className="admin-backup-progress-header">
                      <h4>Creating Backup...</h4>
                      <span>{backupProgress}%</span>
                    </div>
                    <div className="admin-backup-progress-bar">
                      <div 
                        className="admin-backup-progress-fill"
                        style={{ width: `${backupProgress}%` }}
                      ></div>
                    </div>
                    <div className="admin-backup-progress-steps">
                      <div className={`admin-backup-progress-step ${backupProgress >= 20 ? 'completed' : ''}`}>
                        <i className={`fas ${backupProgress >= 20 ? 'fa-check' : 'fa-database'}`}></i>
                        <span>Preparing Database</span>
                      </div>
                      <div className={`admin-backup-progress-step ${backupProgress >= 50 ? 'completed' : ''}`}>
                        <i className={`fas ${backupProgress >= 50 ? 'fa-check' : 'fa-file'}`}></i>
                        <span>Archiving Files</span>
                      </div>
                      <div className={`admin-backup-progress-step ${backupProgress >= 80 ? 'completed' : ''}`}>
                        <i className={`fas ${backupProgress >= 80 ? 'fa-check' : 'fa-lock'}`}></i>
                        <span>Encrypting Data</span>
                      </div>
                      <div className={`admin-backup-progress-step ${backupProgress >= 100 ? 'completed' : ''}`}>
                        <i className={`fas ${backupProgress >= 100 ? 'fa-check' : 'fa-save'}`}></i>
                        <span>Saving Backup</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="admin-backup-actions">
                    <button 
                      className="admin-backup-primary-btn"
                      onClick={handleCreateBackup}
                      disabled={!backupDescription.trim()}
                    >
                      <i className="fas fa-play-circle"></i> Start Backup Now
                    </button>
                    <button 
                      className="admin-backup-secondary-btn"
                      onClick={handleScheduleBackup}
                    >
                      <i className="fas fa-clock"></i> Schedule Backup
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="admin-backup-stats-grid">
              <div className="admin-backup-stat-card">
                <div className="admin-backup-stat-icon">
                  <i className="fas fa-database"></i>
                </div>
                <div className="admin-backup-stat-info">
                  <h3>Total Backups</h3>
                  <p className="admin-backup-stat-number">{backupHistory.length}</p>
                  <p className="admin-backup-stat-desc">All backup files</p>
                </div>
              </div>

              <div className="admin-backup-stat-card">
                <div className="admin-backup-stat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="admin-backup-stat-info">
                  <h3>Successful</h3>
                  <p className="admin-backup-stat-number">
                    {backupHistory.filter(b => b.status === 'completed').length}
                  </p>
                  <p className="admin-backup-stat-desc">Completed backups</p>
                </div>
              </div>

              <div className="admin-backup-stat-card">
                <div className="admin-backup-stat-icon">
                  <i className="fas fa-hdd"></i>
                </div>
                <div className="admin-backup-stat-info">
                  <h3>Total Storage</h3>
                  <p className="admin-backup-stat-number">
                    {backupHistory.reduce((total, backup) => {
                      const size = parseFloat(backup.size);
                      return total + (isNaN(size) ? 0 : size);
                    }, 0).toFixed(1)} GB
                  </p>
                  <p className="admin-backup-stat-desc">Used storage space</p>
                </div>
              </div>

              <div className="admin-backup-stat-card">
                <div className="admin-backup-stat-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="admin-backup-stat-info">
                  <h3>Verified</h3>
                  <p className="admin-backup-stat-number">
                    {backupHistory.filter(b => b.verified).length}
                  </p>
                  <p className="admin-backup-stat-desc">Verified backups</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restore Tab */}
        {activeTab === 'restore' && (
          <div className="admin-backup-tab-content">
            <div className="admin-backup-restore-grid">
              <div className="admin-backup-restore-card">
                <h2 className="admin-backup-card-title">
                  <i className="fas fa-upload"></i> Upload Backup File
                </h2>
                
                <div className="admin-backup-upload-area">
                  <div className="admin-backup-upload-box">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <h3>Drop backup file here</h3>
                    <p>or click to browse</p>
                    <input
                      type="file"
                      accept=".backup,.zip,.sql"
                      onChange={handleFileUpload}
                      className="admin-backup-file-input"
                    />
                  </div>
                  
                  {restoreFile && (
                    <div className="admin-backup-file-info">
                      <div className="admin-backup-file-header">
                        <i className="fas fa-file-archive"></i>
                        <div className="admin-backup-file-details">
                          <h4>{restoreFile.name}</h4>
                          <p>Size: {restoreFile.size} • Type: {restoreFile.type}</p>
                        </div>
                      </div>
                      <div className="admin-backup-restore-options">
                        <div className="admin-backup-form-group">
                          <label className="admin-backup-label">Restore Type</label>
                          <select 
                            className="admin-backup-select"
                            value={restoreType}
                            onChange={(e) => setRestoreType(e.target.value)}
                          >
                            <option value="full">Full System Restore</option>
                            <option value="database">Database Only</option>
                            <option value="files">Files Only</option>
                          </select>
                        </div>
                        
                        <div className="admin-backup-option">
                          <label className="admin-backup-option-label">
                            <input
                              type="checkbox"
                              checked={restoreValidation}
                              onChange={(e) => setRestoreValidation(e.target.checked)}
                              className="admin-backup-checkbox"
                            />
                            <span className="admin-backup-checkbox-custom"></span>
                            <i className="fas fa-check-double"></i>
                            <span>Validate Backup Integrity</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {isRestoring ? (
                  <div className="admin-backup-progress-container">
                    <div className="admin-backup-progress-header">
                      <h4>Restoring System...</h4>
                      <span>{restoreProgress}%</span>
                    </div>
                    <div className="admin-backup-progress-bar">
                      <div 
                        className="admin-backup-restore-progress-fill"
                        style={{ width: `${restoreProgress}%` }}
                      ></div>
                    </div>
                    <div className="admin-backup-progress-steps">
                      <div className={`admin-backup-progress-step ${restoreProgress >= 25 ? 'completed' : ''}`}>
                        <i className={`fas ${restoreProgress >= 25 ? 'fa-check' : 'fa-lock'}`}></i>
                        <span>Decrypting Backup</span>
                      </div>
                      <div className={`admin-backup-progress-step ${restoreProgress >= 50 ? 'completed' : ''}`}>
                        <i className={`fas ${restoreProgress >= 50 ? 'fa-check' : 'fa-database'}`}></i>
                        <span>Restoring Database</span>
                      </div>
                      <div className={`admin-backup-progress-step ${restoreProgress >= 75 ? 'completed' : ''}`}>
                        <i className={`fas ${restoreProgress >= 75 ? 'fa-check' : 'fa-folder'}`}></i>
                        <span>Restoring Files</span>
                      </div>
                      <div className={`admin-backup-progress-step ${restoreProgress >= 100 ? 'completed' : ''}`}>
                        <i className={`fas ${restoreProgress >= 100 ? 'fa-check' : 'fa-check-double'}`}></i>
                        <span>Verifying Restore</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    className="admin-backup-restore-btn"
                    onClick={simulateRestoreProcess}
                    disabled={!restoreFile}
                  >
                    <i className="fas fa-history"></i> Start Restore Process
                  </button>
                )}
              </div>

              <div className="admin-backup-restore-card">
                <h2 className="admin-backup-card-title">
                  <i className="fas fa-exclamation-triangle"></i> Important Notes
                </h2>
                
                <div className="admin-backup-important-notes">
                  <div className="admin-backup-note warning">
                    <i className="fas fa-exclamation-circle"></i>
                    <div>
                      <h4>System Downtime</h4>
                      <p>The system will be unavailable during restore process. Estimated downtime: 15-30 minutes.</p>
                    </div>
                  </div>
                  
                  <div className="admin-backup-note info">
                    <i className="fas fa-info-circle"></i>
                    <div>
                      <h4>Data Replacement</h4>
                      <p>Restoring will replace all current data with backup data. Ensure you have a current backup.</p>
                    </div>
                  </div>
                  
                  <div className="admin-backup-note success">
                    <i className="fas fa-check-circle"></i>
                    <div>
                      <h4>Verification</h4>
                      <p>Always verify backup integrity before restoring to prevent data corruption.</p>
                    </div>
                  </div>
                  
                  <div className="admin-backup-note danger">
                    <i className="fas fa-ban"></i>
                    <div>
                      <h4>Irreversible Action</h4>
                      <p>Restore cannot be undone. Make sure you have selected the correct backup file.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="admin-backup-tab-content">
            <div className="admin-backup-history-header">
              <h2 className="admin-backup-card-title">
                <i className="fas fa-history"></i> Backup History
              </h2>
              <div className="admin-backup-history-filters">
                <select className="admin-backup-select">
                  <option value="all">All Types</option>
                  <option value="full">Full Backups</option>
                  <option value="database">Database Backups</option>
                  <option value="files">File Backups</option>
                </select>
                <select className="admin-backup-select">
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            <div className="admin-backup-table-container">
              <table className="admin-backup-table">
                <thead>
                  <tr>
                    <th>Backup Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {backupHistory.map(backup => (
                    <tr key={backup.id} className="admin-backup-table-row">
                      <td className="admin-backup-table-name">
                        <div className="admin-backup-name-cell">
                          <i className={`fas ${getBackupTypeIcon(backup.type)}`}></i>
                          <div>
                            <div className="admin-backup-name">{backup.name}</div>
                            <div className="admin-backup-meta">
                              {backup.encrypted && <span className="admin-backup-meta-tag"><i className="fas fa-lock"></i> Encrypted</span>}
                              {backup.compressed && <span className="admin-backup-meta-tag"><i className="fas fa-compress-alt"></i> Compressed</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-backup-type-badge admin-backup-type-${backup.type}`}>
                          {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)}
                        </span>
                      </td>
                      <td className="admin-backup-table-size">{backup.size}</td>
                      <td className="admin-backup-table-date">
                        <div className="admin-backup-date-cell">
                          <div>{backup.date.split(' ')[0]}</div>
                          <div className="admin-backup-time">{backup.date.split(' ')[1]}</div>
                        </div>
                      </td>
                      <td>
                        <div className="admin-backup-location-cell">
                          <i className={`fas ${getLocationIcon(backup.location)}`}></i>
                          <span>{backup.location.charAt(0).toUpperCase() + backup.location.slice(1)}</span>
                        </div>
                      </td>
                      <td>
                        <div className={`admin-backup-status ${getStatusColor(backup.status)}`}>
                          <i className={`fas ${getStatusIcon(backup.status)}`}></i>
                          {backup.status.charAt(0).toUpperCase() + backup.status.slice(1)}
                          {!backup.verified && backup.status === 'completed' && (
                            <span className="admin-backup-unverified">Unverified</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="admin-backup-actions-cell">
                          <button 
                            className="admin-backup-action-btn restore"
                            onClick={() => handleRestore(backup.id)}
                            disabled={backup.status === 'failed'}
                            title="Restore from this backup"
                          >
                            <i className="fas fa-history"></i>
                          </button>
                          <button 
                            className="admin-backup-action-btn download"
                            onClick={() => handleDownloadBackup(backup.id)}
                            title="Download backup"
                          >
                            <i className="fas fa-download"></i>
                          </button>
                          <button 
                            className="admin-backup-action-btn verify"
                            onClick={() => handleVerifyBackup(backup.id)}
                            disabled={backup.verified}
                            title="Verify backup integrity"
                          >
                            <i className="fas fa-check-double"></i>
                          </button>
                          <button 
                            className="admin-backup-action-btn delete"
                            onClick={() => handleDeleteBackup(backup.id)}
                            title="Delete backup"
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

            <div className="admin-backup-summary">
              <h3>Storage Summary</h3>
              <div className="admin-backup-storage-chart">
                <div className="admin-backup-storage-bar">
                  <div 
                    className="admin-backup-storage-fill"
                    style={{ width: '65%' }}
                    title="65% storage used"
                  ></div>
                </div>
                <div className="admin-backup-storage-labels">
                  <span>Used: 8.5 GB</span>
                  <span>Available: 4.5 GB</span>
                  <span>Total: 13 GB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="admin-backup-tab-content">
            <div className="admin-backup-settings-grid">
              <div className="admin-backup-settings-card">
                <h2 className="admin-backup-card-title">
                  <i className="fas fa-clock"></i> Automated Backup Schedule
                </h2>
                
                <div className="admin-backup-schedule-form">
                  <div className="admin-backup-form-group">
                    <label className="admin-backup-label">Frequency</label>
                    <div className="admin-backup-frequency-grid">
                      {frequencies.map(freq => (
                        <div 
                          key={freq.id}
                          className={`admin-backup-frequency-card ${backupFrequency === freq.id ? 'selected' : ''}`}
                          onClick={() => setBackupFrequency(freq.id)}
                        >
                          <i className={`fas ${freq.icon}`}></i>
                          <span>{freq.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-backup-form-group">
                    <label className="admin-backup-label">Backup Retention</label>
                    <div className="admin-backup-retention-slider">
                      <input
                        type="range"
                        min="7"
                        max="365"
                        value={retentionPeriod}
                        onChange={(e) => setRetentionPeriod(parseInt(e.target.value))}
                        className="admin-backup-slider"
                      />
                      <div className="admin-backup-slider-labels">
                        <span>{retentionPeriod} days</span>
                        <span>Auto-delete backups older than {retentionPeriod} days</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-backup-form-group">
                    <label className="admin-backup-label">Backup Time</label>
                    <div className="admin-backup-time-selector">
                      <select className="admin-backup-time-select">
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i}>
                            {i.toString().padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                      <span className="admin-backup-time-note">System will perform backups at this time daily</span>
                    </div>
                  </div>

                  <button className="admin-backup-save-btn">
                    <i className="fas fa-save"></i> Save Schedule Settings
                  </button>
                </div>
              </div>

              <div className="admin-backup-settings-card">
                <h2 className="admin-backup-card-title">
                  <i className="fas fa-shield-alt"></i> Security Settings
                </h2>
                
                <div className="admin-backup-security-settings">
                  <div className="admin-backup-security-option">
                    <div className="admin-backup-security-info">
                      <h4>Encryption Key</h4>
                      <p>Manage your backup encryption keys</p>
                    </div>
                    <button className="admin-backup-security-btn">
                      <i className="fas fa-key"></i> Manage Keys
                    </button>
                  </div>

                  <div className="admin-backup-security-option">
                    <div className="admin-backup-security-info">
                      <h4>Access Control</h4>
                      <p>Restrict who can perform backups and restores</p>
                    </div>
                    <button className="admin-backup-security-btn">
                      <i className="fas fa-user-shield"></i> Configure Access
                    </button>
                  </div>

                  <div className="admin-backup-security-option">
                    <div className="admin-backup-security-info">
                      <h4>Backup Verification</h4>
                      <p>Automatically verify backups after creation</p>
                    </div>
                    <div className="admin-backup-toggle">
                      <label className="admin-backup-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="admin-backup-slider-round"></span>
                      </label>
                    </div>
                  </div>

                  <div className="admin-backup-security-option">
                    <div className="admin-backup-security-info">
                      <h4>Email Notifications</h4>
                      <p>Receive email alerts for backup status</p>
                    </div>
                    <div className="admin-backup-toggle">
                      <label className="admin-backup-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="admin-backup-slider-round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-backup-settings-card">
              <h2 className="admin-backup-card-title">
                <i className="fas fa-cloud"></i> Cloud Storage Configuration
              </h2>
              
              <div className="admin-backup-cloud-config">
                <div className="admin-backup-cloud-provider">
                  <div className="admin-backup-provider-card">
                    <i className="fab fa-aws"></i>
                    <h4>Amazon S3</h4>
                    <p>Not Configured</p>
                    <button className="admin-backup-provider-btn">Configure</button>
                  </div>
                  
                  <div className="admin-backup-provider-card">
                    <i className="fab fa-google-drive"></i>
                    <h4>Google Drive</h4>
                    <p>Configured</p>
                    <button className="admin-backup-provider-btn configured">Manage</button>
                  </div>
                  
                  <div className="admin-backup-provider-card">
                    <i className="fab fa-dropbox"></i>
                    <h4>Dropbox</h4>
                    <p>Not Configured</p>
                    <button className="admin-backup-provider-btn">Configure</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBackupRestore;