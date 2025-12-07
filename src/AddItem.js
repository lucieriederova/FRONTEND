// src/AddItem.js
import React, { useState } from "react";

function AddItem({ onAddItem }) {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Stav pro hover efekt
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    onAddItem(inputValue);
    setInputValue("");
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setInputValue("");
  };

  if (!isExpanded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <button 
          onClick={() => setIsExpanded(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            backgroundColor: "#1988ff",
            color: "white",
            border: "none",
            borderRadius: "50%",        
            width: "50px", height: "50px",
            fontSize: "2em",
            cursor: "pointer",
            display: "flex", justifyContent: "center", alignItems: "center",
            paddingBottom: "4px",
            
            // --- EFEKTY PŘI NAJETÍ ---
            transform: isHovered ? "scale(1.15)" : "scale(1)", // Zvětšení
            boxShadow: isHovered ? "0 8px 15px rgba(25, 136, 255, 0.4)" : "0 4px 6px rgba(0,0,0,0.2)", // Záře
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" // Pružný efekt
          }}
          title="Přidat novou položku"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", animation: "fadeIn 0.2s" }}>
      <input type="text" placeholder="Nová položka..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") handleCancel(); }} style={{ flexGrow: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1em" }} />
      <button onClick={handleAdd} style={{ marginLeft: "10px", cursor: "pointer", border: "none", background: "none", color: "#22c55e", fontSize: "1.5em", fontWeight: "bold" }}>+</button>
      <button onClick={handleCancel} style={{ marginLeft: "5px", cursor: "pointer", border: "none", background: "none", color: "#ef4444", fontSize: "1.5em", fontWeight: "bold" }}>&times;</button>
    </div>
  );
}

export default AddItem;