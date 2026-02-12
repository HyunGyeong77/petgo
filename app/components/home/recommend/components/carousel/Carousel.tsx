import styles from './carousel.module.scss';
import Tabs from '../tabs/Tabs';
import {Swiper, SwiperSlide, SwiperRef} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import Slide from '../slide/Slide';
import 'swiper/css';
import {ProductCategory} from '@/types/domain/product-category';
import Arrow from '../svg/Arrow';
import {useRef, useState, useId} from 'react';

export type Props = {
  category: ProductCategory
}

export default function Carousel(props: Props) {
  const subCategory = Object.values(props.category.categories);

  // swiper
  const swiperRef = useRef<SwiperRef>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Tabs 
  const tabLabels = subCategory.map(sc => sc.label);
  const tabLength = tabLabels.length;
  const [slideIndex, setSlideIndex] = useState(0);
  const [tabcoolTime, setTabCoolTime] = useState(false);

  // Tabs Handler
  const changePage = (curIndex: number) => {
    if(tabcoolTime) return;

    const curPage = tabLength * curIndex;
    swiperRef.current?.swiper.slideToLoop(curPage);
    setSlideIndex(curIndex);
  }

  // Slide
  const slideProducts = subCategory.map(sc => sc.products);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.label}>{props.category.label}</h2>
      <div className={styles["tabs-box"]}>
        <Tabs 
          labels={tabLabels} 
          slideIndex={slideIndex}
          changePage={changePage}
        />
      </div>
      <div className={styles["swiper-box"]}>
        <div ref={prevRef} className={`${styles.prev} prev-${id}`}><Arrow /></div>
        <Swiper
          ref={swiperRef}
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
            prevEl: `.prev-${id}`,
            nextEl: `.next-${id}`
          }}
          onSlideChangeTransitionStart={(swiper) => {
            swiper.allowSlideNext = false;
            swiper.allowSlidePrev = false;
            swiper.allowTouchMove = false;
            setTabCoolTime(true);
          }}
          onSlideChangeTransitionEnd={(swiper) => {
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.allowTouchMove = true;
            setTabCoolTime(false);
          }}
          onSlideChange={(swiper) => {
            const curPage = swiper.realIndex / tabLength;
            setSlideIndex(Math.floor(curPage));
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
        <div ref={nextRef} className={`${styles.next} next-${id}`}><Arrow /></div>
      </div>
    </div>
  );  
}