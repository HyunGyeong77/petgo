import { Products } from "../types/recommend.types";
import { api } from "@/shared/api/axiosInstance";

const RECOMMEND_API_URL = "/api/recommend";

export const getCategoryTree = async (): Promise<Products[]> => {
  const response = await api.get(`${RECOMMEND_API_URL}/category/all`);

  return response.data;
}