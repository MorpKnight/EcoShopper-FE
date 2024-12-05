import { useEffect, useState } from 'react';
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
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  // Update page numbers based on total pages
  const updatePageNumbers = () => {
    const numbers: number[] = [];
    const maxVisiblePages = 5; // Adjust the number of visible page numbers
    const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    setPageNumbers(numbers);
  };

  // Update page numbers when page or totalPages changes
  useEffect(() => {
    updatePageNumbers();
  }, [page, totalPages]);

  return (
    <div className="flex w-full items-center justify-center gap-x-4 border-t border-text-tertiary py-2">
      {/* Previous Button */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`flex items-center justify-center rounded-full ${
          page === 1 ? 'opacity-50' : ''
        }`}
      >
        <img src={Prev} className="h-5 w-5" alt="Previous Page" />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              number === page
                ? 'bg-secondary-500 text-white'
                : 'bg-secondary-100 text-secondary-700'
            }`}
          >
            {number}
          </button>
        ))}
        {totalPages > pageNumbers.length && (
          <span className="flex items-center text-secondary-700">...</span>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`flex items-center justify-center rounded-full ${
          page === totalPages ? 'opacity-50' : ''
        }`}
      >
        <img src={Next} className="h-5 w-5" alt="Next Page" />
      </button>
    </div>
  );
}
