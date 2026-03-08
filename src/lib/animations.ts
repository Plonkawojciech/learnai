import type { Variants } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const fadeScale: Variants = {
  hidden:  { opacity: 0, scale: 0.92, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1,    filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 40,  filter: "blur(8px)" },
  visible: { opacity: 1, x: 0,   filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -40, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0,   filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

export const stagger = (children = 0.08, delay = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: children, delayChildren: delay } },
});

export const viewport = { once: true, margin: "-80px" };
