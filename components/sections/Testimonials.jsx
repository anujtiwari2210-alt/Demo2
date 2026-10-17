"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";

const t = content.testimonials;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d) => setI((v) => (v + d + t.items.length) % t.items.length);

  // Auto-advance (har click par timer reset)
  useEffect(() => {
    const id = setTimeout(() => go(1), 6500);
    return () => clearTimeout(id);
  }, [i]);

  const cur = t.items[i];
  return (
    <section className="section-y relative overflow-hidden bg-gradient-to-b from-ember to-night">
      <div className="pointer-events-none absolute -left-20 top-10 select-none font-display text-[22rem] leading-none text-white/[0.03]">“</div>
      <div className="container-x relative">
        <Reveal className="mb-10 text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-title font-light">{t.title}</h2>
        </Reveal>

        <div className="mx-auto min-h-[16rem] max-w-4xl text-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }}>
              <div className="mb-6 flex justify-center gap-1 text-marigold">{[...Array(5)].map((_, k) => <Star key={k} size={18} fill="currentColor" />)}</div>
              <p className="font-display text-2xl italic leading-snug md:text-4xl">“{cur.quote}”</p>
              <p className="mt-6 font-bold">{cur.name}</p>
              <p className="text-sm text-sand">{cur.event}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-marigold hover:text-marigold"><ArrowLeft size={18} /></button>
          <div className="flex gap-2">{t.items.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Go to ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-marigold" : "w-2 bg-white/25"}`} />)}</div>
          <button onClick={() => go(1)} aria-label="Next" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:border-marigold hover:text-marigold"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
