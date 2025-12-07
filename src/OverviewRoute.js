// src/OverviewRoute.js
import React, { useState } from "react";
import Header from "./Header";
import ShoppingListCard from "./ShoppingListCard"; 
import AddList from "./AddList"; 
import Modal from "./Modal"; // <--- Importujeme Modal

function OverviewRoute({ shoppingLists, onDelete, onArchive, onAdd, onNavigate }) {
  const [showArchived, setShowArchived] = useState(false);
  
  // Stav pro ID seznamu, který chceme smazat (pokud null, okno je zavřené)
  const [listToDelete, setListToDelete] = useState(null);
  
  const currentUser = { id: "u1", name: "Lucie" };

  // --- FILTROVÁNÍ ---
  const listsToDisplay = shoppingLists.filter((list) => {
    return showArchived ? list.isArchived : !list.isArchived;
  });

  // --- HANDLERY PRO MAZÁNÍ ---
  
  // 1. Uživatel klikl na křížek -> Otevřít potvrzovací okno
  const confirmDeleteClick = (id) => {
    setListToDelete(id); 
  };

  // 2. Uživatel v okně klikl "Smazat" -> Provést akci a zavřít okno
  const executeDelete = () => {
    if (listToDelete) {
      onDelete(listToDelete); // Voláme funkci z App.js
      setListToDelete(null);  // Zavřeme okno
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Header onClick={() => setShowArchived(false)} />
      
      <div style={{ padding: "20px" }}>
        
        {/* HORNÍ LIŠTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", height: "50px" }}>
          
          {/* LEVÁ STRANA: Filtr */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", fontSize: "1.2em" }}>zobrazit:</span>
            <button 
              onClick={() => setShowArchived(!showArchived)}
              style={{ 
                border: "none",
                backgroundColor: showArchived ? "#fef08a" : "#dbeafe",
                color: "#1988ff",
                borderRadius: "20px",
                padding: "5px 20px",
                cursor: "pointer",
                fontSize: "1em",
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
            >
              {showArchived ? "archivované" : "aktivní"}
            </button>
          </div>

          {/* PRAVÁ STRANA: Přidat seznam */}
          {!showArchived && <AddList onAdd={onAdd} />}
          
        </div>

        {/* MŘÍŽKA KARET */}
        <div style={{ display: "grid", gap: "15px" }}>
          {listsToDisplay.length === 0 && (
            <p style={{ textAlign: "center", color: "gray", fontStyle: "italic", marginTop: "20px" }}>
              {showArchived ? "Žádné archivované seznamy." : "Žádné aktivní seznamy."}
            </p>
          )}

          {listsToDisplay.map((list) => (
            <ShoppingListCard 
              key={list.id} 
              id={list.id} 
              name={list.name} 
              owner={list.owner}
              isArchived={list.isArchived}
              items={list.items}
              currentUser={currentUser} // <--- Posíláme info o uživateli
              
              // Místo přímého mazání voláme naše potvrzení
              onDelete={confirmDeleteClick} 
              
              onArchive={onArchive}
              onOpenDetail={onNavigate} 
            />
          ))}
        </div>

        {/* MODÁLNÍ OKNO PRO POTVRZENÍ SMAZÁNÍ */}
        <Modal 
          isOpen={!!listToDelete} // Otevřeno, pokud máme ID ke smazání
          onClose={() => setListToDelete(null)}
          title="Smazat seznam?"
        >
          <p>Opravdu chcete nenávratně smazat tento nákupní seznam?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
             <button 
              onClick={() => setListToDelete(null)}
              style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #ccc", background: "white", cursor: "pointer" }}
            >
              Ne, ponechat
            </button>
            <button 
              onClick={executeDelete}
              style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", fontWeight: "bold", cursor: "pointer" }}
            >
              Ano, smazat
            </button>
          </div>
        </Modal>

      </div>
    </div>
  );
}

export default OverviewRoute;