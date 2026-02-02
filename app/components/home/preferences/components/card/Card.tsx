"use client";

import styles from './card.module.scss';
import Image, { StaticImageData } from 'next/image';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';

type Props = {
  image: {src: StaticImageData, alt: string}
  title: string,
  things: string[],
  result: string
}

export default function Card(props: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapCur = wrapRef.current;

    if(!wrapCur) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          gsap.fromTo(wrapCur, 
            {y: 70, opacity: 0},
            {y: 0, opacity: 1, duration: 0.4}
          )

          observer.disconnect();
        }
      });
    });

    observer.observe(wrapCur);

    return () => {
      observer.unobserve(wrapCur);
    }
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <Image src={props.image.src} alt={props.image.alt} width={1920} height={1280} />
      <div className={styles["contents-box"]}>
        <p className={styles.title}>{props.title}</p>
        <div className={styles["detail-box"]}>
          <ul>
            {props.things.map((thing, index) => (
              <li key={thing + index}>
                <p><span>•</span><span>{thing}</span></p>
              </li>
            ))}
          </ul>
          <p className={styles.result}>{props.result}</p>
        </div>
      </div>
    </div>
  );
}