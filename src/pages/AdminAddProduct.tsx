import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../handler/admin.handler';
import { toast } from 'react-toastify';

const AddProductPage: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [producerId, setProducerId] = useState('');
  const [productType, setProductType] = useState('food');
  const [isOrganic, setIsOrganic] = useState(false);
  const [foodSubcategory, setFoodSubcategory] = useState('');
  const [sustainabilityRating, setSustainabilityRating] = useState<number>(5);
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const imageData = image ? URL.createObjectURL(image) : '';

      toast.info('Adding new product...');
      await addProduct(
        productName,
        productDescription,
        category,
        price,
        imageData,
        sustainabilityRating.toString(),
        producerId
      );

      toast.success('Product added successfully!');
      navigate('/admin');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
      console.error('Error during handleSubmit:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary-light px-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg pb-20">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Add Product</h1>
        {/* Product Name */}
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
        {/* Product Description */}
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
        {/* Category */}
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
        {/* Price */}
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
        {/* Producer ID */}
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
        {/* Product Type */}
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
        {/* Is Organic */}
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
        {/* Food Subcategory */}
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
        {/* Sustainability Rating */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Sustainability Rating
          </label>
          <input
            type="number"
            value={sustainabilityRating}
            onChange={(e) => setSustainabilityRating(Number(e.target.value))}
            min="0"
            max="10"
            step="0.1"
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>
        {/* Image */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
          />
        </div>
        {/* Buttons */}
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
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
