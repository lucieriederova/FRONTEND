// src/MemberBadge.js
import React from "react";

function MemberBadge({ member, isOwner, currentUserId, onRemove }) {
  const isMe = member.id === currentUserId;

  return (
    <div style={{ 
      display: "inline-flex",        // Změna na inline-flex, aby byly vedle sebe
      alignItems: "center",
      backgroundColor: isMe ? "#bfdbfe" : "#dbeafe", // Zvýraznění pro "Já" (tmavší modrá)
      borderRadius: "20px",
      padding: "5px 15px",
      marginRight: "10px",           // Mezera mezi tabletkami
      marginBottom: "5px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      fontSize: "0.9em"
    }}>
      
      <span style={{ fontWeight: "bold", marginRight: "5px" }}>
        👤 {member.name} {isMe && "(Já)"}
      </span>

      {/* Tlačítka pro akce (křížek / šipka) */}
      {/* Zobrazí se jen, když je potřeba */}
      {((isOwner && !isMe) || (!isOwner && isMe)) && (
        <button 
          onClick={() => onRemove(member.id)}
          style={{ 
            color: "#ef4444", // Červená
            border: "none", 
            background: "none", 
            cursor: "pointer", 
            fontSize: "1.1em", 
            fontWeight: "bold",
            marginLeft: "5px",
            padding: 0,
            display: "flex",
            alignItems: "center"
          }}
          title={isOwner ? "Odebrat člena" : "Odejít ze seznamu"}
        >
          {isOwner ? "×" : "➜"}
        </button>
      )}
    </div>
  );
}

export default MemberBadge;