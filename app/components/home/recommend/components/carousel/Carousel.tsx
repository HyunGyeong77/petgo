import styles from './carousel.module.scss';
import Tabs from '../tabs/Tabs';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import Slide from '../slide/Slide';
import 'swiper/css';
import {ProductCategory} from '@/types/domain/product-category';
import Arrow from '../svg/Arrow';
import {useRef} from 'react';

export type Props = {
  category: ProductCategory
}

export default function Carousel(props: Props) {
  const subCategory = Object.values(props.category.categories);

  // swiper buttons
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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
        <div ref={prevRef} className={`recommend-prev ${styles.prev}`}><Arrow /></div>
        <Swiper
          className={styles.swiper}
          modules={[Navigation]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={30}
          speed={500}
          breakpoints={{
            600: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4
            }
          }}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current
          }}
          onSlideChangeTransitionStart={(swiper) => {
            swiper.allowSlideNext = false;
            swiper.allowSlidePrev = false;
            swiper.allowTouchMove = false;
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.allowTouchMove = true;
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
        <div ref={nextRef} className={`recommend-next ${styles.next}`}><Arrow /></div>
      </div>
    </div>
  );  
}