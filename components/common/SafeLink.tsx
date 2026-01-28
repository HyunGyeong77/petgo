"use client";

import Link from 'next/link';

export default function SafeLink({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Link href="#" aria-label="임시 링크" onClick={(e) => {e.preventDefault();}}>
      {children}
    </Link>
  );
}