import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ProfileAvatarModal({ show, onHide, onSave }) {
  const [image, setImage] = useState("");

  // Upload Image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(image);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered style={{background:"none", maxWidth:"100%"}}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Photo</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        {/* Preview Box */}
        <div
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #ddd",
            margin: "0 auto",
          }}
        >
          <img
            src={
              image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Upload Input */}
        <div className="mt-3">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!image}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
