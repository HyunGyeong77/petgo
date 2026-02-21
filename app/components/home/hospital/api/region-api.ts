import {Region} from "@/types/api/region";

export const getSido = async (): Promise<Region[]> => {
  const res = await fetch("https://petgo-api.onrender.com/api/home/hospital/sido");
  if(!res.ok) throw new Error("시/도 불러오기 실패");

  return res.json();
}

// 재사용 비동기 함수 (getSigungu, getEupmyeon, getRi)
const getRegion = async (level: number, code: string, errMessage: string): Promise<Region[]> => {
  const res = await fetch(
    `https://petgo-api.onrender.com/api/home/hospital/region?level=${level}&code=${code}`
  )
  if(!res.ok) throw new Error(errMessage);
  return res.json();
}

export const getSigungu = async (sido: string) => {
  return await getRegion(2, sido, "시/군/구 불러오기 실패");
}

export const getEupmyeon = async (sigungu: string) => {
  return await getRegion(3, sigungu, "읍/면/동 불러오기 실패");
}

export const getRi = async (eupmyeon: string) => {
  return await getRegion(4, eupmyeon, "리 불러오기 실패");
}