import { Mail, Phone } from "lucide-react";
import constants from "@/data/constants.json";
import content from "@/data/content.json";

const { brand, contact, nav } = constants;
const f = content.footer;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ember pb-24 pt-20 md:pb-10">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-3">
          <p className="max-w-xs text-sand">{f.about}</p>
          <div className="flex flex-col gap-2">
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-marigold">{f.navTitle}</span>
            {nav.map((n) => <a key={n.href} href={n.href} className="w-fit text-sand transition hover:text-marigold">{n.label}</a>)}
          </div>
          <div className="flex flex-col gap-2 text-sand">
            <span className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-marigold">{f.contactTitle}</span>
            <a href={`tel:${contact.phoneRaw}`} className="flex items-center gap-2 hover:text-marigold"><Phone size={15} /> {contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-marigold"><Mail size={15} /> {contact.email}</a>
            <p>{contact.address}</p>
          </div>
        </div>

        {/* Giant outlined wordmark */}
        <p className="mt-16 select-none text-center font-display text-[clamp(3rem,13vw,12rem)] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,243,222,0.25)]">
          {brand.name}
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-sand/70 md:flex-row">
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <span>{f.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
