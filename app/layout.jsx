import { Fraunces, Manrope } from "next/font/google";
import IntroProvider from "@/components/Intro";
import constants from "@/data/constants.json";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata = { title: constants.seo.title, description: constants.seo.description };
export const viewport = { themeColor: "#0D0A09" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}
