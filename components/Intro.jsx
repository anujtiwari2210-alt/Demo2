"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion } from "framer-motion";
import constants from "@/data/constants.json";
import content from "@/data/content.json";

/**
 * Opening: dark screen, brand name letter-by-letter rise hota hai, 0-100 counter chalta hai,
 * phir poora screen upar slide hoke curved edge ke saath khulta hai.
 * `useIntroReady()` baaki sections ko batata hai kab animate karna hai.
 */
const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const { enabled, oncePerSession, durationMs } = constants.intro;
const OPEN = "inset(0% 0% 0% 0% round 0% 0% 0% 0%)";
const CLOSED = "inset(0% 0% 100% 0% round 0% 0% 50% 50%)";

export default function IntroProvider({ children }) {
  const [showing, setShowing] = useState(enabled);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let seen = false;
    try { seen = oncePerSession && sessionStorage.getItem("rm-intro") === "1"; } catch {}
    if (seen) { setShowing(false); return; }

    const counter = animate(0, 100, { duration: (durationMs - 600) / 1000, ease: "easeInOut", onUpdate: (v) => setCount(Math.round(v)) });
    const t = setTimeout(() => {
      setShowing(false);
      try { sessionStorage.setItem("rm-intro", "1"); } catch {}
    }, durationMs);
    return () => { counter.stop(); clearTimeout(t); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showing]);

  const letters = constants.brand.name.split("");

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!showing}>
        {children}
        <AnimatePresence>
          {showing && (
            <motion.div
              key="intro" aria-hidden
              initial={{ clipPath: OPEN }} animate={{ clipPath: OPEN }}
              exit={{ clipPath: CLOSED, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
              className="fixed inset-0 z-[100] flex flex-col justify-between bg-night p-6 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(225,29,92,0.25),transparent_50%),radial-gradient(circle_at_75%_30%,rgba(255,169,40,0.22),transparent_50%)]" />

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="relative text-xs font-bold uppercase tracking-[0.3em] text-marigold">
                {constants.brand.location}
              </motion.p>

              <div className="relative flex flex-wrap justify-center text-center font-display text-[clamp(2.5rem,9vw,8rem)] italic leading-none text-cream">
                {letters.map((ch, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
                    <motion.span
                      className="inline-block" initial={{ y: "115%" }} animate={{ y: 0 }}
                      transition={{ delay: 0.35 + i * 0.045, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  </span>
                ))}
              </div>

              <div className="relative flex items-end justify-between">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                  className="max-w-[14rem] text-sm text-sand">{content.intro.line}</motion.p>
                <span className="font-display text-6xl tabular-nums text-marigold md:text-8xl">{String(count).padStart(3, "0")}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
