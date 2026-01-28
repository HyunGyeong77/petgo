import styles from './logo.module.scss';
import SafeLink from "../safe-link/SafeLink";
import Image from 'next/image';

export default function Logo({width, height}: {width: number, height: number}) {
  return (
    <SafeLink>
      <Image className={styles.logo} src="/common/logo.png" alt="logo image" width={width} height={height} />
    </SafeLink>
  );
}