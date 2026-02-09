import styles from './tabs.module.scss';
import React from 'react';

export default function Tabs({labels}: {labels: string[]}) {
  return (
    labels.map((label, index) => (
      <React.Fragment key={label + index}>
        <button className={styles.btn}>{label}</button>
      </React.Fragment>
    ))
  );
}