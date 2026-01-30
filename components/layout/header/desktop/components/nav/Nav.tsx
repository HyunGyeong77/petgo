import styles from './nav.module.scss';
import SafeLink from '@/components/common/safe-link/SafeLink';

export default function Nav() {
  return (
    <nav className={styles.wrap}>
      <ul>
        <li>
          <SafeLink>강아지 정보</SafeLink>
        </li>
        <li>
          <SafeLink>산책 가이드</SafeLink>
        </li>
        <li>
          <SafeLink>용품</SafeLink>
        </li>
        <li>
          <SafeLink>병원 정보</SafeLink>
        </li>
      </ul>
    </nav>
  );
}