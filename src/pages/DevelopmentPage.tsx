import ProductRow from '../components/ProductTable/ProductRow';

export default function DevelopmentPage() {
  return (
    <>
      <p>Hello World</p>
      <section className="flex w-screen justify-center px-4">
        <div className="flex w-full flex-col items-center">
          <ProductRow
            product="Product Title"
            rating={3.2}
            imagesource="https://via.placeholder.com/64"
          />
        </div>
      </section>
    </>
  );
}
