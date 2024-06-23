// src/app/_components/HeadMetadata.tsx
import Head from "next/head";

interface HeadMetadataProps {
  title: string;
  description: string;
}

const HeadMetadata = ({ title, description }: HeadMetadataProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Head>
);

export default HeadMetadata;
