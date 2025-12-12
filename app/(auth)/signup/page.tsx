import { SignupForm } from '@/components/auth/SignupForm'
import { ShoppingCart } from 'lucide-react'

export const metadata = {
  title: 'Sign Up | Dropshipping LMS',
  description: 'Create your account and start learning dropshipping',
}

export default function SignupPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0a0f] dark:via-slate-900 dark:to-[#0a0a0f] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Header */}
      <div className="mb-8 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground dark:text-slate-50">StoreBuilder</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">
          Join Our Community
        </h1>
        <p className="text-muted-foreground dark:text-slate-400">
          Learn dropshipping from industry experts
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10">
        <SignupForm />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground dark:text-slate-400 relative z-10">
        <p>
          By signing up, you agree to our{' '}
          <a href="#" className="text-primary hover:underline dark:text-blue-400">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline dark:text-blue-400">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
