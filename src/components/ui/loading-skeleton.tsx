"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md",
        "bg-slate-200/70 dark:bg-slate-700/50",
        "after:absolute after:inset-0",
        "after:translate-x-[-100%]",
        "after:animate-[shimmer_2s_infinite]",
        "after:bg-gradient-to-r",
        "after:from-transparent after:via-white/20 after:to-transparent",
        "dark:after:via-white/5",
        className
      )}
    />
  );
}

// Pre-built skeleton patterns for common use cases

export function StatCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        "bg-white dark:bg-slate-900/80",
        "border border-slate-200/60 dark:border-slate-700/50"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-9 w-32 mb-2" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        "bg-white dark:bg-slate-900/80",
        "border border-slate-200/60 dark:border-slate-700/50"
      )}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="flex justify-center gap-4 mt-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 px-4 border-b border-slate-100 dark:border-slate-800">
      {[...Array(columns)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === 0 ? "w-12" : i === 1 ? "w-40" : "w-24",
            "flex-shrink-0"
          )}
        />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        "bg-white dark:bg-slate-900/80",
        "border border-slate-200/60 dark:border-slate-700/50"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 py-3 px-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        {[...Array(columns)].map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-4",
              i === 0 ? "w-12" : i === 1 ? "w-32" : "w-20",
              "flex-shrink-0"
            )}
          />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <TableRowSkeleton key={i} columns={columns} />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        "bg-white dark:bg-slate-900/80",
        "border border-slate-200/60 dark:border-slate-700/50"
      )}
    >
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-4 w-16 flex-shrink-0" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>
    </div>
  );
}