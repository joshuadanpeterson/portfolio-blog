// src/app/_components/about.tsx
import About from "@/app/_components/about";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        About Me
      </h1>
      <p className="text-lg mt-5 md:pl-8 text-center md:text-left max-w-2xl">
        Welcome to the About page. Here you can learn more about me.
      </p>
    </div>
  );
};

export default AboutPage;
