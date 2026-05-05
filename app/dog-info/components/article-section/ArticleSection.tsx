import { Bookmark } from "lucide-react";
import styles from "./article-section.module.scss";
import { useScrollAnimation } from "../../lib/use-scroll-animation";
import Link from "next/link";
import { PostRow, Category, Bookmark as BookmarkType } from "../../page";
import { useAuth } from "@/providers/AuthContext";

type ArticleSectionProps = {
  selectedCategoryData: PostRow[];
  categories: Category
  bookmarkedArticles: BookmarkType[] | undefined;
  onToggleBookmark: (articleId: string) => void;
};

export default function ArticleSection({
  selectedCategoryData,
  categories,
  bookmarkedArticles,
  onToggleBookmark,
}: ArticleSectionProps) {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });
  const auth = useAuth();
  
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div 
          className={styles.header}
          ref={headerRef}
          data-animate="hidden"
        >
          <h2 className={styles.title}>{categories.title}</h2>
          <p className={styles.description}>{categories.description}</p>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {Object.values(selectedCategoryData).map((category) => {
            const isBookmarked = bookmarkedArticles?.some((bookmark) => (
              bookmark.product_id === category.id
            ));
            
            return (
              <div key={category.id} className={styles.card}>
                <Link 
                  href={`/education/${categories.title}/${category.level}/${category.id}`} 
                  className={styles.cardContent}
                >
                  <div className={styles.badges}>
                    <span
                      className={`${styles.badge} ${
                        category.level === "기초"
                          ? styles.basic
                          : styles.intermediate
                      }`}
                    >
                      {category.level}
                    </span>
                    <span className={styles.readTime}>
                      ⏱ {category.readtime}분 읽기
                    </span>
                  </div>
                  <h3 className={styles.articleTitle}>{category.title}</h3>
                </Link>
                {auth?.user && 
                  <button
                    onClick={() => onToggleBookmark(category.id)}
                    className={`${styles.bookmarkBtn} ${
                      isBookmarked ? styles.bookmarked : ""
                    }`}
                    aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
                  >
                    <Bookmark
                      width={20}
                      height={20}
                      fill={isBookmarked ? "#ff9a3c" : "none"}
                      color={isBookmarked ? "#ff9a3c" : "#bbb"}
                    />
                  </button>
                }
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
