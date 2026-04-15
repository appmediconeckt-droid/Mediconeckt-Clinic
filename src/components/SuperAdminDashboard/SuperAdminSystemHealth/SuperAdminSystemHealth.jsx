import React, { useState, useEffect } from 'react';
import './SuperAdminSystemHealth.css';

const SuperAdminSystemHealth = () => {
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  const [selectedServer, setSelectedServer] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Mock system metrics data
  const mockSystemMetrics = {
    overallHealth: 98.7,
    uptime: '99.99%',
    lastUpdated: new Date().toISOString(),
    servers: [
      {
        id: 1,
        name: 'Web Server 01',
        status: 'healthy',
        cpuUsage: 45,
        memoryUsage: 68,
        diskUsage: 42,
        networkLatency: 24,
        temperature: 42,
        lastReboot: '2024-01-10 03:00:00',
        ipAddress: '192.168.1.10',
        location: 'Primary DC',
        services: ['nginx', 'nodejs', 'redis']
      },
      {
        id: 2,
        name: 'Database Server',
        status: 'warning',
        cpuUsage: 78,
        memoryUsage: 85,
        diskUsage: 92,
        networkLatency: 12,
        temperature: 56,
        lastReboot: '2024-01-05 02:30:00',
        ipAddress: '192.168.1.20',
        location: 'Primary DC',
        services: ['postgresql', 'mongodb', 'elasticsearch']
      },
      {
        id: 3,
        name: 'Cache Server',
        status: 'healthy',
        cpuUsage: 32,
        memoryUsage: 45,
        diskUsage: 28,
        networkLatency: 8,
        temperature: 38,
        lastReboot: '2024-01-12 01:00:00',
        ipAddress: '192.168.1.30',
        location: 'Secondary DC',
        services: ['redis', 'memcached']
      },
      {
        id: 4,
        name: 'File Server',
        status: 'critical',
        cpuUsage: 92,
        memoryUsage: 95,
        diskUsage: 98,
        networkLatency: 156,
        temperature: 68,
        lastReboot: '2023-12-28 04:15:00',
        ipAddress: '192.168.1.40',
        location: 'Primary DC',
        services: ['nginx', 'samba', 'backup']
      },
      {
        id: 5,
        name: 'API Gateway',
        status: 'healthy',
        cpuUsage: 28,
        memoryUsage: 42,
        diskUsage: 35,
        networkLatency: 15,
        temperature: 41,
        lastReboot: '2024-01-14 23:00:00',
        ipAddress: '192.168.1.50',
        location: 'Secondary DC',
        services: ['kong', 'nginx']
      },
      {
        id: 6,
        name: 'Monitoring Server',
        status: 'warning',
        cpuUsage: 65,
        memoryUsage: 72,
        diskUsage: 88,
        networkLatency: 18,
        temperature: 48,
        lastReboot: '2024-01-08 00:30:00',
        ipAddress: '192.168.1.60',
        location: 'Primary DC',
        services: ['prometheus', 'grafana', 'alertmanager']
      }
    ],
    services: [
      { name: 'Web Server', status: 'up', uptime: '99.95%', responseTime: 142 },
      { name: 'Database', status: 'up', uptime: '99.98%', responseTime: 45 },
      { name: 'Cache', status: 'up', uptime: '99.99%', responseTime: 8 },
      { name: 'API Gateway', status: 'up', uptime: '99.97%', responseTime: 25 },
      { name: 'Authentication', status: 'down', uptime: '99.50%', responseTime: 0 },
      { name: 'Email Service', status: 'up', uptime: '99.92%', responseTime: 320 },
      { name: 'File Storage', status: 'warning', uptime: '99.80%', responseTime: 180 },
      { name: 'Monitoring', status: 'up', uptime: '99.99%', responseTime: 12 }
    ],
    databaseMetrics: {
      connections: 245,
      queriesPerSecond: 1245,
      replicationLag: 0,
      cacheHitRate: 96.8,
      deadlocks: 2
    },
    networkMetrics: {
      bandwidthUsage: '1.2 Gbps',
      packetsPerSecond: 24500,
      errorRate: 0.02,
      latency: 24,
      activeConnections: 1247
    },
    securityMetrics: {
      failedLogins: 12,
      firewallBlocks: 45,
      malwareDetections: 0,
      sslExpiryDays: 15,
      vulnerabilityScans: 3
    },
    performanceMetrics: {
      pageLoadTime: 1.2,
      apiResponseTime: 0.8,
      cacheHitRate: 88.5,
      errorRate: 0.12,
      throughput: '2.4k req/sec'
    }
  };

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'High CPU Usage on File Server',
      message: 'CPU usage consistently above 90% for 15 minutes',
      timestamp: '2024-01-15 14:25:00',
      server: 'File Server',
      acknowledged: false
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Database Disk Space Low',
      message: 'Only 8% disk space remaining',
      timestamp: '2024-01-15 13:45:00',
      server: 'Database Server',
      acknowledged: true
    },
    {
      id: 3,
      severity: 'warning',
      title: 'High Memory Usage',
      message: 'Memory usage at 85% on Database Server',
      timestamp: '2024-01-15 12:30:00',
      server: 'Database Server',
      acknowledged: false
    },
    {
      id: 4,
      severity: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight 2:00 AM',
      timestamp: '2024-01-15 10:00:00',
      server: 'All Servers',
      acknowledged: true
    }
  ];

  useEffect(() => {
    loadSystemData();
    const interval = setInterval(() => {
      if (autoRefresh) {
        loadSystemData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const loadSystemData = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedMetrics = {
        ...mockSystemMetrics,
        overallHealth: Math.min(100, Math.max(90, mockSystemMetrics.overallHealth + (Math.random() * 2 - 1))),
        servers: mockSystemMetrics.servers.map(server => ({
          ...server,
          cpuUsage: Math.min(100, Math.max(10, server.cpuUsage + (Math.random() * 10 - 5))),
          memoryUsage: Math.min(100, Math.max(20, server.memoryUsage + (Math.random() * 5 - 2.5))),
          diskUsage: Math.min(100, Math.max(25, server.diskUsage + (Math.random() * 2 - 1)))
        }))
      };
      
      setSystemMetrics(updatedMetrics);
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  };

  const handleServerClick = (server) => {
    setSelectedServer(selectedServer?.id === server.id ? null : server);
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#00B894';
      case 'warning': return '#FDCB6E';
      case 'critical': return '#D63031';
      case 'up': return '#00B894';
      case 'down': return '#D63031';
      default: return '#0984E3';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'fa-exclamation-circle';
      case 'warning': return 'fa-exclamation-triangle';
      case 'info': return 'fa-info-circle';
      default: return 'fa-bell';
    }
  };

  const getHealthGradient = (percentage) => {
    if (percentage >= 90) return 'linear-gradient(135deg, #00B894 0%, #00A085 100%)';
    if (percentage >= 75) return 'linear-gradient(135deg, #FDCB6E 0%, #F39C12 100%)';
    return 'linear-gradient(135deg, #D63031 0%, #C0392B 100%)';
  };

  const getUsageColor = (percentage) => {
    if (percentage < 60) return '#00B894';
    if (percentage < 80) return '#FDCB6E';
    return '#D63031';
  };

  const renderMetricCard = (title, value, icon, color, unit = '') => (
    <div className="syshealth-metric-card">
      <div className="syshealth-metric-header">
        <div className="syshealth-metric-icon" style={{ backgroundColor: color }}>
          <i className={`fas ${icon}`}></i>
        </div>
        <span className="syshealth-metric-title">{title}</span>
      </div>
      <div className="syshealth-metric-value">
        {value}
        {unit && <span className="syshealth-metric-unit">{unit}</span>}
      </div>
    </div>
  );

  const renderServerCard = (server) => (
    <div 
      key={server.id}
      className={`syshealth-server-card ${selectedServer?.id === server.id ? 'syshealth-server-selected' : ''}`}
      onClick={() => handleServerClick(server)}
    >
      <div className="syshealth-server-header">
        <div className="syshealth-server-name">
          <i className="fas fa-server"></i>
          {server.name}
        </div>
        <div className="syshealth-server-status">
          <span 
            className="syshealth-status-badge"
            style={{ backgroundColor: getStatusColor(server.status) }}
          >
            {server.status}
          </span>
        </div>
      </div>
      
      <div className="syshealth-server-metrics">
        <div className="syshealth-server-metric">
          <div className="syshealth-server-metric-label">CPU</div>
          <div className="syshealth-server-metric-bar">
            <div 
              className="syshealth-server-metric-fill"
              style={{ 
                width: `${server.cpuUsage}%`,
                backgroundColor: getUsageColor(server.cpuUsage)
              }}
            ></div>
          </div>
          <div className="syshealth-server-metric-value">{server.cpuUsage}%</div>
        </div>
        
        <div className="syshealth-server-metric">
          <div className="syshealth-server-metric-label">Memory</div>
          <div className="syshealth-server-metric-bar">
            <div 
              className="syshealth-server-metric-fill"
              style={{ 
                width: `${server.memoryUsage}%`,
                backgroundColor: getUsageColor(server.memoryUsage)
              }}
            ></div>
          </div>
          <div className="syshealth-server-metric-value">{server.memoryUsage}%</div>
        </div>
        
        <div className="syshealth-server-metric">
          <div className="syshealth-server-metric-label">Disk</div>
          <div className="syshealth-server-metric-bar">
            <div 
              className="syshealth-server-metric-fill"
              style={{ 
                width: `${server.diskUsage}%`,
                backgroundColor: getUsageColor(server.diskUsage)
              }}
            ></div>
          </div>
          <div className="syshealth-server-metric-value">{server.diskUsage}%</div>
        </div>
      </div>
      
      <div className="syshealth-server-info">
        <div className="syshealth-server-info-item">
          <i className="fas fa-network-wired"></i>
          <span>{server.networkLatency}ms</span>
        </div>
        <div className="syshealth-server-info-item">
          <i className="fas fa-thermometer-half"></i>
          <span>{server.temperature}°C</span>
        </div>
        <div className="syshealth-server-info-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>{server.location}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="syshealth-container p-4">
      {/* Header */}
      <div className="syshealth-header">
        <div className="syshealth-header-main">
          <h1 className="syshealth-title">
            <i className="fas fa-crown syshealth-crown"></i>
            System Health Dashboard
          </h1>
          <p className="syshealth-subtitle">
            Real-time monitoring and performance metrics
          </p>
        </div>
        
        <div className="syshealth-controls">
          <div className="syshealth-auto-refresh">
            <label className="syshealth-toggle">
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
              />
              <span className="syshealth-toggle-slider"></span>
              <span className="syshealth-toggle-label">Auto Refresh</span>
            </label>
          </div>
          
          <button 
            className="syshealth-refresh-btn"
            onClick={loadSystemData}
            disabled={loading}
          >
            <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
            {loading ? 'Refreshing...' : 'Refresh Now'}
          </button>
          
          <button className="syshealth-report-btn">
            <i className="fas fa-file-download"></i>
            Generate Report
          </button>
        </div>
      </div>

      {/* Overall Health Status */}
      <div className="syshealth-overview">
        <div className="syshealth-status-card">
          <div className="syshealth-status-header">
            <h3 className="syshealth-status-title">
              <i className="fas fa-heartbeat"></i>
              Overall System Health
            </h3>
            <div className="syshealth-uptime">
              <i className="fas fa-clock"></i>
              Uptime: {systemMetrics?.uptime || '99.99%'}
            </div>
          </div>
          
          <div className="syshealth-status-main">
            <div className="syshealth-score">
              <div className="syshealth-score-circle">
                <div 
                  className="syshealth-score-fill"
                  style={{ 
                    background: systemMetrics ? getHealthGradient(systemMetrics.overallHealth) : '#f0f0f0'
                  }}
                >
                  <span className="syshealth-score-value">
                    {systemMetrics ? systemMetrics.overallHealth.toFixed(1) : '--'}
                    <span className="syshealth-score-percent">%</span>
                  </span>
                </div>
              </div>
              <div className="syshealth-score-label">Health Score</div>
            </div>
            
            <div className="syshealth-status-indicators">
              <div className="syshealth-indicator">
                <div className="syshealth-indicator-dot" style={{ backgroundColor: '#00B894' }}></div>
                <div className="syshealth-indicator-text">Healthy</div>
                <div className="syshealth-indicator-count">
                  {systemMetrics ? systemMetrics.servers.filter(s => s.status === 'healthy').length : 0}
                </div>
              </div>
              
              <div className="syshealth-indicator">
                <div className="syshealth-indicator-dot" style={{ backgroundColor: '#FDCB6E' }}></div>
                <div className="syshealth-indicator-text">Warning</div>
                <div className="syshealth-indicator-count">
                  {systemMetrics ? systemMetrics.servers.filter(s => s.status === 'warning').length : 0}
                </div>
              </div>
              
              <div className="syshealth-indicator">
                <div className="syshealth-indicator-dot" style={{ backgroundColor: '#D63031' }}></div>
                <div className="syshealth-indicator-text">Critical</div>
                <div className="syshealth-indicator-count">
                  {systemMetrics ? systemMetrics.servers.filter(s => s.status === 'critical').length : 0}
                </div>
              </div>
            </div>
          </div>
          
          <div className="syshealth-last-updated">
            <i className="fas fa-history"></i>
            Last updated: {systemMetrics ? new Date(systemMetrics.lastUpdated).toLocaleTimeString() : '--'}
          </div>
        </div>
        
        {/* Quick Metrics */}
        <div className="syshealth-quick-metrics">
          {renderMetricCard('Active Servers', systemMetrics?.servers.length || 0, 'fa-server', '#FFD700')}
          {renderMetricCard('Total Services', systemMetrics?.services.length || 0, 'fa-cogs', '#6C5CE7')}
          {renderMetricCard('Database Connections', systemMetrics?.databaseMetrics.connections || 0, 'fa-database', '#00B894')}
          {renderMetricCard('Network Latency', systemMetrics?.networkMetrics.latency || 0, 'fa-network-wired', '#0984E3', 'ms')}
          {renderMetricCard('API Response', systemMetrics?.performanceMetrics.apiResponseTime || 0, 'fa-bolt', '#FDCB6E', 's')}
          {renderMetricCard('Cache Hit Rate', systemMetrics?.performanceMetrics.cacheHitRate || 0, 'fa-bolt', '#00CEC9', '%')}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="syshealth-tabs">
        <button 
          className={`syshealth-tab ${activeView === 'overview' ? 'syshealth-tab-active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          <i className="fas fa-chart-pie"></i>
          Overview
        </button>
        
        <button 
          className={`syshealth-tab ${activeView === 'servers' ? 'syshealth-tab-active' : ''}`}
          onClick={() => setActiveView('servers')}
        >
          <i className="fas fa-server"></i>
          Servers
        </button>
        
        <button 
          className={`syshealth-tab ${activeView === 'services' ? 'syshealth-tab-active' : ''}`}
          onClick={() => setActiveView('services')}
        >
          <i className="fas fa-cogs"></i>
          Services
        </button>
        
        <button 
          className={`syshealth-tab ${activeView === 'database' ? 'syshealth-tab-active' : ''}`}
          onClick={() => setActiveView('database')}
        >
          <i className="fas fa-database"></i>
          Database
        </button>
        
        <button 
          className={`syshealth-tab ${activeView === 'network' ? 'syshealth-tab-active' : ''}`}
          onClick={() => setActiveView('network')}
        >
          <i className="fas fa-network-wired"></i>
          Network
        </button>
        
        <button 
          className={`syshealth-tab ${activeView === 'security' ? 'syshealth-tab-active' : ''}`}
          onClick={() => setActiveView('security')}
        >
          <i className="fas fa-shield-alt"></i>
          Security
        </button>
      </div>

      {/* Main Content */}
      <div className="syshealth-content">
        {/* Left Column - Servers & Alerts */}
        <div className="syshealth-left-column">
          {/* Servers Grid */}
          <div className="syshealth-servers-grid">
            <h3 className="syshealth-section-title">
              <i className="fas fa-server"></i>
              Server Status
            </h3>
            
            {loading ? (
              <div className="syshealth-loading">
                <div className="syshealth-loading-spinner">
                  <div className="syshealth-spinner-circle"></div>
                  <div className="syshealth-spinner-circle"></div>
                  <div className="syshealth-spinner-circle"></div>
                  <div className="syshealth-spinner-circle"></div>
                </div>
                <div className="syshealth-loading-text">
                  <h3>Loading system data...</h3>
                </div>
              </div>
            ) : (
              <div className="syshealth-servers-list">
                {systemMetrics?.servers.map(renderServerCard)}
              </div>
            )}
          </div>
          
          {/* Active Alerts */}
          <div className="syshealth-alerts">
            <div className="syshealth-alerts-header">
              <h3 className="syshealth-section-title">
                <i className="fas fa-exclamation-triangle"></i>
                Active Alerts
                {alerts.filter(a => !a.acknowledged).length > 0 && (
                  <span className="syshealth-alert-badge">
                    {alerts.filter(a => !a.acknowledged).length}
                  </span>
                )}
              </h3>
              <button className="syshealth-alerts-clear">
                <i className="fas fa-check-double"></i>
                Clear All
              </button>
            </div>
            
            <div className="syshealth-alerts-list">
              {alerts.length === 0 ? (
                <div className="syshealth-no-alerts">
                  <i className="fas fa-check-circle"></i>
                  <p>No active alerts</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div 
                    key={alert.id} 
                    className={`syshealth-alert-item ${alert.acknowledged ? 'syshealth-alert-acknowledged' : ''}`}
                    data-severity={alert.severity}
                  >
                    <div className="syshealth-alert-icon">
                      <i className={`fas ${getSeverityIcon(alert.severity)}`}></i>
                    </div>
                    
                    <div className="syshealth-alert-content">
                      <div className="syshealth-alert-title">{alert.title}</div>
                      <div className="syshealth-alert-message">{alert.message}</div>
                      <div className="syshealth-alert-meta">
                        <span className="syshealth-alert-server">
                          <i className="fas fa-server"></i>
                          {alert.server}
                        </span>
                        <span className="syshealth-alert-time">
                          <i className="fas fa-clock"></i>
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                    
                    {!alert.acknowledged && (
                      <button 
                        className="syshealth-alert-acknowledge"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        <i className="fas fa-check"></i>
                        Ack
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Details & Metrics */}
        <div className="syshealth-right-column">
          {/* Server Details */}
          {selectedServer ? (
            <div className="syshealth-server-details">
              <div className="syshealth-details-header">
                <h3 className="syshealth-details-title">
                  <i className="fas fa-server"></i>
                  {selectedServer.name}
                </h3>
                <button 
                  className="syshealth-details-close"
                  onClick={() => setSelectedServer(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="syshealth-details-content">
                <div className="syshealth-details-section">
                  <h4 className="syshealth-details-subtitle">Basic Information</h4>
                  <div className="syshealth-details-grid">
                    <div className="syshealth-detail-item">
                      <label>IP Address</label>
                      <div className="syshealth-detail-value">{selectedServer.ipAddress}</div>
                    </div>
                    <div className="syshealth-detail-item">
                      <label>Location</label>
                      <div className="syshealth-detail-value">{selectedServer.location}</div>
                    </div>
                    <div className="syshealth-detail-item">
                      <label>Last Reboot</label>
                      <div className="syshealth-detail-value">{selectedServer.lastReboot}</div>
                    </div>
                    <div className="syshealth-detail-item">
                      <label>Status</label>
                      <div className="syshealth-detail-value">
                        <span 
                          className="syshealth-status-badge"
                          style={{ backgroundColor: getStatusColor(selectedServer.status) }}
                        >
                          {selectedServer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="syshealth-details-section">
                  <h4 className="syshealth-details-subtitle">Resource Usage</h4>
                  <div className="syshealth-resource-metrics">
                    <div className="syshealth-resource-metric">
                      <div className="syshealth-resource-header">
                        <span>CPU Usage</span>
                        <span className="syshealth-resource-value">{selectedServer.cpuUsage}%</span>
                      </div>
                      <div className="syshealth-resource-bar">
                        <div 
                          className="syshealth-resource-fill"
                          style={{ 
                            width: `${selectedServer.cpuUsage}%`,
                            backgroundColor: getUsageColor(selectedServer.cpuUsage)
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="syshealth-resource-metric">
                      <div className="syshealth-resource-header">
                        <span>Memory Usage</span>
                        <span className="syshealth-resource-value">{selectedServer.memoryUsage}%</span>
                      </div>
                      <div className="syshealth-resource-bar">
                        <div 
                          className="syshealth-resource-fill"
                          style={{ 
                            width: `${selectedServer.memoryUsage}%`,
                            backgroundColor: getUsageColor(selectedServer.memoryUsage)
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="syshealth-resource-metric">
                      <div className="syshealth-resource-header">
                        <span>Disk Usage</span>
                        <span className="syshealth-resource-value">{selectedServer.diskUsage}%</span>
                      </div>
                      <div className="syshealth-resource-bar">
                        <div 
                          className="syshealth-resource-fill"
                          style={{ 
                            width: `${selectedServer.diskUsage}%`,
                            backgroundColor: getUsageColor(selectedServer.diskUsage)
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="syshealth-details-section">
                  <h4 className="syshealth-details-subtitle">Running Services</h4>
                  <div className="syshealth-services-list">
                    {selectedServer.services.map((service, index) => (
                      <span key={index} className="syshealth-service-tag">
                        <i className="fas fa-cog"></i>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="syshealth-details-section">
                  <h4 className="syshealth-details-subtitle">Quick Actions</h4>
                  <div className="syshealth-action-buttons">
                    <button className="syshealth-action-btn">
                      <i className="fas fa-redo"></i>
                      Restart
                    </button>
                    <button className="syshealth-action-btn">
                      <i className="fas fa-terminal"></i>
                      SSH Access
                    </button>
                    <button className="syshealth-action-btn">
                      <i className="fas fa-chart-line"></i>
                      Detailed Metrics
                    </button>
                    <button className="syshealth-action-btn">
                      <i className="fas fa-wrench"></i>
                      Maintenance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="syshealth-system-metrics">
              {/* System Performance */}
              <div className="syshealth-metrics-card">
                <h3 className="syshealth-metrics-title">
                  <i className="fas fa-chart-line"></i>
                  System Performance
                </h3>
                
                <div className="syshealth-performance-metrics">
                  <div className="syshealth-performance-metric">
                    <div className="syshealth-performance-label">
                      <i className="fas fa-tachometer-alt"></i>
                      Page Load Time
                    </div>
                    <div className="syshealth-performance-value">
                      {systemMetrics?.performanceMetrics.pageLoadTime || 0}s
                    </div>
                  </div>
                  
                  <div className="syshealth-performance-metric">
                    <div className="syshealth-performance-label">
                      <i className="fas fa-bolt"></i>
                      API Response Time
                    </div>
                    <div className="syshealth-performance-value">
                      {systemMetrics?.performanceMetrics.apiResponseTime || 0}s
                    </div>
                  </div>
                  
                  <div className="syshealth-performance-metric">
                    <div className="syshealth-performance-label">
                      <i className="fas fa-database"></i>
                      Cache Hit Rate
                    </div>
                    <div className="syshealth-performance-value">
                      {systemMetrics?.performanceMetrics.cacheHitRate || 0}%
                    </div>
                  </div>
                  
                  <div className="syshealth-performance-metric">
                    <div className="syshealth-performance-label">
                      <i className="fas fa-exclamation-circle"></i>
                      Error Rate
                    </div>
                    <div className="syshealth-performance-value">
                      {systemMetrics?.performanceMetrics.errorRate || 0}%
                    </div>
                  </div>
                  
                  <div className="syshealth-performance-metric">
                    <div className="syshealth-performance-label">
                      <i className="fas fa-exchange-alt"></i>
                      Throughput
                    </div>
                    <div className="syshealth-performance-value">
                      {systemMetrics?.performanceMetrics.throughput || '0'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Services Status */}
              <div className="syshealth-metrics-card">
                <h3 className="syshealth-metrics-title">
                  <i className="fas fa-cogs"></i>
                  Services Status
                </h3>
                
                <div className="syshealth-services-status">
                  {systemMetrics?.services.map((service, index) => (
                    <div key={index} className="syshealth-service-status">
                      <div className="syshealth-service-name">{service.name}</div>
                      <div className="syshealth-service-metrics">
                        <span className={`syshealth-service-status-badge status-${service.status}`}>
                          {service.status}
                        </span>
                        <span className="syshealth-service-uptime">{service.uptime}</span>
                        <span className="syshealth-service-response">{service.responseTime}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Statistics */}
              <div className="syshealth-metrics-card">
                <h3 className="syshealth-metrics-title">
                  <i className="fas fa-chart-bar"></i>
                  Quick Statistics
                </h3>
                
                <div className="syshealth-statistics">
                  <div className="syshealth-statistic">
                    <div className="syshealth-statistic-label">Database Queries/sec</div>
                    <div className="syshealth-statistic-value">
                      {systemMetrics?.databaseMetrics.queriesPerSecond.toLocaleString() || 0}
                    </div>
                  </div>
                  
                  <div className="syshealth-statistic">
                    <div className="syshealth-statistic-label">Active Connections</div>
                    <div className="syshealth-statistic-value">
                      {systemMetrics?.networkMetrics.activeConnections.toLocaleString() || 0}
                    </div>
                  </div>
                  
                  <div className="syshealth-statistic">
                    <div className="syshealth-statistic-label">Bandwidth Usage</div>
                    <div className="syshealth-statistic-value">
                      {systemMetrics?.networkMetrics.bandwidthUsage || '0'}
                    </div>
                  </div>
                  
                  <div className="syshealth-statistic">
                    <div className="syshealth-statistic-label">Firewall Blocks</div>
                    <div className="syshealth-statistic-value">
                      {systemMetrics?.securityMetrics.firewallBlocks || 0}
                    </div>
                  </div>
                  
                  <div className="syshealth-statistic">
                    <div className="syshealth-statistic-label">Replication Lag</div>
                    <div className="syshealth-statistic-value">
                      {systemMetrics?.databaseMetrics.replicationLag || 0}ms
                    </div>
                  </div>
                  
                  <div className="syshealth-statistic">
                    <div className="syshealth-statistic-label">Failed Logins</div>
                    <div className="syshealth-statistic-value">
                      {systemMetrics?.securityMetrics.failedLogins || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="syshealth-footer">
        <div className="syshealth-footer-info">
          <div className="syshealth-footer-stat">
            <i className="fas fa-history"></i>
            <div>
              <div className="syshealth-footer-value">Monitoring Since: Jan 1, 2024</div>
              <div className="syshealth-footer-label">System Age</div>
            </div>
          </div>
          
          <div className="syshealth-footer-stat">
            <i className="fas fa-shield-alt"></i>
            <div>
              <div className="syshealth-footer-value">SSL Expires in: {systemMetrics?.securityMetrics.sslExpiryDays || 0} days</div>
              <div className="syshealth-footer-label">Security</div>
            </div>
          </div>
          
          <div className="syshealth-footer-stat">
            <i className="fas fa-bell"></i>
            <div>
              <div className="syshealth-footer-value">Alerts: {alerts.filter(a => !a.acknowledged).length} active</div>
              <div className="syshealth-footer-label">Notifications</div>
            </div>
          </div>
        </div>
        
        <div className="syshealth-footer-actions">
          <button className="syshealth-footer-btn">
            <i className="fas fa-cog"></i>
            System Settings
          </button>
          <button className="syshealth-footer-btn">
            <i className="fas fa-history"></i>
            View History
          </button>
          <button className="syshealth-footer-btn">
            <i className="fas fa-question-circle"></i>
            Help & Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSystemHealth;