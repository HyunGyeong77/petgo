import styles from './preferencesLayout.module.scss';

type Props = {
  title: React.ReactNode,
  children: React.ReactNode
}

export default function PreferencesLayout(props: Props) {
  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles["cards-box"]}>{props.children}</div>
    </section>
  );
}