export default function FooterNavigation() {
  return (
    <footer className="mt-6 flex w-screen max-w-screen-sm justify-around bg-tertiary py-4 fixed bottom-0">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-8 w-8 rounded-full bg-secondary-500"
        ></div>
      ))}
    </footer>
  );
} 