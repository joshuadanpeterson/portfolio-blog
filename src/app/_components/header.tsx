// src/app/_components/header.tsx

import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link
        href="/posts"
        className="underline decoration-transparent hover:decoration-inherit text-black dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Blog.
      </Link>
    </h2>
  );
};

export default Header;
