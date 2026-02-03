import styles from './walk-mobile.module.scss';
import {contents} from '../components/content';
import Content from './content/Content';

export default function WalkMobile() {
  return (
    <div className={styles.wrap}>
      <Content recommend={contents.number.recommend} reason={contents.number.reason} />
      <Content recommend={contents.time.recommend} reason={contents.time.reason} />
      <Content recommend={contents.warning.recommend} reason={contents.warning.reason} />
    </div>
  );
}