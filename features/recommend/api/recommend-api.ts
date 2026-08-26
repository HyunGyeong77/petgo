import { supabase } from "@/lib/supabase";
import { Products } from "../types/recommend.types";

export const getCategoryTree = async (): Promise<Products> => {
  const { data, error } = await supabase
    .from('category_tree')
    .select('result')
    .single();

  if (error) throw new Error(error.message);

  return data.result;
}