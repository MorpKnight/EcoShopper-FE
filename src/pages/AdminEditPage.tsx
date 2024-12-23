import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct } from '../handler/admin.handler';
import { toast } from 'react-toastify';

const AdminEditPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [producerId, setProducerId] = useState('');
  const [productType, setProductType] = useState('food');
  const [isOrganic, setIsOrganic] = useState(false);
  const [foodSubcategory, setFoodSubcategory] = useState('');
  const [ratings, setRatings] = useState({
    kategori1: 3.2,
    kategori2: 3.2,
    kategori3: 3.2,
    kategori4: 3.2,
    kategori5: 3.2,
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRatingChange = (key: string, value: number) => {
    setRatings({ ...ratings, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!id) throw new Error('Product ID is missing.');

      const sustainabilityRating =
        Object.values(ratings).reduce((a, b) => a + b, 0) /
        Object.values(ratings).length;

      const imageData = image ? URL.createObjectURL(image) : '';

      toast.info('Attempting to update product...');

      await editProduct(
        id,
        productName,
        productDescription,
        category,
        price,
        imageData,
        sustainabilityRating,
        producerId,
        productType,
        isOrganic,
        foodSubcategory
      );

      toast.success('Product updated successfully!');
      navigate(`/admin/product/${id}`);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
      console.error('Error during handleSubmit:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/product/${id}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary-light px-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg pb-20">
        <div className="mb-6 flex flex-col items-center">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : 'https://via.placeholder.com/150'
            }
            alt="Product"
            className="mb-4 h-32 w-32 rounded-lg object-cover"
          />
          <label className="cursor-pointer rounded-lg bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-700">
            Choose File
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Product Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Producer ID
          </label>
          <input
            type="text"
            value={producerId}
            onChange={(e) => setProducerId(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Product Type
          </label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          >
            <option value="food">Food</option>
            <option value="non-food">Non-Food</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Is Organic
          </label>
          <input
            type="checkbox"
            checked={isOrganic}
            onChange={(e) => setIsOrganic(e.target.checked)}
            className="rounded-lg border border-secondary-300"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Food Subcategory
          </label>
          <input
            type="text"
            value={foodSubcategory}
            onChange={(e) => setFoodSubcategory(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-4 block font-semibold text-text-secondary">
            Rating
          </label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(ratings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-text-secondary">
                  {key.replace('kategori', 'Kategori ')}
                </span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleRatingChange(key, parseFloat(e.target.value))
                  }
                  className="w-16 rounded-lg border border-secondary-300 bg-tertiary-light text-center text-text-primary focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="rounded-lg border border-secondary-300 bg-beige px-6 py-2 text-text-secondary hover:bg-secondary-300 hover:text-text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-secondary-500 px-6 py-2 text-white hover:bg-secondary-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditPage;
