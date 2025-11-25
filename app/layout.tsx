import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura | Breathwork for High Performers",
  description:
    "Master your nervous system with science-backed breathwork protocols. Reduce stress, improve sleep, and unlock peak performance.",
  openGraph: {
    title: "Aura | Breathwork for High Performers",
    description:
      "Master your nervous system with science-backed breathwork protocols.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${jakarta.variable} font-sans antialiased selection:bg-teal-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
