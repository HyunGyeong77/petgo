"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";
import styles from "./page.module.scss";
import Loading from "@/components/ui/loading/Loading";
import { fetchPost, Article } from "@/services/education.api";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  
  const level = decodeURIComponent(params.level as string);
  const id = params.id as string;

  const { data: posts, isLoading, isError } = useQuery<Article[]>({
    queryKey: ["post", id, level],
    queryFn: () => fetchPost(id, level),
    enabled: !!id && !!level
  });

  const article = posts?.[0];

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={handleBack} className={styles.backButton} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        </header>
        <div className={styles.contentWrapper}>
          <p>포스트를 불러오는 중 오류가 발생했거나 포스트를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <h1 className={styles.headerTitle}>{article.title}</h1>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.meta}>
            <span className={styles.badge}>{article.level}</span>
            <span className={styles.readTime}>
              <Clock size={14} />
              {article.readtime}분
            </span>
          </div>
          <h2 className={styles.title}>{article.title}</h2>
        </section>

        <section className={styles.contentWrapper}>
          <article className={styles.content}>
            {article.content}
          </article>
        </section>
      </main>
    </div>
  );
};

export default Page;