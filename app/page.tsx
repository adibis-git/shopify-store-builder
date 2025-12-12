'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import {
  CheckCircle2,
  ShoppingCart,
  TrendingUp,
  Brain,
  Zap,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', contactNumber: '', bio: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', contactNumber: '', bio: '' })
        setIsOpen(false)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a0a0f] text-foreground dark:text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground dark:text-slate-50">StoreBuilder</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-slate-50 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-slate-50 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-slate-50 transition-colors">FAQ</a>
            <ThemeToggle />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">Get Free Audit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Get Your Free Store Audit</DialogTitle>
                  <DialogDescription>
                    Tell us about your store and we'll provide personalized recommendations.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Tell us about yourself</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Share a brief bio about your background and interest in dropshipping..."
                      rows={3}
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading || submitted}>
                    {submitted ? 'Submitted! ✓' : isLoading ? 'Submitting...' : 'Get Free Audit'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0a0f] dark:via-slate-900 dark:to-[#0a0a0f]">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-teal-500/15 dark:bg-teal-500/20 rounded-full blur-3xl animate-float-delayed" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 text-center relative z-10">
          <Badge className="mb-4 inline-block glass dark:glass glass-border dark:glass-border bg-blue-50 dark:bg-transparent text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30">Conversion-Focused Design</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground dark:text-white mb-6 leading-tight">
            Build a High-Converting<br />
            <span className="gradient-text">Shopify Store</span> That Actually Sells
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-slate-400 mb-8 max-w-3xl mx-auto">
            Custom-built or self-hosted ecommerce stores with conversion-focused design. Done-for-you or done-with-you options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                Get Free Store Audit
              </Button>
            </DialogTrigger>
          </Dialog>
          <Button size="lg" variant="outline" className="px-8 border-slate-300 dark:border-white/20 dark:bg-white/5 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-white/10 dark:hover:border-white/30 transition-all duration-300">
            See Example Stores <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
            <span>Trusted by 100+ brands</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span>Average 40% conversion increase</span>
          </div>
        </div>
        </div>
      </section>

      {/* Problem-Agitate-Solution Section */}
      <section className="relative bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-blue-500/5 dark:from-blue-500/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-slate-50 text-center mb-16">
            Your Store Isn't Broken—It's Just Not Built to Convert
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Problems */}
            <Card className="bg-white dark:bg-white/5 dark:backdrop-blur-xl border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-red-500/5">
              <CardHeader>
                <CardTitle className="text-xl dark:text-slate-50">The Problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="text-red-600 dark:text-red-400 font-bold">•</div>
                  <p className="text-muted-foreground dark:text-slate-400">Low conversion rates despite traffic</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-red-600 dark:text-red-400 font-bold">•</div>
                  <p className="text-muted-foreground dark:text-slate-400">Poor mobile experience losing sales</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-red-600 dark:text-red-400 font-bold">•</div>
                  <p className="text-muted-foreground dark:text-slate-400">Confusing checkout flow</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-red-600 dark:text-red-400 font-bold">•</div>
                  <p className="text-muted-foreground dark:text-slate-400">Generic design that doesn't stand out</p>
                </div>
              </CardContent>
            </Card>

            {/* Agitation */}
            <Card className="border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 dark:backdrop-blur-xl hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/10">
              <CardHeader>
                <CardTitle className="text-xl dark:text-slate-50">The Reality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground dark:text-slate-50 font-semibold mb-4">
                  "You're not bad at ecommerce — your store just isn't built to convert."
                </p>
                <p className="text-muted-foreground dark:text-slate-400">
                  Most stores are designed to look pretty, not to sell. They ignore buyer psychology, friction points, and the psychology of trust. Every pixel should drive conversions.
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="bg-white dark:bg-white/5 dark:backdrop-blur-xl border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-500/5">
              <CardHeader>
                <CardTitle className="text-xl dark:text-slate-50">Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground dark:text-slate-400">Sales psychology-driven design</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground dark:text-slate-400">Optimized checkout & trust signals</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground dark:text-slate-400">Mobile-first, conversion-focused</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground dark:text-slate-400">Measurable results & ongoing optimization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Store Previews */}
      <section className="relative py-20 bg-white dark:bg-[#0a0a0f] overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-slate-50 text-center mb-4">
            Example Stores We've Built
          </h2>
          <p className="text-center text-muted-foreground dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            See how we've transformed stores across different industries with conversion-focused design.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Luxury Fashion', conversion: '3.2%', increase: '+185%', image: '👗', gradient: 'from-pink-500/20 to-purple-500/20' },
              { name: 'Eco Products', conversion: '2.8%', increase: '+142%', image: '🌿', gradient: 'from-green-500/20 to-teal-500/20' },
              { name: 'Tech Gadgets', conversion: '4.1%', increase: '+210%', image: '⚡', gradient: 'from-blue-500/20 to-cyan-500/20' },
            ].map((store, idx) => (
              <Card key={idx} className="overflow-hidden bg-white dark:bg-white/5 dark:backdrop-blur-xl border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <div className={`h-48 bg-gradient-to-br ${store.gradient} dark:${store.gradient} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300`}>
                  {store.image}
                </div>
                <CardHeader>
                  <CardTitle className="dark:text-slate-50">{store.name}</CardTitle>
                  <CardDescription className="dark:text-slate-400">Conversion Rate: {store.conversion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">{store.increase}</div>
                  <Button variant="outline" className="w-full border-slate-300 dark:border-white/20 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300">
                    See Full Store <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features & Benefits */}
      <section id="features" className="relative bg-slate-50 dark:bg-gradient-to-b dark:from-[#0a0a0f] dark:via-slate-900 dark:to-[#0a0a0f] py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-slate-50 text-center mb-16">
            Built for Conversion
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                title: 'Mobile-First Design',
                desc: '60% of sales come from mobile. We design for phones first.',
              },
              {
                icon: <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                title: 'Optimized Checkout Flow',
                desc: 'Reduce cart abandonment with a streamlined, trust-building checkout.',
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                title: 'Sales-Focused Layouts',
                desc: 'Every section is designed to guide customers toward purchase.',
              },
              {
                icon: <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                title: 'Buyer Psychology',
                desc: 'Leverage scarcity, social proof, and urgency to drive conversions.',
              },
              {
                icon: <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                title: 'Shopify & Headless Support',
                desc: 'Built on Shopify or custom Next.js—your choice.',
              },
              {
                icon: <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                title: 'Expert Setup & Guidance',
                desc: 'We handle setup, training, and ongoing optimization.',
              },
            ].map((feature, idx) => (
              <Card key={idx} className="bg-white dark:bg-white/5 dark:backdrop-blur-xl border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 w-fit">{feature.icon}</div>
                  <CardTitle className="text-lg dark:text-slate-50">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground dark:text-slate-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 bg-white dark:bg-gradient-to-b dark:from-[#0a0a0f] dark:via-purple-950/20 dark:to-[#0a0a0f] overflow-hidden">
        {/* Background glow for recommended card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-slate-50 text-center mb-4">
            Two Ways to Build Your Store
          </h2>
          <p className="text-center text-muted-foreground dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Choose the option that works best for your business.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Shopify Option */}
            <Card className="bg-white dark:bg-white/5 dark:backdrop-blur-xl border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="dark:text-slate-50">Shopify Store Setup</CardTitle>
                <CardDescription className="dark:text-slate-400">Hosted & Managed</CardDescription>
                <div className="text-3xl font-bold mt-4 dark:text-slate-50">$2,500</div>
                <p className="text-sm text-muted-foreground dark:text-slate-400">One-time setup</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    'Custom Shopify theme design',
                    'Product setup & optimization',
                    'Payment gateway integration',
                    'Mobile-optimized checkout',
                    'SEO optimization',
                    '30 days of support',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground dark:text-slate-50">{item}</span>
                    </li>
                  ))}
                </ul>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 transition-all duration-300">Get Started</Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>

            {/* Headless Option */}
            <Card className="relative bg-white dark:bg-gradient-to-b dark:from-blue-500/10 dark:to-purple-500/10 dark:backdrop-blur-xl border-2 border-blue-200 dark:border-blue-500/30 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg dark:shadow-blue-500/10">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0">Recommended</Badge>
                <CardTitle className="dark:text-slate-50">Self-Hosted Custom Store</CardTitle>
                <CardDescription className="dark:text-slate-400">Next.js / Headless</CardDescription>
                <div className="text-3xl font-bold mt-4 gradient-text">$4,500</div>
                <p className="text-sm text-muted-foreground dark:text-slate-400">One-time setup</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    'Custom Next.js storefront',
                    'Full design control',
                    'Headless CMS integration',
                    'Advanced analytics setup',
                    'API integrations',
                    '60 days of support',
                    'Unlimited customization',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground dark:text-slate-50">{item}</span>
                    </li>
                  ))}
                </ul>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300">Get Started</Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative bg-slate-50 dark:bg-gradient-to-b dark:from-[#0a0a0f] dark:via-slate-900 dark:to-[#0a0a0f] py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-yellow-500/10 dark:bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-orange-500/10 dark:bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-slate-50 text-center mb-16">
            Trusted by Growing Brands
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: 'Our conversion rate jumped from 1.2% to 3.8% in 3 months. The design is clean, and customers actually complete purchases.',
                author: 'Sarah Chen',
                company: 'Eco Fashion Co.',
                rating: 5,
              },
              {
                quote: 'We switched from a generic template to a custom store. The difference in customer experience is night and day.',
                author: 'Marcus Johnson',
                company: 'Tech Gadgets Plus',
                rating: 5,
              },
              {
                quote: 'Best investment we made for our ecommerce business. The team understood our brand and built something that sells.',
                author: 'Lisa Rodriguez',
                company: 'Luxury Home Goods',
                rating: 5,
              },
              {
                quote: 'Professional, responsive, and results-driven. They didn\'t just build a store—they optimized our entire sales funnel.',
                author: 'David Kim',
                company: 'Fitness Equipment Store',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-white dark:bg-white/5 dark:backdrop-blur-xl border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.3)]" />
                    ))}
                  </div>
                  <p className="text-foreground dark:text-slate-50 italic mb-4">"{testimonial.quote}"</p>
                  <CardTitle className="text-base dark:text-slate-50">{testimonial.author}</CardTitle>
                  <CardDescription className="dark:text-slate-400">{testimonial.company}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 bg-white dark:bg-[#0a0a0f] overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-slate-50 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto bg-white dark:bg-white/5 dark:backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-6 md:p-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Will you help me with product selection?</AccordionTrigger>
              <AccordionContent>
                We focus on store design and conversion optimization. However, we can provide guidance on product photography, descriptions, and positioning to maximize sales. For inventory management, we recommend tools like Shopify's built-in features or third-party apps.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to use Shopify?</AccordionTrigger>
              <AccordionContent>
                No. We offer two options: a Shopify-hosted store or a custom Next.js headless store. Shopify is great for simplicity and built-in features. A custom store gives you more control and flexibility. We'll help you choose based on your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can you help fix an existing store?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We offer conversion audits and optimization services for existing stores. We'll analyze your current setup, identify friction points, and provide a roadmap for improvements. Contact us for a free audit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How long does it take to build a store?</AccordionTrigger>
              <AccordionContent>
                A Shopify store typically takes 4-6 weeks. A custom Next.js store takes 8-12 weeks depending on complexity. We'll provide a detailed timeline during the discovery phase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What if I'm not happy with the design?</AccordionTrigger>
              <AccordionContent>
                We include revision rounds in our process. We work closely with you throughout the design phase to ensure the final product matches your vision. Your satisfaction is our priority.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Do you provide ongoing support?</AccordionTrigger>
              <AccordionContent>
                Yes. All packages include 30-60 days of post-launch support. We also offer maintenance and optimization packages for long-term growth. We can discuss ongoing support options during your consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Build Your Store the Right Way
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free audit of your store and a personalized roadmap to increase conversions.
          </p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8 bg-white text-blue-700 hover:bg-blue-50 shadow-xl shadow-black/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Get Your Free Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 p-4 shadow-lg z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25" size="lg">
              Get Free Store Audit
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Add padding to account for sticky mobile CTA */}
      <div className="md:hidden h-20" />

      {/* Footer */}
      <footer className="relative bg-slate-900 dark:bg-[#0a0a0f] text-slate-400 py-12 overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">StoreBuilder</span>
              </div>
              <p className="text-sm text-slate-400">Building conversion-focused ecommerce stores.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white dark:text-slate-200 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">Features</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">Pricing</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white dark:text-slate-200 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">About</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">Blog</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white dark:text-slate-200 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">Privacy</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-400 hover:text-slate-300 dark:hover:text-slate-300">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-700 pt-8 text-center text-sm">
            <p className="text-slate-400 dark:text-slate-400">&copy; 2025 StoreBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
