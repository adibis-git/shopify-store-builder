import { LoginForm } from '@/components/auth/LoginForm'
import { ShoppingCart } from 'lucide-react'

export const metadata = {
  title: 'Sign In | Dropshipping LMS',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground dark:text-slate-50">StoreBuilder</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground dark:text-slate-50 mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground dark:text-slate-400">
          Sign in to continue learning
        </p>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground dark:text-slate-400">
        <p>
          Need help?{' '}
          <a href="#" className="text-primary hover:underline dark:text-blue-400">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}
