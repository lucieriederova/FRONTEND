// src/api.js

// 1. MOCK DATA (Naše databáze)
let mockData = [
    {
      id: "list01",
      name: "Nákup na víkend",
      owner: { id: "u1", name: "Lucie" },
      isArchived: false,
      members: [
        { id: "u2", name: "Pepa" },
        { id: "u3", name: "Jana" }
      ],
      items: [
        { id: "item1", name: "Rohlíky", isFinished: false },
        { id: "item2", name: "Máslo", isFinished: true },
      ] 
    },
    {
      id: "list02",
      name: "Vánoční dárky",
      owner: { id: "u1", name: "Lucie" },
      isArchived: false,
      members: [], 
      items: [] 
    },
    {
      id: "list03",
      name: "Starý seznam 2023",
      owner: { id: "u1", name: "Lucie" },
      isArchived: true, 
      members: [], 
      items: [{ id: "i1", name: "Mléko", isFinished: true }] 
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