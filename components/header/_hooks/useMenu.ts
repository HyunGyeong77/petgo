'use client';

import { useEffect, useState } from "react";

type ReturnType = {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  isScrolled: boolean
}

export const useMenu = (scrolled: boolean): ReturnType => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const isScrolled = scrolled || menuOpen;
  
  useEffect(() => {
    const header = document.getElementById("header");
    if(!header) return;

    if (menuOpen) {
      header.style.setProperty("transition", "none");
    } else {
      const timer = setTimeout(() => {
        header.style.setProperty("transition", "background-color 0.3s ease, box-shadow 0.3s ease");
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  return {
    menuOpen, setMenuOpen,
    isScrolled
  }
}