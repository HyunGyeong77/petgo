"use client";

import styles from './loading.module.scss';
import Image from 'next/image';
import LoadingImg from '../../assets/gif/loading.gif';
import {useEffect, useState} from 'react';

export default function Loading() {
  const [waitingTime, setWaitingTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingTime((prev) => prev += 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles["text-box"]}>
        <strong>상품을 불러오는 중입니다</strong>
        <p>잠시만 기다려 주세요</p>
      </div>
      <div className={styles["img-box"]}>
        <Image src={LoadingImg} alt="loading image" fill />
      </div>
      <span>{`첫 방문 또는 장시간 이용 후\n 새로고침 시 많이 지연될 수 있습니다 😭\n (예상 시간 30 ~ 60s)`}</span>
      <span>기다린 시간 : {waitingTime}초</span>
    </div>
  );
}