export default function Content({recommend, reason}: {recommend: string, reason: string}) {
  return (
    <div>
      <p>{recommend}</p>
      <span>{reason}</span>
    </div>
  );
}