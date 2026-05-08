import { supabase } from "@/lib/supabase";

export const fetchProduct = async () => {
  const { data, error } = await supabase
    .from("category_tree")
    .select("result")
    .single();

  if(error) throw error;

  return data;
}