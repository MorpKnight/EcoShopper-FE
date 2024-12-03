export default function MainPage() {
  return (
    <main className="flex w-screen justify-center">
      <section className="flex min-h-screen w-screen max-w-screen-sm flex-col items-center bg-tertiary-light">
        {/*makna:
            - min-h-screen: tinggi elemen adalah selayar.
            - flex: container flexbox.
            - flex-col: disusun vertical.
            - item-center: child-el. disusun ketengah.
            - w-screen: lebar selayar.*/}
        {/* Header */}
        <header className="flex h-14 w-full items-center justify-between bg-tertiary p-4">
          {/*makna:
            - justify-between: kasih distance in between child-elemen.*/}
          {/* Menu Icon */}
          <div className="flex h-8 w-8 flex-col items-center justify-center space-y-0.5 bg-white">
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
            <span className="block h-0.5 w-4 bg-text-secondary"></span>
          </div>

          {/* Profile Icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <div className="h-3 w-3 rounded-full border border-text-secondary"></div>
            {/*makna:
            - border border-text-secondary: menambahkan border di sekitar lingkaran*/}
          </div>
        </header>

        {/* Search Bar */}
        <div className="mt-10 flex w-full justify-center px-8">
          {/*makna:
            - mt-10: margin top
            - px-8: padding -x*/}
          <input
            type="text"
            placeholder="Search"
            className="flex h-12 w-full max-w-lg items-center justify-center rounded-full bg-tertiary px-6 text-text-secondary placeholder-text-secondary shadow focus:outline-none"
          />
        </div>

        {/* Product List */}
        <div className="mt-6 w-full max-w-lg px-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between">
              {/* Product Info */}
              <div className="mb-3 ml-6 mt-4">
                <h2 className="text-[1.5rem] font-semibold text-text-primary">
                  Product Title
                </h2>
                <div className="flex items-center text-text-secondary">
                  <span className="text-[1.5rem]">3.2★</span>
                </div>
              </div>
              {/* Product Image */}
              <div className="my-4 mr-6 h-14 w-24 overflow-hidden rounded-2xl bg-secondary-300">
                <img
                  src="https://via.placeholder.com/64"
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          {[1, 2, 3, 4].map((dot) => (
            <div key={dot} className="h-3 w-3 bg-secondary-500"></div>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="mt-6 flex w-full justify-around bg-tertiary py-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-8 w-8 rounded-full bg-secondary-500"
            ></div>
          ))}
        </footer>
      </section>
    </main>
  );
}
