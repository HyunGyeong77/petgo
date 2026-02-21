import styles from './region-list.module.scss';
import {Region} from '@/types/api/region';

type Props = {
  regionList: Region[] | undefined
  selectRegion: (code: Region) => void
}

export default function RegionList(props: Props) {
  const {regionList, selectRegion} = props;
  if(!regionList) return;
  
  return (
    <div className={`${styles.wrap} ${!regionList.length && styles.hidden}`}>
      <ul className={styles["regions-box"]}>
        {Object.values(regionList).map((region, index) => (
          <li key={region.code + index}>
            <button 
              className={styles["region-button"]} 
              data-code={region.code}
              onClick={() => selectRegion(region)}
            >{region.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}