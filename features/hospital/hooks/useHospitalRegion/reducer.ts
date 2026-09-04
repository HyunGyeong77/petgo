import type { RegionState, RegionAction } from './types';
import { SIGUNGU_NAME, EUPMYEONDONG_NAME } from '../../constants/region';

export function regionReducer(state: RegionState, action: RegionAction): RegionState {
  switch (action.type) {
    case "SELECT_CITY":
      if (state.city.code === action.payload.code) return state;

      return {
        ...state,
        city: action.payload,

        district: { name: SIGUNGU_NAME, code: action.payload.code, level: action.payload.level },
        dong: { name: EUPMYEONDONG_NAME },
      };

    case "SELECT_DISTRICT":
      if (state.district.code === action.payload.code) return state;

      return {
        ...state,
        district: action.payload,

        dong: { name: EUPMYEONDONG_NAME, code: action.payload.code, level: action.payload.level },
      };

    case "SELECT_DONG":
      if (state.dong.code === action.payload.code) return state;

      return {
        ...state,
        dong: action.payload
      };

    default:
      return state;
  }
}