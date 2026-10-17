"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Image with graceful fallback: agar file public/ me nahi mili to
 * colourful gradient + title dikhta hai, site kabhi "broken" nahi lagti.
 */
export default function Media({ src, alt, className = "", imgClassName = "", sizes = "100vw", priority = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-rani/40 via-coal to-marigold/30 ${className}`}>
      {!failed && (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} className={`object-cover ${imgClassName}`} />
      )}
      {failed && (
        <span className="absolute inset-0 flex items-center justify-center p-6 text-center font-display text-xl italic text-cream/50">{alt}</span>
      )}
    </div>
  );
}
