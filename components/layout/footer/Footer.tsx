import styles from './footer.module.scss';
import Logo from '@/components/common/logo/Logo';
import FooterNav from '../components/nav/FooterNav';
import FooterLegal from '../components/legal/FooterLegal';
import FooterSocial from '../components/social/FooterSocial';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__inner"]}>
        <div className={styles["footer__logo-box"]}>
          <Logo width={39} height={32} />
        </div>
        <div className={styles["footer__explain-box"]}>
          <b className={styles["footer__title"]}>Poppy Care</b>
          <p className={styles["footer__word"]}>강아지의 일상과 건강을 함께 고민하는 정보 플랫폼</p>
        </div>
        <div className={styles["footer__links-box"]}>
          <nav className={styles["footer__layout"]}>
            <FooterNav />
          </nav>
          <nav className={styles["footer__layout"]}>
            <FooterLegal />
          </nav>
          <nav className={styles["footer__layout"]}>
            <FooterSocial />
          </nav>
        </div>
        <div className={styles["footer__reserved-box"]}>
          <p>© 2026 PetGo. All rights reserved.</p>
          <p>본 사이트는 포트폴리오용으로 제작되었습니다.</p>
        </div>
      </div>
    </footer>
  );
}