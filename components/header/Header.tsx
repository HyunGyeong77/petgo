'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.scss';

const NAV_ITEMS = [
  { label: '강아지 정보', href: '#preferences' },
  { label: '산책 가이드', href: '#walk' },
  { label: '용품', href: '#recommend' },
  { label: '병원 정보', href: '#hospital' },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="#" className={styles.logo}>
          Pet<span className={styles.logoAccent}>Go</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="#" className={styles.loginLink}>로그인</Link>
          <Link href="#" className={styles.signupBtn}>회원가입</Link>
        </div>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        >
          <i className={`ri-${menuOpen ? 'close' : 'menu'}-line`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            <Link href="#" className={styles.loginLink}>로그인</Link>
            <Link href="#" className={styles.signupBtn}>회원가입</Link>
          </div>
        </div>
      )}
    </header>
  );
}
