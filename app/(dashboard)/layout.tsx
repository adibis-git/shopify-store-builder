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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0a0f] dark:via-slate-900 dark:to-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-muted-foreground dark:text-slate-400">Loading...</p>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0a0f] dark:via-slate-900 dark:to-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground dark:text-slate-50">StoreBuilder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/dashboard" className="text-sm text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200">
              Dashboard
            </a>
            <a href="/courses" className="text-sm text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200">
              Courses
            </a>
            <a href="/dashboard/profile" className="text-sm text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200">
              Profile
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground dark:text-slate-400">
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
              className="md:hidden p-2 hover:bg-accent dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <a
                href="/dashboard"
                className="block text-sm text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200 py-2"
              >
                Dashboard
              </a>
              <a
                href="/courses"
                className="block text-sm text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200 py-2"
              >
                Courses
              </a>
              <a
                href="/dashboard/profile"
                className="block text-sm text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200 py-2"
              >
                Profile
              </a>
              <div className="pt-2 border-t border-border dark:border-slate-800">
                <p className="text-xs text-muted-foreground dark:text-slate-400 mb-2">{user.email}</p>
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
