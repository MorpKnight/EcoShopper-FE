export default function ProductRow({
  product,
  rating,
  imagesource,
}: {
  product: string;
  rating: string;
  imagesource: string;
}) {
  return (
    <div className="font-inter flex w-full items-center justify-between border-t border-y-text-tertiary">
      <div className="mb-3 ml-6 mt-4">
        <h2 className="line-clamp-1 text-[1.5rem] leading-7 text-text-secondary">
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
