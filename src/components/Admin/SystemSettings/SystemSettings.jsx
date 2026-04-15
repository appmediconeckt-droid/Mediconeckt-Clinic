import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Users,
  DollarSign,
  Building,
  Shield,
  Bell,
  Database,
  FileText,
  Calendar,
  User,
  Lock,
  Mail,
  Phone,
  Globe,
  Printer,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Key,
  Server,
  Cloud,
  Wifi,
  ShieldCheck,
  FileCode,
  Network,
  Cpu,
  HardDrive,
  Monitor
} from 'lucide-react';
import './SystemSettings.css';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      hospitalName: 'Medicare General Hospital',
      hospitalCode: 'MGH2024',
      address: '123 Medical Street, Healthcare City',
      phone: '+91-9876543210',
      email: 'contact@medicarehospital.com',
      website: 'www.medicarehospital.com',
      timezone: 'IST (UTC+5:30)',
      language: 'English',
      dateFormat: 'DD/MM/YYYY',
      currency: 'INR (₹)'
    },
    
    // User Management
    users: {
      requireEmailVerification: true,
      allowRegistration: true,
      defaultUserRole: 'doctor',
      passwordMinLength: 8,
      passwordRequireSpecialChar: true,
      passwordRequireNumbers: true,
      sessionTimeout: 30, // minutes
      maxLoginAttempts: 5,
      enable2FA: false
    },
    
    // Financial Settings
    financial: {
      taxRate: 18,
      enableGST: true,
      gstNumber: '27AAAAA0000A1Z5',
      discountForSeniorCitizens: true,
      seniorCitizenDiscount: 15,
      discountForStaff: true,
      staffDiscount: 20,
      paymentMethods: ['cash', 'card', 'upi', 'insurance'],
      invoicePrefix: 'INV',
      invoiceStartingNumber: 1001
    },
    
    // Clinical Settings
    clinical: {
      appointmentSlotDuration: 15, // minutes
      maxAppointmentsPerDay: 40,
      advanceBookingDays: 30,
      enableAutoPrescription: false,
      requireDoctorSignature: true,
      enableLabIntegration: true,
      enablePharmacyIntegration: true,
      emergencyContact: '+91-1122334455',
      criticalAlertThreshold: 5 // minutes
    },
    
    // Security Settings
    security: {
      enableIPRestriction: false,
      allowedIPs: ['192.168.1.0/24'],
      enableAuditLog: true,
      logRetentionDays: 365,
      enableDataEncryption: true,
      enableLoginNotifications: true,
      blockFailedLogins: true,
      enableSessionRecording: false,
      requireStrongPasswords: true
    },
    
    // Notification Settings
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      whatsappNotifications: false,
      appointmentReminders: true,
      billPaymentReminders: true,
      reportReadyAlerts: true,
      emergencyAlerts: true,
      marketingEmails: false,
      reminderBeforeAppointment: 24, // hours
      lowStockAlerts: true
    },
    
    // Integration Settings
    integrations: {
      enableAPIAccess: true,
      apiKey: 'sk_live_1234567890abcdef',
      enableWebhooks: false,
      labSystemIntegration: true,
      pharmacySystemIntegration: true,
      accountingSoftware: 'tally',
      insurancePortal: 'star_health',
      telemedicinePlatform: 'practo',
      enableSSO: false
    },
    
    // Backup Settings
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      backupLocation: 'local_server',
      cloudBackup: false,
      retentionDays: 30,
      enableEmailReports: true,
      backupBeforeUpdate: true,
      compressionLevel: 'medium'
    },
    
    // Customization Settings
    customization: {
      themeColor: '#5d99c6',
      darkMode: false,
      logo: null,
      favicon: null,
      dashboardLayout: 'grid',
      enableAnimations: true,
      sidebarPosition: 'left',
      fontSize: 'medium',
      density: 'comfortable'
    },
    
    // Maintenance Settings
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: 'System under maintenance. Please try again later.',
      cacheEnabled: true,
      cacheDuration: 3600, // seconds
      debugMode: false,
      enableErrorLogging: true,
      logLevel: 'error',
      cleanupOldData: true,
      dataRetentionDays: 1095 // 3 years
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const menuItems = [
    { id: 'general', label: 'General Settings', icon: <Settings size={20} /> },
    { id: 'users', label: 'User Management', icon: <Users size={20} /> },
    { id: 'financial', label: 'Financial Settings', icon: <DollarSign size={20} /> },
    { id: 'clinical', label: 'Clinical Settings', icon: <FileText size={20} /> },
    { id: 'security', label: 'Security Settings', icon: <Shield size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'integrations', label: 'Integrations', icon: <Network size={20} /> },
    { id: 'backup', label: 'Backup & Recovery', icon: <Database size={20} /> },
    { id: 'customization', label: 'Customization', icon: <Monitor size={20} /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Server size={20} /> }
  ];

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleReset = (category) => {
    if (window.confirm('Are you sure you want to reset settings to default?')) {
      // Reset logic here
      alert(`${category} settings reset to default`);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'hospital_settings_backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          alert('Settings imported successfully!');
        } catch (error) {
          alert('Error importing settings. Invalid file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderGeneralSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Building size={20} />
        Hospital Information
      </h3>
      <div className="settings-grid-admin">
        <div className="form-group-admin">
          <label className="form-label-admin">Hospital Name</label>
          <input
            type="text"
            className="form-input-admin"
            value={settings.general.hospitalName}
            onChange={(e) => handleInputChange('general', 'hospitalName', e.target.value)}
          />
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Hospital Code</label>
          <input
            type="text"
            className="form-input-admin"
            value={settings.general.hospitalCode}
            onChange={(e) => handleInputChange('general', 'hospitalCode', e.target.value)}
          />
        </div>
        <div className="form-group-admin full-width">
          <label className="form-label-admin">Address</label>
          <textarea
            className="form-textarea-admin"
            value={settings.general.address}
            onChange={(e) => handleInputChange('general', 'address', e.target.value)}
            rows="3"
          />
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Phone Number</label>
          <input
            type="text"
            className="form-input-admin"
            value={settings.general.phone}
            onChange={(e) => handleInputChange('general', 'phone', e.target.value)}
          />
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Email Address</label>
          <input
            type="email"
            className="form-input-admin"
            value={settings.general.email}
            onChange={(e) => handleInputChange('general', 'email', e.target.value)}
          />
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Website</label>
          <input
            type="url"
            className="form-input-admin"
            value={settings.general.website}
            onChange={(e) => handleInputChange('general', 'website', e.target.value)}
          />
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Timezone</label>
          <select
            className="form-select-admin"
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
          >
            <option value="IST (UTC+5:30)">IST (UTC+5:30)</option>
            <option value="GMT (UTC+0)">GMT (UTC+0)</option>
            <option value="EST (UTC-5)">EST (UTC-5)</option>
            <option value="PST (UTC-8)">PST (UTC-8)</option>
          </select>
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Language</label>
          <select
            className="form-select-admin"
            value={settings.general.language}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Date Format</label>
          <select
            className="form-select-admin"
            value={settings.general.dateFormat}
            onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div className="form-group-admin">
          <label className="form-label-admin">Currency</label>
          <select
            className="form-select-admin"
            value={settings.general.currency}
            onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
          >
            <option value="INR (₹)">INR (₹)</option>
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Users size={20} />
        User Account Settings
      </h3>
      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.users.requireEmailVerification}
                onChange={(e) => handleInputChange('users', 'requireEmailVerification', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Require Email Verification</span>
              <span className="toggle-description-admin">New users must verify email before accessing system</span>
            </div>
          </div>
          
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.users.allowRegistration}
                onChange={(e) => handleInputChange('users', 'allowRegistration', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Allow User Registration</span>
              <span className="toggle-description-admin">Enable self-registration for new users</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.users.enable2FA}
                onChange={(e) => handleInputChange('users', 'enable2FA', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Two-Factor Authentication</span>
              <span className="toggle-description-admin">Require 2FA for all user logins</span>
            </div>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Default User Role</label>
          <select
            className="form-select-admin"
            value={settings.users.defaultUserRole}
            onChange={(e) => handleInputChange('users', 'defaultUserRole', e.target.value)}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="receptionist">Receptionist</option>
            <option value="patient">Patient</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Password Minimum Length</label>
          <input
            type="number"
            className="form-input-admin"
            min="6"
            max="32"
            value={settings.users.passwordMinLength}
            onChange={(e) => handleInputChange('users', 'passwordMinLength', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Session Timeout (minutes)</label>
          <input
            type="number"
            className="form-input-admin"
            min="5"
            max="240"
            value={settings.users.sessionTimeout}
            onChange={(e) => handleInputChange('users', 'sessionTimeout', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Maximum Login Attempts</label>
          <input
            type="number"
            className="form-input-admin"
            min="3"
            max="10"
            value={settings.users.maxLoginAttempts}
            onChange={(e) => handleInputChange('users', 'maxLoginAttempts', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );

  const renderFinancialSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <DollarSign size={20} />
        Financial Configuration
      </h3>
      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.financial.enableGST}
                onChange={(e) => handleInputChange('financial', 'enableGST', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Enable GST</span>
              <span className="toggle-description-admin">Apply GST to all bills</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.financial.discountForSeniorCitizens}
                onChange={(e) => handleInputChange('financial', 'discountForSeniorCitizens', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Senior Citizen Discount</span>
              <span className="toggle-description-admin">Provide discount to senior citizens</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.financial.discountForStaff}
                onChange={(e) => handleInputChange('financial', 'discountForStaff', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Staff Discount</span>
              <span className="toggle-description-admin">Provide discount to hospital staff</span>
            </div>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Tax Rate (%)</label>
          <input
            type="number"
            className="form-input-admin"
            min="0"
            max="100"
            step="0.1"
            value={settings.financial.taxRate}
            onChange={(e) => handleInputChange('financial', 'taxRate', parseFloat(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">GST Number</label>
          <input
            type="text"
            className="form-input-admin"
            value={settings.financial.gstNumber}
            onChange={(e) => handleInputChange('financial', 'gstNumber', e.target.value)}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Senior Citizen Discount (%)</label>
          <input
            type="number"
            className="form-input-admin"
            min="0"
            max="100"
            value={settings.financial.seniorCitizenDiscount}
            onChange={(e) => handleInputChange('financial', 'seniorCitizenDiscount', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Staff Discount (%)</label>
          <input
            type="number"
            className="form-input-admin"
            min="0"
            max="100"
            value={settings.financial.staffDiscount}
            onChange={(e) => handleInputChange('financial', 'staffDiscount', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Invoice Prefix</label>
          <input
            type="text"
            className="form-input-admin"
            value={settings.financial.invoicePrefix}
            onChange={(e) => handleInputChange('financial', 'invoicePrefix', e.target.value)}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Invoice Starting Number</label>
          <input
            type="number"
            className="form-input-admin"
            min="1"
            value={settings.financial.invoiceStartingNumber}
            onChange={(e) => handleInputChange('financial', 'invoiceStartingNumber', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );

  const renderClinicalSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <FileText size={20} />
        Clinical Configuration
      </h3>
      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.clinical.enableAutoPrescription}
                onChange={(e) => handleInputChange('clinical', 'enableAutoPrescription', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Auto-prescription</span>
              <span className="toggle-description-admin">Enable automatic prescription suggestions</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.clinical.requireDoctorSignature}
                onChange={(e) => handleInputChange('clinical', 'requireDoctorSignature', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Require Doctor Signature</span>
              <span className="toggle-description-admin">Mandatory digital signature for prescriptions</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.clinical.enableLabIntegration}
                onChange={(e) => handleInputChange('clinical', 'enableLabIntegration', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Lab System Integration</span>
              <span className="toggle-description-admin">Connect with laboratory management system</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.clinical.enablePharmacyIntegration}
                onChange={(e) => handleInputChange('clinical', 'enablePharmacyIntegration', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Pharmacy Integration</span>
              <span className="toggle-description-admin">Connect with pharmacy management system</span>
            </div>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Appointment Slot Duration (minutes)</label>
          <select
            className="form-select-admin"
            value={settings.clinical.appointmentSlotDuration}
            onChange={(e) => handleInputChange('clinical', 'appointmentSlotDuration', parseInt(e.target.value))}
          >
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={20}>20 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Max Appointments Per Day</label>
          <input
            type="number"
            className="form-input-admin"
            min="10"
            max="100"
            value={settings.clinical.maxAppointmentsPerDay}
            onChange={(e) => handleInputChange('clinical', 'maxAppointmentsPerDay', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Advance Booking (days)</label>
          <input
            type="number"
            className="form-input-admin"
            min="1"
            max="90"
            value={settings.clinical.advanceBookingDays}
            onChange={(e) => handleInputChange('clinical', 'advanceBookingDays', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Emergency Contact</label>
          <input
            type="text"
            className="form-input-admin"
            value={settings.clinical.emergencyContact}
            onChange={(e) => handleInputChange('clinical', 'emergencyContact', e.target.value)}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Critical Alert Threshold (minutes)</label>
          <input
            type="number"
            className="form-input-admin"
            min="1"
            max="30"
            value={settings.clinical.criticalAlertThreshold}
            onChange={(e) => handleInputChange('clinical', 'criticalAlertThreshold', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Shield size={20} />
        Security Configuration
      </h3>
      <div className="security-settings-admin">
        <div className="security-status-admin">
          <div className="security-score-admin">
            <ShieldCheck size={40} />
            <div className="score-content-admin">
              <span className="score-value-admin">85%</span>
              <span className="score-label-admin">Security Score</span>
            </div>
          </div>
          <div className="security-recommendations-admin">
            <h4>Security Recommendations</h4>
            <ul>
              <li>✓ Two-Factor Authentication enabled</li>
              <li>✓ Strong password policy active</li>
              <li>✗ Enable IP restrictions</li>
              <li>✗ Enable session recording</li>
            </ul>
          </div>
        </div>

        <div className="settings-grid-admin">
          <div className="toggle-group-admin">
            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.enableIPRestriction}
                  onChange={(e) => handleInputChange('security', 'enableIPRestriction', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">IP Restriction</span>
                <span className="toggle-description-admin">Restrict access to specific IP addresses</span>
              </div>
            </div>

            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.enableAuditLog}
                  onChange={(e) => handleInputChange('security', 'enableAuditLog', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">Audit Log</span>
                <span className="toggle-description-admin">Record all user activities</span>
              </div>
            </div>

            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.enableDataEncryption}
                  onChange={(e) => handleInputChange('security', 'enableDataEncryption', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">Data Encryption</span>
                <span className="toggle-description-admin">Encrypt sensitive data at rest</span>
              </div>
            </div>

            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.enableLoginNotifications}
                  onChange={(e) => handleInputChange('security', 'enableLoginNotifications', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">Login Notifications</span>
                <span className="toggle-description-admin">Notify users of new logins</span>
              </div>
            </div>

            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.blockFailedLogins}
                  onChange={(e) => handleInputChange('security', 'blockFailedLogins', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">Block Failed Logins</span>
                <span className="toggle-description-admin">Temporary block after failed attempts</span>
              </div>
            </div>

            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.enableSessionRecording}
                  onChange={(e) => handleInputChange('security', 'enableSessionRecording', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">Session Recording</span>
                <span className="toggle-description-admin">Record user sessions for audit</span>
              </div>
            </div>

            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.security.requireStrongPasswords}
                  onChange={(e) => handleInputChange('security', 'requireStrongPasswords', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <div className="toggle-content-admin">
                <span className="toggle-title-admin">Strong Passwords</span>
                <span className="toggle-description-admin">Require complex passwords</span>
              </div>
            </div>
          </div>

          {settings.security.enableIPRestriction && (
            <div className="form-group-admin full-width">
              <label className="form-label-admin">Allowed IP Addresses</label>
              <textarea
                className="form-textarea-admin"
                value={settings.security.allowedIPs.join('\n')}
                onChange={(e) => handleInputChange('security', 'allowedIPs', e.target.value.split('\n'))}
                rows="4"
                placeholder="Enter one IP address per line"
              />
            </div>
          )}

          <div className="form-group-admin">
            <label className="form-label-admin">Log Retention (days)</label>
            <input
              type="number"
              className="form-input-admin"
              min="30"
              max="1095"
              value={settings.security.logRetentionDays}
              onChange={(e) => handleInputChange('security', 'logRetentionDays', parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="security-actions-admin">
          <button className="btn-admin secondary-btn-admin">
            <Key size={16} />
            Regenerate API Keys
          </button>
          <button className="btn-admin secondary-btn-admin">
            <Trash2 size={16} />
            Clear Audit Logs
          </button>
          <button className="btn-admin secondary-btn-admin">
            <Eye size={16} />
            View Security Logs
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Bell size={20} />
        Notification Settings
      </h3>
      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Email Notifications</span>
              <span className="toggle-description-admin">Send notifications via email</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.smsNotifications}
                onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">SMS Notifications</span>
              <span className="toggle-description-admin">Send notifications via SMS</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.whatsappNotifications}
                onChange={(e) => handleInputChange('notifications', 'whatsappNotifications', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">WhatsApp Notifications</span>
              <span className="toggle-description-admin">Send notifications via WhatsApp</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.appointmentReminders}
                onChange={(e) => handleInputChange('notifications', 'appointmentReminders', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Appointment Reminders</span>
              <span className="toggle-description-admin">Send reminders for appointments</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.billPaymentReminders}
                onChange={(e) => handleInputChange('notifications', 'billPaymentReminders', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Payment Reminders</span>
              <span className="toggle-description-admin">Send reminders for pending bills</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.reportReadyAlerts}
                onChange={(e) => handleInputChange('notifications', 'reportReadyAlerts', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Report Alerts</span>
              <span className="toggle-description-admin">Alert when reports are ready</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.emergencyAlerts}
                onChange={(e) => handleInputChange('notifications', 'emergencyAlerts', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Emergency Alerts</span>
              <span className="toggle-description-admin">Send alerts for emergencies</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.marketingEmails}
                onChange={(e) => handleInputChange('notifications', 'marketingEmails', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Marketing Emails</span>
              <span className="toggle-description-admin">Send promotional emails</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.notifications.lowStockAlerts}
                onChange={(e) => handleInputChange('notifications', 'lowStockAlerts', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Low Stock Alerts</span>
              <span className="toggle-description-admin">Alert when inventory is low</span>
            </div>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Reminder Before Appointment (hours)</label>
          <select
            className="form-select-admin"
            value={settings.notifications.reminderBeforeAppointment}
            onChange={(e) => handleInputChange('notifications', 'reminderBeforeAppointment', parseInt(e.target.value))}
          >
            <option value={1}>1 hour before</option>
            <option value={2}>2 hours before</option>
            <option value={6}>6 hours before</option>
            <option value={12}>12 hours before</option>
            <option value={24}>24 hours before</option>
            <option value={48}>48 hours before</option>
          </select>
        </div>
      </div>

      <div className="notification-test-admin">
        <h4>Test Notifications</h4>
        <div className="test-buttons-admin">
          <button className="btn-admin secondary-btn-admin">
            <Mail size={16} />
            Test Email
          </button>
          <button className="btn-admin secondary-btn-admin">
            <Phone size={16} />
            Test SMS
          </button>
          <button className="btn-admin secondary-btn-admin">
            <Bell size={16} />
            Test Alert
          </button>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Network size={20} />
        System Integrations
      </h3>
      <div className="integrations-grid-admin">
        <div className="integration-card-admin">
          <div className="integration-header-admin">
            <div className="integration-icon-admin" style={{ backgroundColor: '#e3f2fd' }}>
              <FileCode size={24} />
            </div>
            <div className="integration-info-admin">
              <h4>API Access</h4>
              <span className={`integration-status-admin ${settings.integrations.enableAPIAccess ? 'active' : 'inactive'}`}>
                {settings.integrations.enableAPIAccess ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="integration-settings-admin">
            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.integrations.enableAPIAccess}
                  onChange={(e) => handleInputChange('integrations', 'enableAPIAccess', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <span className="toggle-title-admin">Enable API Access</span>
            </div>
            {settings.integrations.enableAPIAccess && (
              <div className="api-key-admin">
                <label className="form-label-admin">API Key</label>
                <div className="api-key-input-admin">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input-admin"
                    value={settings.integrations.apiKey}
                    readOnly
                  />
                  <button 
                    className="api-key-toggle-admin"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button className="btn-admin secondary-btn-admin small-btn-admin">
                  <RefreshCw size={14} />
                  Regenerate
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="integration-card-admin">
          <div className="integration-header-admin">
            <div className="integration-icon-admin" style={{ backgroundColor: '#e8f5e9' }}>
              <FileText size={24} />
            </div>
            <div className="integration-info-admin">
              <h4>Lab System</h4>
              <span className={`integration-status-admin ${settings.integrations.labSystemIntegration ? 'active' : 'inactive'}`}>
                {settings.integrations.labSystemIntegration ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <div className="integration-settings-admin">
            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.integrations.labSystemIntegration}
                  onChange={(e) => handleInputChange('integrations', 'labSystemIntegration', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <span className="toggle-title-admin">Connect Lab System</span>
            </div>
          </div>
        </div>

        <div className="integration-card-admin">
          <div className="integration-header-admin">
            <div className="integration-icon-admin" style={{ backgroundColor: '#fff3e0' }}>
              <FileText size={24} />
            </div>
            <div className="integration-info-admin">
              <h4>Pharmacy System</h4>
              <span className={`integration-status-admin ${settings.integrations.pharmacySystemIntegration ? 'active' : 'inactive'}`}>
                {settings.integrations.pharmacySystemIntegration ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <div className="integration-settings-admin">
            <div className="toggle-item-admin">
              <label className="toggle-label-admin">
                <input
                  type="checkbox"
                  checked={settings.integrations.pharmacySystemIntegration}
                  onChange={(e) => handleInputChange('integrations', 'pharmacySystemIntegration', e.target.checked)}
                />
                <span className="toggle-slider-admin"></span>
              </label>
              <span className="toggle-title-admin">Connect Pharmacy System</span>
            </div>
          </div>
        </div>

        <div className="integration-card-admin">
          <div className="integration-header-admin">
            <div className="integration-icon-admin" style={{ backgroundColor: '#f3e5f5' }}>
              <DollarSign size={24} />
            </div>
            <div className="integration-info-admin">
              <h4>Accounting Software</h4>
              <span className="integration-status-admin active">Connected</span>
            </div>
          </div>
          <div className="integration-settings-admin">
            <div className="form-group-admin">
              <label className="form-label-admin">Software</label>
              <select
                className="form-select-admin"
                value={settings.integrations.accountingSoftware}
                onChange={(e) => handleInputChange('integrations', 'accountingSoftware', e.target.value)}
              >
                <option value="tally">Tally</option>
                <option value="quickbooks">QuickBooks</option>
                <option value="zoho">Zoho Books</option>
                <option value="sap">SAP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Database size={20} />
        Backup & Recovery
      </h3>
      <div className="backup-status-admin">
        <div className="backup-info-admin">
          <div className="backup-stat-admin">
            <HardDrive size={24} />
            <div className="stat-content-admin">
              <span className="stat-value-admin">245 GB</span>
              <span className="stat-label-admin">Database Size</span>
            </div>
          </div>
          <div className="backup-stat-admin">
            <Calendar size={24} />
            <div className="stat-content-admin">
              <span className="stat-value-admin">24</span>
              <span className="stat-label-admin">Backups Available</span>
            </div>
          </div>
          <div className="backup-stat-admin">
            <Cloud size={24} />
            <div className="stat-content-admin">
              <span className="stat-value-admin">15 GB</span>
              <span className="stat-label-admin">Cloud Storage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.backup.autoBackup}
                onChange={(e) => handleInputChange('backup', 'autoBackup', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Automatic Backup</span>
              <span className="toggle-description-admin">Schedule automatic backups</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.backup.cloudBackup}
                onChange={(e) => handleInputChange('backup', 'cloudBackup', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Cloud Backup</span>
              <span className="toggle-description-admin">Store backups in cloud storage</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.backup.enableEmailReports}
                onChange={(e) => handleInputChange('backup', 'enableEmailReports', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Email Reports</span>
              <span className="toggle-description-admin">Send backup reports via email</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.backup.backupBeforeUpdate}
                onChange={(e) => handleInputChange('backup', 'backupBeforeUpdate', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Backup Before Update</span>
              <span className="toggle-description-admin">Auto backup before system updates</span>
            </div>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Backup Frequency</label>
          <select
            className="form-select-admin"
            value={settings.backup.backupFrequency}
            onChange={(e) => handleInputChange('backup', 'backupFrequency', e.target.value)}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Backup Time</label>
          <input
            type="time"
            className="form-input-admin"
            value={settings.backup.backupTime}
            onChange={(e) => handleInputChange('backup', 'backupTime', e.target.value)}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Retention Period (days)</label>
          <input
            type="number"
            className="form-input-admin"
            min="7"
            max="365"
            value={settings.backup.retentionDays}
            onChange={(e) => handleInputChange('backup', 'retentionDays', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Compression Level</label>
          <select
            className="form-select-admin"
            value={settings.backup.compressionLevel}
            onChange={(e) => handleInputChange('backup', 'compressionLevel', e.target.value)}
          >
            <option value="low">Low (Fast)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="high">High (Slow)</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Backup Location</label>
          <select
            className="form-select-admin"
            value={settings.backup.backupLocation}
            onChange={(e) => handleInputChange('backup', 'backupLocation', e.target.value)}
          >
            <option value="local_server">Local Server</option>
            <option value="network_drive">Network Drive</option>
            <option value="external_hdd">External HDD</option>
          </select>
        </div>
      </div>

      <div className="backup-actions-admin">
        <button className="btn-admin secondary-btn-admin">
          <Database size={16} />
          Backup Now
        </button>
        <button className="btn-admin secondary-btn-admin">
          <Download size={16} />
          Download Latest Backup
        </button>
        <button className="btn-admin secondary-btn-admin">
          <RefreshCw size={16} />
          Restore Backup
        </button>
      </div>
    </div>
  );

  const renderCustomizationSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Monitor size={20} />
        UI Customization
      </h3>
      <div className="customization-preview-admin">
        <div className="preview-header-admin">
          <h4>Preview</h4>
          <div className="theme-actions-admin">
            <button className="btn-admin secondary-btn-admin">
              <Upload size={16} />
              Upload Logo
            </button>
            <button className="btn-admin secondary-btn-admin">
              <Upload size={16} />
              Upload Favicon
            </button>
          </div>
        </div>
        <div className="preview-content-admin">
          <div className="preview-sidebar-admin" style={{ backgroundColor: settings.customization.themeColor }}>
            <div className="preview-menu-admin">
              <div className="preview-menu-item-admin active">Dashboard</div>
              <div className="preview-menu-item-admin">Patients</div>
              <div className="preview-menu-item-admin">Appointments</div>
              <div className="preview-menu-item-admin">Billing</div>
            </div>
          </div>
          <div className="preview-main-admin">
            <div className="preview-navbar-admin">
              <div className="preview-logo-admin">Medicare Hospital</div>
              <div className="preview-user-admin">
                <div className="preview-avatar-admin">AD</div>
              </div>
            </div>
            <div className="preview-dashboard-admin">
              <div className="preview-card-admin"></div>
              <div className="preview-card-admin"></div>
              <div className="preview-card-admin"></div>
              <div className="preview-card-admin"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.customization.darkMode}
                onChange={(e) => handleInputChange('customization', 'darkMode', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Dark Mode</span>
              <span className="toggle-description-admin">Enable dark theme</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.customization.enableAnimations}
                onChange={(e) => handleInputChange('customization', 'enableAnimations', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Animations</span>
              <span className="toggle-description-admin">Enable UI animations</span>
            </div>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Theme Color</label>
          <div className="color-picker-admin">
            <input
              type="color"
              className="color-input-admin"
              value={settings.customization.themeColor}
              onChange={(e) => handleInputChange('customization', 'themeColor', e.target.value)}
            />
            <span className="color-value-admin">{settings.customization.themeColor}</span>
          </div>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Dashboard Layout</label>
          <select
            className="form-select-admin"
            value={settings.customization.dashboardLayout}
            onChange={(e) => handleInputChange('customization', 'dashboardLayout', e.target.value)}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="compact">Compact</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Sidebar Position</label>
          <select
            className="form-select-admin"
            value={settings.customization.sidebarPosition}
            onChange={(e) => handleInputChange('customization', 'sidebarPosition', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="top">Top</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Font Size</label>
          <select
            className="form-select-admin"
            value={settings.customization.fontSize}
            onChange={(e) => handleInputChange('customization', 'fontSize', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">UI Density</label>
          <select
            className="form-select-admin"
            value={settings.customization.density}
            onChange={(e) => handleInputChange('customization', 'density', e.target.value)}
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="settings-section-admin">
      <h3 className="section-title-admin">
        <Server size={20} />
        System Maintenance
      </h3>
      
      <div className="maintenance-status-admin">
        <div className="system-health-admin">
          <h4>System Health</h4>
          <div className="health-indicators-admin">
            <div className="health-indicator-admin">
              <div className="indicator-icon-admin" style={{ color: '#10B981' }}>
                <Cpu size={20} />
              </div>
              <div className="indicator-info-admin">
                <span className="indicator-label-admin">CPU Usage</span>
                <span className="indicator-value-admin">45%</span>
              </div>
            </div>
            <div className="health-indicator-admin">
              <div className="indicator-icon-admin" style={{ color: '#3B82F6' }}>
                <HardDrive size={20} />
              </div>
              <div className="indicator-info-admin">
                <span className="indicator-label-admin">Memory</span>
                <span className="indicator-value-admin">68%</span>
              </div>
            </div>
            <div className="health-indicator-admin">
              <div className="indicator-icon-admin" style={{ color: '#F59E0B' }}>
                <Database size={20} />
              </div>
              <div className="indicator-info-admin">
                <span className="indicator-label-admin">Database</span>
                <span className="indicator-value-admin">245 GB</span>
              </div>
            </div>
            <div className="health-indicator-admin">
              <div className="indicator-icon-admin" style={{ color: '#EF4444' }}>
                <AlertCircle size={20} />
              </div>
              <div className="indicator-info-admin">
                <span className="indicator-label-admin">Errors</span>
                <span className="indicator-value-admin">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-grid-admin">
        <div className="toggle-group-admin">
          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.maintenance.maintenanceMode}
                onChange={(e) => handleInputChange('maintenance', 'maintenanceMode', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Maintenance Mode</span>
              <span className="toggle-description-admin">Put system in maintenance mode</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.maintenance.cacheEnabled}
                onChange={(e) => handleInputChange('maintenance', 'cacheEnabled', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Cache</span>
              <span className="toggle-description-admin">Enable system cache</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.maintenance.debugMode}
                onChange={(e) => handleInputChange('maintenance', 'debugMode', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Debug Mode</span>
              <span className="toggle-description-admin">Enable debugging information</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.maintenance.enableErrorLogging}
                onChange={(e) => handleInputChange('maintenance', 'enableErrorLogging', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Error Logging</span>
              <span className="toggle-description-admin">Log system errors</span>
            </div>
          </div>

          <div className="toggle-item-admin">
            <label className="toggle-label-admin">
              <input
                type="checkbox"
                checked={settings.maintenance.cleanupOldData}
                onChange={(e) => handleInputChange('maintenance', 'cleanupOldData', e.target.checked)}
              />
              <span className="toggle-slider-admin"></span>
            </label>
            <div className="toggle-content-admin">
              <span className="toggle-title-admin">Auto Cleanup</span>
              <span className="toggle-description-admin">Automatically cleanup old data</span>
            </div>
          </div>
        </div>

        {settings.maintenance.maintenanceMode && (
          <div className="form-group-admin full-width">
            <label className="form-label-admin">Maintenance Message</label>
            <textarea
              className="form-textarea-admin"
              value={settings.maintenance.maintenanceMessage}
              onChange={(e) => handleInputChange('maintenance', 'maintenanceMessage', e.target.value)}
              rows="3"
            />
          </div>
        )}

        <div className="form-group-admin">
          <label className="form-label-admin">Cache Duration (seconds)</label>
          <input
            type="number"
            className="form-input-admin"
            min="60"
            max="86400"
            value={settings.maintenance.cacheDuration}
            onChange={(e) => handleInputChange('maintenance', 'cacheDuration', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Log Level</label>
          <select
            className="form-select-admin"
            value={settings.maintenance.logLevel}
            onChange={(e) => handleInputChange('maintenance', 'logLevel', e.target.value)}
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="form-group-admin">
          <label className="form-label-admin">Data Retention (days)</label>
          <input
            type="number"
            className="form-input-admin"
            min="30"
            max="3650"
            value={settings.maintenance.dataRetentionDays}
            onChange={(e) => handleInputChange('maintenance', 'dataRetentionDays', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="maintenance-actions-admin">
        <button className="btn-admin secondary-btn-admin">
          <RefreshCw size={16} />
          Clear Cache
        </button>
        <button className="btn-admin secondary-btn-admin">
          <Trash2 size={16} />
          Clear Logs
        </button>
        <button className="btn-admin secondary-btn-admin">
          <Database size={16} />
          Optimize Database
        </button>
        <button className="btn-admin secondary-btn-admin">
          <Server size={16} />
          System Diagnostics
        </button>
      </div>
    </div>
  );

  return (
    <div className="system-settings-admin">
      {/* Header */}
      <div className="settings-header-admin">
        <div className="header-left-admin">
          <h1 className="settings-title-admin">
            <Settings size={28} />
            System Settings
          </h1>
          <p className="settings-subtitle-admin">Configure and manage hospital system settings</p>
        </div>
        <div className="header-right-admin">
          <div className="settings-actions-admin">
            <button 
              className="btn-admin secondary-btn-admin"
              onClick={() => handleReset(activeTab)}
            >
              <RefreshCw size={16} />
              Reset
            </button>
            <button 
              className="btn-admin secondary-btn-admin"
              onClick={handleExport}
            >
              <Download size={16} />
              Export
            </button>
            <label className="btn-admin secondary-btn-admin">
              <Upload size={16} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
            <button 
              className="btn-admin primary-btn-admin"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="settings-container-admin">
        {/* Left Sidebar Menu */}
        <div className="settings-sidebar-admin">
          <div className="sidebar-menu-admin">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`menu-item-admin ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="menu-icon-admin">{item.icon}</span>
                <span className="menu-label-admin">{item.label}</span>
                <ChevronRight size={16} className="menu-arrow-admin" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="settings-content-admin">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'users' && renderUserManagement()}
          {activeTab === 'financial' && renderFinancialSettings()}
          {activeTab === 'clinical' && renderClinicalSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'integrations' && renderIntegrationSettings()}
          {activeTab === 'backup' && renderBackupSettings()}
          {activeTab === 'customization' && renderCustomizationSettings()}
          {activeTab === 'maintenance' && renderMaintenanceSettings()}
        </div>
      </div>

      {/* Save Confirmation */}
      {isSaving && (
        <div className="save-indicator-admin">
          <div className="save-content-admin">
            <RefreshCw size={20} className="spinning-admin" />
            <span>Saving settings...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;