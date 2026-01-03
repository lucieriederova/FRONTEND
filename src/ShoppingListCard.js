// src/ShoppingListCard.js
import React from "react";
import { useTranslation } from "react-i18next";

// Váš upravený OwnerBadge komponent s designem podle požadavku
const OwnerBadge = ({ userName, label }) => (
  <span style={{ 
    backgroundColor: "#A0DDFF", 
    color: "#36454F",   
    opacity: 0.9,         
    padding: "6px 16px",
    borderRadius: "20px",       
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    fontSize: "0.9 rem",
    maxWidth: "200px",         
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }}>
    <span style={{ fontSize: "1.1em" }}>👤</span> 
    {/* Zobrazíme label (např. "Vlastník:") a jméno */}
    {label && <span style={{ fontWeight: "normal", marginRight: "2px" }}>{label}</span>}
    {userName || "Neznámý"}
  </span>
);

function ShoppingListCard({ id, name, owner, isArchived, items, currentUser, onDelete, onArchive, onOpenDetail }) {
  const { t } = useTranslation();
  
  const total = items.length;
  const resolved = items.filter(i => i.isFinished).length;
  
  // Bezpečná kontrola, zda jsme vlastníkem
  const isOwner = owner && currentUser && owner.id === currentUser.id;
  
  // Získání jména vlastníka (pojistka, kdyby owner byl null)
  const ownerName = owner ? owner.name : "";

  return (
    <div className="card shopping-list-card" onClick={() => onOpenDetail(id)}>
      
      {/* Horní část: Název + Vlastník */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "bold", color: "white", paddingRight: "10px", wordBreak: "break-word" }}>
          {name}
        </h3>
        
        {/* Vložení upraveného badge */}
        <OwnerBadge 
          userName={ownerName} 
          label={isOwner ? t("owner_label") : ""} 
        />
      </div>

      {/* Spodní část: Statistiky + Ikony */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "white", opacity: 0.9 }}>
          {t("resolved_count")} {resolved}/{total}
        </span>

        <div style={{ display: "flex", gap: "8px" }} onClick={(e) => e.stopPropagation()}>
          {isOwner && (
            <button className="btn-icon" title={t("delete_confirm_title")} onClick={() => onDelete(id)}>
              🗑️
            </button>
          )}
          <button className="btn-icon" title={isArchived ? "Obnovit" : "Archivovat"} onClick={() => onArchive(id)}>
            {isArchived ? "📂" : "📁"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListCard;