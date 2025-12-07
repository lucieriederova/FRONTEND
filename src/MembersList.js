import React, { useState } from "react";
import MemberBadge from "./MemberBadge";

function MembersList({ members, isOwner, currentUserId, onAdd, onRemove }) {
  const [newMemberName, setNewMemberName] = useState("");

  const handleAddClick = () => {
    if (newMemberName.trim() === "") return;
    onAdd(newMemberName);
    setNewMemberName("");
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
        
        <span style={{
          backgroundColor: "#1988ff",
          color: "white",
          padding: "5px 15px",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "0.9em",
          height: "fit-content", 
          marginTop: "2px"       
        }}>
          members:
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          {members.map((member) => (
            <MemberBadge key={member.id} member={member} isOwner={isOwner} currentUserId={currentUserId} onRemove={onRemove} />
          ))}

          {isOwner && (
            <div style={{ display: "inline-flex", alignItems: "center", marginLeft: "5px" }}>
              <input type="text" placeholder="Jméno..." value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} style={{ padding: "5px 10px", borderRadius: "15px", border: "1px solid #ccc", outline: "none", fontSize: "0.85em", width: "100px" }} />
              <button onClick={handleAddClick} style={{ marginLeft: "5px", cursor: "pointer", backgroundColor: "#22c55e", color: "white", border: "none", borderRadius: "50%", width: "25px", height: "25px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersList;