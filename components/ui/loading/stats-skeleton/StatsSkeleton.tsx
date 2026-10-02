import styles from "./stats-skeleton.module.scss";
import StatsLoading from "../_assets/stats-loading.gif";

export const StatsSkeleton = ({ width = "100px" }: { width?: string }): React.ReactNode => {
  return (
    <div className={styles.container}>
      <img src={StatsLoading.src} width={width} />
    </div>
  )
}