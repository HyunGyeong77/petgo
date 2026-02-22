import styles from './footer-nav.module.scss';

export default function FooterNav() {
  return (
    <ul className={styles["footer__nav"]}>
      <li><a href="#top">홈</a></li>
      <li><a href="#walk">산책 가이드</a></li>
      <li><a href="#recommend">추천 용품</a></li>
    </ul>
  );
}