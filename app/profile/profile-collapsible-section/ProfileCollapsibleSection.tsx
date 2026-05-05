import type { ReactNode } from "react";
import styles from "./profile-collapsible-section.module.scss";

export type ProfileCollapsibleSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  contentId: string;
  children: ReactNode;
  variant?: "combined" | "bookmark";
  disabled?: boolean;
};

export default function ProfileCollapsibleSection({
  title,
  isOpen,
  onToggle,
  contentId,
  children,
  variant = "combined",
  disabled
}: ProfileCollapsibleSectionProps): React.JSX.Element {
  const sectionClass: string =
    variant === "bookmark" ? `${styles.section} ${styles.sectionBookmark}` : styles.section;

  return (
    <section className={sectionClass}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button
          type="button"
          className={`${styles.toggleButton} ${disabled && styles.disabled}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          disabled={disabled}
        >
          {isOpen ? "숨기기" : "보기"}
        </button>
      </div>
      <div
        id={contentId}
        className={`${styles.collapseWrap} ${isOpen ? styles.open : styles.closed}`}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </section>
  );
}
