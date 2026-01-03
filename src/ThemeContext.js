// src/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Zkusíme načíst uložené téma, jinak dáme 'light'
  const [theme, setTheme] = useState(localStorage.getItem("app-theme") || "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Uložíme do prohlížeče a nastavíme třídu na <body>
    localStorage.setItem("app-theme", theme);
    document.body.className = theme; 
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};