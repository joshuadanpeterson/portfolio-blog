// src/about/page.tsx
"use client";
import About from "@/app/_components/about";
import TitleUpdater from "@/app/_components/title-updater";

const AboutPage = () => {
  return (
    <>
      <TitleUpdater title="About Me | Josh Peterson" />
      <div className="flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          About Josh
        </h1>
        <div className="text-lg mt-5 md:pl-8 text-center md:text-left max-w-2xl">
          <p className="mb-4">
            I&apos;m <strong>Josh Peterson</strong>, a systems-minded reporter,
            automation builder, and logistics operator based in Loveland, CO. My
            work sits at the intersection of public records, AI-assisted
            workflows, Google Workspace automation, and the practical mess of
            keeping real operations moving.
          </p>
          <p className="mb-4">
            In logistics, I&apos;ve coordinated daily operations for up to 50
            drivers and 12,000 packages. In journalism, I&apos;ve covered AI,
            regulatory policy, and public-interest stories for outlets including
            The Federalist and the Washington Free Beacon. In code, I build the
            connective tissue: scripts, dashboards, templates, research packets,
            and small tools that turn scattered work into repeatable systems.
          </p>
          <p>
            This site is the public version of that practice: an automation lab
            for workflows that can be reused, and a reporter&apos;s notebook for
            source trails, public-record methods, and evidence-led research.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
