import { supabase } from "@/lib/supabase";

export type Article = {
  id: string;
  title: string;
  level: string;
  readtime: number;
  content: string;
  category: string;
};

export const fetchPost = async (id: string, level: string) => {
  const { data, error } = await supabase.rpc("posts", {
    p_level: level,
    p_id: id
  });

  if (error) throw error;

  return data as Article[];
};
