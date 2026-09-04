import type { Regions } from "../../types/hospital.types";

export interface RegionState {
  city: Regions;
  district: Regions;
  dong: Regions;
  
  sidoRegions: Regions[] | null;
  districtRegions: Regions[] | null;
  dongRegions: Regions[] | null;
};

export type RegionAction =
| {
    type: "SELECT_CITY";
    payload: Regions;
  }
| {
    type: "SELECT_DISTRICT";
    payload: Regions;
  }
| {
    type: "SELECT_DONG";
    payload: Regions;
  }
| {
    type: "SET_SIDO_REGIONS";
    payload: Regions[];
  }
| {
    type: "SET_DISTRICT_REGIONS";
    payload: Regions[];
  }
| {
    type: "SET_DONG_REGIONS";
    payload: Regions[];
  };