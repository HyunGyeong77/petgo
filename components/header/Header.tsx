'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { useAuth } from '@/providers/AuthContext';
import { useScroll } from './_hooks/useScroll';
import { useMenu } from './_hooks/useMenu';
import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { label: '강아지 정보', href: ROUTES.app.dogInfo },
  { label: '산책 가이드', href: ROUTES.app.walkingGuide },
  { label: '용품', href: ROUTES.app.supplies },
  { label: '병원 정보', href: '#hospital' },
] as const;

export default function Header() {
  const { scrolled } = useScroll();
  const { menuOpen, setMenuOpen, isScrolled } = useMenu(scrolled);

  const auth = useAuth();
  if(!auth) return null;

  const { user, logout } = auth;
 
  return (
    <header id="header" className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href={ROUTES.app.home} className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <Link href={ROUTES.app.profile} className={styles.loginLink}>내 정보</Link>
              <button className={styles.signupBtn} onClick={logout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link href={ROUTES.auth.login} className={styles.loginLink}>로그인</Link>
              <Link href={ROUTES.auth.signup} className={styles.signupBtn}>회원가입</Link>
            </>
          )}
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
            <Link href={ROUTES.auth.login} className={styles.loginLink}>로그인</Link>
            <Link href={ROUTES.auth.signup} className={styles.signupBtn}>회원가입</Link>
          </div>
        </div>
      )}
    </header>
  );
}
