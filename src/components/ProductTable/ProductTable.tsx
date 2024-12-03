import { useState } from 'react';
import ProductRow from './ProductRow';
import ProductFooter from './ProductFooter';

interface Product {
  id: number;
  name: string;
  rating: string;
  image: string;
}

export default function ProductTable({
  products,
  //   loading,
  //   error,
}: {
  products: Product[];
  //   loading: boolean;
  //   error: string;
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  return (
    // TODO: Fix border paling atas 2 pixel wide
    <div className="flex w-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-[1rem] border border-text-tertiary bg-tertiary-light">
      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product.name}
          rating={product.rating}
          imagesource={product.image}
        />
      ))}
      <ProductFooter
        page={page}
        rowsPerPage={rowsPerPage}
        totalProducts={products.length}
        setPage={setPage}
      />
    </div>
  );
}
