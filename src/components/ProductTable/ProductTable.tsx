// import { useEffect, useState } from 'react';
// import ProductRow from './ProductRow';
// import ProductFooter from './ProductFooter';

// interface Product {
//   id: number;
//   name: string;
//   rating: string;
//   image: string;
// }

// export default function ProductTable({
//   products,
//   //   loading,
//   //   error,
// }: {
//   products: Product[];
//   //   loading: boolean;
//   //   error: string;
// }) {
//   const [page, setPage] = useState(1);
//   const [loadedProducts, setLoadedProducts] = useState<Product[]>([]);
//   const rowsPerPage = 5;

//   useEffect(() => {

//   })

//   return (
//     // TODO: Fix border paling atas 2 pixel wide
//     <div className="flex w-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-[1rem] border border-text-tertiary bg-tertiary-light">
//       {products.map((product) => (
//         <ProductRow
//           key={product.id}
//           product={product.name}
//           rating={product.rating}
//           imagesource={product.image}
//         />
//       ))}
//       <ProductFooter
//         page={page}
//         rowsPerPage={rowsPerPage}
//         totalProducts={products.length}
//         setPage={setPage}
//       />
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import ProductRow from './ProductRow';
import ProductFooter from './ProductFooter';
import { getProducts, Product } from '../../handler/goods.handler';

export default function ProductTable({ searchQuery }: { searchQuery: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([
            {
              id: '1',
              product_name: 'Sample Product 1',
              product_description: 'This is a sample product description.',
              product_category: 'Sample Category',
              product_price: 10,
              product_image: 'https://via.placeholder.com/64',
              product_sustainability_rating: 5,
              product_producer_id: '1',
              product_type: 'non-food',
              is_organic: false,
              created_at: new Date().toISOString(),
            },
            {
              id: '1',
              product_name: 'Sample Product 2',
              product_description: 'This is a sample product description.',
              product_category: 'Sample Category',
              product_price: 10,
              product_image: 'https://via.placeholder.com/64',
              product_sustainability_rating: 5,
              product_producer_id: '1',
              product_type: 'non-food',
              is_organic: false,
              created_at: new Date().toISOString(),
            },
            {
              id: '1',
              product_name: 'Sample Product 3',
              product_description: 'This is a sample product description.',
              product_category: 'Sample Category',
              product_price: 10,
              product_image: 'https://via.placeholder.com/64',
              product_sustainability_rating: 5,
              product_producer_id: '1',
              product_type: 'non-food',
              is_organic: false,
              created_at: new Date().toISOString(),
            },
            {
              id: '1',
              product_name: 'Sample Product 4',
              product_description: 'This is a sample product description.',
              product_category: 'Sample Category',
              product_price: 10,
              product_image: 'https://via.placeholder.com/64',
              product_sustainability_rating: 5,
              product_producer_id: '1',
              product_type: 'non-food',
              is_organic: false,
              created_at: new Date().toISOString(),
            },
            {
              id: '1',
              product_name: 'Sample Product 5',
              product_description: 'This is a sample product description.',
              product_category: 'Sample Category',
              product_price: 10,
              product_image: 'https://via.placeholder.com/64',
              product_sustainability_rating: 5,
              product_producer_id: '1',
              product_type: 'non-food',
              is_organic: false,
              created_at: new Date().toISOString(),
            },
            {
              id: '2',
              product_name: 'Sample Product 6',
              product_description:
                'This is another sample product description.',
              product_category: 'Sample Category',
              product_price: 20,
              product_image: 'https://via.placeholder.com/64',
              product_sustainability_rating: 4,
              product_producer_id: '2',
              product_type: 'food',
              is_organic: true,
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-[1rem] border border-text-tertiary bg-tertiary-light">
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <ProductRow
            key={product.id}
            product={product.product_name}
            rating={product.product_sustainability_rating.toString()}
            imagesource={product.product_image}
          />
        ))
      ) : (
        <p className="text-text-secondary">No products found</p>
      )}
      <ProductFooter
        page={page}
        rowsPerPage={rowsPerPage}
        totalProducts={filteredProducts.length}
        setPage={setPage}
      />
    </div>
  );
}
