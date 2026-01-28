"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Pencil, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

// Helper to create a basic text column
export function createTextColumn<T>(
  accessorKey: keyof T & string,
  header: string,
  options?: {
    enableSorting?: boolean;
    cell?: (value: any, row: T) => React.ReactNode;
    className?: string;
  }
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    enableSorting: options?.enableSorting ?? true,
    cell: ({ row }) => {
      const value = row.getValue(accessorKey);
      if (options?.cell) {
        return options.cell(value, row.original);
      }
      return (
        <span className={cn("truncate max-w-[200px] block", options?.className)}>
          {String(value ?? "-")}
        </span>
      );
    },
  };
}

// Helper to create a number/currency column
export function createNumberColumn<T>(
  accessorKey: keyof T & string,
  header: string,
  options?: {
    prefix?: string;
    suffix?: string;
    decimals?: number;
    enableSorting?: boolean;
  }
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    enableSorting: options?.enableSorting ?? true,
    cell: ({ row }) => {
      const value = row.getValue(accessorKey) as number;
      const formatted = value?.toLocaleString("en-US", {
        minimumFractionDigits: options?.decimals ?? 0,
        maximumFractionDigits: options?.decimals ?? 0,
      });
      return (
        <span className="font-medium tabular-nums">
          {options?.prefix}
          {formatted ?? "-"}
          {options?.suffix}
        </span>
      );
    },
  };
}

// Helper to create a date column
export function createDateColumn<T>(
  accessorKey: keyof T & string,
  header: string,
  options?: {
    format?: "date" | "datetime" | "relative";
    enableSorting?: boolean;
  }
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    enableSorting: options?.enableSorting ?? true,
    cell: ({ row }) => {
      const value = row.getValue(accessorKey) as string | Date;
      if (!value) return <span className="text-slate-400">-</span>;

      const date = typeof value === "string" ? new Date(value) : value;

      if (options?.format === "relative") {
        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
        const diff = date.getTime() - Date.now();
        const days = Math.round(diff / (1000 * 60 * 60 * 24));

        if (Math.abs(days) < 1) {
          const hours = Math.round(diff / (1000 * 60 * 60));
          return (
            <span className="text-slate-600 dark:text-slate-400">
              {rtf.format(hours, "hour")}
            </span>
          );
        }
        return (
          <span className="text-slate-600 dark:text-slate-400">
            {rtf.format(days, "day")}
          </span>
        );
      }

      const formatted =
        options?.format === "datetime"
          ? date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

      return (
        <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">
          {formatted}
        </span>
      );
    },
  };
}

// Helper to create a status badge column
export function createStatusColumn<T>(
  accessorKey: keyof T & string,
  header: string,
  options?: {
    enableSorting?: boolean;
    showIcon?: boolean;
    size?: "sm" | "md" | "lg";
  }
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    enableSorting: options?.enableSorting ?? true,
    cell: ({ row }) => {
      const status = row.getValue(accessorKey) as string;
      return (
        <StatusBadge
          status={status}
          showIcon={options?.showIcon ?? true}
          size={options?.size ?? "sm"}
        />
      );
    },
  };
}

// Helper to create an image column
export function createImageColumn<T>(
  accessorKey: keyof T & string,
  header: string,
  options?: {
    size?: number;
    fallback?: string;
  }
): ColumnDef<T> {
  const size = options?.size ?? 40;

  return {
    accessorKey,
    header,
    enableSorting: false,
    cell: ({ row }) => {
      const src = row.getValue(accessorKey) as string;
      return (
        <div
          className={cn(
            "rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800",
            "flex items-center justify-center"
          )}
          style={{ width: size, height: size }}
        >
          {src ? (
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-slate-400">
              {options?.fallback ?? "N/A"}
            </span>
          )}
        </div>
      );
    },
  };
}

// Helper to create actions column
interface ActionConfig<T> {
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onCopy?: (row: T) => void;
  customActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    variant?: "default" | "destructive";
  }>;
}

export function createActionsColumn<T>(
  config: ActionConfig<T>
): ColumnDef<T> {
  return {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    size: 50,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {config.onView && (
              <DropdownMenuItem onClick={() => config.onView!(data)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            )}

            {config.onEdit && (
              <DropdownMenuItem onClick={() => config.onEdit!(data)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}

            {config.onCopy && (
              <DropdownMenuItem onClick={() => config.onCopy!(data)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </DropdownMenuItem>
            )}

            {config.customActions?.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => action.onClick(data)}
                className={cn(
                  action.variant === "destructive" &&
                    "text-rose-600 dark:text-rose-400 focus:text-rose-600"
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </DropdownMenuItem>
            ))}

            {config.onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => config.onDelete!(data)}
                  className="text-rose-600 dark:text-rose-400 focus:text-rose-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}