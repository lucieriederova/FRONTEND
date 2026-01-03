// src/DetailRoute.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// IMPORTY PRO GRAF
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from "./Header";

function DetailRoute({ data, onUpdate, onBack }) {
  const { t } = useTranslation();
  
  const currentUserId = "u1"; 
  const isOwner = data.owner.id === currentUserId;

  const [newTitle, setNewTitle] = useState(data.name);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [filterUnresolved, setFilterUnresolved] = useState(false);

  // --- FUNKCE (Handlery) ---
  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem = { id: "item-" + Date.now(), name: newItemName, isFinished: false };
    onUpdate({ ...data, items: [...data.items, newItem] });
    setNewItemName("");
  };
  const toggleItem = (itemId) => {
    const updatedItems = data.items.map(item => item.id === itemId ? { ...item, isFinished: !item.isFinished } : item);
    onUpdate({ ...data, items: updatedItems });
  };
  const deleteItem = (itemId) => {
    const updatedItems = data.items.filter(item => item.id !== itemId);
    onUpdate({ ...data, items: updatedItems });
  };
  const handleAddMember = () => {
    const memberName = prompt("Zadejte jméno nového člena:");
    if (memberName) {
      const newMember = { id: "u" + Date.now(), name: memberName };
      onUpdate({ ...data, members: [...data.members, newMember] });
    }
  };
  const handleRemoveMember = (memberId) => {
    if (window.confirm("Odebrat člena?")) {
      const updatedMembers = data.members.filter(m => m.id !== memberId);
      onUpdate({ ...data, members: updatedMembers });
    }
  };
  const handleLeaveList = () => {
    if (window.confirm(t("leave_confirm"))) onBack();
  };
  const handleTitleSave = () => {
    onUpdate({ ...data, name: newTitle });
    setIsEditingTitle(false);
  };

  // --- PŘÍPRAVA DAT PRO GRAF ---
  const finishedCount = data.items.filter(i => i.isFinished).length;
  const unfinishedCount = data.items.length - finishedCount;
  const pieData = [{ name: t("item_resolved"), value: finishedCount }, { name: t("item_unresolved"), value: unfinishedCount }];
  // Barvy pro graf: Zelená (hotovo) a Oranžová (nehotovo)
  const COLORS = ['#FFEEDD', '#B74F6F'];

  const visibleItems = filterUnresolved ? data.items.filter(i => !i.isFinished) : data.items;

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Header goHome={onBack} />
      
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <button className="btn btn-secondary" onClick={onBack}>⬅ {t("back")}</button>
          {!isOwner && <button className="btn btn-danger" onClick={handleLeaveList}>{t("leave")}</button>}
        </div>

        <div style={{ marginBottom: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* HLAVIČKA SEZNAMU (Owner/Members/Title) - Wireframe layout */}
          <div className="detail-row">
            <span className="badge-label">{t("owner_label")}</span>
            <span className="badge-value">👤 {data.owner.name}</span>
          </div>
          <div className="detail-row">
            <span className="badge-label">{t("members_label")}</span>
            <div className="badge-group">
              {data.members && data.members.map(member => (
                <span key={member.id} className="badge-value">
                  👤 {member.name}
                  {isOwner && <button className="badge-remove-btn" onClick={() => handleRemoveMember(member.id)}>✕</button>}
                </span>
              ))}
              {isOwner && <button className="badge-value add-member-btn" onClick={handleAddMember}>+ Add</button>}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
             {isEditingTitle && isOwner ? (
                <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                  <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} autoFocus style={{textAlign: "center", fontSize: "1.5rem", width: "auto"}} />
                  <button className="btn btn-primary" onClick={handleTitleSave}>OK</button>
                </div>
              ) : (
                <h2 style={{ margin: 0, fontSize: "2rem", cursor: isOwner ? "pointer" : "default" }} onClick={() => isOwner && setIsEditingTitle(true)}>
                  {data.name} {isOwner && <span style={{fontSize: "1rem"}}>✏️</span>}
                </h2>
              )}
          </div>
        </div>

        {/* --- DETAILNÍ KOLÁČOVÝ GRAF --- */}
        {data.items.length > 0 && (
          <div className="card" style={{ marginBottom: "20px", height: "350px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ marginTop: 0 }}> {t("chart_detail")}</h3>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border-color)", color: "var(--text-color)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* SEZNAM POLOŽEK */}
        <div className="card">
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3>{t("items")} ({visibleItems.length})</h3>
                <div className="filter-toggle">
                  <button className={`filter-btn ${!filterUnresolved ? "active" : ""}`} onClick={() => setFilterUnresolved(false)}>All</button>
                  <button className={`filter-btn ${filterUnresolved ? "active" : ""}`} onClick={() => setFilterUnresolved(true)}>Active</button>
                </div>
             </div>
             <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
               <input placeholder={t("add_item")} value={newItemName} onChange={(e) => setNewItemName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddItem()} />
               <button className="btn btn-primary" onClick={handleAddItem}>{t("add")}</button>
             </div>
             <ul style={{ listStyle: "none", padding: 0 }}>
               {visibleItems.map((item) => (
                 <li key={item.id} className="item-row" style={{ opacity: item.isFinished ? 0.6 : 1 }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                     <div onClick={() => toggleItem(item.id)} className={`item-checkbox ${item.isFinished ? 'checked' : ''}`}></div>
                     <span style={{ fontSize: "1.1rem", textDecoration: item.isFinished ? "line-through" : "none" }}>{item.name}</span>
                   </div>
                   <button className="btn btn-danger" style={{ padding: "4px 8px" }} onClick={() => deleteItem(item.id)}>✕</button>
                 </li>
               ))}
             </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailRoute;