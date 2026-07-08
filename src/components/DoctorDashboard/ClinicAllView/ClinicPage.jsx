import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  BedDouble,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Hospital,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { API_BASE_URL, getAuthHeaders } from "../../../redux/apiConfig";
import "./ClinicPage.css";

const CLINICS_BASE_URL = `${API_BASE_URL}/clinics`;
const DEFAULT_CLINIC_IMAGE = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80";

const fallbackClinic = {
  id: "fallback-clinic",
  name: "Healthy Life Clinic",
  subtitle: "Multi-Specialty Hospital",
  address: "MG Road, Pune, Maharashtra",
  fullAddress: "123 Health Avenue, MG Road, Pune, Maharashtra 411001",
  phone: "+91 98765 43210",
  email: "contact@healthylife.in",
  website: "www.healthylifeclinic.in",
  image: DEFAULT_CLINIC_IMAGE,
  mapUrl: "",
  about: "Healthy Life Clinic is a premier multi-specialty healthcare facility dedicated to providing world-class medical services with a compassionate approach. Established in 2010, we have grown to become a trusted name in healthcare, combining state-of-the-art technology with renowned medical expertise.",
  mission: "To deliver accessible, high-quality, and patient-centric healthcare services through clinical excellence, innovation, and unwavering ethical standards.",
  specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Gastroenterology"],
  stats: {
    doctors: "28",
    departments: "12",
    beds: "180",
    emergency: "24/7",
    rating: "4.8",
  },
};

const doctors = [
  {
    name: "Dr. Rajesh Sharma",
    specialty: "Senior Cardiologist",
    experience: "15 Yrs Exp",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Dr. Anjali Desai",
    specialty: "Lead Neurologist",
    experience: "12 Yrs Exp",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
];

const getStoredAuthUser = () => {
  try {
    return JSON.parse(localStorage.getItem("authUser") || "null");
  } catch {
    return null;
  }
};

const unwrapApiArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.clinics)) return payload.clinics;
  if (Array.isArray(payload?.data?.clinics)) return payload.data.clinics;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const getDoctorId = (user = {}) => (
  user.doctor_id ||
  user.doctorId ||
  user.id ||
  user._id ||
  user.user_id ||
  user.userId ||
  ""
);

const getAssetUrl = (value) => {
  if (!value) return "";
  const path = String(value).trim().replace(/\\/g, "/");
  if (path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) return path;
  if (/^(\/9j\/|iVBORw0KGgo|R0lGOD|UklGR)/.test(path)) return `data:image/jpeg;base64,${path}`;
  return `${API_BASE_URL.replace("/api", "")}/${path.replace(/^\/+/, "")}`;
};

const bufferToDataUrl = (bufferValue) => {
  const bytes = Array.isArray(bufferValue?.data) ? bufferValue.data : bufferValue;
  if (!Array.isArray(bytes)) return "";

  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return `data:image/jpeg;base64,${window.btoa(binary)}`;
};

const parsePhotoValue = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(parsePhotoValue);

  if (typeof value === "object") {
    if (value.type === "Buffer" || Array.isArray(value.data)) {
      return [bufferToDataUrl(value)].filter(Boolean);
    }

    return [
      value.url,
      value.path,
      value.file,
      value.filename,
      value.image,
      value.clinic_photo,
    ].filter(Boolean);
  }

  const text = String(value).trim();
  if (!text) return [];

  if ((text.startsWith("[") && text.endsWith("]")) || (text.startsWith("{") && text.endsWith("}"))) {
    try {
      return parsePhotoValue(JSON.parse(text));
    } catch {
      return [text];
    }
  }

  if (text.startsWith("\\x")) {
    try {
      const bytes = text
        .slice(2)
        .match(/.{1,2}/g)
        ?.map((hex) => parseInt(hex, 16));
      return [bufferToDataUrl(bytes)].filter(Boolean);
    } catch {
      return [text];
    }
  }

  return text.includes(",") ? text.split(",").map((item) => item.trim()).filter(Boolean) : [text];
};

const buildMapUrl = (clinic, address) => {
  const existingUrl = clinic.map_url || clinic.mapUrl || clinic.google_map_url || "";
  if (existingUrl) return existingUrl;

  const lat = clinic.latitude || clinic.lat || clinic.location_lat || clinic.location?.lat;
  const lng = clinic.longitude || clinic.lng || clinic.location_lng || clinic.location?.lng;
  if (lat && lng) return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  if (address) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return "";
};

const normalizeClinic = (clinic, index = 0) => {
  const photos = parsePhotoValue([
    clinic.clinic_photo,
    clinic.clinicPhotoBuffer,
    clinic.clinic_photos,
    clinic.clinicPhoto,
    clinic.clinicPhotos,
    clinic.clinic_photo_url,
    clinic.clinicPhotoUrl,
    clinic.photo,
    clinic.photos,
    clinic.photo_data,
    clinic.photoData,
    clinic.image,
    clinic.images,
    clinic.image_url,
    clinic.image_urls,
    clinic.photo_url,
    clinic.photo_urls,
    clinic.file_path,
    clinic.filePath,
  ].filter(Boolean)).map(getAssetUrl);

  const address = clinic.location || clinic.address || clinic.clinic_address || fallbackClinic.address;
  const rawSpecialties = clinic.specialties || clinic.key_specialties || clinic.departments || clinic.services;
  const specialties = Array.isArray(rawSpecialties)
    ? rawSpecialties
    : String(rawSpecialties || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  return {
    raw: clinic,
    id: clinic.id || clinic.clinic_id || clinic._id || index,
    doctorId: clinic.doctor_id || clinic.doctorId || clinic.doctor?.id || clinic.doctor?._id || "",
    name: clinic.clinic_name || clinic.clinicName || clinic.name || fallbackClinic.name,
    subtitle: clinic.type || clinic.category || fallbackClinic.subtitle,
    address,
    fullAddress: clinic.full_address || clinic.fullAddress || clinic.address || address,
    phone: clinic.phone_number || clinic.phone || clinic.contact_number || fallbackClinic.phone,
    email: clinic.email || clinic.clinic_email || fallbackClinic.email,
    website: clinic.website || clinic.web_url || fallbackClinic.website,
    image: photos[0] || fallbackClinic.image,
    mapUrl: buildMapUrl(clinic, address),
    about: clinic.about || clinic.description || clinic.about_hospital || fallbackClinic.about,
    mission: clinic.mission || clinic.our_mission || fallbackClinic.mission,
    specialties: specialties.length ? specialties : fallbackClinic.specialties,
    stats: {
      doctors: clinic.doctors_count || clinic.doctor_count || clinic.total_doctors || fallbackClinic.stats.doctors,
      departments: clinic.departments_count || clinic.department_count || clinic.total_departments || fallbackClinic.stats.departments,
      beds: clinic.beds_count || clinic.bed_count || clinic.total_beds || fallbackClinic.stats.beds,
      emergency: clinic.emergency_status || clinic.emergency || fallbackClinic.stats.emergency,
      rating: clinic.rating || clinic.patient_rating || fallbackClinic.stats.rating,
    },
  };
};

export default function ClinicPage() {
  const authUser = useSelector((state) => state.auth?.user);
  const user = useMemo(() => authUser || getStoredAuthUser() || {}, [authUser]);
  const doctorId = useMemo(() => getDoctorId(user), [user]);
  const userRole = String(user.role || "doctor").toLowerCase();

  const [clinics, setClinics] = useState([]);
  const [activeClinicIndex, setActiveClinicIndex] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const loadClinic = useCallback(async (signal) => {
    if (!doctorId) {
      setClinics([]);
      setActiveClinicIndex(0);
      setStatus("succeeded");
      return;
    }

    try {
      setStatus("loading");
      setError("");
      const response = await axios.get(CLINICS_BASE_URL, {
        headers: getAuthHeaders(),
        params: { doctor_id: doctorId, role: userRole },
        signal,
      });

      const rows = unwrapApiArray(response.data)
        .map(normalizeClinic)
        .filter((item) => !item.doctorId || String(item.doctorId) === String(doctorId));

      setClinics(rows);
      setActiveClinicIndex(0);
      setStatus("succeeded");
    } catch (err) {
      if (axios.isCancel(err)) return;
      setClinics([]);
      setActiveClinicIndex(0);
      setError(err.response?.data?.message || err.response?.data?.error || "Showing sample clinic profile. Failed to load live clinic data.");
      setStatus("failed");
    }
  }, [doctorId, userRole]);

  useEffect(() => {
    const controller = new AbortController();
    loadClinic(controller.signal);
    return () => controller.abort();
  }, [loadClinic]);

  const clinic = clinics[activeClinicIndex] || fallbackClinic;

  const stats = [
    { label: "Doctors", value: clinic.stats.doctors, icon: Stethoscope, tone: "blue" },
    { label: "Departments", value: clinic.stats.departments, icon: Building2, tone: "indigo" },
    { label: "Beds", value: clinic.stats.beds, icon: BedDouble, tone: "green" },
    { label: "Emergency", value: clinic.stats.emergency, icon: Hospital, tone: "red" },
    { label: "Patient Rating", value: clinic.stats.rating, icon: Star, tone: "gold" },
  ];

  const changeClinic = (direction) => {
    if (!clinics.length) return;
    setActiveClinicIndex((currentIndex) => (
      (currentIndex + direction + clinics.length) % clinics.length
    ));
  };

  const formatWebsiteUrl = (website = "") => {
    if (!website) return "#";
    return website.startsWith("http") ? website : `https://${website}`;
  };

  return (
    <div className="doctor-clinic-profile-page">
      {error && <div className="doctor-clinic-profile-error">{error}</div>}

      <section className="doctor-clinic-hero">
        <img
          src={clinic.image}
          alt={clinic.name}
          onError={(event) => {
            event.currentTarget.src = DEFAULT_CLINIC_IMAGE;
          }}
        />
        <div className="doctor-clinic-hero-overlay" />

        <div className="doctor-clinic-hero-content">
          <div className="doctor-clinic-status-row">
            <span className="doctor-clinic-open-badge">Open Now</span>
            <span className="doctor-clinic-type-badge">{clinic.subtitle}</span>
          </div>

          <h1>{clinic.name}</h1>
          <div className="doctor-clinic-hero-meta">
            <span>
              <MapPin size={14} />
              {clinic.address}
            </span>
            <span>
              <Star size={14} fill="currentColor" />
              4.8 (1,250 Reviews)
            </span>
          </div>
        </div>

        <div className="doctor-clinic-hero-actions">
          <button type="button" className="doctor-clinic-book-btn">
            <CalendarDays size={15} />
            Book Appointment
          </button>
          <button type="button" aria-label="Call clinic" onClick={() => window.location.href = `tel:${clinic.phone}`}>
            <Phone size={15} />
          </button>
          <button
            type="button"
            aria-label="Open location"
            onClick={() => clinic.mapUrl && window.open(clinic.mapUrl, "_blank")}
          >
            <Navigation size={15} />
          </button>
          <button type="button" aria-label="Share clinic">
            <Share2 size={15} />
          </button>
        </div>

        {clinics.length > 1 && (
          <>
            <button
              type="button"
              className="doctor-clinic-switch-btn doctor-clinic-switch-prev"
              onClick={() => changeClinic(-1)}
              aria-label="Previous clinic"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="doctor-clinic-switch-btn doctor-clinic-switch-next"
              onClick={() => changeClinic(1)}
              aria-label="Next clinic"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </section>

      <nav className="doctor-clinic-tabs" aria-label="Clinic sections">
        {["Overview", "Doctors", "Departments", "Facilities", "Reviews", "Contact"].map((tab, index) => (
          <button type="button" className={index === 0 ? "is-active" : ""} key={tab}>
            {tab}
          </button>
        ))}
      </nav>

      <div className="doctor-clinic-profile-body">
        {status === "loading" && <div className="doctor-clinic-profile-state">Loading clinic profile...</div>}

        <section className="doctor-clinic-stats" aria-label="Clinic summary">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article className="doctor-clinic-stat-card" key={item.label}>
                <span className={`doctor-clinic-stat-icon doctor-clinic-stat-${item.tone}`}>
                  <Icon size={20} />
                </span>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            );
          })}
        </section>

        <section className="doctor-clinic-info-grid">
          <article className="doctor-clinic-panel doctor-clinic-about">
            <h2>About Hospital</h2>
            <p>{clinic.about}</p>

            <h3>Our Mission</h3>
            <p>{clinic.mission}</p>

            <h3>Key Specialties</h3>
            <div className="doctor-clinic-specialties">
              {clinic.specialties.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <aside className="doctor-clinic-panel doctor-clinic-contact">
            <h2>Contact Information</h2>
            <div className="doctor-clinic-contact-list">
              <span>
                <MapPin size={15} />
                {clinic.fullAddress}
              </span>
              <a href={`tel:${clinic.phone}`}>
                <Phone size={15} />
                {clinic.phone}
              </a>
              <a href={`mailto:${clinic.email}`}>
                <Mail size={15} />
                {clinic.email}
              </a>
              <a href={formatWebsiteUrl(clinic.website)} target="_blank" rel="noreferrer">
                <ExternalLink size={15} />
                {clinic.website}
              </a>
            </div>

            <div className="doctor-clinic-hours">
              <h3>Hours</h3>
              <p>
                <span>Emergency</span>
                <strong>24/7 Open</strong>
              </p>
              <p>
                <span>OPD Timings</span>
                <strong>8:00 AM - 8:00 PM</strong>
              </p>
            </div>
          </aside>
        </section>

        <section className="doctor-clinic-specialists-section">
          <div className="doctor-clinic-section-heading">
            <div>
              <h2>Featured Specialists</h2>
              <p>Our team of experienced medical professionals</p>
            </div>
            <button type="button">View All Doctors</button>
          </div>

          <div className="doctor-clinic-doctors">
            {doctors.map((doctor) => (
              <article className="doctor-clinic-doctor-card" key={doctor.name}>
                <img src={doctor.image} alt={doctor.name} />
                <div>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                  <div className="doctor-clinic-doctor-meta">
                    <span>
                      <Clock3 size={12} />
                      {doctor.experience}
                    </span>
                    <span>
                      <Star size={12} fill="currentColor" />
                      {doctor.rating}
                    </span>
                    <span>
                      <UsersRound size={12} />
                      4.8
                    </span>
                  </div>
                  <button type="button">Book Consult</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="doctor-clinic-floating-actions">
        <button type="button">
          <BookOpen size={15} />
          Book
        </button>
        <button type="button" onClick={() => window.location.href = `tel:${clinic.phone}`}>
          <Phone size={15} />
          Call
        </button>
      </div>

      <span className="doctor-clinic-trust">
        <ShieldCheck size={14} />
        Verified clinic profile
      </span>
    </div>
  );
}
