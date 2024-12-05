import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
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

  const handleSubmit = () => {
    const data = {
      image,
      title,
      subtitle,
      ratings,
    };
    console.log(data);
    alert('Data saved successfully!');
    if (id) {
      navigate(`/admin/product/${id}`);
    }
  };

  const handleCancel = () => {
    alert('Edit canceled.');
    if (id) {
      navigate(`/admin/product/${id}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tertiary-light px-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
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
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-text-secondary">
            Subtitle
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-secondary-300 bg-tertiary-light px-4 py-2 text-text-primary focus:outline-none"
            placeholder="Enter subtitle"
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
                  step="0.1"
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
