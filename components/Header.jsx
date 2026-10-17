"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import constants from "@/data/constants.json";
import { useIntroReady } from "./Intro";

const { brand, nav } = constants;

export default function Header() {
  const ready = useIntroReady();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();

  // Neeche scroll = nav chhup jata hai, upar scroll = wapas aata hai
  useMotionValueEvent(scrollY, "change", (y) => setHidden(y > (scrollY.getPrevious() ?? 0) && y > 240));

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => { const el = document.querySelector(n.href); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-marigold via-saffron to-rani" />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -110 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div className="glass flex w-full max-w-4xl items-center justify-between gap-2 rounded-full py-2 pl-2 pr-2 shadow-2xl">
          <a href="#top" className="flex items-center gap-3 pr-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold font-display text-lg font-bold text-night">{brand.monogram}</span>
            <span className="hidden font-display text-lg italic sm:block">{brand.name}</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-marigold ${active === n.href ? "text-marigold" : "text-sand"}`}>
                {active === n.href && <motion.span layoutId="nav-dot" className="absolute inset-0 -z-10 rounded-full bg-white/10" />}
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#estimate" className="btn-fill hidden px-5 py-2.5 sm:inline-flex">Get Estimate</a>
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 lg:hidden">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night px-8 lg:hidden"
          >
            {nav.map((n, i) => (
              <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.07 }}
                className="border-b border-white/10 py-4 font-display text-4xl italic hover:text-marigold">
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
