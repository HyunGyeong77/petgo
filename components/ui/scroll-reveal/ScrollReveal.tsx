'use client';

import { useEffect, useRef, ReactNode } from 'react';
import styles from './scroll-reveal.module.scss';

interface Props {
  children: ReactNode;
  /** 0–5 단계 stagger 딜레이 인덱스 */
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  /** Intersection Observer threshold (default: 0.2) */
  threshold?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  threshold = 0.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className}`}
      data-delay={delay}
    >
      {children}
    </div>
  );
}
