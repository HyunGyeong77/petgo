import styles from './preferences.module.scss';
import SectionContent from '@/components/layout/section/content/SectionContent';
import PreferencesLayout from './PreferencesLayout';
import Card from './components/card/Card';
import Link from './components/link/Link';
import Like1 from './assets/images/like1.jpg';
import Like2 from './assets/images/like2.jpg';
import Like3 from './assets/images/like3.jpg';
import Bad1 from './assets/images/bad1.png';
import Bad2 from './assets/images/bad2.png';
import Bad3 from './assets/images/bad3.jpg';

export default function Preferences() {
  return (
    <SectionContent>
      <article className={styles.wrap}>
        <PreferencesLayout title={<>반려견이 <strong>좋아하는 것</strong>을 아시나요 ?</>}>
          <Card
            image={{src: Like1, alt: "보호자와의 교감 이미지"}}
            title="보호자와의 교감" 
            things={["쓰다듬기", "눈 맞추기", "이름 불러주기"]} 
            result="혼자 있는 시간 보다 함께 있는 시간을 더 좋아해요!" 
          />
          <Card
            image={{src: Like2, alt: "규칙적인 산책과 탐색 이미지"}}
            title="규칙적인 산책과 탐색" 
            things={["냄새 맡기", "새로운 길 걷기", "천천히 걷는 산책"]} 
            result="운동보다는 탐색 자체가 스트레스 해소에 도움이 돼요!" 
          />
          <Card
            image={{src: Like3, alt: "칭찬과 보상"}}
            title="칭찬과 보상" 
            things={["긍정적인 말", "간식 보상", "차분한 톤의 목소리"]} 
            result="혼내는 것보다 칭찬이 학습 효과가 더 커요!" 
          />
        </PreferencesLayout>
        <PreferencesLayout title={<>반대로 반려견이 <strong>싫어하는 것</strong>을 아시나요 ?</>}>
          <Card
            image={{src: Bad1, alt: "갑작스러운 큰 소리"}}
            title="갑작스러운 큰 소리" 
            things={["큰 고함 지르기", "갑자기 나는 소음", "청소기, 폭죽 소리"]} 
            result="불안과 공포를 가장 크게 유발해요." 
          />
          <Card
            image={{src: Bad2, alt: "강압적인 행동"}}
            title="강압적인 행동" 
            things={["억지로 안기", "강제로 끌어당기기", "혼내며 위에서 내려다보기"]} 
            result="신뢰가 빠르게 무너져요." 
          />
          <Card
            image={{src: Bad3, alt: "혼자 오래 방치되는 시간"}}
            title="혼자 오래 방치되는 시간" 
            things={["긴 외출", "보호자 부재", "자극 없는 환경"]} 
            result="분리불안 또는 문제 행동의 원인이 될 수 있어요." 
          />
        </PreferencesLayout>
        <Link />
      </article>
    </SectionContent>
  );
}