import type { RegionState } from "./types";
import { SIDO_NAME, SIGUNGU_NAME, EUPMYEONDONG_NAME } from '../../constants/region';

export const initialState: RegionState = {
  city: { name: SIDO_NAME },
  district: { name: SIGUNGU_NAME },
  dong: { name: EUPMYEONDONG_NAME },
  
  sidoRegions: null,
  districtRegions: null,
  dongRegions: null
}