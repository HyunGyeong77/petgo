'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './hospital.module.scss';
import { supabase } from '@/lib/supabase';
import { showToast } from '@/lib/toast';
import HospitalRegion from './hospital-region/HospitalRegion';

export interface Regions {
  code?: string,
  name: string,
  level?: number
}

export const sido = '시/도';
const sigungu = '시/군/구';
const eupmyeondong = '읍/면/동';

export default function Hospital() {
  const [city, setCity] = useState<Regions>({name: sido});
  const [district, setDistrict] = useState<Regions>({name: sigungu});
  const [dong, setDong] = useState<Regions>({name: eupmyeondong});

  const [sidoRegions, setSidoRegions] = useState<Regions[] | null>(null);
  const [districRegions, setDistricRegions] = useState<Regions[] | null>(null);
  const [dongRegions, setDongRegions] = useState<Regions[] | null>(null);

  const canSearch = (city.name !== sido) && (district.name !== sigungu);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("regions")
          .select("code, name, level")
          .eq("level", 1);

        if(error) {throw new Error(error.message);}
        
        setSidoRegions(data);
      } catch (err) {
        showToast("error", "지역을 불러오는데 실패했습니다.");
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const fetchData = async (level: number[], region: Regions) => {
    try {
      const { data, error } = await supabase
        .rpc("get_region_tree", {
          region_level: level,
          region_code: region.code
        });

        if(error) {throw new Error(error.message);}
      
        return data;
    } catch (err) {
      showToast("error", "하위 목록을 불러오는데 실패했습니다.");
      console.log(err);
    }
  }

  useMemo(() => {
    if(city.name === sido) return;

    const data = fetchData([2], city);
    data.then(value => setDistricRegions(value));
  }, [city]);

  useMemo(() => {
    if(district.name === sigungu) return;

    const data = fetchData([3, 4], district);
    data.then(value => setDongRegions(value));
  }, [district]);

  const regionClick = useCallback((region: Regions) => {
    if(!region) return null;

    const resetOrRegion = (currentName: string, targetName: string, fallback: Regions) =>
      currentName === targetName ? { name: targetName, code: "", level: 0 } : fallback;

    switch (region.level) {
      case 1:
        setCity(region);
        setDistrict(() => resetOrRegion(district.name, sigungu, district));
        setDong(() => resetOrRegion(dong.name, eupmyeondong, dong));
        break;
      case 2:
        setDistrict(() => region);
        setDong(() => resetOrRegion(dong.name, eupmyeondong, dong));
        break;
      case 3:
      case 4:
        setDong(() => region);
        break;
    }
  }, []);

  if(!sidoRegions) return null;

  return (
    <section id="hospital" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>내 지역 근처 병원을 알아보세요!</h2>

        <div className={styles.filterRow}>
          <HospitalRegion 
            region={city.name}
            regions={sidoRegions}
            parent={true}
            onClick={regionClick}
            isSido={true}
          />
          <HospitalRegion 
            region={district.name}
            regions={districRegions}
            parent={city.name !== sido}
            onClick={regionClick}
          />
          <HospitalRegion 
            region={dong.name}
            regions={dongRegions}
            parent={district.name !== sigungu}
            onClick={regionClick}
          />

          <button
            className={`${styles.searchBtn} ${canSearch ? styles.searchBtnActive : ''}`}
            disabled={!canSearch}
          >
            찾기
          </button>
        </div>
      </div>
    </section>
  );
}