import React, { useState, useEffect } from 'react';
import './HousekeepingApp.css';

// Housekeeping Reports Data
const housekeepingReports = [
  {
    id: 1,
    name: "Daily Cleaning Report",
    type: "Daily",
    lastGenerated: "2024-01-27",
    fileFormat: "PDF",
    status: "Ready",
    size: "2.4 MB",
    description: "Summary of all cleaning activities for the day"
  },
  {
    id: 2,
    name: "Room Status Report",
    type: "Real-time",
    lastGenerated: "2024-01-27",
    fileFormat: "Excel",
    status: "Ready",
    size: "1.8 MB",
    description: "Current status of all patient rooms"
  },
  {
    id: 3,
    name: "Inventory Usage Report",
    type: "Weekly",
    lastGenerated: "2024-01-26",
    fileFormat: "PDF",
    status: "Ready",
    size: "3.2 MB",
    description: "Weekly consumption of cleaning supplies"
  },
  {
    id: 4,
    name: "Staff Performance Report",
    type: "Monthly",
    lastGenerated: "2024-01-25",
    fileFormat: "PDF",
    status: "Processing",
    size: "4.1 MB",
    description: "Monthly performance analysis of housekeeping staff"
  },
  {
    id: 5,
    name: "Laundry Services Report",
    type: "Daily",
    lastGenerated: "2024-01-27",
    fileFormat: "Excel",
    status: "Ready",
    size: "2.1 MB",
    description: "Daily laundry processing and distribution"
  },
  {
    id: 6,
    name: "Quality Audit Report",
    type: "Weekly",
    lastGenerated: "2024-01-24",
    fileFormat: "PDF",
    status: "Ready",
    size: "5.3 MB",
    description: "Quality check results and compliance"
  },
  {
    id: 7,
    name: "Waste Management Report",
    type: "Monthly",
    lastGenerated: "2024-01-20",
    fileFormat: "PDF",
    status: "Ready",
    size: "3.7 MB",
    description: "Monthly waste disposal and recycling data"
  },
  {
    id: 8,
    name: "Equipment Maintenance Report",
    type: "Monthly",
    lastGenerated: "2024-01-18",
    fileFormat: "Excel",
    status: "Scheduled",
    size: "2.9 MB",
    description: "Maintenance schedule and equipment status"
  }
];

// Main Content Component
const MainContent = () => {
  const [activeReport, setActiveReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter reports based on search and filter
  const filteredReports = housekeepingReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleGenerateReport = (reportId) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report ${reportId} generated successfully!`);
    }, 1500);
  };

  const handleDownloadReport = (reportId) => {
    alert(`Downloading report ${reportId}`);
  };

  const handleViewDetails = (report) => {
    setActiveReport(report);
  };

  // Get unique report types for filter
  const reportTypes = ['All', ...new Set(housekeepingReports.map(r => r.type))];

  // Format time
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="main-content-container">
      <div className="content-wrapper">
        {/* Header */}
        <header className="content-header">
          <div className="header-left">
            <h1 className="header-title">
              <i className="fas fa-broom"></i> Housekeeping Management System
            </h1>
            <p className="header-subtitle">
              <i className="fas fa-calendar-alt"></i> {formattedDate} | 
              <i className="fas fa-clock"></i> {formattedTime}
            </p>
          </div>
          <div className="header-actions">
           
            <button className="btn-action">
              <i className="fas fa-sync-alt"></i> Refresh
            </button>
            <button className="btn-action btn-primary">
              <i className="fas fa-plus"></i> New Task
            </button>
           
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">156</h3>
              <p className="stat-label">Rooms Cleaned Today</p>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
              <p className="stat-trend">↑ 12% from yesterday</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">24</h3>
              <p className="stat-label">Pending Tasks</p>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '60%' }}></div>
              </div>
              <p className="stat-trend">↓ 8% from yesterday</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">18</h3>
              <p className="stat-label">Staff Active</p>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '90%' }}></div>
              </div>
              <p className="stat-trend">↔ Same as yesterday</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-box"></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">87%</h3>
              <p className="stat-label">Stock Availability</p>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '87%' }}></div>
              </div>
              <p className="stat-trend">↑ 5% from yesterday</p>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="reports-section">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-file-alt"></i> Housekeeping Reports
            </h2>
            <div className="section-controls">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <select 
                className="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button className="btn-action btn-filter">
                <i className="fas fa-filter"></i> Filter
              </button>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="reports-grid">
            {filteredReports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <div className="report-icon">
                    <i className={`fas fa-file-${report.fileFormat.toLowerCase() === 'pdf' ? 'pdf' : 'excel'}`}></i>
                  </div>
                  <div className="report-status">
                    <span className={`status-badge status-${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="report-body">
                  <h3 className="report-title">{report.name}</h3>
                  <p className="report-description">{report.description}</p>
                  <div className="report-meta">
                    <span className="meta-item">
                      <i className="fas fa-calendar"></i> {report.lastGenerated}
                    </span>
                    <span className="meta-item">
                      <i className="fas fa-file"></i> {report.fileFormat}
                    </span>
                    <span className="meta-item">
                      <i className="fas fa-weight"></i> {report.size}
                    </span>
                  </div>
                </div>
                <div className="report-actions">
                  <button 
                    className="btn-action btn-view"
                    onClick={() => handleViewDetails(report)}
                  >
                    <i className="fas fa-eye"></i> View
                  </button>
                  <button 
                    className="btn-action btn-download"
                    onClick={() => handleDownloadReport(report.id)}
                    disabled={report.status === 'Processing'}
                  >
                    <i className="fas fa-download"></i> Download
                  </button>
                  <button 
                    className="btn-action btn-generate"
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Generating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-cog"></i> Generate
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="bottom-section">
          <div className="quick-actions">
            <h3 className="actions-title">
              <i className="fas fa-bolt"></i> Quick Actions
            </h3>
            <div className="actions-grid">
              <button className="action-btn">
                <i className="fas fa-clipboard-list"></i>
                <span>Daily Checklist</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-bell"></i>
                <span>Raise Alert</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-chart-bar"></i>
                <span>View Analytics</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-print"></i>
                <span>Print Reports</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-upload"></i>
                <span>Upload Data</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </button>
            </div>
          </div>

          <div className="recent-activity">
            <h3 className="activity-title">
              <i className="fas fa-history"></i> Recent Activity
            </h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">
                  <i className="fas fa-check"></i>
                </div>
                <div className="activity-content">
                  <p className="activity-text">Room 304 cleaning completed</p>
                  <span className="activity-time">10:30 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning">
                  <i className="fas fa-exclamation"></i>
                </div>
                <div className="activity-content">
                  <p className="activity-text">Low stock alert: Disinfectant</p>
                  <span className="activity-time">09:45 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">
                  <i className="fas fa-info"></i>
                </div>
                <div className="activity-content">
                  <p className="activity-text">New staff assigned: Floor 5</p>
                  <span className="activity-time">09:15 AM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon primary">
                  <i className="fas fa-file-upload"></i>
                </div>
                <div className="activity-content">
                  <p className="activity-text">Monthly report generated</p>
                  <span className="activity-time">08:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Details Modal */}
      {activeReport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-file-alt"></i> {activeReport.name}</h3>
              <button 
                className="modal-close"
                onClick={() => setActiveReport(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="report-details">
                <div className="detail-item">
                  <label><i className="fas fa-tag"></i> Type:</label>
                  <span>{activeReport.type}</span>
                </div>
                <div className="detail-item">
                  <label><i className="fas fa-calendar"></i> Last Generated:</label>
                  <span>{activeReport.lastGenerated}</span>
                </div>
                <div className="detail-item">
                  <label><i className="fas fa-file"></i> File Format:</label>
                  <span>{activeReport.fileFormat}</span>
                </div>
                <div className="detail-item">
                  <label><i className="fas fa-weight"></i> Size:</label>
                  <span>{activeReport.size}</span>
                </div>
                <div className="detail-item">
                  <label><i className="fas fa-circle"></i> Status:</label>
                  <span className={`status-badge status-${activeReport.status.toLowerCase()}`}>
                    {activeReport.status}
                  </span>
                </div>
                <div className="detail-item full-width">
                  <label><i className="fas fa-align-left"></i> Description:</label>
                  <p>{activeReport.description}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setActiveReport(null)}
              >
                <i className="fas fa-times"></i> Close
              </button>
              <button 
                className="btn-primary"
                onClick={() => handleGenerateReport(activeReport.id)}
              >
                <i className="fas fa-redo"></i> Regenerate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const HousekeepingApp = () => {
  return (
    <div className="housekeeping-app-container">
      {/* Main Content */}
      <MainContent />
    </div>
  );
};

export default HousekeepingApp;