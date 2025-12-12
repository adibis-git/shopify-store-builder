'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'

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
      </div>

      {/* Verification Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to <br />
            <span className="font-semibold text-foreground dark:text-slate-100">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">What's next?</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 font-semibold text-primary">1.</span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 font-semibold text-primary">2.</span>
                  <span>Click the verification link in the email</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 font-semibold text-primary">3.</span>
                  <span>You'll be redirected to sign in</span>
                </li>
              </ol>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 border border-blue-200 dark:border-blue-800/30">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <strong>Tip:</strong> The verification link expires in 24 hours. If it expires, you can request a new one.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <a href="/auth/login">Back to Sign In</a>
            </Button>
            <Button variant="outline" className="w-full" size="lg" disabled>
              Resend Verification Email
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Didn't receive the email?{' '}
              <a href="#" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
