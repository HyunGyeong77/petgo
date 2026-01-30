import styles from './auth.module.scss';
import SafeLink from '@/components/common/safe-link/SafeLink';

export default function Auth() {
  return (
    <div className={styles.wrap}>
      <SafeLink>로그인</SafeLink>
      <SafeLink>회원가입</SafeLink>
    </div>
  );
}