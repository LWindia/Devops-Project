import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  fallback: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className = '' }) => {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div className={`relative inline-block ${className}`}>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="rounded-full object-cover w-full h-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full text-gray-600 font-semibold">
          {fallback}
        </div>
      )}
    </div>
  )
}