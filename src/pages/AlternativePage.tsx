// import { useParams } from 'react-router-dom';
import ProductTable from '../components/ProductTable/ProductTable';

export default function AlternativePage() {
  //HACK: Temporary data
  //   const { id } = useParams<{ id: string }>();

  return (
    <div className="flex h-screen w-screen flex-col items-center p-4">
      <h1 className="mb-4 font-inter text-2xl font-bold text-secondary-700 drop-shadow fixed top-16">
        Alternative Page
      </h1>
      <ProductTable searchQuery="" />
    </div>
  );
}
