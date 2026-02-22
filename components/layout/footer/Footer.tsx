import styles from './footer.module.scss';
import Logo from '@/components/common/logo/Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__logo-box"]}>
        <Logo width={39} height={32} />
      </div>
    </footer>
  );
}