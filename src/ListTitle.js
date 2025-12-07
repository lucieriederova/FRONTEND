// src/ListTitle.js
import React, { useState } from "react";

function ListTitle({ title, isOwner, onTitleChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const handleSave = () => {
    onTitleChange(inputValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
          autoFocus
          style={{ 
            fontSize: "2em", fontWeight: "bold", border: "1px solid #ccc", 
            borderRadius: "8px", padding: "5px", textAlign: "center", width: "80%" 
          }}
        />
      </div>
    );
  }

  return (
    // Změna: justifyContent: "center" a odstranění borderBottom
    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ margin: "10px 0" }}>{title}</h1>
      
      {isOwner && (
        <button 
          onClick={() => { setInputValue(title); setIsEditing(true); }}
          style={{ marginLeft: "10px", cursor: "pointer", border: "none", background: "none", fontSize: "1.5em" }}
          title="Přejmenovat seznam"
        >
          ✏️
        </button>
      )}
    </div>
  );
}

export default ListTitle;