import { PreferenceCard } from "@/features/preference/types/preference.types";
import Like1Img from './assets/like1.webp';
import Like2Img from './assets/like2.webp';
import Like3Img from './assets/like3.webp';
import Bad1Img from './assets/bad1.webp';
import Bad2Img from './assets/bad2.webp';
import Bad3Img from './assets/bad3.webp';

export const LIKES: PreferenceCard[] = [
  {
    img: Like1Img.src,
    alt: '보호자와의 교감 이미지',
    title: '보호자와의 교감',
    items: ['쓰다듬기', '눈 맞추기', '이름 불러주기'],
    note: '혼자 있는 시간 보다 함께 있는 시간을 더 좋아해요!',
  },
  {
    img: Like2Img.src,
    alt: '규칙적인 산책과 탐색 이미지',
    title: '규칙적인 산책과 탐색',
    items: ['냄새 맡기', '새로운 길 걷기', '천천히 걷는 산책'],
    note: '운동보다는 탐색 자체가 스트레스 해소에 도움이 돼요!',
  },
  {
    img: Like3Img.src,
    alt: '칭찬과 보상',
    title: '칭찬과 보상',
    items: ['긍정적인 말', '간식 보상', '차분한 톤의 목소리'],
    note: '혼내는 것보다 칭찬이 학습 효과가 더 커요!',
  },
];

export const DISLIKES: PreferenceCard[] = [
  {
    img: Bad1Img.src,
    alt: '갑작스러운 큰 소리',
    title: '갑작스러운 큰 소리',
    items: ['큰 고함 지르기', '갑자기 나는 소음', '청소기, 폭죽 소리'],
    note: '불안과 공포를 가장 크게 유발해요.',
  },
  {
    img: Bad2Img.src,
    alt: '강압적인 행동',
    title: '강압적인 행동',
    items: ['억지로 안기', '강제로 끌어당기기', '혼내며 위에서 내려다보기'],
    note: '신뢰가 빠르게 무너져요.',
  },
  {
    img: Bad3Img.src,
    alt: '혼자 오래 방치되는 시간',
    title: '혼자 오래 방치되는 시간',
    items: ['긴 외출', '보호자 부재', '자극 없는 환경'],
    note: '분리불안 또는 문제 행동의 원인이 될 수 있어요.',
  },
];