import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageItem {
  id: string | number;
  url: string;
  name: string;
}

interface ImageGridProps {
  images: ImageItem[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <div className="relative mb-2 h-48">
            <Link href={`/img/${image.id}`} className="block h-full w-full">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>
            </Link>
          </div>
          <div className="w-full truncate px-1 text-center text-sm">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
