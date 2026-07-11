import { EventType } from "@/lib/types";

type IconProps = { className?: string; strokeWidth?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MountainIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M3 19.5L9 7l3.5 6.5L16 9.5l5 10H3z" />
      <path d="M11 10.5L9 7" />
    </svg>
  );
}

export function BulbIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.3 2.2h4.6c.2-.8.6-1.6 1.3-2.2A6 6 0 0 0 12 3z" />
    </svg>
  );
}

export function PeopleIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M15.6 14.7a4.9 4.9 0 0 1 5.6 4.8" />
    </svg>
  );
}

export function HandshakeIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M2.5 7.5L7 5.5l5 1.5 5-1.5 4.5 2M2.5 7.5L4 14l5 4.5M21.5 7.5L20 14l-5 4.5" />
      <path d="M12 7l-4.5 4.2a1.5 1.5 0 0 0 2 2.2L12 11.5l2.7 2.5a1.5 1.5 0 0 0 2-2.2L12 7zM9 18.5l1.8 1.2a2 2 0 0 0 2.4 0L15 18.5" />
    </svg>
  );
}

export function PinIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M12 21s-6.5-5.5-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.5 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  );
}

export function ClockIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function CalendarIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 2.8V6.2M16 2.8V6.2" />
    </svg>
  );
}

export function TrophyIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4M12 14v3M8.5 20h7M10 17h4v3h-4z" />
    </svg>
  );
}

export function SearchIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

export function ShieldIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M12 3l7.5 2.6v5.6c0 4.7-3.2 7.9-7.5 9.7-4.3-1.8-7.5-5-7.5-9.7V5.6L12 3z" />
    </svg>
  );
}

export function ShieldPersonIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M12 3l7.5 2.6v5.6c0 4.7-3.2 7.9-7.5 9.7-4.3-1.8-7.5-5-7.5-9.7V5.6L12 3z" />
      <circle cx="12" cy="10" r="2.1" />
      <path d="M8.4 15.8a3.7 3.7 0 0 1 7.2 0" />
    </svg>
  );
}

export function StarIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L12 17l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5z" />
    </svg>
  );
}

export function MenuIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={strokeWidth}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function EventTypeIcon({
  type,
  className,
  strokeWidth,
}: IconProps & { type: EventType }) {
  switch (type) {
    case "challenge":
      return <MountainIcon className={className} strokeWidth={strokeWidth} />;
    case "trivia":
      return <BulbIcon className={className} strokeWidth={strokeWidth} />;
    case "bonding":
      return <PeopleIcon className={className} strokeWidth={strokeWidth} />;
    case "collaboration":
      return <HandshakeIcon className={className} strokeWidth={strokeWidth} />;
  }
}
