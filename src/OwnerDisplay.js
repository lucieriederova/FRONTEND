import React from "react";
import OwnerBadge from "./OwnerBadge";

function OwnerDisplay({ owner }) {
  return (
    <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{
        backgroundColor: "#1988ff", // <--- NOVÁ MODRÁ
        color: "white",
        padding: "5px 15px",
        borderRadius: "20px",
        fontWeight: "bold",
        fontSize: "0.9em"
      }}>
        vlastník:
      </span>
      <OwnerBadge userName={owner.name} />
    </div>
  );
}

export default OwnerDisplay;