'use client';

import Image from "next/image";
import { CardProps } from "../interfaces/cards.interface";

export function Cards({ title, url_img, flipped, onClick }: CardProps) {
  const isValidUrl = url_img?.startsWith("http");

  return (
    <div
      onClick={onClick}
      className="
        border rounded shadow-sm flex flex-col items-center justify-center p-1 cursor-pointer
        bg-white w-20 h-28
        sm:w-24 sm:h-32
        md:w-28 md:h-36
        lg:w-32 lg:h-40
      "
    >
      {flipped && isValidUrl ? (
        <>
          <Image
            src={url_img}
            alt={title}
            width={128}
            height={160}
            unoptimized 
            className="w-full h-20 sm:h-24 md:h-28 lg:h-32 object-cover rounded"
          />
          <p className="text-[10px] sm:text-[12px] md:text-[14px] font-bold text-black text-center mt-1 leading-tight">
            {title}
          </p>
        </>
      ) : (
        <div className="w-full h-full bg-gray-400 rounded" />
      )}
    </div>
  );
}
