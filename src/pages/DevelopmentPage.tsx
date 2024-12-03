import ProductTable from '../components/ProductTable/ProductTable';

export default function DevelopmentPage() {
  return (
    <>
      <p>Hello World</p>
      <section className="flex w-screen justify-center px-4">
        <ProductTable
          products={[
            {
              id: 1,
              name: 'Product 1',
              rating: '5.0',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 2,
              name: 'Product 2',
              rating: '4.2',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 2,
              name: 'Product 2',
              rating: '4.2',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 2,
              name: 'Product 2',
              rating: '4.2',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 2,
              name: 'Product 2',
              rating: '4.2',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
            {
              id: 3,
              name: 'Product 3',
              rating: '3.1',
              image: 'https://via.placeholder.com/64',
            },
          ]}
        />
      </section>
    </>
  );
}
