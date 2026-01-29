import styles from './section-content.module.scss';

export default function SectionContent({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className={styles.wrap}>{children}</div>
  );
}