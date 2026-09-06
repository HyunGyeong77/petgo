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