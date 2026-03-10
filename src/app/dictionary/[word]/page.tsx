export default function WordPage({ params }: { params: { word: string } }) {
  return <div>{params.word}</div>;
}
