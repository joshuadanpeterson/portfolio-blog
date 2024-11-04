// src/about/page.tsx
import About from "@/app/_components/about";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        About Me
      </h1>
      <div className="text-lg mt-5 md:pl-8 text-center md:text-left max-w-2xl">
        <p className="mb-4">
          I’m <strong>Josh Peterson</strong>, a Special Projects Group Amazon
          Delivery Dispatcher based in Loveland, CO. With a background in
          logistics, managing large-scale operations at an Amazon DSP, I ensure
          the daily coordination of up to 50 drivers and 12,000 packages. Prior
          to logistics, I spent years in journalism, covering topics from AI to
          regulatory policies for outlets like The Federalist and the Washington
          Free Beacon. As a passionate web developer, I’ve completed multiple
          coding bootcamps, expanding my expertise in Python, JavaScript, and
          DevOps.
        </p>
        <p className="mb-4">
          Outside of work, I’m a musician, photographer and digital artist, avid
          hiker and snowboarder, and tech enthusiast interested in AI, space,
          crypto, and tech policy. My blog dives into these topics, blending my
          unique background in journalism, logistics, and tech.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
