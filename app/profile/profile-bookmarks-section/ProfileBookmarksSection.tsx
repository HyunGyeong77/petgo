import Link from "next/link";
import ProfileCollapsibleSection from "../profile-collapsible-section/ProfileCollapsibleSection";
import styles from "./profile-bookmarks-section.module.scss";
import { BookmarkPost } from "@/hooks/useUserBookmark";

export type ProfileBookmarksSectionProps = {
  items: BookmarkPost[] | undefined;
  isOpen: boolean;
  onToggle: () => void;
};

export default function ProfileBookmarksSection({
  items,
  isOpen,
  onToggle,
}: ProfileBookmarksSectionProps): React.JSX.Element {
  return (
    <ProfileCollapsibleSection
      title={`북마크 (${items ? items.length : 0})`}
      isOpen={isOpen}
      onToggle={onToggle}
      contentId="bookmark-content"
      variant="bookmark"
      disabled={!items?.length}
    >
      <article className={styles.itemCard}>
        <ul className={styles.bookmarkList}>
          {(items ?? []).map((item: BookmarkPost) => (
            <li key={item.id + item.title}>
              <Link href={`/education/${item.category_id}/${item.level}/${item.id}`}
                className={styles.bookmarkLink}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </ProfileCollapsibleSection>
  );
}
