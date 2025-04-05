'use client';

import { useTitle } from "@/context/TitleContext";
import { useEffect } from "react";

type TitleUpdaterProps = {
  title: string;
};

export default function TitleUpdater({ title }: TitleUpdaterProps) {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  // This component doesn't render anything
  return null;
}
