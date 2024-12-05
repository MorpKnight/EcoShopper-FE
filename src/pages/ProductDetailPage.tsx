import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, Product } from '../handler/goods.handler';
import { buyProducts } from '../handler/users.handler';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddToHistoryOpen, setAddToHistoryOpen] = useState(false);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        toast.error('Quantity cannot be less than 1.');
        return prev;
      }
    });
  };

  const handleBuyProduct = async () => {
    try {
      if (!id) {
        toast.error('Product ID needed.');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Log in needed to purchase this product.');
        return;
      }

      console.log('Formatted Token for cookies:', `token=${token}`);

      const response = await buyProducts(id, quantity, token);
      toast.success(response.message);
    } catch (error: any) {
      console.error('Error in handleBuyProduct:', error);
      toast.error(error.message || 'Something went wrong.');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProduct(id);
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen flex-col overflow-hidden bg-tertiary-light">
      <main className="mx-auto w-full max-w-screen-lg flex-grow px-4 py-6 pb-28">
        <section className="w-full rounded-lg bg-white p-4 shadow-md">
          <img
            src={product.product_image || 'https://via.placeholder.com/64'}
            alt={product.product_type || 'Product'}
            className="mb-4 w-full rounded-lg object-cover"
          />
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {product.product_name || 'Product Name'}
          </h1>
          <p className="mb-4 text-gray-600">
            {product.product_description || 'No description available.'}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-secondary-700">
              ${product.product_price}
            </span>
            <button
              onClick={() => setAddToHistoryOpen(true)}
              className="rounded-lg bg-secondary-700 px-4 py-2 text-white transition hover:bg-secondary-500"
            >
              Add to History
            </button>
          </div>
        </section>
      </main>

      {/* Add to History Modal */}
      {isAddToHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-tertiary-light p-6 shadow-lg">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              onClick={() => setAddToHistoryOpen(false)}
            >
              &times;
            </button>
            <h2 className="mb-4 text-center text-lg font-bold text-gray-800">
              Add to History
            </h2>
            <div className="mb-4 flex items-center justify-center">
              <img
                src={product.product_image || 'https://via.placeholder.com/300'}
                alt={product.product_name || 'Product'}
                className="h-32 w-32 rounded-lg object-cover"
              />
            </div>
            <p className="mb-4 text-center text-lg font-medium text-gray-700">
              {product.product_name}
            </p>
            <div className="mb-6 flex items-center justify-center gap-4">
              <button
                onClick={decrementQuantity}
                className="bg-brown-500 hover:bg-brown-600 h-10 w-10 rounded-full font-bold text-black transition"
              >
                -
              </button>
              <span className="text-xl font-bold text-black">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="bg-brown-500 hover:bg-brown-600 h-10 w-10 rounded-full font-bold text-black transition"
              >
                +
              </button>
            </div>
            <button
              onClick={handleBuyProduct}
              className="w-full rounded-lg bg-secondary-700 py-2 text-white transition hover:bg-secondary-500"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
