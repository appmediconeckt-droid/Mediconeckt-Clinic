import React, { useState, useEffect } from 'react';
import './LabReportsMenu.css';

const LabReportsMenu = () => {
  const [labReports, setLabReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Sample data - in a real app, this would come from an API
  const sampleLabReports = [
    {
      id: 'LR20231015001',
      patientName: 'John Doe',
      patientId: 'P12345',
      age: 42,
      gender: 'Male',
      testType: 'Complete Blood Count',
      reportType: 'Hematology',
      collectedDate: '2023-10-15',
      reportedDate: '2023-10-16',
      status: 'verified',
      priority: 'routine',
      technician: 'Dr. Sarah Wilson',
      reviewedBy: 'Dr. Michael Chen',
      parameters: [
        { name: 'Hemoglobin', value: '14.2 g/dL', normalRange: '13.5-17.5', flag: 'normal' },
        { name: 'WBC Count', value: '7.8 ×10³/μL', normalRange: '4.5-11.0', flag: 'normal' },
        { name: 'Platelets', value: '280 ×10³/μL', normalRange: '150-450', flag: 'normal' }
      ],
      findings: 'All parameters within normal limits.',
      recommendations: 'No further action required.',
      attachments: ['blood_smear.pdf', 'cbc_chart.png'],
      labLocation: 'Main Laboratory'
    },
    {
      id: 'LR20231014002',
      patientName: 'Jane Smith',
      patientId: 'P12346',
      age: 35,
      gender: 'Female',
      testType: 'Lipid Profile',
      reportType: 'Biochemistry',
      collectedDate: '2023-10-14',
      reportedDate: '2023-10-15',
      status: 'verified',
      priority: 'urgent',
      technician: 'Dr. Robert Kim',
      reviewedBy: 'Dr. Lisa Park',
      parameters: [
        { name: 'Total Cholesterol', value: '210 mg/dL', normalRange: '<200', flag: 'high' },
        { name: 'LDL Cholesterol', value: '145 mg/dL', normalRange: '<100', flag: 'high' },
        { name: 'HDL Cholesterol', value: '48 mg/dL', normalRange: '>40', flag: 'normal' },
        { name: 'Triglycerides', value: '180 mg/dL', normalRange: '<150', flag: 'high' }
      ],
      findings: 'Elevated total cholesterol, LDL cholesterol, and triglycerides.',
      recommendations: 'Diet modification and follow-up in 3 months recommended.',
      attachments: ['lipid_profile.pdf'],
      labLocation: 'Biochemistry Lab'
    },
    {
      id: 'LR20231013003',
      patientName: 'Robert Brown',
      patientId: 'P12347',
      age: 58,
      gender: 'Male',
      testType: 'Liver Function Test',
      reportType: 'Biochemistry',
      collectedDate: '2023-10-13',
      reportedDate: '2023-10-14',
      status: 'pending',
      priority: 'routine',
      technician: 'Dr. Amanda Lee',
      reviewedBy: '',
      parameters: [
        { name: 'ALT', value: '65 U/L', normalRange: '7-56', flag: 'high' },
        { name: 'AST', value: '48 U/L', normalRange: '5-40', flag: 'high' },
        { name: 'ALP', value: '110 U/L', normalRange: '44-147', flag: 'normal' },
        { name: 'Total Bilirubin', value: '1.2 mg/dL', normalRange: '0.1-1.2', flag: 'normal' }
      ],
      findings: 'Mild elevation of liver enzymes ALT and AST.',
      recommendations: 'Further evaluation needed. Consider ultrasound.',
      attachments: ['lft_report.pdf'],
      labLocation: 'Main Laboratory'
    },
    {
      id: 'LR20231015004',
      patientName: 'Alice Johnson',
      patientId: 'P12348',
      age: 29,
      gender: 'Female',
      testType: 'Thyroid Panel',
      reportType: 'Endocrinology',
      collectedDate: '2023-10-15',
      reportedDate: '2023-10-16',
      status: 'verified',
      priority: 'routine',
      technician: 'Dr. James Wilson',
      reviewedBy: 'Dr. Maria Garcia',
      parameters: [
        { name: 'TSH', value: '3.5 mIU/L', normalRange: '0.4-4.0', flag: 'normal' },
        { name: 'Free T4', value: '1.2 ng/dL', normalRange: '0.8-1.8', flag: 'normal' },
        { name: 'Free T3', value: '3.1 pg/mL', normalRange: '2.3-4.2', flag: 'normal' }
      ],
      findings: 'Thyroid function tests within normal range.',
      recommendations: 'No thyroid dysfunction detected.',
      attachments: ['thyroid_report.pdf'],
      labLocation: 'Endocrinology Lab'
    },
    {
      id: 'LR20231012005',
      patientName: 'Michael Wilson',
      patientId: 'P12349',
      age: 45,
      gender: 'Male',
      testType: 'Urine Culture',
      reportType: 'Microbiology',
      collectedDate: '2023-10-12',
      reportedDate: '2023-10-15',
      status: 'verified',
      priority: 'urgent',
      technician: 'Dr. Susan Taylor',
      reviewedBy: 'Dr. David Miller',
      parameters: [
        { name: 'Culture Result', value: 'E. coli > 100,000 CFU/mL', normalRange: 'No growth', flag: 'abnormal' },
        { name: 'Sensitivity', value: 'Sensitive to Ciprofloxacin', normalRange: '-', flag: 'info' }
      ],
      findings: 'Significant growth of E. coli indicating urinary tract infection.',
      recommendations: 'Antibiotic therapy recommended based on sensitivity.',
      attachments: ['culture_report.pdf', 'sensitivity_chart.png'],
      labLocation: 'Microbiology Lab'
    },
    {
      id: 'LR20231015006',
      patientName: 'Sarah Taylor',
      patientId: 'P12350',
      age: 52,
      gender: 'Female',
      testType: 'Blood Glucose & HbA1c',
      reportType: 'Diabetes Panel',
      collectedDate: '2023-10-15',
      reportedDate: '2023-10-16',
      status: 'draft',
      priority: 'routine',
      technician: 'Dr. Kevin Brown',
      reviewedBy: '',
      parameters: [
        { name: 'Fasting Glucose', value: '126 mg/dL', normalRange: '70-100', flag: 'high' },
        { name: 'HbA1c', value: '6.8%', normalRange: '<5.7%', flag: 'high' }
      ],
      findings: 'Elevated fasting glucose and HbA1c suggestive of diabetes.',
      recommendations: 'Confirm with repeat testing. Refer to endocrinologist.',
      attachments: ['glucose_report.pdf'],
      labLocation: 'Main Laboratory'
    },
    {
      id: 'LR20231014007',
      patientName: 'David Lee',
      patientId: 'P12351',
      age: 38,
      gender: 'Male',
      testType: 'Hemoglobin Electrophoresis',
      reportType: 'Hematology',
      collectedDate: '2023-10-14',
      reportedDate: '2023-10-16',
      status: 'verified',
      priority: 'routine',
      technician: 'Dr. Emily Clark',
      reviewedBy: 'Dr. Richard Wong',
      parameters: [
        { name: 'HbA', value: '96.5%', normalRange: '95-98%', flag: 'normal' },
        { name: 'HbA2', value: '2.8%', normalRange: '1.5-3.5%', flag: 'normal' },
        { name: 'HbF', value: '0.7%', normalRange: '<2%', flag: 'normal' }
      ],
      findings: 'Normal hemoglobin electrophoresis pattern.',
      recommendations: 'No hemoglobinopathy detected.',
      attachments: ['electrophoresis.pdf'],
      labLocation: 'Hematology Special Lab'
    },
    {
      id: 'LR20231013008',
      patientName: 'Emily Clark',
      patientId: 'P12352',
      age: 31,
      gender: 'Female',
      testType: 'Coagulation Profile',
      reportType: 'Hematology',
      collectedDate: '2023-10-13',
      reportedDate: '2023-10-14',
      status: 'cancelled',
      priority: 'routine',
      technician: 'Dr. Thomas Reed',
      reviewedBy: '',
      parameters: [],
      findings: 'Test cancelled - insufficient sample.',
      recommendations: 'Please recollect sample.',
      attachments: [],
      labLocation: 'Coagulation Lab'
    }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchLabReports = async () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setLabReports(sampleLabReports);
        setFilteredReports(sampleLabReports);
        setLoading(false);
      }, 1000);
    };

    fetchLabReports();
  }, []);

  // Filter lab reports based on selected filters and search
  useEffect(() => {
    let filtered = [...labReports];

    // Apply report type filter
    if (reportTypeFilter !== 'all') {
      filtered = filtered.filter(report => report.reportType === reportTypeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Apply date range filter
    if (dateRange.start) {
      filtered = filtered.filter(report => report.collectedDate >= dateRange.start);
    }
    if (dateRange.end) {
      filtered = filtered.filter(report => report.collectedDate <= dateRange.end);
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report => 
        report.patientName.toLowerCase().includes(query) ||
        report.patientId.toLowerCase().includes(query) ||
        report.testType.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query)
      );
    }

    setFilteredReports(filtered);
  }, [reportTypeFilter, statusFilter, dateRange, searchQuery, labReports]);

  const handleStatusChange = (reportId, newStatus) => {
    const updatedReports = labReports.map(report => {
      if (report.id === reportId) {
        return { ...report, status: newStatus };
      }
      return report;
    });
    
    setLabReports(updatedReports);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handlePrintReport = (reportId) => {
    alert(`Printing report ${reportId}`);
    // In real app, this would trigger print dialog
  };

  const handleExportReport = (reportId, format) => {
    alert(`Exporting report ${reportId} as ${format}`);
    // In real app, this would generate download
  };

  const handleAddNewReport = () => {
    const newReport = {
      id: `LR${new Date().getFullYear()}${String(labReports.length + 1).padStart(5, '0')}`,
      patientName: 'New Patient',
      patientId: `P${String(labReports.length + 1000)}`,
      age: 0,
      gender: 'Unknown',
      testType: 'New Test',
      reportType: 'Biochemistry',
      collectedDate: new Date().toISOString().split('T')[0],
      reportedDate: '',
      status: 'draft',
      priority: 'routine',
      technician: 'Technician Name',
      reviewedBy: '',
      parameters: [],
      findings: '',
      recommendations: '',
      attachments: [],
      labLocation: 'Main Laboratory'
    };
    
    setLabReports([newReport, ...labReports]);
    handleViewReport(newReport);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'verified': return 'lab-reports__status-badge--verified';
      case 'pending': return 'lab-reports__status-badge--pending';
      case 'draft': return 'lab-reports__status-badge--draft';
      case 'cancelled': return 'lab-reports__status-badge--cancelled';
      default: return 'lab-reports__status-badge--default';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'urgent': return 'lab-reports__priority-badge--urgent';
      case 'routine': return 'lab-reports__priority-badge--routine';
      case 'stat': return 'lab-reports__priority-badge--stat';
      default: return 'lab-reports__priority-badge--default';
    }
  };

  const getFlagClass = (flag) => {
    switch(flag) {
      case 'high': return 'lab-reports__parameter-flag--high';
      case 'low': return 'lab-reports__parameter-flag--low';
      case 'normal': return 'lab-reports__parameter-flag--normal';
      case 'abnormal': return 'lab-reports__parameter-flag--abnormal';
      case 'critical': return 'lab-reports__parameter-flag--critical';
      default: return 'lab-reports__parameter-flag--info';
    }
  };

  const getStatusCount = (status) => {
    return labReports.filter(report => report.status === status).length;
  };

  const getReportTypeCount = (type) => {
    return labReports.filter(report => report.reportType === type).length;
  };

  const handleExportAll = (format) => {
    alert(`Exporting all ${filteredReports.length} reports as ${format}`);
  };

  return (
    <div className="lab-reports-container technician-theme">
      <header className="lab-reports__header technician-header">
        <div className="lab-reports__header-content technician-header-content">
          <h1 className="lab-reports__title technician-title">AAB Technician - Laboratory Reports</h1>
          <p className="lab-reports__subtitle technician-subtitle">Manage, view, and process laboratory test reports</p>
        </div>
        <div className="lab-reports__header-actions technician-header-actions">
          <button className="lab-reports__header-btn technician-header-btn technician-header-btn--export">
            Export All as PDF
          </button>
          <button className="lab-reports__header-btn technician-header-btn technician-header-btn--print">
            Quick Print
          </button>
        </div>
      </header>

      <div className="lab-reports__dashboard technician-dashboard">
        <div className="lab-reports__stats-grid technician-stats-grid">
          <div className="lab-reports__stat-card technician-stat-card technician-stat-card--total">
            <div className="lab-reports__stat-icon technician-stat-icon">📊</div>
            <div className="lab-reports__stat-info technician-stat-info">
              <h3>Total Reports</h3>
              <p className="lab-reports__stat-number technician-stat-number">{labReports.length}</p>
            </div>
          </div>
          
          <div className="lab-reports__stat-card technician-stat-card technician-stat-card--total">
            <div className="lab-reports__stat-icon technician-stat-icon">✅</div>
            <div className="lab-reports__stat-info technician-stat-info">
              <h3>Verified</h3>
              <p className="lab-reports__stat-number technician-stat-number">{getStatusCount('verified')}</p>
            </div>
          </div>
          
          <div className="lab-reports__stat-card technician-stat-card technician-stat-card--pending">
            <div className="lab-reports__stat-icon technician-stat-icon">⏳</div>
            <div className="lab-reports__stat-info technician-stat-info">
              <h3>Pending Review</h3>
              <p className="lab-reports__stat-number technician-stat-number">{getStatusCount('pending') + getStatusCount('draft')}</p>
            </div>
          </div>
          
          <div className="lab-reports__stat-card technician-stat-card technician-stat-card--total">
            <div className="lab-reports__stat-icon technician-stat-icon">🔬</div>
            <div className="lab-reports__stat-info technician-stat-info">
              <h3>Report Types</h3>
              <p className="lab-reports__stat-number technician-stat-number">{new Set(labReports.map(r => r.reportType)).size}</p>
            </div>
          </div>
        </div>

        <div className="lab-reports__controls-section technician-controls-section">
          <div className="lab-reports__search-filters technician-search-filters">
            <div className="lab-reports__search-box technician-search-box">
              <input
                type="text"
                className="lab-reports__search-input technician-search-input"
                placeholder="Search by patient name, ID, or test type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="lab-reports__search-icon technician-search-icon">🔍</span>
            </div>

            <div className="lab-reports__filter-group technician-filter-group">
              <label className="lab-reports__filter-label technician-filter-label">Report Type:</label>
              <select 
                className="lab-reports__filter-select technician-filter-select"
                value={reportTypeFilter}
                onChange={(e) => setReportTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Hematology">Hematology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Diabetes Panel">Diabetes Panel</option>
              </select>
            </div>

            <div className="lab-reports__filter-group technician-filter-group">
              <label className="lab-reports__filter-label technician-filter-label">Status:</label>
              <select 
                className="lab-reports__filter-select technician-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="lab-reports__filter-group technician-filter-group">
              <label className="lab-reports__filter-label technician-filter-label">Date Range:</label>
              <div className="lab-reports__date-range technician-date-range">
                <input
                  type="date"
                  className="lab-reports__date-input technician-date-input"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                <span className="lab-reports__date-separator technician-date-separator">to</span>
                <input
                  type="date"
                  className="lab-reports__date-input technician-date-input"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="lab-reports__action-buttons technician-action-buttons">
            <button 
              className="lab-reports__action-btn technician-action-btn technician-action-btn--primary"
              onClick={handleAddNewReport}
            >
              <span className="lab-reports__btn-icon technician-btn-icon">+</span>
              New Report
            </button>
            <button 
              className="lab-reports__action-btn technician-action-btn technician-action-btn--secondary"
              onClick={() => handleExportAll('PDF')}
            >
              <span className="lab-reports__btn-icon technician-btn-icon">📥</span>
              Export
            </button>
            <button 
              className="lab-reports__action-btn technician-action-btn technician-action-btn--tertiary"
              onClick={() => {
                setReportTypeFilter('all');
                setStatusFilter('all');
                setDateRange({ start: '', end: '' });
                setSearchQuery('');
              }}
            >
              <span className="lab-reports__btn-icon technician-btn-icon">🔄</span>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="lab-reports__main-content technician-main-content">
        {loading ? (
          <div className="lab-reports__loading-state technician-loading-state">
            <div className="lab-reports__loading-spinner technician-loading-spinner"></div>
            <p className="lab-reports__loading-text technician-loading-text">Loading laboratory reports...</p>
          </div>
        ) : (
          <>
            <div className="lab-reports__results-header technician-results-header">
              <h2 className="lab-reports__results-title technician-results-title">
                Laboratory Reports <span className="lab-reports__results-count technician-results-count">({filteredReports.length})</span>
              </h2>
              <div className="lab-reports__view-options technician-view-options">
                <button className="lab-reports__view-btn technician-view-btn technician-view-btn--active">
                  <span className="lab-reports__view-icon technician-view-icon">📋</span>
                  List View
                </button>
                <button className="lab-reports__view-btn technician-view-btn">
                  <span className="lab-reports__view-icon technician-view-icon">📊</span>
                  Summary View
                </button>
              </div>
            </div>

            {filteredReports.length === 0 ? (
              <div className="lab-reports__empty-state technician-empty-state">
                <div className="lab-reports__empty-icon technician-empty-icon">📄</div>
                <h3 className="lab-reports__empty-title technician-empty-title">No Reports Found</h3>
                <p className="lab-reports__empty-text technician-empty-text">Try adjusting your filters or search criteria.</p>
              </div>
            ) : (
              <div className="lab-reports__reports-grid technician-reports-grid">
                {filteredReports.map(report => (
                  <div key={report.id} className="lab-reports__report-card technician-report-card">
                    <div className="lab-reports__report-header technician-report-header">
                      <div className="lab-reports__report-id technician-report-id">{report.id}</div>
                      <div className="lab-reports__report-status technician-report-status">
                        <span className={`lab-reports__status-badge ${getStatusBadgeClass(report.status)} technician-status-badge technician-status-badge--${report.status}`}>
                          {report.status}
                        </span>
                        <span className={`lab-reports__priority-badge ${getPriorityBadgeClass(report.priority)} technician-priority-badge technician-priority-badge--${report.priority}`}>
                          {report.priority}
                        </span>
                      </div>
                    </div>

                    <div className="lab-reports__patient-info technician-patient-info">
                      <h3 className="lab-reports__patient-name technician-patient-name">{report.patientName}</h3>
                      <div className="lab-reports__patient-details technician-patient-details">
                        <span className="lab-reports__patient-id technician-patient-id">ID: {report.patientId}</span>
                        <span className="lab-reports__patient-age-gender technician-patient-age-gender">{report.age} yrs, {report.gender}</span>
                      </div>
                    </div>

                    <div className="lab-reports__test-info technician-test-info">
                      <h4 className="lab-reports__test-type technician-test-type">{report.testType}</h4>
                      <div className="lab-reports__test-details technician-test-details">
                        <span className="lab-reports__test-category technician-test-category">{report.reportType}</span>
                        <span className="lab-reports__lab-location technician-lab-location">{report.labLocation}</span>
                      </div>
                    </div>

                    <div className="lab-reports__dates-section technician-dates-section">
                      <div className="lab-reports__date-item technician-date-item">
                        <span className="lab-reports__date-label technician-date-label">Collected:</span>
                        <span className="lab-reports__date-value technician-date-value">{report.collectedDate}</span>
                      </div>
                      <div className="lab-reports__date-item technician-date-item">
                        <span className="lab-reports__date-label technician-date-label">Reported:</span>
                        <span className="lab-reports__date-value technician-date-value">{report.reportedDate || 'Pending'}</span>
                      </div>
                    </div>

                    <div className="lab-reports__parameters-preview technician-parameters-preview">
                      {report.parameters.slice(0, 3).map((param, index) => (
                        <div key={index} className="lab-reports__parameter-item technician-parameter-item">
                          <span className="lab-reports__parameter-name technician-parameter-name">{param.name}:</span>
                          <span className={`lab-reports__parameter-value ${getFlagClass(param.flag)} technician-parameter-value technician-parameter-flag--${param.flag}`}>
                            {param.value}
                          </span>
                        </div>
                      ))}
                      {report.parameters.length > 3 && (
                        <div className="lab-reports__more-params technician-more-params">
                          +{report.parameters.length - 3} more parameters
                        </div>
                      )}
                    </div>

                    <div className="lab-reports__attachments-section technician-attachments-section">
                      {report.attachments.length > 0 ? (
                        <div className="lab-reports__attachments-list technician-attachments-list">
                          <span className="lab-reports__attachments-icon technician-attachments-icon">📎</span>
                          <span className="lab-reports__attachments-count technician-attachments-count">
                            {report.attachments.length} attachment{report.attachments.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      ) : (
                        <div className="lab-reports__no-attachments technician-no-attachments">No attachments</div>
                      )}
                    </div>

                    <div className="lab-reports__report-footer technician-report-footer">
                      <div className="lab-reports__technician-info technician-technician-info">
                        <span className="lab-reports__technician-label technician-technician-label">Technician:</span>
                        <span className="lab-reports__technician-name technician-technician-name">{report.technician}</span>
                      </div>
                      
                      <div className="lab-reports__action-buttons-sm technician-action-buttons-sm">
                        <button 
                          className="lab-reports__action-btn-sm technician-action-btn-sm technician-action-btn-sm--view"
                          onClick={() => handleViewReport(report)}
                        >
                          View Full Report
                        </button>
                        <select 
                          className="lab-reports__status-select-sm technician-status-select-sm"
                          value={report.status}
                          onChange={(e) => handleStatusChange(report.id, e.target.value)}
                        >
                          <option value="draft">Draft</option>
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Report Detail Modal */}
      {showReportModal && selectedReport && (
        <div className="lab-reports__modal-overlay technician-modal-overlay">
          <div className="lab-reports__modal technician-modal">
            <div className="lab-reports__modal-header technician-modal-header">
              <h2 className="lab-reports__modal-title technician-modal-title">Laboratory Report Details</h2>
              <button 
                className="lab-reports__modal-close technician-modal-close"
                onClick={() => setShowReportModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="lab-reports__modal-content technician-modal-content">
              <div className="lab-reports__modal-section technician-modal-section">
                <h3 className="lab-reports__modal-section-title technician-modal-section-title">Patient Information</h3>
                <div className="lab-reports__modal-patient-info technician-modal-patient-info">
                  <div className="lab-reports__modal-patient-detail technician-modal-patient-detail">
                    <span className="lab-reports__modal-detail-label technician-modal-detail-label">Name:</span>
                    <span className="lab-reports__modal-detail-value technician-modal-detail-value">{selectedReport.patientName}</span>
                  </div>
                  <div className="lab-reports__modal-patient-detail technician-modal-patient-detail">
                    <span className="lab-reports__modal-detail-label technician-modal-detail-label">Patient ID:</span>
                    <span className="lab-reports__modal-detail-value technician-modal-detail-value">{selectedReport.patientId}</span>
                  </div>
                  <div className="lab-reports__modal-patient-detail technician-modal-patient-detail">
                    <span className="lab-reports__modal-detail-label technician-modal-detail-label">Age/Gender:</span>
                    <span className="lab-reports__modal-detail-value technician-modal-detail-value">{selectedReport.age} years, {selectedReport.gender}</span>
                  </div>
                </div>
              </div>

              <div className="lab-reports__modal-section technician-modal-section">
                <h3 className="lab-reports__modal-section-title technician-modal-section-title">Test Information</h3>
                <div className="lab-reports__modal-test-info technician-modal-test-info">
                  <div className="lab-reports__modal-test-detail technician-modal-test-detail">
                    <span className="lab-reports__modal-detail-label technician-modal-detail-label">Test Type:</span>
                    <span className="lab-reports__modal-detail-value technician-modal-detail-value">{selectedReport.testType}</span>
                  </div>
                  <div className="lab-reports__modal-test-detail technician-modal-test-detail">
                    <span className="lab-reports__modal-detail-label technician-modal-detail-label">Report Type:</span>
                    <span className="lab-reports__modal-detail-value technician-modal-detail-value">{selectedReport.reportType}</span>
                  </div>
                  <div className="lab-reports__modal-test-detail technician-modal-test-detail">
                    <span className="lab-reports__modal-detail-label technician-modal-detail-label">Lab Location:</span>
                    <span className="lab-reports__modal-detail-value technician-modal-detail-value">{selectedReport.labLocation}</span>
                  </div>
                </div>
              </div>

              <div className="lab-reports__modal-section technician-modal-section">
                <h3 className="lab-reports__modal-section-title technician-modal-section-title">Test Parameters</h3>
                <div className="lab-reports__modal-parameters technician-modal-parameters">
                  <table className="lab-reports__modal-table technician-modal-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Result</th>
                        <th>Normal Range</th>
                        <th>Flag</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.parameters.map((param, index) => (
                        <tr key={index}>
                          <td>{param.name}</td>
                          <td className={`lab-reports__modal-param-value ${getFlagClass(param.flag)} technician-modal-param-value technician-parameter-flag--${param.flag}`}>
                            {param.value}
                          </td>
                          <td>{param.normalRange}</td>
                          <td>
                            <span className={`lab-reports__modal-flag ${getFlagClass(param.flag)} technician-modal-flag technician-parameter-flag--${param.flag}`}>
                              {param.flag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lab-reports__modal-section technician-modal-section">
                <h3 className="lab-reports__modal-section-title technician-modal-section-title">Findings & Recommendations</h3>
                <div className="lab-reports__modal-findings technician-modal-findings">
                  <div className="lab-reports__modal-findings-item technician-modal-findings-item">
                    <h4>Findings:</h4>
                    <p>{selectedReport.findings}</p>
                  </div>
                  <div className="lab-reports__modal-findings-item technician-modal-findings-item">
                    <h4>Recommendations:</h4>
                    <p>{selectedReport.recommendations}</p>
                  </div>
                </div>
              </div>

              <div className="lab-reports__modal-section technician-modal-section">
                <h3 className="lab-reports__modal-section-title technician-modal-section-title">Attachments</h3>
                <div className="lab-reports__modal-attachments technician-modal-attachments">
                  {selectedReport.attachments.length > 0 ? (
                    selectedReport.attachments.map((attachment, index) => (
                      <div key={index} className="lab-reports__modal-attachment technician-modal-attachment">
                        <span className="lab-reports__modal-attachment-icon technician-modal-attachment-icon">📎</span>
                        <span className="lab-reports__modal-attachment-name technician-modal-attachment-name">{attachment}</span>
                        <button className="lab-reports__modal-attachment-btn technician-modal-attachment-btn">Download</button>
                      </div>
                    ))
                  ) : (
                    <p className="lab-reports__modal-no-attachments technician-modal-no-attachments">No attachments available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="lab-reports__modal-footer technician-modal-footer">
              <button 
                className="lab-reports__modal-btn technician-modal-btn technician-modal-btn--secondary"
                onClick={() => setShowReportModal(false)}
              >
                Close
              </button>
              <button 
                className="lab-reports__modal-btn technician-modal-btn technician-modal-btn--primary"
                onClick={() => handlePrintReport(selectedReport.id)}
              >
                Print Report
              </button>
              <button 
                className="lab-reports__modal-btn technician-modal-btn technician-modal-btn--success"
                onClick={() => handleExportReport(selectedReport.id, 'PDF')}
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="lab-reports__footer technician-footer">
        <div className="lab-reports__footer-content technician-footer-content">
          <p className="lab-reports__footer-text technician-footer-text">
            AAB Technician Portal • Laboratory Reports Management System • Version 2.1.4
          </p>
          <p className="lab-reports__footer-copyright technician-footer-copyright">
            © {new Date().getFullYear()} AAB Medical Laboratory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LabReportsMenu;