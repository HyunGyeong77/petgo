"use client";

import styles from './hero.module.scss';
import Background from './assets/images/bg.jpg';
import Dog from './assets/images/dog.png';
import DownIcon from './assets/gifs/down.gif';
import Image from 'next/image';
import {useRef, useEffect} from 'react';
import {useMediaQuery} from '@/lib/hooks/useMediaQuery';
import gsap from 'gsap';

export default function Hero() {
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const notifyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const titleCur = titleRef.current;
    const contentCur = contentRef.current;
    const notifyCur = notifyRef.current;

    if(!titleCur || !contentCur || !notifyCur) return;

    const timeline = gsap.timeline();
    timeline.fromTo(titleCur, {y:50, opacity:0}, {y: 0, opacity:1, duration:0.7})
      .fromTo(contentCur, {y:30, opacity:0}, {y:0, opacity:1, duration: 0.7}, "-=0.3")
      .fromTo(notifyCur, {y:30, opacity:0}, {y:0, opacity:1, duration: 0.7}, "-=0.3")
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles["bg-box"]}>
        <Image className={styles.bg} src={Background} alt="background image" width={1920} height={1275} loading="eager" />
      </div>
      <div className={styles["content-layout"]}>
        <div className={styles.content}>
          {isDesktop &&
            <Image className={styles["dog-img"]} src={Dog} alt="dog image" width={450} height={354} loading="eager" />
          }
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