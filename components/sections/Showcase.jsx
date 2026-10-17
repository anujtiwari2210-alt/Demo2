"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import content from "@/data/content.json";
import Media from "../ui/Media";

const sc = content.showcase;
const N = sc.items.length;

function Card({ it, className }) {
  return (
    <figure className={`group relative shrink-0 overflow-hidden rounded-3xl ${className}`}>
      <Media src={it.image} alt={it.title} className="absolute inset-0" imgClassName="transition-transform duration-[1400ms] group-hover:scale-105" sizes="45vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6">
        <span className="rounded-full bg-rani px-3 py-1 text-[11px] font-bold uppercase tracking-widest">{it.tag}</span>
        <h3 className="mt-3 font-display text-3xl italic md:text-4xl">{it.title}</h3>
        <p className="text-sm text-sand">{it.meta}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Desktop: section pin hota hai aur vertical scroll horizontal movement me badal jata hai.
 * Mobile: simple swipe (snap) carousel.
 */
export default function Showcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const track = N * 40 + 4;                       // approx track width in vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((track - 92) / track) * 100}%`]);

  return (
    <section id="showcase" className="relative bg-ember">
      {/* Desktop pinned */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${N * 80}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
          <div className="container-x mb-8 flex items-end justify-between">
            <div>
              <span className="eyebrow">{sc.eyebrow}</span>
              <h2 className="mt-3 font-display text-display font-light">{sc.title}</h2>
            </div>
            <span className="text-sm uppercase tracking-widest text-sand">{sc.hint} →</span>
          </div>
          <motion.div style={{ x }} className="flex w-max gap-8 pl-10 xl:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]">
            {sc.items.map((it) => <Card key={it.title} it={it} className="h-[50vh] w-[38vw]" />)}
          </motion.div>
          <div className="container-x mt-8"><div className="h-px w-full bg-white/10"><motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-marigold" /></div></div>
        </div>
      </div>

      {/* Mobile swipe */}
      <div className="section-y md:hidden">
        <div className="container-x mb-8">
          <span className="eyebrow">{sc.eyebrow}</span>
          <h2 className="mt-3 font-display text-display font-light">{sc.title}</h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {sc.items.map((it) => <Card key={it.title} it={it} className="h-[60vh] w-[80vw] snap-center" />)}
        </div>
      </div>
    </section>
  );
}
