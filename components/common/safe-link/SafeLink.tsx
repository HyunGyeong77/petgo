"use client";

import styles from './safe-link.module.scss';
import Link from 'next/link';

export default function SafeLink({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Link className={styles.link} href="#" aria-label="임시 링크" onClick={(e) => {e.preventDefault();}}>
      {children}
    </Link>
  );
}