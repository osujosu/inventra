"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  date: string | Date;
  title: string;
  description?: string;
  icon?: ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  metadata?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  animate?: boolean;
}

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Timeline({ items, className, animate = true }: TimelineProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const Wrapper = animate ? motion.div : "div";
  const ItemWrapper = animate ? motion.div : "div";

  return (
    <Wrapper
      {...(animate && {
        variants: container,
        initial: "hidden",
        animate: "show",
      })}
      className={cn("relative", className)}
    >
      {/* Vertical line */}
      <div
        className={cn(
          "absolute left-[17px] top-2 bottom-2 w-px",
          "bg-gradient-to-b from-slate-200 via-slate-200 to-transparent",
          "dark:from-slate-700 dark:via-slate-700"
        )}
      />

      <div className="space-y-6">
        {items.map((item, index) => (
          <ItemWrapper
            key={item.id}
            {...(animate && { variants: itemVariants })}
            className="relative pl-10"
          >
            {/* Icon dot */}
            <div
              className={cn(
                "absolute left-0 top-0.5",
                "flex items-center justify-center",
                "w-[35px] h-[35px] rounded-full",
                "border-4 border-white dark:border-slate-900",
                "shadow-sm",
                item.iconBgColor || "bg-primary-100 dark:bg-primary-900/40"
              )}
            >
              {item.icon ? (
                <span
                  className={cn(
                    "text-sm",
                    item.iconColor || "text-primary-600 dark:text-primary-400"
                  )}
                >
                  {item.icon}
                </span>
              ) : (
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    item.iconColor || "bg-primary-500"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div
              className={cn(
                "rounded-xl p-4",
                "bg-slate-50/80 dark:bg-slate-800/50",
                "border border-slate-100 dark:border-slate-700/50",
                "hover:border-slate-200 dark:hover:border-slate-600",
                "transition-colors duration-200"
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <time className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0">
                  {formatDate(item.date)}
                </time>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              )}

              {/* Metadata */}
              {item.metadata && (
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  {item.metadata}
                </div>
              )}
            </div>
          </ItemWrapper>
        ))}
      </div>
    </Wrapper>
  );
}

// Compact version for inline activity feeds
interface ActivityItem {
  id: string;
  date: string | Date;
  action: string;
  subject?: string;
  actor?: string;
  icon?: ReactNode;
  iconColor?: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
  maxItems?: number;
}

export function ActivityFeed({
  items,
  className,
  maxItems,
}: ActivityFeedProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className={cn("space-y-3", className)}>
      {displayItems.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              "flex items-center justify-center flex-shrink-0",
              "w-8 h-8 rounded-full",
              "bg-slate-100 dark:bg-slate-800",
              item.iconColor
            )}
          >
            {item.icon || (
              <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {item.actor && (
                <span className="font-medium text-slate-900 dark:text-white">
                  {item.actor}{" "}
                </span>
              )}
              {item.action}
              {item.subject && (
                <span className="font-medium text-slate-900 dark:text-white">
                  {" "}
                  {item.subject}
                </span>
              )}
            </p>
            <time className="text-xs text-slate-400 dark:text-slate-500">
              {formatDate(item.date)}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}