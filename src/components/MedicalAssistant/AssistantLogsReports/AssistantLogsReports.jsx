import React, { useState, useEffect } from 'react';
import './AssistantLogsReports.css';
import { 
  FiHome, FiFileText, FiSearch, FiDownload, 
  FiFilter, FiEye, FiPrinter, FiSettings,
  FiAlertCircle, FiClock, FiCalendar,
  FiTrendingUp, FiTrendingDown, FiMenu,
  FiX, FiBell, FiActivity, FiCheckCircle,
  FiAlertTriangle, FiInfo, FiUser,
  FiDatabase, FiBarChart2, FiPieChart,
  FiRefreshCw, FiPlay, FiUserCheck,
  FiShield, FiLock, FiUnlock,
  FiEdit, FiTrash2, FiCopy,
  FiPackage
} from 'react-icons/fi';
import { 
  FaHospital, FaChartLine, FaChartBar,
  FaChartPie, FaFileExcel, FaFilePdf,
  FaFileCsv, FaFileArchive, FaUserMd,
  FaUserNurse, FaClipboardList, FaHistory,
  FaAudible, FaRegFileAlt, FaRegChartBar
} from 'react-icons/fa';

const AssistantLogsReports = () => {
  const [activeMenu, setActiveMenu] = useState('logs');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(4);
  const [currentDate, setCurrentDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterModule, setFilterModule] = useState('all');
  
  // Reports Overview Data
  const reportsOverview = [
    {
      id: 1,
      title: 'Total Log Entries',
      value: '12,458',
      icon: <FiDatabase />,
      color: '#a78bfa',
      info: 'System activities recorded',
      trend: '+15%',
      trendUp: true
    },
    {
      id: 2,
      title: 'Generated Reports',
      value: '248',
      icon: <FiFileText />,
      color: '#10b981',
      info: 'Reports created this month',
      trend: '+8%',
      trendUp: true
    },
    {
      id: 3,
      title: 'Critical Events',
      value: '42',
      icon: <FiAlertTriangle />,
      color: '#ef4444',
      info: 'High severity incidents',
      trend: '-5%',
      trendUp: false
    },
    {
      id: 4,
      title: 'Audit Trails',
      value: '1,856',
      icon: <FiShield />,
      color: '#8b5cf6',
      info: 'Security audit records',
      trend: '+12%',
      trendUp: true
    }
  ];

  // Activity Logs Data
  const activityLogs = [
    {
      id: 'LOG001',
      user: 'Dr. Sharma',
      action: 'Patient record updated',
      module: 'Patients',
      severity: 'info',
      ipAddress: '192.168.1.105',
      timestamp: '2024-01-28 10:30:45',
      details: 'Updated medication for patient P001'
    },
    {
      id: 'LOG002',
      user: 'Nurse Anjali',
      action: 'Medication administered',
      module: 'Pharmacy',
      severity: 'success',
      ipAddress: '192.168.1.112',
      timestamp: '2024-01-28 09:15:22',
      details: 'Administered insulin to patient P004'
    },
    {
      id: 'LOG003',
      user: 'System Admin',
      action: 'Failed login attempt',
      module: 'Security',
      severity: 'error',
      ipAddress: '203.0.113.25',
      timestamp: '2024-01-28 08:42:10',
      details: '3 failed attempts from external IP'
    },
    {
      id: 'LOG004',
      user: 'Dr. Patel',
      action: 'Appointment scheduled',
      module: 'Schedule',
      severity: 'info',
      ipAddress: '192.168.1.108',
      timestamp: '2024-01-28 14:20:35',
      details: 'Scheduled follow-up for patient P002'
    },
    {
      id: 'LOG005',
      user: 'Lab Technician',
      action: 'Lab results uploaded',
      module: 'Laboratory',
      severity: 'success',
      ipAddress: '192.168.1.120',
      timestamp: '2024-01-28 11:45:18',
      details: 'Uploaded blood test results for 5 patients'
    },
    {
      id: 'LOG006',
      user: 'Pharmacist',
      action: 'Inventory low alert',
      module: 'Inventory',
      severity: 'warning',
      ipAddress: '192.168.1.115',
      timestamp: '2024-01-28 13:10:55',
      details: 'Oxygen cylinders below minimum stock'
    },
    {
      id: 'LOG007',
      user: 'Assistant',
      action: 'Report generated',
      module: 'Reports',
      severity: 'info',
      ipAddress: '192.168.1.101',
      timestamp: '2024-01-28 15:30:12',
      details: 'Generated monthly patient statistics report'
    },
    {
      id: 'LOG008',
      user: 'Dr. Gupta',
      action: 'Prescription created',
      module: 'Patients',
      severity: 'success',
      ipAddress: '192.168.1.106',
      timestamp: '2024-01-28 16:45:30',
      details: 'Created new prescription for diabetes management'
    }
  ];

  // Reports Library Data
  const reportsData = [
    {
      id: 'REP001',
      name: 'Monthly Patient Statistics',
      description: 'Comprehensive report on patient admissions, discharges, and demographics',
      type: 'analytics',
      frequency: 'Monthly',
      lastRun: '2024-01-28',
      size: '2.4 MB',
      format: 'PDF',
      records: 1248
    },
    {
      id: 'REP002',
      name: 'Financial Summary',
      description: 'Revenue, expenses, and billing analysis',
      type: 'financial',
      frequency: 'Monthly',
      lastRun: '2024-01-27',
      size: '1.8 MB',
      format: 'Excel',
      records: 856
    },
    {
      id: 'REP003',
      name: 'Equipment Maintenance',
      description: 'Equipment status and maintenance schedule report',
      type: 'inventory',
      frequency: 'Weekly',
      lastRun: '2024-01-28',
      size: '3.2 MB',
      format: 'PDF',
      records: 156
    },
    {
      id: 'REP004',
      name: 'Staff Performance',
      description: 'Doctor and nurse performance metrics',
      type: 'hr',
      frequency: 'Quarterly',
      lastRun: '2024-01-25',
      size: '4.1 MB',
      format: 'Excel',
      records: 45
    },
    {
      id: 'REP005',
      name: 'Pharmacy Inventory',
      description: 'Medication stock levels and consumption rates',
      type: 'inventory',
      frequency: 'Weekly',
      lastRun: '2024-01-28',
      size: '1.2 MB',
      format: 'CSV',
      records: 312
    },
    {
      id: 'REP006',
      name: 'Security Audit Log',
      description: 'System access and security event logs',
      type: 'security',
      frequency: 'Daily',
      lastRun: '2024-01-28',
      size: '5.6 MB',
      format: 'PDF',
      records: 1856
    }
  ];

  // Audit Trail Data
  const auditTrail = [
    {
      id: 1,
      time: '10:30 AM',
      action: 'Patient record accessed',
      user: 'Dr. Sharma',
      severity: 'info',
      details: 'Viewed medical history of patient P001'
    },
    {
      id: 2,
      time: '10:15 AM',
      action: 'Prescription modified',
      user: 'Dr. Patel',
      severity: 'warning',
      details: 'Changed medication dosage for patient P002'
    },
    {
      id: 3,
      time: '09:45 AM',
      action: 'Lab results updated',
      user: 'Lab Technician',
      severity: 'success',
      details: 'Uploaded new test results for 3 patients'
    },
    {
      id: 4,
      time: '09:20 AM',
      action: 'System configuration changed',
      user: 'System Admin',
      severity: 'error',
      details: 'Modified user permission settings'
    },
    {
      id: 5,
      time: '08:55 AM',
      action: 'Report exported',
      user: 'Assistant',
      severity: 'info',
      details: 'Exported monthly statistics to Excel format'
    }
  ];

  // Report Types for Generator
  const reportTypes = [
    { value: 'patient_stats', label: 'Patient Statistics' },
    { value: 'financial', label: 'Financial Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'staff_performance', label: 'Staff Performance' },
    { value: 'audit_logs', label: 'Audit Logs' },
    { value: 'operational', label: 'Operational Report' }
  ];



  // Set current date
  useEffect(() => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    
    return matchesSearch && matchesSeverity && matchesModule;
  });

  const getSeverityBadgeClass = (severity) => {
    switch(severity) {
      case 'info': return 'assistant-logs-severity-info';
      case 'warning': return 'assistant-logs-severity-warning';
      case 'error': return 'assistant-logs-severity-error';
      case 'success': return 'assistant-logs-severity-success';
      default: return 'assistant-logs-severity-info';
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'info': return <FiInfo />;
      case 'warning': return <FiAlertTriangle />;
      case 'error': return <FiAlertCircle />;
      case 'success': return <FiCheckCircle />;
      default: return <FiInfo />;
    }
  };

  const getSeverityIconColor = (severity) => {
    switch(severity) {
      case 'info': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'success': return '#10b981';
      default: return '#3b82f6';
    }
  };

  const getCardIconStyle = (color) => ({
    background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
  });

  const getReportIcon = (type) => {
    switch(type) {
      case 'analytics': return <FaChartLine />;
      case 'financial': return <FaChartBar />;
      case 'inventory': return <FiPackage />;
      case 'hr': return <FiUser />;
      case 'security': return <FiShield />;
      default: return <FiFileText />;
    }
  };

  const getAuditDotClass = (severity) => {
    switch(severity) {
      case 'info': return 'assistant-logs-auditdot info';
      case 'warning': return 'assistant-logs-auditdot warning';
      case 'error': return 'assistant-logs-auditdot error';
      case 'success': return 'assistant-logs-auditdot success';
      default: return 'assistant-logs-auditdot info';
    }
  };

  const formatFileSize = (size) => {
    return size;
  };

  const handleGenerateReport = () => {
    // In real app, this would generate a report
    alert('Report generation started. This may take a few moments.');
  };

  const handleExportLogs = () => {
    // In real app, this would export logs
    alert('Logs export started. Download will begin shortly.');
  };

  return (
    <div className="assistant-logs-wrapper">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="assistant-logs-main">
        {/* Navbar */}
     

        {/* Dashboard Content */}
        <div className="assistant-logs-content">
          {/* Welcome Section */}
          <div className="assistant-logs-welcome">
            <h2 className="assistant-logs-welcometitle">Logs & Reports Dashboard</h2>
            <p className="assistant-logs-welcomesubtitle">
              Monitor system activities, generate comprehensive reports, and maintain audit trails.
              Track user actions, system events, and generate analytics for informed decision making.
            </p>
          </div>

          {/* Reports Overview */}
          <div className="assistant-logs-overview">
            {reportsOverview.map(card => (
              <div key={card.id} className="assistant-logs-statscard">
                <div className="assistant-logs-cardheader">
                  <h3 className="assistant-logs-cardtitle">{card.title}</h3>
                  <div className="assistant-logs-cardicon" style={getCardIconStyle(card.color)}>
                    {card.icon}
                  </div>
                </div>
                <div className="assistant-logs-cardvalue">{card.value}</div>
                <div className="assistant-logs-cardinfo">{card.info}</div>
                <div className={`assistant-logs-cardtrend ${card.trendUp ? 'assistant-logs-trendup' : 'assistant-logs-trenddown'}`}>
                  {card.trendUp ? <FiTrendingUp /> : <FiTrendingDown />}
                  {card.trend} from last month
                </div>
              </div>
            ))}
          </div>

          {/* Activity Logs Table */}
          <div className="assistant-logs-tablecontainer">
            <div className="assistant-logs-tableheader">
              <h3 className="assistant-logs-tabletitle">System Activity Logs</h3>
              <div className="assistant-logs-tablecontrols">
                <input
                  type="text"
                  className="assistant-logs-searchinput"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="assistant-logs-filterselect"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="all">All Severity</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="success">Success</option>
                </select>
                <select 
                  className="assistant-logs-filterselect"
                  value={filterModule}
                  onChange={(e) => setFilterModule(e.target.value)}
                >
                  <option value="all">All Modules</option>
                  <option value="Patients">Patients</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Schedule">Schedule</option>
                  <option value="Security">Security</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Reports">Reports</option>
                </select>
                <button className="assistant-logs-exportbutton" onClick={handleExportLogs}>
                  <FiDownload /> Export Logs
                </button>
              </div>
            </div>
            
            <div className="assistant-logs-tablewrapper">
              <table className="assistant-logs-datatable">
                <thead className="assistant-logs-tablehead">
                  <tr className="assistant-logs-headerrow">
                    <th>Log ID</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Severity</th>
                    <th>IP Address</th>
                    <th>Timestamp</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="assistant-logs-tablerow">
                      <td>
                        <div className="assistant-logs-loginfo">
                          <div className="assistant-logs-logicon" style={{backgroundColor: getSeverityIconColor(log.severity)}}>
                            {getSeverityIcon(log.severity)}
                          </div>
                          <div>
                            <div className="assistant-logs-loguser">{log.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{log.user}</td>
                      <td>
                        <div className="assistant-logs-logaction">{log.action}</div>
                      </td>
                      <td>
                        <span className="assistant-logs-modulebadge">{log.module}</span>
                      </td>
                      <td>
                        <span className={`assistant-logs-severitybadge ${getSeverityBadgeClass(log.severity)}`}>
                          {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                        </span>
                      </td>
                      <td>{log.ipAddress}</td>
                      <td>{log.timestamp}</td>
                      <td>
                        <div className="assistant-logs-actionbuttons">
                          <button className="assistant-logs-actionbtn" title="View Details">
                            <FiEye />
                          </button>
                          <button className="assistant-logs-actionbtn" title="Export">
                            <FiDownload />
                          </button>
                          <button className="assistant-logs-actionbtn" title="Copy">
                            <FiCopy />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reports Library */}
          <div className="assistant-logs-reports">
            <div className="assistant-logs-reportsheader">
              <h3 className="assistant-logs-reportstitle">Reports Library</h3>
            </div>
            
            <div className="assistant-logs-reportsgrid">
              {reportsData.map(report => (
                <div key={report.id} className="assistant-logs-reportcard">
                  <div className="assistant-logs-reportheader">
                    <div className="assistant-logs-reporticon">
                      {getReportIcon(report.type)}
                    </div>
                    <div className="assistant-logs-reportinfo">
                      <h4 className="assistant-logs-reportname">{report.name}</h4>
                      <p className="assistant-logs-reportdesc">{report.description}</p>
                    </div>
                  </div>
                  
                  <div className="assistant-logs-reportdetails">
                    <div className="assistant-logs-reportdetail">
                      <div className="assistant-logs-detailvalue">{report.frequency}</div>
                      <div className="assistant-logs-detaillabel">Frequency</div>
                    </div>
                    <div className="assistant-logs-reportdetail">
                      <div className="assistant-logs-detailvalue">{report.size}</div>
                      <div className="assistant-logs-detaillabel">Size</div>
                    </div>
                    <div className="assistant-logs-reportdetail">
                      <div className="assistant-logs-detailvalue">{report.records}</div>
                      <div className="assistant-logs-detaillabel">Records</div>
                    </div>
                  </div>
                  
                  <div className="assistant-logs-reportactions">
                    <button className="assistant-logs-reportbtn">
                      <FiEye /> Preview
                    </button>
                    <button className="assistant-logs-reportbtn">
                      <FiDownload /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trail */}
          <div className="assistant-logs-audit">
            <div className="assistant-logs-auditheader">
              <h3 className="assistant-logs-audittitle">Recent Audit Trail</h3>
              <button className="assistant-logs-exportbutton">
                <FiDownload /> Export Audit
              </button>
            </div>
            
            <div className="assistant-logs-audittimeline">
              {auditTrail.map(audit => (
                <div key={audit.id} className="assistant-logs-audititem">
                  <div className={getAuditDotClass(audit.severity)}></div>
                  <div className="assistant-logs-auditcontent">
                    <div className="assistant-logs-audittime">
                      <FiClock />
                      {audit.time} • Today
                    </div>
                    <div className="assistant-logs-auditaction">{audit.action}</div>
                    <div className="assistant-logs-audituser">
                      User: <strong>{audit.user}</strong>
                    </div>
                    <div className="assistant-logs-auditdetails">
                      {audit.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Generator */}
          <div className="assistant-logs-generator">
            <div className="assistant-logs-generatorheader">
              <h3 className="assistant-logs-generatortitle">Generate New Report</h3>
            </div>
            
            <div className="assistant-logs-generatorform">
              <div className="assistant-logs-formgroup">
                <label className="assistant-logs-formlabel">Report Type</label>
                <select className="assistant-logs-formselect">
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="assistant-logs-formgroup">
                <label className="assistant-logs-formlabel">Date Range</label>
                <select className="assistant-logs-formselect">
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <div className="assistant-logs-formgroup">
                <label className="assistant-logs-formlabel">Format</label>
                <select className="assistant-logs-formselect">
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV File</option>
                  <option value="html">HTML Report</option>
                </select>
              </div>
              
              <div className="assistant-logs-formgroup">
                <label className="assistant-logs-formlabel">Include Sections</label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <input type="checkbox" defaultChecked />
                    <span>Summary</span>
                  </label>
                  <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <input type="checkbox" defaultChecked />
                    <span>Charts & Graphs</span>
                  </label>
                  <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <input type="checkbox" defaultChecked />
                    <span>Detailed Data</span>
                  </label>
                  <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <input type="checkbox" />
                    <span>Raw Data Export</span>
                  </label>
                </div>
              </div>
              
              <div className="assistant-logs-formgroup assistant-logs-formrow">
                <label className="assistant-logs-formlabel">Additional Notes</label>
                <textarea 
                  className="assistant-logs-forminput"
                  rows="3"
                  placeholder="Add any specific requirements or notes for the report..."
                ></textarea>
              </div>
            </div>
            
            <div className="assistant-logs-generatoractions">
              <button className="assistant-logs-previewbtn">
                <FiEye /> Preview Report
              </button>
              <button className="assistant-logs-generatebtn" onClick={handleGenerateReport}>
                <FiPlay /> Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantLogsReports;