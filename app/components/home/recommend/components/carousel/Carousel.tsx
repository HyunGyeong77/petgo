import styles from './carousel.module.scss';
import Tabs from '../tabs/Tabs';
import {Swiper, SwiperSlide} from 'swiper/react';
import Slide from '../slide/Slide';
import 'swiper/css';
import {ProductCategory} from '@/types/domain/product-category';

export type Props = {
  category: ProductCategory
  loading: boolean
  error: string | null
}

export default function Carousel(props: Props) {
  const subCategory = Object.values(props.category.categories);

  // Tabs 용
  const tabLabels = subCategory.map(sc => sc.label);

  // Slide 용
  const slideProducts = subCategory.map(sc => sc.products);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.label}>{props.category.label}</h2>
      <div className={styles["tabs-box"]}>
        <Tabs labels={tabLabels} />
      </div>
      <Swiper
        className={styles.swiper}
        slidesPerView={1}
        spaceBetween={30}
      >
        {slideProducts.flatMap((productRecord) => (
          Object.values(productRecord).map((product, index) => (
            <SwiperSlide 
              key={product.name + index} 
              className={styles["swiper-slide"]}
            >
              <Slide product={product} />
            </SwiperSlide>
          ))
        ))}
      </Swiper>
    </div>
  );  
}