"use client";

import {useMediaQuery} from "@/lib/hooks/useMediaQuery";
import WalkMobile from "./mobile/WalkMobile";
import WalkDesktop from "./desktop/WalkDesktop";

export default function Walk() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <article>
      <h2>산책은 어떻게 하면 좋을까요??</h2>
      <section>
        {isMobile ? <WalkMobile /> : <WalkDesktop />} 
      </section>
    </article>
  );
}