import React, { useState, useEffect } from 'react';
import './InventoryMenu.css';

const InventoryMenu = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, table, cards
  const [selectedSupplier, setSelectedSupplier] = useState('all');

  // Sample inventory data
  const sampleInventoryItems = [
    {
      id: 'INV001',
      name: 'Sterile Gloves (Latex)',
      category: 'Consumables',
      subCategory: 'PPE',
      description: 'Sterile latex surgical gloves, powder-free, size M',
      sku: 'GLV-LTX-M-100',
      barcode: '8901234567890',
      quantity: 1250,
      unit: 'pairs',
      reorderLevel: 500,
      minStock: 200,
      maxStock: 2000,
      location: 'Store Room A1',
      shelf: 'Shelf 3, Row B',
      status: 'in-stock',
      unitPrice: '₹15',
      totalValue: '₹18,750',
      supplier: 'MediSafe Supplies',
      supplierCode: 'MS-GLV001',
      lastOrdered: '2023-10-10',
      lastReceived: '2023-10-12',
      expiryDate: '2025-06-30',
      batchNumber: 'BATCH-2023-06',
      temperature: 'Room Temp',
      notes: 'Check for latex allergies',
      usageRate: 'High',
      critical: false
    },
    {
      id: 'INV002',
      name: '3ml Syringe with Needle',
      category: 'Consumables',
      subCategory: 'Injection Supplies',
      description: 'Sterile 3ml syringe with 23G needle',
      sku: 'SYR-3ML-23G-500',
      barcode: '8901234567891',
      quantity: 3200,
      unit: 'pieces',
      reorderLevel: 1000,
      minStock: 500,
      maxStock: 5000,
      location: 'Store Room A2',
      shelf: 'Shelf 1, Row A',
      status: 'in-stock',
      unitPrice: '₹8',
      totalValue: '₹25,600',
      supplier: 'Healthcare Products Ltd.',
      supplierCode: 'HPL-SYR003',
      lastOrdered: '2023-10-05',
      lastReceived: '2023-10-08',
      expiryDate: '2025-12-31',
      batchNumber: 'BATCH-2023-08',
      temperature: 'Room Temp',
      notes: 'Single use only',
      usageRate: 'Very High',
      critical: true
    },
    {
      id: 'INV003',
      name: 'IV Cannula 18G',
      category: 'Consumables',
      subCategory: 'IV Supplies',
      description: 'Sterile intravenous cannula 18G with wings',
      sku: 'IVC-18G-1000',
      barcode: '8901234567892',
      quantity: 450,
      unit: 'pieces',
      reorderLevel: 300,
      minStock: 150,
      maxStock: 1000,
      location: 'Emergency Store',
      shelf: 'Shelf 2, Row C',
      status: 'low-stock',
      unitPrice: '₹35',
      totalValue: '₹15,750',
      supplier: 'Venous Access Inc.',
      supplierCode: 'VAI-IVC18',
      lastOrdered: '2023-09-20',
      lastReceived: '2023-09-25',
      expiryDate: '2025-03-31',
      batchNumber: 'BATCH-2023-07',
      temperature: 'Room Temp',
      notes: 'Emergency use priority',
      usageRate: 'High',
      critical: true
    },
    {
      id: 'INV004',
      name: 'Blood Collection Tube (EDTA)',
      category: 'Lab Supplies',
      subCategory: 'Collection Tubes',
      description: '4ml EDTA tube for hematology testing',
      sku: 'BCT-EDTA-4ML',
      barcode: '8901234567893',
      quantity: 2800,
      unit: 'pieces',
      reorderLevel: 1000,
      minStock: 500,
      maxStock: 4000,
      location: 'Lab Store',
      shelf: 'Shelf 4, Row A',
      status: 'in-stock',
      unitPrice: '₹12',
      totalValue: '₹33,600',
      supplier: 'LabTech Supplies',
      supplierCode: 'LTS-BCT04',
      lastOrdered: '2023-10-01',
      lastReceived: '2023-10-03',
      expiryDate: '2024-09-30',
      batchNumber: 'BATCH-2023-05',
      temperature: 'Room Temp',
      notes: 'For CBC tests',
      usageRate: 'Medium',
      critical: false
    },
    {
      id: 'INV005',
      name: 'Surgical Mask (N95)',
      category: 'Consumables',
      subCategory: 'PPE',
      description: 'N95 surgical respirator mask',
      sku: 'MSK-N95-100',
      barcode: '8901234567894',
      quantity: 150,
      unit: 'pieces',
      reorderLevel: 200,
      minStock: 100,
      maxStock: 500,
      location: 'PPE Store',
      shelf: 'Shelf 1, Row B',
      status: 'critical',
      unitPrice: '₹85',
      totalValue: '₹12,750',
      supplier: 'SafeGuard Medical',
      supplierCode: 'SGM-N95',
      lastOrdered: '2023-09-15',
      lastReceived: '2023-09-18',
      expiryDate: '2025-01-31',
      batchNumber: 'BATCH-2023-04',
      temperature: 'Room Temp',
      notes: 'Restock urgently needed',
      usageRate: 'High',
      critical: true
    },
    {
      id: 'INV006',
      name: 'Alcohol Swabs',
      category: 'Consumables',
      subCategory: 'Disinfectants',
      description: 'Sterile alcohol swabs (70% isopropyl)',
      sku: 'ALC-SWP-1000',
      barcode: '8901234567895',
      quantity: 5200,
      unit: 'pieces',
      reorderLevel: 2000,
      minStock: 1000,
      maxStock: 8000,
      location: 'Store Room B1',
      shelf: 'Shelf 3, Row A',
      status: 'in-stock',
      unitPrice: '₹2',
      totalValue: '₹10,400',
      supplier: 'Disinfect Solutions',
      supplierCode: 'DS-ALC1000',
      lastOrdered: '2023-10-08',
      lastReceived: '2023-10-10',
      expiryDate: '2025-08-31',
      batchNumber: 'BATCH-2023-09',
      temperature: 'Room Temp',
      notes: 'Single use swabs',
      usageRate: 'Very High',
      critical: false
    },
    {
      id: 'INV007',
      name: 'Glucose Test Strips',
      category: 'Lab Supplies',
      subCategory: 'Diagnostic',
      description: 'Test strips for glucose monitoring device',
      sku: 'GLC-STRP-50',
      barcode: '8901234567896',
      quantity: 45,
      unit: 'packs',
      reorderLevel: 20,
      minStock: 10,
      maxStock: 100,
      location: 'Lab Store',
      shelf: 'Shelf 2, Row B',
      status: 'out-of-stock',
      unitPrice: '₹1,200',
      totalValue: '₹54,000',
      supplier: 'Diabetic Care Inc.',
      supplierCode: 'DCI-GLC50',
      lastOrdered: '2023-09-25',
      lastReceived: '2023-09-28',
      expiryDate: '2024-06-30',
      batchNumber: 'BATCH-2023-03',
      temperature: 'Room Temp',
      notes: 'Compatible with GlucoCheck device',
      usageRate: 'Medium',
      critical: true
    },
    {
      id: 'INV008',
      name: 'Thermometer Probe Covers',
      category: 'Consumables',
      subCategory: 'Patient Care',
      description: 'Disposable covers for digital thermometers',
      sku: 'THM-COV-1000',
      barcode: '8901234567897',
      quantity: 3200,
      unit: 'pieces',
      reorderLevel: 1000,
      minStock: 500,
      maxStock: 5000,
      location: 'Store Room A1',
      shelf: 'Shelf 5, Row A',
      status: 'in-stock',
      unitPrice: '₹1.5',
      totalValue: '₹4,800',
      supplier: 'Patient Care Supplies',
      supplierCode: 'PCS-THC1000',
      lastOrdered: '2023-10-03',
      lastReceived: '2023-10-05',
      expiryDate: '2026-12-31',
      batchNumber: 'BATCH-2023-10',
      temperature: 'Room Temp',
      notes: 'Fits all standard thermometers',
      usageRate: 'High',
      critical: false
    },
    {
      id: 'INV009',
      name: 'Normal Saline 500ml',
      category: 'Fluids',
      subCategory: 'IV Fluids',
      description: 'Sterile 0.9% sodium chloride injection',
      sku: 'NS-500ML-24',
      barcode: '8901234567898',
      quantity: 120,
      unit: 'bottles',
      reorderLevel: 50,
      minStock: 25,
      maxStock: 200,
      location: 'Pharmacy Store',
      shelf: 'Shelf 4, Row C',
      status: 'low-stock',
      unitPrice: '₹45',
      totalValue: '₹5,400',
      supplier: 'IV Solutions Corp.',
      supplierCode: 'IVC-NS500',
      lastOrdered: '2023-10-12',
      lastReceived: '2023-10-15',
      expiryDate: '2024-08-31',
      batchNumber: 'BATCH-2023-11',
      temperature: 'Room Temp',
      notes: 'Store upright',
      usageRate: 'Very High',
      critical: true
    },
    {
      id: 'INV010',
      name: 'Surgical Blade #11',
      category: 'Surgical',
      subCategory: 'Instruments',
      description: 'Sterile surgical blade size #11',
      sku: 'BLD-11-100',
      barcode: '8901234567899',
      quantity: 850,
      unit: 'pieces',
      reorderLevel: 300,
      minStock: 150,
      maxStock: 1200,
      location: 'Surgical Store',
      shelf: 'Shelf 2, Row A',
      status: 'in-stock',
      unitPrice: '₹25',
      totalValue: '₹21,250',
      supplier: 'SharpEdge Surgical',
      supplierCode: 'SES-BLD11',
      lastOrdered: '2023-09-28',
      lastReceived: '2023-10-02',
      expiryDate: '2025-10-31',
      batchNumber: 'BATCH-2023-08',
      temperature: 'Room Temp',
      notes: 'Handle with care',
      usageRate: 'Medium',
      critical: false
    },
    {
      id: 'INV011',
      name: 'Culture Media Plates',
      category: 'Lab Supplies',
      subCategory: 'Microbiology',
      description: 'Blood agar culture plates',
      sku: 'CMP-BA-50',
      barcode: '8901234567900',
      quantity: 65,
      unit: 'packs',
      reorderLevel: 30,
      minStock: 15,
      maxStock: 100,
      location: 'Microbiology Lab',
      shelf: 'Refrigerator 2',
      status: 'in-stock',
      unitPrice: '₹350',
      totalValue: '₹22,750',
      supplier: 'MicroBio Labs',
      supplierCode: 'MBL-CMPBA',
      lastOrdered: '2023-10-10',
      lastReceived: '2023-10-13',
      expiryDate: '2024-02-28',
      batchNumber: 'BATCH-2023-12',
      temperature: '2-8°C',
      notes: 'Store refrigerated',
      usageRate: 'Low',
      critical: false
    },
    {
      id: 'INV012',
      name: 'ECG Electrodes',
      category: 'Diagnostic',
      subCategory: 'Cardiology',
      description: 'Disposable ECG electrodes',
      sku: 'ECG-ELEC-500',
      barcode: '8901234567901',
      quantity: 180,
      unit: 'packs',
      reorderLevel: 100,
      minStock: 50,
      maxStock: 300,
      location: 'Cardiology Store',
      shelf: 'Shelf 3, Row C',
      status: 'critical',
      unitPrice: '₹180',
      totalValue: '₹32,400',
      supplier: 'CardioCare Supplies',
      supplierCode: 'CCS-ECG500',
      lastOrdered: '2023-09-30',
      lastReceived: '2023-10-03',
      expiryDate: '2025-05-31',
      batchNumber: 'BATCH-2023-07',
      temperature: 'Room Temp',
      notes: 'Check gel integrity',
      usageRate: 'Medium',
      critical: true
    }
  ];

  // Sample suppliers for filter
  const suppliers = [
    'All Suppliers',
    'MediSafe Supplies',
    'Healthcare Products Ltd.',
    'Venous Access Inc.',
    'LabTech Supplies',
    'SafeGuard Medical',
    'Disinfect Solutions',
    'Diabetic Care Inc.',
    'Patient Care Supplies',
    'IV Solutions Corp.',
    'SharpEdge Surgical',
    'MicroBio Labs',
    'CardioCare Supplies'
  ];

  // Simulate API call
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setTimeout(() => {
        setInventoryItems(sampleInventoryItems);
        setFilteredItems(sampleInventoryItems);
        setLoading(false);
      }, 1000);
    };

    fetchInventory();
  }, []);

  // Filter inventory items
  useEffect(() => {
    let filtered = [...inventoryItems];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(item => item.location === locationFilter);
    }

    if (selectedSupplier !== 'all') {
      filtered = filtered.filter(item => item.supplier === selectedSupplier);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.barcode.includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [categoryFilter, statusFilter, locationFilter, selectedSupplier, searchQuery, inventoryItems]);

  const handleStatusChange = (itemId, newStatus) => {
    const updatedItems = inventoryItems.map(item => {
      if (item.id === itemId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    setInventoryItems(updatedItems);
  };

  const handleQuantityUpdate = (itemId, action) => {
    const updatedItems = inventoryItems.map(item => {
      if (item.id === itemId) {
        const currentQty = parseInt(item.quantity);
        let newQty = currentQty;
        
        if (action === 'add') {
          newQty = currentQty + 10;
        } else if (action === 'remove' && currentQty > 0) {
          newQty = currentQty - 10;
        }
        
        // Update status based on new quantity
        let newStatus = item.status;
        if (newQty === 0) {
          newStatus = 'out-of-stock';
        } else if (newQty < item.minStock) {
          newStatus = 'critical';
        } else if (newQty < item.reorderLevel) {
          newStatus = 'low-stock';
        } else {
          newStatus = 'in-stock';
        }
        
        return { 
          ...item, 
          quantity: newQty,
          status: newStatus,
          totalValue: `₹${(newQty * parseInt(item.unitPrice.replace('₹', ''))).toLocaleString()}`
        };
      }
      return item;
    });
    
    setInventoryItems(updatedItems);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleCreateItem = (newItem) => {
    const item = {
      id: `INV${String(inventoryItems.length + 100).padStart(3, '0')}`,
      sku: `SKU-${Math.floor(Math.random() * 10000)}`,
      barcode: `890${Math.floor(Math.random() * 10000000000)}`,
      lastOrdered: new Date().toISOString().split('T')[0],
      lastReceived: new Date().toISOString().split('T')[0],
      status: 'in-stock',
      critical: false,
      usageRate: 'Medium',
      ...newItem
    };
    
    setInventoryItems([item, ...inventoryItems]);
    setShowAddModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'in-stock': return 'inv-status-badge--in-stock';
      case 'low-stock': return 'inv-status-badge--low-stock';
      case 'critical': return 'inv-status-badge--critical';
      case 'out-of-stock': return 'inv-status-badge--out-of-stock';
      default: return 'inv-status-badge--default';
    }
  };

  const getCriticalBadgeClass = (critical) => {
    return critical ? 'inv-critical-badge--yes' : 'inv-critical-badge--no';
  };

  const getStatusCount = (status) => {
    return inventoryItems.filter(item => item.status === status).length;
  };

  const getTotalInventoryValue = () => {
    return inventoryItems.reduce((total, item) => {
      const value = parseInt(item.totalValue.replace(/[^0-9]/g, ''));
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const getLowStockItems = () => {
    return inventoryItems.filter(item => 
      item.status === 'low-stock' || item.status === 'critical'
    ).length;
  };

  const handlePrintLabel = (barcode) => {
    alert(`Printing label for barcode: ${barcode}`);
  };

  const handleReorder = (item) => {
    alert(`Creating purchase order for ${item.name} (Qty: ${item.maxStock - item.quantity})`);
  };

  const handleExportInventory = () => {
    alert(`Exporting ${filteredItems.length} inventory items`);
  };

  const handleGenerateReport = () => {
    alert('Generating inventory report...');
  };

  // Add Item Modal Component
  const AddItemModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: 'Consumables',
      subCategory: '',
      description: '',
      quantity: 0,
      unit: 'pieces',
      reorderLevel: 100,
      minStock: 50,
      maxStock: 500,
      location: 'Store Room A1',
      shelf: '',
      unitPrice: '',
      supplier: 'MediSafe Supplies',
      expiryDate: '',
      temperature: 'Room Temp',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCreateItem(formData);
    };

    return (
      <div className="inv-addmodal-overlay tech-inv-modal-overlay">
        <div className="inv-addmodal tech-inv-addmodal">
          <div className="inv-addmodal-header tech-inv-addmodal-header">
            <h2 className="inv-addmodal-title tech-inv-addmodal-title">
              Add New Inventory Item
            </h2>
            <button 
              className="inv-addmodal-close tech-inv-addmodal-close"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="inv-addmodal-form tech-inv-addmodal-form">
            <div className="inv-addmodal-form-grid tech-inv-addmodal-form-grid">
              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Item Name *</label>
                <input
                  type="text"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Enter item name"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Category *</label>
                <select 
                  className="inv-form-select tech-inv-form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="Consumables">Consumables</option>
                  <option value="Lab Supplies">Lab Supplies</option>
                  <option value="Surgical">Surgical</option>
                  <option value="Fluids">Fluids</option>
                  <option value="Diagnostic">Diagnostic</option>
                  <option value="Pharmaceutical">Pharmaceutical</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Sub Category</label>
                <input
                  type="text"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.subCategory}
                  onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                  placeholder="e.g., PPE, IV Supplies"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Unit *</label>
                <select 
                  className="inv-form-select tech-inv-form-select"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  required
                >
                  <option value="pieces">Pieces</option>
                  <option value="packs">Packs</option>
                  <option value="boxes">Boxes</option>
                  <option value="bottles">Bottles</option>
                  <option value="liters">Liters</option>
                  <option value="kilograms">Kilograms</option>
                  <option value="meters">Meters</option>
                  <option value="pairs">Pairs</option>
                </select>
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Quantity *</label>
                <input
                  type="number"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                  required
                  min="0"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Unit Price *</label>
                <input
                  type="text"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                  required
                  placeholder="e.g., ₹150"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Reorder Level *</label>
                <input
                  type="number"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({...formData, reorderLevel: parseInt(e.target.value) || 0})}
                  required
                  min="0"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Minimum Stock *</label>
                <input
                  type="number"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.minStock}
                  onChange={(e) => setFormData({...formData, minStock: parseInt(e.target.value) || 0})}
                  required
                  min="0"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Maximum Stock *</label>
                <input
                  type="number"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({...formData, maxStock: parseInt(e.target.value) || 0})}
                  required
                  min="0"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Location *</label>
                <select 
                  className="inv-form-select tech-inv-form-select"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                >
                  <option value="Store Room A1">Store Room A1</option>
                  <option value="Store Room A2">Store Room A2</option>
                  <option value="Store Room B1">Store Room B1</option>
                  <option value="Emergency Store">Emergency Store</option>
                  <option value="Lab Store">Lab Store</option>
                  <option value="PPE Store">PPE Store</option>
                  <option value="Pharmacy Store">Pharmacy Store</option>
                  <option value="Surgical Store">Surgical Store</option>
                  <option value="Microbiology Lab">Microbiology Lab</option>
                  <option value="Cardiology Store">Cardiology Store</option>
                </select>
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Shelf Location</label>
                <input
                  type="text"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.shelf}
                  onChange={(e) => setFormData({...formData, shelf: e.target.value})}
                  placeholder="e.g., Shelf 3, Row A"
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Supplier *</label>
                <select 
                  className="inv-form-select tech-inv-form-select"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  required
                >
                  {suppliers.filter(s => s !== 'All Suppliers').map(supplier => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Expiry Date</label>
                <input
                  type="date"
                  className="inv-form-input tech-inv-form-input"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>

              <div className="inv-form-group tech-inv-form-group">
                <label className="inv-form-label tech-inv-form-label">Storage Temperature</label>
                <select 
                  className="inv-form-select tech-inv-form-select"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                >
                  <option value="Room Temp">Room Temperature</option>
                  <option value="2-8°C">Refrigerated (2-8°C)</option>
                  <option value="-20°C">Frozen (-20°C)</option>
                  <option value="Below 25°C">Cool Place (Below 25°C)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="inv-form-group tech-inv-form-group">
              <label className="inv-form-label tech-inv-form-label">Description *</label>
              <textarea
                className="inv-form-textarea tech-inv-form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
                placeholder="Enter detailed description of the item..."
              />
            </div>

            <div className="inv-form-group tech-inv-form-group">
              <label className="inv-form-label tech-inv-form-label">Notes</label>
              <textarea
                className="inv-form-textarea tech-inv-form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="2"
                placeholder="Any additional notes..."
              />
            </div>

            <div className="inv-form-actions tech-inv-form-actions">
              <button 
                type="button"
                className="inv-form-btn inv-form-btn-cancel tech-inv-form-btn tech-inv-form-btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="inv-form-btn inv-form-btn-submit tech-inv-form-btn tech-inv-form-btn-submit"
              >
                Add to Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Quick Actions Component
  const QuickActions = () => {
    const [quickAction, setQuickAction] = useState('');
    const [actionValue, setActionValue] = useState('');

    const handleQuickAction = () => {
      if (quickAction && actionValue) {
        if (quickAction === 'barcode') {
          alert(`Scanning barcode: ${actionValue}`);
        } else if (quickAction === 'search') {
          setSearchQuery(actionValue);
        } else if (quickAction === 'reorder') {
          alert(`Creating reorder for item: ${actionValue}`);
        }
        setQuickAction('');
        setActionValue('');
      }
    };

    return (
      <div className="inv-quick-actions tech-inv-quick-actions">
        <div className="inv-quick-action-select tech-inv-quick-action-select">
          <select 
            className="inv-quick-select tech-inv-quick-select"
            value={quickAction}
            onChange={(e) => setQuickAction(e.target.value)}
          >
            <option value="">Quick Action</option>
            <option value="barcode">Scan Barcode</option>
            <option value="search">Search Item</option>
            <option value="reorder">Reorder Item</option>
            <option value="transfer">Transfer Stock</option>
          </select>
        </div>
        
        {quickAction && (
          <>
            <div className="inv-quick-action-input tech-inv-quick-action-input">
              <input
                type="text"
                className="inv-quick-input tech-inv-quick-input"
                value={actionValue}
                onChange={(e) => setActionValue(e.target.value)}
                placeholder={
                  quickAction === 'barcode' ? 'Enter barcode...' :
                  quickAction === 'search' ? 'Search item...' :
                  quickAction === 'reorder' ? 'Enter item ID...' :
                  'Enter details...'
                }
              />
            </div>
            <button 
              className="inv-quick-action-btn tech-inv-quick-action-btn"
              onClick={handleQuickAction}
            >
              Go
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="inv-container tech-inv-container">
      <header className="inv-header tech-inv-header">
        <div className="inv-header-content tech-inv-header-content">
          <h1 className="inv-title tech-inv-title">AAB Technician - Inventory Management</h1>
          <p className="inv-subtitle tech-inv-subtitle">Track, manage, and optimize hospital inventory</p>
        </div>
        <div className="inv-header-actions tech-inv-header-actions">
          <button 
            className="inv-header-btn inv-header-btn-report tech-inv-header-btn tech-inv-header-btn-report"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
          <button 
            className="inv-header-btn inv-header-btn-export tech-inv-header-btn tech-inv-header-btn-export"
            onClick={handleExportInventory}
          >
            Export Data
          </button>
        </div>
      </header>

      <div className="inv-dashboard tech-inv-dashboard">
        <div className="inv-stats-grid tech-inv-stats-grid">
          <div className="inv-stat-card tech-inv-stat-card inv-stat-card-total tech-inv-stat-card-total">
            <div className="inv-stat-icon tech-inv-stat-icon">📦</div>
            <div className="inv-stat-info tech-inv-stat-info">
              <h3>Total Items</h3>
              <p className="inv-stat-number tech-inv-stat-number">{inventoryItems.length}</p>
            </div>
          </div>
          
          <div className="inv-stat-card tech-inv-stat-card inv-stat-card-value tech-inv-stat-card-value">
            <div className="inv-stat-icon tech-inv-stat-icon">💰</div>
            <div className="inv-stat-info tech-inv-stat-info">
              <h3>Total Value</h3>
              <p className="inv-stat-number tech-inv-stat-number">₹{getTotalInventoryValue().toLocaleString()}</p>
            </div>
          </div>
          
          <div className="inv-stat-card tech-inv-stat-card inv-stat-card-lowstock tech-inv-stat-card-lowstock">
            <div className="inv-stat-icon tech-inv-stat-icon">⚠️</div>
            <div className="inv-stat-info tech-inv-stat-info">
              <h3>Low Stock</h3>
              <p className="inv-stat-number tech-inv-stat-number">{getLowStockItems()}</p>
            </div>
          </div>
          
          <div className="inv-stat-card tech-inv-stat-card inv-stat-card-critical tech-inv-stat-card-critical">
            <div className="inv-stat-icon tech-inv-stat-icon">🚨</div>
            <div className="inv-stat-info tech-inv-stat-info">
              <h3>Critical</h3>
              <p className="inv-stat-number tech-inv-stat-number">{getStatusCount('critical')}</p>
            </div>
          </div>
        </div>

        <div className="inv-controls-section tech-inv-controls-section">
          <div className="inv-search-filters tech-inv-search-filters">
            <div className="inv-search-box tech-inv-search-box">
              <input
                type="text"
                className="inv-search-input tech-inv-search-input"
                placeholder="Search by name, ID, SKU, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="inv-search-icon tech-inv-search-icon">🔍</span>
            </div>

            <div className="inv-filter-group tech-inv-filter-group">
              <label className="inv-filter-label tech-inv-filter-label">Category:</label>
              <select 
                className="inv-filter-select tech-inv-filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Consumables">Consumables</option>
                <option value="Lab Supplies">Lab Supplies</option>
                <option value="Surgical">Surgical</option>
                <option value="Fluids">Fluids</option>
                <option value="Diagnostic">Diagnostic</option>
                <option value="Pharmaceutical">Pharmaceutical</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <div className="inv-filter-group tech-inv-filter-group">
              <label className="inv-filter-label tech-inv-filter-label">Status:</label>
              <select 
                className="inv-filter-select tech-inv-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="critical">Critical</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div className="inv-filter-group tech-inv-filter-group">
              <label className="inv-filter-label tech-inv-filter-label">Location:</label>
              <select 
                className="inv-filter-select tech-inv-filter-select"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="Store Room A1">Store Room A1</option>
                <option value="Store Room A2">Store Room A2</option>
                <option value="Store Room B1">Store Room B1</option>
                <option value="Emergency Store">Emergency Store</option>
                <option value="Lab Store">Lab Store</option>
                <option value="PPE Store">PPE Store</option>
                <option value="Pharmacy Store">Pharmacy Store</option>
                <option value="Surgical Store">Surgical Store</option>
              </select>
            </div>

            <div className="inv-filter-group tech-inv-filter-group">
              <label className="inv-filter-label tech-inv-filter-label">Supplier:</label>
              <select 
                className="inv-filter-select tech-inv-filter-select"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
              >
                {suppliers.map(supplier => (
                  <option key={supplier} value={supplier === 'All Suppliers' ? 'all' : supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="inv-action-section tech-inv-action-section">
            <QuickActions />
            
            <div className="inv-view-mode tech-inv-view-mode">
              <button 
                className={`inv-view-btn inv-view-btn-grid tech-inv-view-btn ${viewMode === 'grid' ? 'tech-inv-view-btn-active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <span className="inv-view-icon tech-inv-view-icon">▦</span>
                Grid
              </button>
              <button 
                className={`inv-view-btn inv-view-btn-table tech-inv-view-btn ${viewMode === 'table' ? 'tech-inv-view-btn-active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <span className="inv-view-icon tech-inv-view-icon">≡</span>
                Table
              </button>
              <button 
                className={`inv-view-btn inv-view-btn-cards tech-inv-view-btn ${viewMode === 'cards' ? 'tech-inv-view-btn-active' : ''}`}
                onClick={() => setViewMode('cards')}
              >
                <span className="inv-view-icon tech-inv-view-icon">📇</span>
                Cards
              </button>
            </div>

            <div className="inv-main-actions tech-inv-main-actions">
              <button 
                className="inv-action-btn inv-action-btn-primary tech-inv-action-btn tech-inv-action-btn-primary"
                onClick={handleAddItem}
              >
                <span className="inv-btn-icon tech-inv-btn-icon">+</span>
                Add Item
              </button>
              <button 
                className="inv-action-btn inv-action-btn-secondary tech-inv-action-btn tech-inv-action-btn-secondary"
                onClick={() => alert('Opening stock take...')}
              >
                <span className="inv-btn-icon tech-inv-btn-icon">📋</span>
                Stock Take
              </button>
              <button 
                className="inv-action-btn inv-action-btn-tertiary tech-inv-action-btn tech-inv-action-btn-tertiary"
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setLocationFilter('all');
                  setSelectedSupplier('all');
                  setSearchQuery('');
                }}
              >
                <span className="inv-btn-icon tech-inv-btn-icon">🔄</span>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="inv-main-content tech-inv-main-content">
        {loading ? (
          <div className="inv-loading-state tech-inv-loading-state">
            <div className="inv-loading-spinner tech-inv-loading-spinner"></div>
            <p className="inv-loading-text tech-inv-loading-text">Loading inventory data...</p>
          </div>
        ) : (
          <>
            <div className="inv-results-header tech-inv-results-header">
              <h2 className="inv-results-title tech-inv-results-title">
                Inventory Items <span className="inv-results-count tech-inv-results-count">({filteredItems.length})</span>
              </h2>
              <div className="inv-results-summary tech-inv-results-summary">
                <span className="inv-summary-item tech-inv-summary-item">
                  <strong>Total Value:</strong> ₹{filteredItems.reduce((total, item) => {
                    const value = parseInt(item.totalValue.replace(/[^0-9]/g, ''));
                    return total + (isNaN(value) ? 0 : value);
                  }, 0).toLocaleString()}
                </span>
                <span className="inv-summary-item tech-inv-summary-item">
                  <strong>Critical Items:</strong> {filteredItems.filter(item => item.status === 'critical').length}
                </span>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="inv-empty-state tech-inv-empty-state">
                <div className="inv-empty-icon tech-inv-empty-icon">📦</div>
                <h3 className="inv-empty-title tech-inv-empty-title">No Inventory Items Found</h3>
                <p className="inv-empty-text tech-inv-empty-text">Try adjusting your filters or add new items.</p>
              </div>
            ) : viewMode === 'table' ? (
              // Table View
              <div className="inv-table-view tech-inv-table-view">
                <div className="inv-table-container tech-inv-table-container">
                  <table className="inv-table tech-inv-table">
                    <thead className="inv-table-head tech-inv-table-head">
                      <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Unit Price</th>
                        <th>Total Value</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="inv-table-body tech-inv-table-body">
                      {filteredItems.map(item => (
                        <tr key={item.id} className="inv-table-row tech-inv-table-row">
                          <td className="inv-table-cell inv-table-cell-id tech-inv-table-cell tech-inv-table-cell-id">
                            {item.id}
                          </td>
                          <td className="inv-table-cell inv-table-cell-name tech-inv-table-cell tech-inv-table-cell-name">
                            <div className="inv-table-item-name tech-inv-table-item-name">
                              <strong>{item.name}</strong>
                              <span className="inv-table-sku tech-inv-table-sku">{item.sku}</span>
                            </div>
                          </td>
                          <td className="inv-table-cell tech-inv-table-cell">
                            <span className="inv-table-category tech-inv-table-category">{item.category}</span>
                          </td>
                          <td className="inv-table-cell tech-inv-table-cell">
                            <div className="inv-table-quantity tech-inv-table-quantity">
                              <span className="inv-quantity-value tech-inv-quantity-value">{item.quantity}</span>
                              <span className="inv-quantity-unit tech-inv-quantity-unit">{item.unit}</span>
                            </div>
                          </td>
                          <td className="inv-table-cell tech-inv-table-cell">
                            <div className="inv-table-location tech-inv-table-location">
                              <span className="inv-location-main tech-inv-location-main">{item.location}</span>
                              <span className="inv-location-shelf tech-inv-location-shelf">{item.shelf}</span>
                            </div>
                          </td>
                          <td className="inv-table-cell tech-inv-table-cell">
                            <span className={`inv-table-status ${getStatusBadgeClass(item.status)} tech-inv-table-status tech-inv-status-badge tech-inv-status-badge--${item.status}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="inv-table-cell tech-inv-table-cell">
                            <span className="inv-table-price tech-inv-table-price">{item.unitPrice}</span>
                          </td>
                          <td className="inv-table-cell tech-inv-table-cell">
                            <span className="inv-table-value tech-inv-table-value">{item.totalValue}</span>
                          </td>
                          <td className="inv-table-cell inv-table-cell-actions tech-inv-table-cell tech-inv-table-cell-actions">
                            <div className="inv-table-actions tech-inv-table-actions">
                              <button 
                                className="inv-table-action-btn inv-table-action-view tech-inv-table-action-btn tech-inv-table-action-view"
                                onClick={() => handleViewItem(item)}
                              >
                                View
                              </button>
                              <button 
                                className="inv-table-action-btn inv-table-action-reorder tech-inv-table-action-btn tech-inv-table-action-reorder"
                                onClick={() => handleReorder(item)}
                              >
                                Reorder
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : viewMode === 'cards' ? (
              // Cards View
              <div className="inv-cards-view tech-inv-cards-view">
                <div className="inv-cards-grid tech-inv-cards-grid">
                  {filteredItems.map(item => (
                    <div key={item.id} className="inv-card tech-inv-card">
                      <div className="inv-card-header tech-inv-card-header">
                        <div className="inv-card-id tech-inv-card-id">
                          <span className="inv-card-item-id tech-inv-card-item-id">{item.id}</span>
                          <span className="inv-card-sku tech-inv-card-sku">{item.sku}</span>
                        </div>
                        <span className={`inv-card-status ${getStatusBadgeClass(item.status)} tech-inv-card-status tech-inv-status-badge tech-inv-status-badge--${item.status}`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="inv-card-content tech-inv-card-content">
                        <h3 className="inv-card-title tech-inv-card-title">{item.name}</h3>
                        <p className="inv-card-description tech-inv-card-description">{item.description}</p>
                        
                        <div className="inv-card-details tech-inv-card-details">
                          <div className="inv-card-detail tech-inv-card-detail">
                            <span className="inv-card-detail-label tech-inv-card-detail-label">Category:</span>
                            <span className="inv-card-detail-value tech-inv-card-detail-value">{item.category}</span>
                          </div>
                          <div className="inv-card-detail tech-inv-card-detail">
                            <span className="inv-card-detail-label tech-inv-card-detail-label">Location:</span>
                            <span className="inv-card-detail-value tech-inv-card-detail-value">{item.location}</span>
                          </div>
                        </div>

                        <div className="inv-card-stock tech-inv-card-stock">
                          <div className="inv-card-quantity tech-inv-card-quantity">
                            <span className="inv-card-quantity-label tech-inv-card-quantity-label">Quantity:</span>
                            <span className="inv-card-quantity-value tech-inv-card-quantity-value">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                          <div className="inv-card-value tech-inv-card-value">
                            <span className="inv-card-value-label tech-inv-card-value-label">Value:</span>
                            <span className="inv-card-value-amount tech-inv-card-value-amount">{item.totalValue}</span>
                          </div>
                        </div>

                        {item.expiryDate && (
                          <div className="inv-card-expiry tech-inv-card-expiry">
                            <span className="inv-card-expiry-label tech-inv-card-expiry-label">Expires:</span>
                            <span className="inv-card-expiry-date tech-inv-card-expiry-date">{item.expiryDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="inv-card-footer tech-inv-card-footer">
                        <div className="inv-card-supplier tech-inv-card-supplier">
                          <span className="inv-card-supplier-label tech-inv-card-supplier-label">Supplier:</span>
                          <span className="inv-card-supplier-name tech-inv-card-supplier-name">{item.supplier}</span>
                        </div>
                        <div className="inv-card-actions tech-inv-card-actions">
                          <button 
                            className="inv-card-action-btn inv-card-action-view tech-inv-card-action-btn tech-inv-card-action-view"
                            onClick={() => handleViewItem(item)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Grid View (Default)
              <div className="inv-grid-view tech-inv-grid-view">
                <div className="inv-items-grid tech-inv-items-grid">
                  {filteredItems.map(item => (
                    <div key={item.id} className="inv-item-card tech-inv-item-card">
                      <div className="inv-item-card-header tech-inv-item-card-header">
                        <div className="inv-item-card-id tech-inv-item-card-id">
                          <span className="inv-item-id tech-inv-item-id">{item.id}</span>
                          <span className="inv-item-sku tech-inv-item-sku">{item.sku}</span>
                        </div>
                        <div className="inv-item-card-status tech-inv-item-card-status">
                          <span className={`inv-item-status ${getStatusBadgeClass(item.status)} tech-inv-item-status tech-inv-status-badge tech-inv-status-badge--${item.status}`}>
                            {item.status}
                          </span>
                          <span className={`inv-item-critical ${getCriticalBadgeClass(item.critical)} tech-inv-item-critical tech-inv-critical-badge tech-inv-critical-badge--${item.critical ? 'yes' : 'no'}`}>
                            {item.critical ? 'Critical' : 'Normal'}
                          </span>
                        </div>
                      </div>

                      <div className="inv-item-info tech-inv-item-info">
                        <h3 className="inv-item-name tech-inv-item-name">{item.name}</h3>
                        <div className="inv-item-category tech-inv-item-category">
                          <span className="inv-category-label tech-inv-category-label">Category:</span>
                          <span className="inv-category-value tech-inv-category-value">{item.category}</span>
                        </div>
                        <div className="inv-item-description tech-inv-item-description">
                          <p>{item.description}</p>
                        </div>
                      </div>

                      <div className="inv-item-stock tech-inv-item-stock">
                        <div className="inv-item-quantity tech-inv-item-quantity">
                          <span className="inv-quantity-label tech-inv-quantity-label">Stock:</span>
                          <div className="inv-quantity-display tech-inv-quantity-display">
                            <span className="inv-quantity-current tech-inv-quantity-current">{item.quantity}</span>
                            <span className="inv-quantity-unit tech-inv-quantity-unit">{item.unit}</span>
                          </div>
                        </div>
                        <div className="inv-item-stock-levels tech-inv-item-stock-levels">
                          <div className="inv-stock-level tech-inv-stock-level">
                            <span className="inv-level-label tech-inv-level-label">Min:</span>
                            <span className="inv-level-value tech-inv-level-value">{item.minStock}</span>
                          </div>
                          <div className="inv-stock-level tech-inv-stock-level">
                            <span className="inv-level-label tech-inv-level-label">Reorder:</span>
                            <span className="inv-level-value tech-inv-level-value">{item.reorderLevel}</span>
                          </div>
                          <div className="inv-stock-level tech-inv-stock-level">
                            <span className="inv-level-label tech-inv-level-label">Max:</span>
                            <span className="inv-level-value tech-inv-level-value">{item.maxStock}</span>
                          </div>
                        </div>
                      </div>

                      <div className="inv-item-location tech-inv-item-location">
                        <div className="inv-location-details tech-inv-location-details">
                          <span className="inv-location-label tech-inv-location-label">Location:</span>
                          <span className="inv-location-value tech-inv-location-value">{item.location}</span>
                        </div>
                        <div className="inv-shelf-details tech-inv-shelf-details">
                          <span className="inv-shelf-label tech-inv-shelf-label">Shelf:</span>
                          <span className="inv-shelf-value tech-inv-shelf-value">{item.shelf}</span>
                        </div>
                      </div>

                      <div className="inv-item-financial tech-inv-item-financial">
                        <div className="inv-item-price tech-inv-item-price">
                          <span className="inv-price-label tech-inv-price-label">Unit Price:</span>
                          <span className="inv-price-value tech-inv-price-value">{item.unitPrice}</span>
                        </div>
                        <div className="inv-item-value tech-inv-item-value">
                          <span className="inv-value-label tech-inv-value-label">Total Value:</span>
                          <span className="inv-value-amount tech-inv-value-amount">{item.totalValue}</span>
                        </div>
                      </div>

                      <div className="inv-item-supplier tech-inv-item-supplier">
                        <div className="inv-supplier-info tech-inv-supplier-info">
                          <span className="inv-supplier-label tech-inv-supplier-label">Supplier:</span>
                          <span className="inv-supplier-name tech-inv-supplier-name">{item.supplier}</span>
                        </div>
                        <div className="inv-supplier-code tech-inv-supplier-code">
                          <span className="inv-code-label tech-inv-code-label">Code:</span>
                          <span className="inv-code-value tech-inv-code-value">{item.supplierCode}</span>
                        </div>
                      </div>

                      <div className="inv-item-meta tech-inv-item-meta">
                        <div className="inv-item-expiry tech-inv-item-expiry">
                          <span className="inv-expiry-label tech-inv-expiry-label">Expiry:</span>
                          <span className="inv-expiry-date tech-inv-expiry-date">{item.expiryDate}</span>
                        </div>
                        <div className="inv-item-temperature tech-inv-item-temperature">
                          <span className="inv-temperature-label tech-inv-temperature-label">Storage:</span>
                          <span className="inv-temperature-value tech-inv-temperature-value">{item.temperature}</span>
                        </div>
                      </div>

                      <div className="inv-item-usage tech-inv-item-usage">
                        <span className="inv-usage-label tech-inv-usage-label">Usage Rate:</span>
                        <span className="inv-usage-value tech-inv-usage-value">{item.usageRate}</span>
                      </div>

                      <div className="inv-item-notes tech-inv-item-notes">
                        <span className="inv-notes-label tech-inv-notes-label">Notes:</span>
                        <span className="inv-notes-value tech-inv-notes-value">{item.notes}</span>
                      </div>

                      <div className="inv-item-card-footer tech-inv-item-card-footer">
                        <div className="inv-item-actions tech-inv-item-actions">
                          <button 
                            className="inv-action-btn-sm inv-action-btn-view tech-inv-action-btn-sm tech-inv-action-btn-view"
                            onClick={() => handleViewItem(item)}
                          >
                            View Details
                          </button>
                          <button 
                            className="inv-action-btn-sm inv-action-btn-reorder tech-inv-action-btn-sm tech-inv-action-btn-reorder"
                            onClick={() => handleReorder(item)}
                          >
                            Reorder
                          </button>
                          <button 
                            className="inv-action-btn-sm inv-action-btn-label tech-inv-action-btn-sm tech-inv-action-btn-label"
                            onClick={() => handlePrintLabel(item.barcode)}
                          >
                            Print Label
                          </button>
                        </div>
                        <div className="inv-quantity-controls tech-inv-quantity-controls">
                          <button 
                            className="inv-qty-btn inv-qty-remove tech-inv-qty-btn tech-inv-qty-remove"
                            onClick={() => handleQuantityUpdate(item.id, 'remove')}
                          >
                            -
                          </button>
                          <span className="inv-qty-display tech-inv-qty-display">{item.quantity}</span>
                          <button 
                            className="inv-qty-btn inv-qty-add tech-inv-qty-btn tech-inv-qty-add"
                            onClick={() => handleQuantityUpdate(item.id, 'add')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Item Detail Modal */}
      {showItemModal && selectedItem && (
        <div className="inv-itemmodal-overlay tech-inv-modal-overlay">
          <div className="inv-itemmodal tech-inv-itemmodal">
            <div className="inv-itemmodal-header tech-inv-itemmodal-header">
              <h2 className="inv-itemmodal-title tech-inv-itemmodal-title">Inventory Item Details</h2>
              <button 
                className="inv-itemmodal-close tech-inv-itemmodal-close"
                onClick={() => setShowItemModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="inv-itemmodal-content tech-inv-itemmodal-content">
              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Basic Information</h3>
                <div className="inv-itemmodal-basic-grid tech-inv-itemmodal-basic-grid">
                  <div className="inv-itemmodal-basic-item tech-inv-itemmodal-basic-item">
                    <span className="inv-itemmodal-basic-label tech-inv-itemmodal-basic-label">Item ID:</span>
                    <span className="inv-itemmodal-basic-value tech-inv-itemmodal-basic-value">{selectedItem.id}</span>
                  </div>
                  <div className="inv-itemmodal-basic-item tech-inv-itemmodal-basic-item">
                    <span className="inv-itemmodal-basic-label tech-inv-itemmodal-basic-label">SKU:</span>
                    <span className="inv-itemmodal-basic-value tech-inv-itemmodal-basic-value">{selectedItem.sku}</span>
                  </div>
                  <div className="inv-itemmodal-basic-item tech-inv-itemmodal-basic-item">
                    <span className="inv-itemmodal-basic-label tech-inv-itemmodal-basic-label">Barcode:</span>
                    <span className="inv-itemmodal-basic-value tech-inv-itemmodal-basic-value">{selectedItem.barcode}</span>
                  </div>
                  <div className="inv-itemmodal-basic-item tech-inv-itemmodal-basic-item">
                    <span className="inv-itemmodal-basic-label tech-inv-itemmodal-basic-label">Status:</span>
                    <span className={`inv-itemmodal-basic-value inv-status-badge ${getStatusBadgeClass(selectedItem.status)} tech-inv-itemmodal-basic-value tech-inv-status-badge tech-inv-status-badge--${selectedItem.status}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Item Details</h3>
                <div className="inv-itemmodal-details-grid tech-inv-itemmodal-details-grid">
                  <div className="inv-itemmodal-details-item tech-inv-itemmodal-details-item">
                    <span className="inv-itemmodal-details-label tech-inv-itemmodal-details-label">Name:</span>
                    <span className="inv-itemmodal-details-value tech-inv-itemmodal-details-value">{selectedItem.name}</span>
                  </div>
                  <div className="inv-itemmodal-details-item tech-inv-itemmodal-details-item">
                    <span className="inv-itemmodal-details-label tech-inv-itemmodal-details-label">Category:</span>
                    <span className="inv-itemmodal-details-value tech-inv-itemmodal-details-value">{selectedItem.category}</span>
                  </div>
                  <div className="inv-itemmodal-details-item tech-inv-itemmodal-details-item">
                    <span className="inv-itemmodal-details-label tech-inv-itemmodal-details-label">Sub Category:</span>
                    <span className="inv-itemmodal-details-value tech-inv-itemmodal-details-value">{selectedItem.subCategory}</span>
                  </div>
                  <div className="inv-itemmodal-details-item tech-inv-itemmodal-details-item">
                    <span className="inv-itemmodal-details-label tech-inv-itemmodal-details-label">Description:</span>
                    <span className="inv-itemmodal-details-value tech-inv-itemmodal-details-value">{selectedItem.description}</span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Stock Information</h3>
                <div className="inv-itemmodal-stock-grid tech-inv-itemmodal-stock-grid">
                  <div className="inv-itemmodal-stock-item tech-inv-itemmodal-stock-item">
                    <span className="inv-itemmodal-stock-label tech-inv-itemmodal-stock-label">Current Quantity:</span>
                    <span className="inv-itemmodal-stock-value tech-inv-itemmodal-stock-value">{selectedItem.quantity} {selectedItem.unit}</span>
                  </div>
                  <div className="inv-itemmodal-stock-item tech-inv-itemmodal-stock-item">
                    <span className="inv-itemmodal-stock-label tech-inv-itemmodal-stock-label">Minimum Stock:</span>
                    <span className="inv-itemmodal-stock-value tech-inv-itemmodal-stock-value">{selectedItem.minStock}</span>
                  </div>
                  <div className="inv-itemmodal-stock-item tech-inv-itemmodal-stock-item">
                    <span className="inv-itemmodal-stock-label tech-inv-itemmodal-stock-label">Reorder Level:</span>
                    <span className="inv-itemmodal-stock-value tech-inv-itemmodal-stock-value">{selectedItem.reorderLevel}</span>
                  </div>
                  <div className="inv-itemmodal-stock-item tech-inv-itemmodal-stock-item">
                    <span className="inv-itemmodal-stock-label tech-inv-itemmodal-stock-label">Maximum Stock:</span>
                    <span className="inv-itemmodal-stock-value tech-inv-itemmodal-stock-value">{selectedItem.maxStock}</span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Location Information</h3>
                <div className="inv-itemmodal-location-grid tech-inv-itemmodal-location-grid">
                  <div className="inv-itemmodal-location-item tech-inv-itemmodal-location-item">
                    <span className="inv-itemmodal-location-label tech-inv-itemmodal-location-label">Storage Location:</span>
                    <span className="inv-itemmodal-location-value tech-inv-itemmodal-location-value">{selectedItem.location}</span>
                  </div>
                  <div className="inv-itemmodal-location-item tech-inv-itemmodal-location-item">
                    <span className="inv-itemmodal-location-label tech-inv-itemmodal-location-label">Shelf Position:</span>
                    <span className="inv-itemmodal-location-value tech-inv-itemmodal-location-value">{selectedItem.shelf}</span>
                  </div>
                  <div className="inv-itemmodal-location-item tech-inv-itemmodal-location-item">
                    <span className="inv-itemmodal-location-label tech-inv-itemmodal-location-label">Storage Temperature:</span>
                    <span className="inv-itemmodal-location-value tech-inv-itemmodal-location-value">{selectedItem.temperature}</span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Financial Information</h3>
                <div className="inv-itemmodal-financial-grid tech-inv-itemmodal-financial-grid">
                  <div className="inv-itemmodal-financial-item tech-inv-itemmodal-financial-item">
                    <span className="inv-itemmodal-financial-label tech-inv-itemmodal-financial-label">Unit Price:</span>
                    <span className="inv-itemmodal-financial-value tech-inv-itemmodal-financial-value">{selectedItem.unitPrice}</span>
                  </div>
                  <div className="inv-itemmodal-financial-item tech-inv-itemmodal-financial-item">
                    <span className="inv-itemmodal-financial-label tech-inv-itemmodal-financial-label">Total Value:</span>
                    <span className="inv-itemmodal-financial-value tech-inv-itemmodal-financial-value">{selectedItem.totalValue}</span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Supplier Information</h3>
                <div className="inv-itemmodal-supplier-grid tech-inv-itemmodal-supplier-grid">
                  <div className="inv-itemmodal-supplier-item tech-inv-itemmodal-supplier-item">
                    <span className="inv-itemmodal-supplier-label tech-inv-itemmodal-supplier-label">Supplier Name:</span>
                    <span className="inv-itemmodal-supplier-value tech-inv-itemmodal-supplier-value">{selectedItem.supplier}</span>
                  </div>
                  <div className="inv-itemmodal-supplier-item tech-inv-itemmodal-supplier-item">
                    <span className="inv-itemmodal-supplier-label tech-inv-itemmodal-supplier-label">Supplier Code:</span>
                    <span className="inv-itemmodal-supplier-value tech-inv-itemmodal-supplier-value">{selectedItem.supplierCode}</span>
                  </div>
                  <div className="inv-itemmodal-supplier-item tech-inv-itemmodal-supplier-item">
                    <span className="inv-itemmodal-supplier-label tech-inv-itemmodal-supplier-label">Last Ordered:</span>
                    <span className="inv-itemmodal-supplier-value tech-inv-itemmodal-supplier-value">{selectedItem.lastOrdered}</span>
                  </div>
                  <div className="inv-itemmodal-supplier-item tech-inv-itemmodal-supplier-item">
                    <span className="inv-itemmodal-supplier-label tech-inv-itemmodal-supplier-label">Last Received:</span>
                    <span className="inv-itemmodal-supplier-value tech-inv-itemmodal-supplier-value">{selectedItem.lastReceived}</span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Additional Information</h3>
                <div className="inv-itemmodal-additional-grid tech-inv-itemmodal-additional-grid">
                  <div className="inv-itemmodal-additional-item tech-inv-itemmodal-additional-item">
                    <span className="inv-itemmodal-additional-label tech-inv-itemmodal-additional-label">Expiry Date:</span>
                    <span className="inv-itemmodal-additional-value tech-inv-itemmodal-additional-value">{selectedItem.expiryDate}</span>
                  </div>
                  <div className="inv-itemmodal-additional-item tech-inv-itemmodal-additional-item">
                    <span className="inv-itemmodal-additional-label tech-inv-itemmodal-additional-label">Batch Number:</span>
                    <span className="inv-itemmodal-additional-value tech-inv-itemmodal-additional-value">{selectedItem.batchNumber}</span>
                  </div>
                  <div className="inv-itemmodal-additional-item tech-inv-itemmodal-additional-item">
                    <span className="inv-itemmodal-additional-label tech-inv-itemmodal-additional-label">Usage Rate:</span>
                    <span className="inv-itemmodal-additional-value tech-inv-itemmodal-additional-value">{selectedItem.usageRate}</span>
                  </div>
                  <div className="inv-itemmodal-additional-item tech-inv-itemmodal-additional-item">
                    <span className="inv-itemmodal-additional-label tech-inv-itemmodal-additional-label">Critical Item:</span>
                    <span className={`inv-itemmodal-additional-value inv-critical-badge ${getCriticalBadgeClass(selectedItem.critical)} tech-inv-itemmodal-additional-value tech-inv-critical-badge tech-inv-critical-badge--${selectedItem.critical ? 'yes' : 'no'}`}>
                      {selectedItem.critical ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="inv-itemmodal-section tech-inv-itemmodal-section">
                <h3 className="inv-itemmodal-section-title tech-inv-itemmodal-section-title">Notes</h3>
                <div className="inv-itemmodal-notes tech-inv-itemmodal-notes">
                  <p>{selectedItem.notes}</p>
                </div>
              </div>
            </div>

            <div className="inv-itemmodal-footer tech-inv-itemmodal-footer">
              <button 
                className="inv-itemmodal-btn inv-itemmodal-btn-secondary tech-inv-itemmodal-btn tech-inv-itemmodal-btn-secondary"
                onClick={() => setShowItemModal(false)}
              >
                Close
              </button>
              <button 
                className="inv-itemmodal-btn inv-itemmodal-btn-primary tech-inv-itemmodal-btn tech-inv-itemmodal-btn-primary"
                onClick={() => handlePrintLabel(selectedItem.barcode)}
              >
                Print Label
              </button>
              <button 
                className="inv-itemmodal-btn inv-itemmodal-btn-success tech-inv-itemmodal-btn tech-inv-itemmodal-btn-success"
                onClick={() => handleReorder(selectedItem)}
              >
                Reorder Item
              </button>
              <div className="inv-itemmodal-qty-controls tech-inv-itemmodal-qty-controls">
                <button 
                  className="inv-itemmodal-qty-btn inv-itemmodal-qty-remove tech-inv-itemmodal-qty-btn tech-inv-itemmodal-qty-remove"
                  onClick={() => handleQuantityUpdate(selectedItem.id, 'remove')}
                >
                  -
                </button>
                <span className="inv-itemmodal-qty-display tech-inv-itemmodal-qty-display">{selectedItem.quantity}</span>
                <button 
                  className="inv-itemmodal-qty-btn inv-itemmodal-qty-add tech-inv-itemmodal-qty-btn tech-inv-itemmodal-qty-add"
                  onClick={() => handleQuantityUpdate(selectedItem.id, 'add')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && <AddItemModal />}

      <footer className="inv-footer tech-inv-footer">
        <div className="inv-footer-content tech-inv-footer-content">
          <p className="inv-footer-text tech-inv-footer-text">
            AAB Technician Portal • Inventory Management System • Version 5.2.0
          </p>
          <p className="inv-footer-copyright tech-inv-footer-copyright">
            © {new Date().getFullYear()} AAB Hospital Inventory Department. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InventoryMenu;