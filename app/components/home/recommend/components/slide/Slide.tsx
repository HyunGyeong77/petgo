"use client";

import styles from './slide.module.scss';
import {Product} from '@/types/domain/product';
import SafeLink from '@/components/common/safe-link/SafeLink';
import Image from 'next/image';
import NoImage from '../../assets/images/non-image.png';

type Props = {
  product: Product
}

export default function Slide(props: Props) {
  const {product} = props;

  return (
    <SafeLink>
      <span className={styles.wrap}>
        <Image src={product.image ?? NoImage} alt={product.name} width={126.5} height={126.5} />
        <span className={styles["content-box"]}>
          <b className={styles.name}>{product.name}</b>
          <p className={styles.description}>{product.description}</p>
        </span>
      </span>
    </SafeLink>
  );
}