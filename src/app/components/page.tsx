"use client";

import { useState } from "react";
import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Box,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

// UI Components
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { ChartCard } from "@/components/ui/chart-card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Skeleton,
  StatCardSkeleton,
  ChartCardSkeleton,
  TableSkeleton,
  ListItemSkeleton,
} from "@/components/ui/loading-skeleton";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { FilterDropdown, FilterOption } from "@/components/ui/filter-dropdown";
import { StatusBadge } from "@/components/ui/status-badge";
import { Timeline, ActivityFeed } from "@/components/ui/timeline";
import { DataTable } from "@/components/ui/data-table";
import {
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/components/ui/data-table-columns";

// Sample chart data
const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

// Sample table data
interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  createdAt: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    sku: "IPH-15PM-256",
    category: "Smartphones",
    price: 1199,
    stock: 25,
    status: "in_stock",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24U-512",
    category: "Smartphones",
    price: 1299,
    stock: 18,
    status: "in_stock",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "MacBook Pro 14-inch",
    sku: "MBP-14-M3",
    category: "Laptops",
    price: 1999,
    stock: 0,
    status: "sold",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "iPad Air 5th Gen",
    sku: "IPA-5-256",
    category: "Tablets",
    price: 749,
    stock: 5,
    status: "in_repair",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "AirPods Pro 2nd Gen",
    sku: "APP-2-WHT",
    category: "Accessories",
    price: 249,
    stock: 50,
    status: "in_stock",
    createdAt: "2024-02-15",
  },
];

const productColumns = [
  createTextColumn<Product>("name", "Product Name"),
  createTextColumn<Product>("sku", "SKU", { className: "font-mono text-xs" }),
  createTextColumn<Product>("category", "Category"),
  createNumberColumn<Product>("price", "Price", { prefix: "$" }),
  createNumberColumn<Product>("stock", "Stock"),
  createStatusColumn<Product>("status", "Status"),
  createDateColumn<Product>("createdAt", "Created"),
  createActionsColumn<Product>({
    onView: (row) => alert(`View: ${row.name}`),
    onEdit: (row) => alert(`Edit: ${row.name}`),
    onDelete: (row) => alert(`Delete: ${row.name}`),
  }),
];

// Sample timeline data
const timelineItems = [
  {
    id: "1",
    date: new Date(),
    title: "Item sold to customer",
    description: "Sold to John Doe for $1,199.00",
    icon: <ShoppingCart className="w-4 h-4" />,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBgColor: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000 * 2),
    title: "Stock received",
    description: "Received from TechSupply Inc. Invoice #INV-2024-001",
    icon: <Package className="w-4 h-4" />,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    id: "3",
    date: new Date(Date.now() - 86400000 * 5),
    title: "Quality check passed",
    description: "Item inspected and marked as ready for sale",
    icon: <CheckCircle className="w-4 h-4" />,
    iconColor: "text-primary-600 dark:text-primary-400",
    iconBgColor: "bg-primary-100 dark:bg-primary-900/40",
  },
];

const activityItems = [
  {
    id: "1",
    date: new Date(),
    action: "created a new sale",
    subject: "#SL-2024-0042",
    actor: "Sarah",
    icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />,
  },
  {
    id: "2",
    date: new Date(Date.now() - 3600000),
    action: "updated stock for",
    subject: "iPhone 15 Pro",
    actor: "Mike",
    icon: <Package className="w-4 h-4 text-blue-500" />,
  },
  {
    id: "3",
    date: new Date(Date.now() - 7200000),
    action: "added new customer",
    subject: "Acme Corp",
    actor: "Sarah",
    icon: <Users className="w-4 h-4 text-violet-500" />,
  },
];

// Filter options
const categoryOptions: FilterOption[] = [
  { label: "All Categories", value: "" },
  { label: "Smartphones", value: "smartphones", count: 24 },
  { label: "Laptops", value: "laptops", count: 12 },
  { label: "Tablets", value: "tablets", count: 8 },
  { label: "Accessories", value: "accessories", count: 45 },
];

export default function ComponentsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <PageHeader
          title="Component Showcase"
          description="All custom UI components for Inventra, built with care and attention to detail."
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Components" },
          ]}
          actions={
            <Button onClick={() => setShowLoading(!showLoading)}>
              {showLoading ? "Hide" : "Show"} Loading States
            </Button>
          }
        />

        {/* Stat Cards */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Stat Cards
          </h2>
          {showLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Revenue"
                value={124500}
                prefix="$"
                trend={{ value: 12.5, direction: "up" }}
                description="vs last month"
                icon={DollarSign}
              />
              <StatCard
                title="Products Sold"
                value={1842}
                trend={{ value: 8.2, direction: "up" }}
                description="vs last month"
                icon={Package}
              />
              <StatCard
                title="Active Customers"
                value={326}
                trend={{ value: 2.1, direction: "down" }}
                description="vs last month"
                icon={Users}
              />
              <StatCard
                title="Low Stock Items"
                value={12}
                trend={{ value: 0, direction: "neutral" }}
                description="need attention"
                icon={AlertTriangle}
              />
            </div>
          )}
        </section>

        {/* Chart Cards */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Chart Cards
          </h2>
          {showLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCardSkeleton />
              <ChartCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard
                title="Sales Overview"
                subtitle="Monthly revenue trend"
                actions={
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                }
              >
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2B5492" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2B5492" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-700"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      className="text-slate-500 dark:text-slate-400"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      className="text-slate-500 dark:text-slate-400"
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      labelStyle={{ color: "#94a3b8", fontSize: 12 }}
                      itemStyle={{ color: "#fff", fontSize: 14 }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#2B5492"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      dot={{
                        r: 4,
                        fill: "#2B5492",
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#2B5492",
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Loading Example" isLoading={true}>
                <div />
              </ChartCard>
            </div>
          )}
        </section>

        {/* Search & Filters */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Search & Filters
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
              showShortcut
              containerClassName="w-64"
            />
            <FilterDropdown
              label="Category"
              options={categoryOptions}
              value={categoryFilter}
              onChange={(v) => setCategoryFilter(v as string)}
              showCounts
            />
          </div>
        </section>

        {/* Status Badges */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Status Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="in_stock" />
            <StatusBadge status="sold" />
            <StatusBadge status="reserved" />
            <StatusBadge status="defective" />
            <StatusBadge status="in_repair" />
            <StatusBadge status="scrapped" />
            <StatusBadge status="active" />
            <StatusBadge status="expiring_soon" />
            <StatusBadge status="expired" />
            <StatusBadge status="pending" />
            <StatusBadge status="completed" />
            <StatusBadge status="rejected" />
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <StatusBadge status="in_stock" size="sm" />
            <StatusBadge status="in_stock" size="md" />
            <StatusBadge status="in_stock" size="lg" />
            <StatusBadge status="active" showIcon={false} />
          </div>
        </section>

        {/* Data Table */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Data Table
          </h2>
          {showLoading ? (
            <TableSkeleton rows={5} columns={6} />
          ) : (
            <DataTable
              columns={productColumns}
              data={sampleProducts}
              enableRowSelection
              onExport={(data) => console.log("Export:", data)}
            />
          )}
        </section>

        {/* Timeline & Activity Feed */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Timeline & Activity Feed
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
                Timeline
              </h3>
              <Timeline items={timelineItems} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
                Activity Feed
              </h3>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/80 p-4">
                <ActivityFeed items={activityItems} />
              </div>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Empty States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/80">
              <EmptyState
                variant="products"
                title="No products yet"
                description="Get started by adding your first product to the inventory."
                action={{ label: "Add Product", onClick: () => {} }}
              />
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/80">
              <EmptyState
                variant="search"
                title="No results found"
                description="Try adjusting your search or filter to find what you're looking for."
                action={{ label: "Clear Filters", onClick: () => {} }}
              />
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/80">
              <EmptyState
                variant="customers"
                title="No customers"
                description="Start building your customer base by adding your first customer."
                action={{ label: "Add Customer", onClick: () => {} }}
              />
            </div>
          </div>
        </section>

        {/* Loading Skeletons */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Loading Skeletons
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <ListItemSkeleton />
              <ListItemSkeleton />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}