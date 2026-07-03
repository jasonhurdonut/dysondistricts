import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import Link from "next/link";
import { demoMode } from "@/lib/data";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Dyson Districts",
  description:
    "The official roster, leaderboard, and schedule for the Dyson Districts house games — Dyson Undergraduate Council.",
};

const NAV = [
  { href: "/", label: "My House" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/schedule", label: "Schedule" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <body className="min-h-screen flex flex-col">
        {demoMode() && (
          <div className="bg-ink text-paper text-center text-xs smallcaps py-2 px-4">
            Demo data — connect Supabase in .env.local to go live
          </div>
        )}
        <header className="border-b border-line-strong">
          <div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-display text-2xl font-semibold tracking-tight leading-none">
                Dyson Districts
              </span>
              <span className="hidden sm:block smallcaps text-[10px] text-ink-soft border-l border-line-strong pl-3 leading-tight">
                House Games
                <br />
                Dyson Undergraduate Council
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="smallcaps text-xs px-3 py-2 hover:bg-ink hover:text-paper transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="smallcaps text-xs px-3 py-2 text-ink-faint hover:bg-ink hover:text-paper transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line-strong mt-16">
          <div className="mx-auto max-w-6xl px-5 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft">
            <span className="smallcaps">Six houses · One champion</span>
            <span>
              Run by the Dyson Undergraduate Council · Challenges live on
              Instagram, chatter on GroupMe — scores live here.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
