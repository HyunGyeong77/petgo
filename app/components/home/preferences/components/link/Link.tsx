import styles from './link.module.scss';
import SafeLink from '@/components/common/safe-link/SafeLink';

export default function Link() {
  return (
    <section className={styles.wrap}>
      <h2>알면 알수록 반려견과의 관계는 <span>더욱 깊어집니다 😊</span></h2>
      <SafeLink>반려견과 친해지러 가기</SafeLink>
    </section>
  );
}