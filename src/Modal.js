// src/Modal.js
import React from "react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    // Pozadí (šedá clona)
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Poloprůhledná černá
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000 // Aby to bylo nad vším
    }}>
      
      {/* Samotné okno */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        width: "400px",
        maxWidth: "90%",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        animation: "fadeIn 0.2s"
      }}>
        
        {/* Hlavička okna */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#1988ff" }}>{title}</h2>
          <button 
            onClick={onClose}
            style={{ border: "none", background: "none", fontSize: "1.5em", cursor: "pointer", color: "#666" }}
          >
            &times;
          </button>
        </div>

        {/* Obsah okna (formulář nebo text) */}
        <div>
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;