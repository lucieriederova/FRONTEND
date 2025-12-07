// src/OwnerBadge.js
import React from "react";

function OwnerBadge({ userName }) {
  return (
    <span style={{ 
      backgroundColor: "#dbeafe", // Světle modrá (jako na obrázku)
      color: "#000",
      padding: "5px 15px",
      borderRadius: "20px",       // Více zakulacené (styl pill)
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      fontSize: "0.9em"
    }}>
      👤 {userName}
    </span>
  );
}

export default OwnerBadge;