import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type MouseEventHandler,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "../../lib/utils";

/*
 * Adapted from cult-ui "cutout-card" (https://cult-ui.com/r/cutout-card.json)
 * for this Vite + Tailwind v3 project: next/image -> <img>, motion/react ->
 * framer-motion, radix useControllableState -> local hook, theme CSS-variable
 * tokens -> concrete colors.
 */

// ============================================================================
// Tokens
// ============================================================================

export const cutoutCardSurfaceShadowClassName = cn(
  "border border-slate-200",
  "shadow-[0px_1px_2px_-1px_rgba(15,23,42,0.08),0px_4px_8px_-2px_rgba(15,23,42,0.06),0px_8px_16px_-4px_rgba(15,23,42,0.05)]",
  "transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
  "hover:border-slate-300 hover:shadow-[0px_2px_4px_-1px_rgba(15,23,42,0.10),0px_8px_16px_-4px_rgba(15,23,42,0.08),0px_16px_32px_-8px_rgba(15,23,42,0.06)]"
);

export const cutoutCardSurfaceClassName = cn(
  "group/cutout relative cursor-pointer overflow-hidden rounded-[28px] bg-white text-slate-900",
  cutoutCardSurfaceShadowClassName
);

// Local controllable-state hook (replaces @radix-ui/react-use-controllable-state)
function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T;
  defaultProp: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? (prop as T) : uncontrolled;
  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [value, setValue];
}

/** Staggered text/footer entrance inside `CutoutCardContent` — use with `motion.div` children. */
export function useCutoutContentStaggerVariants() {
  const reduceMotion = useReducedMotion();

  return useMemo(() => {
    if (reduceMotion) {
      return {
        container: { hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0 } } },
        item: {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } },
        },
      } as const;
    }
    return {
      container: { hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } } },
      item: {
        hidden: { opacity: 0, y: 12, filter: "blur(5px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring", duration: 0.48, bounce: 0.14 },
        },
      },
    } as const;
  }, [reduceMotion]);
}

const CORNER_PATH = "M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z";

// ============================================================================
// Context
// ============================================================================

export interface CutoutCardContextValue {
  hovered: boolean;
  setHovered: (next: boolean) => void;
}

const CutoutCardContext = createContext<CutoutCardContextValue | null>(null);

export function useCutoutCard() {
  const ctx = useContext(CutoutCardContext);
  if (!ctx) throw new Error("useCutoutCard must be used within <CutoutCard>");
  return ctx;
}

export function useOptionalCutoutCard() {
  return useContext(CutoutCardContext);
}

// ============================================================================
// Root
// ============================================================================

export type CutoutCardProps = Omit<ComponentProps<typeof motion.div>, "defaultValue"> & {
  hovered?: boolean;
  defaultHovered?: boolean;
  onHoveredChange?: (hovered: boolean) => void;
  trackPointerHover?: boolean;
};

export function CutoutCard({
  className,
  hovered: hoveredProp,
  defaultHovered = false,
  onHoveredChange,
  trackPointerHover = true,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}: CutoutCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useControllableState({
    prop: hoveredProp,
    defaultProp: defaultHovered,
    onChange: onHoveredChange,
  });

  const setHoveredStable = useCallback((next: boolean) => setHovered(next), [setHovered]);

  const ctx = useMemo<CutoutCardContextValue>(
    () => ({ hovered: hovered ?? false, setHovered: setHoveredStable }),
    [hovered, setHoveredStable]
  );

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    onMouseEnter?.(e);
    if (e.defaultPrevented || !trackPointerHover) return;
    setHoveredStable(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    onMouseLeave?.(e);
    if (e.defaultPrevented || !trackPointerHover) return;
    setHoveredStable(false);
  };

  return (
    <CutoutCardContext.Provider value={ctx}>
      <motion.div
        animate={{ opacity: 1 }}
        className={cn(className)}
        data-slot="cutout-card"
        data-state={ctx.hovered ? "hovered" : "idle"}
        initial={{ opacity: 0 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        transition={
          reduceMotion
            ? { duration: 0.22, ease: [0.23, 1, 0.32, 1] }
            : { duration: 0.36, ease: [0.23, 1, 0.32, 1] }
        }
        {...props}
      >
        {children}
      </motion.div>
    </CutoutCardContext.Provider>
  );
}

// ============================================================================
// Layout primitives
// ============================================================================

export type CutoutCardMediaProps = HTMLAttributes<HTMLDivElement>;

export function CutoutCardMedia({ className, ...props }: CutoutCardMediaProps) {
  return <div className={cn("relative overflow-hidden", className)} data-slot="cutout-card-media" {...props} />;
}

export type CutoutCardImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function CutoutCardImage({ className, alt = "", ...props }: CutoutCardImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      alt={alt}
      className={cn(
        "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cutout:scale-105",
        className
      )}
      data-slot="cutout-card-image"
      {...props}
    />
  );
}

export type CutoutCardOverlayProps = HTMLAttributes<HTMLDivElement>;

export function CutoutCardOverlay({ className, ...props }: CutoutCardOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent",
        className
      )}
      data-slot="cutout-card-overlay"
      {...props}
    />
  );
}

export type CutoutCardContentProps = HTMLAttributes<HTMLDivElement>;

export function CutoutCardContent({ className, ...props }: CutoutCardContentProps) {
  return <div className={cn("p-6", className)} data-slot="cutout-card-content" {...props} />;
}

export type CutoutCardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CutoutCardFooter({ className, ...props }: CutoutCardFooterProps) {
  return <div className={cn("flex items-center justify-between", className)} data-slot="cutout-card-footer" {...props} />;
}

// ============================================================================
// Cutout geometry
// ============================================================================

export type CutoutCornerProps = ComponentProps<"svg"> & { size?: number };

export function CutoutCorner({ className, size = 32, viewBox = "0 0 200 200", ...props }: CutoutCornerProps) {
  return (
    <svg
      aria-hidden
      className={cn(className)}
      data-slot="cutout-corner"
      height={size}
      viewBox={viewBox}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={CORNER_PATH} fill="currentColor" />
    </svg>
  );
}

export type CutoutCardInsetLabelProps = HTMLAttributes<HTMLDivElement>;

export function CutoutCardInsetLabel({ className, ...props }: CutoutCardInsetLabelProps) {
  return <div className={cn("absolute", className)} data-slot="cutout-card-inset-label" {...props} />;
}

export type CutoutCardPinProps = HTMLAttributes<HTMLDivElement>;

export function CutoutCardPin({ className, ...props }: CutoutCardPinProps) {
  return <div className={cn("absolute", className)} data-slot="cutout-card-pin" {...props} />;
}

// ============================================================================
// Context-sensitive action region
// ============================================================================

export type CutoutCardActionProps = ComponentProps<typeof motion.div> & {
  revealOnHover?: boolean;
};

export function CutoutCardAction({ className, revealOnHover = true, ...props }: CutoutCardActionProps) {
  const { hovered } = useCutoutCard();
  const reduceMotion = useReducedMotion();
  const visible = !revealOnHover || hovered;

  return (
    <motion.div
      animate={visible ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: "translateY(8px)" }}
      className={cn("absolute", revealOnHover && !visible && "pointer-events-none", className)}
      data-reveal={revealOnHover ? "hover" : "always"}
      data-slot="cutout-card-action"
      transition={
        reduceMotion
          ? { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
          : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }
      }
      {...props}
    />
  );
}
