import styles from './section-link-button.module.scss';
import SafeLink from "../safe-link/SafeLink";
import {useState} from 'react';

export default function SectionLinkButton({content}: {content: React.ReactNode}) {
  const [isEnter, setIsEnter] = useState(false);

  const mouseEnter = (bool: boolean) => {
    setIsEnter(bool);
  }

  return (
    <SafeLink>
      <p
        className={styles.wrap} 
        onMouseEnter={() => mouseEnter(true)}
        onMouseLeave={() => mouseEnter(false)}>{!isEnter ? content : "가볼까요?"}</p>
    </SafeLink>
  );
}