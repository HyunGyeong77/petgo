import styles from './auth.module.scss';
import SafeLink from '@/components/common/safe-link/SafeLink';

export default function Auth() {
  return (
    <div className={styles.wrap}>
      <SafeLink><span className={styles.link}>로그인</span></SafeLink>
      <SafeLink><span className={styles.link}>회원가입</span></SafeLink>
    </div>
  );
}