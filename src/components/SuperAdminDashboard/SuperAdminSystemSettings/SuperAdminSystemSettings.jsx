import React, { useState, useEffect } from 'react';
import './SuperAdminSystemSettings.css';

const SupAdminSystemSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [changedSettings, setChangedSettings] = useState({});
  const [confirmReset, setConfirmReset] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      cachePrefix: 'supadmin_',
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

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      setTimeout(() => setSaveStatus(null), 3000);
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
      setTimeout(() => setConfirmReset(false), 5000);
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

  const handleClearCache = () => {
    setSaveStatus({ type: 'info', message: 'Cache cleared successfully!' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const renderSettingField = (category, key, value, label, type = 'text', options = []) => {
    const settingKey = `${category}.${key}`;
    
    return (
      <div key={settingKey} className="supadmin-setting-field">
        <label className="supadmin-setting-label">
          {label}
          {changedSettings[settingKey] && (
            <span className="supadmin-setting-changed-indicator">
              <i className="fas fa-circle"></i>
              Changed
            </span>
          )}
        </label>
        
        <div className="supadmin-setting-input">
          {type === 'boolean' ? (
            <label className="supadmin-setting-toggle">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange(category, key, e.target.checked)}
              />
              <span className="supadmin-setting-toggle-slider"></span>
              <span className="supadmin-setting-toggle-label">
                {value ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          ) : type === 'select' ? (
            <select
              value={value}
              onChange={(e) => handleSettingChange(category, key, e.target.value)}
              className="supadmin-setting-select"
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
              className="supadmin-setting-textarea"
              rows={4}
            />
          ) : type === 'number' ? (
            <input
              type="number"
              value={value}
              onChange={(e) => handleSettingChange(category, key, parseInt(e.target.value))}
              className="supadmin-setting-number"
              min={0}
            />
          ) : type === 'password' ? (
            <div className="supadmin-setting-password">
              <input
                type="password"
                value={value}
                onChange={(e) => handleSettingChange(category, key, e.target.value)}
                className="supadmin-setting-text"
                placeholder="Enter password"
              />
              <button 
                type="button" 
                className="supadmin-setting-password-toggle"
                onClick={(e) => {
                  const input = e.target.parentElement.querySelector('input');
                  input.type = input.type === 'password' ? 'text' : 'password';
                }}
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          ) : type === 'array' ? (
            <div className="supadmin-setting-array">
              {Array.isArray(value) ? value.map((item, index) => (
                <div key={index} className="supadmin-setting-array-item">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newArray = [...value];
                      newArray[index] = e.target.value;
                      handleSettingChange(category, key, newArray);
                    }}
                    className="supadmin-setting-text"
                  />
                  <button
                    type="button"
                    className="supadmin-setting-array-remove"
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
                className="supadmin-setting-array-add"
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
              className="supadmin-setting-text"
            />
          )}
        </div>
        
        <div className="supadmin-setting-description">
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
      database: [
        { key: 'connectionPool', label: 'Connection Pool Size', type: 'number' },
        { key: 'queryTimeout', label: 'Query Timeout (seconds)', type: 'number' },
        { key: 'backupEnabled', label: 'Enable Backups', type: 'boolean' },
        { key: 'backupFrequency', label: 'Backup Frequency', type: 'select', options: [
          { value: 'hourly', label: 'Hourly' },
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
        ]},
        { key: 'backupRetention', label: 'Backup Retention (days)', type: 'number' },
        { key: 'slowQueryLog', label: 'Log Slow Queries', type: 'boolean' },
        { key: 'slowQueryThreshold', label: 'Slow Query Threshold (seconds)', type: 'number' },
      ],
      cache: [
        { key: 'cacheDriver', label: 'Cache Driver', type: 'select', options: [
          { value: 'redis', label: 'Redis' },
          { value: 'memcached', label: 'Memcached' },
          { value: 'file', label: 'File' },
          { value: 'array', label: 'Array' },
        ]},
        { key: 'redisHost', label: 'Redis Host', type: 'text' },
        { key: 'redisPort', label: 'Redis Port', type: 'number' },
        { key: 'redisPassword', label: 'Redis Password', type: 'password' },
        { key: 'defaultCacheTtl', label: 'Default Cache TTL (seconds)', type: 'number' },
        { key: 'sessionCacheTtl', label: 'Session Cache TTL (seconds)', type: 'number' },
        { key: 'apiCacheEnabled', label: 'API Cache Enabled', type: 'boolean' },
      ],
      api: [
        { key: 'apiEnabled', label: 'API Enabled', type: 'boolean' },
        { key: 'apiRateLimit', label: 'API Rate Limit', type: 'number' },
        { key: 'apiRateWindow', label: 'Rate Limit Window', type: 'select', options: [
          { value: 'minute', label: 'Per Minute' },
          { value: 'hour', label: 'Per Hour' },
          { value: 'day', label: 'Per Day' },
        ]},
        { key: 'apiKeyRequired', label: 'API Key Required', type: 'boolean' },
        { key: 'apiKeyExpiry', label: 'API Key Expiry (days)', type: 'number' },
        { key: 'apiCorsEnabled', label: 'CORS Enabled', type: 'boolean' },
      ],
      monitoring: [
        { key: 'enableMonitoring', label: 'Enable Monitoring', type: 'boolean' },
        { key: 'metricsCollection', label: 'Collect Metrics', type: 'boolean' },
        { key: 'alertNotifications', label: 'Alert Notifications', type: 'boolean' },
        { key: 'performanceThreshold', label: 'Performance Threshold (%)', type: 'number' },
        { key: 'errorThreshold', label: 'Error Threshold (%)', type: 'number' },
        { key: 'auditLogEnabled', label: 'Audit Log Enabled', type: 'boolean' },
      ],
      integration: [
        { key: 'googleAnalytics', label: 'Google Analytics ID', type: 'text' },
        { key: 'recaptchaEnabled', label: 'reCAPTCHA Enabled', type: 'boolean' },
        { key: 'recaptchaSiteKey', label: 'reCAPTCHA Site Key', type: 'text' },
        { key: 'recaptchaSecretKey', label: 'reCAPTCHA Secret Key', type: 'password' },
        { key: 'socialLogin', label: 'Social Login', type: 'boolean' },
        { key: 'googleLogin', label: 'Google Login', type: 'boolean' },
      ],
      appearance: [
        { key: 'theme', label: 'Theme', type: 'select', options: [
          { value: 'gold', label: 'Gold' },
          { value: 'blue', label: 'Blue' },
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' },
        ]},
        { key: 'primaryColor', label: 'Primary Color', type: 'color' },
        { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
        { key: 'darkMode', label: 'Dark Mode', type: 'boolean' },
        { key: 'animationsEnabled', label: 'Animations', type: 'boolean' },
        { key: 'fontFamily', label: 'Font Family', type: 'text' },
      ],
      advanced: [
        { key: 'debugMode', label: 'Debug Mode', type: 'boolean' },
        { key: 'developerTools', label: 'Developer Tools', type: 'boolean' },
        { key: 'errorReporting', label: 'Error Reporting', type: 'boolean' },
        { key: 'memoryLimit', label: 'Memory Limit', type: 'text' },
        { key: 'executionTimeout', label: 'Execution Timeout (seconds)', type: 'number' },
        { key: 'cdnEnabled', label: 'CDN Enabled', type: 'boolean' },
      ]
    };

    const fields = settingFields[category] || [];

    return (
      <div className="supadmin-settings-category-content">
        <div className="supadmin-settings-category-header">
          <h3 className="supadmin-settings-category-title">
            <i className={`fas ${categories.find(c => c.id === category)?.icon}`}></i>
            {categories.find(c => c.id === category)?.name} Settings
          </h3>
          <p className="supadmin-settings-category-description">
            {categories.find(c => c.id === category)?.description}
          </p>
        </div>
        
        <div className="supadmin-settings-fields">
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
    <div className="supadmin-system-settings-container">
      {/* Header */}
      <div className="supadmin-settings-header">
        <div className="supadmin-settings-header-main">
          <h1 className="supadmin-settings-title">
            <i className="fas fa-crown supadmin-settings-crown"></i>
            System Settings
          </h1>
          <p className="supadmin-settings-subtitle">
            Configure and manage all system settings
          </p>
        </div>
        
        <div className="supadmin-settings-stats">
          <div className="supadmin-settings-stat-card">
            <div className="supadmin-settings-stat-icon">
              <i className="fas fa-cogs"></i>
            </div>
            <div>
              <div className="supadmin-settings-stat-value">{categories.length}</div>
              <div className="supadmin-settings-stat-label">Categories</div>
            </div>
          </div>
          
          <div className="supadmin-settings-stat-card">
            <div className="supadmin-settings-stat-icon">
              <i className="fas fa-sliders-h"></i>
            </div>
            <div>
              <div className="supadmin-settings-stat-value">
                {Object.keys(changedSettings).length}
              </div>
              <div className="supadmin-settings-stat-label">Pending Changes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div className={`supadmin-settings-save-status supadmin-settings-status-${saveStatus.type}`}>
          <div className="supadmin-settings-status-content">
            <i className={`fas fa-${saveStatus.type === 'success' ? 'check-circle' : 
              saveStatus.type === 'error' ? 'exclamation-circle' : 
              saveStatus.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}`}></i>
            <span>{saveStatus.message}</span>
            <button 
              className="supadmin-settings-status-close"
              onClick={() => setSaveStatus(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="supadmin-settings-content">
        {/* Categories Sidebar */}
        <div className="supadmin-settings-sidebar">
          <div className="supadmin-settings-sidebar-header">
            <h3 className="supadmin-settings-sidebar-title">
              <i className="fas fa-folder"></i>
              Categories
            </h3>
            <div className="supadmin-settings-sidebar-search">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search settings..."
                className="supadmin-settings-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="supadmin-settings-categories">
            {filteredCategories.map(category => (
              <div 
                key={category.id}
                className={`supadmin-settings-category-item ${activeTab === category.id ? 'supadmin-settings-category-active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <div className="supadmin-settings-category-icon">
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <div className="supadmin-settings-category-info">
                  <div className="supadmin-settings-category-name">{category.name}</div>
                  <div className="supadmin-settings-category-desc">{category.description}</div>
                </div>
                <div className="supadmin-settings-category-arrow">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            ))}
          </div>
          
          <div className="supadmin-settings-sidebar-footer">
            <div className="supadmin-settings-legend">
              <div className="supadmin-settings-legend-item">
                <span className="supadmin-settings-legend-dot supadmin-settings-legend-changed"></span>
                <span>Changed</span>
              </div>
              <div className="supadmin-settings-legend-item">
                <span className="supadmin-settings-legend-dot supadmin-settings-legend-advanced"></span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="supadmin-settings-main">
          {loading ? (
            <div className="supadmin-settings-loading">
              <div className="supadmin-loading-container">
                <div className="supadmin-gold-spinner">
                  <div className="supadmin-spinner-circle"></div>
                  <div className="supadmin-spinner-circle"></div>
                  <div className="supadmin-spinner-circle"></div>
                  <div className="supadmin-spinner-circle"></div>
                </div>
                <div className="supadmin-loading-text">
                  <h3>Loading Settings...</h3>
                  <p>Please wait while we load your configuration</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="supadmin-settings-main-header">
                <div className="supadmin-settings-breadcrumb">
                  <span className="supadmin-settings-breadcrumb-item">System</span>
                  <i className="fas fa-chevron-right"></i>
                  <span className="supadmin-settings-breadcrumb-item">Settings</span>
                  <i className="fas fa-chevron-right"></i>
                  <span className="supadmin-settings-breadcrumb-item active">
                    {categories.find(c => c.id === activeTab)?.name}
                  </span>
                </div>
                
                <div className="supadmin-settings-actions">
                  <button 
                    className="supadmin-settings-action-btn supadmin-settings-action-export"
                    onClick={handleExportSettings}
                  >
                    <i className="fas fa-file-export"></i>
                    Export
                  </button>
                  
                  <label className="supadmin-settings-action-btn supadmin-settings-action-import">
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
                    className={`supadmin-settings-action-btn supadmin-settings-action-reset ${confirmReset ? 'supadmin-settings-action-reset-confirm' : ''}`}
                    onClick={handleResetToDefaults}
                  >
                    <i className="fas fa-undo"></i>
                    {confirmReset ? 'Confirm Reset' : 'Reset Defaults'}
                  </button>
                  
                  <button 
                    className="supadmin-settings-action-btn supadmin-settings-action-save"
                    onClick={handleSaveSettings}
                    disabled={saving || Object.keys(changedSettings).length === 0}
                  >
                    <i className={`fas fa-save ${saving ? 'fa-spin' : ''}`}></i>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
              
              <div className="supadmin-settings-main-content">
                {renderCategoryContent(activeTab)}
              </div>
              
              <div className="supadmin-settings-main-footer">
                <div className="supadmin-settings-changes-summary">
                  <h4 className="supadmin-settings-changes-title">
                    <i className="fas fa-history"></i>
                    Pending Changes
                  </h4>
                  
                  {Object.keys(changedSettings).length === 0 ? (
                    <div className="supadmin-settings-no-changes">
                      <i className="fas fa-check-circle"></i>
                      <p>No pending changes</p>
                    </div>
                  ) : (
                    <div className="supadmin-settings-changes-list">
                      {Object.entries(changedSettings).map(([key, value]) => {
                        const [category, setting] = key.split('.');
                        const categoryName = categories.find(c => c.id === category)?.name || category;
                        
                        return (
                          <div key={key} className="supadmin-settings-change-item">
                            <div className="supadmin-settings-change-category">{categoryName}</div>
                            <div className="supadmin-settings-change-setting">{setting}</div>
                            <div className="supadmin-settings-change-value">
                              {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : 
                               typeof value === 'object' ? JSON.stringify(value) : String(value)}
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
      <div className="supadmin-settings-quick-actions">
        <div className="supadmin-settings-quick-card">
          <h3 className="supadmin-settings-quick-title">
            <i className="fas fa-bolt"></i>
            Quick Actions
          </h3>
          
          <div className="supadmin-settings-quick-buttons">
            <button className="supadmin-settings-quick-btn" onClick={handleClearCache}>
              <i className="fas fa-redo"></i>
              Clear Cache
            </button>
            
            <button className="supadmin-settings-quick-btn">
              <i className="fas fa-history"></i>
              View Logs
            </button>
            
            <button className="supadmin-settings-quick-btn">
              <i className="fas fa-shield-alt"></i>
              Security Scan
            </button>
            
            <button className="supadmin-settings-quick-btn">
              <i className="fas fa-database"></i>
              Backup Now
            </button>
          </div>
        </div>
        
        <div className="supadmin-settings-quick-card">
          <h3 className="supadmin-settings-quick-title">
            <i className="fas fa-info-circle"></i>
            System Information
          </h3>
          
          <div className="supadmin-settings-system-info">
            <div className="supadmin-settings-system-item">
              <div className="supadmin-settings-system-label">Version</div>
              <div className="supadmin-settings-system-value">v3.2.1</div>
            </div>
            
            <div className="supadmin-settings-system-item">
              <div className="supadmin-settings-system-label">Environment</div>
              <div className="supadmin-settings-system-value">Production</div>
            </div>
            
            <div className="supadmin-settings-system-item">
              <div className="supadmin-settings-system-label">Last Updated</div>
              <div className="supadmin-settings-system-value">2 days ago</div>
            </div>
            
            <div className="supadmin-settings-system-item">
              <div className="supadmin-settings-system-label">Uptime</div>
              <div className="supadmin-settings-system-value">99.8%</div>
            </div>
          </div>
        </div>
        
        <div className="supadmin-settings-quick-card">
          <h3 className="supadmin-settings-quick-title">
            <i className="fas fa-exclamation-triangle"></i>
            Warnings
          </h3>
          
          <div className="supadmin-settings-warnings">
            <div className="supadmin-settings-warning-item">
              <i className="fas fa-exclamation-circle"></i>
              <div>
                <div className="supadmin-settings-warning-title">SSL Certificate Expiring</div>
                <div className="supadmin-settings-warning-desc">Renew within 15 days</div>
              </div>
            </div>
            
            <div className="supadmin-settings-warning-item">
              <i className="fas fa-exclamation-circle"></i>
              <div>
                <div className="supadmin-settings-warning-title">Backup Space Low</div>
                <div className="supadmin-settings-warning-desc">15% storage remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="supadmin-settings-footer">
        <div className="supadmin-settings-footer-info">
          <div className="supadmin-settings-footer-stat">
            <i className="fas fa-clock"></i>
            <div>
              <div className="supadmin-settings-footer-value">Settings Last Saved: 2 hours ago</div>
              <div className="supadmin-settings-footer-label">Auto-save: Enabled</div>
            </div>
          </div>
          
          <div className="supadmin-settings-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="supadmin-settings-footer-value">Security Audit: Passed</div>
              <div className="supadmin-settings-footer-label">Last Audit: Today</div>
            </div>
          </div>
        </div>
        
        <div className="supadmin-settings-footer-actions">
          <button className="supadmin-settings-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help & Documentation
          </button>
          <button className="supadmin-settings-footer-btn">
            <i className="fas fa-history"></i>
            View Change History
          </button>
          <button className="supadmin-settings-footer-btn">
            <i className="fas fa-bug"></i>
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupAdminSystemSettings;