// import ProductTable from '../components/ProductTable/ProductTable';

// export default function DevelopmentPage() {
//   return (
//     <>
//       <p>Hello World</p>
//       <section className="flex w-screen justify-center px-4">
//         <ProductTable
//           products={[
//           ]}
//         />
//       </section>
//     </>
//   );
// }
import { useState } from 'react';
import ProductTable from '../components/ProductTable/ProductTable';

export default function DevelopmentPage() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <main className="flex w-screen justify-center">
      <section className="w-screen max-w-sm">
        <header className="mb-4 w-full px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-sm rounded-full px-4 py-2 text-text-secondary placeholder-text-secondary drop-shadow focus:outline-none"
          />
        </header>
        <section className="flex w-full justify-center px-4">
          <ProductTable searchQuery={search} />
        </section>
      </section>
    </main>
  );
}
