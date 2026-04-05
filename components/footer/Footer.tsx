import Link from 'next/link';
import styles from './footer.module.scss';

const NAV_LINKS = [
  { label: '홈', href: '#' },
  { label: '산책 가이드', href: '#walk' },
  { label: '추천 용품', href: '#recommend' },
];

const POLICY_LINKS = [
  { label: '이용약관', href: '#' },
  { label: '개인정보처리방침', href: '#', bold: true },
];

const CONTACT_LINKS = [
  { label: 'Contact', href: '#' },
  { label: 'Github', href: '#' },
  { label: 'Email', href: '#' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <img src="/logo.png" alt="logo" />
            </span>
            <p className={styles.tagline}>강아지의 일상과 건강을 함께 고민하는 정보 플랫폼</p>
            <p className={styles.company}>Poppy Care</p>
          </div>

          <div className={styles.navGroup}>
            <nav>
              <ul className={styles.navList}>
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.navLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <ul className={styles.navList}>
                {POLICY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`${styles.navLink} ${link.bold ? styles.navLinkBold : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <ul className={styles.navList}>
                {CONTACT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.navLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2026 PetGo. All rights reserved.</p>
          <p className={styles.disclaimer}>본 사이트는 포트폴리오용으로 제작되었습니다.</p>
        </div>
      </div>
    </footer>
  );
}
