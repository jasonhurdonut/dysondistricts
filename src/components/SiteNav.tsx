"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import {
  CalendarIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  ShieldIcon,
  ShieldPersonIcon,
  StarIcon,
  TrophyIcon,
} from "./icons";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  faint?: boolean;
};

const NAV: NavItem[] = [
  { href: "/my-district", label: "Find My District", icon: SearchIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: TrophyIcon },
  { href: "/schedule", label: "Schedule", icon: CalendarIcon },
  { href: "/admin", label: "Admin Panel", icon: ShieldPersonIcon, faint: true },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`smallcaps text-xs px-3 py-2 transition-colors ${
              item.faint
                ? "text-ink-faint hover:text-ink-soft"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {item.label === "Find My District" ? "My District" : item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-line bg-card shadow-sm text-crimson hover:bg-paper-deep transition-colors"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-paper drawer-fade"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between px-6 h-[73px] shrink-0">
              <Image
                src="/logo.png"
                alt="Dyson Districts"
                width={2018}
                height={173}
                className="h-6 w-auto max-w-[62vw] object-contain object-left drawer-fade"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-11 h-11 -mr-2 text-ink hover:text-crimson transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-6 pt-2">
              {NAV.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${0.04 + i * 0.05}s` }}
                  className="drawer-item flex items-center gap-5 py-5 border-b border-line group"
                >
                  <item.icon className="w-6 h-6 text-crimson shrink-0" />
                  <span className="font-display text-2xl font-medium group-hover:text-crimson transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
