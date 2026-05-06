"use client";

import React, { useState } from 'react';
import { Sun, Cloud, Droplets, Snowflake, CheckCircle } from 'lucide-react';
import styles from './walking-weather-tips.module.scss';
import ScrollReveal from '@/components/ui/scroll-reveal/ScrollReveal';

const weatherTips = [
  // ... (rest of weatherTips unchanged)
  {
    icon: <Sun />,
    weather: '맑은 날',
    colorClass: styles.sunny,
    tips: [
      '이른 아침이나 저녁에 산책하세요',
      '물을 충분히 준비하세요',
      '아스팔트 온도를 확인하세요 (손등으로 5초 테스트)',
      '그늘진 곳에서 자주 쉬어가세요',
    ],
  },
  {
    icon: <Cloud />,
    weather: '흐린 날',
    colorClass: styles.cloudy,
    tips: [
      '산책하기 가장 좋은 날씨입니다',
      '평소보다 조금 더 긴 산책을 즐기세요',
      '갑작스러운 비에 대비해 우비를 준비하세요',
      '공원이나 들판 산책이 좋습니다',
    ],
  },
  {
    icon: <Droplets />,
    weather: '비 오는 날',
    colorClass: styles.rainy,
    tips: [
      '강아지 우비와 신발을 착용하세요',
      '짧게 배변만 하고 돌아오세요',
      '귀에 물이 들어가지 않도록 주의하세요',
      '산책 후 발과 몸을 완전히 말리세요',
    ],
  },
  {
    icon: <Snowflake />,
    weather: '추운 날',
    colorClass: styles.snowy,
    tips: [
      '소형견은 옷을 입히세요',
      '눈길에는 발 보호 크림을 바르세요',
      '산책 시간을 평소보다 줄이세요',
      '따뜻한 실내에서 놀이로 보완하세요',
    ],
  },
];

const WalkingWeatherTips = () => {
  const [selectedWeather, setSelectedWeather] = useState(0);

  return (
    <section id="walking-weather-tips" className={styles.learningSection}>
      <div className={styles.sectionContainer}>
        <ScrollReveal>
          <h2 className={styles.sectionTitle}>날씨별 산책 팁</h2>
          <p className={styles.cardSubtitle}>오늘 날씨에 맞는 산책 방법을 확인하세요</p>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className={styles.weatherTabList}>
            {weatherTips.map((weather, index) => (
              <button
                key={weather.weather}
                onClick={() => setSelectedWeather(index)}
                className={`${styles.weatherTab} ${weather.colorClass} ${
                  selectedWeather === index ? styles.weatherTabActive : ''
                }`}
              >
                <span className={styles.weatherIcon}>{weather.icon}</span>
                <span className={styles.weatherTabLabel}>{weather.weather}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div className={styles.weatherContent}>
            <div className={styles.weatherContentHeader}>
              <span className={`${styles.weatherIconWrapper} ${weatherTips[selectedWeather].colorClass}`}>
                {weatherTips[selectedWeather].icon}
              </span>
              <h3 className={styles.weatherContentTitle}>
                {weatherTips[selectedWeather].weather} 산책 팁
              </h3>
            </div>
            <ul className={styles.weatherTipList}>
              {weatherTips[selectedWeather].tips.map((tip) => (
                <li key={tip} className={styles.weatherTipItem}>
                  <CheckCircle
                    className={`${styles.weatherCheckIcon} ${weatherTips[selectedWeather].colorClass}`}
                  />
                  <span className={styles.weatherTipText}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WalkingWeatherTips;
