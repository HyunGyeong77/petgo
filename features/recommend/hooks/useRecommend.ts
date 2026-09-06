import { Products } from "../types/recommend.types";
import { getCategoryTree } from "../api/recommend-api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";


export const useRecommendCategoryTree = (): UseQueryResult<Products[]> => {
  return useQuery({
    queryKey: ["recommend", "category", "all"],
    queryFn: () => getCategoryTree()
  });
}