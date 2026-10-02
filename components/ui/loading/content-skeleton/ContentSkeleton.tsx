import styles from "./content-skeleton.module.scss";
import componentLoading from "../_assets/content-loading.gif";

export const ContentSkeleton = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <img src={componentLoading.src} />
    </div>
  )
}