import styles from './footer_legal.module.scss';
import SafeLink from "@/components/common/safe-link/SafeLink";

export default function FooterLegal() {
  return (
    <ul className={styles.footer__legal}>
      <li><SafeLink><span>이용약관</span></SafeLink></li>
      <li><SafeLink><span className={styles.footer__privacy}>개인정보처리방침</span></SafeLink></li>
      <li><SafeLink><span>이용약관</span></SafeLink></li>
    </ul>
  );
}