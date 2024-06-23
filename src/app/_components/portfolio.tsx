// src/app/_components/portfolio.tsx
import Portfolio from "@/app/_components/portfolio";

const PortfolioPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Portfolio
      </h1>
      <p className="text-lg mt-5 md:pl-8 text-center md:text-left max-w-2xl">
        Welcome to my portfolio! Here you can see my latest projects.
      </p>
    </div>
  );
};

export default PortfolioPage;
