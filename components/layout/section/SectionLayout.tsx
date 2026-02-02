import styles from './section-layout.module.scss';

export default function SectionLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <section className={styles.wrap}>{children}</section>
  );
}