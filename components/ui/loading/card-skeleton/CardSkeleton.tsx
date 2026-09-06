import cardLoading from "../_assets/card-loading.gif";

export default function CardSkeleton({ width = '100%'}: { width?: string }) {
  return (
    <img src={cardLoading.src} alt="로딩 이미지" style={{width}} />
  )
}