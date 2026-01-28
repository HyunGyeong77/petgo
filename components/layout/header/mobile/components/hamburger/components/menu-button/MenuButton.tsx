import styles from './menu-button.module.scss';
import Image from 'next/image';
import Hamburger from '../../assets/hamburger-menu.svg';

export default function MenuButton({onClick}: {onClick: (bool: boolean) => void}) {
  return (
    <button className={styles["hamburger-btn"]} onClick={() => onClick(true)}>
      <Image src={Hamburger} alt="hamburger menu" width={25} height={25} />
    </button>
  );
}