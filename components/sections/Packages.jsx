"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const p = content.packages;

export default function Packages() {
  return (
    <section id="packages" className="section-y bg-ember">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="mt-4 font-display text-display font-light">{p.title}</h2>
          <p className="mt-3 text-sand">{p.note}</p>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {p.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.1} className="h-full">
              <motion.div whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-3xl border p-8 ${it.highlight ? "border-marigold bg-gradient-to-b from-marigold/15 to-coal shadow-glow" : "border-white/10 bg-coal"}`}>
                {it.highlight && <span className="absolute -top-3 left-8 rounded-full bg-rani px-4 py-1 text-xs font-bold uppercase tracking-widest">{it.tag}</span>}
                <h3 className="font-display text-4xl italic">{it.name}</h3>
                {!it.highlight && <p className="text-sm text-sand">{it.tag}</p>}
                <div className="my-6">
                  <span className="text-xs uppercase tracking-widest text-sand">{it.unit}</span>
                  <p className="font-display text-6xl text-marigold">{it.price}</p>
                </div>
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {it.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-cream/90"><Check size={16} className="mt-0.5 shrink-0 text-marigold" /> {f}</li>
                  ))}
                </ul>
                <a href={waLink(`${constants.whatsappMessages.default}\nI am interested in the ${it.name} package.`)} target="_blank" rel="noopener noreferrer"
                  className={it.highlight ? "btn-fill" : "btn-line"}>{it.cta}</a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
