import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ChevronLeft, ChevronRight, Edit, MapPin, Phone, Save, Trash2, X } from "lucide-react";
import { API_BASE_URL, getAuthHeaders, getAuthToken } from "../../../redux/apiConfig";
import "./ClinicPage.css";

const CLINICS_BASE_URL = `${API_BASE_URL}/clinics`;
const DEFAULT_CLINIC_IMAGE = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3";

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

const unwrapApiObject = (payload) => payload?.clinic || payload?.data?.clinic || payload?.data || payload || {};

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

  if (address && address !== "Address not available") {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

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

  const address = clinic.location || clinic.address || clinic.clinic_address || "Address not available";

  return {
    raw: clinic,
    id: clinic.id || clinic.clinic_id || clinic._id || index,
    doctorId: clinic.doctor_id || clinic.doctorId || clinic.doctor?.id || clinic.doctor?._id || "",
    name: clinic.clinic_name || clinic.clinicName || clinic.name || "Unnamed Clinic",
    address,
    phone: clinic.phone_number || clinic.phone || clinic.contact_number || "N/A",
    mapUrl: buildMapUrl(clinic, address),
    images: photos.length ? photos : [DEFAULT_CLINIC_IMAGE],
  };
};

export default function ClinicPage() {
  const authUser = useSelector((state) => state.auth?.user);
  const user = useMemo(() => authUser || getStoredAuthUser() || {}, [authUser]);
  const doctorId = useMemo(() => getDoctorId(user), [user]);
  const userRole = String(user.role || "doctor").toLowerCase();

  const [clinics, setClinics] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    clinicName: "",
    phone: "",
    address: "",
    photo: null,
  });
  const [activeClinicIndex, setActiveClinicIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const loadClinics = useCallback(async (signal) => {
    if (!doctorId) {
      setError("Doctor id not found. Please login again.");
      setStatus("failed");
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
        .filter((clinic) => !clinic.doctorId || String(clinic.doctorId) === String(doctorId));

      setClinics(rows);
      setActiveClinicIndex(0);
      setStatus("succeeded");
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to load clinics");
      setStatus("failed");
    }
  }, [doctorId, userRole]);

  useEffect(() => {
    const controller = new AbortController();
    loadClinics(controller.signal);
    return () => controller.abort();
  }, [loadClinics]);

  const startEdit = (clinic) => {
    setEditingId(clinic.id);
    setEditForm({
      clinicName: clinic.name,
      phone: clinic.phone === "N/A" ? "" : clinic.phone,
      address: clinic.address === "Address not available" ? "" : clinic.address,
      photo: null,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ clinicName: "", phone: "", address: "", photo: null });
  };

  const handleEditChange = (event) => {
    const { name, value, files } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: files ? files[0] || null : value,
    }));
  };

  const handleUpdate = async (clinicId) => {
    if (!editForm.clinicName || !editForm.phone || !editForm.address) {
      alert("Please fill clinic name, phone and address.");
      return;
    }

    const formData = new FormData();
    formData.append("doctor_id", doctorId);
    formData.append("clinic_name", editForm.clinicName);
    formData.append("phone_number", editForm.phone);
    formData.append("location", editForm.address);
    if (editForm.photo) formData.append("clinic_photo", editForm.photo);

    try {
      setIsSaving(true);
      const token = getAuthToken();
      const response = await axios.patch(`${CLINICS_BASE_URL}/${clinicId}`, formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const updated = normalizeClinic({ ...clinics.find((item) => item.id === clinicId)?.raw, ...unwrapApiObject(response.data), id: clinicId });
      setClinics((prev) => prev.map((clinic) => (clinic.id === clinicId ? updated : clinic)));
      cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to update clinic");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (clinicId) => {
    if (!window.confirm("Are you sure you want to delete this clinic?")) return;

    const previousClinics = clinics;
    setClinics((prev) => prev.filter((clinic) => clinic.id !== clinicId));
    setActiveClinicIndex((currentIndex) => Math.max(0, Math.min(currentIndex, clinics.length - 2)));

    try {
      await axios.delete(`${CLINICS_BASE_URL}/${clinicId}`, { headers: getAuthHeaders() });
    } catch (err) {
      setClinics(previousClinics);
      alert(err.response?.data?.message || err.response?.data?.error || "Failed to delete clinic");
    }
  };

  const changeClinic = (direction) => {
    setActiveClinicIndex((currentIndex) => (
      (currentIndex + direction + clinics.length) % clinics.length
    ));
  };

  const activeClinic = clinics[activeClinicIndex] || null;

  return (
    <div className="doctor-clinics-page">
      {error && <div className="doctor-clinics-error">{error}</div>}

      {status === "loading" ? (
        <div className="doctor-clinics-state">Loading clinics...</div>
      ) : clinics.length === 0 ? (
        <div className="doctor-clinics-state">No clinics found for this doctor.</div>
      ) : activeClinic ? (
        <div className="doctor-clinics-grid">
            <article className="doctor-clinic-card" key={activeClinic.id}>
              <div className="doctor-clinic-slider">
                <img
                  src={activeClinic.images[0]}
                  alt={activeClinic.name}
                  className="doctor-clinic-image"
                  onError={(event) => {
                    event.currentTarget.src = DEFAULT_CLINIC_IMAGE;
                  }}
                />

                <button
                  type="button"
                  className="doctor-clinic-slider-btn left"
                  onClick={() => changeClinic(-1)}
                  aria-label="Previous clinic"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className="doctor-clinic-slider-btn right"
                  onClick={() => changeClinic(1)}
                  aria-label="Next clinic"
                >
                  <ChevronRight />
                </button>
              </div>

              {editingId === activeClinic.id ? (
                <div className="doctor-clinic-edit">
                  <input
                    name="clinicName"
                    value={editForm.clinicName}
                    onChange={handleEditChange}
                    placeholder="Clinic name"
                  />
                  <input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    placeholder="Phone number"
                  />
                  <textarea
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    placeholder="Clinic address"
                    rows="3"
                  />
                  <input name="photo" type="file" accept="image/*" onChange={handleEditChange} />
                  <div className="doctor-clinic-actions">
                    <button type="button" onClick={() => handleUpdate(activeClinic.id)} disabled={isSaving}>
                      <Save size={16} /> {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button type="button" className="secondary" onClick={cancelEdit} disabled={isSaving}>
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="doctor-clinic-body">
                  <h2>{activeClinic.name}</h2>
                  <p><MapPin size={16} /> {activeClinic.address}</p>
                  <p><Phone size={16} /> {activeClinic.phone}</p>

                  <div className="doctor-clinic-actions">
                    <button type="button" onClick={() => startEdit(activeClinic)}>
                      <Edit size={16} /> Edit
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(activeClinic.id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => window.open(activeClinic.mapUrl, "_blank")}
                      disabled={!activeClinic.mapUrl}
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              )}
            </article>
        </div>
      ) : null}
    </div>
  );
}
