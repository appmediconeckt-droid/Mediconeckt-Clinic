import React, { useState, useEffect } from 'react';
import {
  FaMoneyBillWave, FaChartLine, FaChartBar, FaChartPie,
  FaCalendarAlt, FaFileInvoice, FaDownload, FaPrint,
  FaFilter, FaSearch, FaEye, FaEdit, FaTrash,
  FaPlus, FaSave, FaTimes, FaCheck, FaExclamationTriangle,
  FaArrowUp, FaArrowDown, FaBalanceScale, FaCalculator,
  FaHistory, FaBell, FaCog, FaDatabase, FaUserMd,
  FaHospital, FaAmbulance, FaPills, FaXRay, FaProcedures,
  FaUsers, FaBed, FaClipboardList, FaRegClock
} from 'react-icons/fa';
import './ManagerBudget.css';

const ManagerBudget = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or table
  const [editingBudget, setEditingBudget] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Budget Overview Data
  const [budgetOverview, setBudgetOverview] = useState({
    totalBudget: 125000000,
    totalSpent: 89250000,
    totalRemaining: 35750000,
    utilizationRate: 71.4,
    variance: -2.3,
    upcomingPayments: 8500000,
    savings: 1500000
  });

  // Department Budgets
  const [departmentBudgets, setDepartmentBudgets] = useState([
    {
      id: 1,
      department: "Cardiology",
      allocated: 25000000,
      spent: 19500000,
      remaining: 5500000,
      utilization: 78.0,
      variance: -3.2,
      status: "on_track",
      color: "#FF6B6B"
    },
    {
      id: 2,
      department: "Neurology",
      allocated: 18000000,
      spent: 13500000,
      remaining: 4500000,
      utilization: 75.0,
      variance: 2.5,
      status: "under_budget",
      color: "#4ECDC4"
    },
    {
      id: 3,
      department: "Orthopedics",
      allocated: 22000000,
      spent: 17500000,
      remaining: 4500000,
      utilization: 79.5,
      variance: -4.5,
      status: "over_budget",
      color: "#FFD166"
    },
    {
      id: 4,
      department: "Pediatrics",
      allocated: 15000000,
      spent: 10500000,
      remaining: 4500000,
      utilization: 70.0,
      variance: 5.0,
      status: "under_budget",
      color: "#06D6A0"
    },
    {
      id: 5,
      department: "Emergency",
      allocated: 20000000,
      spent: 16500000,
      remaining: 3500000,
      utilization: 82.5,
      variance: -7.5,
      status: "over_budget",
      color: "#118AB2"
    },
    {
      id: 6,
      department: "Pharmacy",
      allocated: 12000000,
      spent: 8500000,
      remaining: 3500000,
      utilization: 70.8,
      variance: 4.2,
      status: "under_budget",
      color: "#EF476F"
    },
    {
      id: 7,
      department: "Radiology",
      allocated: 8000000,
      spent: 5200000,
      remaining: 2800000,
      utilization: 65.0,
      variance: 10.0,
      status: "under_budget",
      color: "#073B4C"
    },
    {
      id: 8,
      department: "Administration",
      allocated: 9000000,
      spent: 8000000,
      remaining: 1000000,
      utilization: 88.9,
      variance: -13.9,
      status: "over_budget",
      color: "#7209B7"
    }
  ]);

  // Expense Categories
  const [expenseCategories, setExpenseCategories] = useState([
    { name: "Salaries", amount: 45000000, percentage: 50.4, color: "#FF6B6B", icon: <FaUsers /> },
    { name: "Medications", amount: 18500000, percentage: 20.7, color: "#4ECDC4", icon: <FaPills /> },
    { name: "Equipment", amount: 12500000, percentage: 14.0, color: "#FFD166", icon: <FaXRay /> },
    { name: "Facilities", amount: 6500000, percentage: 7.3, color: "#06D6A0", icon: <FaHospital /> },
    { name: "Utilities", amount: 3500000, percentage: 3.9, color: "#118AB2", icon: <FaCog /> },
    { name: "Other", amount: 3250000, percentage: 3.7, color: "#7209B7", icon: <FaDatabase /> }
  ]);

  // Recent Transactions
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, date: "2024-01-31", department: "Cardiology", category: "Equipment", amount: 1250000, type: "expense", status: "completed", approvedBy: "Dr. Sharma" },
    { id: 2, date: "2024-01-30", department: "Pharmacy", category: "Medications", amount: 850000, type: "expense", status: "completed", approvedBy: "Pharm. Patel" },
    { id: 3, date: "2024-01-29", department: "Neurology", category: "Salaries", amount: 2250000, type: "expense", status: "pending", approvedBy: "HR Manager" },
    { id: 4, date: "2024-01-28", department: "Emergency", category: "Equipment", amount: 950000, type: "expense", status: "completed", approvedBy: "Dr. Gupta" },
    { id: 5, date: "2024-01-27", department: "Orthopedics", category: "Supplies", amount: 450000, type: "expense", status: "completed", approvedBy: "Store Manager" },
    { id: 6, date: "2024-01-26", department: "Administration", category: "Software", amount: 350000, type: "expense", status: "approved", approvedBy: "IT Manager" },
    { id: 7, date: "2024-01-25", department: "Pediatrics", category: "Training", amount: 280000, type: "expense", status: "pending", approvedBy: "Training Head" },
    { id: 8, date: "2024-01-24", department: "Radiology", category: "Maintenance", amount: 320000, type: "expense", status: "completed", approvedBy: "Maintenance" }
  ]);

  // Budget Alerts
  const [budgetAlerts, setBudgetAlerts] = useState([
    { id: 1, department: "Orthopedics", message: "Budget exceeded by 4.5%", severity: "high", date: "2024-01-30" },
    { id: 2, department: "Emergency", message: "Approaching budget limit (82.5%)", severity: "medium", date: "2024-01-29" },
    { id: 3, department: "Administration", message: "High utilization rate (88.9%)", severity: "high", date: "2024-01-28" },
    { id: 4, department: "Cardiology", message: "Variance -3.2% from target", severity: "low", date: "2024-01-27" }
  ]);

  // Budget History
  const [budgetHistory, setBudgetHistory] = useState([
    { month: "Jan", allocated: 12500000, spent: 8925000, variance: -2.3 },
    { month: "Feb", allocated: 12500000, spent: 11850000, variance: 5.2 },
    { month: "Mar", allocated: 12500000, spent: 9850000, variance: -1.8 },
    { month: "Apr", allocated: 12500000, spent: 11200000, variance: 3.6 },
    { month: "May", allocated: 12500000, spent: 10550000, variance: 1.4 },
    { month: "Jun", allocated: 12500000, spent: 13200000, variance: 8.2 },
    { month: "Jul", allocated: 12500000, spent: 9250000, variance: -4.6 },
    { month: "Aug", allocated: 12500000, spent: 10800000, variance: 2.4 },
    { month: "Sep", allocated: 12500000, spent: 11750000, variance: 6.0 },
    { month: "Oct", allocated: 12500000, spent: 9950000, variance: -0.4 },
    { month: "Nov", allocated: 12500000, spent: 12100000, variance: 7.2 },
    { month: "Dec", allocated: 12500000, spent: 8800000, variance: -5.6 }
  ]);

  // Form State for Add/Edit
  const [budgetForm, setBudgetForm] = useState({
    department: '',
    allocated: '',
    fiscalYear: '2024',
    category: 'operational',
    notes: ''
  });

  // Years for dropdown
  const years = ['2022', '2023', '2024', '2025'];
  const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency', 'Pharmacy', 'Radiology', 'Administration'];
  const categories = ['Salaries', 'Medications', 'Equipment', 'Facilities', 'Utilities', 'Supplies', 'Training', 'Software', 'Maintenance', 'Other'];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalAllocated = departmentBudgets.reduce((sum, dept) => sum + dept.allocated, 0);
    const totalSpent = departmentBudgets.reduce((sum, dept) => sum + dept.spent, 0);
    const avgUtilization = (totalSpent / totalAllocated * 100).toFixed(1);
    
    return {
      totalAllocated,
      totalSpent,
      avgUtilization
    };
  };

  // Handle budget edit
  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setBudgetForm({
      department: budget.department,
      allocated: budget.allocated,
      fiscalYear: selectedYear,
      category: 'operational',
      notes: ''
    });
    setShowAddModal(true);
  };

  // Handle budget delete
  const handleDeleteBudget = (budgetId) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setDepartmentBudgets(prev => prev.filter(budget => budget.id !== budgetId));
      showAlertMessage('Budget deleted successfully');
    }
  };

  // Handle form submit
  const handleSubmitBudget = (e) => {
    e.preventDefault();
    
    if (editingBudget) {
      // Update existing budget
      setDepartmentBudgets(prev => prev.map(budget => 
        budget.id === editingBudget.id 
          ? { ...budget, allocated: parseFloat(budgetForm.allocated) }
          : budget
      ));
      showAlertMessage('Budget updated successfully');
    } else {
      // Add new budget
      const newBudget = {
        id: departmentBudgets.length + 1,
        department: budgetForm.department,
        allocated: parseFloat(budgetForm.allocated),
        spent: 0,
        remaining: parseFloat(budgetForm.allocated),
        utilization: 0,
        variance: 0,
        status: "on_track",
        color: getRandomColor()
      };
      setDepartmentBudgets(prev => [...prev, newBudget]);
      showAlertMessage('Budget added successfully');
    }
    
    setShowAddModal(false);
    setEditingBudget(null);
    setBudgetForm({
      department: '',
      allocated: '',
      fiscalYear: '2024',
      category: 'operational',
      notes: ''
    });
  };

  // Show alert message
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Get random color for new departments
  const getRandomColor = () => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0",
      "#118AB2", "#EF476F", "#073B4C", "#7209B7",
      "#FF9E6D", "#A663CC", "#5E60CE", "#64DFDF"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Filter budgets by department
  const getFilteredBudgets = () => {
    if (selectedDepartment === 'all') return departmentBudgets;
    return departmentBudgets.filter(budget => budget.department === selectedDepartment);
  };

  // Calculate progress percentage
  const calculateProgress = (spent, allocated) => {
    return Math.min((spent / allocated) * 100, 100);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'on_track': return '#4CAF50';
      case 'under_budget': return '#2196F3';
      case 'over_budget': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'on_track': return 'On Track';
      case 'under_budget': return 'Under Budget';
      case 'over_budget': return 'Over Budget';
      default: return 'Unknown';
    }
  };

  const stats = calculateStats();

  return (
    <div className="budget-manager-container">
      {/* Header */}
      <div className="budget-header-manager">
        <div className="budget-header-left">
          <FaMoneyBillWave className="budget-header-icon" />
          <div>
            <h1>Budget Management</h1>
            <p className="budget-subtitle">Monitor and manage hospital budgets and expenses</p>
          </div>
        </div>
        <div className="budget-header-right">
          <div className="budget-year-selector">
            <FaCalendarAlt className="year-icon" />
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="year-select"
            >
              {years.map(year => (
                <option key={year} value={year}>FY {year}</option>
              ))}
            </select>
          </div>
          <button 
            className="btn-add-budget"
            onClick={() => {
              setEditingBudget(null);
              setShowAddModal(true);
            }}
          >
            <FaPlus /> Add New Budget
          </button>
          <button className="btn-export-budget">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <div className="budget-alert-banner success">
          <FaCheck />
          <span>{alertMessage}</span>
          <button onClick={() => setShowAlert(false)} className="alert-close">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Budget Overview Cards */}
      <div className="budget-overview-grid">
        <div className="budget-card budget-card-total">
          <div className="budget-card-header">
            <h3>Total Budget</h3>
            <FaMoneyBillWave className="card-icon" />
          </div>
          <div className="budget-card-content">
            <p className="budget-amount">{formatCurrency(budgetOverview.totalBudget)}</p>
            <div className="budget-card-footer">
              <span className="budget-change positive">
                <FaArrowUp /> 8.5% from last year
              </span>
            </div>
          </div>
        </div>

        <div className="budget-card budget-card-spent">
          <div className="budget-card-header">
            <h3>Total Spent</h3>
            <FaChartBar className="card-icon" />
          </div>
          <div className="budget-card-content">
            <p className="budget-amount">{formatCurrency(budgetOverview.totalSpent)}</p>
            <div className="budget-card-footer">
              <span className="budget-change negative">
                <FaArrowUp /> {formatPercentage(budgetOverview.utilizationRate)} utilized
              </span>
            </div>
          </div>
        </div>

        <div className="budget-card budget-card-remaining">
          <div className="budget-card-header">
            <h3>Remaining Balance</h3>
            <FaBalanceScale className="card-icon" />
          </div>
          <div className="budget-card-content">
            <p className="budget-amount">{formatCurrency(budgetOverview.totalRemaining)}</p>
            <div className="budget-card-footer">
              <span className="budget-change positive">
                <FaArrowDown /> {formatPercentage(100 - budgetOverview.utilizationRate)} available
              </span>
            </div>
          </div>
        </div>

        <div className="budget-card budget-card-utilization">
          <div className="budget-card-header">
            <h3>Utilization Rate</h3>
            <FaChartPie className="card-icon" />
          </div>
          <div className="budget-card-content">
            <div className="utilization-circle">
              <div 
                className="circle-progress"
                style={{
                  background: `conic-gradient(#8c9eff ${budgetOverview.utilizationRate * 3.6}deg, #e6e6ff 0deg)`
                }}
              >
                <span className="circle-value">{formatPercentage(budgetOverview.utilizationRate)}</span>
              </div>
            </div>
            <div className="budget-card-footer">
              <span className={`budget-change ${budgetOverview.variance >= 0 ? 'positive' : 'negative'}`}>
                {budgetOverview.variance >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(budgetOverview.variance)}% variance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="budget-tabs-navigation">
        <button 
          className={`budget-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button 
          className={`budget-tab ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveTab('departments')}
        >
          <FaHospital /> Departments
        </button>
        <button 
          className={`budget-tab ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          <FaFileInvoice /> Expenses
        </button>
        <button 
          className={`budget-tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <FaHistory /> Transactions
        </button>
        <button 
          className={`budget-tab ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <FaBell /> Alerts
        </button>
      </div>

      {/* Main Content */}
      <div className="budget-main-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="budget-overview-content">
            {/* Left Column */}
            <div className="overview-left-column">
              {/* Department Budget Progress */}
              <div className="budget-progress-card">
                <div className="card-header">
                  <h3>Department Budget Progress</h3>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="department-select"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="progress-list">
                  {getFilteredBudgets().map(budget => (
                    <div key={budget.id} className="progress-item">
                      <div className="progress-header">
                        <div className="department-info">
                          <div 
                            className="department-color"
                            style={{ backgroundColor: budget.color }}
                          ></div>
                          <span className="department-name">{budget.department}</span>
                        </div>
                        <div className="budget-numbers">
                          <span className="allocated">{formatCurrency(budget.allocated)}</span>
                          <span className="spent">{formatCurrency(budget.spent)}</span>
                          <span className="remaining">{formatCurrency(budget.remaining)}</span>
                        </div>
                      </div>
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar"
                          style={{ width: `${calculateProgress(budget.spent, budget.allocated)}%` }}
                        >
                          <span className="progress-text">{formatPercentage(budget.utilization)}</span>
                        </div>
                      </div>
                      <div className="progress-footer">
                        <span className={`status-badge ${budget.status}`}>
                          {getStatusText(budget.status)}
                        </span>
                        <span className={`variance ${budget.variance >= 0 ? 'positive' : 'negative'}`}>
                          {budget.variance >= 0 ? '+' : ''}{formatPercentage(budget.variance)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget History Chart */}
              <div className="budget-history-card">
                <div className="card-header">
                  <h3>Monthly Budget History</h3>
                  <button className="btn-view-details">View Details →</button>
                </div>
                <div className="history-chart">
                  <div className="chart-bars">
                    {budgetHistory.map((month, index) => (
                      <div key={index} className="chart-bar-group">
                        <div className="bar-labels">
                          <span className="month-label">{month.month}</span>
                          <span className={`variance-label ${month.variance >= 0 ? 'positive' : 'negative'}`}>
                            {month.variance >= 0 ? '+' : ''}{formatPercentage(month.variance)}
                          </span>
                        </div>
                        <div className="bars-container">
                          <div 
                            className="bar allocated-bar"
                            style={{ height: '60px' }}
                            title={`Allocated: ${formatCurrency(month.allocated)}`}
                          ></div>
                          <div 
                            className="bar spent-bar"
                            style={{ height: `${(month.spent / month.allocated) * 60}px` }}
                            title={`Spent: ${formatCurrency(month.spent)}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color allocated"></div>
                      <span>Allocated</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color spent"></div>
                      <span>Spent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="overview-right-column">
              {/* Expense Distribution */}
              <div className="expense-distribution-card">
                <div className="card-header">
                  <h3>Expense Distribution</h3>
                  <button className="btn-export">
                    <FaDownload /> Export
                  </button>
                </div>
                <div className="distribution-chart">
                  {expenseCategories.map((category, index) => (
                    <div key={category.name} className="distribution-item">
                      <div className="category-header">
                        <div className="category-icon" style={{ color: category.color }}>
                          {category.icon}
                        </div>
                        <div className="category-info">
                          <h4>{category.name}</h4>
                          <span className="category-percentage">{formatPercentage(category.percentage)}</span>
                        </div>
                      </div>
                      <div className="amount-bar">
                        <div 
                          className="bar-fill"
                          style={{ 
                            width: `${category.percentage}%`,
                            backgroundColor: category.color
                          }}
                        ></div>
                        <span className="amount-text">{formatCurrency(category.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="distribution-total">
                  <span>Total Expenses:</span>
                  <span className="total-amount">{formatCurrency(expenseCategories.reduce((sum, cat) => sum + cat.amount, 0))}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats-card">
                <div className="card-header">
                  <h3>Quick Statistics</h3>
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaCalculator />
                    </div>
                    <div className="stat-content">
                      <h4>Total Allocated</h4>
                      <p className="stat-number">{formatCurrency(stats.totalAllocated)}</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaChartLine />
                    </div>
                    <div className="stat-content">
                      <h4>Average Utilization</h4>
                      <p className="stat-number">{formatPercentage(parseFloat(stats.avgUtilization))}</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaExclamationTriangle />
                    </div>
                    <div className="stat-content">
                      <h4>Departments Over Budget</h4>
                      <p className="stat-number">
                        {departmentBudgets.filter(b => b.status === 'over_budget').length}
                      </p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaCheck />
                    </div>
                    <div className="stat-content">
                      <h4>Departments Under Budget</h4>
                      <p className="stat-number">
                        {departmentBudgets.filter(b => b.status === 'under_budget').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Payments */}
              <div className="upcoming-payments-card">
                <div className="card-header">
                  <h3>Upcoming Payments</h3>
                  <FaRegClock className="clock-icon" />
                </div>
                <div className="payments-list">
                  <div className="payment-item">
                    <div className="payment-info">
                      <h4>Staff Salaries</h4>
                      <p className="payment-date">Due: Feb 5, 2024</p>
                    </div>
                    <div className="payment-amount">{formatCurrency(4500000)}</div>
                  </div>
                  <div className="payment-item">
                    <div className="payment-info">
                      <h4>Medication Supply</h4>
                      <p className="payment-date">Due: Feb 10, 2024</p>
                    </div>
                    <div className="payment-amount">{formatCurrency(1250000)}</div>
                  </div>
                  <div className="payment-item">
                    <div className="payment-info">
                      <h4>Equipment Lease</h4>
                      <p className="payment-date">Due: Feb 15, 2024</p>
                    </div>
                    <div className="payment-amount">{formatCurrency(850000)}</div>
                  </div>
                </div>
                <div className="payments-total">
                  <span>Total Due:</span>
                  <span className="total-due">{formatCurrency(budgetOverview.upcomingPayments)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="budget-departments-content">
            <div className="departments-header">
              <h3>Department Budgets</h3>
              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </button>
                <button 
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Table View
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="departments-grid">
                {departmentBudgets.map(budget => (
                  <div key={budget.id} className="department-budget-card">
                    <div className="card-header" style={{ backgroundColor: `${budget.color}20` }}>
                      <h4>{budget.department}</h4>
                      <div className="card-actions">
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditBudget(budget)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteBudget(budget.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="budget-numbers">
                        <div className="number-item">
                          <span className="label">Allocated</span>
                          <span className="value allocated">{formatCurrency(budget.allocated)}</span>
                        </div>
                        <div className="number-item">
                          <span className="label">Spent</span>
                          <span className="value spent">{formatCurrency(budget.spent)}</span>
                        </div>
                        <div className="number-item">
                          <span className="label">Remaining</span>
                          <span className="value remaining">{formatCurrency(budget.remaining)}</span>
                        </div>
                      </div>
                      <div className="progress-section">
                        <div className="progress-header">
                          <span>Utilization: {formatPercentage(budget.utilization)}</span>
                          <span className={`variance ${budget.variance >= 0 ? 'positive' : 'negative'}`}>
                            {budget.variance >= 0 ? '+' : ''}{formatPercentage(budget.variance)}
                          </span>
                        </div>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar"
                            style={{ 
                              width: `${calculateProgress(budget.spent, budget.allocated)}%`,
                              backgroundColor: budget.color
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="status-section">
                        <span className={`status-badge ${budget.status}`}>
                          {getStatusText(budget.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="departments-table-container">
                <table className="departments-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Allocated</th>
                      <th>Spent</th>
                      <th>Remaining</th>
                      <th>Utilization</th>
                      <th>Variance</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentBudgets.map(budget => (
                      <tr key={budget.id}>
                        <td>
                          <div className="department-cell">
                            <div 
                              className="department-dot"
                              style={{ backgroundColor: budget.color }}
                            ></div>
                            {budget.department}
                          </div>
                        </td>
                        <td className="allocated-cell">{formatCurrency(budget.allocated)}</td>
                        <td className="spent-cell">{formatCurrency(budget.spent)}</td>
                        <td className="remaining-cell">{formatCurrency(budget.remaining)}</td>
                        <td>
                          <div className="utilization-cell">
                            <div className="utilization-bar">
                              <div 
                                className="bar-fill"
                                style={{ width: `${budget.utilization}%` }}
                              ></div>
                            </div>
                            <span>{formatPercentage(budget.utilization)}</span>
                          </div>
                        </td>
                        <td className={`variance-cell ${budget.variance >= 0 ? 'positive' : 'negative'}`}>
                          {budget.variance >= 0 ? '+' : ''}{formatPercentage(budget.variance)}
                        </td>
                        <td>
                          <span className={`status-badge ${budget.status}`}>
                            {getStatusText(budget.status)}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn edit"
                              onClick={() => handleEditBudget(budget)}
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => handleDeleteBudget(budget.id)}
                            >
                              <FaTrash />
                            </button>
                            <button className="action-btn view">
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="budget-expenses-content">
            <div className="expenses-header">
              <h3>Expense Analysis</h3>
              <div className="expense-filters">
                <select className="filter-select">
                  <option>All Categories</option>
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
                <input 
                  type="month" 
                  className="month-filter" 
                  defaultValue="2024-01"
                />
                <button className="btn-apply-filter">
                  <FaFilter /> Apply
                </button>
              </div>
            </div>

            <div className="expenses-analysis">
              <div className="expense-pie-chart">
                <div className="chart-container">
                  <div className="pie-chart">
                    {expenseCategories.map((category, index) => {
                      const startAngle = expenseCategories
                        .slice(0, index)
                        .reduce((sum, cat) => sum + cat.percentage, 0) * 3.6;
                      
                      return (
                        <div
                          key={category.name}
                          className="pie-slice"
                          style={{
                            background: `conic-gradient(${category.color} 0deg ${category.percentage * 3.6}deg, transparent ${category.percentage * 3.6}deg)`,
                            transform: `rotate(${startAngle}deg)`
                          }}
                        ></div>
                      );
                    })}
                  </div>
                  <div className="chart-center">
                    <span className="center-text">Total</span>
                    <span className="center-amount">
                      {formatCurrency(expenseCategories.reduce((sum, cat) => sum + cat.amount, 0))}
                    </span>
                  </div>
                </div>
                <div className="chart-legend">
                  {expenseCategories.map(category => (
                    <div key={category.name} className="legend-item">
                      <div 
                        className="legend-color"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div className="legend-info">
                        <span className="legend-name">{category.name}</span>
                        <span className="legend-percentage">{formatPercentage(category.percentage)}</span>
                      </div>
                      <span className="legend-amount">{formatCurrency(category.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="expense-trends">
                <h4>Expense Trends</h4>
                <div className="trends-chart">
                  <div className="chart-bars">
                    {[100, 85, 120, 90, 110, 95, 130, 105, 115, 100, 125, 110].map((value, index) => (
                      <div key={index} className="trend-bar">
                        <div 
                          className="bar-value"
                          style={{ height: `${value}%` }}
                        ></div>
                        <span className="bar-label">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="trends-summary">
                  <div className="summary-item">
                    <span className="label">Highest Month</span>
                    <span className="value">July - ₹1,32,00,000</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Lowest Month</span>
                    <span className="value">December - ₹88,00,000</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Average Monthly</span>
                    <span className="value">₹1,06,04,167</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="budget-transactions-content">
            <div className="transactions-header">
              <h3>Recent Transactions</h3>
              <div className="transaction-filters">
                <div className="search-box">
                  <FaSearch />
                  <input type="text" placeholder="Search transactions..." />
                </div>
                <select className="status-filter">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Approved</option>
                </select>
                <button className="btn-add-transaction">
                  <FaPlus /> Add Transaction
                </button>
              </div>
            </div>

            <div className="transactions-table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Department</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Approved By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>
                        <span className="department-badge">{transaction.department}</span>
                      </td>
                      <td>{transaction.category}</td>
                      <td className="description-cell">
                        {transaction.category} expense for {transaction.department}
                      </td>
                      <td className={`amount-cell ${transaction.type}`}>
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td>
                        <span className={`type-badge ${transaction.type}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${transaction.status}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td>{transaction.approvedBy}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view">
                            <FaEye />
                          </button>
                          <button className="action-btn edit">
                            <FaEdit />
                          </button>
                          <button className="action-btn print">
                            <FaPrint />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="transactions-summary">
              <div className="summary-card">
                <h4>Total Expenses</h4>
                <p className="summary-amount">{formatCurrency(recentTransactions.reduce((sum, t) => sum + t.amount, 0))}</p>
              </div>
              <div className="summary-card">
                <h4>Pending Approvals</h4>
                <p className="summary-count">
                  {recentTransactions.filter(t => t.status === 'pending').length} transactions
                </p>
              </div>
              <div className="summary-card">
                <h4>Average Transaction</h4>
                <p className="summary-average">
                  {formatCurrency(recentTransactions.reduce((sum, t) => sum + t.amount, 0) / recentTransactions.length)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="budget-alerts-content">
            <div className="alerts-header">
              <h3>Budget Alerts & Notifications</h3>
              <div className="alert-actions">
                <button className="btn-mark-all-read">
                  <FaCheck /> Mark All as Read
                </button>
                <button className="btn-clear-alerts">
                  <FaTrash /> Clear All
                </button>
              </div>
            </div>

            <div className="alerts-list">
              {budgetAlerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.severity}`}>
                  <div className="alert-icon">
                    <FaExclamationTriangle />
                  </div>
                  <div className="alert-content">
                    <h4>{alert.department}</h4>
                    <p>{alert.message}</p>
                    <span className="alert-date">{new Date(alert.date).toLocaleDateString()}</span>
                  </div>
                  <div className="alert-actions">
                    <button className="action-btn view">View Details</button>
                    <button className="action-btn dismiss">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="alert-stats">
              <div className="stat-card">
                <div className="stat-icon high"></div>
                <div className="stat-content">
                  <h4>High Priority</h4>
                  <p className="stat-count">
                    {budgetAlerts.filter(a => a.severity === 'high').length} alerts
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon medium"></div>
                <div className="stat-content">
                  <h4>Medium Priority</h4>
                  <p className="stat-count">
                    {budgetAlerts.filter(a => a.severity === 'medium').length} alerts
                  </p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon low"></div>
                <div className="stat-content">
                  <h4>Low Priority</h4>
                  <p className="stat-count">
                    {budgetAlerts.filter(a => a.severity === 'low').length} alerts
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Budget Modal */}
      {showAddModal && (
        <div className="budget-modal-overlay">
          <div className="budget-modal">
            <div className="modal-header">
              <h3>{editingBudget ? 'Edit Budget' : 'Add New Budget'}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmitBudget} className="modal-form">
              <div className="form-group">
                <label>Department *</label>
                <select 
                  value={budgetForm.department}
                  onChange={(e) => setBudgetForm({...budgetForm, department: e.target.value})}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Allocated Amount (₹) *</label>
                <input 
                  type="number"
                  value={budgetForm.allocated}
                  onChange={(e) => setBudgetForm({...budgetForm, allocated: e.target.value})}
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="form-group">
                <label>Fiscal Year</label>
                <select 
                  value={budgetForm.fiscalYear}
                  onChange={(e) => setBudgetForm({...budgetForm, fiscalYear: e.target.value})}
                >
                  {years.map(year => (
                    <option key={year} value={year}>FY {year}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select 
                  value={budgetForm.category}
                  onChange={(e) => setBudgetForm({...budgetForm, category: e.target.value})}
                >
                  <option value="operational">Operational</option>
                  <option value="capital">Capital</option>
                  <option value="development">Development</option>
                  <option value="contingency">Contingency</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea 
                  value={budgetForm.notes}
                  onChange={(e) => setBudgetForm({...budgetForm, notes: e.target.value})}
                  placeholder="Additional notes..."
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <FaSave /> {editingBudget ? 'Update Budget' : 'Create Budget'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerBudget;