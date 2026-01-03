// src/Header.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeContext";

function Header({ goHome }) {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false); // Zavřít menu po výběru
  };

  // Názvy jazyků pro zobrazení
  const languages = {
    cs: "Česky",
    en: "English",
    de: "Deutsch"
  };

  return (
    <header className="app-header">
      {/* LOGO */}
      <div className="app-logo" onClick={goHome} title="Domů" role="button">
        <span className="logo-groove">groove</span>
        <span className="logo-list">list</span>
      </div>

      <div className="header-controls">
        
        {/* NOVÝ JAZYKOVÝ PŘEPÍNAČ (Dropdown) */}
        <div className="lang-dropdown-container">
          <button 
            className={`lang-pill-btn ${isLangMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          >
            <span className="globe-icon">🌐</span>
            <span>{languages[i18n.language] || "Language"}</span>
            <span className="arrow-icon">▼</span>
          </button>

          {isLangMenuOpen && (
            <div className="lang-menu">
              <button className="lang-option" onClick={() => changeLanguage("cs")}>🇨🇿 Česky</button>
              <button className="lang-option" onClick={() => changeLanguage("en")}>🇬🇧 English</button>
              <button className="lang-option" onClick={() => changeLanguage("de")}>🇩🇪 Deutsch</button>
            </div>
          )}
        </div>

        {/* Tlačítko pro změnu tématu */}
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Přepnout režim">
           {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

export default Header;