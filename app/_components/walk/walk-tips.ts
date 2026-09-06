interface WalkTip {
  icon: string;
  bubble: string;
  title: string;
  desc: string;
}

export const WALK_TIPS: WalkTip[] = [
  {
    icon: 'ri-time-line',
    bubble: '매일 같은 시간에 산책해요!',
    title: '하루 2회, 30분씩',
    desc: '아침·저녁으로 규칙적인 산책이 가장 좋아요.',
  },
  {
    icon: 'ri-footprint-line',
    bubble: '서두르지 말고 천천히 가요~',
    title: '천천히 걷기',
    desc: '빠른 운동보다 느긋한 탐색이 스트레스 해소에 효과적이에요.',
  },
  {
    icon: 'ri-sun-line',
    bubble: '오늘 날씨 딱 좋다!',
    title: '날씨 체크 필수',
    desc: '너무 덥거나 추운 날은 짧게, 쾌적한 날엔 길게 산책해요.',
  },
  {
    icon: 'ri-map-pin-line',
    bubble: '새로운 곳도 탐험해봐요!',
    title: '다양한 코스',
    desc: '새로운 냄새와 환경이 두뇌 자극에 도움이 돼요.',
  },
];