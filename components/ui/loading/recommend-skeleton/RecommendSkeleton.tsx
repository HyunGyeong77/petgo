import styles from "./recommend-skeleton.module.scss";
import componentLoading from "../_assets/component-loading.gif";

export default function SomeComponent() {
  return (
    <div className={styles.container}>
      <img src={componentLoading.src} />
    </div>
  )
}