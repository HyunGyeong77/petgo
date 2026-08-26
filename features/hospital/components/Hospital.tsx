"use client";

import { useEffect } from "react";
import styles from "./hospital.module.scss";
import { showToast } from "@/utils/toast";
import HospitalRegion from "./HospitalRegion";
import ScrollReveal from "@/components/ui/scroll-reveal/ScrollReveal";
import { Regions } from "../types/hospital.types";
import { getSidoRegions, getRegionTree } from "../api/hospital-api";
import { useHospitalRegion } from "../hook/useHospitalRegion";
import { SIDO_NAME, SIGUNGU_NAME } from "../constants/region";

export default function Hospital() {
  const { state, dispatch } = useHospitalRegion();

  const canSearch = state.city.name !== SIDO_NAME && state.district.name !== SIGUNGU_NAME;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSidoRegions();

        dispatch({ type: "SET_SIDO_REGIONS", payload: data });
      } catch (err) {
        showToast("error", "지역을 불러오는데 실패했습니다.");

        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (state.city.name === SIDO_NAME) return;

    const fetch = async () => {
      try {
        const data = await getRegionTree([2], state.city.code);

        console.log(data);

        dispatch({ type: "SET_DISTRICT_REGIONS", payload: data });
      } catch (err) {
        showToast("error", "시/도 목록을 불러오는데 실패했습니다.");
        console.log(err);
      }
    };

    fetch();
  }, [state.city]);

  useEffect(() => {
    if (state.city.name === SIDO_NAME) return;

    const fetch = async () => {
      try {
        const data = await getRegionTree([3, 4], state.district.code);

        dispatch({ type: "SET_DONG_REGIONS", payload: data });
      } catch (err) {
        showToast("error", "하위 목록을 불러오는데 실패했습니다.");
        console.log(err);
      }
    };

    fetch();
  }, [state.district]);

  const regionClick = (region: Regions) => {
    if (!region) return null;

    switch (region.level) {
      case 1:
        dispatch({ type: "SELECT_CITY", payload: region });
        break;

      case 2:
        dispatch({ type: "SELECT_DISTRICT", payload: region });
        break;

      case 3:
      case 4:
        dispatch({ type: "SELECT_DONG", payload: region });
        break;
    }
  };

  if (!state.city) return null;

  return (
    <section id="hospital" className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <h2 className={styles.heading}>내 지역 근처 병원을 알아보세요!</h2>
        </ScrollReveal>

        <div className={styles.filterRow}>
          <ScrollReveal delay={1}>
            <HospitalRegion
              region={state.city.name}
              regions={state.sidoRegions}
              parent={true}
              onClick={regionClick}
              isSido={true}
            />
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <HospitalRegion
              region={state.district.name}
              regions={state.districtRegions}
              parent={state.city.name !== SIDO_NAME}
              onClick={regionClick}
            />
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <HospitalRegion
              region={state.dong.name}
              regions={state.dongRegions}
              parent={state.district.name !== SIGUNGU_NAME}
              onClick={regionClick}
            />
          </ScrollReveal>

          <ScrollReveal delay={4}>
            <button
              className={`${styles.searchBtn} ${canSearch ? styles.searchBtnActive : ""}`}
              disabled={!canSearch}
            >
              찾기
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
