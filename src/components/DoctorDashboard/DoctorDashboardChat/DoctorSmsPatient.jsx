// DoctorSmsPatient.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaCommentMedical, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import './DoctorSmsPatient.css';
import { getChatList } from '../../../redux/chatApi';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    status: 'Stable',
    lastVisit: '2024-01-15',
    phone: '+1 (555) 123-4567',
    avatarColor: '#3498db',
    bloodGroup: 'O+'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    condition: 'Diabetes Type 2',
    status: 'Needs Attention',
    lastVisit: '2024-01-14',
    phone: '+1 (555) 234-5678',
    avatarColor: '#e74c3c',
    bloodGroup: 'A-'
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    condition: 'Arthritis',
    status: 'Improving',
    lastVisit: '2024-01-12',
    phone: '+1 (555) 345-6789',
    avatarColor: '#2ecc71',
    bloodGroup: 'B+'
  },
  {
    id: 4,
    name: 'Emily Davis',
    age: 29,
    gender: 'Female',
    condition: 'Asthma',
    status: 'Stable',
    lastVisit: '2024-01-10',
    phone: '+1 (555) 456-7890',
    avatarColor: '#9b59b6',
    bloodGroup: 'AB+'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    age: 67,
    gender: 'Male',
    condition: 'Heart Disease',
    status: 'Critical',
    lastVisit: '2024-01-13',
    phone: '+1 (555) 567-8901',
    avatarColor: '#f39c12',
    bloodGroup: 'O-'
  }
];

const PatientList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [patients, setPatients] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const formatChatTime = (value) => {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getLastMessageText = (item) => {
        const lastMessage = item.lastMessage || item.last_message || item.latest_message;
        if (typeof lastMessage === 'string') return lastMessage;
        return lastMessage?.message || lastMessage?.text || item.message || item.content || 'No messages yet';
    };

    const getLastMessageTime = (item, patient) => {
        const lastMessage = item.lastMessage || item.last_message || item.latest_message;
        return formatChatTime(
            lastMessage?.created_at ||
            lastMessage?.createdAt ||
            lastMessage?.time ||
            item.last_message_time ||
            item.created_at ||
            item.updated_at ||
            patient.last_message_time
        );
    };

    useEffect(() => {
        const loadPatients = async () => {
            try {
                setStatus('loading');
                setError('');
                const chatList = await getChatList();
                setPatients(chatList.map((item, index) => {
                    const patient = item.patient || item.user || item;
                    return {
                    id: patient.id || patient._id || patient.patient_id || item.patient_id || patient.user_id,
                    name: patient.full_name || patient.fullname || patient.name || patient.patient_name || patientItem?.patient_name || 'Unknown Patient',
                    age: patient.age || 'NA',
                    gender: patient.gender || 'NA',
                    condition: patient.condition || patient.diagnosis || item.condition || 'No condition',
                    status: patient.status || item.status || 'Stable',
                    lastVisit: patient.lastVisit || patient.last_visit || item.last_visit || patient.created_at || '',
                    phone: patient.contact_number || patient.contact_number || '',
                    avatarColor: ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12'][index % 5],
                    bloodGroup: patient.bloodGroup || patient.blood_group || '',
                    unread: item.unread || item.unread_count || patient.unread || patient.unread_count || 0,
                    lastMessage: getLastMessageText(item),
                    messageTime: getLastMessageTime(item, patient),
                };
                }));
                setStatus('succeeded');
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to load chat list');
                setPatients([]);
                setStatus('failed');
            }
        };

        loadPatients();
    }, []);

    const getStatusClass = (status) => {
        if (!status) return 'status-stable';
        
        switch (status.toLowerCase()) {
            case 'critical': return 'status-critical';
            case 'needs attention': return 'status-warning';
            case 'improving': return 'status-improving';
            case 'stable': return 'status-stable';
            default: return 'status-stable';
        }
    };

    const handlePatientClick = (patient) => {
        if (patient && patient.id) {
            navigate(`/patient-chat/${patient.id}`);
        }
    };

    const handleSmsClick = (patient, e) => {
        e.stopPropagation();
        if (patient && patient.id) {
            navigate(`/patient-chat/${patient.id}`);
        }
    };

    // ✅ Safe filtering
    const filteredPatients = patients.filter(patient => {
        if (!patient) return false;
        
        const matchesSearch = (patient.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (patient.condition || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' ||
            (patient.status || '').toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="patient-list-container">
            <div className="patient-list-header">
                <h2>Patient List</h2>
                <div className="list-controls">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'critical' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('critical')}
                        >
                            Critical
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'needs attention' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('needs attention')}
                        >
                            Needs Attention
                        </button>
                    </div>
                </div>
            </div>

            <div className="patient-list">
                {status === 'loading' ? (
                    <div className="no-patients">
                        <p>Loading patients...</p>
                    </div>
                ) : status === 'failed' ? (
                    <div className="no-patients">
                        <p>{error}</p>
                    </div>
                ) : filteredPatients.length === 0 ? (
                    <div className="no-patients">
                        <p>No patients found matching your criteria.</p>
                    </div>
                ) : (
                    filteredPatients.map(patient => (
                        patient && (
                            <div
                                key={patient.id || Math.random()}
                                className="patient-card"
                                onClick={() => handlePatientClick(patient)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="patient-avatar" style={{ backgroundColor: patient.avatarColor || '#ccc' }}>
                                    {(patient.name || '').split(' ').map(n => n[0]).join('')}
                                </div>

                                <div className="patient-info">
                                    <div className="patient-name-row">
                                        <h3>{patient.name || 'Unknown Patient'}</h3>
                                        <span className={`patient-status ${getStatusClass(patient.status)}`}>
                                            {patient.status || 'Stable'}
                                        </span>
                                    </div>

                                    <div className="patient-details">
                                        <span className="patient-age-gender">
                                            {patient.age || 'NA'}y, {patient.gender || 'NA'}
                                        </span>
                                        <span className="patient-condition">{patient.condition || 'No condition'}</span>
                                    </div>

                                    <div className="patient-meta">
                                        <span className="last-visit">
                                            Message: {patient.lastMessage || 'No messages yet'}
                                        </span>
                                        {patient.messageTime && (
                                            <span className="last-visit">
                                                Time: {patient.messageTime}
                                            </span>
                                        )}
                                        <span className="last-visit">
                                            Last visit: {patient.lastVisit ? 
                                                format(new Date(patient.lastVisit), 'MMM d, yyyy') : 
                                                'N/A'}
                                        </span>
                                        <span className="patient-phone">
                                            <FaPhone /> {patient.phone || 'No phone'}
                                        </span>
                                    </div>
                                </div>

                                <div className="patient-actions">
                                    {(patient.unread || 0) > 0 && (
                                        <div className="unread-badge">{patient.unread}</div>
                                    )}
                                    <button
                                        className="sms-btn"
                                        onClick={(e) => handleSmsClick(patient, e)}
                                    >
                                        <FaCommentMedical /> SMS
                                    </button>
                                </div>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
};

export default PatientList;
