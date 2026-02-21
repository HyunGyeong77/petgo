import styles from './region-button.module.scss';
import {Region} from '@/types/api/region';
import ArrowIcon from '@/app/components/home/hospital/assets/icons/arrow.svg';
import Image from 'next/image';
import RegionList from '../region-list/RegionList';
import {useEffect, useRef, Dispatch, SetStateAction} from 'react';

type Props = {
  config: {label: string, disabled: boolean}
  data: {regionList: Region[] | undefined}
  actions: {labelClick: () => void, selectRegion: (code: Region) => void}
  state: {openMenu: boolean, setOpenMenu: Dispatch<SetStateAction<string | null>>}
}

export default function RegionButton(props: Props) {
  const {config, data, actions, state} = props;

  const {label, disabled} = config;
  const {regionList} = data;
  const {labelClick, selectRegion} = actions;
  const {openMenu, setOpenMenu} = state

  const wrapperRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if(!openMenu) return;
    
    // 메뉴가 활성화 되었을 때 해당 버튼과 메뉴를 제외한 곳 클릭 시 메뉴 비활성화
    const closeList = (e: MouseEvent) => {
      if(!wrapperRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", closeList);
    return () => document.removeEventListener("mousedown", closeList);
  }, [openMenu]);

  return (
    <ul ref={wrapperRef} className={styles.wrap}>
      <li>
        <button
          className={
            `${styles["label-button"]} ${disabled && styles.disabled}`
          } 
          onClick={labelClick}
        >
          <p className={styles.content}>
            {label} 
            <span className={styles["icon-box"]}>
              <Image
                className={`${openMenu && styles.on}`}
                src={ArrowIcon} alt="arrow icon" width={19} height={19} />
            </span>
          </p>
        </button>
        {openMenu && 
          <RegionList regionList={regionList} selectRegion={selectRegion} />
        }
      </li>
    </ul>
  );
}