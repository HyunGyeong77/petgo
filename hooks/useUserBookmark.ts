import { fetchUserBookmark, fetchUserBookmarkPost } from "@/services/bookmark.api";
import { useQuery } from "@tanstack/react-query";

export type Bookmark = {
  user_id: string,
  product_id: string
}

export type BookmarkPost = {
  id: string,
  title: string,
  level: string,
  category_id: string
}

export const useUserBookmark = (userId?: string) => {
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks", userId],
    queryFn: () => fetchUserBookmark(userId!),
    enabled: !!userId
  });
}

export const useUserBookmarkPost = (bookmarks: string[]) => {
  return useQuery<BookmarkPost[]>({
    queryKey: ["bookmark", "post", bookmarks],
    queryFn: () => fetchUserBookmarkPost(bookmarks),
    enabled: !!bookmarks
  })
}