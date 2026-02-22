import styles from './footer.module.scss';
import Logo from '@/components/common/logo/Logo';
import FooterNav from '../components/nav/FooterNav';
import FooterLegal from '../components/legal/FooterLegal';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__logo-box"]}>
        <Logo width={39} height={32} />
      </div>
      <div className={styles["footer__explain-box"]}>
        <b className={styles["footer__title"]}>Poppy Care</b>
        <p className={styles["footer__word"]}>강아지의 일상과 건강을 함께 고민하는 정보 플랫폼</p>
      </div>
      <div>
        <nav className={styles["footer__layout"]}>
          <FooterNav />
        </nav>
        <nav className={styles["footer__layout"]}>
          <FooterLegal />
        </nav>
      </div>
    </footer>
  );
}