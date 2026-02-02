import styles from './menu-panel.module.scss';
import Close from '../../assets/close.svg';
import Image from 'next/image';
import SafeLink from '@/components/common/safe-link/SafeLink';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';

export default function MenuPanel({onClick}: {onClick: (bool: boolean) => void}) {
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapCur = wrap.current;
    const body: HTMLElement = document.documentElement;

    body.style.setProperty("overflow-y", "hidden");
    gsap.to(wrapCur, {right: 0, duration: 0.3});
  }, []);

  const closeBtnClick = () => {
    const wrapCur = wrap.current;
    const body: HTMLElement = document.documentElement;

    if(!wrapCur) return;

    gsap.to(wrapCur, 
      {
        right: wrapCur.offsetWidth * -1, 
        duration: 0.3, 
        onComplete: () => {
          body.style.setProperty("overflow-y", "visible");
          onClick(false)
        }
      });
  }

  return (
    <div className={styles.bg}>
      <div ref={wrap} className={styles.wrap}>
        <div className={styles.layout}>
          <div className={styles.top}>
            <button className={styles["close-btn"]} onClick={closeBtnClick} aria-label="close button">
              <Image src={Close} alt="close image" width={25} height={25} />
            </button>
            <div className={styles["join-layout"]}>
              <SafeLink><span className={styles.link}>로그인</span></SafeLink>
              <SafeLink><span className={styles.link}>회원가입</span></SafeLink>
            </div>
          </div>
          <nav className={styles.nav}>
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
        </div>
      </div>
    </div>
  );
}