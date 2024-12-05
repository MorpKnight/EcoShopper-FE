import { useState, useEffect } from 'react';
import { getProducts, Product } from '../handler/goods.handler';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminMainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const location = useLocation();
  const navigate = useNavigate();

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
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [location.search, products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductClick = (id: string) => {
    navigate(`/admin/product/${id}`);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex w-screen flex-grow justify-center overflow-x-hidden bg-tertiary-light">
      <section className="flex min-h-screen w-full flex-col items-center bg-tertiary-light pb-16">
        {/* Product List */}
        <div className="mt-6 w-full max-w-4xl px-4">
          {currentProducts.length === 0 ? (
            <p className="text-center text-text-secondary">There's no data</p>
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="hover:bg-secondary-100 flex items-center justify-between rounded-lg border border-secondary-500 bg-white p-4 shadow-md transition hover:shadow-lg"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product Info */}
                  <div className="flex-1 pr-4">
                    <h2 className="text-lg font-semibold text-text-primary">
                      {product.product_name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                      {product.product_description}
                    </p>
                    <div className="mt-2 flex items-center text-text-secondary">
                      <span className="text-lg font-semibold">
                        {product.product_sustainability_rating} ★
                      </span>
                    </div>
                  </div>
                  {/* Product Image */}
                  <div className="h-20 w-28 overflow-hidden rounded-lg border border-secondary-300 bg-secondary-300">
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-10 w-10 rounded-full bg-secondary-500 font-bold text-white transition hover:bg-secondary-700 disabled:opacity-50"
          >
            &lt;
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`h-10 w-10 rounded-full font-bold text-white transition ${
                page === currentPage
                  ? 'bg-primary hover:bg-primary-light'
                  : 'bg-secondary-500 hover:bg-secondary-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="h-10 w-10 rounded-full bg-secondary-500 font-bold text-white transition hover:bg-secondary-700 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
