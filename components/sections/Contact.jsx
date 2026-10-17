"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";
import { Icon, waLink } from "@/lib/helpers";
import Reveal from "../ui/Reveal";

const c = content.contact;
const EMPTY = { name: "", phone: "", eventType: "", date: "", message: "" };

export default function Contact() {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    const on = (e) => setData((d) => ({ ...d, eventType: e.detail }));
    window.addEventListener("dw:event-type", on);
    return () => window.removeEventListener("dw:event-type", on);
  }, []);

  const set = (k) => (e) => { setData((d) => ({ ...d, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: false })); };

  // Backend nahi chahiye: enquiry WhatsApp par pre-filled message ban kar khulti hai
  const submit = (e) => {
    e.preventDefault();
    const er = {
      name: data.name.trim().length < 2,
      phone: data.phone.replace(/\D/g, "").length < 10,
      eventType: !data.eventType,
      date: !data.date,
    };
    setErrors(er);
    if (Object.values(er).some(Boolean)) return;

    const ev = content.events.find((x) => x.value === data.eventType)?.label;
    const msg = [`Hello ${constants.brand.name}, new enquiry:`, `Name: ${data.name}`, `Phone: ${data.phone}`, `Event: ${ev}`, `Date: ${data.date}`, data.message && `Notes: ${data.message}`].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true); setData(EMPTY);
    setTimeout(() => setSent(false), 7000);
  };

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-ember">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-rani/20 blur-[120px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="mt-4 font-display text-display font-light">{c.title}</h2>
          <p className="mt-4 max-w-md text-sand">{c.text}</p>
          <ul className="mt-8 flex flex-col gap-3">
            {c.bullets.map((b) => (
              <li key={b.text} className="flex items-center gap-3 text-sand"><Icon name={b.icon} size={18} className="shrink-0 text-marigold" /> {b.text}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <form onSubmit={submit} noValidate className="glass flex flex-col gap-4 rounded-[2rem] p-6 md:p-9">
            <input value={data.name} onChange={set("name")} placeholder="Your name" aria-label="Name" className={`field ${errors.name ? "field-error" : ""}`} />
            <input value={data.phone} onChange={set("phone")} type="tel" placeholder="WhatsApp number" aria-label="Phone" className={`field ${errors.phone ? "field-error" : ""}`} />
            <div className="grid gap-4 sm:grid-cols-2">
              <select value={data.eventType} onChange={set("eventType")} aria-label="Event type" className={`field ${errors.eventType ? "field-error" : ""}`}>
                <option value="" disabled>Event type</option>
                {content.events.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <input type="date" min={today} value={data.date} onChange={set("date")} aria-label="Event date" className={`field ${errors.date ? "field-error" : ""}`} />
            </div>
            <textarea rows={3} value={data.message} onChange={set("message")} placeholder="Theme, venue or anything else (optional)" aria-label="Message" className="field resize-none" />
            <button type="submit" className="btn-rani w-full"><Send size={16} /> {c.submit}</button>
            <AnimatePresence>
              {sent && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-start gap-2 overflow-hidden text-sm text-marigold">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> {c.success}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
