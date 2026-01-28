"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  icon?: LucideIcon;
  description?: string;
  className?: string;
  animateValue?: boolean;
  formatValue?: (value: number) => string;
}

function useAnimatedNumber(
  target: number,
  duration: number = 1000,
  enabled: boolean = true
) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCurrent(target);
      return;
    }

    const startTime = Date.now();
    const startValue = current;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const newValue = startValue + (target - startValue) * eased;

      setCurrent(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, enabled]);

  return current;
}

const defaultFormatter = (value: number): string => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
};

export function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  trend,
  icon: Icon,
  description,
  className,
  animateValue = true,
  formatValue = defaultFormatter,
}: StatCardProps) {
  const animatedValue = useAnimatedNumber(value, 1200, animateValue);

  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUp
      : trend?.direction === "down"
        ? TrendingDown
        : Minus;

  const trendColor =
    trend?.direction === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend?.direction === "down"
        ? "text-rose-600 dark:text-rose-400"
        : "text-slate-500 dark:text-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-white dark:bg-slate-900/80",
        "border border-slate-200/60 dark:border-slate-700/50",
        "p-6 transition-all duration-300",
        "hover:border-primary-300 dark:hover:border-primary-600/50",
        "hover:shadow-lg hover:shadow-primary-500/5",
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-primary-50/50 via-transparent to-transparent",
          "dark:from-primary-900/20",
          "group-hover:opacity-100"
        )}
      />

      <div className="relative z-10">
        {/* Header: Title + Icon */}
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 tracking-wide">
            {title}
          </p>
          {Icon && (
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl",
                "bg-primary-50 dark:bg-primary-900/30",
                "text-primary-600 dark:text-primary-400",
                "transition-transform duration-300 group-hover:scale-110"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1 mb-2">
          {prefix && (
            <span className="text-2xl font-semibold text-slate-500 dark:text-slate-400">
              {prefix}
            </span>
          )}
          <span
            className={cn(
              "text-3xl font-bold tracking-tight",
              "text-slate-900 dark:text-white",
              "font-display"
            )}
          >
            {formatValue(animatedValue)}
          </span>
          {suffix && (
            <span className="text-lg font-medium text-slate-500 dark:text-slate-400 ml-1">
              {suffix}
            </span>
          )}
        </div>

        {/* Trend + Description */}
        <div className="flex items-center gap-2">
          {trend && (
            <div className={cn("flex items-center gap-1 text-sm font-medium", trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
          {description && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className={cn(
          "absolute -bottom-8 -right-8 w-24 h-24 rounded-full",
          "bg-gradient-to-br from-primary-100/40 to-primary-200/20",
          "dark:from-primary-800/20 dark:to-primary-900/10",
          "transition-transform duration-500 group-hover:scale-150"
        )}
      />
    </motion.div>
  );
}