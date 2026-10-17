"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { waLink } from "@/lib/helpers";
import { EASE_LUXE } from "@/lib/motion";
import { useIntroReady } from "../Intro";

const h = content.hero;

// Text line jo neeche se "mask" ke andar rise karti hai
function Line({ children, delay, ready }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span className="block" initial={{ y: "115%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1, delay, ease: EASE_LUXE }}>
        {children}
      </motion.span>
    </span>
  );
}

// Har 2.4s me word badalta hai (mandaps -> sangeets -> ...)
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % h.rotating.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden pb-[0.1em] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={i} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.55, ease: EASE_LUXE }}
          className="inline-block italic text-marigold">
          {h.rotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={h.poster}>
          <source src={h.video} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(225,29,92,0.25),transparent_55%)]" />

      <motion.div style={{ opacity }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-32 pt-36 md:pb-24">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.8 }} className="eyebrow mb-6">
          {h.eyebrow}
        </motion.span>

        <h1 className="font-display text-mega font-light">
          <Line delay={0.15} ready={ready}>{h.line1}</Line>
          <Line delay={0.3} ready={ready}><RotatingWord /></Line>
          <Line delay={0.45} ready={ready}><span className="text-title text-cream/90">{h.line3}</span></Line>
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 0.9 }} className="mt-6 max-w-xl text-lg text-sand">
          {h.subtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.95, duration: 0.9 }} className="mt-8 flex flex-wrap gap-3">
          <a href="#estimate" className="btn-fill">{h.primaryCta}</a>
          <a href={waLink(constants.whatsappMessages.consult)} target="_blank" rel="noopener noreferrer" className="btn-line">
            <MessageCircle size={16} className="text-[#25D366]" /> {h.secondaryCta}
          </a>
        </motion.div>

        <motion.dl initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
          {h.stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl text-marigold md:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-xs text-sand md:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Rotating text badge */}
      <motion.a href="#services" initial={{ scale: 0, opacity: 0 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 1.3, type: "spring" }}
        className="absolute bottom-28 right-6 z-10 hidden h-32 w-32 items-center justify-center md:flex lg:right-14">
        <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
          <defs><path id="ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
          <text className="fill-cream text-[9px] font-bold uppercase"><textPath href="#ring" textLength="285" lengthAdjust="spacing">{h.ring}{h.ring}</textPath></text>
        </motion.svg>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marigold text-night"><ArrowDown size={20} /></span>
      </motion.a>
    </section>
  );
}
