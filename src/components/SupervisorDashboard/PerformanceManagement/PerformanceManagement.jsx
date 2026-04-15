import React, { useState, useEffect } from 'react';
import './PerformanceManagement.css';

const PerformanceManagement = () => {
  const [performanceData, setPerformanceData] = useState({
    departments: [],
    staffPerformance: [],
    metrics: [],
    kpis: [],
    loading: true,
    viewMode: 'overview', // overview, detailed, comparative
    timeRange: 'monthly', // weekly, monthly, quarterly
    selectedDepartment: 'all'
  });

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  // Department Performance Data
  const departmentPerformance = [
    {
      id: 1,
      name: "Cardiology",
      efficiency: 92,
      patientSatisfaction: 88,
      treatmentSuccess: 95,
      avgResponseTime: "8 mins",
      staffPerformance: 90,
      trend: "up",
      color: "#4CAF50"
    },
    {
      id: 2,
      name: "Emergency",
      efficiency: 85,
      patientSatisfaction: 82,
      treatmentSuccess: 88,
      avgResponseTime: "4 mins",
      staffPerformance: 87,
      trend: "stable",
      color: "#F44336"
    },
    {
      id: 3,
      name: "Pediatrics",
      efficiency: 95,
      patientSatisfaction: 94,
      treatmentSuccess: 97,
      avgResponseTime: "12 mins",
      staffPerformance: 93,
      trend: "up",
      color: "#2196F3"
    },
    {
      id: 4,
      name: "Neurology",
      efficiency: 88,
      patientSatisfaction: 86,
      treatmentSuccess: 91,
      avgResponseTime: "15 mins",
      staffPerformance: 89,
      trend: "up",
      color: "#9C27B0"
    },
    {
      id: 5,
      name: "Orthopedics",
      efficiency: 84,
      patientSatisfaction: 80,
      treatmentSuccess: 89,
      avgResponseTime: "20 mins",
      staffPerformance: 82,
      trend: "down",
      color: "#FF9800"
    },
    {
      id: 6,
      name: "Pathology",
      efficiency: 96,
      patientSatisfaction: 90,
      treatmentSuccess: 98,
      avgResponseTime: "30 mins",
      staffPerformance: 94,
      trend: "stable",
      color: "#607D8B"
    }
  ];

  // Staff Performance Data
  const staffPerformanceData = [
    {
      id: 101,
      name: "Dr. Rajesh Sharma",
      department: "Cardiology",
      role: "Senior Cardiologist",
      performanceScore: 95,
      patientSatisfaction: 92,
      efficiency: 94,
      attendance: 98,
      qualityScore: 96,
      trend: "up",
      lastReview: "2024-01-10",
      status: "excellent"
    },
    {
      id: 102,
      name: "Nurse Anjali Singh",
      department: "Emergency",
      role: "Head Nurse",
      performanceScore: 88,
      patientSatisfaction: 90,
      efficiency: 85,
      attendance: 95,
      qualityScore: 87,
      trend: "stable",
      lastReview: "2024-01-12",
      status: "good"
    },
    {
      id: 103,
      name: "Dr. Priya Patel",
      department: "Neurology",
      role: "Neurologist",
      performanceScore: 92,
      patientSatisfaction: 94,
      efficiency: 90,
      attendance: 97,
      qualityScore: 93,
      trend: "up",
      lastReview: "2024-01-08",
      status: "excellent"
    },
    {
      id: 104,
      name: "Lab Technician Rohit",
      department: "Pathology",
      role: "Senior Lab Technician",
      performanceScore: 84,
      patientSatisfaction: 82,
      efficiency: 86,
      attendance: 92,
      qualityScore: 83,
      trend: "down",
      lastReview: "2024-01-05",
      status: "average"
    },
    {
      id: 105,
      name: "Dr. Amit Verma",
      department: "Orthopedics",
      role: "Orthopedic Surgeon",
      performanceScore: 78,
      patientSatisfaction: 75,
      efficiency: 80,
      attendance: 85,
      qualityScore: 76,
      trend: "down",
      lastReview: "2024-01-03",
      status: "needs_improvement"
    },
    {
      id: 106,
      name: "Dr. Sneha Reddy",
      department: "Pediatrics",
      role: "Pediatrician",
      performanceScore: 96,
      patientSatisfaction: 97,
      efficiency: 95,
      attendance: 99,
      qualityScore: 97,
      trend: "up",
      lastReview: "2024-01-14",
      status: "excellent"
    },
    {
      id: 107,
      name: "Housekeeping Manager",
      department: "Sanitation",
      role: "Sanitation Supervisor",
      performanceScore: 91,
      patientSatisfaction: 88,
      efficiency: 93,
      attendance: 96,
      qualityScore: 90,
      trend: "stable",
      lastReview: "2024-01-09",
      status: "good"
    },
    {
      id: 108,
      name: "Dr. Karan Malhotra",
      department: "Anesthesia",
      role: "Anesthesiologist",
      performanceScore: 89,
      patientSatisfaction: 87,
      efficiency: 91,
      attendance: 94,
      qualityScore: 88,
      trend: "up",
      lastReview: "2024-01-11",
      status: "good"
    }
  ];

  // Key Performance Indicators
  const kpiData = [
    {
      id: 1,
      name: "Patient Satisfaction",
      current: 88,
      target: 90,
      trend: "up",
      change: "+2%",
      icon: "😊"
    },
    {
      id: 2,
      name: "Treatment Success Rate",
      current: 92,
      target: 95,
      trend: "up",
      change: "+3%",
      icon: "✅"
    },
    {
      id: 3,
      name: "Avg Response Time",
      current: "12 mins",
      target: "10 mins",
      trend: "down",
      change: "-2 mins",
      icon: "⚡"
    },
    {
      id: 4,
      name: "Staff Efficiency",
      current: 89,
      target: 92,
      trend: "stable",
      change: "+1%",
      icon: "📊"
    },
    {
      id: 5,
      name: "Resource Utilization",
      current: 78,
      target: 85,
      trend: "up",
      change: "+4%",
      icon: "🔄"
    },
    {
      id: 6,
      name: "Safety Compliance",
      current: 96,
      target: 98,
      trend: "stable",
      change: "0%",
      icon: "🛡️"
    }
  ];

  // Performance Metrics
  const metricsData = [
    { month: "Jan", efficiency: 85, satisfaction: 82, success: 88 },
    { month: "Feb", efficiency: 87, satisfaction: 84, success: 90 },
    { month: "Mar", efficiency: 89, satisfaction: 86, success: 92 },
    { month: "Apr", efficiency: 88, satisfaction: 85, success: 91 },
    { month: "May", efficiency: 90, satisfaction: 88, success: 93 },
    { month: "Jun", efficiency: 92, satisfaction: 90, success: 95 },
    { month: "Jul", efficiency: 91, satisfaction: 89, success: 94 },
    { month: "Aug", efficiency: 93, satisfaction: 91, success: 96 },
    { month: "Sep", efficiency: 94, satisfaction: 92, success: 97 },
    { month: "Oct", efficiency: 95, satisfaction: 93, success: 98 },
    { month: "Nov", efficiency: 96, satisfaction: 94, success: 97 },
    { month: "Dec", efficiency: 97, satisfaction: 95, success: 98 }
  ];

  // Overall Stats
  const overallStats = {
    avgPerformanceScore: 89.5,
    topPerformer: "Dr. Sneha Reddy",
    worstPerformer: "Dr. Amit Verma",
    improvementAreas: 3,
    excellenceRate: "68%",
    monthlyGrowth: "+4.2%",
    departmentAvg: 87.8,
    yearToDate: 88.3
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPerformanceData(prev => ({
        ...prev,
        departments: departmentPerformance,
        staffPerformance: staffPerformanceData,
        metrics: metricsData,
        kpis: kpiData,
        loading: false
      }));
    }, 1500);
  }, []);

  // Handle View Mode Change
  const handleViewModeChange = (mode) => {
    setPerformanceData(prev => ({ ...prev, viewMode: mode }));
  };

  // Handle Time Range Change
  const handleTimeRangeChange = (range) => {
    setPerformanceData(prev => ({ ...prev, timeRange: range }));
  };

  // Handle Department Filter
  const handleDepartmentFilter = (dept) => {
    setPerformanceData(prev => ({ ...prev, selectedDepartment: dept }));
  };

  // Filter staff by department
  const filteredStaff = performanceData.selectedDepartment === 'all' 
    ? performanceData.staffPerformance 
    : performanceData.staffPerformance.filter(staff => 
        staff.department === performanceData.selectedDepartment
      );

  // Handle Performance Review
  const handlePerformanceReview = (staffId) => {
    console.log(`Review performance for staff ${staffId}`);
    // Add API call here
  };

  // Handle Export Report
  const handleExportReport = (type) => {
    console.log(`Exporting ${type} report`);
    // Add API call here
  };

  if (performanceData.loading) {
    return (
      <div className="supervisor-performance-loading">
        <div className="supervisor-performance-loading-spinner"></div>
        <p>Loading Performance Management Data...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-performance-management-container p-4">
      {/* Header */}
      <div className="supervisor-performance-header">
        <div className="supervisor-performance-header-left">
          <h1 className="supervisor-performance-title">
            <span className="supervisor-performance-header-icon">📈</span>
            Performance Management
          </h1>
          <p className="supervisor-performance-subtitle">
            Monitor and analyze hospital performance metrics and staff evaluations
          </p>
        </div>
        <div className="supervisor-performance-header-right">
          <button 
            className="supervisor-performance-export-btn"
            onClick={() => handleExportReport('full')}
          >
            <span className="supervisor-btn-icon">📥</span>
            Export Report
          </button>
          <button 
            className="supervisor-performance-generate-btn"
            onClick={() => setShowPerformanceModal(true)}
          >
            <span className="supervisor-btn-icon">📊</span>
            Generate Insights
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="supervisor-performance-overall-stats">
        <div className="supervisor-overall-stat-card">
          <div className="supervisor-overall-stat-content">
            <h3 className="supervisor-overall-stat-title">Avg Performance Score</h3>
            <p className="supervisor-overall-stat-value">{overallStats.avgPerformanceScore}</p>
            <div className="supervisor-overall-stat-trend">
              <span className="supervisor-trend-up">↑ {overallStats.monthlyGrowth} growth</span>
            </div>
          </div>
          <div className="supervisor-overall-stat-icon">🎯</div>
        </div>

        <div className="supervisor-overall-stat-card">
          <div className="supervisor-overall-stat-content">
            <h3 className="supervisor-overall-stat-title">Top Performer</h3>
            <p className="supervisor-overall-stat-name">{overallStats.topPerformer}</p>
            <div className="supervisor-overall-stat-detail">
              <span className="supervisor-stat-excellent">Excellent Rating</span>
            </div>
          </div>
          <div className="supervisor-overall-stat-icon">🏆</div>
        </div>

        <div className="supervisor-overall-stat-card">
          <div className="supervisor-overall-stat-content">
            <h3 className="supervisor-overall-stat-title">Excellence Rate</h3>
            <p className="supervisor-overall-stat-value">{overallStats.excellenceRate}</p>
            <div className="supervisor-overall-stat-trend">
              <span className="supervisor-trend-up">↑ 8% from last quarter</span>
            </div>
          </div>
          <div className="supervisor-overall-stat-icon">⭐</div>
        </div>

        <div className="supervisor-overall-stat-card">
          <div className="supervisor-overall-stat-content">
            <h3 className="supervisor-overall-stat-title">Improvement Areas</h3>
            <p className="supervisor-overall-stat-value">{overallStats.improvementAreas}</p>
            <div className="supervisor-overall-stat-trend">
              <span className="supervisor-trend-warning">Needs attention</span>
            </div>
          </div>
          <div className="supervisor-overall-stat-icon">🔍</div>
        </div>
      </div>

      {/* Controls */}
      <div className="supervisor-performance-controls">
        <div className="supervisor-view-controls">
          <div className="supervisor-view-toggle">
            <button 
              className={`supervisor-view-btn ${performanceData.viewMode === 'overview' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('overview')}
            >
              Overview
            </button>
            <button 
              className={`supervisor-view-btn ${performanceData.viewMode === 'detailed' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('detailed')}
            >
              Detailed
            </button>
            <button 
              className={`supervisor-view-btn ${performanceData.viewMode === 'comparative' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('comparative')}
            >
              Comparative
            </button>
          </div>

          <div className="supervisor-time-range">
            <select 
              className="supervisor-time-select"
              value={performanceData.timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="supervisor-filter-controls">
          <div className="supervisor-department-filter">
            <select 
              className="supervisor-dept-select"
              value={performanceData.selectedDepartment}
              onChange={(e) => handleDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {performanceData.departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className="supervisor-search-control">
            <input 
              type="text" 
              placeholder="Search staff..."
              className="supervisor-performance-search"
            />
            <button className="supervisor-search-btn">
              <span className="supervisor-search-icon">🔍</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="supervisor-performance-content-grid">
        {/* KPI Section */}
        <div className="supervisor-kpi-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">🎯</span>
              Key Performance Indicators
            </h3>
            <span className="supervisor-kpi-count">
              {performanceData.kpis.length} KPIs
            </span>
          </div>

          <div className="supervisor-kpi-grid">
            {performanceData.kpis.map((kpi) => (
              <div key={kpi.id} className="supervisor-kpi-card">
                <div className="supervisor-kpi-header">
                  <div className="supervisor-kpi-icon">{kpi.icon}</div>
                  <h4 className="supervisor-kpi-name">{kpi.name}</h4>
                </div>
                
                <div className="supervisor-kpi-metrics">
                  <div className="supervisor-kpi-current">
                    <span className="supervisor-kpi-value">{kpi.current}</span>
                    <span className={`supervisor-kpi-change supervisor-change-${kpi.trend}`}>
                      {kpi.change}
                    </span>
                  </div>
                  <div className="supervisor-kpi-target">
                    <span className="supervisor-target-label">Target:</span>
                    <span className="supervisor-target-value">{kpi.target}</span>
                  </div>
                </div>

                <div className="supervisor-kpi-progress">
                  <div className="supervisor-progress-bar">
                    <div 
                      className="supervisor-progress-fill"
                      style={{ width: `${(kpi.current / (typeof kpi.target === 'string' ? 100 : kpi.target)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="supervisor-progress-percentage">
                    {typeof kpi.current === 'string' ? 'N/A' : `${Math.round((kpi.current / kpi.target) * 100)}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="supervisor-department-performance-section">
          <div className="supervisor-section-header">
            <h3 className="supervisor-section-title">
              <span className="supervisor-section-icon">🏥</span>
              Department Performance
            </h3>
            <button 
              className="supervisor-compare-btn"
              onClick={() => handleViewModeChange('comparative')}
            >
              Compare Departments
            </button>
          </div>

          <div className="supervisor-department-performance-table">
            <div className="supervisor-dept-table-header">
              <div className="supervisor-dept-col">Department</div>
              <div className="supervisor-dept-col">Efficiency</div>
              <div className="supervisor-dept-col">Patient Satisfaction</div>
              <div className="supervisor-dept-col">Treatment Success</div>
              <div className="supervisor-dept-col">Overall Score</div>
              <div className="supervisor-dept-col">Trend</div>
            </div>

            <div className="supervisor-dept-table-body">
              {performanceData.departments.map((dept) => (
                <div key={dept.id} className="supervisor-dept-performance-row">
                  <div className="supervisor-dept-cell">
                    <div className="supervisor-dept-info">
                      <div 
                        className="supervisor-dept-color"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <h4 className="supervisor-dept-name">{dept.name}</h4>
                    </div>
                  </div>
                  
                  <div className="supervisor-dept-cell">
                    <div className="supervisor-metric-score">
                      <span className="supervisor-metric-value">{dept.efficiency}%</span>
                      <div className="supervisor-metric-bar">
                        <div 
                          className="supervisor-metric-fill"
                          style={{ width: `${dept.efficiency}%`, background: dept.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="supervisor-dept-cell">
                    <div className="supervisor-metric-score">
                      <span className="supervisor-metric-value">{dept.patientSatisfaction}%</span>
                      <div className="supervisor-metric-bar">
                        <div 
                          className="supervisor-metric-fill"
                          style={{ width: `${dept.patientSatisfaction}%`, background: dept.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="supervisor-dept-cell">
                    <div className="supervisor-metric-score">
                      <span className="supervisor-metric-value">{dept.treatmentSuccess}%</span>
                      <div className="supervisor-metric-bar">
                        <div 
                          className="supervisor-metric-fill"
                          style={{ width: `${dept.treatmentSuccess}%`, background: dept.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="supervisor-dept-cell">
                    <div className="supervisor-overall-score">
                      <span className="supervisor-score-value">
                        {Math.round((dept.efficiency + dept.patientSatisfaction + dept.treatmentSuccess) / 3)}%
                      </span>
                      <span className={`supervisor-performance-badge supervisor-perf-${dept.staffPerformance > 90 ? 'excellent' : dept.staffPerformance > 80 ? 'good' : 'average'}`}>
                        {dept.staffPerformance > 90 ? 'Excellent' : dept.staffPerformance > 80 ? 'Good' : 'Average'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="supervisor-dept-cell">
                    <div className="supervisor-trend-indicator">
                      {dept.trend === 'up' ? (
                        <span className="supervisor-trend-up">↗</span>
                      ) : dept.trend === 'down' ? (
                        <span className="supervisor-trend-down">↘</span>
                      ) : (
                        <span className="supervisor-trend-stable">→</span>
                      )}
                      <span className={`supervisor-trend-text supervisor-trend-${dept.trend}`}>
                        {dept.trend === 'up' ? 'Improving' : dept.trend === 'down' ? 'Declining' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff Performance Grid */}
      <div className="supervisor-staff-performance-section">
        <div className="supervisor-section-header">
          <h3 className="supervisor-section-title">
            <span className="supervisor-section-icon">👨‍⚕️</span>
            Staff Performance
            <span className="supervisor-staff-count"> ({filteredStaff.length} staff)</span>
          </h3>
          <div className="supervisor-performance-actions">
            <button 
              className="supervisor-action-btn supervisor-btn-export"
              onClick={() => handleExportReport('staff')}
            >
              Export Staff Report
            </button>
            <button 
              className="supervisor-action-btn supervisor-btn-schedule"
              onClick={() => setShowPerformanceModal(true)}
            >
              Schedule Reviews
            </button>
          </div>
        </div>

        <div className="supervisor-staff-performance-grid">
          {filteredStaff.map((staff) => (
            <div 
              key={staff.id} 
              className="supervisor-staff-performance-card"
              onClick={() => setSelectedStaff(staff)}
            >
              <div className="supervisor-staff-performance-header">
                <div className="supervisor-staff-avatar">
                  {staff.name.charAt(0)}
                </div>
                <div className="supervisor-staff-info">
                  <h4 className="supervisor-staff-name">{staff.name}</h4>
                  <div className="supervisor-staff-details">
                    <span className="supervisor-staff-role">{staff.role}</span>
                    <span className="supervisor-staff-dept">{staff.department}</span>
                  </div>
                </div>
                <span className={`supervisor-performance-status supervisor-status-${staff.status}`}>
                  {staff.status.replace('_', ' ')}
                </span>
              </div>

              <div className="supervisor-performance-score">
                <div className="supervisor-score-main">
                  <span className="supervisor-score-label">Performance Score</span>
                  <span className="supervisor-score-value">{staff.performanceScore}</span>
                </div>
                <div className={`supervisor-score-trend supervisor-trend-${staff.trend}`}>
                  {staff.trend === 'up' ? '↗ Improving' : staff.trend === 'down' ? '↘ Declining' : '→ Stable'}
                </div>
              </div>

              <div className="supervisor-performance-metrics">
                <div className="supervisor-metric">
                  <span className="supervisor-metric-label">Efficiency</span>
                  <span className="supervisor-metric-value">{staff.efficiency}%</span>
                </div>
                <div className="supervisor-metric">
                  <span className="supervisor-metric-label">Quality</span>
                  <span className="supervisor-metric-value">{staff.qualityScore}%</span>
                </div>
                <div className="supervisor-metric">
                  <span className="supervisor-metric-label">Attendance</span>
                  <span className="supervisor-metric-value">{staff.attendance}%</span>
                </div>
              </div>

              <div className="supervisor-performance-footer">
                <span className="supervisor-last-review">
                  Last Review: {staff.lastReview}
                </span>
                <button 
                  className="supervisor-review-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePerformanceReview(staff.id);
                  }}
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Trends Chart */}
      <div className="supervisor-performance-trends-section">
        <div className="supervisor-section-header">
          <h3 className="supervisor-section-title">
            <span className="supervisor-section-icon">📊</span>
            Performance Trends
          </h3>
          <div className="supervisor-trend-legend">
            <div className="supervisor-legend-item">
              <span className="supervisor-legend-color supervisor-color-efficiency"></span>
              Efficiency
            </div>
            <div className="supervisor-legend-item">
              <span className="supervisor-legend-color supervisor-color-satisfaction"></span>
              Patient Satisfaction
            </div>
            <div className="supervisor-legend-item">
              <span className="supervisor-legend-color supervisor-color-success"></span>
              Treatment Success
            </div>
          </div>
        </div>

        <div className="supervisor-trends-chart-container">
          <div className="supervisor-trends-chart">
            {performanceData.metrics.map((metric, index) => (
              <div key={index} className="supervisor-trend-month">
                <div className="supervisor-month-label">{metric.month}</div>
                <div className="supervisor-month-bars">
                  <div 
                    className="supervisor-bar supervisor-bar-efficiency"
                    style={{ height: `${metric.efficiency}%` }}
                    title={`Efficiency: ${metric.efficiency}%`}
                  ></div>
                  <div 
                    className="supervisor-bar supervisor-bar-satisfaction"
                    style={{ height: `${metric.satisfaction}%` }}
                    title={`Satisfaction: ${metric.satisfaction}%`}
                  ></div>
                  <div 
                    className="supervisor-bar supervisor-bar-success"
                    style={{ height: `${metric.success}%` }}
                    title={`Success: ${metric.success}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Staff Details */}
      {selectedStaff && (
        <div className="supervisor-selected-staff-details">
          <div className="supervisor-staff-detail-header">
            <h3>
              <span className="supervisor-detail-icon">👤</span>
              {selectedStaff.name}'s Performance Details
            </h3>
            <button 
              className="supervisor-close-detail"
              onClick={() => setSelectedStaff(null)}
            >
              ×
            </button>
          </div>
          
          <div className="supervisor-staff-detail-content">
            <div className="supervisor-detail-metrics">
              <div className="supervisor-detail-metric">
                <span className="supervisor-detail-label">Overall Score</span>
                <span className="supervisor-detail-value">{selectedStaff.performanceScore}/100</span>
              </div>
              <div className="supervisor-detail-metric">
                <span className="supervisor-detail-label">Patient Satisfaction</span>
                <span className="supervisor-detail-value">{selectedStaff.patientSatisfaction}%</span>
              </div>
              <div className="supervisor-detail-metric">
                <span className="supervisor-detail-label">Quality Score</span>
                <span className="supervisor-detail-value">{selectedStaff.qualityScore}%</span>
              </div>
              <div className="supervisor-detail-metric">
                <span className="supervisor-detail-label">Attendance</span>
                <span className="supervisor-detail-value">{selectedStaff.attendance}%</span>
              </div>
            </div>
            
            <div className="supervisor-detail-actions">
              <button className="supervisor-detail-action-btn supervisor-btn-feedback">
                Provide Feedback
              </button>
              <button className="supervisor-detail-action-btn supervisor-btn-training">
                Recommend Training
              </button>
              <button className="supervisor-detail-action-btn supervisor-btn-recognize">
                Recognize Excellence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Performance Insights Modal */}
      {showPerformanceModal && (
        <div className="supervisor-modal-overlay">
          <div className="supervisor-performance-insights-modal">
            <div className="supervisor-modal-header">
              <h2>Performance Insights & Recommendations</h2>
              <button 
                className="supervisor-modal-close"
                onClick={() => setShowPerformanceModal(false)}
              >
                ×
              </button>
            </div>
            <div className="supervisor-modal-body">
              {/* Insights content */}
              <p>Performance insights and recommendations will appear here</p>
            </div>
            <div className="supervisor-modal-footer">
              <button 
                className="supervisor-modal-btn supervisor-btn-cancel"
                onClick={() => setShowPerformanceModal(false)}
              >
                Close
              </button>
              <button 
                className="supervisor-modal-btn supervisor-btn-apply"
                onClick={() => setShowPerformanceModal(false)}
              >
                Apply Recommendations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceManagement;