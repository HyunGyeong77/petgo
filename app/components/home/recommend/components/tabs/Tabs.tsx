import styles from './tabs.module.scss';
import React from 'react';

type Props = {
  labels: string[]
  slideIndex: number,
  changePage: (curIndex: number) => void
}

export default function Tabs(props: Props) {
  const {labels, slideIndex, changePage} = props;

  return (
    labels.map((label, index) => (
      <React.Fragment key={label + index}>
        <button 
          className={`${styles.btn} ${slideIndex === index && styles.select}`}
          onClick={() => changePage(index)}
        >
          {label}
        </button>
      </React.Fragment>
    ))
  );
}