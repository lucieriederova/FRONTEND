// src/Header.js
import React, { useState } from "react"; // <--- Musíme importovat useState

function Header({ onClick }) {
  // Stav pro hover efekt
  const [isHovered, setIsHovered] = useState(false);

  // Zjišťujeme, jestli je hlavička aktivní (klikací)
  const isClickable = !!onClick;

  return (
    <div 
      onClick={onClick}
      // Sledujeme myš
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: "white",
        padding: "20px 20px",
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        // Pokud je klikací, ukážeme ručičku, jinak default
        cursor: isClickable ? "pointer" : "default",
        userSelect: "none",
        // EFEKT: Pokud je klikací a najedeme myší, trochu se zvětší
        transform: isClickable && isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" // Pružný efekt
      }}
      title={isClickable ? "Zpět na přehled" : ""}
    >
      <h1 style={{ 
        margin: 0, 
        color: "#1988ff",
        fontFamily: "sans-serif",
        fontSize: "4rem",
        letterSpacing: "-2px",
        display: "flex",
        alignItems: "center",
        // EFEKT: Modrá záře při najetí (text-shadow)
        textShadow: isClickable && isHovered ? "0px 0px 20px rgba(25, 136, 255, 0.4)" : "none",
        transition: "text-shadow 0.3s ease"
      }}>
        <span style={{ fontWeight: "800" }}>groove</span>
        <span style={{ fontWeight: "300" }}>list</span>
      </h1>
    </div>
  );
}

export default Header;