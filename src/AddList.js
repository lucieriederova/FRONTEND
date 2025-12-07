// src/AddList.js
import React, { useState } from "react";
import Modal from "./Modal"; // <--- Importujeme Modal

function AddList({ onAdd }) {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Stav pro otevření okna
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    onAdd(inputValue);
    setInputValue("");
    setIsModalOpen(false); // Zavřeme okno po přidání
  };

  return (
    <>
      {/* 1. Velké tlačítko PLUS (zůstává stejné) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          background: "none",
          border: "none",
          color: "#1988ff",
          fontSize: "3em",     
          fontWeight: "bold",
          cursor: "pointer",
          padding: 0,
          lineHeight: "0.8",   
          display: "flex", alignItems: "center",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.2s"
        }}
        title="Vytvořit nový seznam"
      >
        +
      </button>

      {/* 2. MODÁLNÍ OKNO s formulářem */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nový seznam"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={{ fontWeight: "bold", color: "#333" }}>Název seznamu:</label>
          <input 
            type="text" 
            placeholder="Např. Víkendový nákup..." 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            style={{ 
              padding: "10px", 
              borderRadius: "8px", 
              border: "1px solid #ccc", 
              fontSize: "1em",
              width: "100%",
              boxSizing: "border-box"
            }} 
          />
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #ccc", background: "white", cursor: "pointer" }}
            >
              Zrušit
            </button>
            <button 
              onClick={handleAdd}
              style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#1988ff", color: "white", fontWeight: "bold", cursor: "pointer" }}
            >
              Vytvořit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddList;