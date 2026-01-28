import Logo from '@/components/common/logo/Logo';
import styles from './header-mobile.module.scss';

export default function HeaderMobile() {
  return (
    <header className={styles.header}>
      <div className={styles.layout}>
        <Logo width={70} height={32} />
      </div>
    </header>
  );
}