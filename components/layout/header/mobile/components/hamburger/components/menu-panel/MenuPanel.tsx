import styles from './menu-panel.module.scss';
import Close from '../../assets/close.svg';
import Image from 'next/image';
import SafeLink from '@/components/common/safe-link/SafeLink';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';

export default function MenuPanel({onClick}: {onClick: (bool: boolean) => void}) {
  const wrap = useRef(null);

  useEffect(() => {
    const wrapCur = wrap.current;
    gsap.to(wrapCur, {right: 0, duration: 0.3});
  }, []);

  return (
    <div className={styles.bg}>
      <div ref={wrap} className={styles.wrap}>
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
          <nav className={styles.nav}>
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
        </div>
      </div>
    </div>
  );
}