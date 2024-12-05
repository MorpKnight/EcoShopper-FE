// import { useParams } from 'react-router-dom';
import ProductTable from '../components/ProductTable/ProductTable';

export default function AlternativePage() {
  //HACK: Temporary data
  //   const { id } = useParams<{ id: string }>();

  return (
    <div className="flex h-screen w-screen flex-col items-center p-4">
      <h1>Alternative Page</h1>
      <ProductTable searchQuery="" />
    </div>
  );
}
