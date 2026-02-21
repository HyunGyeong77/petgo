"use client";

import {useQuery} from '@tanstack/react-query';
import {getSido, getSigungu, getEupmyeon, getRi} from '../api/region-api';
import { Region } from '@/types/api/region';

export const useSido = () => {
  const query = useQuery({
    queryKey: ["sido"],
    queryFn: getSido,
    throwOnError: false
  });

  return query;
}

// 재사용 hook (useSigungu, useEupmyeon, useRi)
const useRegion = (key: string, code: string, getFn: (code: string) => Promise<Region[]>) => {
  const query = useQuery({
    queryKey: [key, code],
    queryFn: () => getFn(code),
    throwOnError: false,
    enabled: !!code
  });

  return query;
}

export const useSigungu = (sido: string) => {return useRegion("sigungu", sido, getSigungu);}
export const useEupmyeon = (sigungu: string) => {return useRegion("eupmyeon", sigungu, getEupmyeon);}
export const useRi = (eupmyeon: string) => {return useRegion("ri", eupmyeon, getRi);}