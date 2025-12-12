import { SignupForm } from '@/components/auth/SignupForm'
import { ShoppingCart } from 'lucide-react'

export const metadata = {
  title: 'Sign Up | Dropshipping LMS',
  description: 'Create your account and start learning dropshipping',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-white dark:text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">StoreBuilder</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Join Our Community
        </h1>
        <p className="text-muted-foreground">
          Learn dropshipping from industry experts
        </p>
      </div>

      {/* Form */}
      <SignupForm />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          By signing up, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
