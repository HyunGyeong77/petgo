import styles from './nav.module.scss';
import SafeLink from '@/components/common/safe-link/SafeLink';

export default function Nav() {
  return (
    <nav className={styles.wrap}>
      <ul>
        <li>
          <SafeLink><span className={styles.link}>강아지 정보</span></SafeLink>
        </li>
        <li>
          <SafeLink><span className={styles.link}>산책 가이드</span></SafeLink>
        </li>
        <li>
          <SafeLink><span className={styles.link}>용품</span></SafeLink>
        </li>
        <li>
          <SafeLink><span className={styles.link}>병원 정보</span></SafeLink>
        </li>
      </ul>
    </nav>
  );
}