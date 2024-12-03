import { useState, useEffect } from 'react';
import { getProducts, Product } from '../handler/goods.handler';
import { useLocation } from 'react-router-dom';

export default function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [location.search, products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex w-screen justify-center flex-grow">
      <section className="flex min-h-screen w-screen max-w-screen-sm flex-col items-center bg-tertiary-light">
        {/* Product List */}
        <div className="mt-6 w-full max-w-lg px-4">
          {currentProducts.length === 0 ? (
            <p className="text-center text-text-secondary">There's no data</p>
          ) : (
            currentProducts.map((product: Product) => (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                {/* Product Info */}
                <div className="mb-3 ml-6 mt-4 max-w-xs">
                  <h2 className="text-[1.5rem] font-semibold text-text-primary">
                    {product.product_name}
                  </h2>
                  <p className="max-h-16 overflow-y-auto text-text-secondary">

                    {product.product_description}
                  </p>
                  <div className="flex items-center text-text-secondary">
                    <span className="text-[1.5rem]">
                      {product.product_sustainability_rating}★
                    </span>
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

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 rounded-full bg-secondary-500"
          >
            &lt;
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`h-8 w-12 rounded-lg ${page === currentPage ? 'bg-primary' : 'bg-secondary-500'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 rounded-full bg-secondary-500"
          >
            &gt;
          </button>
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
