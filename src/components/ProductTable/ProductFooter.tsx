import { useState } from 'react';
import Next from '/assets/Navigation-Next.svg';
import Prev from '/assets/Navigation-Prev.svg';

export default function ProductFooter({
  page,
  rowsPerPage,
  totalProducts,
  setPage,
}: {
  page: number;
  rowsPerPage: number;
  totalProducts: number;
  setPage: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalProducts / rowsPerPage);
  const [pageNumbers, setPageNumbers] = useState<number[]>([1, 2, 3, 4]);

  //TODO: Menambahkan elipsis saat page terlalu banyak
  return (
    <div className="flex items-center justify-center gap-x-2">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-primary rounded-lg px-4 py-2 text-white"
      >
        Prev
      </button>
      <span className="flex gap-x-4">
        {pageNumbers.map((number) => (
          <div
            key={number}
            className="flex h-3 w-3 items-center justify-center text-secondary-700 underline"
          >
            {number}
          </div>
        ))}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        <img src={Next} alt="Next" />
      </button>
    </div>
  );
}
