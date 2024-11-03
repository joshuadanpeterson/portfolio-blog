// src/app/_components/cover-image.tsx

"use client";

import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  src: string;
  slug?: string;
  priority?: boolean;
};

const CoverImage = ({ title, src, slug, priority = false }: Props) => {
  const [imageError, setImageError] = useState(false);

  // Check if image is from Midjourney CDN
  const isMidjourneyImage = src.includes("cdn.midjourney.com");

  const image = (
    <div className="relative aspect-[1300/630] w-full">
      {!imageError ? (
        <Image
          src={src}
          alt={`Cover Image for ${title}`}
          className={cn("shadow-sm w-full", {
            "hover:shadow-lg transition-shadow duration-200": slug,
          })}
          fill
          style={{ objectFit: "cover" }}
          priority={priority}
          unoptimized={isMidjourneyImage}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1300px"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
