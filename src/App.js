// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css"; 
import "./i18n"; // Inicializace překladů
import { ThemeProvider } from "./ThemeContext"; // Téma
import { useTranslation } from "react-i18next";

import OverviewRoute from "./OverviewRoute";
import DetailRoute from "./DetailRoute";
import { fetchLists, createList, updateList, deleteList } from "./api";

// Hlavní komponenta, která řeší logiku
function AppContent() {
  const { t } = useTranslation();
  const [shoppingLists, setShoppingLists] = useState([]); 
  const [activeListId, setActiveListId] = useState(null);
  const [loadState, setLoadState] = useState("pending");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadState("pending"); 
        const data = await fetchLists(); 
        setShoppingLists(data);
        setLoadState("ready");   
      } catch (e) {
        setErrorMessage(t("error"));
        setLoadState("error");   
      }
    }
    loadData();
  }, [t]);

  // Handlery (stejné jako minule)
  async function handleAddList(listName) {
    try {
        const owner = { id: "u1", name: "Lucie" }; 
        const newList = await createList(listName, owner);
        setShoppingLists((prev) => [...prev, newList]);
    } catch (e) { alert(t("error")); }
  }

  async function handleUpdateList(updatedList) {
    try {
      await updateList(updatedList);
      setShoppingLists((prev) => prev.map((l) => l.id === updatedList.id ? updatedList : l));
    } catch (e) { alert(t("error")); }
  }

  async function handleDeleteList(listId) {
    try {
      await deleteList(listId);
      setShoppingLists((prev) => prev.filter((l) => l.id !== listId));
      if (activeListId === listId) setActiveListId(null);
    } catch (e) { alert(t("error")); }
  }

  async function handleArchiveList(listId) {
    const listToArchive = shoppingLists.find(l => l.id === listId);
    if (!listToArchive) return;
    const updatedList = { ...listToArchive, isArchived: !listToArchive.isArchived };
    await handleUpdateList(updatedList);
  }

  // --- RENDER ---
  if (loadState === "pending") {
    return <div className="spinner-container"><div className="spinner"></div><p>{t("loading")}</p></div>;
  }
  if (loadState === "error") {
    return <div style={{ padding: "50px", textAlign: "center", color: "red" }}><h2>{errorMessage}</h2></div>;
  }

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

// Zabalíme aplikaci do ThemeProvideru
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}