import styles from './walk-desktop.module.scss';
import Image from 'next/image';
import Stroll from './assets/images/stroll.png';
import Content from './components/content/Content';
import {contents} from '../components/content';
import SpeechLeft from './assets/images/speech-bubble-left.png';
import SpeechRight from './assets/images/speech-bubble-right.png';

export default function WalkDesktop() {
  return (
    <div className={styles.wrap}>
      <Image
        className={styles.bg}
        src={Stroll} 
        alt="background image" 
        width={1618} 
        height={1080} 
      />
      <div id="balloon-a">
        <Content
          image={SpeechLeft}
          recommend={contents.number.recommend} 
          reason={contents.number.reason}
          direction="left"
        />
      </div>
      <div id="balloon-b">
        <Content
          image={SpeechRight}
          recommend={contents.warning.recommend}
          reason={contents.warning.reason}
          direction="right"
        />
      </div>
      <div id="balloon-c">
        <Content
          image={SpeechLeft}
          recommend={contents.time.recommend}
          reason={contents.time.reason}
          direction="left"
        />
      </div>
    </div>
  );
}