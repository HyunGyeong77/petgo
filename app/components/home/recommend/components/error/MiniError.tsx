import styles from './mini-error.module.scss';

export default function MiniError() {
  return (
    <div className={styles.wrap}>
      <strong>상품을 불러오는 과정에서 문제가 발생했습니다. 🚫</strong>
      <p>새로고침 후 다시 시도해 주세요.</p>
    </div>
  );
}