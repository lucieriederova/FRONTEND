// src/api.js

// 1. MOCK DATA (Naše databáze)
let mockData = [
    {
      id: "list01",
      name: "nákup domů",
      owner: { id: "u1", name: "lucie" },
      isArchived: false,
      members: [
        { id: "u2", name: "mike" },
        { id: "u3", name: "athena" }
      ],
      items: [
        { id: "item1", name: "rohlíky", isFinished: false },
        { id: "item2", name: "máslo", isFinished: true },
        { id: "item3", name: "sýr", isFinished: false }
      ] 
    },
    {
      id: "list02",
      name: "vánoční nákup",
      owner: { id: "u1", name: "lucie" },
      isArchived: false,
      members: [], 
      items: [
        { id: "item1", name: "svíčky", isFinished: false },
        { id: "item2", name: "cukroví", isFinished: false },
        { id: "item3", name: "stromeček", isFinished: true },
        { id: "item4", name: "svíčky", isFinished: true }
      ] 
    },
    {
      id: "list03",
      name: "narozeniny",
      owner: { id: "u1", name: "lucie" },
      isArchived: true, 
      members: [], 
      items: [
        { id: "i1", name: "balónky", isFinished: true },
        { id: "i2", name: "konfety", isFinished: true }
      ] 

    },
  ];
  
  // Simulace zpoždění sítě
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  // --- API FUNKCE ---
  
  export const fetchLists = async () => {
    await delay(800); 
    return JSON.parse(JSON.stringify(mockData));
  };
  
  export const createList = async (listName, owner) => {
    await delay(500);
    const newList = {
      id: "list" + Math.random().toString(36).substr(2, 9),
      name: listName,
      owner: owner,
      isArchived: false,
      members: [],
      items: []
    };
    mockData = [...mockData, newList];
    return newList;
  };
  
  export const updateList = async (updatedList) => {
    await delay(500);
    mockData = mockData.map(list => list.id === updatedList.id ? updatedList : list);
    return updatedList;
  };
  
  export const deleteList = async (listId) => {
    await delay(500);
    mockData = mockData.filter(list => list.id !== listId);
    return { success: true };
  };