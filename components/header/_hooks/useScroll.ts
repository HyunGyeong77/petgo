'use client';

import { useEffect, useState } from "react";

type ReturnType = {
  scrolled: boolean
}

export const useScroll = (): ReturnType => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
  
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled };
}
