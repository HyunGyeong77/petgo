import cardSkeleton from "./_assets/card-skeleton.gif";

export default function CardSkeleton({ width = '100%'}: { width?: string }) {
  return (
    <img src={cardSkeleton.src} alt="로딩 이미지" style={{width}} />
  )
}