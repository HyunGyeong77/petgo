import { ActionDispatch, useReducer } from "react";
import { initialState } from "./initialState";
import { regionReducer } from "./reducer";
import { RegionAction, RegionState } from "./types";


export function useHospitalRegion(): {state: RegionState, dispatch: ActionDispatch<[action: RegionAction]>} {
  const [state, dispatch] = useReducer(regionReducer, initialState);

  return {
    state, 
    dispatch
  };
}