"use client";

import styles from './hero.module.scss';
import Background from './assets/images/bg.jpg';
import Dog from './assets/images/dog.png';
import DownIcon from './assets/gifs/down.gif';
import Image from 'next/image';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const notifyRef = useRef<HTMLDivElement | null>(null);
  const dogRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const titleCur = titleRef.current;
    const contentCur = contentRef.current;
    const notifyCur = notifyRef.current;

    if(!titleCur || !contentCur || !notifyCur) return;
    
    const before = (y: number) => {return {y: y, opacity: 0};}
    const after = () => {return {y: 0, opacity: 1, duration: 0.7};}

    const timeline = gsap.timeline();

    // 반응형에 따라 시작 딜레이 값 변경
    let delay = "0";
    
    if(window.innerWidth >= 1024) {
      const dogCur = dogRef.current;
      timeline.fromTo(dogCur, before(50), after());
      delay = "-=0.3";
    }

    timeline.fromTo(titleCur, before(50), after(), delay)
      .fromTo(contentCur, before(30), after(), "-=0.3")
      .fromTo(notifyCur, before(30), after(), "-=0.3")
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles["bg-box"]}>
        <Image className={styles.bg} src={Background} alt="background image" width={1920} height={1275} loading="eager" />
      </div>
      <div className={styles["content-layout"]}>
        <div className={styles.content}>
          <Image ref={dogRef} className={styles["dog-img"]} src={Dog} alt="dog image" width={450} height={354} loading="eager" />
          <div className={styles.group}>
            <h2 className={styles.heading} ref={titleRef}>반려견을 더 잘 이해하는 방법</h2>
            <p ref={contentRef} className={styles.word}>강아지가 좋아하는 것부터 산책, 용품, 병원 정보까지 한 곳에서 확인하세요.</p>
          </div>
        </div>
        <div ref={notifyRef} className={styles.notify}>
          <Image className={styles["down-img"]} src={DownIcon} alt="down icon" width={17} height={13} loading="eager" />
          <span>아래로 스크롤</span>
        </div>
      </div>
    </div>
  );
}