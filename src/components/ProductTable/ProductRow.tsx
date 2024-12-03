export default function ProductRow({
  product,
  rating,
  imagesource,
}: {
  product: string;
  rating: number;
  imagesource: string;
}) {
  return (
    <div className="flex w-full items-center justify-between bg-tertiary-light">
      <div className="mb-3 ml-6 mt-4">
        <h2 className="text-[1.5rem] font-semibold text-text-primary">
          {product}
        </h2>
        <div className="flex items-center text-text-secondary">
          <span className="text-[1.5rem]">{rating}★</span>
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
