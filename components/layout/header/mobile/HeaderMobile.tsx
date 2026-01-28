import Logo from '@/components/common/logo/Logo';
import Hamburger from './components/hamburger/Hamburger';
import styles from './header-mobile.module.scss';

export default function HeaderMobile() {
  return (
    <header className={styles.header}>
      <div className={styles.layout}>
        <Logo width={70} height={32} />
        <Hamburger />
      </div>
    </header>
  );
}