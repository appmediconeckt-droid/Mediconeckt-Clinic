// src/components/DoctorDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './DoctorDetailPage.css';
import { API_BASE_URL } from '../redux/apiConfig';
import axios from 'axios';

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [profileData, setProfileData] = useState(null);

  // Doctor data (same as in DoctorLandingPage)
  // const detailedDoctors = [
  //   {
  //     id: 0,
  //     name: "Dr. Sarah Johnson",
  //     specialization: "Cardiologist",
  //     rating: 4.8,
  //     experience: "12 years",
  //     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  //     description: "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating heart-related conditions.",
  //     education: [
  //       "MD - Harvard Medical School",
  //       "Fellowship in Cardiology - Johns Hopkins Hospital",
  //       "Board Certified in Cardiovascular Disease"
  //     ],
  //     contact: {
  //       phone: "+1 (555) 123-4567",
  //       email: "sarah.johnson@medicalclinic.com",
  //       clinicAddress: "123 Medical Center Blvd, Suite 405, New York, NY 10001"
  //     },
  //     availability: {
  //       days: ["Monday", "Wednesday", "Friday", "Saturday"],
  //       timings: "9:00 AM - 5:00 PM",
  //       nextAvailable: "Tomorrow at 10:00 AM"
  //     },
  //     appointmentTypes: [
  //       { type: "In-Clinic Visit", duration: "30 min", price: "$150" },
  //       { type: "Video Consultation", duration: "20 min", price: "$120" },
  //       { type: "Voice Call", duration: "15 min", price: "$80" }
  //     ],
  //     specialties: ["Coronary Artery Disease", "Heart Failure", "Hypertension"],
  //     languages: ["English", "Spanish", "French"],
  //     reviews: [
  //       { patient: "Robert Chen", rating: 5, comment: "Excellent doctor, very thorough and caring." },
  //       { patient: "Maria Garcia", rating: 4.5, comment: "Great experience, explained everything clearly." }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: "Dr. Michael Rodriguez",
  //     specialization: "Neurologist",
  //     rating: 4.9,
  //     experience: "15 years",
  //     image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  //     description: "Dr. Michael Rodriguez is a renowned neurologist specializing in movement disorders.",
  //     education: [
  //       "MD - Stanford University School of Medicine",
  //       "PhD in Neuroscience - MIT",
  //       "Fellowship in Movement Disorders - Mayo Clinic"
  //     ],
  //     contact: {
  //       phone: "+1 (555) 987-6543",
  //       email: "m.rodriguez@neurocare.com",
  //       clinicAddress: "456 Brain Health Ave, Suite 210, Boston, MA 02115"
  //     },
  //     availability: {
  //       days: ["Tuesday", "Thursday", "Friday"],
  //       timings: "10:00 AM - 6:00 PM",
  //       nextAvailable: "Next Tuesday at 2:00 PM"
  //     },
  //     appointmentTypes: [
  //       { type: "In-Clinic Visit", duration: "45 min", price: "$200" },
  //       { type: "Video Consultation", duration: "30 min", price: "$150" }
  //     ],
  //     specialties: ["Parkinson's Disease", "Alzheimer's", "Migraine", "Epilepsy"],
  //     languages: ["English", "Spanish"],
  //     reviews: [
  //       { patient: "James Wilson", rating: 5, comment: "Life-changing treatment for my Parkinson's." },
  //       { patient: "Lisa Thompson", rating: 5, comment: "Very knowledgeable and patient." }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Priya Sharma",
  //     specialization: "Pediatrician",
  //     rating: 4.7,
  //     experience: "8 years",
  //     image: "data:image/jpeg;base64,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",
  //     description: "Dr. Priya Sharma is a compassionate pediatrician dedicated to children's health.",
  //     education: [
  //       "MD - University of California, San Francisco",
  //       "Residency in Pediatrics - Boston Children's Hospital",
  //       "Board Certified in Pediatrics"
  //     ],
  //     contact: {
  //       phone: "+1 (555) 456-7890",
  //       email: "priya.sharma@childcareclinic.com",
  //       clinicAddress: "789 Children's Way, Suite 105, Chicago, IL 60611"
  //     },
  //     availability: {
  //       days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
  //       timings: "8:00 AM - 4:00 PM",
  //       nextAvailable: "Today at 3:00 PM"
  //     },
  //     appointmentTypes: [
  //       { type: "Well-Child Visit", duration: "30 min", price: "$120" },
  //       { type: "Sick Visit", duration: "20 min", price: "$100" }
  //     ],
  //     specialties: ["Newborn Care", "Vaccinations", "Childhood Asthma"],
  //     languages: ["English", "Hindi", "Gujarati"],
  //     reviews: [
  //       { patient: "Amanda Lee", rating: 4.5, comment: "My kids love visiting Dr. Sharma!" },
  //       { patient: "David Miller", rating: 5, comment: "Always patient and understanding." }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. James Wilson",
  //     specialization: "Orthopedic Surgeon",
  //     rating: 4.6,
  //     experience: "18 years",
  //     image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face",
  //     description: "Dr. James Wilson is an experienced orthopedic surgeon specializing in sports injuries.",
  //     education: [
  //       "MD - Duke University School of Medicine",
  //       "Orthopedic Surgery Residency - Hospital for Special Surgery",
  //       "Fellowship in Sports Medicine - Andrews Sports Medicine Center"
  //     ],
  //     contact: {
  //       phone: "+1 (555) 234-5678",
  //       email: "j.wilson@orthocare.com",
  //       clinicAddress: "321 Sports Medicine Plaza, Suite 500, Los Angeles, CA 90024"
  //     },
  //     availability: {
  //       days: ["Monday", "Wednesday", "Thursday"],
  //       timings: "7:00 AM - 3:00 PM",
  //       nextAvailable: "Next Wednesday at 11:00 AM"
  //     },
  //     appointmentTypes: [
  //       { type: "Surgical Consultation", duration: "45 min", price: "$250" },
  //       { type: "Follow-up Visit", duration: "20 min", price: "$120" }
  //     ],
  //     specialties: ["Knee Replacement", "ACL Reconstruction", "Shoulder Surgery"],
  //     languages: ["English"],
  //     reviews: [
  //       { patient: "Tom Harris", rating: 5, comment: "Successful knee surgery!" },
  //       { patient: "Susan Clark", rating: 4, comment: "Professional and skilled surgeon." }
  //     ]
  //   }
  // ];

  // Find the doctor by ID
  // const doctor = detailedDoctors.find(doc => doc.id === parseInt(id));
  const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";

  const stringToArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return String(value).split(",").map((item) => item.trim()).filter(Boolean);
  };

  const [animatedSections, setAnimatedSections] = useState({});

  const getDoctorId = () => {
    const authUser = localStorage.getItem("authUser");

    console.log("authUser:", authUser);

    if (!authUser) return null;

    try {
      const parsed = JSON.parse(authUser);

      return (
        parsed?.id ||
        parsed?.user?.id ||
        parsed?.data?.id ||
        parsed?.data?.user?.id ||
        null
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchDoctorProfile = async () => {
    try {
      const doctorId = getDoctorId();

      console.log("Doctor ID:", doctorId);

      if (!doctorId) {
        console.log("Doctor ID not found");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/users/doctor-profile/${doctorId}`
      );

      console.log("Profile Response:", response.data);

      const data = response.data.data;

      setProfileData({
        personalDetails: {
          fullName: data.full_name || "",
          email: data.email || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          languages: data.languages || "",
          position: data.position || "",
          boardCertification: data.board_certification || "",
          profileImage: data.profile_image || DEFAULT_PROFILE_IMAGE,
        },

        professionalSummary: {
          about: data.about_doctor || "",
          expertise: data.expertise || "",
          awards: stringToArray(data.awards),
          researchFocus: data.research_focus || "",
        },

        educationTraining: {
          medicalDegree: data.medical_degree || "",
          residency: data.residency || "",
          fellowship: data.fellowship || "",
          specialTraining: data.special_training || "",
        },

        hospitalAffiliations: {
          primaryHospital: data.primary_hospital || "",
          address: data.hospital_address || "",
          googleMapLink: data.google_map_link || "",
          allHospitals: stringToArray(data.all_hospitals),
          contact: data.contact_number || "",
          videoVisits: data.video_visits || "",
        },

        clinicalFocus: {
          primarySpecialties: stringToArray(data.primary_specialties),
          allConditions: stringToArray(data.all_conditions),
        },

        availability: {
          todayAvailable: Boolean(Number(data.today_available)),
          onlineConsultation: Boolean(Number(data.online_consultation)),
          location: data.doctor_location || "",
          acceptsNewPatients: Boolean(Number(data.accepts_new_patients)),
          consultationHours: data.consultation_hours || "",
        },

        consultationFees: {
          initialConsultation: data.initial_consultation_fee || "",
          followUpVisit: data.follow_up_visit_fee || "",
          onlineConsultation: data.online_consultation_fee || "",
          insuranceAccepted: Boolean(Number(data.insurance_accepted)),
        },

        insuranceInformation: {
          acceptedInsurances: stringToArray(data.accepted_insurances),
          insuranceNote: data.insurance_note || "",
        },
      });
    } catch (error) {
      console.log(
        "GET Profile Error:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  useEffect(() => {
    if (!profileData) return;

    Object.keys(profileData).forEach((section, index) => {
      setTimeout(() => {
        setAnimatedSections((prev) => ({
          ...prev,
          [section]: true,
        }));
      }, index * 100);
    });
  }, [profileData]);

  // If doctor not found
  if (!profileData) {
    return (
      <div className="doctor-detail-container">
        <div className="doctor-not-found-alert">
          <h4 className="doctor-not-found-heading">Doctor not found!</h4>
          <p>Sorry, the doctor you're looking for doesn't exist.</p>
          <hr />
          <button className="back-home-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Generate time slots
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  // Handle appointment booking
  const handleBookAppointment = (e) => {
    e.preventDefault();

    if (!selectedAppointmentType || !selectedDate || !selectedTime || !patientName) {
      alert('Please fill all required fields');
      return;
    }

    console.log('Appointment booked:', {
      doctorId: doctor.id,
      doctorName: doctor.name,
      appointmentType: selectedAppointmentType,
      date: selectedDate,
      time: selectedTime,
      patientName,
      patientEmail,
      patientPhone
    });

    setShowBookingSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowBookingSuccess(false);
      setSelectedAppointmentType('');
      setSelectedDate('');
      setSelectedTime('');
      setPatientName('');
      setPatientEmail('');
      setPatientPhone('');
    }, 3000);
  };

  return (
    <div className="doctor-detail-container">
      {/* Success Message */}
      {showBookingSuccess && (
        <div className="booking-success-alert">
          <strong>Appointment Booked Successfully!</strong> You will receive a confirmation email shortly.
          <button type="button" className="alert-close-btn" onClick={() => setShowBookingSuccess(false)}></button>
        </div>
      )}

      <button className="back-doctors-btn" onClick={() => navigate('/doctor')}>
        ← Back to Doctors
      </button>

      <div className="doctor-detail-row">
        {/* Doctor Profile Section */}
        <div className="doctor-profile-column">
          <div className="doctor-profile-card">
            <div className="profile-card-body">
              <div className="profile-row">
                <div className="profile-image-column">
                  <img
                    src={profileData?.personalDetails?.profileImage || DEFAULT_PROFILE_IMAGE}
                    alt={profileData?.personalDetails?.fullName || "Doctor"}
                    className="doctor-profile-img"
                  />
                  <div className="doctor-rating-badges">
                    <span className="rating-badge">
                      ⭐ {profileData?.rating}/5
                    </span>
                    <span className="experience-badge">{profileData?.experience} experience</span>
                  </div>
                  <div><button className='book-appointment-btn' onClick={() => navigate('/patient-appointment')}>Book Appointment</button></div>
                </div>
                <div className="profile-info-column">
                  <h2 className="doctor-name">
                    {profileData?.personalDetails?.fullName}
                  </h2>

                  <h4 className="doctor-specialization">
                    {profileData?.personalDetails?.position}
                  </h4>

                  <p className="doctor-description">
                    {profileData?.professionalSummary?.about}
                  </p>
                  <h4 className="doctor-specialization">{profileData?.specialization}</h4>
                  <p className="doctor-description">{profileData?.description}</p>

                  <div className="profile-details-row">
                    <div className="contact-info-column">
                      <h5 className="section-title">Contact Information</h5>
                      <ul className="contact-list">
                        <li><strong>Phone:</strong> {profileData?.hospitalAffiliations?.contact}</li>
                        <li><strong>Email:</strong> {profileData?.personalDetails?.email}</li>
                        <li><strong>Address:</strong> {profileData?.hospitalAffiliations?.address}</li>
                      </ul>
                    </div>
                    <div className="languages-column">
                      <h5 className="section-title">Languages Spoken</h5>
                      <div className="language-badges">
                        {stringToArray(profileData?.personalDetails?.languages).map((language, index) => (
                          <span key={index} className="language-badge">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Specialties */}
          <div className="qualifications-row">
            <div className="education-column">
              <div className="education-card">
                <div className="education-card-header">
                  <h5 className="card-header-title">Education & Qualifications</h5>
                </div>
                <div className="education-card-body">
                  <ul className="education-list">
                    {[
                      profileData?.educationTraining?.medicalDegree,
                      profileData?.educationTraining?.residency,
                      profileData?.educationTraining?.fellowship,
                      profileData?.educationTraining?.specialTraining,
                    ].filter(Boolean).map((item, index) => (
                      <li key={index} className="education-item">
                        <i className="education-icon"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="specialties-column">
              <div className="specialties-card">
                <div className="specialties-card-header">
                  <h5 className="card-header-title">Specialties</h5>
                </div>
                <div className="specialties-card-body">
                  <div className="specialty-badges">
                    {profileData?.clinicalFocus?.primarySpecialties?.map((specialty, index) => (
                      <span key={index} className="specialty-badge">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="availability-card">
            <div className="availability-card-header">
              <h5 className="card-header-title">Availability</h5>
            </div>
            <div className="availability-card-body">
              <div className="availability-row">
                <div className="days-column">
                  <h6 className="availability-subtitle">Available Days</h6>
                  <div className="day-grid">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div
                        key={day}
                        className={`day-cell ${stringToArray(profileData?.availability?.consultationHours).includes(day) ? 'available-day' : 'unavailable-day'}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="timings-column">
                  <div className="timing-info">
                    <h6 className="availability-subtitle">Timings</h6>
                    <p className="timing-text">{profileData?.availability?.timings}</p>
                  </div>
                  <div className="next-available-alert">
                    <strong>Next Available:</strong> {profileData?.availability?.nextAvailable}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Reviews */}
          <div className="reviews-card">
            <div className="reviews-card-header">
              <h5 className="card-header-title">Patient Reviews</h5>
              <span className="reviews-count">
                {(profileData?.reviews || []).length} reviews
              </span>
            </div>
            <div className="reviews-card-body">
              {(profileData?.reviews || []).map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <h6 className="review-patient">{review.patient}</h6>
                    <div className="review-rating">
                      <span className="stars">
                        {'★'.repeat(Math.floor(review.rating))}
                        {'☆'.repeat(5 - Math.floor(review.rating))}
                      </span>
                      <span className="rating-score">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Booking Section */}

      </div>
    </div>
  );
};

export default DoctorDetailPage;