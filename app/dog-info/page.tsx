"use client";

import { useState, useMemo, useEffect } from "react";
import styles from "./dog-info.module.scss";
import HeroSection from "./components/hero-section/HeroSection";
import CategorySection from "./components/category-section/CategorySection";
import ArticleSection from "./components/article-section/ArticleSection";
import ChecklistSection from "./components/checklist-section/ChecklistSection";
import LearningPathSection from "./components/learning-path-section/LearningPathSection";
import FaqSection from "./components/faq-section/FaqSection";
import CtaSection from "./components/cta-section/CtaSection";
import DisclaimerSection from "./components/disclaimer-section/DisclaimerSection";
import { faqData } from "./dog-info.data";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthContext";
import { showToast } from "@/common/utils/toast";
import { useUserCheckList } from "@/hooks/useUserCheckList";
import { useUserBookmark } from "@/hooks/useUserBookmark";

export type Category = {
  category_id: string,
  title: string,
  description: string,
  icon: string
}

export type PostRow = {
  id: string
  title: string
  readtime: string
  level: string
  category_id: string
}

export type Bookmark = {
  user_id: string,
  product_id: string
}

export type CheckList = {
  id: string,
  title: string
}

export default function DogInfoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<PostRow[]>([]);

  const auth = useAuth();
  const queryClient = useQueryClient();

  // 객체 키 = 카테고리 id, 객체 값 = 포스트 정보
  const groupedPosts = useMemo<Record<string, PostRow[]>>(() => {
    const result: Record<string, PostRow[]> = {};

    posts.forEach((post) => {
      const key = post.category_id;

      (result[key] ??= []).push(post);
    });

    return result;
  }, [posts]);

  // 포스트에 존재하는 카테고리 불러오기
  const orderedCategory = useMemo<Category[]>(() => {
    const keys = Object.keys(groupedPosts);

    const categoryMap = Object.fromEntries(
      categories.map(c => [c.category_id, c])
    );

    return keys
      .map(key => categoryMap[key])
      .filter(Boolean);
  }, [groupedPosts, categories]);

  // 선택한 카테고리의 포스트 불러오기
  const selectedCategoryData = useMemo<PostRow[] | null>(() => {
    if(!selectedCategory) return null;
    return groupedPosts[selectedCategory] ?? null;
  }, [selectedCategory, groupedPosts]);

  // 카테고리 선택 시 선택된 카테고리 정보 추출
  const articleCategory = useMemo<Category | null | undefined>(() => {
    if(!selectedCategory) return null;
    return orderedCategory.find(category => category.category_id === selectedCategory);
  }, [selectedCategory]);

  // 북마크 불러오기
  const { data: bookmarkedArticles } = useUserBookmark(auth?.user?.id);

  const today = new Date().toISOString().slice(0, 10);

  // 오늘의 체크리스트 5개 불러오기
  const { data: todayCheckList } = useQuery<CheckList[]>({
    queryKey: ["checklist", today],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("today_checklist")

      if(error) throw error;

      return data;
    }
  });

  // 유저 체크리스트 불러오기
  const { data: userCheckList } = useUserCheckList(auth?.user?.id);

  // 카테고리 및 포스트 불러오기
  useEffect(() => {
    const category_list = async () => {
      try {
        const { data, error } = await supabase.rpc("category_lists");

        if(error) throw new Error(error.message);

        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }

    const posts_list = async () => {
      try {
        const { data, error } = await supabase.rpc("posts_list");
  
        if(error) throw new Error(error.message);
        
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    }

    category_list();
    posts_list();
  }, []);

  const toggleBookmark = async (articleId: string) => {
    try {
      const { error } = await supabase.rpc("bookmarks_save_or_not", {
        u_id: auth?.user?.id,
        p_id: articleId
      });

      if(error) throw new Error(error.message);

      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    } catch (err) {
      showToast("error", "북마크를 설정하는 도중 오류가 발생했습니다.");
      console.log(err);
    }
  };

  const toggleCheckItem = async (itemId: string, isUser: boolean) => {
    if(isUser) {
      try {
        const { error } = await supabase.rpc("checklist_check", {
          u_id: auth?.user?.id,
          c_id: itemId
        });

        if(error) throw new Error(error.message);

        queryClient.invalidateQueries({ queryKey: ["user_checklist"] });
      } catch (err) {
        showToast("error", "체크리스트를 설정하는 도중 문제가 발생했습니다");
        console.log(err);
      }
    } else {
      setCheckedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroSection
          totalArticles={posts.length}
          bookmarkedCount={bookmarkedArticles?.length ?? 0}
          completedCount={auth?.user ? userCheckList?.length ?? 0 : checkedItems.length}
          categoryCount={categories.length}
        />
        <CategorySection
          groupedPosts={groupedPosts}
          categories={orderedCategory}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {(selectedCategoryData && articleCategory) && 
          <ArticleSection
            selectedCategoryData={selectedCategoryData}
            categories={articleCategory}
            bookmarkedArticles={bookmarkedArticles}
            onToggleBookmark={toggleBookmark}
          />
        }
        <ChecklistSection
          items={todayCheckList!}
          userCheckList={userCheckList}
          checkedItems={checkedItems}
          onToggleItem={toggleCheckItem}
        />
        <LearningPathSection />
        <FaqSection faqs={faqData} />
        <CtaSection />
        <DisclaimerSection />
      </main>
      <Footer />
    </div>
  );
}
