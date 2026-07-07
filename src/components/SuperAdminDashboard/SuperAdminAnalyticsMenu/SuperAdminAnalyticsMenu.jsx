import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import "./SuperAdminAnalyticsMenu.css";

const SuperAdminAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Revenue Data
  const revenueData = [
    { name: 'Jan', revenue: 42000, growth: 12, profit: 18500 },
    { name: 'Feb', revenue: 58000, growth: 18, profit: 26500 },
    { name: 'Mar', revenue: 45000, growth: 8, profit: 19500 },
    { name: 'Apr', revenue: 72000, growth: 25, profit: 32500 },
    { name: 'May', revenue: 68000, growth: 22, profit: 30500 },
    { name: 'Jun', revenue: 89000, growth: 32, profit: 41500 },
    { name: 'Jul', revenue: 95000, growth: 35, profit: 45500 },
  ];

  // User Analytics Data
  const userData = [
    { name: 'Mon', active: 1247, new: 178, returning: 856 },
    { name: 'Tue', active: 1356, new: 192, returning: 924 },
    { name: 'Wed', active: 1289, new: 165, returning: 891 },
    { name: 'Thu', active: 1423, new: 210, returning: 978 },
    { name: 'Fri', active: 1567, new: 234, returning: 1098 },
    { name: 'Sat', active: 1321, new: 187, returning: 907 },
    { name: 'Sun', active: 1214, new: 156, returning: 823 },
  ];

  // Traffic Sources
  const trafficData = [
    { name: 'Direct', value: 35, color: '#FFD700' },
    { name: 'Organic', value: 25, color: '#B8860B' },
    { name: 'Social', value: 20, color: '#DAA520' },
    { name: 'Email', value: 12, color: '#FFC72C' },
    { name: 'Referral', value: 8, color: '#FFB300' },
  ];

  // Performance Metrics
  const performanceData = [
    { metric: 'Server Uptime', value: 99.8, target: 99.5, status: 'excellent' },
    { metric: 'Response Time', value: 142, target: 200, status: 'good' },
    { metric: 'API Success', value: 98.5, target: 97, status: 'excellent' },
    { metric: 'Database Health', value: 96.2, target: 95, status: 'good' },
    { metric: 'Cache Hit Rate', value: 88.7, target: 85, status: 'good' },
    { metric: 'Error Rate', value: 0.8, target: 1, status: 'excellent' },
  ];

  // Real-time Activity
  const realTimeData = [
    { time: '10:00', transactions: 45, users: 124, revenue: 2400 },
    { time: '11:00', transactions: 52, users: 156, revenue: 3200 },
    { time: '12:00', transactions: 68, users: 198, revenue: 4500 },
    { time: '13:00', transactions: 72, users: 210, revenue: 5200 },
    { time: '14:00', transactions: 65, users: 187, revenue: 4100 },
    { time: '15:00', transactions: 58, users: 165, revenue: 3800 },
  ];

  // System Health Data
  const systemHealthData = [
    { subject: 'CPU', A: 86, B: 70, fullMark: 100 },
    { subject: 'Memory', A: 72, B: 85, fullMark: 100 },
    { subject: 'Disk', A: 94, B: 90, fullMark: 100 },
    { subject: 'Network', A: 88, B: 82, fullMark: 100 },
    { subject: 'Database', A: 92, B: 88, fullMark: 100 },
    { subject: 'Cache', A: 78, B: 75, fullMark: 100 },
  ];

  // Top Performing Features
  const topFeatures = [
    { name: 'Dashboard', usage: 95, satisfaction: 4.8 },
    { name: 'Reports', usage: 87, satisfaction: 4.6 },
    { name: 'Analytics', usage: 92, satisfaction: 4.7 },
    { name: 'API Access', usage: 78, satisfaction: 4.4 },
    { name: 'Security', usage: 96, satisfaction: 4.9 },
  ];

  // Quick Stats
  const quickStats = [
    { title: 'Total Revenue', value: '$245,890', change: '+12.5%', icon: 'fa-money-bill-wave', color: '#00B894' },
    { title: 'Active Users', value: '12,456', change: '+8.2%', icon: 'fa-users', color: '#0984E3' },
    { title: 'Conversion Rate', value: '4.8%', change: '+0.6%', icon: 'fa-chart-line', color: '#FDCB6E' },
    { title: 'Avg. Session', value: '8m 24s', change: '+1.2%', icon: 'fa-clock', color: '#E17055' },
    { title: 'System Health', value: '98.7%', change: '+0.3%', icon: 'fa-heart-pulse', color: '#00CEC9' },
    { title: 'API Calls', value: '2.4M', change: '+15.3%', icon: 'fa-bolt', color: '#6C5CE7' },
  ];

  // Recent Activities
  const recentActivities = [
    { id: 1, action: 'User registration completed', user: 'John Doe', time: '2 min ago', type: 'success' },
    { id: 2, action: 'System backup completed', user: 'System', time: '15 min ago', type: 'info' },
    { id: 3, action: 'API rate limit exceeded', user: 'API Service', time: '30 min ago', type: 'warning' },
    { id: 4, action: 'Security audit passed', user: 'Security Team', time: '1 hour ago', type: 'success' },
    { id: 5, action: 'Database optimized', user: 'DBA Team', time: '2 hours ago', type: 'info' },
  ];

  // Anomaly Detection
  const anomalies = [
    { id: 1, type: 'Security', severity: 'High', detected: '10 min ago', status: 'active' },
    { id: 2, type: 'Performance', severity: 'Medium', detected: '45 min ago', status: 'investigating' },
    { id: 3, type: 'Network', severity: 'Low', detected: '2 hours ago', status: 'resolved' },
  ];

  // Tab Content Renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="saa-overview">
            <div className="saa-stats-grid">
              {quickStats.map((stat, index) => (
                <div key={index} className="saa-stat-card">
                  <div className="saa-stat-header">
                    <div className="saa-stat-icon" style={{ backgroundColor: stat.color }}>
                      <i className={`fas ${stat.icon}`}></i>
                    </div>
                    <div className="saa-stat-title">{stat.title}</div>
                  </div>
                  <div className="saa-stat-value">{stat.value}</div>
                  <div className="saa-stat-change" style={{ 
                    color: stat.change.startsWith('+') ? '#00B894' : '#D63031' 
                  }}>
                    <i className={`fas fa-${stat.change.startsWith('+') ? 'arrow-up' : 'arrow-down'}`}></i>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="saa-charts-row">
              <div className="saa-chart-card">
                <h3 className="saa-chart-title">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      labelStyle={{ color: '#333' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#FFD700" 
                      fill="#FFEC8B" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="saa-chart-card">
                <h3 className="saa-chart-title">User Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#B8860B" name="Active Users" />
                    <Bar dataKey="new" fill="#FFD700" name="New Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="saa-charts-row">
              <div className="saa-chart-card">
                <h3 className="saa-chart-title">Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="saa-chart-card">
                <h3 className="saa-chart-title">System Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={systemHealthData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Current"
                      dataKey="A"
                      stroke="#FFD700"
                      fill="#FFEC8B"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Target"
                      dataKey="B"
                      stroke="#B8860B"
                      fill="#FFC72C"
                      fillOpacity={0.3}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'traffic':
        return (
          <div className="saa-traffic">
            <h2>Traffic Analysis</h2>
          </div>
        );

      case 'performance':
        return (
          <div className="saa-performance">
            <h2>Performance Metrics</h2>
            <div className="saa-performance-grid">
              {performanceData.map((item, index) => (
                <div key={index} className="saa-performance-card">
                  <div className="saa-performance-header">
                    <h4>{item.metric}</h4>
                    <span className={`saa-performance-status saa-status-${item.status}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="saa-performance-value">
                    <span className="saa-current-value">{item.value}</span>
                    <span className="saa-target-value">Target: {item.target}</span>
                  </div>
                  <div className="saa-performance-progress">
                    <div 
                      className="saa-progress-bar"
                      style={{ 
                        width: `${(item.value / 100) * 100}%`,
                        backgroundColor: item.status === 'excellent' ? '#00B894' : 
                                       item.status === 'good' ? '#FDCB6E' : '#E17055'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'realtime':
        return (
          <div className="saa-realtime">
            <h2>Real-time Analytics</h2>
            <div className="saa-realtime-chart">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="transactions"
                    stroke="#FFD700"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00B894"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="saa-dashboard-container">
      <div className="saa-header">
        <div className="saa-header-main">
          <h1 className="saa-title">
            <i className="fas fa-crown saa-crown"></i>
            Super Admin Analytics Dashboard
          </h1>
          <p className="saa-subtitle">
            Comprehensive analytics and insights for system administration
          </p>
        </div>
        
        <div className="saa-header-actions">
          <div className="saa-time-range">
            <button 
              className={`saa-time-btn ${timeRange === 'day' ? 'saa-active' : ''}`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button 
              className={`saa-time-btn ${timeRange === 'week' ? 'saa-active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`saa-time-btn ${timeRange === 'month' ? 'saa-active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`saa-time-btn ${timeRange === 'year' ? 'saa-active' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
          
          <button className="saa-export-btn">
            <i className="fas fa-download"></i>
            Export Report
          </button>
          
          <button className="saa-refresh-btn" onClick={() => setLoading(true)}>
            <i className={`fas fa-sync ${loading ? 'fa-spin' : ''}`}></i>
            Refresh
          </button>
        </div>
      </div>

      <div className="saa-tabs">
        <button 
          className={`saa-tab ${activeTab === 'overview' ? 'saa-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="fas fa-chart-pie"></i>
          Overview
        </button>
        
        <button 
          className={`saa-tab ${activeTab === 'traffic' ? 'saa-active' : ''}`}
          onClick={() => setActiveTab('traffic')}
        >
          <i className="fas fa-chart-line"></i>
          Traffic Analysis
        </button>
        
        <button 
          className={`saa-tab ${activeTab === 'user_behavior' ? 'saa-active' : ''}`}
          onClick={() => setActiveTab('user_behavior')}
        >
          <i className="fas fa-users"></i>
          User Behavior
        </button>
        
        <button 
          className={`saa-tab ${activeTab === 'performance' ? 'saa-active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          <i className="fas fa-gauge-high"></i>
          Performance
        </button>
        
        <button 
          className={`saa-tab ${activeTab === 'realtime' ? 'saa-active' : ''}`}
          onClick={() => setActiveTab('realtime')}
        >
          <i className="fas fa-bolt"></i>
          Real-time
        </button>
        
        <button 
          className={`saa-tab ${activeTab === 'security' ? 'saa-active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <i className="fas fa-shield-halved"></i>
          Security
        </button>
      </div>

      <div className="saa-content">
        {renderTabContent()}
        
        <div className="saa-side-panels">
          <div className="saa-panel">
            <div className="saa-panel-header">
              <h3><i className="fas fa-history"></i> Recent Activities</h3>
              <span className="saa-panel-badge">{recentActivities.length}</span>
            </div>
            <div className="saa-panel-content">
              {recentActivities.map(activity => (
                <div key={activity.id} className="saa-activity-item">
                  <div className="saa-activity-icon">
                    <i className={`fas fa-circle saa-activity-${activity.type}`}></i>
                  </div>
                  <div className="saa-activity-details">
                    <div className="saa-activity-action">{activity.action}</div>
                    <div className="saa-activity-meta">
                      <span className="saa-activity-user">{activity.user}</span>
                      <span className="saa-activity-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="saa-panel">
            <div className="saa-panel-header">
              <h3><i className="fas fa-exclamation-triangle"></i> Anomaly Detection</h3>
              <span className="saa-panel-badge saa-badge-warning">
                {anomalies.length}
              </span>
            </div>
            <div className="saa-panel-content">
              {anomalies.map(anomaly => (
                <div key={anomaly.id} className="saa-anomaly-item">
                  <div className="saa-anomaly-type">{anomaly.type}</div>
                  <div className={`saa-anomaly-severity saa-severity-${anomaly.severity.toLowerCase()}`}>
                    {anomaly.severity}
                  </div>
                  <div className="saa-anomaly-time">{anomaly.detected}</div>
                  <div className={`saa-anomaly-status saa-status-${anomaly.status}`}>
                    {anomaly.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="saa-panel">
            <div className="saa-panel-header">
              <h3><i className="fas fa-star"></i> Top Performing Features</h3>
            </div>
            <div className="saa-panel-content">
              {topFeatures.map((feature, index) => (
                <div key={index} className="saa-feature-item">
                  <div className="saa-feature-name">{feature.name}</div>
                  <div className="saa-feature-metrics">
                    <div className="saa-feature-usage">
                      <div className="saa-feature-usage-label">Usage</div>
                      <div className="saa-feature-usage-bar">
                        <div 
                          className="saa-feature-usage-fill"
                          style={{ width: `${feature.usage}%` }}
                        ></div>
                      </div>
                      <div className="saa-feature-usage-value">{feature.usage}%</div>
                    </div>
                    <div className="saa-feature-satisfaction">
                      <div className="saa-feature-satisfaction-label">Satisfaction</div>
                      <div className="saa-feature-rating">
                        <i className="fas fa-star"></i>
                        <span>{feature.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="saa-footer-stats">
        <div className="saa-footer-stat">
          <i className="fas fa-server"></i>
          <div>
            <div className="saa-footer-stat-value">99.8%</div>
            <div className="saa-footer-stat-label">Server Uptime</div>
          </div>
        </div>
        
        <div className="saa-footer-stat">
          <i className="fas fa-shield-alt"></i>
          <div>
            <div className="saa-footer-stat-value">100%</div>
            <div className="saa-footer-stat-label">Security Score</div>
          </div>
        </div>
        
        <div className="saa-footer-stat">
          <i className="fas fa-database"></i>
          <div>
            <div className="saa-footer-stat-value">2.4 TB</div>
            <div className="saa-footer-stat-label">Data Processed</div>
          </div>
        </div>
        
        <div className="saa-footer-stat">
          <i className="fas fa-bolt"></i>
          <div>
            <div className="saa-footer-stat-value">142ms</div>
            <div className="saa-footer-stat-label">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAnalyticsDashboard;