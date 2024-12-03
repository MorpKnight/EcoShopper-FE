import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, Product } from '../handler/goods.handler';

export default function MainPage() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

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
              product_image: 'https://via.placeholder.com/150',
              product_sustainability_rating: 5,
              product_producer_id: '1',
              product_type: 'non-food',
              is_organic: false,
              created_at: new Date().toISOString(),
            },
            {
              id: '2',
              product_name: 'Sample Product 2',
              product_description: 'This is another sample product description.',
              product_category: 'Sample Category',
              product_price: 20,
              product_image: 'https://via.placeholder.com/150',
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

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${search}`);
  };

  return (
    <main className="flex w-screen justify-center">
      <section className="flex min-h-screen w-screen max-w-screen-sm flex-col items-center bg-tertiary-light">

        {/* Header */}
        <header className="flex h-14 w-full items-center justify-between bg-tertiary p-4">

          {/* Menu Icon */}
          <div className="flex h-8 w-8 flex-col items-center justify-center space-y-0.5 bg-white">
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
          </div>

          {/* Profile Icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mt-10 flex w-full justify-center px-8">
          <form onSubmit={handleSearchSubmit} className="flex w-full max-w-lg">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-tertiary px-6 text-text-secondary placeholder-text-secondary shadow focus:outline-none"
            />
          </form>
        </div>

        {/* Product List */}
        <div className="mt-6 w-full max-w-lg px-4">
          {products.length === 0 ? (
            <p className="text-center text-text-secondary">There's no data</p>
          ) : (
            products.map((product: Product) => (
              <div key={product.id} className="flex items-center justify-between">
                {/* Product Info */}
                <div className="mb-3 ml-6 mt-4">
                  <h2 className="text-[1.5rem] font-semibold text-text-primary">
                    {product.product_name}
                  </h2>
                  <p className="text-text-secondary">
                    {product.product_description}
                  </p>
                  <div className="flex items-center text-text-secondary">
                    <span className="text-[1.5rem]">{product.product_sustainability_rating}★</span>
                  </div>
                </div>
                {/* Product Image */}
                <div className="my-4 mr-6 h-14 w-24 overflow-hidden rounded-2xl bg-secondary-300">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          {[1, 2, 3, 4].map((dot) => (
            <div key={dot} className="h-3 w-3 bg-secondary-500"></div>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="mt-6 flex w-full justify-around bg-tertiary py-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-8 w-8 rounded-full bg-secondary-500"
            ></div>
          ))}
        </footer>
      </section>
    </main>
  );
}
