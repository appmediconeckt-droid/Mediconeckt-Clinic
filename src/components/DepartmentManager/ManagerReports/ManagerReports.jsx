import React, { useState, useEffect } from 'react';
import {
  FaFileAlt, FaChartBar, FaCalendarAlt, FaMoneyBillWave,
  FaUsers, FaUserMd, FaProcedures, FaPills, FaHospital,
  FaAmbulance, FaBed, FaDownload, FaPrint, FaFilter,
  FaSearch, FaEye, FaFileExcel, FaFilePdf, FaFileCsv,
  FaCogs, FaDatabase, FaChartLine, FaChartPie, FaShieldAlt,
  FaRegClock, FaRegCalendarCheck, FaPercent, FaArrowUp,
  FaArrowDown, FaSort, FaSortUp, FaSortDown
} from 'react-icons/fa';
import './ManagerReports.css';

const ManagerReports = () => {
  const [activeReport, setActiveReport] = useState('financial');
  const [dateRange, setDateRange] = useState('monthly');
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Report Data
  const [financialReports, setFinancialReports] = useState([
    {
      id: 1,
      name: "Monthly Revenue Report",
      type: "financial",
      date: "2024-01-31",
      size: "2.5 MB",
      status: "generated",
      department: "All",
      generatedBy: "System Admin",
      downloads: 45
    },
    {
      id: 2,
      name: "Quarterly Expense Analysis",
      type: "financial",
      date: "2024-01-15",
      size: "3.2 MB",
      status: "pending",
      department: "Finance",
      generatedBy: "Finance Manager",
      downloads: 28
    },
    {
      id: 3,
      name: "Annual Budget Report",
      type: "financial",
      date: "2023-12-31",
      size: "5.1 MB",
      status: "generated",
      department: "All",
      generatedBy: "System Admin",
      downloads: 89
    },
    {
      id: 4,
      name: "Daily Revenue Summary",
      type: "financial",
      date: "2024-01-30",
      size: "1.2 MB",
      status: "generated",
      department: "All",
      generatedBy: "Auto System",
      downloads: 156
    },
    {
      id: 5,
      name: "Insurance Claims Report",
      type: "financial",
      date: "2024-01-28",
      size: "4.3 MB",
      status: "generated",
      department: "Billing",
      generatedBy: "Billing Manager",
      downloads: 67
    }
  ]);

  const [operationalReports, setOperationalReports] = useState([
    {
      id: 1,
      name: "Bed Occupancy Report",
      type: "operational",
      date: "2024-01-31",
      size: "1.8 MB",
      status: "generated",
      department: "Operations",
      generatedBy: "Operations Manager",
      downloads: 78
    },
    {
      id: 2,
      name: "Staff Performance Report",
      type: "operational",
      date: "2024-01-25",
      size: "2.3 MB",
      status: "generated",
      department: "HR",
      generatedBy: "HR Manager",
      downloads: 54
    },
    {
      id: 3,
      name: "Equipment Maintenance Log",
      type: "operational",
      date: "2024-01-20",
      size: "3.7 MB",
      status: "pending",
      department: "Maintenance",
      generatedBy: "Maintenance Head",
      downloads: 23
    },
    {
      id: 4,
      name: "Patient Wait Times Analysis",
      type: "operational",
      date: "2024-01-15",
      size: "2.1 MB",
      status: "generated",
      department: "Operations",
      generatedBy: "Operations Manager",
      downloads: 42
    }
  ]);

  const [clinicalReports, setClinicalReports] = useState([
    {
      id: 1,
      name: "Monthly Patient Outcomes",
      type: "clinical",
      date: "2024-01-31",
      size: "4.2 MB",
      status: "generated",
      department: "Medical",
      generatedBy: "Medical Director",
      downloads: 34
    },
    {
      id: 2,
      name: "Surgery Success Rates",
      type: "clinical",
      date: "2024-01-28",
      size: "3.8 MB",
      status: "generated",
      department: "Surgery",
      generatedBy: "Head Surgeon",
      downloads: 29
    },
    {
      id: 3,
      name: "Medication Usage Report",
      type: "clinical",
      date: "2024-01-25",
      size: "2.9 MB",
      status: "pending",
      department: "Pharmacy",
      generatedBy: "Chief Pharmacist",
      downloads: 19
    },
    {
      id: 4,
      name: "Infection Control Report",
      type: "clinical",
      date: "2024-01-20",
      size: "1.5 MB",
      status: "generated",
      department: "Infection Control",
      generatedBy: "Infection Control Officer",
      downloads: 48
    }
  ]);

  const [complianceReports, setComplianceReports] = useState([
    {
      id: 1,
      name: "HIPAA Compliance Audit",
      type: "compliance",
      date: "2024-01-31",
      size: "5.6 MB",
      status: "generated",
      department: "Legal",
      generatedBy: "Compliance Officer",
      downloads: 23
    },
    {
      id: 2,
      name: "Safety Inspection Report",
      type: "compliance",
      date: "2024-01-25",
      size: "3.4 MB",
      status: "generated",
      department: "Safety",
      generatedBy: "Safety Officer",
      downloads: 31
    },
    {
      id: 3,
      name: "Quality Assurance Report",
      type: "compliance",
      date: "2024-01-20",
      size: "4.1 MB",
      status: "pending",
      department: "Quality",
      generatedBy: "Quality Manager",
      downloads: 17
    }
  ]);

  // Report Statistics
  const [reportStats, setReportStats] = useState({
    totalReports: 1256,
    generatedToday: 24,
    pendingReports: 8,
    mostDownloaded: "Monthly Revenue Report",
    storageUsed: "45.2 GB",
    avgGenerationTime: "2.5 min"
  });

  // Recent Activity
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "Monthly Revenue Report Generated", user: "System Admin", time: "10:30 AM", type: "generation" },
    { id: 2, action: "Bed Occupancy Report Downloaded", user: "Operations Manager", time: "09:45 AM", type: "download" },
    { id: 3, action: "Staff Performance Report Scheduled", user: "HR Manager", time: "Yesterday", type: "schedule" },
    { id: 4, action: "HIPAA Compliance Audit Updated", user: "Compliance Officer", time: "2 days ago", type: "update" },
    { id: 5, action: "New Report Template Created", user: "IT Admin", time: "3 days ago", type: "creation" }
  ]);

  // Report Categories
  const reportCategories = [
    { id: 'financial', name: 'Financial Reports', icon: <FaMoneyBillWave />, count: 45, color: '#4CAF50' },
    { id: 'operational', name: 'Operational Reports', icon: <FaCogs />, count: 32, color: '#2196F3' },
    { id: 'clinical', name: 'Clinical Reports', icon: <FaUserMd />, count: 28, color: '#FF9800' },
    { id: 'compliance', name: 'Compliance Reports', icon: <FaShieldAlt />, count: 15, color: '#9C27B0' },
    { id: 'patient', name: 'Patient Reports', icon: <FaUsers />, count: 67, color: '#00BCD4' },
    { id: 'staff', name: 'Staff Reports', icon: <FaUserMd />, count: 23, color: '#795548' }
  ];

  // Get current reports based on active category
  const getCurrentReports = () => {
    switch (activeReport) {
      case 'financial': return financialReports;
      case 'operational': return operationalReports;
      case 'clinical': return clinicalReports;
      case 'compliance': return complianceReports;
      default: return financialReports;
    }
  };

  // Filter reports based on search term
  const getFilteredReports = () => {
    const reports = getCurrentReports();
    if (!searchTerm) return reports;
    
    return reports.filter(report =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Sort reports
  const getSortedReports = () => {
    const reports = getFilteredReports();
    return [...reports].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      
      if (sortColumn === 'date') {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Handle report download
  const handleDownload = (report) => {
    alert(`Downloading ${report.name}...`);
    // In real app, this would trigger file download
  };

  // Handle report print
  const handlePrint = (report) => {
    alert(`Printing ${report.name}...`);
    // In real app, this would trigger print dialog
  };

  // Handle report view
  const handleView = (report) => {
    alert(`Opening ${report.name}...`);
    // In real app, this would open report viewer
  };

  // Handle generate new report
  const handleGenerateReport = () => {
    alert('Opening Report Generator...');
    // In real app, this would open report generator
  };

  // Handle schedule report
  const handleScheduleReport = () => {
    alert('Opening Report Scheduler...');
    // In real app, this would open scheduler
  };

  return (
    <div className="manager-reports-container">
      {/* Header */}
      <div className="reports-header-manager">
        <div className="reports-header-left">
          <FaFileAlt className="reports-header-icon" />
          <div>
            <h1>Reports Dashboard</h1>
            <p className="reports-subtitle">Generate, manage, and analyze hospital reports</p>
          </div>
        </div>
        <div className="reports-header-right">
          <button className="btn-generate-report" onClick={handleGenerateReport}>
            <FaFileAlt /> Generate New Report
          </button>
          <button className="btn-schedule-report" onClick={handleScheduleReport}>
            <FaCalendarAlt /> Schedule Report
          </button>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="reports-stats-grid-manager">
        <div className="report-stat-card stat-total">
          <div className="stat-icon">
            <FaFileAlt />
          </div>
          <div className="stat-content">
            <h3>Total Reports</h3>
            <p className="stat-number">{reportStats.totalReports}</p>
            <span className="stat-change positive">
              <FaArrowUp /> 12% from last month
            </span>
          </div>
        </div>

        <div className="report-stat-card stat-generated">
          <div className="stat-icon">
            <FaRegCalendarCheck />
          </div>
          <div className="stat-content">
            <h3>Generated Today</h3>
            <p className="stat-number">{reportStats.generatedToday}</p>
            <span className="stat-change positive">
              <FaArrowUp /> 3 more than yesterday
            </span>
          </div>
        </div>

        <div className="report-stat-card stat-pending">
          <div className="stat-icon">
            <FaRegClock />
          </div>
          <div className="stat-content">
            <h3>Pending Reports</h3>
            <p className="stat-number">{reportStats.pendingReports}</p>
            <span className="stat-change negative">
              <FaArrowDown /> 2 awaiting approval
            </span>
          </div>
        </div>

        <div className="report-stat-card stat-storage">
          <div className="stat-icon">
            <FaDatabase />
          </div>
          <div className="stat-content">
            <h3>Storage Used</h3>
            <p className="stat-number">{reportStats.storageUsed}</p>
            <span className="stat-change">
              <FaPercent /> 65% of quota
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="reports-main-content">
        {/* Left Column - Categories and Filters */}
        <div className="reports-left-column">
          {/* Report Categories */}
          <div className="reports-categories-card">
            <h3>Report Categories</h3>
            <div className="categories-list">
              {reportCategories.map(category => (
                <div
                  key={category.id}
                  className={`category-item ${activeReport === category.id ? 'active' : ''}`}
                  onClick={() => setActiveReport(category.id)}
                  style={{ '--category-color': category.color }}
                >
                  <div className="category-icon" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    {category.icon}
                  </div>
                  <div className="category-info">
                    <h4>{category.name}</h4>
                    <p>{category.count} reports</p>
                  </div>
                  <div className="category-arrow">→</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button className="quick-action-btn">
                <FaDownload /> Export All Reports
              </button>
              <button className="quick-action-btn">
                <FaPrint /> Print Selected
              </button>
              <button className="quick-action-btn">
                <FaFileExcel /> Export to Excel
              </button>
              <button className="quick-action-btn">
                <FaFilePdf /> Export to PDF
              </button>
              <button className="quick-action-btn">
                <FaFileCsv /> Export to CSV
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'generation' && <FaFileAlt />}
                    {activity.type === 'download' && <FaDownload />}
                    {activity.type === 'schedule' && <FaCalendarAlt />}
                    {activity.type === 'update' && <FaCogs />}
                    {activity.type === 'creation' && <FaDatabase />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.action}</p>
                    <div className="activity-meta">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Reports List */}
        <div className="reports-right-column">
          {/* Filters and Search */}
          <div className="reports-filters-card">
            <div className="filters-left">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="date-filter"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <select className="status-filter">
                <option value="all">All Status</option>
                <option value="generated">Generated</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="filters-right">
              <button className="btn-apply-filters">
                <FaFilter /> Apply Filters
              </button>
              <button className="btn-clear-filters">
                Clear All
              </button>
            </div>
          </div>

          {/* Reports Table */}
          <div className="reports-table-card">
            <div className="table-header">
              <div className="table-title">
                <h3>{reportCategories.find(c => c.id === activeReport)?.name}</h3>
                <span className="report-count">{getFilteredReports().length} reports</span>
              </div>
              <div className="table-actions">
                <button className="btn-refresh">
                  <FaCogs /> Refresh
                </button>
              </div>
            </div>

            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>
                      Report Name
                      {sortColumn === 'name' && (
                        sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                      )}
                    </th>
                    <th onClick={() => handleSort('date')}>
                      Date
                      {sortColumn === 'date' && (
                        sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                      )}
                    </th>
                    <th>Department</th>
                    <th onClick={() => handleSort('size')}>
                      Size
                      {sortColumn === 'size' && (
                        sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                      )}
                    </th>
                    <th>Status</th>
                    <th>Generated By</th>
                    <th>Downloads</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedReports().map(report => (
                    <tr key={report.id}>
                      <td className="report-name-cell">
                        <FaFileAlt className="manager-report-icon" />
                        <div className="report-name-info">
                          <span className="report-name">{report.name}</span>
                          <span className="report-type">{report.type}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-cell">
                          <FaCalendarAlt className="date-icon" />
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <span className="department-badge">{report.department}</span>
                      </td>
                      <td>{report.size}</td>
                      <td>
                        <span className={`status-badge ${report.status}`}>
                          {report.status}
                        </span>
                      </td>
                      <td>{report.generatedBy}</td>
                      <td>
                        <div className="downloads-cell">
                          <FaDownload />
                          {report.downloads}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-action btn-view"
                            onClick={() => handleView(report)}
                            title="View Report"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="btn-action btn-download"
                            onClick={() => handleDownload(report)}
                            title="Download Report"
                          >
                            <FaDownload />
                          </button>
                          {/* <button 
                            className="btn-action btn-print"
                            onClick={() => handlePrint(report)}
                            title="Print Report"
                          >
                            <FaPrint />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="table-pagination">
              <div className="pagination-info">
                Showing 1-{getFilteredReports().length} of {getFilteredReports().length} reports
              </div>
              <div className="pagination-controls">
                <button className="btn-pagination prev" disabled>
                  Previous
                </button>
                <button className="btn-pagination active">1</button>
                <button className="btn-pagination">2</button>
                <button className="btn-pagination">3</button>
                <button className="btn-pagination next">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Report Insights */}
          <div className="report-insights-card">
            <h3>Report Insights</h3>
            <div className="insights-grid">
              <div className="insight-item">
                <div className="insight-icon">
                  <FaChartLine />
                </div>
                <div className="insight-content">
                  <h4>Most Downloaded</h4>
                  <p>{reportStats.mostDownloaded}</p>
                  <span className="insight-meta">156 downloads this month</span>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">
                  <FaChartPie />
                </div>
                <div className="insight-content">
                  <h4>Avg. Generation Time</h4>
                  <p>{reportStats.avgGenerationTime}</p>
                  <span className="insight-meta">Faster than last month</span>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">
                  <FaDatabase />
                </div>
                <div className="insight-content">
                  <h4>Storage Alert</h4>
                  <p>65% of quota used</p>
                  <span className="insight-meta warning">Consider archiving old reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="reports-footer">
        <div className="footer-content">
          <div className="manager-footer-section">
            <h4>Need Help?</h4>
            <p>Contact Reports Support</p>
            <span className="support-email">reports@hospital.com</span>
          </div>
          <div className="manager-footer-section">
            <h4>Last Updated</h4>
            <p>{new Date().toLocaleString()}</p>
          </div>
          <div className="manager-footer-section">
            <h4>System Status</h4>
            <div className="status-indicator mt-4">
              <span className="status-dot active"></span>
              All systems operational
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2024 Hospital Management System - Reports Module v2.1</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;