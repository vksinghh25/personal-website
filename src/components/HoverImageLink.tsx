"use client";
import { useState, ReactNode, MouseEvent } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface HoverImageLinkProps {
  children: ReactNode;
  imgSrc: string;
  imgWidth?: number;
  imgHeight?: number;
}

export default function HoverImageLink({
  children,
  imgSrc,
  imgWidth = 200,
  imgHeight = 200,
}: HoverImageLinkProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <span
        className="inline-block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </span>
      {isHovering &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 transition-transform duration-200 ease-in-out"
            style={{
              left: `${position.x + 15}px`,
              top: `${position.y + 15}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Image
              src={imgSrc}
              alt="Hover preview"
              width={imgWidth}
              height={imgHeight}
              className="rounded-lg shadow-2xl object-cover"
            />
          </div>,
          document.body
        )}
    </>
  );
} 