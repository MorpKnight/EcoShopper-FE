import { useParams } from 'react-router-dom';

export default function AlternativePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>Alternative Page</h1>
      <p>In Progress</p>
      <p>{id}</p>
    </div>
  );
}
