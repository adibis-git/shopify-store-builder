import { LoginForm } from '@/components/auth/LoginForm'
import { ShoppingCart } from 'lucide-react'

export const metadata = {
  title: 'Sign In | Dropshipping LMS',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">StoreBuilder</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Sign in to continue learning
        </p>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>
          Need help?{' '}
          <a href="#" className="text-primary hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}
