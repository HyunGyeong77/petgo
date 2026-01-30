import styles from './section-link-button.module.scss';
import SafeLink from "../safe-link/SafeLink";

export default function SectionLinkButton({content}: {content: React.ReactNode}) {
  return (
    <SafeLink>
      <p className={styles.wrap}>{content}</p>
    </SafeLink>
  );
}