import styles from './recommend.module.scss';
import SectionContent from "@/components/layout/section/content/SectionContent";

export default function Recommend() {
  return (
    <SectionContent>
      <article className={styles.wrap}>
        <h2 className={styles.title}>반려견에게 이런 용품들을 추천해요!</h2>
      </article>
    </SectionContent>
  );
}