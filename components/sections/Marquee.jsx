"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";

/** Tilted, infinite-scrolling band: services ka ticker */
export default function Marquee() {
  const items = [...content.marquee, ...content.marquee];
  return (
    <div className="relative z-10 -my-4 -rotate-1 scale-x-105 overflow-hidden bg-marigold py-5 text-night">
      <motion.div className="flex w-max gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-3xl italic md:text-5xl">
            {t} <span className="text-rani">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
