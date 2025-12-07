// src/ItemsList.js
import React, { useState } from "react";

// --- POMOCNÁ KOMPONENTA PRO JEDEN ŘÁDEK ---
// Řeší si vlastní hover efekt
const ItemRow = ({ item, onItemFinishedToggle, onItemDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: "flex", 
        alignItems: "center", 
        marginBottom: "10px",
        // Efekt při najetí: jemné posunutí a zvětšení
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.2s ease"
      }}
    >
      {/* Checkbox */}
      <input 
        type="checkbox" 
        checked={item.isFinished} 
        onChange={() => onItemFinishedToggle(item.id)}
        style={{ 
          marginRight: "15px", 
          cursor: "pointer",
          width: "25px", height: "25px", 
          accentColor: "#1988ff"
        }}
      />

      {/* Modrá kapsle */}
      <div style={{
        backgroundColor: "#1988ff",
        color: "white",
        borderRadius: "8px",        
        padding: "10px 15px",
        flexGrow: 1,                
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // Při najetí zvýrazníme stín
        boxShadow: isHovered ? "0 6px 12px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.2s ease"
      }}>
        <span style={{ fontSize: "1.1em", textDecoration: item.isFinished ? "line-through" : "none", opacity: item.isFinished ? 0.7 : 1 }}>
          {item.name}
        </span>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onItemDelete(item.id); }}
          style={{ 
            background: "none", border: "2px solid white", borderRadius: "5px", color: "white", 
            width: "30px", height: "30px", fontSize: "1.2em", fontWeight: "bold", 
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
            opacity: isHovered ? 1 : 0.8 // Křížek se zvýrazní, až když na řádek najedeš
          }}
          title="Smazat položku"
        >
          &times;
        </button>
      </div>
    </li>
  );
};

// --- HLAVNÍ SEZNAM ---
function ItemsList({ items, onItemFinishedToggle, onItemDelete }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <ItemRow 
            key={item.id} 
            item={item} 
            onItemFinishedToggle={onItemFinishedToggle} 
            onItemDelete={onItemDelete} 
          />
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;