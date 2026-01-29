import React, { useState, useEffect } from 'react';
import './SuperAdminAuditLogs.css';

const SuperAdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    user: 'all',
    severity: 'all',
    dateRange: 'all',
    search: ''
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20);
  const [exporting, setExporting] = useState(false);

  // Mock data for audit logs
  const mockLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      user: 'john.doe@example.com',
      ipAddress: '192.168.1.100',
      action: 'User Login',
      details: 'Successful authentication from new device',
      severity: 'low',
      module: 'Authentication',
      sessionId: 'SESS-001-ABC123',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:25:10',
      user: 'admin@system.com',
      ipAddress: '10.0.0.1',
      action: 'Permission Modified',
      details: 'Changed user permissions for jane.smith',
      severity: 'medium',
      module: 'User Management',
      sessionId: 'SESS-002-DEF456',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-15 13:45:55',
      user: 'unknown',
      ipAddress: '203.0.113.5',
      action: 'Failed Login Attempt',
      details: '5 consecutive failed login attempts',
      severity: 'high',
      module: 'Security',
      sessionId: null,
      userAgent: 'Mozilla/5.0 (Linux; Android 10)',
      status: 'failed'
    },
    {
      id: 4,
      timestamp: '2024-01-15 12:15:30',
      user: 'system@backup.com',
      ipAddress: '172.16.0.10',
      action: 'Database Backup',
      details: 'Scheduled full database backup completed',
      severity: 'low',
      module: 'System',
      sessionId: 'SESS-003-GHI789',
      userAgent: 'System Agent',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-01-15 11:20:15',
      user: 'bob.johnson@example.com',
      ipAddress: '192.168.1.150',
      action: 'Data Export',
      details: 'Exported 2500 user records to CSV',
      severity: 'medium',
      module: 'Data Management',
      sessionId: 'SESS-004-JKL012',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 6,
      timestamp: '2024-01-15 10:05:42',
      user: 'security@audit.com',
      ipAddress: '10.0.0.25',
      action: 'Security Scan',
      details: 'Completed vulnerability assessment scan',
      severity: 'low',
      module: 'Security',
      sessionId: 'SESS-005-MNO345',
      userAgent: 'Security Scanner v2.1',
      status: 'success'
    },
    {
      id: 7,
      timestamp: '2024-01-15 09:45:18',
      user: 'unknown',
      ipAddress: '198.51.100.23',
      action: 'API Rate Limit Exceeded',
      details: 'API calls exceeded 1000 requests per minute',
      severity: 'high',
      module: 'API Gateway',
      sessionId: null,
      userAgent: 'PostmanRuntime/7.32.3',
      status: 'failed'
    },
    {
      id: 8,
      timestamp: '2024-01-15 08:30:05',
      user: 'jane.smith@example.com',
      ipAddress: '192.168.1.200',
      action: 'Password Changed',
      details: 'User successfully changed password',
      severity: 'low',
      module: 'Authentication',
      sessionId: 'SESS-006-PQR678',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2)',
      status: 'success'
    },
    {
      id: 9,
      timestamp: '2024-01-14 22:15:33',
      user: 'admin@system.com',
      ipAddress: '10.0.0.1',
      action: 'System Configuration Updated',
      details: 'Modified SMTP server settings',
      severity: 'medium',
      module: 'System',
      sessionId: 'SESS-007-STU901',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 10,
      timestamp: '2024-01-14 21:40:20',
      user: 'monitoring@system.com',
      ipAddress: '172.16.0.15',
      action: 'Performance Alert',
      details: 'CPU usage exceeded 90% threshold',
      severity: 'high',
      module: 'Monitoring',
      sessionId: 'SESS-008-VWX234',
      userAgent: 'Monitoring Agent v1.5',
      status: 'alert'
    },
    {
      id: 11,
      timestamp: '2024-01-14 20:25:47',
      user: 'data.admin@example.com',
      ipAddress: '192.168.1.175',
      action: 'Bulk Data Update',
      details: 'Updated 5000 product records',
      severity: 'medium',
      module: 'Database',
      sessionId: 'SESS-009-YZA567',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success'
    },
    {
      id: 12,
      timestamp: '2024-01-14 19:10:12',
      user: 'unknown',
      ipAddress: '203.0.113.45',
      action: 'SQL Injection Attempt',
      details: 'Detected SQL injection pattern in request',
      severity: 'critical',
      module: 'Security',
      sessionId: null,
      userAgent: 'python-requests/2.28.1',
      status: 'blocked'
    },
    {
      id: 13,
      timestamp: '2024-01-14 18:05:55',
      user: 'support@helpdesk.com',
      ipAddress: '10.0.0.30',
      action: 'Ticket Created',
      details: 'Created high priority support ticket #4567',
      severity: 'low',
      module: 'Support',
      sessionId: 'SESS-010-BCD890',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 14,
      timestamp: '2024-01-14 17:30:28',
      user: 'backup@system.com',
      ipAddress: '172.16.0.20',
      action: 'File Backup Failed',
      details: 'Failed to backup user uploads directory',
      severity: 'medium',
      module: 'Backup',
      sessionId: 'SESS-011-EFG123',
      userAgent: 'Backup Agent v3.2',
      status: 'failed'
    },
    {
      id: 15,
      timestamp: '2024-01-14 16:45:15',
      user: 'audit@compliance.com',
      ipAddress: '10.0.0.40',
      action: 'Compliance Check',
      details: 'Ran GDPR compliance audit',
      severity: 'low',
      module: 'Compliance',
      sessionId: 'SESS-012-HIJ456',
      userAgent: 'Compliance Checker v1.0',
      status: 'success'
    }
  ];

  // Unique users and modules for filters
  const uniqueUsers = [...new Set(mockLogs.map(log => log.user))];
  const uniqueModules = [...new Set(mockLogs.map(log => log.module))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, logs]);

  const applyFilters = () => {
    let filtered = [...logs];

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(log => log.module === filters.type);
    }

    // Filter by user
    if (filters.user !== 'all') {
      filtered = filtered.filter(log => log.user === filters.user);
    }

    // Filter by severity
    if (filters.severity !== 'all') {
      filtered = filtered.filter(log => log.severity === filters.severity);
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'yesterday':
          cutoff.setDate(now.getDate() - 1);
          cutoff.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= cutoff;
      });
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower) ||
        log.details.toLowerCase().includes(searchLower) ||
        log.ipAddress.toLowerCase().includes(searchLower) ||
        log.module.toLowerCase().includes(searchLower)
      );
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      user: 'all',
      severity: 'all',
      dateRange: 'all',
      search: ''
    });
  };

  const exportLogs = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      const dataStr = JSON.stringify(filteredLogs, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      setExporting(false);
    }, 1500);
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'critical': return 'superadmin-audit-severity-critical';
      case 'high': return 'superadmin-audit-severity-high';
      case 'medium': return 'superadmin-audit-severity-medium';
      case 'low': return 'superadmin-audit-severity-low';
      default: return 'superadmin-audit-severity-info';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'success': return 'superadmin-audit-status-success';
      case 'failed': return 'superadmin-audit-status-failed';
      case 'alert': return 'superadmin-audit-status-alert';
      case 'blocked': return 'superadmin-audit-status-blocked';
      default: return 'superadmin-audit-status-info';
    }
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogClick = (log) => {
    setSelectedLog(selectedLog?.id === log.id ? null : log);
  };

  return (
    <div className="superadmin-audit-logs-container">
      {/* Header */}
      <div className="superadmin-audit-header">
        <div className="superadmin-audit-header-main">
          <h1 className="superadmin-audit-title">
            <i className="fas fa-crown superadmin-audit-crown"></i>
            Audit Logs Management
          </h1>
          <p className="superadmin-audit-subtitle">
            Comprehensive audit trail and security monitoring
          </p>
        </div>
        
        <div className="superadmin-audit-stats">
          <div className="superadmin-audit-stat-card">
            <div className="superadmin-audit-stat-icon">
              <i className="fas fa-history"></i>
            </div>
            <div>
              <div className="superadmin-audit-stat-value">{logs.length}</div>
              <div className="superadmin-audit-stat-label">Total Logs</div>
            </div>
          </div>
          
          <div className="superadmin-audit-stat-card">
            <div className="superadmin-audit-stat-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <div className="superadmin-audit-stat-value">
                {logs.filter(l => l.severity === 'high' || l.severity === 'critical').length}
              </div>
              <div className="superadmin-audit-stat-label">Security Events</div>
            </div>
          </div>
          
          <div className="superadmin-audit-stat-card">
            <div className="superadmin-audit-stat-icon">
              <i className="fas fa-user-shield"></i>
            </div>
            <div>
              <div className="superadmin-audit-stat-value">
                {uniqueUsers.length}
              </div>
              <div className="superadmin-audit-stat-label">Unique Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="superadmin-audit-filters">
        <div className="superadmin-audit-filters-row">
          <div className="superadmin-audit-search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search logs by user, action, IP, or details..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="superadmin-audit-search-input"
            />
          </div>
          
          <div className="superadmin-audit-filter-group">
            <select 
              className="superadmin-audit-filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Modules</option>
              {uniqueModules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
            
            <select 
              className="superadmin-audit-filter-select"
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            >
              <option value="all">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            
            <select 
              className="superadmin-audit-filter-select"
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select 
              className="superadmin-audit-filter-select"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
        
        <div className="superadmin-audit-filters-actions">
          <button 
            className="superadmin-audit-clear-btn"
            onClick={clearFilters}
          >
            <i className="fas fa-filter-circle-xmark"></i>
            Clear Filters
          </button>
          
          <button 
            className="superadmin-audit-export-btn"
            onClick={exportLogs}
            disabled={exporting}
          >
            <i className={`fas fa-download ${exporting ? 'fa-spin' : ''}`}></i>
            {exporting ? 'Exporting...' : 'Export Logs'}
          </button>
          
          <button className="superadmin-audit-refresh-btn">
            <i className="fas fa-sync-alt"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="superadmin-audit-content">
        {/* Logs Table */}
        <div className="superadmin-audit-table-container">
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
              <div className="superadmin-audit-table-header">
                <div className="superadmin-audit-results-count">
                  Showing {indexOfFirstLog + 1}-{Math.min(indexOfLastLog, filteredLogs.length)} of {filteredLogs.length} logs
                </div>
                <div className="superadmin-audit-table-legend">
                  <div className="superadmin-audit-legend-item">
                    <span className="superadmin-audit-legend-critical"></span>
                    Critical
                  </div>
                  <div className="superadmin-audit-legend-item">
                    <span className="superadmin-audit-legend-high"></span>
                    High
                  </div>
                  <div className="superadmin-audit-legend-item">
                    <span className="superadmin-audit-legend-medium"></span>
                    Medium
                  </div>
                  <div className="superadmin-audit-legend-item">
                    <span className="superadmin-audit-legend-low"></span>
                    Low
                  </div>
                </div>
              </div>
              
              <div className="superadmin-audit-table">
                <div className="superadmin-audit-table-row superadmin-audit-table-header-row">
                  <div className="superadmin-audit-table-col superadmin-audit-col-time">Timestamp</div>
                  <div className="superadmin-audit-table-col superadmin-audit-col-user">User</div>
                  <div className="superadmin-audit-table-col superadmin-audit-col-action">Action</div>
                  <div className="superadmin-audit-table-col superadmin-audit-col-module">Module</div>
                  <div className="superadmin-audit-table-col superadmin-audit-col-severity">Severity</div>
                  <div className="superadmin-audit-table-col superadmin-audit-col-status">Status</div>
                  <div className="superadmin-audit-table-col superadmin-audit-col-ip">IP Address</div>
                </div>
                
                {currentLogs.length === 0 ? (
                  <div className="superadmin-audit-empty">
                    <i className="fas fa-search"></i>
                    <p>No audit logs found matching your filters</p>
                  </div>
                ) : (
                  currentLogs.map(log => (
                    <div 
                      key={log.id} 
                      className={`superadmin-audit-table-row ${selectedLog?.id === log.id ? 'superadmin-audit-row-selected' : ''}`}
                      onClick={() => handleLogClick(log)}
                    >
                      <div className="superadmin-audit-table-col superadmin-audit-col-time">
                        <div className="superadmin-audit-time">{log.timestamp}</div>
                      </div>
                      
                      <div className="superadmin-audit-table-col superadmin-audit-col-user">
                        <div className="superadmin-audit-user">
                          <i className="fas fa-user-circle"></i>
                          <span>{log.user}</span>
                        </div>
                      </div>
                      
                      <div className="superadmin-audit-table-col superadmin-audit-col-action">
                        <div className="superadmin-audit-action">{log.action}</div>
                        <div className="superadmin-audit-details">{log.details}</div>
                      </div>
                      
                      <div className="superadmin-audit-table-col superadmin-audit-col-module">
                        <span className="superadmin-audit-module">{log.module}</span>
                      </div>
                      
                      <div className="superadmin-audit-table-col superadmin-audit-col-severity">
                        <span className={`superadmin-audit-severity-badge ${getSeverityBadgeClass(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                      
                      <div className="superadmin-audit-table-col superadmin-audit-col-status">
                        <span className={`superadmin-audit-status-badge ${getStatusBadgeClass(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                      
                      <div className="superadmin-audit-table-col superadmin-audit-col-ip">
                        <div className="superadmin-audit-ip">
                          <i className="fas fa-network-wired"></i>
                          {log.ipAddress}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Log Details Panel */}
              {selectedLog && (
                <div className="superadmin-audit-details-panel">
                  <div className="superadmin-audit-details-header">
                    <h3>Log Details</h3>
                    <button 
                      className="superadmin-audit-close-details"
                      onClick={() => setSelectedLog(null)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="superadmin-audit-details-content">
                    <div className="superadmin-audit-detail-group">
                      <label>Timestamp</label>
                      <div className="superadmin-audit-detail-value">{selectedLog.timestamp}</div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>User</label>
                      <div className="superadmin-audit-detail-value">
                        <i className="fas fa-user"></i>
                        {selectedLog.user}
                      </div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>IP Address</label>
                      <div className="superadmin-audit-detail-value">
                        <i className="fas fa-network-wired"></i>
                        {selectedLog.ipAddress}
                      </div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>Action</label>
                      <div className="superadmin-audit-detail-value">{selectedLog.action}</div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>Details</label>
                      <div className="superadmin-audit-detail-value">{selectedLog.details}</div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>Module</label>
                      <div className="superadmin-audit-detail-value">
                        <span className="superadmin-audit-module-badge">{selectedLog.module}</span>
                      </div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>Severity</label>
                      <div className="superadmin-audit-detail-value">
                        <span className={`superadmin-audit-severity-badge ${getSeverityBadgeClass(selectedLog.severity)}`}>
                          {selectedLog.severity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>Status</label>
                      <div className="superadmin-audit-detail-value">
                        <span className={`superadmin-audit-status-badge ${getStatusBadgeClass(selectedLog.status)}`}>
                          {selectedLog.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>Session ID</label>
                      <div className="superadmin-audit-detail-value">
                        {selectedLog.sessionId || 'N/A'}
                      </div>
                    </div>
                    
                    <div className="superadmin-audit-detail-group">
                      <label>User Agent</label>
                      <div className="superadmin-audit-detail-value superadmin-audit-user-agent">
                        {selectedLog.userAgent}
                      </div>
                    </div>
                  </div>
                  
                  <div className="superadmin-audit-details-actions">
                    <button className="superadmin-audit-action-btn">
                      <i className="fas fa-flag"></i>
                      Flag for Review
                    </button>
                    <button className="superadmin-audit-action-btn">
                      <i className="fas fa-user-lock"></i>
                      Block IP
                    </button>
                    <button className="superadmin-audit-action-btn">
                      <i className="fas fa-copy"></i>
                      Copy Details
                    </button>
                  </div>
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="superadmin-audit-pagination">
                  <button 
                    className="superadmin-audit-pagination-btn"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Previous
                  </button>
                  
                  <div className="superadmin-audit-pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
                      .map((page, index, array) => (
                        <React.Fragment key={page}>
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="superadmin-audit-pagination-dots">...</span>
                          )}
                          <button
                            className={`superadmin-audit-pagination-number ${currentPage === page ? 'superadmin-audit-pagination-active' : ''}`}
                            onClick={() => paginate(page)}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                  </div>
                  
                  <button 
                    className="superadmin-audit-pagination-btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Statistics Panel */}
        <div className="superadmin-audit-stats-panel">
          <div className="superadmin-audit-stats-card">
            <h3 className="superadmin-audit-stats-title">
              <i className="fas fa-chart-pie"></i>
              Log Distribution
            </h3>
            
            <div className="superadmin-audit-stats-distribution">
              {['critical', 'high', 'medium', 'low'].map(severity => {
                const count = logs.filter(l => l.severity === severity).length;
                const percentage = (count / logs.length) * 100;
                
                return (
                  <div key={severity} className="superadmin-audit-distribution-item">
                    <div className="superadmin-audit-distribution-label">
                      <span className={`superadmin-audit-distribution-dot superadmin-audit-severity-${severity}`}></span>
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </div>
                    <div className="superadmin-audit-distribution-bar">
                      <div 
                        className={`superadmin-audit-distribution-fill superadmin-audit-severity-${severity}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="superadmin-audit-distribution-value">
                      {count} ({percentage.toFixed(1)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="superadmin-audit-stats-card">
            <h3 className="superadmin-audit-stats-title">
              <i className="fas fa-chart-bar"></i>
              Module Activity
            </h3>
            
            <div className="superadmin-audit-module-stats">
              {uniqueModules.map(module => {
                const count = logs.filter(l => l.module === module).length;
                
                return (
                  <div key={module} className="superadmin-audit-module-stat">
                    <div className="superadmin-audit-module-name">{module}</div>
                    <div className="superadmin-audit-module-count">{count} logs</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="superadmin-audit-stats-card">
            <h3 className="superadmin-audit-stats-title">
              <i className="fas fa-user-clock"></i>
              Recent Users
            </h3>
            
            <div className="superadmin-audit-recent-users">
              {uniqueUsers.slice(0, 5).map(user => {
                const lastActivity = logs
                  .filter(l => l.user === user)
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                
                return (
                  <div key={user} className="superadmin-audit-recent-user">
                    <div className="superadmin-audit-recent-user-info">
                      <i className="fas fa-user-circle"></i>
                      <div>
                        <div className="superadmin-audit-recent-user-name">{user}</div>
                        <div className="superadmin-audit-recent-user-time">
                          Last: {lastActivity ? new Date(lastActivity.timestamp).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="superadmin-audit-recent-user-count">
                      {logs.filter(l => l.user === user).length} actions
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="superadmin-audit-stats-card">
            <h3 className="superadmin-audit-stats-title">
              <i className="fas fa-exclamation-triangle"></i>
              Security Alerts
            </h3>
            
            <div className="superadmin-audit-alerts">
              {logs
                .filter(l => l.severity === 'critical' || l.severity === 'high')
                .slice(0, 3)
                .map(log => (
                  <div key={log.id} className="superadmin-audit-alert">
                    <div className="superadmin-audit-alert-icon">
                      <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="superadmin-audit-alert-content">
                      <div className="superadmin-audit-alert-title">{log.action}</div>
                      <div className="superadmin-audit-alert-time">{log.timestamp}</div>
                    </div>
                    <span className={`superadmin-audit-alert-severity superadmin-audit-severity-${log.severity}`}>
                      {log.severity}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="superadmin-audit-footer">
        <div className="superadmin-audit-footer-info">
          <div className="superadmin-audit-footer-stat">
            <i className="fas fa-database"></i>
            <div>
              <div className="superadmin-audit-footer-value">Log Retention: 90 days</div>
              <div className="superadmin-audit-footer-label">Policy</div>
            </div>
          </div>
          
          <div className="superadmin-audit-footer-stat">
            <i className="fas fa-clock"></i>
            <div>
              <div className="superadmin-audit-footer-value">Last Updated: Just now</div>
              <div className="superadmin-audit-footer-label">Real-time</div>
            </div>
          </div>
          
          <div className="superadmin-audit-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="superadmin-audit-footer-value">Compliance: GDPR, HIPAA</div>
              <div className="superadmin-audit-footer-label">Standards</div>
            </div>
          </div>
        </div>
        
        <div className="superadmin-audit-footer-actions">
          <button className="superadmin-audit-footer-btn">
            <i className="fas fa-cog"></i>
            Settings
          </button>
          <button className="superadmin-audit-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help
          </button>
          <button className="superadmin-audit-footer-btn">
            <i className="fas fa-file-alt"></i>
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAuditLogs;