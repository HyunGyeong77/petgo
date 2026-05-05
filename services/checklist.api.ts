import { supabase } from "@/lib/supabase";

export const fetchUserCheckList = async (userId: string) => {
  const { data, error } = await supabase.rpc("user_checklists", {
    u_id: userId
  });

  if(error) throw error;

  return data;
}