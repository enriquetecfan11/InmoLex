"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { toIntlLocale } from "@/i18n/intl-locale";

interface Stat {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats: Stat[];
}

function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, suffix: value };
  }
  return {
    prefix: match[1],
    target: parseFloat(match[2]),
    suffix: match[3],
  };
}

function AnimatedValue({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const locale = useLocale();
  const { prefix, target, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion.current || target === 0) {
      setDisplay(target);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  const formatted =
    suffix.includes("%") || suffix.includes(".")
      ? display.toString()
      : display.toLocaleString(toIntlLocale(locale));

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function HeroStats({ stats }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="hero-stats grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="hero-stat-card rounded-xl border border-accent/15 bg-accent/[0.04] px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6"
          style={{ animationDelay: `${0.85 + index * 0.1}s` }}
        >
          <p className="font-display text-3xl leading-none text-accent sm:text-4xl">
            <AnimatedValue value={stat.value} active={inView} />
          </p>
          <p className="mt-2.5 text-sm leading-snug text-white/55">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
