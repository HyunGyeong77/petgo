import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getRegions } from "../../api/hospital-api";
import { Regions } from "../../types/hospital.types";

export const useHospitalRegionQuery = (level: number[], code?: string): UseQueryResult<Regions[]> => {
  return useQuery({
    queryKey: ["hospital", "regions", code, level],
    queryFn: () => {
      if (level.includes(1))
        return getRegions(undefined, level);

      return getRegions(code!, level);
    },
    enabled: level.includes(1) || !!code
  });
}