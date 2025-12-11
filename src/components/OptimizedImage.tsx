"use client";

import Image, { ImageProps } from "next/image";

export default function OptimizedImage(props: ImageProps) {
  return (
    <Image
      {...props}
      loading={props.priority ? "eager" : "lazy"}
      sizes={props.sizes || "(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"}
    />
  );
}

