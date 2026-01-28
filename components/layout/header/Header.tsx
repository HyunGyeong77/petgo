import Logo from '@/components/common/logo/Logo';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.layout}>
        <Logo width={70} height={32} />
      </div>
    </header>
  );
}