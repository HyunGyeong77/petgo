import { supabase } from '@/lib/supabase';
import { Regions } from '../types/hospital.types';

export const getSidoRegions = async (): Promise<Regions[]> => {
  const { data, error } = await supabase
    .from("regions")
    .select("code, name, level")
    .eq("level", 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const getRegionTree = async (level: number[], regionCode?: string): Promise<Regions[]> => {
  const { data, error } = await supabase.rpc("get_region_tree", {
    region_level: level,
    region_code: regionCode
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}