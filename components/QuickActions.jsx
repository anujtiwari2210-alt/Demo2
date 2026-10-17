"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Send } from "lucide-react";
import constants from "@/data/constants.json";
import { waLink } from "@/lib/helpers";
import { useIntroReady } from "./Intro";

const { contact, whatsappMessages } = constants;

/** Mobile: bottom action bar (Call / WhatsApp / Enquire). Desktop: floating WhatsApp button. */
export default function QuickActions() {
  const ready = useIntroReady();
  return (
    <>
      <motion.div
        initial={{ y: 100 }} animate={ready ? { y: 0 } : {}} transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-full p-1.5 md:hidden"
      >
        <a href={`tel:${contact.phoneRaw}`} className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold"><Phone size={16} /> Call</a>
        <a href={waLink(whatsappMessages.floating)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-night"><MessageCircle size={16} /> Chat</a>
        <a href="#contact" className="flex items-center justify-center gap-2 rounded-full bg-marigold py-3 text-sm font-bold text-night"><Send size={16} /> Enquire</a>
      </motion.div>

      <motion.a
        href={waLink(whatsappMessages.floating)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }} animate={ready ? { scale: 1 } : {}} transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 16 }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-night shadow-2xl md:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle className="relative" size={26} />
      </motion.a>
    </>
  );
}
