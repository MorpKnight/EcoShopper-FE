import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, Product } from '../handler/goods.handler';
import { deleteProduct } from '../handler/admin.handler';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleEditClick = () => {
    if (id) {
      navigate(`/admin/product/${id}/edit`);
    }
  };

  const handleDeleteClick = async () => {
    if (!id) {
      toast.error('Product ID is missing.');
      return;
    }

    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      navigate('/admin'); 
    } catch (error: any) {
      toast.error(`Failed to delete product: ${error.message}`);
      console.error('Delete Product Error:', error);
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
        <section className="relative mb-8 w-full rounded-lg bg-white p-4 shadow-md">
          {/* Edit Button */}
          <button
            className="absolute right-4 top-4 text-secondary-700 hover:text-secondary-500"
            onClick={handleEditClick}
          >
            <FaEdit size={20} />
          </button>
          {/* Product Image */}
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
          </div>
        </section>

        <div className="mb-8 flex w-full gap-x-2">
          <section className="w-1/2 rounded-lg bg-white p-4 shadow-md">
            <h3 className="bold mb-2 text-lg">Details</h3>
            <p>{product.product_description}</p>
          </section>
          <section className="w-1/2 rounded-lg bg-white p-4 shadow-md">
            <h3 className="bold mb-2 text-lg">Sustainability Rating</h3>
            <p>{product.product_sustainability_rating || '-'}</p>
          </section>
        </div>

        <section className="flex w-full flex-col gap-y-4">
          {/* Delete Button */}
          <div className="flex justify-center">
            <button
              className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
              onClick={handleDeleteClick}
            >
              Delete Product
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
