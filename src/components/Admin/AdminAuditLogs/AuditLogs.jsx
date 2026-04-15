import React, { useState, useEffect } from 'react';
import './AuditLogs.css';

const AdminAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'descending'
  });

  // Sample audit logs data
  const sampleLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 10:30:25',
      user: 'admin@system.com',
      userRole: 'Super Admin',
      action: 'user_create',
      actionText: 'Created new user account',
      details: 'Created user: john.doe@hospital.com with role: Doctor',
      ipAddress: '192.168.1.100',
      status: 'success',
      severity: 'info'
    },
    {
      id: 2,
      timestamp: '2024-01-15 11:45:12',
      user: 'superadmin@system.com',
      userRole: 'Super Admin',
      action: 'permission_update',
      actionText: 'Updated user permissions',
      details: 'Modified permissions for user ID: 45. Added: patient_view, patient_edit',
      ipAddress: '192.168.1.101',
      status: 'success',
      severity: 'info'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:20:33',
      user: 'admin@system.com',
      userRole: 'Admin',
      action: 'data_export',
      actionText: 'Exported patient data',
      details: 'Exported patient records (CSV) from Jan 1-15, 2024',
      ipAddress: '192.168.1.102',
      status: 'success',
      severity: 'info'
    },
    {
      id: 4,
      timestamp: '2024-01-15 16:05:47',
      user: 'doctor.smith@hospital.com',
      userRole: 'Doctor',
      action: 'patient_access',
      actionText: 'Accessed patient records',
      details: 'Viewed medical records of Patient ID: P-78912',
      ipAddress: '192.168.1.103',
      status: 'success',
      severity: 'low'
    },
    {
      id: 5,
      timestamp: '2024-01-15 18:30:19',
      user: 'nurse.jones@hospital.com',
      userRole: 'Nurse',
      action: 'record_update',
      actionText: 'Updated patient vitals',
      details: 'Updated vitals for Patient ID: P-45678. BP: 120/80, Temp: 98.6°F',
      ipAddress: '192.168.1.104',
      status: 'success',
      severity: 'low'
    },
    {
      id: 6,
      timestamp: '2024-01-15 22:15:08',
      user: 'unauthorized@external.com',
      userRole: 'External',
      action: 'failed_login',
      actionText: 'Failed login attempt',
      details: 'Multiple failed login attempts detected',
      ipAddress: '203.0.113.25',
      status: 'failed',
      severity: 'high'
    },
    {
      id: 7,
      timestamp: '2024-01-16 09:10:55',
      user: 'admin@system.com',
      userRole: 'Admin',
      action: 'system_backup',
      actionText: 'Performed system backup',
      details: 'Complete system backup initiated. Size: 45.2GB',
      ipAddress: '192.168.1.100',
      status: 'success',
      severity: 'medium'
    },
    {
      id: 8,
      timestamp: '2024-01-16 11:25:41',
      user: 'billing.staff@hospital.com',
      userRole: 'Billing',
      action: 'invoice_generate',
      actionText: 'Generated invoice',
      details: 'Generated invoice #INV-2024-00158 for Patient ID: P-12345',
      ipAddress: '192.168.1.105',
      status: 'success',
      severity: 'low'
    },
    {
      id: 9,
      timestamp: '2024-01-16 13:40:22',
      user: 'superadmin@system.com',
      userRole: 'Super Admin',
      action: 'config_change',
      actionText: 'Changed system configuration',
      details: 'Modified session timeout from 30 to 60 minutes',
      ipAddress: '192.168.1.101',
      status: 'success',
      severity: 'medium'
    },
    {
      id: 10,
      timestamp: '2024-01-16 15:55:17',
      user: 'technician@hospital.com',
      userRole: 'Technician',
      action: 'device_access',
      actionText: 'Accessed medical device',
      details: 'Accessed MRI Machine #MRI-003. Duration: 45 minutes',
      ipAddress: '192.168.1.106',
      status: 'success',
      severity: 'medium'
    },
    {
      id: 11,
      timestamp: '2024-01-16 19:20:33',
      user: 'manager@hospital.com',
      userRole: 'Manager',
      action: 'report_generate',
      actionText: 'Generated financial report',
      details: 'Generated monthly financial report for December 2023',
      ipAddress: '192.168.1.107',
      status: 'success',
      severity: 'low'
    },
    {
      id: 12,
      timestamp: '2024-01-17 08:45:29',
      user: 'unknown@external.com',
      userRole: 'External',
      action: 'security_alert',
      actionText: 'Security alert triggered',
      details: 'Multiple rapid login attempts from suspicious IP',
      ipAddress: '198.51.100.123',
      status: 'blocked',
      severity: 'critical'
    }
  ];

  // Unique users and actions for filters
  const uniqueUsers = ['all', ...new Set(sampleLogs.map(log => log.user))];
  const uniqueActions = ['all', ...new Set(sampleLogs.map(log => log.action))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAuditLogs(sampleLogs);
      setFilteredLogs(sampleLogs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterLogs();
  }, [searchTerm, selectedAction, selectedUser, dateRange]);

  const filterLogs = () => {
    let filtered = [...auditLogs];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userRole.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply action filter
    if (selectedAction !== 'all') {
      filtered = filtered.filter(log => log.action === selectedAction);
    }

    // Apply user filter
    if (selectedUser !== 'all') {
      filtered = filtered.filter(log => log.user === selectedUser);
    }

    // Apply date range filter
    if (dateRange.startDate) {
      filtered = filtered.filter(log => log.timestamp.split(' ')[0] >= dateRange.startDate);
    }
    if (dateRange.endDate) {
      filtered = filtered.filter(log => log.timestamp.split(' ')[0] <= dateRange.endDate);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedLogs = [...filteredLogs].sort((a, b) => {
      if (key === 'timestamp') {
        return direction === 'ascending' 
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp);
      }
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredLogs(sortedLogs);
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical': return 'audit-log-severity-critical';
      case 'high': return 'audit-log-severity-high';
      case 'medium': return 'audit-log-severity-medium';
      case 'low': return 'audit-log-severity-low';
      case 'info': return 'audit-log-severity-info';
      default: return 'audit-log-severity-info';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'success': return 'audit-log-status-success';
      case 'failed': return 'audit-log-status-failed';
      case 'blocked': return 'audit-log-status-blocked';
      default: return 'audit-log-status-pending';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'user_create': return 'fa-user-plus';
      case 'permission_update': return 'fa-user-shield';
      case 'data_export': return 'fa-file-export';
      case 'patient_access': return 'fa-file-medical';
      case 'record_update': return 'fa-edit';
      case 'failed_login': return 'fa-times-circle';
      case 'system_backup': return 'fa-database';
      case 'invoice_generate': return 'fa-file-invoice-dollar';
      case 'config_change': return 'fa-cog';
      case 'device_access': return 'fa-microscope';
      case 'report_generate': return 'fa-chart-bar';
      case 'security_alert': return 'fa-exclamation-triangle';
      default: return 'fa-history';
    }
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToCSV = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Details', 'IP Address', 'Status', 'Severity'];
    const csvData = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.userRole,
        log.actionText,
        log.details,
        log.ipAddress,
        log.status,
        log.severity
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAction('all');
    setSelectedUser('all');
    setDateRange({ startDate: '', endDate: '' });
  };

  return (
    <div className="audit-logs-container">
      {/* Header */}
      <div className="audit-logs-header">
        <h1 className="audit-logs-title">
          <i className="fas fa-clipboard-list"></i> Audit Logs
        </h1>
        <div className="audit-logs-stats">
          <div className="audit-stat-card">
            <span className="audit-stat-number">{filteredLogs.length}</span>
            <span className="audit-stat-label">Total Logs</span>
          </div>
          <div className="audit-stat-card">
            <span className="audit-stat-number">
              {filteredLogs.filter(log => log.severity === 'critical' || log.severity === 'high').length}
            </span>
            <span className="audit-stat-label">Critical Alerts</span>
          </div>
          <div className="audit-stat-card">
            <span className="audit-stat-number">
              {filteredLogs.filter(log => log.status === 'failed').length}
            </span>
            <span className="audit-stat-label">Failed Actions</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="audit-logs-filters">
        <div className="audit-filter-group">
          <div className="audit-search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="audit-search-input"
            />
          </div>

          <div className="audit-filter-row">
            <select 
              className="audit-filter-select"
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
            >
              <option value="all">All Actions</option>
              {uniqueActions.filter(action => action !== 'all').map(action => (
                <option key={action} value={action}>{action.replace('_', ' ')}</option>
              ))}
            </select>

            <select 
              className="audit-filter-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="all">All Users</option>
              {uniqueUsers.filter(user => user !== 'all').map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>

            <div className="audit-date-range">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="audit-date-input"
                placeholder="Start Date"
              />
              <span className="audit-date-separator">to</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="audit-date-input"
                placeholder="End Date"
              />
            </div>

            <button className="audit-clear-filters-btn" onClick={clearFilters}>
              <i className="fas fa-filter-circle-xmark"></i> Clear Filters
            </button>

            <button className="audit-export-btn" onClick={exportToCSV}>
              <i className="fas fa-file-export"></i> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="audit-logs-table-container">
        {loading ? (
          <div className="audit-loading">
            <div className="audit-loading-spinner"></div>
            <p>Loading audit logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="audit-no-logs">
            <i className="fas fa-inbox"></i>
            <p>No audit logs found</p>
          </div>
        ) : (
          <>
            <table className="audit-logs-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('timestamp')} className="audit-sortable-header">
                    Timestamp {sortConfig.key === 'timestamp' && (
                      <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th onClick={() => handleSort('user')} className="audit-sortable-header">
                    User {sortConfig.key === 'user' && (
                      <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>IP Address</th>
                  <th>Status</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map(log => (
                  <tr key={log.id} className="audit-log-row">
                    <td className="audit-log-timestamp">
                      <div className="audit-timestamp-date">{log.timestamp.split(' ')[0]}</div>
                      <div className="audit-timestamp-time">{log.timestamp.split(' ')[1]}</div>
                    </td>
                    <td className="audit-log-user">
                      <div className="audit-user-avatar">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="audit-user-info">
                        <div className="audit-user-email">{log.user}</div>
                        <div className="audit-user-role">{log.userRole}</div>
                      </div>
                    </td>
                    <td className="audit-log-action">
                      <div className="audit-action-icon">
                        <i className={`fas ${getActionIcon(log.action)}`}></i>
                      </div>
                      <div className="audit-action-text">{log.actionText}</div>
                    </td>
                    <td className="audit-log-details">
                      {log.details}
                      {log.details.length > 100 && (
                        <button className="audit-view-details-btn">View More</button>
                      )}
                    </td>
                    <td className="audit-log-ip">
                      <span className="audit-ip-badge">{log.ipAddress}</span>
                    </td>
                    <td>
                      <span className={`audit-status-badge ${getStatusClass(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`audit-severity-badge ${getSeverityClass(log.severity)}`}>
                        <i className="fas fa-circle"></i> {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="audit-pagination">
                <button 
                  className="audit-pagination-btn"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                
                <div className="audit-pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      className={`audit-pagination-page ${currentPage === number ? 'active' : ''}`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button 
                  className="audit-pagination-btn"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Summary */}
      <div className="audit-logs-summary">
        <h3 className="audit-summary-title">
          <i className="fas fa-chart-pie"></i> Log Summary
        </h3>
        <div className="audit-summary-grid">
          <div className="audit-summary-card">
            <h4>By Severity</h4>
            <div className="audit-summary-severity">
              <div className="audit-severity-item">
                <span className="audit-severity-dot critical"></span>
                <span>Critical: {filteredLogs.filter(l => l.severity === 'critical').length}</span>
              </div>
              <div className="audit-severity-item">
                <span className="audit-severity-dot high"></span>
                <span>High: {filteredLogs.filter(l => l.severity === 'high').length}</span>
              </div>
              <div className="audit-severity-item">
                <span className="audit-severity-dot medium"></span>
                <span>Medium: {filteredLogs.filter(l => l.severity === 'medium').length}</span>
              </div>
              <div className="audit-severity-item">
                <span className="audit-severity-dot low"></span>
                <span>Low: {filteredLogs.filter(l => l.severity === 'low').length}</span>
              </div>
              <div className="audit-severity-item">
                <span className="audit-severity-dot info"></span>
                <span>Info: {filteredLogs.filter(l => l.severity === 'info').length}</span>
              </div>
            </div>
          </div>

          <div className="audit-summary-card">
            <h4>By Status</h4>
            <div className="audit-summary-status">
              <div className="audit-status-item">
                <span className="audit-status-indicator success"></span>
                <span>Success: {filteredLogs.filter(l => l.status === 'success').length}</span>
              </div>
              <div className="audit-status-item">
                <span className="audit-status-indicator failed"></span>
                <span>Failed: {filteredLogs.filter(l => l.status === 'failed').length}</span>
              </div>
              <div className="audit-status-item">
                <span className="audit-status-indicator blocked"></span>
                <span>Blocked: {filteredLogs.filter(l => l.status === 'blocked').length}</span>
              </div>
            </div>
          </div>

          <div className="audit-summary-card">
            <h4>Recent Activity</h4>
            <div className="audit-recent-activity">
              {filteredLogs.slice(0, 3).map(log => (
                <div key={log.id} className="audit-activity-item">
                  <div className="audit-activity-icon">
                    <i className={`fas ${getActionIcon(log.action)}`}></i>
                  </div>
                  <div className="audit-activity-content">
                    <div className="audit-activity-text">{log.actionText}</div>
                    <div className="audit-activity-time">{log.timestamp.split(' ')[1]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogs;