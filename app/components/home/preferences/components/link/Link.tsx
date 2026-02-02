"use client";

import styles from './link.module.scss';
import SectionLinkButton from '@/components/common/section-link-button/SectionLinkButton';

export default function Link() {
  return (
    <section className={styles.wrap}>
      <h2>알면 알수록 반려견과의 관계는 <span>더욱 깊어집니다 😊</span></h2>
      <SectionLinkButton content="반려견과 친해지러 가기" />
    </section>
  );
}