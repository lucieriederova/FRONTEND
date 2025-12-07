
import React, { useState } from "react";
import OverviewRoute from "./OverviewRoute";
import DetailRoute from "./DetailRoute";

const initialShoppingLists = [
  {
    id: "list01",
    name: "narozeninová oslava",
    owner: { id: "u1", name: "lucie" },
    isArchived: false,
    members: [
      { id: "u2", name: "athena" },
      { id: "u3", name: "mike" }
    ],
    items: [
      { id: "item1", name: "balónky", isFinished: false },
      { id: "item2", name: "dort", isFinished: true },
    ] 
  },
  {
    id: "list02",
    name: "vánoce",
    owner: { id: "u1", name: "lucie" },
    isArchived: false,
    members: [],
    items: [] 
  },
  {
    id: "list03",
    name: "potraviny",
    owner: { id: "u1", name: "lucie" },
    isArchived: true, 
    members: [],
    items: [{ id: "i1", name: "mléko", isFinished: true }] 
  },
];

function App() {
  const [shoppingLists, setShoppingLists] = useState(initialShoppingLists);
  const [activeListId, setActiveListId] = useState(null);

  function handleDeleteList(listId) {
    setShoppingLists((current) => current.filter((l) => l.id !== listId));
    if (activeListId === listId) setActiveListId(null);
  }

  function handleArchiveList(listId) {
    setShoppingLists((current) => current.map((l) => l.id === listId ? { ...l, isArchived: !l.isArchived } : l));
  }

  function handleAddList(listName) {
    const newList = {
      id: "list" + Math.random(),
      name: listName,
      owner: { id: "u1", name: "lucie" },
      isArchived: false,
      members: [],
      items: []
    };
    setShoppingLists((current) => [...current, newList]);
  }

  function handleUpdateList(updatedList) {
    setShoppingLists((current) => {
      return current.map((list) => (list.id === updatedList.id ? updatedList : list));
    });
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

export default App;