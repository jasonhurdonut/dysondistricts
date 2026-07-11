import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { demoMode } from "@/lib/data";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dyson Districts",
  description:
    "The official roster, leaderboard, and schedule for the Dyson Districts games — Dyson Undergraduate Council.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {demoMode() && (
          <div className="bg-ink text-paper text-center text-xs smallcaps py-2 px-4">
            Demo data — connect Supabase in .env.local to go live
          </div>
        )}
        <header className="border-b border-line-strong">
          <div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center" aria-label="Dyson Districts home">
              <Image
                src="/logo.png"
                alt="Dyson Districts"
                width={2018}
                height={173}
                priority
                className="h-6 sm:h-7 w-auto max-w-[60vw] sm:max-w-none object-contain object-left"
              />
            </Link>
            <SiteNav />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line-strong mt-16">
          <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-6 text-sm">
            <div>
              <p className="font-display font-semibold text-lg text-crimson">Dyson Districts</p>
              <p className="text-ink-soft mt-2 text-xs">
                Run by the Dyson Undergraduate Council
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="https://www.instagram.com/cornell.duc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-crimson transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/></svg>
                </a>
                <span className="text-ink" aria-label="GroupMe">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.58 2 10c0 2.34 1.21 4.44 3.12 5.93L4.5 20.5l4.67-2.15C10.06 18.77 11 19 12 19c5.52 0 10-3.58 10-8s-4.48-8-10-8Zm-2.5 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg>
                </span>
              </div>
            </div>
            <div>
              <p className="smallcaps text-xs text-ink-soft mb-3">Navigate</p>
              <ul className="space-y-2 text-xs">
                <li><Link href="/my-district" className="hover:text-crimson transition-colors">My District</Link></li>
                <li><Link href="/leaderboard" className="hover:text-crimson transition-colors">Leaderboard</Link></li>
                <li><Link href="/schedule" className="hover:text-crimson transition-colors">Schedule</Link></li>
                <li><Link href="/districts" className="hover:text-crimson transition-colors">Districts</Link></li>
              </ul>
            </div>
            <div>
              <p className="smallcaps text-xs text-ink-soft mb-3">About</p>
              <ul className="space-y-2 text-xs">
                <li><Link href="/#points" className="hover:text-crimson transition-colors">How Points Work</Link></li>
                <li><Link href="/admin" className="hover:text-crimson transition-colors">Admin Panel</Link></li>
              </ul>
            </div>
            <div>
              <p className="smallcaps text-xs text-ink-soft mb-3">Connect</p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://www.instagram.com/cornell.duc/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.cornellduc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
                    DUC Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
