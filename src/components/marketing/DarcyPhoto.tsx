'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const PHOTOS = [
  '/Bookacall/Photo%2023-2-2026,%2012%2001%2052%20pm.png',
  '/Bookacall/Photo%2023-2-2026,%2012%2001%2052%20pm%20(1).png',
];

const INTERVAL_MS = 5000;

export default function DarcyPhoto() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200">
      {PHOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Darcy"
          fill
          className={`object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="56px"
        />
      ))}
    </div>
  );
}
