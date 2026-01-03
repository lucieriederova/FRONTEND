// src/OverviewRoute.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// ZNOVU PŘIDÁNY IMPORTY PRO GRAF
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from "./Header";
import ShoppingListCard from "./ShoppingListCard"; 
import AddList from "./AddList"; 
import Modal from "./Modal"; 

function OverviewRoute({ shoppingLists, onDelete, onArchive, onAdd, onNavigate }) {
  const { t } = useTranslation();
  const [showArchived, setShowArchived] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  
  const currentUser = { id: "u1", name: "Lucie" };

  const safeLists = shoppingLists || [];

  // PŘÍPRAVA DAT PRO GRAF (statistika všech seznamů)
  const chartData = safeLists.map(list => ({
    name: list.name,
    total: list.items.length,
    resolved: list.items.filter(i => i.isFinished).length
  }));

  const listsToDisplay = safeLists.filter((list) => {
    return showArchived ? list.isArchived : !list.isArchived;
  });

  const executeDelete = () => {
    if (listToDelete) { onDelete(listToDelete); setListToDelete(null); }
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <Header />
      
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* --- VRÁCENÝ HLAVNÍ GRAF --- */}
        {safeLists.length > 0 && (
          <div className="card" style={{ marginBottom: "30px", height: "350px" }}>
            <h3 style={{ marginTop: 0 }}> {t("chart_overview")}</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-color)" tick={{fontSize: 12}} />
                <YAxis stroke="var(--text-color)" />
                
                {/* --- ZMĚNA ZDE: Upravujeme 'cursor' na jemnou průhlednou šedou --- */}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card-bg)", 
                    borderColor: "var(--border-color)", 
                    color: "var(--text-color)",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                  }} 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} /* TOTO ZAJISTÍ MÍRNÉ PODSVÍCENÍ MÍSTO ČERNÉ */
                />
                
                <Legend wrapperStyle={{ paddingTop: "10px" }}/>
                <Bar dataKey="total" name={t("total_items")} fill="#A0DDFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name={t("finished_items")} fill="#4464AD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* OVLÁDÁNÍ (Filtry + Přidat) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{t("show")}</span>
            
            <div style={{ display: "flex", backgroundColor: "var(--input-bg)", borderRadius: "20px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
              <button 
                onClick={() => setShowArchived(false)}
                style={{ 
                  padding: "8px 20px", border: "none", cursor: "pointer",
                  backgroundColor: !showArchived ? "var(--brand-blue)" : "transparent",
                  color: !showArchived ? "white" : "var(--text-color)",
                  fontWeight: "bold", transition: "all 0.2s"
                }}
              >
                {t("active")}
              </button>
              <button 
                onClick={() => setShowArchived(true)}
                style={{ 
                  padding: "8px 20px", border: "none", cursor: "pointer",
                  backgroundColor: showArchived ? "var(--brand-blue)" : "transparent",
                  color: showArchived ? "white" : "var(--text-color)",
                  fontWeight: "bold", transition: "all 0.2s"
                }}
              >
                {t("archived")}
              </button>
            </div>
          </div>
          
          {!showArchived && <AddList onAdd={onAdd} />}
        </div>

        {/* MŘÍŽKA KARET */}
        <div className="grid-container">
          {listsToDisplay.map((list) => (
            <ShoppingListCard 
              key={list.id} 
              {...list}
              currentUser={currentUser}
              onDelete={setListToDelete} 
              onArchive={onArchive}
              onOpenDetail={onNavigate} 
            />
          ))}
        </div>

        {/* MODAL */}
        <Modal isOpen={!!listToDelete} onClose={() => setListToDelete(null)} title={t("delete_confirm_title")}>
          <p>{t("delete_confirm_text")}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
             <button className="btn btn-secondary" onClick={() => setListToDelete(null)}>{t("no_keep")}</button>
             <button className="btn btn-danger" onClick={executeDelete}>{t("yes_delete")}</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default OverviewRoute;