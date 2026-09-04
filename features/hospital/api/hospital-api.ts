import { supabase } from '@/lib/supabase';
import { Regions } from '../types/hospital.types';
import { api } from '@/shared/api/axiosInstance';
import qs from 'qs';

const HOSPITAL_API_URL = "/api/hospital";

export const getRegions = async (code: string | undefined, level: number[]): Promise<Regions[]> => {
  const response = await api.get(`${HOSPITAL_API_URL}/regions`, {
    params: {code, level},
    paramsSerializer: (params) => {
      return qs.stringify(params, {
        arrayFormat: "repeat"
      });
    }
  });

  return response.data;
}

// export const getSidoRegions = async (): Promise<Regions[]> => {
//   const { data, error } = await supabase
//     .from("regions")
//     .select("code, name, level")
//     .eq("level", 1);

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }

// export const getRegionTree = async (level: number[], regionCode?: string): Promise<Regions[]> => {
//   const { data, error } = await supabase.rpc("get_region_tree", {
//     region_level: level,
//     region_code: regionCode
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }