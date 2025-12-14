// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css"; 
import OverviewRoute from "./OverviewRoute";
import DetailRoute from "./DetailRoute";
import { fetchLists, createList, updateList, deleteList } from "./api";

function App() {
  // --- STAVY ---
  const [shoppingLists, setShoppingLists] = useState([]); 
  const [activeListId, setActiveListId] = useState(null);
  
  // Stavy načítání: "pending" | "ready" | "error"
  const [loadState, setLoadState] = useState("pending");
  const [errorMessage, setErrorMessage] = useState(null);

  // --- NAČTENÍ DAT ---
  useEffect(() => {
    async function loadData() {
      try {
        setLoadState("pending"); 
        const data = await fetchLists(); 
        setShoppingLists(data);
        setLoadState("ready");   
      } catch (e) {
        setErrorMessage("Chyba při komunikaci se serverem.");
        setLoadState("error");   
      }
    }
    loadData();
  }, []);

  // --- FUNKCE (HANDLERS) ---

  async function handleAddList(listName) {
    try {
        const owner = { id: "u1", name: "Lucie" }; 
        const newList = await createList(listName, owner);
        setShoppingLists((prev) => [...prev, newList]);
    } catch (e) {
        alert("Chyba při vytváření seznamu");
    }
  }

  async function handleUpdateList(updatedList) {
    try {
      await updateList(updatedList);
      setShoppingLists((prev) => prev.map((l) => l.id === updatedList.id ? updatedList : l));
    } catch (e) {
       alert("Chyba při ukládání");
    }
  }

  async function handleDeleteList(listId) {
    try {
      await deleteList(listId);
      setShoppingLists((prev) => prev.filter((l) => l.id !== listId));
      if (activeListId === listId) setActiveListId(null);
    } catch (e) {
       alert("Chyba při mazání");
    }
  }

  async function handleArchiveList(listId) {
    const listToArchive = shoppingLists.find(l => l.id === listId);
    if (!listToArchive) return;
    const updatedList = { ...listToArchive, isArchived: !listToArchive.isArchived };
    await handleUpdateList(updatedList);
  }

  // --- VYKRESLENÍ PODLE STAVU ---

  if (loadState === "pending") {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Načítám data...</p>
      </div>
    );
  }

  if (loadState === "error") {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: "red" }}>
        <h2>Nastala chyba ⚠️</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  // Stav READY
  const activeList = shoppingLists.find((l) => l.id === activeListId);

  return (
    <div className="App">
      {activeList ? (
        <DetailRoute 
           data={activeList} 
           onUpdate={handleUpdateList} 
           onBack={() => setActiveListId(null)} 
        />
      ) : (
        <OverviewRoute 
           // ZDE BYLA CHYBA - opraveno na "shoppingLists"
           shoppingLists={shoppingLists}
           
           onDelete={handleDeleteList}
           onArchive={handleArchiveList}
           onAdd={handleAddList}
           onNavigate={setActiveListId}
        />
      )}
    </div>
  );
}

export default App;