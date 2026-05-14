/** Hidden until focused — first stop for keyboard users. */
export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-[length:var(--text-13)] focus:font-medium focus:text-black"
    >
      Skip to content
    </a>
  );
}
