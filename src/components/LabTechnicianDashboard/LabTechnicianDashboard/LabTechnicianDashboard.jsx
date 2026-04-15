import React, { useState, useEffect } from 'react';
import './LabTechnicianDashboard.css';

const LabTechnicianDashboard = () => {
  // State for different sections
  const [activeTab, setActiveTab] = useState('pendingTests');
  const [pendingTests, setPendingTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [equipmentStatus, setEquipmentStatus] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [stats, setStats] = useState({
    totalPending: 0,
    totalCompleted: 0,
    todayTests: 0,
    criticalResults: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showTestModal, setShowTestModal] = useState(false);
  const [newTestData, setNewTestData] = useState({
    patientName: '',
    patientId: '',
    testType: '',
    sampleType: 'Blood',
    priority: 'Medium'
  });

  // Sample data initialization
  useEffect(() => {
    // Mock data for pending tests
    const mockPendingTests = [
      { 
        id: 'LT001', 
        patientId: 'P1001', 
        patientName: 'Rahul Sharma', 
        testType: 'CBC', 
        requestedBy: 'Dr. Verma', 
        priority: 'High', 
        timeReceived: '09:30 AM',
        status: 'Pending',
        department: 'Hematology',
        sampleType: 'Blood',
        assignedTo: 'Self',
        notes: ''
      },
      { 
        id: 'LT002', 
        patientId: 'P1002', 
        patientName: 'Priya Patel', 
        testType: 'Lipid Profile', 
        requestedBy: 'Dr. Gupta', 
        priority: 'Medium', 
        timeReceived: '10:15 AM',
        status: 'In Progress',
        department: 'Biochemistry',
        sampleType: 'Blood',
        assignedTo: 'Self',
        notes: 'Fasting sample'
      },
      { 
        id: 'LT003', 
        patientId: 'P1003', 
        patientName: 'Amit Kumar', 
        testType: 'Urine R/E', 
        requestedBy: 'Dr. Singh', 
        priority: 'Low', 
        timeReceived: '11:00 AM',
        status: 'Pending',
        department: 'Microbiology',
        sampleType: 'Urine',
        assignedTo: 'Tech. Arjun',
        notes: ''
      },
      { 
        id: 'LT004', 
        patientId: 'P1004', 
        patientName: 'Sneha Reddy', 
        testType: 'Blood Culture', 
        requestedBy: 'Dr. Reddy', 
        priority: 'High', 
        timeReceived: '11:45 AM',
        status: 'Pending',
        department: 'Microbiology',
        sampleType: 'Blood',
        assignedTo: 'Self',
        notes: 'Critical case'
      },
      { 
        id: 'LT005', 
        patientId: 'P1005', 
        patientName: 'Vikram Joshi', 
        testType: 'Liver Function', 
        requestedBy: 'Dr. Kapoor', 
        priority: 'Medium', 
        timeReceived: '12:30 PM',
        status: 'Pending',
        department: 'Biochemistry',
        sampleType: 'Blood',
        assignedTo: 'Tech. Meera',
        notes: ''
      },
      { 
        id: 'LT006', 
        patientId: 'P1006', 
        patientName: 'Anjali Desai', 
        testType: 'Thyroid Panel', 
        requestedBy: 'Dr. Mehta', 
        priority: 'High', 
        timeReceived: '01:15 PM',
        status: 'Pending',
        department: 'Hormonology',
        sampleType: 'Blood',
        assignedTo: 'Self',
        notes: 'Follow up required'
      }
    ];

    // Mock completed tests
    const mockCompletedTests = [
      { 
        id: 'LT101', 
        patientId: 'P0901', 
        patientName: 'Ravi Malhotra', 
        testType: 'Glucose Fasting', 
        result: '98 mg/dL', 
        status: 'Normal', 
        completedBy: 'Self',
        completionTime: 'Yesterday, 4:30 PM',
        verifiedBy: 'Dr. Sharma',
        notes: 'Within normal range'
      },
      { 
        id: 'LT102', 
        patientId: 'P0902', 
        patientName: 'Kavita Singh', 
        testType: 'HbA1c', 
        result: '6.2%', 
        status: 'Borderline', 
        completedBy: 'Tech. Arjun',
        completionTime: 'Today, 9:00 AM',
        verifiedBy: 'Dr. Gupta',
        notes: 'Pre-diabetic range'
      },
      { 
        id: 'LT103', 
        patientId: 'P0903', 
        patientName: 'Sanjay Verma', 
        testType: 'Creatinine', 
        result: '1.4 mg/dL', 
        status: 'High', 
        completedBy: 'Self',
        completionTime: 'Today, 10:30 AM',
        verifiedBy: 'Dr. Reddy',
        notes: 'Elevated, needs follow-up'
      }
    ];

    // Mock critical alerts
    const mockCriticalAlerts = [
      { 
        id: 'CA001', 
        patientId: 'P0801', 
        patientName: 'Manoj Tiwari', 
        testType: 'Troponin I', 
        result: '0.5 ng/mL', 
        severity: 'Critical',
        notifiedTo: 'Dr. Kapoor',
        notificationTime: '10:45 AM',
        actionRequired: 'Immediate',
        acknowledged: false
      },
      { 
        id: 'CA002', 
        patientId: 'P0802', 
        patientName: 'Geeta Nair', 
        testType: 'Potassium', 
        result: '6.2 mEq/L', 
        severity: 'High',
        notifiedTo: 'Dr. Singh',
        notificationTime: '11:20 AM',
        actionRequired: 'Urgent',
        acknowledged: true
      }
    ];

    // Mock equipment status
    const mockEquipment = [
      { 
        id: 'EQ001', 
        name: 'Hematology Analyzer', 
        status: 'Operational', 
        lastCalibration: '2024-01-15',
        nextCalibration: '2024-02-15',
        utilization: '85%',
        lastMaintenance: '2024-01-10'
      },
      { 
        id: 'EQ002', 
        name: 'Chemistry Analyzer', 
        status: 'Maintenance', 
        lastCalibration: '2024-01-10',
        nextCalibration: '2024-02-10',
        utilization: '92%',
        lastMaintenance: '2024-01-25'
      },
      { 
        id: 'EQ003', 
        name: 'Microscope', 
        status: 'Operational', 
        lastCalibration: '2024-01-20',
        nextCalibration: '2024-02-20',
        utilization: '65%',
        lastMaintenance: '2024-01-15'
      },
      { 
        id: 'EQ004', 
        name: 'Centrifuge', 
        status: 'Operational', 
        lastCalibration: '2024-01-18',
        nextCalibration: '2024-02-18',
        utilization: '78%',
        lastMaintenance: '2024-01-12'
      }
    ];

    setPendingTests(mockPendingTests);
    setCompletedTests(mockCompletedTests);
    setCriticalAlerts(mockCriticalAlerts);
    setEquipmentStatus(mockEquipment);
    
    // Calculate stats
    setStats({
      totalPending: mockPendingTests.length,
      totalCompleted: mockCompletedTests.length,
      todayTests: 8,
      criticalResults: mockCriticalAlerts.filter(alert => !alert.acknowledged).length
    });
  }, []);

  // Filter tests based on search
  const filteredPendingTests = pendingTests.filter(test =>
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedTests = completedTests.filter(test =>
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle test assignment
  const handleAssignTest = (testId, assignTo) => {
    setPendingTests(prevTests =>
      prevTests.map(test =>
        test.id === testId ? { ...test, assignedTo: assignTo } : test
      )
    );
  };

  // Handle test status update
  const handleUpdateStatus = (testId, newStatus) => {
    if (newStatus === 'Completed') {
      const testToComplete = pendingTests.find(test => test.id === testId);
      if (testToComplete) {
        const completedTest = {
          ...testToComplete,
          status: 'Completed',
          result: 'Pending Review',
          completedBy: 'Self',
          completionTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          verifiedBy: 'Pending',
          completionDate: new Date().toLocaleDateString()
        };
        
        setPendingTests(prevTests => prevTests.filter(test => test.id !== testId));
        setCompletedTests(prevTests => [completedTest, ...prevTests]);
        
        // Update stats
        setStats(prevStats => ({
          ...prevStats,
          totalPending: prevStats.totalPending - 1,
          totalCompleted: prevStats.totalCompleted + 1,
          todayTests: prevStats.todayTests + 1
        }));
      }
    } else {
      setPendingTests(prevTests =>
        prevTests.map(test =>
          test.id === testId ? { ...test, status: newStatus } : test
        )
      );
    }
  };

  // Handle adding test result
  const handleAddResult = (testId, result) => {
    setCompletedTests(prevTests =>
      prevTests.map(test =>
        test.id === testId 
          ? { 
              ...test, 
              result: result, 
              status: result.includes('High') || result.includes('Low') ? 'Abnormal' : 'Normal',
              verifiedBy: result ? 'Dr. Sharma' : 'Pending'
            }
          : test
      )
    );
  };

  // Handle delete test
  const handleDeleteTest = (testId, isPending) => {
    if (isPending) {
      setPendingTests(prevTests => prevTests.filter(test => test.id !== testId));
      setStats(prevStats => ({
        ...prevStats,
        totalPending: prevStats.totalPending - 1
      }));
    } else {
      setCompletedTests(prevTests => prevTests.filter(test => test.id !== testId));
      setStats(prevStats => ({
        ...prevStats,
        totalCompleted: prevStats.totalCompleted - 1,
        todayTests: prevStats.todayTests - 1
      }));
    }
  };

  // Handle view test details
  const handleViewTest = (test, isPending) => {
    setSelectedTest({ ...test, isPending });
  };

  // Handle acknowledge alert
  const handleAcknowledgeAlert = (alertId) => {
    setCriticalAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
    setStats(prevStats => ({
      ...prevStats,
      criticalResults: prevStats.criticalResults - 1
    }));
  };

  // Handle follow up alert
  const handleFollowUpAlert = (alertId) => {
    const alert = criticalAlerts.find(a => a.id === alertId);
    if (alert) {
      alert(`Following up with ${alert.notifiedTo} regarding ${alert.patientName}'s ${alert.testType} result: ${alert.result}`);
    }
  };

  // Handle calibrate equipment
  const handleCalibrateEquipment = (equipmentId) => {
    setEquipmentStatus(prevEquipment =>
      prevEquipment.map(eq =>
        eq.id === equipmentId 
          ? { 
              ...eq, 
              status: 'Calibrating',
              lastCalibration: new Date().toISOString().split('T')[0]
            } 
          : eq
      )
    );
    
    setTimeout(() => {
      setEquipmentStatus(prevEquipment =>
        prevEquipment.map(eq =>
          eq.id === equipmentId 
            ? { ...eq, status: 'Operational' } 
            : eq
        )
      );
    }, 2000);
  };

  // Handle new test entry
  const handleNewTestEntry = () => {
    if (!newTestData.patientName || !newTestData.testType) {
      alert('Please fill all required fields');
      return;
    }

    const newTest = {
      id: `LT${String(pendingTests.length + 101).padStart(3, '0')}`,
      patientId: newTestData.patientId || `P${String(pendingTests.length + 1101).padStart(3, '0')}`,
      patientName: newTestData.patientName,
      testType: newTestData.testType,
      requestedBy: 'Dr. Self',
      priority: newTestData.priority,
      timeReceived: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'Pending',
      department: getDepartment(newTestData.testType),
      sampleType: newTestData.sampleType,
      assignedTo: 'Self',
      notes: ''
    };

    setPendingTests(prevTests => [newTest, ...prevTests]);
    setStats(prevStats => ({
      ...prevStats,
      totalPending: prevStats.totalPending + 1
    }));
    setShowTestModal(false);
    setNewTestData({
      patientName: '',
      patientId: '',
      testType: '',
      sampleType: 'Blood',
      priority: 'Medium'
    });
  };

  const getDepartment = (testType) => {
    if (['CBC', 'Hemoglobin', 'Platelet Count'].includes(testType)) return 'Hematology';
    if (['Lipid Profile', 'Liver Function', 'Glucose'].includes(testType)) return 'Biochemistry';
    if (['Urine R/E', 'Blood Culture'].includes(testType)) return 'Microbiology';
    return 'General';
  };

  // Handle print test
  const handlePrintTest = (test) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Test Report - ${test.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .result { text-align: center; font-size: 24px; font-weight: bold; margin: 30px 0; }
            .footer { margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>APOLLO HOSPITAL LABORATORY</h1>
            <h2>TEST REPORT</h2>
            <p>Report ID: ${test.id}</p>
          </div>
          <div class="details">
            <div class="row">
              <span><strong>Patient Name:</strong> ${test.patientName}</span>
              <span><strong>Patient ID:</strong> ${test.patientId}</span>
            </div>
            <div class="row">
              <span><strong>Test Type:</strong> ${test.testType}</span>
              <span><strong>Sample Type:</strong> ${test.sampleType}</span>
            </div>
            <div class="row">
              <span><strong>Requested By:</strong> ${test.requestedBy}</span>
              <span><strong>Completed On:</strong> ${test.completionTime || new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div class="result">
            <h3>RESULT</h3>
            <p>${test.result || 'Pending'}</p>
            <p><strong>Status:</strong> ${test.status}</p>
          </div>
          <div class="footer">
            <div class="row">
              <span><strong>Completed By:</strong> ${test.completedBy || 'Self'}</span>
              <span><strong>Verified By:</strong> ${test.verifiedBy || 'Pending'}</span>
            </div>
            <p style="text-align: center; margin-top: 30px;">
              ** This is a system generated report **
            </p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Handle download test
  const handleDownloadTest = (test) => {
    const content = `
APOLLO HOSPITAL LABORATORY
===========================
TEST REPORT

Report ID: ${test.id}
Patient Name: ${test.patientName}
Patient ID: ${test.patientId}
Test Type: ${test.testType}
Sample Type: ${test.sampleType}
Department: ${test.department}
Requested By: ${test.requestedBy}
Priority: ${test.priority}
Status: ${test.status}
Result: ${test.result || 'N/A'}
Completed By: ${test.completedBy || 'N/A'}
Verified By: ${test.verifiedBy || 'N/A'}
Completion Time: ${test.completionTime || 'N/A'}
Notes: ${test.notes || 'N/A'}

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Test_Report_${test.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle share test
  const handleShareTest = (test) => {
    const shareText = `Test Report for ${test.patientName} - ${test.testType}: ${test.result || 'Pending'}`;
    if (navigator.share) {
      navigator.share({
        title: `Test Report - ${test.id}`,
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Test information copied to clipboard!');
    }
  };

  // Handle process sample
  const handleProcessSample = () => {
    alert('Opening sample processing module...');
    // In real app, this would navigate to sample processing page
  };

  // Handle view reports
  const handleViewReports = () => {
    setActiveTab('testResults');
  };

  // Handle equipment check
  const handleEquipmentCheck = () => {
    alert('Opening equipment management console...');
    // In real app, this would open equipment management
  };

  // Handle refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // Handle settings
  const handleSettings = () => {
    alert('Opening settings...');
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
      // In real app, this would clear auth and redirect
    }
  };

  // Handle edit test notes
  const handleEditNotes = (testId, isPending) => {
    const testList = isPending ? pendingTests : completedTests;
    const test = testList.find(t => t.id === testId);
    const newNotes = prompt('Enter notes:', test.notes || '');
    if (newNotes !== null) {
      if (isPending) {
        setPendingTests(prevTests =>
          prevTests.map(t =>
            t.id === testId ? { ...t, notes: newNotes } : t
          )
        );
      } else {
        setCompletedTests(prevTests =>
          prevTests.map(t =>
            t.id === testId ? { ...t, notes: newNotes } : t
          )
        );
      }
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-inprogress';
      case 'Completed': return 'status-completed';
      case 'Critical': return 'status-critical';
      case 'Normal': return 'status-normal';
      case 'High': return 'status-abnormal';
      case 'Abnormal': return 'status-abnormal';
      case 'Borderline': return 'status-borderline';
      default: return '';
    }
  };

  // Get equipment status color
  const getEquipmentStatusColor = (status) => {
    switch(status) {
      case 'Operational': return 'equipment-operational';
      case 'Maintenance': return 'equipment-maintenance';
      case 'Calibrating': return 'equipment-calibrating';
      case 'Down': return 'equipment-down';
      default: return '';
    }
  };

  return (
    <div className="lab-technician-dashboard-container">
      {/* Test Details Modal */}
      {selectedTest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Test Details - {selectedTest.id}</h3>
              <button className="modal-close" onClick={() => setSelectedTest(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Patient Name:</span>
                <span className="detail-value">{selectedTest.patientName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Patient ID:</span>
                <span className="detail-value">{selectedTest.patientId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Test Type:</span>
                <span className="detail-value">{selectedTest.testType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sample Type:</span>
                <span className="detail-value">{selectedTest.sampleType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{selectedTest.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-badge ${getStatusColor(selectedTest.status)}`}>
                  {selectedTest.status}
                </span>
              </div>
              {selectedTest.result && (
                <div className="detail-row">
                  <span className="detail-label">Result:</span>
                  <span className="detail-value">{selectedTest.result}</span>
                </div>
              )}
              {selectedTest.notes && (
                <div className="detail-row">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{selectedTest.notes}</span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedTest(null)}>
                Close
              </button>
              {selectedTest.isPending && (
                <button 
                  className="btn-primary"
                  onClick={() => {
                    handleUpdateStatus(selectedTest.id, 'In Progress');
                    setSelectedTest(null);
                  }}
                >
                  Start Test
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Test Modal */}
      {showTestModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>New Test Entry</h3>
              <button className="modal-close" onClick={() => setShowTestModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Patient Name *</label>
                <input 
                  type="text" 
                  value={newTestData.patientName}
                  onChange={(e) => setNewTestData({...newTestData, patientName: e.target.value})}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="form-group">
                <label>Patient ID</label>
                <input 
                  type="text" 
                  value={newTestData.patientId}
                  onChange={(e) => setNewTestData({...newTestData, patientId: e.target.value})}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div className="form-group">
                <label>Test Type *</label>
                <select 
                  value={newTestData.testType}
                  onChange={(e) => setNewTestData({...newTestData, testType: e.target.value})}
                >
                  <option value="">Select test type</option>
                  <option value="CBC">CBC</option>
                  <option value="Lipid Profile">Lipid Profile</option>
                  <option value="Liver Function">Liver Function</option>
                  <option value="Urine R/E">Urine R/E</option>
                  <option value="Blood Culture">Blood Culture</option>
                  <option value="Thyroid Panel">Thyroid Panel</option>
                  <option value="Glucose Fasting">Glucose Fasting</option>
                  <option value="HbA1c">HbA1c</option>
                  <option value="Creatinine">Creatinine</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sample Type</label>
                <select 
                  value={newTestData.sampleType}
                  onChange={(e) => setNewTestData({...newTestData, sampleType: e.target.value})}
                >
                  <option value="Blood">Blood</option>
                  <option value="Urine">Urine</option>
                  <option value="Sputum">Sputum</option>
                  <option value="Stool">Stool</option>
                  <option value="CSF">CSF</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select 
                  value={newTestData.priority}
                  onChange={(e) => setNewTestData({...newTestData, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowTestModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleNewTestEntry}>
                Add Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="lab-dashboard-header">
        <div className="lab-header-title">
          <h1 className="lab-main-title">
            <i className="fas fa-flask lab-title-icon"></i>
            Lab Technician Dashboard
          </h1>
          <p className="lab-subtitle">Manage laboratory tests and equipment</p>
        </div>
        <div className="lab-header-info">
          <div className="lab-user-info">
            <div className="lab-user-avatar">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="lab-user-details">
              <span className="lab-user-name">Dr. Arvind Kumar</span>
              <span className="lab-user-role">Senior Lab Technician</span>
            </div>
          </div>
          <div className="lab-current-time">
            <i className="fas fa-clock"></i>
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="lab-stats-container">
        <div className="lab-stat-card stat-pending">
          <div className="stat-icon">
            <i className="fas fa-hourglass-half"></i>
          </div>
          <div className="stat-info">
            <h3 className="stat-value">{stats.totalPending}</h3>
            <p className="stat-label">Pending Tests</p>
          </div>
        </div>
        
        <div className="lab-stat-card stat-completed">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3 className="stat-value">{stats.totalCompleted}</h3>
            <p className="stat-label">Completed Today</p>
          </div>
        </div>
        
        <div className="lab-stat-card stat-critical">
          <div className="stat-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-info">
            <h3 className="stat-value">{stats.criticalResults}</h3>
            <p className="stat-label">Critical Results</p>
          </div>
        </div>
        
        <div className="lab-stat-card stat-total">
          <div className="stat-icon">
            <i className="fas fa-vial"></i>
          </div>
          <div className="stat-info">
            <h3 className="stat-value">{stats.todayTests}</h3>
            <p className="stat-label">Total Today</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lab-main-content">
        {/* Left Panel - Navigation and Quick Actions */}
        <div className="lab-left-panel">
          {/* Quick Actions */}
          <div className="lab-quick-actions">
            <h3 className="section-title">
              <i className="fas fa-bolt"></i> Quick Actions
            </h3>
            <div className="action-buttons">
              <button 
                className="action-btn btn-new-test"
                onClick={() => setShowTestModal(true)}
              >
                <i className="fas fa-plus-circle"></i>
                New Test Entry
              </button>
              <button 
                className="action-btn btn-process-sample"
                onClick={handleProcessSample}
              >
                <i className="fas fa-vial"></i>
                Process Sample
              </button>
              <button 
                className="action-btn btn-view-reports"
                onClick={handleViewReports}
              >
                <i className="fas fa-chart-bar"></i>
                View Reports
              </button>
              <button 
                className="action-btn btn-manage-equipment"
                onClick={handleEquipmentCheck}
              >
                <i className="fas fa-tools"></i>
                Equipment Check
              </button>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="lab-critical-alerts">
            <h3 className="section-title critical-title">
              <i className="fas fa-exclamation-circle"></i> Critical Alerts
            </h3>
            <div className="alerts-list">
              {criticalAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-header">
                    <span className={`alert-severity ${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>
                    <span className="alert-time">{alert.notificationTime}</span>
                  </div>
                  <div className="alert-content">
                    <h4>{alert.patientName} - {alert.testType}</h4>
                    <p>Result: <strong>{alert.result}</strong></p>
                    <p>Notified to: {alert.notifiedTo}</p>
                    <p>Action: {alert.actionRequired}</p>
                    <div className="alert-actions">
                      {!alert.acknowledged && (
                        <button 
                          className="btn-acknowledge"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </button>
                      )}
                      <button 
                        className="btn-followup"
                        onClick={() => handleFollowUpAlert(alert.id)}
                      >
                        Follow Up
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Status */}
          <div className="lab-equipment-status">
            <h3 className="section-title">
              <i className="fas fa-cogs"></i> Equipment Status
            </h3>
            <div className="equipment-list">
              {equipmentStatus.map(equipment => (
                <div key={equipment.id} className="equipment-item">
                  <div className="equipment-info">
                    <h4>{equipment.name}</h4>
                    <div className="equipment-details">
                      <span className={`equipment-status ${getEquipmentStatusColor(equipment.status)}`}>
                        {equipment.status}
                      </span>
                      <span className="equipment-utilization">
                        Utilization: {equipment.utilization}
                      </span>
                    </div>
                    <div className="equipment-calibration">
                      Last Cal: {equipment.lastCalibration}
                    </div>
                  </div>
                  <div className="equipment-actions">
                    <button 
                      className="btn-calibration"
                      onClick={() => handleCalibrateEquipment(equipment.id)}
                      disabled={equipment.status === 'Calibrating'}
                    >
                      {equipment.status === 'Calibrating' ? 'Calibrating...' : 'Calibrate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Main Content */}
        <div className="lab-right-panel">
          {/* Tabs Navigation */}
          <div className="lab-tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'pendingTests' ? 'active' : ''}`}
              onClick={() => setActiveTab('pendingTests')}
            >
              <i className="fas fa-list-ul"></i> Pending Tests ({pendingTests.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'completedTests' ? 'active' : ''}`}
              onClick={() => setActiveTab('completedTests')}
            >
              <i className="fas fa-check-double"></i> Completed Tests
            </button>
            <button 
              className={`tab-btn ${activeTab === 'testResults' ? 'active' : ''}`}
              onClick={() => setActiveTab('testResults')}
            >
              <i className="fas fa-file-medical-alt"></i> Test Results
            </button>
            <button 
              className={`tab-btn ${activeTab === 'sampleTracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('sampleTracking')}
            >
              <i className="fas fa-vial"></i> Sample Tracking
            </button>
          </div>

          {/* Tab Content */}
          <div className="lab-tab-content">
            {activeTab === 'pendingTests' && (
              <div className="pending-tests-content">
                <div className="table-header">
                  <h3>Pending Laboratory Tests</h3>
                  <div className="table-actions">
                    <input 
                      type="text" 
                      placeholder="Search tests..." 
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn-filter">
                      <i className="fas fa-filter"></i> Filter
                    </button>
                  </div>
                </div>
                
                <div className="tests-table-container">
                  <table className="lab-tests-table">
                    <thead>
                      <tr>
                        <th>Test ID</th>
                        <th>Patient</th>
                        <th>Test Type</th>
                        <th>Requested By</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPendingTests.map(test => (
                        <tr key={test.id}>
                          <td className="test-id">{test.id}</td>
                          <td className="patient-info">
                            <div className="patient-name">{test.patientName}</div>
                            <div className="patient-id">ID: {test.patientId}</div>
                          </td>
                          <td>
                            <span className="test-type">{test.testType}</span>
                            <div className="test-details">
                              {test.sampleType} • {test.department}
                            </div>
                          </td>
                          <td className="requested-by">{test.requestedBy}</td>
                          <td>
                            <span className={`priority-badge ${getPriorityColor(test.priority)}`}>
                              {test.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusColor(test.status)}`}>
                              {test.status}
                            </span>
                          </td>
                          <td>
                            <select 
                              className="assign-select"
                              value={test.assignedTo}
                              onChange={(e) => handleAssignTest(test.id, e.target.value)}
                            >
                              <option value="Self">Self</option>
                              <option value="Tech. Arjun">Tech. Arjun</option>
                              <option value="Tech. Meera">Tech. Meera</option>
                              <option value="Tech. Raj">Tech. Raj</option>
                            </select>
                          </td>
                          <td className="action-buttons">
                            <button 
                              className="btn-start"
                              onClick={() => handleUpdateStatus(test.id, 'In Progress')}
                              disabled={test.status === 'In Progress'}
                            >
                              {test.status === 'In Progress' ? 'In Progress' : 'Start'}
                            </button>
                            <button 
                              className="btn-complete"
                              onClick={() => handleUpdateStatus(test.id, 'Completed')}
                            >
                              Complete
                            </button>
                            <button 
                              className="btn-view"
                              onClick={() => handleViewTest(test, true)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="btn-edit"
                              onClick={() => handleEditNotes(test.id, true)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => {
                                if (window.confirm(`Delete test ${test.id}?`)) {
                                  handleDeleteTest(test.id, true);
                                }
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'completedTests' && (
              <div className="completed-tests-content">
                <div className="table-header">
                  <h3>Completed Tests</h3>
                  <div className="table-actions">
                    <input 
                      type="text" 
                      placeholder="Search tests..." 
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select className="date-filter">
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Last 7 Days</option>
                      <option>This Month</option>
                    </select>
                  </div>
                </div>
                
                <div className="tests-table-container">
                  <table className="lab-tests-table">
                    <thead>
                      <tr>
                        <th>Test ID</th>
                        <th>Patient</th>
                        <th>Test Type</th>
                        <th>Result</th>
                        <th>Status</th>
                        <th>Completed By</th>
                        <th>Verified By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompletedTests.map(test => (
                        <tr key={test.id}>
                          <td className="test-id">{test.id}</td>
                          <td className="patient-info">
                            <div className="patient-name">{test.patientName}</div>
                            <div className="patient-id">ID: {test.patientId}</div>
                          </td>
                          <td>
                            <span className="test-type">{test.testType}</span>
                          </td>
                          <td>
                            <div className="result-value">
                              {test.result}
                              <button 
                                className="btn-edit-result"
                                onClick={() => {
                                  const newResult = prompt('Enter new result:', test.result);
                                  if (newResult) handleAddResult(test.id, newResult);
                                }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusColor(test.status)}`}>
                              {test.status}
                            </span>
                          </td>
                          <td>{test.completedBy}</td>
                          <td>{test.verifiedBy}</td>
                          <td className="action-buttons">
                            <button 
                              className="btn-view"
                              onClick={() => handleViewTest(test, false)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="btn-print"
                              onClick={() => handlePrintTest(test)}
                            >
                              <i className="fas fa-print"></i>
                            </button>
                            <button 
                              className="btn-share"
                              onClick={() => handleShareTest(test)}
                            >
                              <i className="fas fa-share-alt"></i>
                            </button>
                            <button 
                              className="btn-download"
                              onClick={() => handleDownloadTest(test)}
                            >
                              <i className="fas fa-download"></i>
                            </button>
                            <button 
                              className="btn-edit"
                              onClick={() => handleEditNotes(test.id, false)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => {
                                if (window.confirm(`Delete test ${test.id}?`)) {
                                  handleDeleteTest(test.id, false);
                                }
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'testResults' && (
              <div className="test-results-content">
                <div className="results-summary">
                  <h3>Test Results Summary</h3>
                  <div className="results-chart">
                    <div className="chart-container">
                      <div className="chart-bar" style={{height: '80%', backgroundColor: '#4CAF50'}}>
                        <span>Normal ({Math.round(completedTests.filter(t => t.status === 'Normal').length / completedTests.length * 100)}%)</span>
                      </div>
                      <div className="chart-bar" style={{height: '15%', backgroundColor: '#FF9800'}}>
                        <span>Abnormal ({Math.round(completedTests.filter(t => t.status === 'Abnormal' || t.status === 'Borderline').length / completedTests.length * 100)}%)</span>
                      </div>
                      <div className="chart-bar" style={{height: '5%', backgroundColor: '#F44336'}}>
                        <span>Critical ({Math.round(criticalAlerts.length / (completedTests.length + pendingTests.length) * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="recent-results">
                  <h4>Recent Test Results</h4>
                  <div className="results-grid">
                    {completedTests.slice(0, 4).map(test => (
                      <div key={test.id} className="result-card">
                        <div className="result-header">
                          <span className="test-id-small">{test.id}</span>
                          <span className={`result-status ${getStatusColor(test.status)}`}>
                            {test.status}
                          </span>
                        </div>
                        <div className="result-body">
                          <h4>{test.patientName}</h4>
                          <p className="test-type">{test.testType}</p>
                          <div className="result-value-large">{test.result}</div>
                          <p className="result-time">Completed: {test.completionTime}</p>
                        </div>
                        <div className="result-actions">
                          <button 
                            className="btn-small"
                            onClick={() => handleViewTest(test, false)}
                          >
                            View
                          </button>
                          <button 
                            className="btn-small"
                            onClick={() => handlePrintTest(test)}
                          >
                            Print
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sampleTracking' && (
              <div className="sample-tracking-content">
                <div className="tracking-header">
                  <h3>Sample Tracking</h3>
                  <div className="tracking-filters">
                    <input 
                      type="text" 
                      placeholder="Search by patient or test ID" 
                      className="search-input"
                    />
                    <select className="status-filter">
                      <option>All Status</option>
                      <option>Received</option>
                      <option>Processing</option>
                      <option>Analysis</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="tracking-timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker received"></div>
                    <div className="timeline-content">
                      <h4>Sample Received</h4>
                      <p>Blood sample for CBC test (Patient: Rahul Sharma)</p>
                      <div className="timeline-meta">
                        <span className="timeline-time">09:30 AM</span>
                        <span className="timeline-id">Test ID: LT001</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker processing"></div>
                    <div className="timeline-content">
                      <h4>Processing Started</h4>
                      <p>Sample preparation and labeling completed</p>
                      <div className="timeline-meta">
                        <span className="timeline-time">10:15 AM</span>
                        <span className="timeline-status status-inprogress">In Progress</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker analysis"></div>
                    <div className="timeline-content">
                      <h4>Analysis in Progress</h4>
                      <p>Running on Hematology Analyzer (85% complete)</p>
                      <div className="timeline-meta">
                        <span className="timeline-time">11:00 AM</span>
                        <span className="timeline-tech">Tech: Self</span>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker pending"></div>
                    <div className="timeline-content">
                      <h4>Awaiting Verification</h4>
                      <p>Results ready for doctor review</p>
                      <div className="timeline-meta">
                        <span className="timeline-time">11:45 AM</span>
                        <button className="btn-track-action">Mark Verified</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
    
    </div>
  );
};

export default LabTechnicianDashboard;