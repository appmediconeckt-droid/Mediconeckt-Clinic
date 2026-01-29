import React, { useState, useEffect } from 'react';
import './SuperAdminSystemSettings.css';

const SuperAdminSystemSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [changedSettings, setChangedSettings] = useState({});
  const [confirmReset, setConfirmReset] = useState(false);

  // Mock settings data
  const mockSettings = {
    general: {
      siteTitle: 'Super Admin Dashboard',
      siteDescription: 'Enterprise Management System',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      language: 'English',
      maintenanceMode: false,
      registrationEnabled: true,
      defaultUserRole: 'user',
      maxLoginAttempts: 5,
      sessionTimeout: 30,
    },
    security: {
      twoFactorAuth: true,
      passwordPolicy: 'strong',
      passwordExpiry: 90,
      passwordMinLength: 12,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      loginNotifications: true,
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      bruteForceProtection: true,
      sslEnforcement: true,
      corsOrigins: ['https://admin.example.com', 'https://dashboard.example.com'],
    },
    email: {
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
      smtpUsername: 'admin@example.com',
      smtpPassword: '********',
      smtpEncryption: 'tls',
      fromEmail: 'noreply@example.com',
      fromName: 'System Administrator',
      emailVerification: true,
      emailNotifications: true,
      emailFooter: '© 2024 Super Admin System. All rights reserved.',
      emailQueueEnabled: true,
      emailQueueLimit: 1000,
    },
    database: {
      connectionPool: 50,
      queryTimeout: 30,
      backupEnabled: true,
      backupFrequency: 'daily',
      backupRetention: 30,
      slowQueryLog: true,
      slowQueryThreshold: 5,
      maxConnections: 100,
      idleTimeout: 300,
      replicationEnabled: false,
      replicationMode: 'master-slave',
    },
    cache: {
      cacheDriver: 'redis',
      redisHost: 'localhost',
      redisPort: 6379,
      redisPassword: '',
      cachePrefix: 'superadmin_',
      defaultCacheTtl: 3600,
      sessionCacheTtl: 1800,
      apiCacheEnabled: true,
      apiCacheTtl: 300,
      clearCacheOnDeploy: true,
      cacheCompression: true,
    },
    api: {
      apiEnabled: true,
      apiRateLimit: 100,
      apiRateWindow: 'minute',
      apiKeyRequired: true,
      apiKeyExpiry: 90,
      apiCorsEnabled: true,
      apiVersion: 'v1',
      apiDocumentation: true,
      apiLogging: true,
      apiResponseFormat: 'json',
      defaultApiThrottle: 60,
    },
    monitoring: {
      enableMonitoring: true,
      metricsCollection: true,
      alertNotifications: true,
      performanceThreshold: 80,
      errorThreshold: 1,
      logRetention: 90,
      auditLogEnabled: true,
      auditLogRetention: 365,
      uptimeMonitoring: true,
      healthCheckInterval: 60,
      notificationChannels: ['email', 'slack', 'webhook'],
    },
    integration: {
      googleAnalytics: 'UA-XXXXX-Y',
      recaptchaEnabled: true,
      recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
      recaptchaSecretKey: '********',
      socialLogin: true,
      googleLogin: true,
      githubLogin: true,
      oauthTokenExpiry: 3600,
      webhookEnabled: true,
      webhookSecret: '********',
      externalApiEnabled: true,
    },
    appearance: {
      theme: 'gold',
      primaryColor: '#FFD700',
      secondaryColor: '#B8860B',
      darkMode: false,
      sidebarCollapsed: false,
      animationsEnabled: true,
      fontFamily: 'Segoe UI',
      fontSize: '14px',
      borderRadius: '8px',
      shadowIntensity: 'medium',
      customCss: '',
      customLogo: '',
      favicon: '/favicon.ico',
    },
    advanced: {
      debugMode: false,
      developerTools: false,
      queryLogging: false,
      errorReporting: true,
      errorReportingService: 'sentry',
      performanceProfiling: false,
      memoryLimit: '256M',
      executionTimeout: 30,
      compressOutput: true,
      minifyAssets: true,
      cacheBusting: true,
      cdnEnabled: false,
      cdnUrl: '',
    },
  };

  const categories = [
    { id: 'general', name: 'General', icon: 'fa-cog', description: 'Basic system configuration' },
    { id: 'security', name: 'Security', icon: 'fa-shield-alt', description: 'Security policies and settings' },
    { id: 'email', name: 'Email', icon: 'fa-envelope', description: 'Email server configuration' },
    { id: 'database', name: 'Database', icon: 'fa-database', description: 'Database settings and optimization' },
    { id: 'cache', name: 'Cache', icon: 'fa-bolt', description: 'Caching configuration' },
    { id: 'api', name: 'API', icon: 'fa-code', description: 'API management and settings' },
    { id: 'monitoring', name: 'Monitoring', icon: 'fa-chart-line', description: 'System monitoring and alerts' },
    { id: 'integration', name: 'Integration', icon: 'fa-puzzle-piece', description: 'Third-party integrations' },
    { id: 'appearance', name: 'Appearance', icon: 'fa-paint-brush', description: 'UI and theme settings' },
    { id: 'advanced', name: 'Advanced', icon: 'fa-tools', description: 'Advanced system settings' },
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSettings(mockSettings);
      setLoading(false);
    }, 1500);
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    
    setChangedSettings(prev => ({
      ...prev,
      [`${category}.${key}`]: value
    }));
  };

  const handleSaveSettings = () => {
    if (Object.keys(changedSettings).length === 0) {
      setSaveStatus({ type: 'info', message: 'No changes to save' });
      return;
    }

    setSaving(true);
    // Simulate API save
    setTimeout(() => {
      setSaving(false);
      setSaveStatus({ 
        type: 'success', 
        message: 'Settings saved successfully! Some changes may require a system restart.' 
      });
      setChangedSettings({});
      
      // Clear status after 5 seconds
      setTimeout(() => setSaveStatus(null), 5000);
    }, 2000);
  };

  const handleResetToDefaults = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }

    setSettings(mockSettings);
    setChangedSettings({});
    setConfirmReset(false);
    setSaveStatus({ 
      type: 'warning', 
      message: 'Settings have been reset to default values' 
    });
    
    setTimeout(() => setSaveStatus(null), 5000);
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `system-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportSettings = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target.result);
        setSettings(importedSettings);
        setSaveStatus({ 
          type: 'success', 
          message: 'Settings imported successfully!' 
        });
        setTimeout(() => setSaveStatus(null), 5000);
      } catch (error) {
        setSaveStatus({ 
          type: 'error', 
          message: 'Failed to import settings. Invalid file format.' 
        });
        setTimeout(() => setSaveStatus(null), 5000);
      }
    };
    reader.readAsText(file);
  };

  const renderSettingField = (category, key, value, label, type = 'text', options = []) => {
    const settingKey = `${category}.${key}`;
    
    return (
      <div key={settingKey} className="superadmin-setting-field">
        <label className="superadmin-setting-label">
          {label}
          {changedSettings[settingKey] && (
            <span className="superadmin-setting-changed-indicator">
              <i className="fas fa-circle"></i>
              Changed
            </span>
          )}
        </label>
        
        <div className="superadmin-setting-input">
          {type === 'boolean' ? (
            <label className="superadmin-setting-toggle">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange(category, key, e.target.checked)}
              />
              <span className="superadmin-setting-toggle-slider"></span>
              <span className="superadmin-setting-toggle-label">
                {value ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          ) : type === 'select' ? (
            <select
              value={value}
              onChange={(e) => handleSettingChange(category, key, e.target.value)}
              className="superadmin-setting-select"
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === 'textarea' ? (
            <textarea
              value={value}
              onChange={(e) => handleSettingChange(category, key, e.target.value)}
              className="superadmin-setting-textarea"
              rows={4}
            />
          ) : type === 'number' ? (
            <input
              type="number"
              value={value}
              onChange={(e) => handleSettingChange(category, key, parseInt(e.target.value))}
              className="superadmin-setting-number"
              min={0}
            />
          ) : type === 'password' ? (
            <div className="superadmin-setting-password">
              <input
                type="password"
                value={value}
                onChange={(e) => handleSettingChange(category, key, e.target.value)}
                className="superadmin-setting-text"
                placeholder="Enter password"
              />
              <button 
                type="button" 
                className="superadmin-setting-password-toggle"
                onClick={() => {
                  const input = document.querySelector(`.superadmin-setting-text[value="${value}"]`);
                  if (input) {
                    input.type = input.type === 'password' ? 'text' : 'password';
                  }
                }}
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          ) : type === 'array' ? (
            <div className="superadmin-setting-array">
              {Array.isArray(value) ? value.map((item, index) => (
                <div key={index} className="superadmin-setting-array-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newArray = [...value];
                      newArray[index] = e.target.value;
                      handleSettingChange(category, key, newArray);
                    }}
                    className="superadmin-setting-text"
                  />
                  <button
                    type="button"
                    className="superadmin-setting-array-remove"
                    onClick={() => {
                      const newArray = value.filter((_, i) => i !== index);
                      handleSettingChange(category, key, newArray);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )) : null}
              <button
                type="button"
                className="superadmin-setting-array-add"
                onClick={() => {
                  const newArray = [...(value || []), ''];
                  handleSettingChange(category, key, newArray);
                }}
              >
                <i className="fas fa-plus"></i>
                Add Item
              </button>
            </div>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => handleSettingChange(category, key, e.target.value)}
              className="superadmin-setting-text"
            />
          )}
        </div>
        
        <div className="superadmin-setting-description">
          {getSettingDescription(category, key)}
        </div>
      </div>
    );
  };

  const getSettingDescription = (category, key) => {
    const descriptions = {
      general: {
        siteTitle: 'The title displayed in browser tabs and page headers',
        timezone: 'Default timezone for the system',
        maintenanceMode: 'Enable to put the system in maintenance mode',
        maxLoginAttempts: 'Maximum failed login attempts before lockout',
      },
      security: {
        twoFactorAuth: 'Require two-factor authentication for all users',
        passwordPolicy: 'Password strength requirements',
        ipWhitelist: 'IP addresses allowed to access the system (CIDR format)',
        sslEnforcement: 'Force HTTPS for all connections',
      },
      email: {
        smtpHost: 'SMTP server hostname',
        emailQueueEnabled: 'Enable email queue for better performance',
        emailVerification: 'Require email verification for new users',
      },
      database: {
        backupEnabled: 'Enable automatic database backups',
        slowQueryLog: 'Log queries that take longer than the threshold',
        replicationEnabled: 'Enable database replication',
      },
      cache: {
        cacheDriver: 'Cache storage driver (redis, file, array)',
        defaultCacheTtl: 'Default cache time-to-live in seconds',
        apiCacheEnabled: 'Cache API responses for better performance',
      },
      api: {
        apiRateLimit: 'Maximum API requests per rate window',
        apiKeyRequired: 'Require API key for all API requests',
        apiDocumentation: 'Enable API documentation endpoint',
      },
      monitoring: {
        enableMonitoring: 'Enable system monitoring and metrics collection',
        alertNotifications: 'Send alerts for system issues',
        auditLogEnabled: 'Log all system activities for auditing',
      },
      integration: {
        googleAnalytics: 'Google Analytics tracking ID',
        recaptchaEnabled: 'Enable reCAPTCHA for forms',
        socialLogin: 'Allow login with social media accounts',
      },
      appearance: {
        theme: 'System color theme',
        darkMode: 'Enable dark mode interface',
        animationsEnabled: 'Enable UI animations',
      },
      advanced: {
        debugMode: 'Enable debug mode (shows detailed errors)',
        memoryLimit: 'PHP memory limit for the application',
        cdnEnabled: 'Use CDN for static assets',
      },
    };
    
    return descriptions[category]?.[key] || 'No description available';
  };

  const renderCategoryContent = (category) => {
    if (!settings[category]) return null;

    const categorySettings = settings[category];
    const settingFields = {
      general: [
        { key: 'siteTitle', label: 'Site Title', type: 'text' },
        { key: 'siteDescription', label: 'Site Description', type: 'text' },
        { key: 'timezone', label: 'Timezone', type: 'select', options: [
          { value: 'UTC', label: 'UTC' },
          { value: 'America/New_York', label: 'Eastern Time' },
          { value: 'America/Chicago', label: 'Central Time' },
          { value: 'America/Denver', label: 'Mountain Time' },
          { value: 'America/Los_Angeles', label: 'Pacific Time' },
          { value: 'Europe/London', label: 'London' },
          { value: 'Europe/Paris', label: 'Paris' },
          { value: 'Asia/Tokyo', label: 'Tokyo' },
        ]},
        { key: 'dateFormat', label: 'Date Format', type: 'select', options: [
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
        ]},
        { key: 'timeFormat', label: 'Time Format', type: 'select', options: [
          { value: '24h', label: '24 Hour' },
          { value: '12h', label: '12 Hour' },
        ]},
        { key: 'language', label: 'Language', type: 'select', options: [
          { value: 'English', label: 'English' },
          { value: 'Spanish', label: 'Spanish' },
          { value: 'French', label: 'French' },
          { value: 'German', label: 'German' },
        ]},
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'boolean' },
        { key: 'registrationEnabled', label: 'User Registration', type: 'boolean' },
        { key: 'defaultUserRole', label: 'Default User Role', type: 'text' },
        { key: 'maxLoginAttempts', label: 'Max Login Attempts', type: 'number' },
        { key: 'sessionTimeout', label: 'Session Timeout (minutes)', type: 'number' },
      ],
      security: [
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', type: 'boolean' },
        { key: 'passwordPolicy', label: 'Password Policy', type: 'select', options: [
          { value: 'weak', label: 'Weak (min 6 chars)' },
          { value: 'medium', label: 'Medium (min 8 chars, mixed case)' },
          { value: 'strong', label: 'Strong (min 12 chars, special chars)' },
        ]},
        { key: 'passwordExpiry', label: 'Password Expiry (days)', type: 'number' },
        { key: 'passwordMinLength', label: 'Minimum Password Length', type: 'number' },
        { key: 'requireSpecialChars', label: 'Require Special Characters', type: 'boolean' },
        { key: 'requireNumbers', label: 'Require Numbers', type: 'boolean' },
        { key: 'requireUppercase', label: 'Require Uppercase', type: 'boolean' },
        { key: 'loginNotifications', label: 'Login Notifications', type: 'boolean' },
        { key: 'ipWhitelist', label: 'IP Whitelist', type: 'array' },
        { key: 'bruteForceProtection', label: 'Brute Force Protection', type: 'boolean' },
        { key: 'sslEnforcement', label: 'SSL Enforcement', type: 'boolean' },
        { key: 'corsOrigins', label: 'CORS Allowed Origins', type: 'array' },
      ],
      email: [
        { key: 'smtpHost', label: 'SMTP Host', type: 'text' },
        { key: 'smtpPort', label: 'SMTP Port', type: 'number' },
        { key: 'smtpUsername', label: 'SMTP Username', type: 'text' },
        { key: 'smtpPassword', label: 'SMTP Password', type: 'password' },
        { key: 'smtpEncryption', label: 'SMTP Encryption', type: 'select', options: [
          { value: 'none', label: 'None' },
          { value: 'ssl', label: 'SSL' },
          { value: 'tls', label: 'TLS' },
        ]},
        { key: 'fromEmail', label: 'From Email', type: 'text' },
        { key: 'fromName', label: 'From Name', type: 'text' },
        { key: 'emailVerification', label: 'Email Verification', type: 'boolean' },
        { key: 'emailNotifications', label: 'Email Notifications', type: 'boolean' },
        { key: 'emailFooter', label: 'Email Footer', type: 'textarea' },
        { key: 'emailQueueEnabled', label: 'Email Queue', type: 'boolean' },
        { key: 'emailQueueLimit', label: 'Email Queue Limit', type: 'number' },
      ],
      // Other categories would have similar structures...
    };

    const fields = settingFields[category] || [];

    return (
      <div className="superadmin-settings-category-content">
        <div className="superadmin-settings-category-header">
          <h3 className="superadmin-settings-category-title">
            <i className={`fas ${categories.find(c => c.id === category)?.icon}`}></i>
            {categories.find(c => c.id === category)?.name} Settings
          </h3>
          <p className="superadmin-settings-category-description">
            {categories.find(c => c.id === category)?.description}
          </p>
        </div>
        
        <div className="superadmin-settings-fields">
          {fields.map(field => 
            renderSettingField(
              category,
              field.key,
              categorySettings[field.key],
              field.label,
              field.type,
              field.options
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="superadmin-system-settings-container">
      {/* Header */}
      <div className="superadmin-settings-header">
        <div className="superadmin-settings-header-main">
          <h1 className="superadmin-settings-title">
            <i className="fas fa-crown superadmin-settings-crown"></i>
            System Settings
          </h1>
          <p className="superadmin-settings-subtitle">
            Configure and manage all system settings
          </p>
        </div>
        
        <div className="superadmin-settings-stats">
          <div className="superadmin-settings-stat-card">
            <div className="superadmin-settings-stat-icon">
              <i className="fas fa-cogs"></i>
            </div>
            <div>
              <div className="superadmin-settings-stat-value">{categories.length}</div>
              <div className="superadmin-settings-stat-label">Categories</div>
            </div>
          </div>
          
          <div className="superadmin-settings-stat-card">
            <div className="superadmin-settings-stat-icon">
              <i className="fas fa-sliders-h"></i>
            </div>
            <div>
              <div className="superadmin-settings-stat-value">
                {Object.keys(changedSettings).length}
              </div>
              <div className="superadmin-settings-stat-label">Pending Changes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`superadmin-settings-save-status superadmin-settings-status-${saveStatus.type}`}>
          <div className="superadmin-settings-status-content">
            <i className={`fas fa-${saveStatus.type === 'success' ? 'check-circle' : 
              saveStatus.type === 'error' ? 'exclamation-circle' : 
              saveStatus.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}`}></i>
            <span>{saveStatus.message}</span>
            <button 
              className="superadmin-settings-status-close"
              onClick={() => setSaveStatus(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="superadmin-settings-content">
        {/* Categories Sidebar */}
        <div className="superadmin-settings-sidebar">
          <div className="superadmin-settings-sidebar-header">
            <h3 className="superadmin-settings-sidebar-title">
              <i className="fas fa-folder"></i>
              Categories
            </h3>
            <div className="superadmin-settings-sidebar-search">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search settings..."
                className="superadmin-settings-search-input"
              />
            </div>
          </div>
          
          <div className="superadmin-settings-categories">
            {categories.map(category => (
              <div 
                key={category.id}
                className={`superadmin-settings-category-item ${activeTab === category.id ? 'superadmin-settings-category-active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <div className="superadmin-settings-category-icon">
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <div className="superadmin-settings-category-info">
                  <div className="superadmin-settings-category-name">{category.name}</div>
                  <div className="superadmin-settings-category-desc">{category.description}</div>
                </div>
                <div className="superadmin-settings-category-arrow">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            ))}
          </div>
          
          <div className="superadmin-settings-sidebar-footer">
            <div className="superadmin-settings-legend">
              <div className="superadmin-settings-legend-item">
                <span className="superadmin-settings-legend-dot superadmin-settings-legend-changed"></span>
                <span>Changed</span>
              </div>
              <div className="superadmin-settings-legend-item">
                <span className="superadmin-settings-legend-dot superadmin-settings-legend-advanced"></span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="superadmin-settings-main">
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
                ) : (
            <>
              <div className="superadmin-settings-main-header">
                <div className="superadmin-settings-breadcrumb">
                  <span className="superadmin-settings-breadcrumb-item">System</span>
                  <i className="fas fa-chevron-right"></i>
                  <span className="superadmin-settings-breadcrumb-item">Settings</span>
                  <i className="fas fa-chevron-right"></i>
                  <span className="superadmin-settings-breadcrumb-item active">
                    {categories.find(c => c.id === activeTab)?.name}
                  </span>
                </div>
                
                <div className="superadmin-settings-actions">
                  <button 
                    className="superadmin-settings-action-btn superadmin-settings-action-export"
                    onClick={handleExportSettings}
                  >
                    <i className="fas fa-file-export"></i>
                    Export
                  </button>
                  
                  <label className="superadmin-settings-action-btn superadmin-settings-action-import">
                    <i className="fas fa-file-import"></i>
                    Import
                    <input 
                      type="file" 
                      accept=".json"
                      onChange={handleImportSettings}
                      style={{ display: 'none' }}
                    />
                  </label>
                  
                  <button 
                    className={`superadmin-settings-action-btn superadmin-settings-action-reset ${confirmReset ? 'superadmin-settings-action-reset-confirm' : ''}`}
                    onClick={handleResetToDefaults}
                  >
                    <i className="fas fa-undo"></i>
                    {confirmReset ? 'Confirm Reset' : 'Reset Defaults'}
                  </button>
                  
                  <button 
                    className="superadmin-settings-action-btn superadmin-settings-action-save"
                    onClick={handleSaveSettings}
                    disabled={saving || Object.keys(changedSettings).length === 0}
                  >
                    <i className={`fas fa-save ${saving ? 'fa-spin' : ''}`}></i>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
              
              <div className="superadmin-settings-main-content">
                {renderCategoryContent(activeTab)}
              </div>
              
              <div className="superadmin-settings-main-footer">
                <div className="superadmin-settings-changes-summary">
                  <h4 className="superadmin-settings-changes-title">
                    <i className="fas fa-history"></i>
                    Pending Changes
                  </h4>
                  
                  {Object.keys(changedSettings).length === 0 ? (
                    <div className="superadmin-settings-no-changes">
                      <i className="fas fa-check-circle"></i>
                      <p>No pending changes</p>
                    </div>
                  ) : (
                    <div className="superadmin-settings-changes-list">
                      {Object.entries(changedSettings).map(([key, value]) => {
                        const [category, setting] = key.split('.');
                        const categoryName = categories.find(c => c.id === category)?.name || category;
                        
                        return (
                          <div key={key} className="superadmin-settings-change-item">
                            <div className="superadmin-settings-change-category">{categoryName}</div>
                            <div className="superadmin-settings-change-setting">{setting}</div>
                            <div className="superadmin-settings-change-value">
                              {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : 
                               typeof value === 'object' ? JSON.stringify(value) : value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="superadmin-settings-quick-actions">
        <div className="superadmin-settings-quick-card">
          <h3 className="superadmin-settings-quick-title">
            <i className="fas fa-bolt"></i>
            Quick Actions
          </h3>
          
          <div className="superadmin-settings-quick-buttons">
            <button className="superadmin-settings-quick-btn">
              <i className="fas fa-redo"></i>
              Clear Cache
            </button>
            
            <button className="superadmin-settings-quick-btn">
              <i className="fas fa-history"></i>
              View Logs
            </button>
            
            <button className="superadmin-settings-quick-btn">
              <i className="fas fa-shield-alt"></i>
              Security Scan
            </button>
            
            <button className="superadmin-settings-quick-btn">
              <i className="fas fa-database"></i>
              Backup Now
            </button>
          </div>
        </div>
        
        <div className="superadmin-settings-quick-card">
          <h3 className="superadmin-settings-quick-title">
            <i className="fas fa-info-circle"></i>
            System Information
          </h3>
          
          <div className="superadmin-settings-system-info">
            <div className="superadmin-settings-system-item">
              <div className="superadmin-settings-system-label">Version</div>
              <div className="superadmin-settings-system-value">v3.2.1</div>
            </div>
            
            <div className="superadmin-settings-system-item">
              <div className="superadmin-settings-system-label">Environment</div>
              <div className="superadmin-settings-system-value">Production</div>
            </div>
            
            <div className="superadmin-settings-system-item">
              <div className="superadmin-settings-system-label">Last Updated</div>
              <div className="superadmin-settings-system-value">2 days ago</div>
            </div>
            
            <div className="superadmin-settings-system-item">
              <div className="superadmin-settings-system-label">Uptime</div>
              <div className="superadmin-settings-system-value">99.8%</div>
            </div>
          </div>
        </div>
        
        <div className="superadmin-settings-quick-card">
          <h3 className="superadmin-settings-quick-title">
            <i className="fas fa-exclamation-triangle"></i>
            Warnings
          </h3>
          
          <div className="superadmin-settings-warnings">
            <div className="superadmin-settings-warning-item">
              <i className="fas fa-exclamation-circle"></i>
              <div>
                <div className="superadmin-settings-warning-title">SSL Certificate Expiring</div>
                <div className="superadmin-settings-warning-desc">Renew within 15 days</div>
              </div>
            </div>
            
            <div className="superadmin-settings-warning-item">
              <i className="fas fa-exclamation-circle"></i>
              <div>
                <div className="superadmin-settings-warning-title">Backup Space Low</div>
                <div className="superadmin-settings-warning-desc">15% storage remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="superadmin-settings-footer">
        <div className="superadmin-settings-footer-info">
          <div className="superadmin-settings-footer-stat">
            <i className="fas fa-clock"></i>
            <div>
              <div className="superadmin-settings-footer-value">Settings Last Saved: 2 hours ago</div>
              <div className="superadmin-settings-footer-label">Auto-save: Enabled</div>
            </div>
          </div>
          
          <div className="superadmin-settings-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="superadmin-settings-footer-value">Security Audit: Passed</div>
              <div className="superadmin-settings-footer-label">Last Audit: Today</div>
            </div>
          </div>
        </div>
        
        <div className="superadmin-settings-footer-actions">
          <button className="superadmin-settings-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help & Documentation
          </button>
          <button className="superadmin-settings-footer-btn">
            <i className="fas fa-history"></i>
            View Change History
          </button>
          <button className="superadmin-settings-footer-btn">
            <i className="fas fa-bug"></i>
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSystemSettings;