import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, Product } from '../handler/goods.handler';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <main className="flex w-screen justify-center flex-grow">
      <section className="flex min-h-screen w-screen max-w-screen-sm flex-col items-center bg-tertiary-light">
        <div className="mt-6 w-full max-w-lg px-4">
          <h1 className="text-[2rem] font-semibold text-text-primary">
            {product.product_name}
          </h1>
          <img
            src={product.product_image}
            alt={product.product_name}
            className="my-4 h-64 w-full object-cover rounded-2xl"
          />
          <p className="text-text-secondary">{product.product_description}</p>
          <div className="flex items-center text-text-secondary mt-4">
            <span className="text-[1.5rem]">
              {product.product_sustainability_rating}★
            </span>
          </div>
          <p className="text-text-secondary mt-2">
            Price: ${product.product_price}
          </p>
          <p className="text-text-secondary mt-2">
            Category: {product.product_category}
          </p>
          <p className="text-text-secondary mt-2">
            Type: {product.product_type}
          </p>
          <p className="text-text-secondary mt-2">
            Organic: {product.is_organic ? 'Yes' : 'No'}
          </p>
        </div>
      </section>
    </main>
  );
}