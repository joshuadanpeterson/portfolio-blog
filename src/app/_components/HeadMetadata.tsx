// src/app/_components/HeadMetadata.tsx
import Head from "next/head";

const HeadMetadata = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="http://localhost:3000" />
    <meta property="og:type" content="website" />
  </Head>
);

export default HeadMetadata;
