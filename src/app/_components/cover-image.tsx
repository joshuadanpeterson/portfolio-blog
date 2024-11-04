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

  const isMidjourneyImage = src.includes("cdn.midjourney.com");

  const image = (
    <div className="w-full">
      <div className="relative aspect-[1300/630] w-full bg-gray-200">
        {!imageError ? (
          <Image
            src={src}
            alt={`Cover Image for ${title}`}
            className={cn("shadow-sm", {
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Failed to load image</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link
          href={`/posts/${slug}`}
          aria-label={title}
          className="block w-full"
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
