import React, { useState } from "react";
import { MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react";

export default function ClinicPage() {
  const clinic = {
    name: "Healthy Life Clinic",
    address: "MG Road, Pune, Maharashtra",
    phone: "+91 98765 43210",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
      "data:image/jpeg;base64,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",],
    mapUrl: "https://www.google.com/maps",
  };

  const [index, setIndex] = useState(0);

  return (
    <div className="p-4" style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ margin: "auto", background: "#fff", borderRadius: 12, overflow: "hidden" }}>
        
        {/* Image Slider */}
        <div style={{ position: "relative" }}>
          <img
            src={clinic.images[index]}
            alt="Clinic"
            style={{ width: "100%", height: 450, objectFit: "cover" }}
          />

          <button onClick={() => setIndex((index - 1 + clinic.images.length) % clinic.images.length)}
            style={btnStyle("left")}>
            <ChevronLeft />
          </button>

          <button onClick={() => setIndex((index + 1) % clinic.images.length)}
            style={btnStyle("right")}>
            <ChevronRight />
          </button>
        </div>

        {/* Details */}
        <div style={{ padding: 20 }}>
          <h2>{clinic.name}</h2>

          <p><MapPin size={16} /> {clinic.address}</p>
          <p><Phone size={16} /> {clinic.phone}</p>

          <button onClick={() => window.open(clinic.mapUrl)} style={mainBtn}>
            View on Map
          </button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: 10,
  transform: "translateY(-50%)",
  background: "#fff",
  border: "none",
  borderRadius: "50%",
  padding: 8,
  cursor: "pointer",
});

const mainBtn = {
  marginTop: 10,
  padding: "10px 16px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
