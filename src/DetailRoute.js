// src/DetailRoute.js
import React, { useState } from "react";
import Header from "./Header";
import MembersList from "./MembersList";
import ItemsList from "./ItemsList";
import ListTitle from "./ListTitle";
import OwnerDisplay from "./OwnerDisplay";
import AddItem from "./AddItem";

// --- POMOCNÁ KOMPONENTA PRO TLAČÍTKO FILTRU ---
const FilterButton = ({ isChecked, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        border: isChecked || isHovered ? "1px solid #1988ff" : "1px solid #ccc", 
        backgroundColor: isChecked ? "#e3f2fd" : "white",
        color: isChecked || isHovered ? "#1988ff" : "gray",
        
        borderRadius: "20px",
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: "0.9em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        
        transform: isHovered ? "scale(1.05)" : "scale(1)", 
        boxShadow: isHovered ? "0 4px 8px rgba(25, 136, 255, 0.2)" : "none", 
        transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      }}
    >
      {isChecked ? "☑️ " : "⬜ "} 
      {isChecked ? "zobrazeno vše" : "skryté vyřešené"}
    </button>
  );
};

// --- HLAVNÍ KOMPONENTA ---
function DetailRoute({ data, onUpdate, onBack }) {
  // Inicializujeme stav daty, která přišla z App.js
  const [shoppingList, setShoppingList] = useState(data);
  const [showResolved, setShowResolved] = useState(true);
  const currentUserId = "u1"; 

  // --- POMOCNÁ FUNKCE PRO AKTUALIZACI ---
  const updateList = (newData) => {
    setShoppingList(newData);
    onUpdate(newData); // Pošleme změnu nahoru do App.js
  };

  // --- FUNKCE PRO MANIPULACI S DATY ---

  function handleToggle(itemId) {
    const newItems = shoppingList.items.map((item) => {
      if (item.id === itemId) return { ...item, isFinished: !item.isFinished };
      return item;
    });
    updateList({ ...shoppingList, items: newItems });
  }

  function handleAddItem(text) {
    const newItem = { id: "item" + Math.random(), name: text, isFinished: false };
    updateList({ ...shoppingList, items: [...shoppingList.items, newItem] });
  }

  function handleDelete(itemId) {
    const newItems = shoppingList.items.filter((item) => item.id !== itemId);
    updateList({ ...shoppingList, items: newItems });
  }

  function handleUpdateTitle(newTitle) {
    updateList({ ...shoppingList, title: newTitle });
  }

  function handleRemoveMember(memberId) {
    const currentMembers = shoppingList.members || [];
    const newMembers = currentMembers.filter((member) => member.id !== memberId);
    updateList({ ...shoppingList, members: newMembers });
  }

  function handleAddMember(memberName) {
    const newMember = { id: "u" + Math.random(), name: memberName };
    // POJISTKA: Kdyby members neexistovalo, použijeme prázdné pole
    const currentMembers = shoppingList.members || [];
    updateList({ ...shoppingList, members: [...currentMembers, newMember] });
  }

  // Výpočet položek k zobrazení podle filtru
  const itemsToDisplay = showResolved 
    ? shoppingList.items 
    : shoppingList.items.filter((item) => !item.isFinished);

  // --- VYKRESLENÍ ---
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      
      {/* Header funguje jako tlačítko zpět */}
      <Header onClick={onBack} />
      
      <div style={{ padding: "20px" }}>
        
        {/* 1. SEKCE LIDÉ */}
        <OwnerDisplay owner={shoppingList.owner} />
        
        <MembersList 
          members={shoppingList.members || []} // Pojistka pro zobrazení
          isOwner={shoppingList.owner.id === currentUserId}
          currentUserId={currentUserId}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
        />

        {/* 2. NÁZEV SEZNAMU */}
        <ListTitle 
          title={shoppingList.name || shoppingList.title} 
          isOwner={shoppingList.owner.id === currentUserId}
          onTitleChange={handleUpdateTitle}
        />

        {/* 3. FILTR */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <FilterButton 
            isChecked={showResolved} 
            onClick={() => setShowResolved(!showResolved)} 
          />
        </div>
        
        {/* 4. SEZNAM POLOŽEK */}
        <ItemsList 
          items={itemsToDisplay} 
          onItemFinishedToggle={handleToggle}
          onItemDelete={handleDelete}  
        />

        {/* 5. PŘIDÁNÍ NOVÉ POLOŽKY */}
        <AddItem onAddItem={handleAddItem} />
        
      </div>
    </div>
  );
}

export default DetailRoute;