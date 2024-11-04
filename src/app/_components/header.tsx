// src/app/_components/header.tsx

import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link
        href="/posts"
        className="hover:underline !text-black hover:!text-blue-500"
      >
        Blog.
      </Link>
    </h2>
  );
};

export default Header;
