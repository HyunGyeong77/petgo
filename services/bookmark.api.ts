import { supabase } from "@/lib/supabase";


export const fetchUserBookmark = async (userId: string) => {
  const { data, error } = await supabase.rpc("user_bookmark_lists", {
    u_id: userId
  });

  if(error) throw error;

  return data;
}

export const fetchUserBookmarkPost = async (product_id: string[]) => {
  const { data, error } = await supabase.rpc("profile_user_bookmark", {
    p_ids: product_id
  });

  if(error) throw error;

  return data;
}