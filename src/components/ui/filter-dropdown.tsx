"use client";

import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  showIcon?: boolean;
  showCounts?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  multiple = false,
  showIcon = true,
  showCounts = false,
  align = "start",
  className,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const hasSelection = selectedValues.length > 0 && selectedValues[0] !== "";

  const getDisplayLabel = () => {
    if (!hasSelection) return label;

    if (selectedValues.length === 1) {
      const selected = options.find((opt) => opt.value === selectedValues[0]);
      return selected?.label || label;
    }

    return `${selectedValues.length} selected`;
  };

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue === value ? "" : optionValue);
      setOpen(false);
    }
  };

  const handleClear = () => {
    onChange(multiple ? [] : "");
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 gap-2 font-normal",
            "border-slate-200 dark:border-slate-700",
            "hover:bg-slate-100 dark:hover:bg-slate-800",
            hasSelection && [
              "border-primary-200 dark:border-primary-800",
              "bg-primary-50/50 dark:bg-primary-900/20",
              "text-primary-700 dark:text-primary-300",
            ],
            className
          )}
        >
          {showIcon && <Filter className="w-3.5 h-3.5" />}
          <span className="max-w-[120px] truncate">{getDisplayLabel()}</span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 opacity-50 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "flex items-center justify-between gap-2 cursor-pointer",
                isSelected && "bg-primary-50 dark:bg-primary-900/20"
              )}
            >
              <div className="flex items-center gap-2">
                {option.icon && (
                  <span className="text-slate-500 dark:text-slate-400">
                    {option.icon}
                  </span>
                )}
                <span className={cn(isSelected && "font-medium")}>
                  {option.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {showCounts && option.count !== undefined && (
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {option.count}
                  </span>
                )}
                {isSelected && (
                  <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}

        {hasSelection && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleClear}
              className="text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              Clear filter
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}