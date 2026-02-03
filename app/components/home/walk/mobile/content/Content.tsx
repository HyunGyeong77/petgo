import styles from './content.module.scss';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';

export default function Content({recommend, reason}: {recommend: string, reason: string}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapCur = wrapRef.current;

    if(!wrapCur) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          gsap.fromTo(wrapCur, 
            {y: 100, opacity: 0},
            {y: 0, opacity: 1, duration: 1}
          );

          observer.disconnect();
        }
      });
    });

    observer.observe(wrapCur);

    return () => observer.unobserve(wrapCur);
  }, []);
  
  return (
    <div ref={wrapRef} className={styles.wrap}>
      <p className={styles.recommend}>{recommend}</p>
      <span className={styles.reason}>{reason}</span>
    </div>
  );
}