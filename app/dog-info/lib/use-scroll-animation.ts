"use client";

import { useEffect, useRef } from "react";

type UseScrollAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * 지정한 ref 요소가 뷰포트에 진입할 때
 * data-animate 속성을 "visible"로 변경하여 CSS 애니메이션을 트리거합니다.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): React.RefObject<T | null> {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } =
    options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-animate", "visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.setAttribute("data-animate", "hidden");
          }
        });
      },
      { threshold, rootMargin }
    );

    // 직접 대상 요소 또는 내부 [data-animate] 자식 모두 관찰
    const targets = el.querySelectorAll<HTMLElement>("[data-animate]");
    if (targets.length > 0) {
      targets.forEach((target) => observer.observe(target));
    } else {
      el.setAttribute("data-animate", "hidden");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
