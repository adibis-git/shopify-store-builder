'use client'

import { useAuth } from '@/lib/auth-context'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ShoppingCart, LogOut, User, Menu } from 'lucide-react'
import { signOut } from '@/lib/auth'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    redirect('/auth/login')
  }

  const handleLogout = async () => {
    await signOut()
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur dark:bg-slate-950/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white dark:text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">StoreBuilder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </a>
            <a href="/courses" className="text-sm text-muted-foreground hover:text-foreground">
              Courses
            </a>
            <a href="/dashboard/profile" className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-accent rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background dark:bg-slate-950">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <a
                href="/dashboard"
                className="block text-sm text-muted-foreground hover:text-foreground py-2"
              >
                Dashboard
              </a>
              <a
                href="/courses"
                className="block text-sm text-muted-foreground hover:text-foreground py-2"
              >
                Courses
              </a>
              <a
                href="/dashboard/profile"
                className="block text-sm text-muted-foreground hover:text-foreground py-2"
              >
                Profile
              </a>
              <div className="pt-2 border-t border-border dark:border-slate-800">
                <p className="text-xs text-muted-foreground mb-2">{user.email}</p>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
