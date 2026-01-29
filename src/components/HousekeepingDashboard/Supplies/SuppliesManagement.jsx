import React, { useState, useEffect } from 'react';
import './SuppliesManagement.css';
import {
  FaBox,
  FaShoppingCart,
  FaTruck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
  FaCalendarAlt,
  FaTag,
  FaBarcode,
  FaWarehouse,
  FaClipboardList,
  FaBalanceScale,
  FaDollarSign,
  FaPercentage,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaChartLine,
  FaHistory,
  FaBoxOpen,
  FaPrescriptionBottle,
  FaSoap,
  FaHandSparkles,
  FaSprayCan,
  FaPumpSoap,
  FaToiletPaper,
  FaTint,
  FaWind,
  FaSnowflake,

  FaBroom,
  FaTrashAlt,
  FaGlasses,
  FaHandsWash,
  FaShieldVirus
} from 'react-icons/fa';

const SuppliesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  
  // Supplies Inventory Data
  const [supplies, setSupplies] = useState([
    { 
      id: 1, 
      itemCode: 'HK-DIS-001', 
      itemName: 'Hospital Grade Disinfectant', 
      category: 'Cleaning Chemicals',
      brand: 'Clorox',
      unit: 'Liter',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      reorderPoint: 25,
      status: 'Adequate',
      unitCost: 450,
      totalValue: 20250,
      location: 'Store A, Shelf 3',
      supplier: 'MediClean Supplies',
      supplierContact: '9876543210',
      lastOrdered: '2024-01-15',
      nextOrder: '2024-02-15',
      leadTime: '3 days',
      expiryDate: '2024-12-31',
      usageRate: '15L/week',
      criticalLevel: false,
      notes: 'For surface disinfection only'
    },
    { 
      id: 2, 
      itemCode: 'HK-FCL-002', 
      itemName: 'Floor Cleaner Concentrate', 
      category: 'Cleaning Chemicals',
      brand: 'Lysol',
      unit: 'Gallon',
      currentStock: 32,
      minStock: 25,
      maxStock: 80,
      reorderPoint: 30,
      status: 'Adequate',
      unitCost: 1200,
      totalValue: 38400,
      location: 'Store A, Shelf 2',
      supplier: 'CleanPro Distributors',
      supplierContact: '8765432109',
      lastOrdered: '2024-01-10',
      nextOrder: '2024-02-10',
      leadTime: '2 days',
      expiryDate: '2025-06-30',
      usageRate: '8G/week',
      criticalLevel: false,
      notes: 'Dilute 1:10 with water'
    },
    { 
      id: 3, 
      itemCode: 'HK-HSD-003', 
      itemName: 'Hand Sanitizer (70% Alcohol)', 
      category: 'Sanitation',
      brand: 'Purell',
      unit: '500ml Bottle',
      currentStock: 15,
      minStock: 30,
      maxStock: 100,
      reorderPoint: 35,
      status: 'Low Stock',
      unitCost: 180,
      totalValue: 2700,
      location: 'Store B, Shelf 1',
      supplier: 'HealthFirst Supplies',
      supplierContact: '7654321098',
      lastOrdered: '2024-01-05',
      nextOrder: 'ASAP',
      leadTime: '1 day',
      expiryDate: '2024-09-30',
      usageRate: '50 bottles/week',
      criticalLevel: true,
      notes: 'Critical for all wards'
    },
    { 
      id: 4, 
      itemCode: 'HK-TBG-004', 
      itemName: 'Biohazard Trash Bags', 
      category: 'Disposables',
      brand: 'Glad',
      unit: 'Roll (100 bags)',
      currentStock: 120,
      minStock: 50,
      maxStock: 200,
      reorderPoint: 60,
      status: 'Adequate',
      unitCost: 850,
      totalValue: 102000,
      location: 'Store C, Shelf 4',
      supplier: 'SafetyFirst Medical',
      supplierContact: '6543210987',
      lastOrdered: '2024-01-12',
      nextOrder: '2024-02-12',
      leadTime: '4 days',
      expiryDate: '2026-12-31',
      usageRate: '20 rolls/week',
      criticalLevel: false,
      notes: 'Yellow bags for biohazard waste'
    },
    { 
      id: 5, 
      itemCode: 'HK-GLV-005', 
      itemName: 'Nitrile Gloves (Large)', 
      category: 'PPE',
      brand: 'Kimberly-Clark',
      unit: 'Box (100 pairs)',
      currentStock: 8,
      minStock: 25,
      maxStock: 100,
      reorderPoint: 30,
      status: 'Critical',
      unitCost: 1200,
      totalValue: 9600,
      location: 'Store B, Shelf 3',
      supplier: 'PPE Suppliers Inc',
      supplierContact: '5432109876',
      lastOrdered: '2024-01-03',
      nextOrder: 'URGENT',
      leadTime: '2 days',
      expiryDate: '2025-03-31',
      usageRate: '30 boxes/week',
      criticalLevel: true,
      notes: 'Essential for all cleaning staff'
    },
    { 
      id: 6, 
      itemCode: 'HK-MOP-006', 
      itemName: 'Microfiber Mop Heads', 
      category: 'Cleaning Tools',
      brand: 'Rubbermaid',
      unit: 'Piece',
      currentStock: 22,
      minStock: 15,
      maxStock: 50,
      reorderPoint: 20,
      status: 'Adequate',
      unitCost: 350,
      totalValue: 7700,
      location: 'Store D, Shelf 2',
      supplier: 'CleanTech Tools',
      supplierContact: '4321098765',
      lastOrdered: '2024-01-08',
      nextOrder: '2024-02-08',
      leadTime: '5 days',
      expiryDate: 'N/A',
      usageRate: '5 pieces/week',
      criticalLevel: false,
      notes: 'Washable and reusable'
    },
    { 
      id: 7, 
      itemCode: 'HK-MSK-007', 
      itemName: 'N95 Masks', 
      category: 'PPE',
      brand: '3M',
      unit: 'Box (50 masks)',
      currentStock: 18,
      minStock: 20,
      maxStock: 100,
      reorderPoint: 25,
      status: 'Low Stock',
      unitCost: 2500,
      totalValue: 45000,
      location: 'Store B, Shelf 2',
      supplier: 'Safety Gear Corp',
      supplierContact: '3210987654',
      lastOrdered: '2024-01-18',
      nextOrder: '2024-01-25',
      leadTime: '3 days',
      expiryDate: '2025-08-31',
      usageRate: '10 boxes/week',
      criticalLevel: false,
      notes: 'For isolation ward and ICU'
    },
    { 
      id: 8, 
      itemCode: 'HK-APR-008', 
      itemName: 'Disposable Aprons', 
      category: 'PPE',
      brand: 'Dupont',
      unit: 'Pack (50 aprons)',
      currentStock: 25,
      minStock: 30,
      maxStock: 150,
      reorderPoint: 35,
      status: 'Low Stock',
      unitCost: 800,
      totalValue: 20000,
      location: 'Store B, Shelf 4',
      supplier: 'MediProtect',
      supplierContact: '2109876543',
      lastOrdered: '2024-01-14',
      nextOrder: '2024-01-24',
      leadTime: '2 days',
      expiryDate: '2025-05-31',
      usageRate: '15 packs/week',
      criticalLevel: false,
      notes: 'For biohazard cleaning'
    },
    { 
      id: 9, 
      itemCode: 'HK-SPK-009', 
      itemName: 'Glass Cleaner Spray', 
      category: 'Cleaning Chemicals',
      brand: 'Windex',
      unit: '500ml Bottle',
      currentStock: 40,
      minStock: 25,
      maxStock: 100,
      reorderPoint: 30,
      status: 'Adequate',
      unitCost: 120,
      totalValue: 4800,
      location: 'Store A, Shelf 1',
      supplier: 'CleanPro Distributors',
      supplierContact: '8765432109',
      lastOrdered: '2024-01-20',
      nextOrder: '2024-02-20',
      leadTime: '2 days',
      expiryDate: '2025-01-31',
      usageRate: '20 bottles/week',
      criticalLevel: false,
      notes: 'For windows and glass surfaces'
    },
    { 
      id: 10, 
      itemCode: 'HK-BRS-010', 
      itemName: 'Toilet Bowl Cleaner', 
      category: 'Sanitation',
      brand: 'Harpic',
      unit: 'Liter',
      currentStock: 28,
      minStock: 20,
      maxStock: 80,
      reorderPoint: 25,
      status: 'Adequate',
      unitCost: 220,
      totalValue: 6160,
      location: 'Store A, Shelf 4',
      supplier: 'MediClean Supplies',
      supplierContact: '9876543210',
      lastOrdered: '2024-01-16',
      nextOrder: '2024-02-16',
      leadTime: '3 days',
      expiryDate: '2025-03-31',
      usageRate: '12L/week',
      criticalLevel: false,
      notes: 'Strong formula for tough stains'
    },
  ]);

  // Suppliers Data
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'MediClean Supplies', contact: '9876543210', email: 'orders@mediclean.com', rating: '4.8', deliveryTime: '3 days', category: 'Chemicals' },
    { id: 2, name: 'CleanPro Distributors', contact: '8765432109', email: 'sales@cleanpro.com', rating: '4.6', deliveryTime: '2 days', category: 'Cleaning Tools' },
    { id: 3, name: 'HealthFirst Supplies', contact: '7654321098', email: 'support@healthfirst.com', rating: '4.9', deliveryTime: '1 day', category: 'Sanitation' },
    { id: 4, name: 'SafetyFirst Medical', contact: '6543210987', email: 'info@safetyfirst.com', rating: '4.7', deliveryTime: '4 days', category: 'Disposables' },
    { id: 5, name: 'PPE Suppliers Inc', contact: '5432109876', email: 'orders@ppesuppliers.com', rating: '4.5', deliveryTime: '2 days', category: 'PPE' },
  ]);

  // Statistics
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStockItems: 0,
    criticalItems: 0,
    itemsToReorder: 0,
    avgStockLevel: 0
  });

  // Order History
  const [orderHistory, setOrderHistory] = useState([
    { id: 1, orderNo: 'ORD-2024-001', supplier: 'MediClean Supplies', items: 5, amount: 12500, status: 'Delivered', date: '2024-01-15' },
    { id: 2, orderNo: 'ORD-2024-002', supplier: 'CleanPro Distributors', items: 8, amount: 9600, status: 'Delivered', date: '2024-01-10' },
    { id: 3, orderNo: 'ORD-2024-003', supplier: 'HealthFirst Supplies', items: 3, amount: 5400, status: 'In Transit', date: '2024-01-18' },
    { id: 4, orderNo: 'ORD-2024-004', supplier: 'PPE Suppliers Inc', items: 12, amount: 14400, status: 'Pending', date: '2024-01-20' },
  ]);

  // Update stock level
  const updateStockLevel = (id, newStock) => {
    if (newStock < 0) return;
    
    setSupplies(supplies.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, currentStock: newStock };
        
        // Update status based on new stock level
        if (newStock <= item.reorderPoint) {
          updatedItem.status = newStock <= item.minStock ? 'Critical' : 'Low Stock';
          updatedItem.criticalLevel = newStock <= item.minStock;
        } else {
          updatedItem.status = 'Adequate';
          updatedItem.criticalLevel = false;
        }
        
        updatedItem.totalValue = newStock * item.unitCost;
        return updatedItem;
      }
      return item;
    }));
  };

  // Place new order
  const placeNewOrder = (itemId, quantity) => {
    const item = supplies.find(s => s.id === itemId);
    if (!item) return;

    const newOrder = {
      id: orderHistory.length + 1,
      orderNo: `ORD-2024-${(orderHistory.length + 1).toString().padStart(3, '0')}`,
      supplier: item.supplier,
      items: 1,
      amount: quantity * item.unitCost,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    setOrderHistory([...orderHistory, newOrder]);
    updateStockLevel(itemId, item.currentStock + quantity);
  };

  // Reorder all critical items
  const reorderCriticalItems = () => {
    const criticalItems = supplies.filter(item => item.criticalLevel || item.status === 'Low Stock');
    
    criticalItems.forEach(item => {
      const reorderQuantity = item.maxStock - item.currentStock;
      if (reorderQuantity > 0) {
        placeNewOrder(item.id, reorderQuantity);
      }
    });
  };

  // Add new supply item
  const addNewSupply = () => {
    const newItem = {
      id: supplies.length + 1,
      itemCode: `HK-NEW-${(supplies.length + 1).toString().padStart(3, '0')}`,
      itemName: 'New Item',
      category: 'Cleaning Chemicals',
      brand: 'New Brand',
      unit: 'Piece',
      currentStock: 0,
      minStock: 10,
      maxStock: 100,
      reorderPoint: 15,
      status: 'Critical',
      unitCost: 0,
      totalValue: 0,
      location: 'To be assigned',
      supplier: 'Select Supplier',
      supplierContact: '',
      lastOrdered: new Date().toISOString().split('T')[0],
      nextOrder: 'ASAP',
      leadTime: '3 days',
      expiryDate: '2024-12-31',
      usageRate: 'To be calculated',
      criticalLevel: true,
      notes: 'New item - update details'
    };
    
    setSupplies([...supplies, newItem]);
  };

  // Delete supply item
  const deleteSupply = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setSupplies(supplies.filter(item => item.id !== id));
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Adequate': return 'hk-supplies-status-adequate';
      case 'Low Stock': return 'hk-supplies-status-low';
      case 'Critical': return 'hk-supplies-status-critical';
      default: return 'hk-supplies-status-default';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Cleaning Chemicals': return <FaSprayCan />;
      case 'Sanitation': return <FaHandSparkles />;
      case 'Disposables': return <FaTrashAlt />;
      case 'PPE': return <FaGlasses />;
      case 'Cleaning Tools': return <FaBroom />;
      default: return <FaBox />;
    }
  };

  // Calculate stock percentage
  const getStockPercentage = (item) => {
    return Math.min(100, (item.currentStock / item.maxStock) * 100);
  };

  // Calculate days of supply
  const getDaysOfSupply = (item) => {
    const weeklyUsage = parseInt(item.usageRate);
    if (isNaN(weeklyUsage) || weeklyUsage === 0) return 'N/A';
    const days = Math.floor((item.currentStock / weeklyUsage) * 7);
    return `${days} days`;
  };

  // Filter supplies
  const filteredSupplies = supplies.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSupplier = selectedSupplier === 'all' || item.supplier === selectedSupplier;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSupplier;
  });

  // Update statistics
  useEffect(() => {
    const totalItems = supplies.length;
    const totalValue = supplies.reduce((sum, item) => sum + item.totalValue, 0);
    const lowStockItems = supplies.filter(item => item.status === 'Low Stock').length;
    const criticalItems = supplies.filter(item => item.status === 'Critical').length;
    const itemsToReorder = supplies.filter(item => item.currentStock <= item.reorderPoint).length;
    const avgStockLevel = supplies.reduce((sum, item) => sum + getStockPercentage(item), 0) / totalItems;

    setStats({
      totalItems,
      totalValue,
      lowStockItems,
      criticalItems,
      itemsToReorder,
      avgStockLevel: Math.round(avgStockLevel)
    });
  }, [supplies]);

  return (
    <div className="hk-supplies-container">
      {/* Header */}
      <div className="hk-supplies-header">
        <div className="hk-supplies-title-section">
          <h1 className="hk-supplies-title">
            <FaBox className="hk-supplies-title-icon" />
            Supplies Management
          </h1>
          <p className="hk-supplies-subtitle">
            Manage inventory, track stock levels, and automate reordering for all housekeeping supplies
          </p>
        </div>
        <div className="hk-supplies-header-actions">
          <button className="hk-supplies-btn-primary" onClick={addNewSupply}>
            <FaPlus /> Add New Item
          </button>
          <button className="hk-supplies-btn-secondary" onClick={reorderCriticalItems}>
            <FaShoppingCart /> Reorder Critical
          </button>
          <button className="hk-supplies-btn-refresh">
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="hk-supplies-stats-section">
        <h2 className="hk-supplies-section-title">
          <FaChartLine /> Inventory Overview
        </h2>
        <div className="hk-supplies-stats-grid">
          <div className="hk-supplies-stat-card hk-supplies-stat-total">
            <div className="hk-supplies-stat-icon">
              <FaBoxOpen />
            </div>
            <div className="hk-supplies-stat-content">
              <h3>{stats.totalItems}</h3>
              <p>Total Items</p>
            </div>
            <div className="hk-supplies-stat-trend">
              <span className="hk-supplies-trend-up">↑ 8%</span>
            </div>
          </div>

          <div className="hk-supplies-stat-card hk-supplies-stat-value">
            <div className="hk-supplies-stat-icon">
              <FaDollarSign />
            </div>
            <div className="hk-supplies-stat-content">
              <h3>₹{stats.totalValue.toLocaleString()}</h3>
              <p>Total Inventory Value</p>
            </div>
            <div className="hk-supplies-stat-detail">
              <FaPercentage /> {stats.avgStockLevel}% avg stock
            </div>
          </div>

          <div className="hk-supplies-stat-card hk-supplies-stat-low">
            <div className="hk-supplies-stat-icon">
              <FaClock />
            </div>
            <div className="hk-supplies-stat-content">
              <h3>{stats.lowStockItems}</h3>
              <p>Low Stock Items</p>
            </div>
            <div className="hk-supplies-stat-trend">
              <span className="hk-supplies-trend-down">↓ 12%</span>
            </div>
          </div>

          <div className="hk-supplies-stat-card hk-supplies-stat-critical">
            <div className="hk-supplies-stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="hk-supplies-stat-content">
              <h3>{stats.criticalItems}</h3>
              <p>Critical Items</p>
            </div>
            <div className="hk-supplies-stat-trend">
              <span className="hk-supplies-trend-up">↑ 5%</span>
            </div>
          </div>

          <div className="hk-supplies-stat-card hk-supplies-stat-reorder">
            <div className="hk-supplies-stat-icon">
              <FaShoppingCart />
            </div>
            <div className="hk-supplies-stat-content">
              <h3>{stats.itemsToReorder}</h3>
              <p>Items to Reorder</p>
            </div>
            <div className="hk-supplies-stat-action">
              <button className="hk-supplies-quick-reorder" onClick={reorderCriticalItems}>
                Reorder All
              </button>
            </div>
          </div>

          <div className="hk-supplies-stat-card hk-supplies-stat-suppliers">
            <div className="hk-supplies-stat-icon">
              <FaTruck />
            </div>
            <div className="hk-supplies-stat-content">
              <h3>{suppliers.length}</h3>
              <p>Active Suppliers</p>
            </div>
            <div className="hk-supplies-stat-detail">
              Avg rating: 4.7/5
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="hk-supplies-categories-section">
        <h2 className="hk-supplies-section-title">
          <FaTag /> Category Distribution
        </h2>
        <div className="hk-supplies-categories-grid">
          {['Cleaning Chemicals', 'PPE', 'Sanitation', 'Disposables', 'Cleaning Tools'].map(category => {
            const categoryItems = supplies.filter(item => item.category === category);
            const categoryValue = categoryItems.reduce((sum, item) => sum + item.totalValue, 0);
            const categoryCount = categoryItems.length;
            
            return (
              <div key={category} className="hk-supplies-category-card">
                <div className="hk-supplies-category-icon">
                  {getCategoryIcon(category)}
                </div>
                <div className="hk-supplies-category-info">
                  <h3>{category}</h3>
                  <div className="hk-supplies-category-stats">
                    <span className="hk-supplies-category-count">{categoryCount} items</span>
                    <span className="hk-supplies-category-value">₹{categoryValue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="hk-supplies-category-progress">
                  <div 
                    className="hk-supplies-category-progress-bar"
                    style={{ width: `${(categoryCount / supplies.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters Section */}
      <div className="hk-supplies-filters-section">
        <div className="hk-supplies-search-container">
          <FaSearch className="hk-supplies-search-icon" />
          <input
            type="text"
            placeholder="Search by item name, code, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hk-supplies-search-input"
          />
        </div>

        <div className="hk-supplies-filter-group">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="hk-supplies-filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Cleaning Chemicals">Cleaning Chemicals</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Disposables">Disposables</option>
            <option value="PPE">PPE</option>
            <option value="Cleaning Tools">Cleaning Tools</option>
          </select>

          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="hk-supplies-filter-select"
          >
            <option value="all">All Status</option>
            <option value="Adequate">Adequate Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Critical">Critical</option>
          </select>

          <select 
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="hk-supplies-filter-select"
          >
            <option value="all">All Suppliers</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>

          <button className="hk-supplies-filter-btn">
            <FaFilter /> Apply Filters
          </button>
          <button className="hk-supplies-reset-btn">
            <FaSync /> Reset
          </button>
          <button className="hk-supplies-export-btn">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="hk-supplies-table-section">
        <div className="hk-supplies-table-header">
          <h2 className="hk-supplies-section-title">
            <FaClipboardList /> Inventory Details
          </h2>
          <div className="hk-supplies-table-info">
            <span className="hk-supplies-table-count">
              Showing {filteredSupplies.length} of {supplies.length} items
            </span>
            <button className="hk-supplies-btn-print">
              <FaPrint /> Print Report
            </button>
          </div>
        </div>

        <div className="hk-supplies-table-container">
          <table className="hk-supplies-table">
            <thead>
              <tr>
                <th className="hk-supplies-th-item">Item Details</th>
                <th className="hk-supplies-th-stock">Stock Level</th>
                <th className="hk-supplies-th-finance">Financials</th>
                <th className="hk-supplies-th-supplier">Supplier Info</th>
                <th className="hk-supplies-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupplies.map((item) => (
                <tr key={item.id} className="hk-supplies-table-row">
                  {/* Item Details Column */}
                  <td className="hk-supplies-td-details">
                    <div className="hk-supplies-item-details">
                      <div className="hk-supplies-item-basic">
                        <div className="hk-supplies-item-code-section">
                          <FaBarcode className="hk-supplies-barcode-icon" />
                          <div>
                            <div className="hk-supplies-item-code">{item.itemCode}</div>
                            <div className="hk-supplies-item-name">{item.itemName}</div>
                          </div>
                        </div>
                        <div className="hk-supplies-item-meta">
                          <span className="hk-supplies-item-category">
                            {getCategoryIcon(item.category)}
                            {item.category}
                          </span>
                          <span className="hk-supplies-item-brand">
                            <FaTag /> {item.brand}
                          </span>
                          <span className="hk-supplies-item-unit">
                            <FaBalanceScale /> {item.unit}
                          </span>
                        </div>
                      </div>
                      
                      <div className="hk-supplies-item-notes">
                        <div className="hk-supplies-item-location">
                          <FaWarehouse /> {item.location}
                        </div>
                        {item.notes && (
                          <div className="hk-supplies-notes">
                            <small>{item.notes}</small>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Stock Level Column */}
                  <td className="hk-supplies-td-stock">
                    <div className="hk-supplies-stock-info">
                      <div className="hk-supplies-stock-levels">
                        <div className="hk-supplies-stock-current">
                          <div className="hk-supplies-stock-label">Current:</div>
                          <div className="hk-supplies-stock-value">{item.currentStock}</div>
                        </div>
                        <div className="hk-supplies-stock-minmax">
                          <div className="hk-supplies-stock-range">
                            <span className="hk-supplies-range-min">Min: {item.minStock}</span>
                            <span className="hk-supplies-range-max">Max: {item.maxStock}</span>
                          </div>
                          <div className="hk-supplies-reorder-point">
                            Reorder at: {item.reorderPoint}
                          </div>
                        </div>
                      </div>
                      
                      <div className="hk-supplies-stock-progress">
                        <div className="hk-supplies-progress-bar">
                          <div 
                            className="hk-supplies-progress-fill"
                            style={{ width: `${getStockPercentage(item)}%` }}
                          ></div>
                        </div>
                        <div className="hk-supplies-progress-labels">
                          <span className="hk-supplies-progress-percentage">
                            {Math.round(getStockPercentage(item))}%
                          </span>
                          <span className="hk-supplies-stock-status">
                            <span className={`hk-supplies-status-badge ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="hk-supplies-stock-controls">
                        <div className="hk-supplies-stock-adjust">
                          <button 
                            className="hk-supplies-stock-btn hk-supplies-stock-decrease"
                            onClick={() => updateStockLevel(item.id, item.currentStock - 1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="hk-supplies-stock-input"
                            value={item.currentStock}
                            onChange={(e) => updateStockLevel(item.id, parseInt(e.target.value) || 0)}
                            min="0"
                          />
                          <button 
                            className="hk-supplies-stock-btn hk-supplies-stock-increase"
                            onClick={() => updateStockLevel(item.id, item.currentStock + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="hk-supplies-days-supply">
                          Supply: {getDaysOfSupply(item)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Financials Column */}
                  <td className="hk-supplies-td-finance">
                    <div className="hk-supplies-finance-info">
                      <div className="hk-supplies-unit-cost">
                        <div className="hk-supplies-cost-label">Unit Cost:</div>
                        <div className="hk-supplies-cost-value">₹{item.unitCost}</div>
                      </div>
                      
                      <div className="hk-supplies-total-value">
                        <div className="hk-supplies-value-label">Total Value:</div>
                        <div className="hk-supplies-value-amount">₹{item.totalValue.toLocaleString()}</div>
                      </div>
                      
                      <div className="hk-supplies-finance-details">
                        <div className="hk-supplies-usage-rate">
                          <FaChartLine /> Usage: {item.usageRate}
                        </div>
                        <div className="hk-supplies-expiry">
                          <FaCalendarAlt /> Expiry: {item.expiryDate}
                        </div>
                      </div>
                      
                      <div className="hk-supplies-reorder-info">
                        <div className="hk-supplies-last-ordered">
                          Last ordered: {item.lastOrdered}
                        </div>
                        <div className="hk-supplies-next-order">
                          Next order: 
                          <span className={`hk-supplies-next-order-date ${
                            item.nextOrder === 'ASAP' || item.nextOrder === 'URGENT' 
                              ? 'hk-supplies-urgent' 
                              : ''
                          }`}>
                            {item.nextOrder}
                          </span>
                        </div>
                        <div className="hk-supplies-lead-time">
                          Lead time: {item.leadTime}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Supplier Info Column */}
                  <td className="hk-supplies-td-supplier">
                    <div className="hk-supplies-supplier-info">
                      <div className="hk-supplies-supplier-details">
                        <div className="hk-supplies-supplier-name">
                          <FaUser /> {item.supplier}
                        </div>
                        <div className="hk-supplies-supplier-contact">
                          <FaPhone /> {item.supplierContact}
                        </div>
                        <div className="hk-supplies-supplier-email">
                          <FaEnvelope /> {suppliers.find(s => s.name === item.supplier)?.email || 'N/A'}
                        </div>
                      </div>
                      
                      <div className="hk-supplies-supplier-rating">
                        {suppliers.find(s => s.name === item.supplier)?.rating && (
                          <div className="hk-supplies-rating-stars">
                            {'★'.repeat(Math.floor(parseFloat(suppliers.find(s => s.name === item.supplier)?.rating)))}
                            <span className="hk-supplies-rating-number">
                              {suppliers.find(s => s.name === item.supplier)?.rating}/5
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="hk-supplies-order-quantity">
                        <select 
                          className="hk-supplies-order-select"
                          defaultValue="10"
                        >
                          <option value="5">5 units</option>
                          <option value="10">10 units</option>
                          <option value="25">25 units</option>
                          <option value="50">50 units</option>
                          <option value="100">100 units</option>
                        </select>
                        <button 
                          className="hk-supplies-order-btn"
                          onClick={() => placeNewOrder(item.id, 10)}
                        >
                          <FaShoppingCart /> Order
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="hk-supplies-td-actions">
                    <div className="hk-supplies-action-buttons">
                      <button 
                        className="hk-supplies-action-btn hk-supplies-action-view"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="hk-supplies-action-btn hk-supplies-action-edit"
                        title="Edit Item"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="hk-supplies-action-btn hk-supplies-action-order"
                        title="Place Order"
                        onClick={() => placeNewOrder(item.id, item.maxStock - item.currentStock)}
                      >
                        <FaShoppingCart />
                      </button>
                      <button 
                        className="hk-supplies-action-btn hk-supplies-action-delete"
                        title="Delete Item"
                        onClick={() => deleteSupply(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    <div className="hk-supplies-critical-indicator">
                      {item.criticalLevel && (
                        <div className="hk-supplies-critical-alert">
                          <FaExclamationTriangle /> CRITICAL
                        </div>
                      )}
                    </div>
                    
                    <div className="hk-supplies-quick-actions">
                      <button 
                        className="hk-supplies-quick-btn hk-supplies-btn-reorder"
                        onClick={() => placeNewOrder(item.id, item.reorderPoint)}
                      >
                        Reorder
                      </button>
                      <button className="hk-supplies-quick-btn hk-supplies-btn-history">
                        <FaHistory />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredSupplies.length === 0 && (
          <div className="hk-supplies-no-results">
            <FaBox className="hk-supplies-no-results-icon" />
            <h3>No supplies found matching your criteria</h3>
            <p>Try adjusting your filters or add new items</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="hk-supplies-table-footer">
          <div className="hk-supplies-pagination">
            <button className="hk-supplies-page-btn">← Previous</button>
            <span className="hk-supplies-page-info">Page 1 of 2</span>
            <button className="hk-supplies-page-btn">Next →</button>
          </div>
          
          <div className="hk-supplies-summary">
            <div className="hk-supplies-summary-stats">
              <span className="hk-supplies-summary-item">
                <span className="hk-supplies-summary-dot hk-supplies-summary-adequate"></span>
                Adequate: {supplies.filter(s => s.status === 'Adequate').length}
              </span>
              <span className="hk-supplies-summary-item">
                <span className="hk-supplies-summary-dot hk-supplies-summary-low"></span>
                Low Stock: {stats.lowStockItems}
              </span>
              <span className="hk-supplies-summary-item">
                <span className="hk-supplies-summary-dot hk-supplies-summary-critical"></span>
                Critical: {stats.criticalItems}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers & Orders Section */}
      <div className="hk-supplies-orders-section">
        <div className="hk-supplies-orders-grid">
          {/* Suppliers List */}
          <div className="hk-supplies-suppliers-card">
            <div className="hk-supplies-card-header">
              <h3 className="hk-supplies-card-title">
                <FaTruck /> Active Suppliers
              </h3>
              <button className="hk-supplies-card-action">
                <FaPlus /> Add Supplier
              </button>
            </div>
            <div className="hk-supplies-suppliers-list">
              {suppliers.map(supplier => (
                <div key={supplier.id} className="hk-supplies-supplier-item">
                  <div className="hk-supplies-supplier-avatar">
                    {supplier.name.charAt(0)}
                  </div>
                  <div className="hk-supplies-supplier-info">
                    <h4>{supplier.name}</h4>
                    <div className="hk-supplies-supplier-details">
                      <span>{supplier.category}</span>
                      <span>•</span>
                      <span>{supplier.deliveryTime} delivery</span>
                    </div>
                  </div>
                  <div className="hk-supplies-supplier-rating">
                    <span className="hk-supplies-rating-badge">{supplier.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order History */}
          <div className="hk-supplies-orders-card">
            <div className="hk-supplies-card-header">
              <h3 className="hk-supplies-card-title">
                <FaHistory /> Recent Orders
              </h3>
              <button className="hk-supplies-card-action">
                <FaPlus /> New Order
              </button>
            </div>
            <div className="hk-supplies-orders-list">
              {orderHistory.map(order => (
                <div key={order.id} className="hk-supplies-order-item">
                  <div className="hk-supplies-order-header">
                    <div className="hk-supplies-order-number">{order.orderNo}</div>
                    <span className={`hk-supplies-order-status hk-supplies-status-${order.status.toLowerCase().replace(' ', '')}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="hk-supplies-order-details">
                    <div className="hk-supplies-order-supplier">{order.supplier}</div>
                    <div className="hk-supplies-order-meta">
                      <span>{order.items} items</span>
                      <span>•</span>
                      <span>₹{order.amount.toLocaleString()}</span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="hk-supplies-quick-actions-section">
        <h2 className="hk-supplies-section-title">
          <FaBarcode /> Quick Actions
        </h2>
        <div className="hk-supplies-quick-grid">
          <button className="hk-supplies-quick-action hk-supplies-action-inventory">
            <FaClipboardList /> Take Inventory
          </button>
          <button className="hk-supplies-quick-action hk-supplies-action-order">
            <FaShoppingCart /> Bulk Order
          </button>
          <button className="hk-supplies-quick-action hk-supplies-action-report">
            <FaPrint /> Stock Report
          </button>
          <button className="hk-supplies-quick-action hk-supplies-action-alert">
            <FaExclamationTriangle /> Set Alerts
          </button>
          <button className="hk-supplies-quick-action hk-supplies-action-audit">
            <FaBalanceScale /> Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuppliesManagement;