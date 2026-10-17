"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import Reveal from "../ui/Reveal";
import Media from "../ui/Media";

const s = content.services;
// Bento layout: har card ki width (Tailwind literal classes taaki purge na ho)
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-12"];

export default function Services() {
  const pick = (type) => window.dispatchEvent(new CustomEvent("dw:event-type", { detail: type }));

  return (
    <section id="services" className="section-y container-x">
      <Reveal className="mb-12 max-w-3xl">
        <span className="eyebrow">{s.eyebrow}</span>
        <h2 className="mt-4 font-display text-display font-light">{s.title}</h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-12">
        {s.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.08} className={SPANS[i]}>
            <motion.a
              href="#estimate" onClick={() => pick(it.eventType)} whileHover={{ y: -6 }}
              className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-6 transition-colors hover:border-marigold/60 md:min-h-[380px] md:p-8"
            >
              <Media src={it.image} alt={it.title} className="absolute inset-0" imgClassName="transition-transform duration-[1400ms] group-hover:scale-110" sizes="(min-width:768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10" />

              <div className="relative flex items-start justify-between">
                <span className="font-display text-5xl italic text-cream/30">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:rotate-45 group-hover:bg-marigold group-hover:text-night">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <div className="relative">
                <h3 className="font-display text-3xl font-light md:text-4xl">{it.title}</h3>
                <p className="mt-2 max-w-md text-sand">{it.text}</p>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-center">
        <span className="text-sm font-bold uppercase tracking-widest text-sand">{s.chipsTitle}</span>
        <div className="flex flex-wrap gap-2">{s.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
      </Reveal>
    </section>
  );
}
