"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";
import { FaWhatsapp } from "react-icons/fa";

const e = content.estimator;

const fmt = (v) => (v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${Math.round(v / 1000)}K`);

// Number smoothly count hota hai jab value badalti hai
function Money({ value }) {
  const spring = useSpring(value, { stiffness: 90, damping: 20 });
  useEffect(() => { spring.set(value); }, [value, spring]);
  const text = useTransform(spring, fmt);
  return <motion.span>{text}</motion.span>;
}

// Selectable pill group (component ke bahar: re-render par remount na ho)
const Pills = ({ items, value, set }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((it) => (
      <button key={it.value} type="button" onClick={() => set(it.value)}
        className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${value === it.value ? "border-marigold bg-marigold text-night" : "border-white/15 text-sand hover:border-marigold hover:text-marigold"}`}>
        {it.label}
      </button>
    ))}
  </div>
);

export default function Estimator() {
  const [event, setEvent] = useState(content.events[0].value);
  const [guests, setGuests] = useState(e.guestDefault);
  const [tier, setTier] = useState(e.tiers[1].value);

  // Services cards se event type aata hai
  useEffect(() => {
    const on = (ev) => setEvent(ev.detail);
    window.addEventListener("dw:event-type", on);
    return () => window.removeEventListener("dw:event-type", on);
  }, []);

  const base = content.events.find((x) => x.value === event).base;
  const t = e.tiers.find((x) => x.value === tier);
  const low = Math.round((base * t.mult + guests * t.perGuest) / 5000) * 5000;
  const high = Math.round((low * 1.35) / 5000) * 5000;

  const msg = `${constants.whatsappMessages.default}\nEvent: ${content.events.find((x) => x.value === event).label}\nGuests: ${guests}\nDecor level: ${t.label}\nEstimate: ${fmt(low)} - ${fmt(high)}`;

  return (
    <section id="estimate" className="section-y container-x">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">{e.eyebrow}</span>
          <h2 className="mt-4 font-display text-display font-light">{e.title}</h2>
          <p className="mt-4 max-w-md text-sand">{e.text}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="glass flex flex-col gap-8 rounded-[2rem] p-6 md:p-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-marigold">{e.eventLabel}</span>
              <Pills items={content.events} value={event} set={setEvent} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-marigold">{e.guestLabel}</span>
                <span className="font-display text-3xl">{guests}</span>
              </div>
              <input type="range" min={e.guestMin} max={e.guestMax} step={e.guestStep} value={guests} onChange={(ev) => setGuests(+ev.target.value)}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-marigold" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-marigold">{e.tierLabel}</span>
              <Pills items={e.tiers} value={tier} set={setTier} />
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-rani/25 to-marigold/20 p-6">
              <span className="text-xs uppercase tracking-widest text-sand">{e.resultLabel}</span>
              <p className="mt-1 font-display text-5xl text-cream md:text-6xl"><Money value={low} /> <span className="text-sand">-</span> <Money value={high} /></p>
              <p className="mt-2 text-xs text-sand">{e.disclaimer}</p>
            </div>

            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-fill w-full"><FaWhatsapp size={18} /> {e.cta}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
