import styles from './hospital-region.module.scss';
import { Regions, sido } from '../Hospital';
import { useState, useEffect, useRef } from 'react';

interface Props {
  region: string
  regions: Regions[] | null
  parent?: boolean
  onClick: (region: Regions) => void
  isSido?: boolean
}

export default function HospitalRegion(props: Props) {
  const { region, regions, onClick, parent, isSido } = props;
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const isCity = isSido !== undefined;
  const selectRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(!menuActive) return;

    const clickHanlder = (e: MouseEvent) => {
      if(selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setMenuActive(false);
      }
    };

    window.addEventListener("click", clickHanlder);
    return () => window.removeEventListener("click", clickHanlder);
  }, [menuActive]);

  return (
    <div className={styles.selectWrapper}>
      <ul>
        <li className={`${isCity ? styles.city : styles.notCity}`}>
          <button ref={selectRef}
            className={`${styles.select} ${parent ? styles.selectActive : styles.selectDisabled}`}
            onClick={() => setMenuActive(prev => !prev)}
            disabled={parent === false}
          >
            {region}
            <i className={`ri-arrow-down-s-line ${styles.selectIcon}`} />
          </button>
        </li>
        <ul className={`${styles.menu} ${menuActive && styles.menuActive}`}>
          {regions?.map((r) => (
            <li key={r.code}>
              <button className={styles.menuButton}
                onClick={() => {
                  onClick(r);
                  setMenuActive(false);
              }}>{r.name}</button>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
}