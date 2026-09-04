import cardSkeleton from "./assets/card-skeleton.gif";

export default function CardSkeleton() {
  return (
    <div>
      <img src={cardSkeleton.src} alt="로딩 이미지" />
    </div>
  )
}