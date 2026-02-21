"use client";

import styles from './hospital.module.scss';
import RegionButton from './components/region-button/RegionButton';
import {useState, useRef, useEffect} from 'react';
import {toast, Id, TypeOptions} from 'react-toastify';
import {Region} from '@/types/api/region';
import {useSido, useSigungu, useEupmyeon, useRi} from './hooks/useRegion';

export default function Hospital() {
  const [openMenu, setOpenMenu] = useState<null | string>(null);

  // Region Select Value
  const [selectedSido, setSelectedSido] = useState<Region>();
  const [selectedSigungu, setSelectedSigungu] = useState<Region>();
  const [selectedEupmyeon, setSelectedEupmyeon] = useState<Region>();
  const [selectedRi, setSelectedRi] = useState<Region>();
  
  // RegionButton component data value
  const {data: sidoList, isLoading, isError} = useSido();
  const sidoToast = useRef<Id>(null);
  const sidoFirstLoad = useRef<boolean>(true);

  const {data: sigunguList} = useSigungu(selectedSido?.code as string);
  const {data: eupmyeonList} = useEupmyeon(selectedSigungu?.code as string);
  const {data: riList} = useRi(selectedEupmyeon?.code as string);

  // search button
  const [search, setSearch] = useState<boolean>(false);

  // sidoToast 로딩 및 에러 알림 (1회성)
  useEffect(() => {
    if(!sidoToast.current) return;

    const toastUpdate = (render: string, type: TypeOptions) => {
      if(!sidoToast.current) return;

      return toast.update(sidoToast.current, {
        render, type, isLoading: false, autoClose: 2000
      })
    }

    if(isError) toastUpdate("지역 불러오기 실패", "error");
    if(!isLoading) toastUpdate("지역 불러오기 성공", "success");

    sidoFirstLoad.current = false;
  }, [isLoading, isError]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  }

  // RegionButton Handler
  const toggleSido = () => {
    if(sidoFirstLoad && isLoading) {
      sidoToast.current = toast.loading("지역을 불러오는 중입니다...");
      return;
    }

    toggleMenu("sido");
  }

  const toggleSigungu = () => toggleMenu("sigungu");
  const toggleEupmyeon = () => toggleMenu("eupmyeon");
  const toggleRi = () => toggleMenu("ri");

  // RegionList Handler
  const selectRegion = (code: Region) => {
    if(openMenu === "sido") {
      if(selectedSido) {
        setSelectedSigungu(undefined);
        setSelectedEupmyeon(undefined);
        setSelectedRi(undefined);
      }

      setSelectedSido(code);
      setSearch(true);
    } else if(openMenu === "sigungu") {
      if(selectedSigungu) {
        setSelectedEupmyeon(undefined);
        setSelectedRi(undefined);
      }

      setSelectedSigungu(code);
    } else if(openMenu === "eupmyeon") {
      if(selectedEupmyeon) {
        setSelectedRi(undefined);
      }

      setSelectedEupmyeon(code);
    } else if(openMenu === "ri") {
      setSelectedRi(code);
    }

    setOpenMenu(null);
  }

  return (
    <article className={styles.wrap}>
      <section className={styles.layout}>
        <h2 className={styles.label}>내 지역 근처 병원을 알아보세요!</h2>
        <div className={styles["regions-search-box"]}>
          <div className={styles["regions-box"]}>
            <RegionButton
              config={{label: !selectedSido ? "시/도" : selectedSido.name, disabled: false}}
              data={{regionList: sidoList}}
              actions={{labelClick: toggleSido, selectRegion: selectRegion}}
              state={{openMenu: openMenu === "sido", setOpenMenu: setOpenMenu}}
            />
            <RegionButton
              config={{
                label: !selectedSigungu ? "시/군/구" : selectedSigungu.name, 
                disabled: (!selectedSido || !sigunguList?.length)
              }}
              data={{regionList: sigunguList}}
              actions={{labelClick: toggleSigungu, selectRegion: selectRegion}}
              state={{openMenu: openMenu === "sigungu", setOpenMenu: setOpenMenu}}
            />
            <RegionButton
              config={{
                label: !selectedEupmyeon ? "읍/면/동" : selectedEupmyeon.name, 
                disabled: (!selectedSigungu || !eupmyeonList?.length)
              }}
              data={{regionList: eupmyeonList}}
              actions={{labelClick: toggleEupmyeon, selectRegion: selectRegion}}
              state={{openMenu: openMenu === "eupmyeon", setOpenMenu: setOpenMenu}}
            />
            <RegionButton
              config={{
                label: !selectedRi ? "리" : selectedRi.name, 
                disabled: (!selectedEupmyeon || !riList?.length)
              }}
              data={{regionList: riList}}
              actions={{labelClick: toggleRi, selectRegion: selectRegion}}
              state={{openMenu: openMenu === "ri", setOpenMenu: setOpenMenu}}
            />
          </div>
          <button className={`${styles.search} ${!search && styles.disabled}`}>찾기</button>
        </div>
      </section>
    </article>
  );
}