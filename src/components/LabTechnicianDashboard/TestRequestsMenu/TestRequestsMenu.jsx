import React, { useState, useEffect } from 'react';
import './TestRequestsMenu.css';

const TestRequestsMenu = () => {
  const [testRequests, setTestRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - in a real app, this would come from an API
  const sampleTestRequests = [
    {
      id: 'TR001',
      patientName: 'John Doe',
      patientId: 'P12345',
      testType: 'Complete Blood Count',
      requestedBy: 'Dr. Smith',
      requestedDate: '2023-10-15',
      priority: 'high',
      status: 'pending',
      technicianNotes: 'Fasting sample required',
      labLocation: 'Lab A'
    },
    {
      id: 'TR002',
      patientName: 'Jane Smith',
      patientId: 'P12346',
      testType: 'Lipid Profile',
      requestedBy: 'Dr. Johnson',
      requestedDate: '2023-10-14',
      priority: 'medium',
      status: 'in-progress',
      technicianNotes: 'Collected at 9:00 AM',
      labLocation: 'Lab B'
    },
    {
      id: 'TR003',
      patientName: 'Robert Brown',
      patientId: 'P12347',
      testType: 'Liver Function Test',
      requestedBy: 'Dr. Williams',
      requestedDate: '2023-10-13',
      priority: 'high',
      status: 'completed',
      technicianNotes: 'Results verified',
      labLocation: 'Lab A'
    },
    {
      id: 'TR004',
      patientName: 'Alice Johnson',
      patientId: 'P12348',
      testType: 'Thyroid Panel',
      requestedBy: 'Dr. Davis',
      requestedDate: '2023-10-15',
      priority: 'low',
      status: 'pending',
      technicianNotes: 'Patient allergic to latex',
      labLocation: 'Lab C'
    },
    {
      id: 'TR005',
      patientName: 'Michael Wilson',
      patientId: 'P12349',
      testType: 'Urine Culture',
      requestedBy: 'Dr. Miller',
      requestedDate: '2023-10-12',
      priority: 'medium',
      status: 'in-progress',
      technicianNotes: 'Sample received',
      labLocation: 'Lab B'
    },
    {
      id: 'TR006',
      patientName: 'Sarah Taylor',
      patientId: 'P12350',
      testType: 'Blood Glucose',
      requestedBy: 'Dr. Anderson',
      requestedDate: '2023-10-15',
      priority: 'high',
      status: 'pending',
      technicianNotes: 'Fasting glucose test',
      labLocation: 'Lab A'
    },
    {
      id: 'TR007',
      patientName: 'David Lee',
      patientId: 'P12351',
      testType: 'Hemoglobin A1c',
      requestedBy: 'Dr. Martinez',
      requestedDate: '2023-10-14',
      priority: 'medium',
      status: 'completed',
      technicianNotes: 'Results sent to doctor',
      labLocation: 'Lab C'
    },
    {
      id: 'TR008',
      patientName: 'Emily Clark',
      patientId: 'P12352',
      testType: 'Electrolyte Panel',
      requestedBy: 'Dr. Thomas',
      requestedDate: '2023-10-13',
      priority: 'low',
      status: 'cancelled',
      technicianNotes: 'Patient rescheduled',
      labLocation: 'Lab B'
    }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchTestRequests = async () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setTestRequests(sampleTestRequests);
        setFilteredRequests(sampleTestRequests);
        setLoading(false);
      }, 800);
    };

    fetchTestRequests();
  }, []);

  // Filter test requests based on selected filters and search
  useEffect(() => {
    let filtered = [...testRequests];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(request => request.priority === priorityFilter);
    }

    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => 
        request.patientName.toLowerCase().includes(query) ||
        request.patientId.toLowerCase().includes(query) ||
        request.testType.toLowerCase().includes(query) ||
        request.id.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
  }, [statusFilter, priorityFilter, searchQuery, testRequests]);

  const handleStatusChange = (requestId, newStatus) => {
    const updatedRequests = testRequests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    
    setTestRequests(updatedRequests);
  };

  const handleAddNewRequest = () => {
    const newRequest = {
      id: `TR${String(testRequests.length + 1).padStart(3, '0')}`,
      patientName: 'New Patient',
      patientId: `P${String(testRequests.length + 1000)}`,
      testType: 'New Test',
      requestedBy: 'Dr. Unknown',
      requestedDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      status: 'pending',
      technicianNotes: 'New test request',
      labLocation: 'Lab A'
    };
    
    setTestRequests([newRequest, ...testRequests]);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'test-requests__status-badge--pending';
      case 'in-progress': return 'test-requests__status-badge--in-progress';
      case 'completed': return 'test-requests__status-badge--completed';
      case 'cancelled': return 'test-requests__status-badge--cancelled';
      default: return 'test-requests__status-badge--default';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'high': return 'test-requests__priority-badge--high';
      case 'medium': return 'test-requests__priority-badge--medium';
      case 'low': return 'test-requests__priority-badge--low';
      default: return 'test-requests__priority-badge--default';
    }
  };

  const getStatusCount = (status) => {
    return testRequests.filter(request => request.status === status).length;
  };

  return (
    <div className="test-requests-container technician-theme p-4">
      <header className="test-requests__header technician-header">
        <h1 className="test-requests__title">AAB Technician - Test Requests</h1>
        <p className="test-requests__subtitle">Manage and track laboratory test requests</p>
      </header>

      <div className="test-requests__dashboard technician-dashboard">
        <div className="test-requests__stats technician-stats">
          <div className="test-requests__stat-card technician-stat-card technician-stat-card--total">
            <h3>Total Requests</h3>
            <p>{testRequests.length}</p>
          </div>
          <div className="test-requests__stat-card technician-stat-card technician-stat-card--pending">
            <h3>Pending</h3>
            <p>{getStatusCount('pending')}</p>
          </div>
          <div className="test-requests__stat-card technician-stat-card technician-stat-card--in-progress">
            <h3>In Progress</h3>
            <p>{getStatusCount('in-progress')}</p>
          </div>
          <div className="test-requests__stat-card technician-stat-card technician-stat-card--completed">
            <h3>Completed</h3>
            <p>{getStatusCount('completed')}</p>
          </div>
        </div>

        <div className="test-requests__controls technician-controls">
          <div className="test-requests__filters technician-filters">
            <div className="test-requests__filter-group technician-filter-group">
              <label htmlFor="statusFilter" className="test-requests__filter-label technician-filter-label">Status:</label>
              <select 
                id="statusFilter" 
                className="test-requests__filter-select technician-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="test-requests__filter-group technician-filter-group">
              <label htmlFor="priorityFilter" className="test-requests__filter-label technician-filter-label">Priority:</label>
              <select 
                id="priorityFilter" 
                className="test-requests__filter-select technician-filter-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="test-requests__filter-group technician-filter-group">
              <label htmlFor="searchInput" className="test-requests__filter-label technician-filter-label">Search:</label>
              <input
                id="searchInput"
                type="text"
                className="test-requests__search-input technician-search-input"
                placeholder="Search by patient, test, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <button 
            className="test-requests__add-btn technician-add-btn"
            onClick={handleAddNewRequest}
          >
            + New Test Request
          </button>
        </div>
      </div>

      <div className="test-requests__main-content technician-main-content">
        {loading ? (
          <div className="test-requests__loading technician-loading">
            <div className="test-requests__loading-spinner technician-loading-spinner"></div>
            <p>Loading test requests...</p>
          </div>
        ) : (
          <>
            <div className="test-requests__results-info technician-results-info">
              <p>Showing {filteredRequests.length} of {testRequests.length} test requests</p>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="test-requests__no-results technician-no-results">
                <p>No test requests match your search criteria.</p>
                <button 
                  className="test-requests__reset-btn technician-reset-btn"
                  onClick={() => {
                    setStatusFilter('all');
                    setPriorityFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="test-requests__table-container technician-table-container">
                <table className="test-requests__table technician-table">
                  <thead className="test-requests__table-head technician-table-head">
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Test Type</th>
                      <th>Requested By</th>
                      <th>Date</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="test-requests__table-body technician-table-body">
                    {filteredRequests.map(request => (
                      <tr key={request.id} className="test-requests__table-row technician-table-row">
                        <td className="test-requests__table-cell test-requests__table-cell--id technician-table-cell technician-table-cell--id">
                          {request.id}
                        </td>
                        <td className="test-requests__table-cell technician-table-cell">
                          <div className="test-requests__patient-info technician-patient-info">
                            <strong>{request.patientName}</strong>
                            <span className="test-requests__patient-id technician-patient-id">{request.patientId}</span>
                          </div>
                        </td>
                        <td className="test-requests__table-cell technician-table-cell">
                          {request.testType}
                          <div className="test-requests__lab-location technician-lab-location">
                            {request.labLocation}
                          </div>
                        </td>
                        <td className="test-requests__table-cell technician-table-cell">
                          {request.requestedBy}
                        </td>
                        <td className="test-requests__table-cell technician-table-cell">
                          {request.requestedDate}
                        </td>
                        <td className="test-requests__table-cell technician-table-cell">
                          <span className={`test-requests__priority-badge ${getPriorityBadgeClass(request.priority)} technician-priority-badge technician-priority-badge--${request.priority}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="test-requests__table-cell technician-table-cell">
                          <span className={`test-requests__status-badge ${getStatusBadgeClass(request.status)} technician-status-badge technician-status-badge--${request.status}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="test-requests__table-cell test-requests__table-cell--actions technician-table-cell technician-table-cell--actions">
                          <div className="test-requests__action-buttons technician-action-buttons">
                            <select 
                              className="test-requests__status-select technician-status-select"
                              value={request.status}
                              onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button 
                              className="test-requests__view-btn technician-view-btn"
                              onClick={() => alert(`View details for ${request.id}\nPatient: ${request.patientName}\nTest: ${request.testType}\nNotes: ${request.technicianNotes}`)}
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="test-requests__footer technician-footer">
        <p className="test-requests__footer-text technician-footer-text">
          AAB Technician Portal • Test Requests Management System • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default TestRequestsMenu;