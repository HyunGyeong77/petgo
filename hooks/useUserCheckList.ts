import { fetchUserCheckList } from "@/services/checklist.api";
import { useQuery } from "@tanstack/react-query";

export type UserCheckList = {
  checklist_id: string
}

export const useUserCheckList = (userId?: string) => {
  return useQuery<UserCheckList[]>({
    queryKey: ["user_checklist", userId],
    queryFn: () => fetchUserCheckList(userId!),
    enabled: !!userId
  });
}