import React, { useState, useEffect } from 'react';
import './SpecimenMenu.css';

const SpecimenMenu = () => {
  const [specimens, setSpecimens] = useState([]);
  const [filteredSpecimens, setFilteredSpecimens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [showSpecimenModal, setShowSpecimenModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  // Sample data
  const sampleSpecimens = [
    {
      id: 'SP20231015001',
      barcode: 'BC00123456789',
      patientName: 'John Doe',
      patientId: 'P12345',
      age: 42,
      gender: 'Male',
      specimenType: 'Blood',
      containerType: 'EDTA Tube',
      collectionDate: '2023-10-15',
      collectionTime: '08:30 AM',
      collectionBy: 'Nurse Sarah',
      receivedDate: '2023-10-15',
      receivedTime: '09:15 AM',
      status: 'collected',
      storageLocation: 'Refrigerator A1',
      temperature: '4°C',
      volume: '5 ml',
      testsRequested: ['CBC', 'Glucose', 'Lipid Profile'],
      instructions: 'Keep refrigerated. Process within 4 hours.',
      expirationDate: '2023-10-16',
      priority: 'routine',
      technicianNotes: 'Sample appears hemolyzed.',
      qualityCheck: 'Pass',
      attachments: ['collection_form.pdf', 'barcode_scan.png']
    },
    {
      id: 'SP20231015002',
      barcode: 'BC00123456790',
      patientName: 'Jane Smith',
      patientId: 'P12346',
      age: 35,
      gender: 'Female',
      specimenType: 'Urine',
      containerType: 'Sterile Container',
      collectionDate: '2023-10-15',
      collectionTime: '09:45 AM',
      collectionBy: 'Nurse Robert',
      receivedDate: '2023-10-15',
      receivedTime: '10:30 AM',
      status: 'processing',
      storageLocation: 'Room Temp Rack',
      temperature: '25°C',
      volume: '50 ml',
      testsRequested: ['Urinalysis', 'Culture'],
      instructions: 'Mid-stream sample. Process immediately.',
      expirationDate: '2023-10-15',
      priority: 'urgent',
      technicianNotes: 'Clear yellow urine.',
      qualityCheck: 'Pass',
      attachments: ['urine_form.pdf']
    },
    {
      id: 'SP20231014003',
      barcode: 'BC00123456791',
      patientName: 'Robert Brown',
      patientId: 'P12347',
      age: 58,
      gender: 'Male',
      specimenType: 'Serum',
      containerType: 'SST Tube',
      collectionDate: '2023-10-14',
      collectionTime: '10:15 AM',
      collectionBy: 'Dr. Wilson',
      receivedDate: '2023-10-14',
      receivedTime: '11:00 AM',
      status: 'stored',
      storageLocation: 'Centrifuge Station',
      temperature: 'Room Temp',
      volume: '3 ml',
      testsRequested: ['Liver Function', 'Renal Panel'],
      instructions: 'Allow to clot for 30 mins.',
      expirationDate: '2023-10-17',
      priority: 'routine',
      technicianNotes: 'Adequate clot formation.',
      qualityCheck: 'Pass',
      attachments: ['serum_form.pdf']
    },
    {
      id: 'SP20231015004',
      barcode: 'BC00123456792',
      patientName: 'Alice Johnson',
      patientId: 'P12348',
      age: 29,
      gender: 'Female',
      specimenType: 'CSF',
      containerType: 'Sterile Tube',
      collectionDate: '2023-10-15',
      collectionTime: '11:30 AM',
      collectionBy: 'Dr. Miller',
      receivedDate: '2023-10-15',
      receivedTime: '12:15 PM',
      status: 'pending',
      storageLocation: 'Incubator B2',
      temperature: '37°C',
      volume: '2 ml',
      testsRequested: ['Culture', 'Cell Count'],
      instructions: 'Handle with extreme care.',
      expirationDate: '2023-10-16',
      priority: 'stat',
      technicianNotes: 'Clear and colorless.',
      qualityCheck: 'Pending',
      attachments: ['csf_form.pdf']
    },
    {
      id: 'SP20231013005',
      barcode: 'BC00123456793',
      patientName: 'Michael Wilson',
      patientId: 'P12349',
      age: 45,
      gender: 'Male',
      specimenType: 'Tissue',
      containerType: 'Formalin Container',
      collectionDate: '2023-10-13',
      collectionTime: '02:00 PM',
      collectionBy: 'Dr. Taylor',
      receivedDate: '2023-10-13',
      receivedTime: '03:30 PM',
      status: 'processed',
      storageLocation: 'Pathology Lab',
      temperature: 'Room Temp',
      volume: '1 cm³',
      testsRequested: ['Biopsy', 'Histopathology'],
      instructions: 'Fix in formalin for 24 hours.',
      expirationDate: '2023-10-20',
      priority: 'routine',
      technicianNotes: 'Adequate tissue sample.',
      qualityCheck: 'Pass',
      attachments: ['tissue_form.pdf', 'biopsy_image.png']
    },
    {
      id: 'SP20231015006',
      barcode: 'BC00123456794',
      patientName: 'Sarah Taylor',
      patientId: 'P12350',
      age: 52,
      gender: 'Female',
      specimenType: 'Swab',
      containerType: 'Viral Transport Media',
      collectionDate: '2023-10-15',
      collectionTime: '03:45 PM',
      collectionBy: 'Nurse Clark',
      receivedDate: '2023-10-15',
      receivedTime: '04:30 PM',
      status: 'transferred',
      storageLocation: 'Microbiology Lab',
      temperature: '4°C',
      volume: 'N/A',
      testsRequested: ['PCR', 'Viral Culture'],
      instructions: 'Keep cold chain.',
      expirationDate: '2023-10-17',
      priority: 'urgent',
      technicianNotes: 'Properly sealed.',
      qualityCheck: 'Pass',
      attachments: ['swab_form.pdf']
    },
    {
      id: 'SP20231014007',
      barcode: 'BC00123456795',
      patientName: 'David Lee',
      patientId: 'P12351',
      age: 38,
      gender: 'Male',
      specimenType: 'Plasma',
      containerType: 'Citrate Tube',
      collectionDate: '2023-10-14',
      collectionTime: '08:00 AM',
      collectionBy: 'Nurse Davis',
      receivedDate: '2023-10-14',
      receivedTime: '08:45 AM',
      status: 'rejected',
      storageLocation: 'Waste Bin',
      temperature: 'N/A',
      volume: '2 ml',
      testsRequested: ['Coagulation Studies'],
      instructions: 'Centrifuge immediately.',
      expirationDate: '2023-10-14',
      priority: 'routine',
      technicianNotes: 'Clotted sample - rejected.',
      qualityCheck: 'Fail',
      attachments: ['coagulation_form.pdf']
    },
    {
      id: 'SP20231015008',
      barcode: 'BC00123456796',
      patientName: 'Emily Clark',
      patientId: 'P12352',
      age: 31,
      gender: 'Female',
      specimenType: 'Stool',
      containerType: 'Parasitology Container',
      collectionDate: '2023-10-15',
      collectionTime: '10:00 AM',
      collectionBy: 'Patient Self',
      receivedDate: '2023-10-15',
      receivedTime: '11:30 AM',
      status: 'collected',
      storageLocation: 'Microbiology Fridge',
      temperature: '4°C',
      volume: '10 g',
      testsRequested: ['Ova & Parasites', 'Culture'],
      instructions: 'Examine within 2 hours.',
      expirationDate: '2023-10-16',
      priority: 'routine',
      technicianNotes: 'Adequate amount.',
      qualityCheck: 'Pass',
      attachments: ['stool_form.pdf']
    }
  ];

  // Simulate API call
  useEffect(() => {
    const fetchSpecimens = async () => {
      setLoading(true);
      setTimeout(() => {
        setSpecimens(sampleSpecimens);
        setFilteredSpecimens(sampleSpecimens);
        setLoading(false);
      }, 1000);
    };

    fetchSpecimens();
  }, []);

  // Filter specimens
  useEffect(() => {
    let filtered = [...specimens];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(specimen => specimen.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(specimen => specimen.specimenType === typeFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(specimen => specimen.storageLocation.includes(locationFilter));
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(specimen => 
        specimen.patientName.toLowerCase().includes(query) ||
        specimen.patientId.toLowerCase().includes(query) ||
        specimen.id.toLowerCase().includes(query) ||
        specimen.barcode.toLowerCase().includes(query)
      );
    }

    setFilteredSpecimens(filtered);
  }, [statusFilter, typeFilter, locationFilter, searchQuery, specimens]);

  const handleStatusChange = (specimenId, newStatus) => {
    const updatedSpecimens = specimens.map(specimen => {
      if (specimen.id === specimenId) {
        return { ...specimen, status: newStatus };
      }
      return specimen;
    });
    
    setSpecimens(updatedSpecimens);
  };

  const handleQualityCheck = (specimenId, result) => {
    const updatedSpecimens = specimens.map(specimen => {
      if (specimen.id === specimenId) {
        return { ...specimen, qualityCheck: result };
      }
      return specimen;
    });
    
    setSpecimens(updatedSpecimens);
  };

  const handleViewSpecimen = (specimen) => {
    setSelectedSpecimen(specimen);
    setShowSpecimenModal(true);
  };

  const handleNewCollection = () => {
    setShowCollectionModal(true);
  };

  const handleAddSpecimen = (newSpecimen) => {
    const specimen = {
      id: `SP${new Date().getFullYear()}${String(specimens.length + 1).padStart(5, '0')}`,
      barcode: `BC${String(Math.floor(Math.random() * 10000000000)).padStart(11, '0')}`,
      ...newSpecimen,
      receivedDate: new Date().toISOString().split('T')[0],
      receivedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'collected',
      qualityCheck: 'Pending'
    };
    
    setSpecimens([specimen, ...specimens]);
    setShowCollectionModal(false);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'collected': return 'specimen-status-badge--collected';
      case 'processing': return 'specimen-status-badge--processing';
      case 'stored': return 'specimen-status-badge--stored';
      case 'processed': return 'specimen-status-badge--processed';
      case 'transferred': return 'specimen-status-badge--transferred';
      case 'rejected': return 'specimen-status-badge--rejected';
      case 'pending': return 'specimen-status-badge--pending';
      default: return 'specimen-status-badge--default';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'urgent': return 'specimen-priority-badge--urgent';
      case 'stat': return 'specimen-priority-badge--stat';
      case 'routine': return 'specimen-priority-badge--routine';
      default: return 'specimen-priority-badge--default';
    }
  };

  const getQualityBadgeClass = (quality) => {
    switch(quality) {
      case 'Pass': return 'specimen-quality-badge--pass';
      case 'Fail': return 'specimen-quality-badge--fail';
      case 'Pending': return 'specimen-quality-badge--pending';
      default: return 'specimen-quality-badge--default';
    }
  };

  const getStatusCount = (status) => {
    return specimens.filter(specimen => specimen.status === status).length;
  };

  const getTypeCount = (type) => {
    return specimens.filter(specimen => specimen.specimenType === type).length;
  };

  const handlePrintLabel = (barcode) => {
    alert(`Printing label for barcode: ${barcode}`);
  };

  const handleExportData = () => {
    alert(`Exporting ${filteredSpecimens.length} specimen records`);
  };

  // Collection Modal Component
  const CollectionModal = () => {
    const [formData, setFormData] = useState({
      patientName: '',
      patientId: '',
      age: '',
      gender: 'Male',
      specimenType: 'Blood',
      containerType: '',
      collectionDate: new Date().toISOString().split('T')[0],
      collectionTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      collectionBy: '',
      volume: '',
      testsRequested: [],
      instructions: '',
      priority: 'routine'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddSpecimen(formData);
    };

    const handleTestToggle = (test) => {
      setFormData(prev => ({
        ...prev,
        testsRequested: prev.testsRequested.includes(test)
          ? prev.testsRequested.filter(t => t !== test)
          : [...prev.testsRequested, test]
      }));
    };

    return (
      <div className="specimen-collection-modal-overlay tech-modal-overlay">
        <div className="specimen-collection-modal tech-collection-modal">
          <div className="specimen-collection-modal-header tech-collection-modal-header">
            <h2 className="specimen-collection-modal-title tech-collection-modal-title">
              New Specimen Collection
            </h2>
            <button 
              className="specimen-collection-modal-close tech-collection-modal-close"
              onClick={() => setShowCollectionModal(false)}
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="specimen-collection-form tech-collection-form">
            <div className="specimen-collection-form-grid tech-collection-form-grid">
              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Patient Name *</label>
                <input
                  type="text"
                  className="specimen-form-input tech-form-input"
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  required
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Patient ID *</label>
                <input
                  type="text"
                  className="specimen-form-input tech-form-input"
                  value={formData.patientId}
                  onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                  required
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Age</label>
                <input
                  type="number"
                  className="specimen-form-input tech-form-input"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Gender</label>
                <select 
                  className="specimen-form-select tech-form-select"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Specimen Type *</label>
                <select 
                  className="specimen-form-select tech-form-select"
                  value={formData.specimenType}
                  onChange={(e) => setFormData({...formData, specimenType: e.target.value})}
                  required
                >
                  <option value="Blood">Blood</option>
                  <option value="Urine">Urine</option>
                  <option value="Serum">Serum</option>
                  <option value="Plasma">Plasma</option>
                  <option value="CSF">CSF</option>
                  <option value="Tissue">Tissue</option>
                  <option value="Swab">Swab</option>
                  <option value="Stool">Stool</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Container Type *</label>
                <input
                  type="text"
                  className="specimen-form-input tech-form-input"
                  value={formData.containerType}
                  onChange={(e) => setFormData({...formData, containerType: e.target.value})}
                  required
                  placeholder="e.g., EDTA Tube, SST Tube"
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Volume</label>
                <input
                  type="text"
                  className="specimen-form-input tech-form-input"
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: e.target.value})}
                  placeholder="e.g., 5 ml"
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Priority</label>
                <select 
                  className="specimen-form-select tech-form-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="routine">Routine</option>
                  <option value="urgent">Urgent</option>
                  <option value="stat">STAT</option>
                </select>
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Collection Date *</label>
                <input
                  type="date"
                  className="specimen-form-input tech-form-input"
                  value={formData.collectionDate}
                  onChange={(e) => setFormData({...formData, collectionDate: e.target.value})}
                  required
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Collection Time *</label>
                <input
                  type="time"
                  className="specimen-form-input tech-form-input"
                  value={formData.collectionTime}
                  onChange={(e) => setFormData({...formData, collectionTime: e.target.value})}
                  required
                />
              </div>

              <div className="specimen-form-group tech-form-group">
                <label className="specimen-form-label tech-form-label">Collected By *</label>
                <input
                  type="text"
                  className="specimen-form-input tech-form-input"
                  value={formData.collectionBy}
                  onChange={(e) => setFormData({...formData, collectionBy: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="specimen-form-group tech-form-group">
              <label className="specimen-form-label tech-form-label">Tests Requested</label>
              <div className="specimen-tests-grid tech-tests-grid">
                {['CBC', 'Glucose', 'Lipid Profile', 'Liver Function', 'Renal Panel', 'Urinalysis', 'Culture', 'PCR', 'Biopsy'].map(test => (
                  <label key={test} className="specimen-test-checkbox tech-test-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.testsRequested.includes(test)}
                      onChange={() => handleTestToggle(test)}
                    />
                    <span>{test}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="specimen-form-group tech-form-group">
              <label className="specimen-form-label tech-form-label">Special Instructions</label>
              <textarea
                className="specimen-form-textarea tech-form-textarea"
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                rows="3"
                placeholder="Any special handling instructions..."
              />
            </div>

            <div className="specimen-form-actions tech-form-actions">
              <button 
                type="button"
                className="specimen-form-btn specimen-form-btn-cancel tech-form-btn tech-form-btn-cancel"
                onClick={() => setShowCollectionModal(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="specimen-form-btn specimen-form-btn-submit tech-form-btn tech-form-btn-submit"
              >
                Create Specimen Record
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="specimen-container tech-specimen-container">
      <header className="specimen-header tech-specimen-header">
        <div className="specimen-header-content tech-specimen-header-content">
          <h1 className="specimen-title tech-specimen-title">AAB Technician - Specimen Management</h1>
          <p className="specimen-subtitle tech-specimen-subtitle">Track, manage, and process laboratory specimens</p>
        </div>
        <div className="specimen-header-actions tech-specimen-header-actions">
          <button 
            className="specimen-header-btn specimen-header-btn-scan tech-specimen-btn tech-specimen-btn-scan"
            onClick={() => alert('Opening barcode scanner...')}
          >
            Scan Barcode
          </button>
          <button 
            className="specimen-header-btn specimen-header-btn-print tech-specimen-btn tech-specimen-btn-print"
            onClick={() => handleExportData()}
          >
            Export Data
          </button>
        </div>
      </header>

      <div className="specimen-dashboard tech-specimen-dashboard">
        <div className="specimen-stats-grid tech-specimen-stats-grid">
          <div className="specimen-stat-card tech-specimen-stat-card specimen-stat-card-total tech-stat-card-total">
            <div className="specimen-stat-icon tech-specimen-stat-icon">🧪</div>
            <div className="specimen-stat-info tech-specimen-stat-info">
              <h3>Total Specimens</h3>
              <p className="specimen-stat-number tech-specimen-stat-number">{specimens.length}</p>
            </div>
          </div>
          
          <div className="specimen-stat-card tech-specimen-stat-card specimen-stat-card-collected tech-stat-card-collected">
            <div className="specimen-stat-icon tech-specimen-stat-icon">📥</div>
            <div className="specimen-stat-info tech-specimen-stat-info">
              <h3>Collected</h3>
              <p className="specimen-stat-number tech-specimen-stat-number">{getStatusCount('collected')}</p>
            </div>
          </div>
          
          <div className="specimen-stat-card tech-specimen-stat-card specimen-stat-card-processing tech-stat-card-processing">
            <div className="specimen-stat-icon tech-specimen-stat-icon">⚙️</div>
            <div className="specimen-stat-info tech-specimen-stat-info">
              <h3>Processing</h3>
              <p className="specimen-stat-number tech-specimen-stat-number">{getStatusCount('processing')}</p>
            </div>
          </div>
          
          <div className="specimen-stat-card tech-specimen-stat-card specimen-stat-card-urgent tech-stat-card-urgent">
            <div className="specimen-stat-icon tech-specimen-stat-icon">🚨</div>
            <div className="specimen-stat-info tech-specimen-stat-info">
              <h3>Urgent</h3>
              <p className="specimen-stat-number tech-specimen-stat-number">
                {specimens.filter(s => s.priority === 'urgent' || s.priority === 'stat').length}
              </p>
            </div>
          </div>
        </div>

        <div className="specimen-controls-section tech-specimen-controls-section">
          <div className="specimen-search-filters tech-specimen-search-filters">
            <div className="specimen-search-box tech-specimen-search-box">
              <input
                type="text"
                className="specimen-search-input tech-specimen-search-input"
                placeholder="Search by patient, ID, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="specimen-search-icon tech-specimen-search-icon">🔍</span>
            </div>

            <div className="specimen-filter-group tech-specimen-filter-group">
              <label className="specimen-filter-label tech-specimen-filter-label">Status:</label>
              <select 
                className="specimen-filter-select tech-specimen-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="collected">Collected</option>
                <option value="processing">Processing</option>
                <option value="stored">Stored</option>
                <option value="processed">Processed</option>
                <option value="transferred">Transferred</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="specimen-filter-group tech-specimen-filter-group">
              <label className="specimen-filter-label tech-specimen-filter-label">Type:</label>
              <select 
                className="specimen-filter-select tech-specimen-filter-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Blood">Blood</option>
                <option value="Urine">Urine</option>
                <option value="Serum">Serum</option>
                <option value="Plasma">Plasma</option>
                <option value="CSF">CSF</option>
                <option value="Tissue">Tissue</option>
                <option value="Swab">Swab</option>
                <option value="Stool">Stool</option>
              </select>
            </div>

            <div className="specimen-filter-group tech-specimen-filter-group">
              <label className="specimen-filter-label tech-specimen-filter-label">Location:</label>
              <select 
                className="specimen-filter-select tech-specimen-filter-select"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="Centrifuge">Centrifuge</option>
                <option value="Incubator">Incubator</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Pathology">Pathology</option>
              </select>
            </div>
          </div>

          <div className="specimen-action-buttons tech-specimen-action-buttons">
            <button 
              className="specimen-action-btn specimen-action-btn-primary tech-specimen-action-btn tech-specimen-action-btn-primary"
              onClick={handleNewCollection}
            >
              <span className="specimen-btn-icon tech-specimen-btn-icon">+</span>
              New Collection
            </button>
            <button 
              className="specimen-action-btn specimen-action-btn-secondary tech-specimen-action-btn tech-specimen-action-btn-secondary"
              onClick={() => alert('Opening batch processing...')}
            >
              <span className="specimen-btn-icon tech-specimen-btn-icon">⚙️</span>
              Batch Process
            </button>
            <button 
              className="specimen-action-btn specimen-action-btn-tertiary tech-specimen-action-btn tech-specimen-action-btn-tertiary"
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
                setLocationFilter('all');
                setSearchQuery('');
              }}
            >
              <span className="specimen-btn-icon tech-specimen-btn-icon">🔄</span>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="specimen-main-content tech-specimen-main-content">
        {loading ? (
          <div className="specimen-loading-state tech-specimen-loading-state">
            <div className="specimen-loading-spinner tech-specimen-loading-spinner"></div>
            <p className="specimen-loading-text tech-specimen-loading-text">Loading specimen data...</p>
          </div>
        ) : (
          <>
            <div className="specimen-results-header tech-specimen-results-header">
              <h2 className="specimen-results-title tech-specimen-results-title">
                Specimen Records <span className="specimen-results-count tech-specimen-results-count">({filteredSpecimens.length})</span>
              </h2>
              <div className="specimen-view-options tech-specimen-view-options">
                <button className="specimen-view-btn specimen-view-btn-active tech-specimen-view-btn tech-specimen-view-btn-active">
                  <span className="specimen-view-icon tech-specimen-view-icon">📋</span>
                  Grid View
                </button>
                <button className="specimen-view-btn tech-specimen-view-btn">
                  <span className="specimen-view-icon tech-specimen-view-icon">📊</span>
                  Timeline View
                </button>
              </div>
            </div>

            {filteredSpecimens.length === 0 ? (
              <div className="specimen-empty-state tech-specimen-empty-state">
                <div className="specimen-empty-icon tech-specimen-empty-icon">🧪</div>
                <h3 className="specimen-empty-title tech-specimen-empty-title">No Specimens Found</h3>
                <p className="specimen-empty-text tech-specimen-empty-text">Try adjusting your filters or search criteria.</p>
              </div>
            ) : (
              <div className="specimen-grid tech-specimen-grid">
                {filteredSpecimens.map(specimen => (
                  <div key={specimen.id} className="specimen-card tech-specimen-card">
                    <div className="specimen-card-header tech-specimen-card-header">
                      <div className="specimen-card-id tech-specimen-card-id">
                        <span className="specimen-id tech-specimen-id">{specimen.id}</span>
                        <span className="specimen-barcode tech-specimen-barcode">{specimen.barcode}</span>
                      </div>
                      <div className="specimen-card-status tech-specimen-card-status">
                        <span className={`specimen-status-badge ${getStatusBadgeClass(specimen.status)} tech-specimen-status-badge tech-specimen-status-badge--${specimen.status}`}>
                          {specimen.status}
                        </span>
                        <span className={`specimen-priority-badge ${getPriorityBadgeClass(specimen.priority)} tech-specimen-priority-badge tech-specimen-priority-badge--${specimen.priority}`}>
                          {specimen.priority}
                        </span>
                      </div>
                    </div>

                    <div className="specimen-patient-info tech-specimen-patient-info">
                      <h3 className="specimen-patient-name tech-specimen-patient-name">{specimen.patientName}</h3>
                      <div className="specimen-patient-details tech-specimen-patient-details">
                        <span className="specimen-patient-id tech-specimen-patient-id">ID: {specimen.patientId}</span>
                        <span className="specimen-patient-age-gender tech-specimen-patient-age-gender">{specimen.age} yrs, {specimen.gender}</span>
                      </div>
                    </div>

                    <div className="specimen-details tech-specimen-details">
                      <div className="specimen-type-section tech-specimen-type-section">
                        <div className="specimen-type tech-specimen-type">
                          <span className="specimen-type-label tech-specimen-type-label">Type:</span>
                          <span className="specimen-type-value tech-specimen-type-value">{specimen.specimenType}</span>
                        </div>
                        <div className="specimen-container tech-specimen-container">
                          <span className="specimen-container-label tech-specimen-container-label">Container:</span>
                          <span className="specimen-container-value tech-specimen-container-value">{specimen.containerType}</span>
                        </div>
                      </div>

                      <div className="specimen-collection-info tech-specimen-collection-info">
                        <div className="specimen-collection-date tech-specimen-collection-date">
                          <span className="specimen-collection-label tech-specimen-collection-label">Collected:</span>
                          <span className="specimen-collection-value tech-specimen-collection-value">
                            {specimen.collectionDate} {specimen.collectionTime}
                          </span>
                        </div>
                        <div className="specimen-collected-by tech-specimen-collected-by">
                          <span className="specimen-collected-label tech-specimen-collected-label">By:</span>
                          <span className="specimen-collected-value tech-specimen-collected-value">{specimen.collectionBy}</span>
                        </div>
                      </div>

                      <div className="specimen-storage-info tech-specimen-storage-info">
                        <div className="specimen-storage-location tech-specimen-storage-location">
                          <span className="specimen-storage-label tech-specimen-storage-label">Location:</span>
                          <span className="specimen-storage-value tech-specimen-storage-value">{specimen.storageLocation}</span>
                        </div>
                        <div className="specimen-temperature tech-specimen-temperature">
                          <span className="specimen-temperature-label tech-specimen-temperature-label">Temp:</span>
                          <span className="specimen-temperature-value tech-specimen-temperature-value">{specimen.temperature}</span>
                        </div>
                        <div className="specimen-volume tech-specimen-volume">
                          <span className="specimen-volume-label tech-specimen-volume-label">Volume:</span>
                          <span className="specimen-volume-value tech-specimen-volume-value">{specimen.volume}</span>
                        </div>
                      </div>
                    </div>

                    <div className="specimen-tests-section tech-specimen-tests-section">
                      <h4 className="specimen-tests-title tech-specimen-tests-title">Tests Requested:</h4>
                      <div className="specimen-tests-list tech-specimen-tests-list">
                        {specimen.testsRequested.map((test, index) => (
                          <span key={index} className="specimen-test-tag tech-specimen-test-tag">{test}</span>
                        ))}
                      </div>
                    </div>

                    <div className="specimen-quality-section tech-specimen-quality-section">
                      <div className="specimen-quality-check tech-specimen-quality-check">
                        <span className="specimen-quality-label tech-specimen-quality-label">Quality:</span>
                        <span className={`specimen-quality-badge ${getQualityBadgeClass(specimen.qualityCheck)} tech-specimen-quality-badge tech-specimen-quality-badge--${specimen.qualityCheck.toLowerCase()}`}>
                          {specimen.qualityCheck}
                        </span>
                      </div>
                      <div className="specimen-expiration tech-specimen-expiration">
                        <span className="specimen-expiration-label tech-specimen-expiration-label">Expires:</span>
                        <span className="specimen-expiration-value tech-specimen-expiration-value">{specimen.expirationDate}</span>
                      </div>
                    </div>

                    <div className="specimen-card-footer tech-specimen-card-footer">
                      <div className="specimen-technician-notes tech-specimen-technician-notes">
                        <span className="specimen-notes-label tech-specimen-notes-label">Notes:</span>
                        <span className="specimen-notes-value tech-specimen-notes-value">{specimen.technicianNotes}</span>
                      </div>
                      
                      <div className="specimen-card-actions tech-specimen-card-actions">
                        <button 
                          className="specimen-action-btn-sm specimen-action-btn-view tech-specimen-action-btn-sm tech-specimen-action-btn-view"
                          onClick={() => handleViewSpecimen(specimen)}
                        >
                          View Details
                        </button>
                        <button 
                          className="specimen-action-btn-sm specimen-action-btn-label tech-specimen-action-btn-sm tech-specimen-action-btn-label"
                          onClick={() => handlePrintLabel(specimen.barcode)}
                        >
                          Print Label
                        </button>
                        <select 
                          className="specimen-status-select-sm tech-specimen-status-select-sm"
                          value={specimen.status}
                          onChange={(e) => handleStatusChange(specimen.id, e.target.value)}
                        >
                          <option value="collected">Collected</option>
                          <option value="processing">Processing</option>
                          <option value="stored">Stored</option>
                          <option value="processed">Processed</option>
                          <option value="transferred">Transferred</option>
                          <option value="rejected">Rejected</option>
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

      {/* Specimen Detail Modal */}
      {showSpecimenModal && selectedSpecimen && (
        <div className="specimen-modal-overlay tech-specimen-modal-overlay">
          <div className="specimen-modal tech-specimen-modal">
            <div className="specimen-modal-header tech-specimen-modal-header">
              <h2 className="specimen-modal-title tech-specimen-modal-title">Specimen Details</h2>
              <button 
                className="specimen-modal-close tech-specimen-modal-close"
                onClick={() => setShowSpecimenModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="specimen-modal-content tech-specimen-modal-content">
              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Identification</h3>
                <div className="specimen-modal-id-grid tech-specimen-modal-id-grid">
                  <div className="specimen-modal-id-item tech-specimen-modal-id-item">
                    <span className="specimen-modal-id-label tech-specimen-modal-id-label">Specimen ID:</span>
                    <span className="specimen-modal-id-value tech-specimen-modal-id-value">{selectedSpecimen.id}</span>
                  </div>
                  <div className="specimen-modal-id-item tech-specimen-modal-id-item">
                    <span className="specimen-modal-id-label tech-specimen-modal-id-label">Barcode:</span>
                    <span className="specimen-modal-id-value tech-specimen-modal-id-value">{selectedSpecimen.barcode}</span>
                  </div>
                  <div className="specimen-modal-id-item tech-specimen-modal-id-item">
                    <span className="specimen-modal-id-label tech-specimen-modal-id-label">Status:</span>
                    <span className={`specimen-modal-id-value specimen-status-badge ${getStatusBadgeClass(selectedSpecimen.status)} tech-specimen-modal-id-value tech-specimen-status-badge tech-specimen-status-badge--${selectedSpecimen.status}`}>
                      {selectedSpecimen.status}
                    </span>
                  </div>
                  <div className="specimen-modal-id-item tech-specimen-modal-id-item">
                    <span className="specimen-modal-id-label tech-specimen-modal-id-label">Priority:</span>
                    <span className={`specimen-modal-id-value specimen-priority-badge ${getPriorityBadgeClass(selectedSpecimen.priority)} tech-specimen-modal-id-value tech-specimen-priority-badge tech-specimen-priority-badge--${selectedSpecimen.priority}`}>
                      {selectedSpecimen.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Patient Information</h3>
                <div className="specimen-modal-patient-grid tech-specimen-modal-patient-grid">
                  <div className="specimen-modal-patient-item tech-specimen-modal-patient-item">
                    <span className="specimen-modal-patient-label tech-specimen-modal-patient-label">Name:</span>
                    <span className="specimen-modal-patient-value tech-specimen-modal-patient-value">{selectedSpecimen.patientName}</span>
                  </div>
                  <div className="specimen-modal-patient-item tech-specimen-modal-patient-item">
                    <span className="specimen-modal-patient-label tech-specimen-modal-patient-label">Patient ID:</span>
                    <span className="specimen-modal-patient-value tech-specimen-modal-patient-value">{selectedSpecimen.patientId}</span>
                  </div>
                  <div className="specimen-modal-patient-item tech-specimen-modal-patient-item">
                    <span className="specimen-modal-patient-label tech-specimen-modal-patient-label">Age/Gender:</span>
                    <span className="specimen-modal-patient-value tech-specimen-modal-patient-value">{selectedSpecimen.age} years, {selectedSpecimen.gender}</span>
                  </div>
                </div>
              </div>

              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Collection Details</h3>
                <div className="specimen-modal-collection-grid tech-specimen-modal-collection-grid">
                  <div className="specimen-modal-collection-item tech-specimen-modal-collection-item">
                    <span className="specimen-modal-collection-label tech-specimen-modal-collection-label">Specimen Type:</span>
                    <span className="specimen-modal-collection-value tech-specimen-modal-collection-value">{selectedSpecimen.specimenType}</span>
                  </div>
                  <div className="specimen-modal-collection-item tech-specimen-modal-collection-item">
                    <span className="specimen-modal-collection-label tech-specimen-modal-collection-label">Container:</span>
                    <span className="specimen-modal-collection-value tech-specimen-modal-collection-value">{selectedSpecimen.containerType}</span>
                  </div>
                  <div className="specimen-modal-collection-item tech-specimen-modal-collection-item">
                    <span className="specimen-modal-collection-label tech-specimen-modal-collection-label">Volume:</span>
                    <span className="specimen-modal-collection-value tech-specimen-modal-collection-value">{selectedSpecimen.volume}</span>
                  </div>
                  <div className="specimen-modal-collection-item tech-specimen-modal-collection-item">
                    <span className="specimen-modal-collection-label tech-specimen-modal-collection-label">Collection Date/Time:</span>
                    <span className="specimen-modal-collection-value tech-specimen-modal-collection-value">
                      {selectedSpecimen.collectionDate} at {selectedSpecimen.collectionTime}
                    </span>
                  </div>
                  <div className="specimen-modal-collection-item tech-specimen-modal-collection-item">
                    <span className="specimen-modal-collection-label tech-specimen-modal-collection-label">Collected By:</span>
                    <span className="specimen-modal-collection-value tech-specimen-modal-collection-value">{selectedSpecimen.collectionBy}</span>
                  </div>
                  <div className="specimen-modal-collection-item tech-specimen-modal-collection-item">
                    <span className="specimen-modal-collection-label tech-specimen-modal-collection-label">Received Date/Time:</span>
                    <span className="specimen-modal-collection-value tech-specimen-modal-collection-value">
                      {selectedSpecimen.receivedDate} at {selectedSpecimen.receivedTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Storage Information</h3>
                <div className="specimen-modal-storage-grid tech-specimen-modal-storage-grid">
                  <div className="specimen-modal-storage-item tech-specimen-modal-storage-item">
                    <span className="specimen-modal-storage-label tech-specimen-modal-storage-label">Location:</span>
                    <span className="specimen-modal-storage-value tech-specimen-modal-storage-value">{selectedSpecimen.storageLocation}</span>
                  </div>
                  <div className="specimen-modal-storage-item tech-specimen-modal-storage-item">
                    <span className="specimen-modal-storage-label tech-specimen-modal-storage-label">Temperature:</span>
                    <span className="specimen-modal-storage-value tech-specimen-modal-storage-value">{selectedSpecimen.temperature}</span>
                  </div>
                  <div className="specimen-modal-storage-item tech-specimen-modal-storage-item">
                    <span className="specimen-modal-storage-label tech-specimen-modal-storage-label">Expiration Date:</span>
                    <span className="specimen-modal-storage-value tech-specimen-modal-storage-value">{selectedSpecimen.expirationDate}</span>
                  </div>
                </div>
              </div>

              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Tests Requested</h3>
                <div className="specimen-modal-tests-list tech-specimen-modal-tests-list">
                  {selectedSpecimen.testsRequested.map((test, index) => (
                    <span key={index} className="specimen-modal-test-item tech-specimen-modal-test-item">{test}</span>
                  ))}
                </div>
              </div>

              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Quality Information</h3>
                <div className="specimen-modal-quality-grid tech-specimen-modal-quality-grid">
                  <div className="specimen-modal-quality-item tech-specimen-modal-quality-item">
                    <span className="specimen-modal-quality-label tech-specimen-modal-quality-label">Quality Check:</span>
                    <span className={`specimen-modal-quality-value specimen-quality-badge ${getQualityBadgeClass(selectedSpecimen.qualityCheck)} tech-specimen-modal-quality-value tech-specimen-quality-badge tech-specimen-quality-badge--${selectedSpecimen.qualityCheck.toLowerCase()}`}>
                      {selectedSpecimen.qualityCheck}
                    </span>
                  </div>
                  <div className="specimen-modal-quality-item tech-specimen-modal-quality-item">
                    <span className="specimen-modal-quality-label tech-specimen-modal-quality-label">Technician Notes:</span>
                    <span className="specimen-modal-quality-value tech-specimen-modal-quality-value">{selectedSpecimen.technicianNotes}</span>
                  </div>
                </div>
              </div>

              <div className="specimen-modal-section tech-specimen-modal-section">
                <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Special Instructions</h3>
                <div className="specimen-modal-instructions tech-specimen-modal-instructions">
                  <p>{selectedSpecimen.instructions}</p>
                </div>
              </div>

              {selectedSpecimen.attachments && selectedSpecimen.attachments.length > 0 && (
                <div className="specimen-modal-section tech-specimen-modal-section">
                  <h3 className="specimen-modal-section-title tech-specimen-modal-section-title">Attachments</h3>
                  <div className="specimen-modal-attachments tech-specimen-modal-attachments">
                    {selectedSpecimen.attachments.map((attachment, index) => (
                      <div key={index} className="specimen-modal-attachment-item tech-specimen-modal-attachment-item">
                        <span className="specimen-modal-attachment-icon tech-specimen-modal-attachment-icon">📎</span>
                        <span className="specimen-modal-attachment-name tech-specimen-modal-attachment-name">{attachment}</span>
                        <button className="specimen-modal-attachment-btn tech-specimen-modal-attachment-btn">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="specimen-modal-footer tech-specimen-modal-footer">
              <button 
                className="specimen-modal-btn specimen-modal-btn-secondary tech-specimen-modal-btn tech-specimen-modal-btn-secondary"
                onClick={() => setShowSpecimenModal(false)}
              >
                Close
              </button>
              <button 
                className="specimen-modal-btn specimen-modal-btn-primary tech-specimen-modal-btn tech-specimen-modal-btn-primary"
                onClick={() => handlePrintLabel(selectedSpecimen.barcode)}
              >
                Print Label
              </button>
              <select 
                className="specimen-modal-quality-select tech-specimen-modal-quality-select"
                value={selectedSpecimen.qualityCheck}
                onChange={(e) => handleQualityCheck(selectedSpecimen.id, e.target.value)}
              >
                <option value="Pending">Quality Check</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
              <select 
                className="specimen-modal-status-select tech-specimen-modal-status-select"
                value={selectedSpecimen.status}
                onChange={(e) => handleStatusChange(selectedSpecimen.id, e.target.value)}
              >
                <option value="collected">Update Status</option>
                <option value="processing">Processing</option>
                <option value="stored">Stored</option>
                <option value="processed">Processed</option>
                <option value="transferred">Transferred</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Collection Modal */}
      {showCollectionModal && <CollectionModal />}

      <footer className="specimen-footer tech-specimen-footer">
        <div className="specimen-footer-content tech-specimen-footer-content">
          <p className="specimen-footer-text tech-specimen-footer-text">
            AAB Technician Portal • Specimen Management System • Version 3.2.1
          </p>
          <p className="specimen-footer-copyright tech-specimen-footer-copyright">
            © {new Date().getFullYear()} AAB Medical Laboratory. All specimen handling protocols followed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SpecimenMenu;