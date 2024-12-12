import React, { useState } from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  file?: File | null;
  placeholder?: string;
  alt?: string;
  defaultImage?: string | null;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  placeholder = '/logo.png',
  alt = 'Preview',
  defaultImage
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);

  React.useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (!file && defaultImage) {
      setPreview(defaultImage);
    };
  }, [file, defaultImage]);

  return (
    <div className='relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center'>
      {preview ? (
        <Image
          src={preview}
          alt={alt}
          fill
          className='rounded-lg object-contain'
        />
      ) : (
        <div className='text-gray-500 text-sm'>{placeholder}</div>
      )}
    </div>
  );
};

export default ImagePreview;