import styles from './menu-panel.module.scss';
import Close from '../../assets/close.svg';
import Image from 'next/image';
import SafeLink from '@/components/common/safe-link/SafeLink';

export default function MenuPanel({onClick}: {onClick: (bool: boolean) => void}) {
  return (
    <div className={styles.bg}>
      <div className={styles.wrap}>
        <div className={styles.layout}>
          <div className={styles.top}>
            <button className={styles["close-btn"]} onClick={() => onClick(false)} aria-label="close button">
              <Image src={Close} alt="close image" width={25} height={25} />
            </button>
            <div className={styles["join-layout"]}>
              <SafeLink>로그인</SafeLink>
              <SafeLink>회원가입</SafeLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}