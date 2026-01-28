'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-lg font-bold text-primary-foreground">
                I
              </span>
            </div>
            <span className="font-display text-xl font-semibold">{APP_NAME}</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pt-32 pb-20">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero */}
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-600">
                {APP_NAME}
              </span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">{APP_TAGLINE}</p>
          </motion.div>

          {/* Status Card */}
          <motion.div variants={staggerItem} className="mt-12">
            <Card className="border-success/30 bg-success/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <span className="flex h-2 w-2 rounded-full bg-success" />
                  Setup Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Next.js 14 with App Router</p>
                <p>✓ TypeScript configured</p>
                <p>✓ Tailwind CSS v3 with custom theme</p>
                <p>✓ ShadCN UI components installed</p>
                <p>✓ Framer Motion animations working</p>
                <p>✓ Theme provider (light/dark mode)</p>
                <p>✓ Custom fonts (Sora, Plus Jakarta Sans, JetBrains Mono)</p>
                <p>✓ Utility functions ready</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Test Components */}
          <motion.div variants={staggerItem} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Component Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Buttons */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Buttons
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Brand Colors
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                      (shade) => (
                        <div
                          key={shade}
                          className={`flex h-12 w-12 items-center justify-center rounded-lg text-xs font-medium bg-primary-${shade} ${shade >= 500 ? 'text-white' : 'text-primary-900'}`}
                          style={{
                            backgroundColor: `rgb(var(--primary-${shade}))`,
                          }}
                        >
                          {shade}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Typography
                  </p>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-bold">
                      Display Font (Sora)
                    </p>
                    <p className="font-body text-lg">
                      Body Font (Plus Jakarta Sans)
                    </p>
                    <p className="font-mono text-sm">
                      Monospace Font (JetBrains Mono)
                    </p>
                  </div>
                </div>

                {/* Utilities */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Utility Functions
                  </p>
                  <div className="space-y-1 font-mono text-sm">
                    <p>formatCurrency(1234.56) → {formatCurrency(1234.56)}</p>
                    <p>formatDate(new Date()) → {formatDate(new Date())}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div variants={staggerItem} className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Next Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">M2 - Design System & Core UI Components:</strong>{' '}
                  Build foundational UI components including StatCard, ChartCard,
                  DataTable, EmptyState, LoadingSkeleton, and more.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}