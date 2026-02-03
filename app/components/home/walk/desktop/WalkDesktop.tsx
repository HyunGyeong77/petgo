import styles from './walk-desktop.module.scss';
import Stroll from './components/svg/Stroll';
import {useEffect} from 'react';
import gsap from 'gsap';

export default function WalkDesktop() {

  useEffect(() => {
    const stroll = document.getElementById("stroll");
    if(!stroll) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          gsap.fromTo(entry.target, {
            attr: {transform: 'translate(0, -30)'}, 
            opacity: 0
          }, {
            attr: {transform: 'translate(0, 0)'},
            opacity: 1, 
            duration: 1
          });

          observer.unobserve(entry.target);
        }
      });
    });

    const gTags = stroll.querySelectorAll("g");
    gTags.forEach(g => observer.observe(g));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrap}>
      <Stroll />
    </div>
  );
}