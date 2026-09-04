"use client";

import styles from "./hospital.module.scss";
import HospitalRegion from "./HospitalRegion";
import ScrollReveal from "@/components/ui/scroll-reveal/ScrollReveal";
import { Regions } from "../types/hospital.types";
import { useHospitalRegion } from "../hooks/useHospitalRegion";
import { SIDO_NAME, SIGUNGU_NAME } from "../constants/region";
import { useHospitalRegionQuery } from "../hooks/useHospitalRegionQuery/useHospitalRegionQuery";

export default function Hospital() {
  const { state, dispatch } = useHospitalRegion();

  const sidoRegions = useHospitalRegionQuery([1]);
  const districtRegions = useHospitalRegionQuery([2], state.district.code);
  const dongRegions = useHospitalRegionQuery([3, 4], state.dong.code);

  const canSearch = state.city.name !== SIDO_NAME && state.district.name !== SIGUNGU_NAME;

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
              regions={sidoRegions.data}
              parent={true}
              onClick={regionClick}
              isSido={true}
            />
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <HospitalRegion
              region={state.district.name}
              regions={districtRegions.data}
              parent={state.city.name !== SIDO_NAME}
              onClick={regionClick}
            />
          </ScrollReveal>

          <ScrollReveal delay={3}>
            <HospitalRegion
              region={state.dong.name}
              regions={dongRegions.data}
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
