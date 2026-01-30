"use client";

import styles from './header.module.scss';
import HeaderDesktop from './desktop/HeaderDesktop';
import HeaderMobile from './mobile/HeaderMobile';
import {useMediaQuery} from '@/lib/hooks/useMediaQuery';

export default function Header() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <header className={styles.header}>
      <div className={styles.layout}>
        {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
      </div>
    </header>
  );
}