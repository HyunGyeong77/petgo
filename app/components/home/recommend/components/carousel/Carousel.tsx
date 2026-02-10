import styles from './carousel.module.scss';
import Tabs from '../tabs/Tabs';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import Slide from '../slide/Slide';
import 'swiper/css';
import {ProductCategory} from '@/types/domain/product-category';

export type Props = {
  category: ProductCategory
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
      <div className={styles["swiper-box"]}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          navigation={{
            nextEl: '.recommend-next',
            prevEl: '.recommend-prev'
          }}
          breakpoints={{
            600: {slidesPerView: 2},
            1024: {slidesPerView: 4}
          }}
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
    </div>
  );  
}