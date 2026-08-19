"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealVariant = "none" | "editorial";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "none",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealClass =
    variant === "editorial"
      ? `editorial-reveal ${visible ? "editorial-reveal--visible" : ""}`
      : `property-reveal ${visible ? "property-reveal--visible" : ""}`;

  return (
    <div
      ref={ref}
      className={`${revealClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
