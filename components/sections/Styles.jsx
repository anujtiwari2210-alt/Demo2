"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const st = content.styles;

export default function Styles() {
  const [i, setI] = useState(0);
  const cur = st.items[i];

  return (
    <section id="styles" className="section-y container-x">
      <Reveal className="mb-12 max-w-3xl">
        <span className="eyebrow">{st.eyebrow}</span>
        <h2 className="mt-4 font-display text-display font-light">{st.title}</h2>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Style selector */}
        <div className="flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible">
          {st.items.map((it, idx) => (
            <button key={it.name} onClick={() => setI(idx)}
              className={`relative flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors lg:py-6 ${idx === i ? "border-marigold text-cream" : "border-white/10 text-sand hover:border-white/30"}`}>
              {idx === i && <motion.span layoutId="style-bg" className="absolute inset-0 -z-10 rounded-2xl bg-marigold/10" />}
              <span className="font-display text-2xl italic text-marigold">{String(idx + 1).padStart(2, "0")}</span>
              <span className="whitespace-nowrap font-display text-2xl lg:text-3xl">{it.name}</span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[16/10]">
            <AnimatePresence mode="popLayout">
              <motion.div key={cur.name} className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <Media src={cur.image} alt={cur.name} className="h-full w-full" sizes="(min-width:1024px) 66vw, 100vw" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={cur.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="mt-6 grid gap-4 md:grid-cols-2">
              <p className="text-lg text-cream/90">{cur.text}</p>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-marigold">Ideal for</p>
                <p className="mb-3 mt-1 text-sand">{cur.ideal}</p>
                <div className="flex flex-wrap gap-2">{cur.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
