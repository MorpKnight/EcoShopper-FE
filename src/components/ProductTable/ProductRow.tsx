import { useNavigate } from 'react-router-dom';

export default function ProductRow({
  product,
  rating,
  imagesource,
  dontShowTopBorder,
  id,
}: {
  product: string;
  rating: string;
  imagesource: string;
  dontShowTopBorder?: boolean;
  id?: string;
}) {
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    if (!id) {
      return;
    }

    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`flex w-full items-center justify-between ${!dontShowTopBorder && 'border-t border-y-text-tertiary'} cursor-pointer font-inter`}
      onClick={() => handleProductClick(id || '')}
    >
      <div className="mb-3 ml-6 mt-4 w-3/5">
        <h2 className="line-clamp-1 text-[1.25rem] leading-7 text-text-secondary">
          {product}
        </h2>
        <div className="flex items-center">
          <span className="text-[1.5rem] text-text-tertiary">{rating}★</span>
        </div>
      </div>
      <div className="my-4 mr-6 h-14 w-24 overflow-hidden rounded-2xl bg-white">
        <img
          src={imagesource}
          alt={product}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
