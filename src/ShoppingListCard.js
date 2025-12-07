// src/ShoppingListCard.js
import React, { useState } from "react";
import OwnerBadge from "./OwnerBadge";

const CardButton = ({ onClick, title, children, variant = "normal" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Červený styl pro smazání, Bílý pro ostatní
  const isDelete = variant === "delete";
  const baseColor = isDelete ? "#ef4444" : "white";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title}
      style={{
        background: isHovered ? baseColor : "none",
        color: isHovered ? (isDelete ? "white" : "#1988ff") : baseColor,
        border: `2px solid ${baseColor}`,
        borderRadius: "8px",
        width: "35px", height: "35px",
        fontSize: "1.2em",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 0,
        transition: "all 0.2s",
        transform: isHovered ? "scale(1.1)" : "scale(1)"
      }}
    >
      {children}
    </button>
  );
};

// Přidali jsme prop 'currentUser'
function ShoppingListCard({ id, name, owner, items, isArchived, currentUser, onDelete, onArchive, onOpenDetail }) {
  const [isHovered, setIsHovered] = useState(false);

  const safeItems = items || [];
  const totalItems = safeItems.length;
  const finishedItems = safeItems.filter(item => item.isFinished).length;

  // Zjistíme, jestli je přihlášený uživatel vlastníkem tohoto seznamu
  const isOwner = currentUser.id === owner.id;

  return (
    <div 
      onClick={() => onOpenDetail(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: "#1988ff", 
        color: "white",             
        padding: "20px", 
        borderRadius: "20px",       
        marginBottom: "15px",
        transform: isHovered ? "translateY(-5px)" : "none", 
        boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.3)" : "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        display: "flex", flexDirection: "column", gap: "20px", cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{ margin: 0, fontSize: "1.4em" }}>{name}</h3>
        <OwnerBadge userName={owner.name} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: "1.3em", fontWeight: "500", opacity: 0.9 }}>
          vyřešeno: {finishedItems}/{totalItems}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          
          {/* Tlačítko SMAZAT - zobrazí se JEN VLASTNÍKOVI */}
          {isOwner && (
            <CardButton 
              onClick={(e) => { e.stopPropagation(); onDelete(id); }} 
              title="Smazat seznam"
              variant="delete" // Aby bylo červené
            >
              &times;
            </CardButton>
          )}

          <CardButton onClick={(e) => { e.stopPropagation(); onOpenDetail(id); }} title="Upravit">✎</CardButton>
          
          <CardButton onClick={(e) => { e.stopPropagation(); onArchive(id); }} title={isArchived ? "Obnovit" : "Archivovat"}>
            {isArchived ? "📤" : "📂"}
          </CardButton>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListCard;