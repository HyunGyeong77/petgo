export type WalkingCourse = {
  id: number;
  name: string;
  distance: string;
  duration: string;
  difficulty: '쉬움' | '보통' | '어려움';
  features: string[];
  description: string;
};

export type WeatherTip = {
  weather: string;
  tips: string[];
};

export type TimingGuide = {
  size: string;
  duration: string;
  frequency: string;
  distance: string;
  notes: string;
};

export type SafetyTip = {
  title: string;
  description: string;
  icon: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export const walkingCourses: WalkingCourse[] = [
  {
    id: 1,
    name: '공원 산책로',
    distance: '1.2km',
    duration: '20분',
    difficulty: '쉬움',
    features: ['잔디밭', '벤치', '음수대'],
    description: '평평한 길로 초보자와 소형견에게 적합합니다.',
  },
  {
    id: 2,
    name: '강변 둘레길',
    distance: '2.5km',
    duration: '35분',
    difficulty: '보통',
    features: ['그늘', '운동기구', '화장실'],
    description: '경치가 좋고 중형견 산책에 적합합니다.',
  },
  {
    id: 3,
    name: '산책로 코스',
    distance: '3.8km',
    duration: '50분',
    difficulty: '어려움',
    features: ['경사로', '계단', '전망대'],
    description: '활동적인 대형견을 위한 긴 산책 코스입니다.',
  },
];

export const timingGuide: TimingGuide[] = [
  {
    size: '소형견 (5kg 이하)',
    duration: '15-20분',
    frequency: '하루 2-3회',
    distance: '0.5-1km',
    notes: '짧고 자주 산책하는 것이 좋습니다',
  },
  {
    size: '중형견 (5-20kg)',
    duration: '30-40분',
    frequency: '하루 2회',
    distance: '2-3km',
    notes: '안정적인 페이스로 걷기를 유지하세요',
  },
  {
    size: '대형견 (20kg 이상)',
    duration: '45-60분',
    frequency: '하루 2회',
    distance: '3-5km',
    notes: '충분한 운동량이 필요합니다',
  },
];

export const safetyTips: SafetyTip[] = [
  {
    title: '목줄 안전',
    description: '목줄은 항상 짧게 유지하고, 다른 개나 사람을 만나면 더 짧게 잡으세요.',
    icon: '🦮',
  },
  {
    title: '교통 안전',
    description: '도로를 건널 때는 반드시 멈춰서 좌우를 확인하고, 신호등을 지키세요.',
    icon: '🚦',
  },
  {
    title: '음식 주의',
    description: '바닥에 떨어진 음식이나 이물질을 먹지 않도록 주의하세요.',
    icon: '🍖',
  },
  {
    title: '다른 개와의 만남',
    description: '상대 보호자에게 먼저 허락을 구하고, 강아지가 스트레스 받지 않는지 확인하세요.',
    icon: '🐕',
  },
  {
    title: '더위 주의',
    description: '헥헥거리거나 침을 많이 흘리면 그늘에서 쉬고 물을 주세요.',
    icon: '🌡️',
  },
  {
    title: '발바닥 체크',
    description: '아스팔트가 뜨거울 때는 산책을 피하고, 산책 후 발바닥을 확인하세요.',
    icon: '🐾',
  },
];

export const faqData: FaqItem[] = [
  {
    q: '산책은 하루에 몇 번이 좋나요?',
    a: '일반적으로 하루 2회가 적당합니다. 아침과 저녁에 규칙적으로 산책하면 강아지의 생체리듬이 안정되고, 배변 습관도 좋아집니다. 소형견은 3회로 나눠서 짧게 산책해도 좋습니다.',
  },
  {
    q: '산책 중에 다른 개를 만나면 어떻게 해야 하나요?',
    a: '먼저 상대 보호자에게 우리 강아지가 친화적인지 물어보고, 상대방도 괜찮다면 천천히 접근하게 하세요. 둘 중 하나라도 불안해하거나 공격적이면 거리를 두고 지나가세요. 목줄을 당기면 강아지가 더 예민해질 수 있으니 주의하세요.',
  },
  {
    q: '산책 전후로 밥을 주는 것이 좋나요?',
    a: '산책 직후보다는 30분~1시간 후에 밥을 주는 것이 좋습니다. 운동 직후 바로 먹으면 위염전(bloat) 위험이 있습니다. 산책 전에는 가벼운 간식 정도만 주세요.',
  },
  {
    q: '비가 와도 산책을 해야 하나요?',
    a: '가이버운 비라면 우비를 입히고 짧게 배변만 시키고 돌아와도 됩니다. 폭우나 천둥번개가 치면 실내에서 놀이로 대체하세요. 산책 후에는 반드시 발과 몸을 깨끗이 닦고 말려주세요.',
  },
  {
    q: '산책 중 갑자기 멈춰서 움직이지 않아요.',
    a: '처음 가는 곳이라 두려워하거나, 피곤하거나, 발바닥이 아플 수 있습니다. 억지로 끌지 말고, 간식으로 유도하거나 잠시 쉬어가세요. 자주 멈춘다면 발바닥 상태를 확인하고 수의사와 상담하세요.',
  },
];
