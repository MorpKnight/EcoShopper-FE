import { useEffect, useState } from 'react';
import ProductRow from './ProductRow';
import ProductFooter from './ProductFooter';
// import { getProducts, Product } from '../../handler/goods.handler';
import { Product } from '../../handler/goods.handler';

// HACK: Temporary data

export default function ProductTable({ searchQuery }: { searchQuery: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const tempProducts = [
    {
      id: '00d1b5fb-a7bf-4ecf-9ccb-8f3e394934cd',
      product_name: 'Mie Nongshim Shin Ramyun',
      product_description:
        'A bold and spicy instant noodle soup that is loved by spice enthusiasts worldwide.',
      product_category: 'snacks',
      product_price: '3.75',
      product_image: 'http://cdn.digilabdte.com/u/Wd3rV1.jpg',
      product_sustainability_rating: '4.5',
      product_producer_id: 'b01f6108-75c9-451c-a167-383c7fc5cd4a',
      product_type: 'food',
      is_organic: false,
      food_subcategory: 'noodles_pasta',
      created_at: '2024-12-05T07:07:31.496Z',
    },
    {
      id: 'ab49891b-5327-4d1e-b5f3-c91052a223f3',
      product_name: 'Indomie Kuah Soto',
      product_description:
        'A warm and savory noodle soup with a rich soto flavor, perfect for a cozy meal.',
      product_category: 'snacks',
      product_price: '2.75',
      product_image: 'http://cdn.digilabdte.com/u/10RPLEcoShopper.jpg',
      product_sustainability_rating: '3.9',
      product_producer_id: 'b01f6108-75c9-451c-a167-383c7fc5cd4a',
      product_type: 'food',
      is_organic: false,
      food_subcategory: 'noodles_pasta',
      created_at: '2024-12-05T07:34:37.800Z',
    },
    {
      id: '870abd96-da32-49c5-8620-f5ce3648aec7',
      product_name: 'Mie Indomie Mi Goreng',
      product_description:
        'A classic and iconic fried noodle that combines a unique blend of spices for a delicious taste.',
      product_category: 'snacks',
      product_price: '2.50',
      product_image: 'http://cdn.digilabdte.com/u/gErMsD.jpg',
      product_sustainability_rating: '3.5',
      product_producer_id: 'b01f6108-75c9-451c-a167-383c7fc5cd4a',
      product_type: 'food',
      is_organic: false,
      food_subcategory: 'noodles_pasta',
      created_at: '2024-12-05T07:07:31.496Z',
    },
    {
      id: '293e0c86-5d90-441b-875f-ce0a20c9ed02',
      product_name: 'Mie Maggi 2-Minute Noodles',
      product_description:
        'Quick and easy to prepare, Maggi noodles are a go-to for a simple yet tasty meal.',
      product_category: 'snacks',
      product_price: '2.75',
      product_image: 'http://cdn.digilabdte.com/u/7RPLEcoShopper.jpg',
      product_sustainability_rating: '3.2',
      product_producer_id: 'b01f6108-75c9-451c-a167-383c7fc5cd4a',
      product_type: 'food',
      is_organic: false,
      food_subcategory: 'noodles_pasta',
      created_at: '2024-12-05T07:34:37.800Z',
    },
    {
      id: '76cb5716-0198-436e-a555-d910a6d39e77',
      product_name: 'Cup Noodles Beef Flavor',
      product_description:
        'Convenient and flavorful, this beef-flavored cup noodle is perfect for a quick meal on the go.',
      product_category: 'snacks',
      product_price: '3.00',
      product_image: 'http://cdn.digilabdte.com/u/9RPLEcoShopper.jpeg',
      product_sustainability_rating: '2.8',
      product_producer_id: 'b01f6108-75c9-451c-a167-383c7fc5cd4a',
      product_type: 'food',
      is_organic: false,
      food_subcategory: 'noodles_pasta',
      created_at: '2024-12-05T07:34:37.800Z',
    },
    {
      id: '0a7ff041-f0a3-4010-9e11-655637e009e9',
      product_name: 'Mie Samyang Hot Chicken Ramen',
      product_description:
        'Known for its extreme spiciness, this noodle is a challenge and a treat for spice lovers.',
      product_category: 'snacks',
      product_price: '3.25',
      product_image: 'http://cdn.digilabdte.com/u/5RPLEcoShopper.jpg',
      product_sustainability_rating: '3.0',
      product_producer_id: 'b01f6108-75c9-451c-a167-383c7fc5cd4a',
      product_type: 'food',
      is_organic: false,
      food_subcategory: 'noodles_pasta',
      created_at: '2024-12-05T07:34:37.800Z',
    },
  ];

  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const data = await getProducts();
    //     // if (Array.isArray(data) && data.length > 0) {
    //     if (Array.isArray(data) && data.length > 0) {
    //       setProducts(data);
    //     } else {
    //       setProducts(
    //         tempProducts.map((product) => ({
    //           id: product.id,
    //           product_name: product.product_name,
    //           product_description: product.product_description,
    //           product_category: product.product_category,
    //           product_price: parseFloat(product.product_price),
    //           product_image: product.product_image,
    //           product_sustainability_rating: parseFloat(
    //             product.product_sustainability_rating,
    //           ),
    //           product_producer_id: product.product_producer_id,
    //           product_type: product.product_type as 'food' | 'non-food',
    //           is_organic: product.is_organic,
    //           food_subcategory: product.food_subcategory,
    //           created_at: product.created_at,
    //         })),
    //       );
    //     }
    //   } catch (error) {
    //     console.error('Failed to fetch products:', error);
    //     setProducts([]);
    //   }
    // };
    // fetchProducts();

    setProducts(
      tempProducts.map((product) => ({
        id: product.id,
        product_name: product.product_name,
        product_description: product.product_description,
        product_category: product.product_category,
        product_price: parseFloat(product.product_price),
        product_image: product.product_image,
        product_sustainability_rating: parseFloat(
          product.product_sustainability_rating,
        ),
        product_producer_id: product.product_producer_id,
        product_type: product.product_type as 'food' | 'non-food',
        is_organic: product.is_organic,
        food_subcategory: product.food_subcategory,
        created_at: product.created_at,
      })),
    );
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
    <div className="flex w-full flex-col items-center justify-center gap-y-4 overflow-hidden rounded-[1rem] border border-text-tertiary bg-tertiary-light shadow">
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <ProductRow
            key={product.id}
            id={product.id}
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
