"use client";

import styles from './walk.module.scss';
import {useMediaQuery} from "@/lib/hooks/useMediaQuery";
import WalkMobile from "./mobile/WalkMobile";
import WalkDesktop from "./desktop/WalkDesktop";

export default function Walk() {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <article className={styles.wrap}>
      <h2 className={styles.title}>산책은 어떻게 하면 좋을까요??</h2>
      <section className={styles.content}>
        {isMobile ? <WalkMobile /> : <WalkDesktop />} 
      </section>
    </article>
  );
}