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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">StoreBuilder</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900">FAQ</a>
            <ThemeToggle />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Get Free Audit</Button>
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
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
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
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <Badge className="mb-4 inline-block">Conversion-Focused Design</Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Build a High-Converting Shopify Store That Actually Sells
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Custom-built or self-hosted ecommerce stores with conversion-focused design. Done-for-you or done-with-you options.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8">
                Get Free Store Audit
              </Button>
            </DialogTrigger>
          </Dialog>
          <Button size="lg" variant="outline" className="px-8">
            See Example Stores <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>Trusted by 100+ brands</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Average 40% conversion increase</span>
          </div>
        </div>
      </section>

      {/* Problem-Agitate-Solution Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Your Store Isn't Broken—It's Just Not Built to Convert
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">The Problem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="text-red-600 font-bold">•</div>
                  <p className="text-slate-600">Low conversion rates despite traffic</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-red-600 font-bold">•</div>
                  <p className="text-slate-600">Poor mobile experience losing sales</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-red-600 font-bold">•</div>
                  <p className="text-slate-600">Confusing checkout flow</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-red-600 font-bold">•</div>
                  <p className="text-slate-600">Generic design that doesn't stand out</p>
                </div>
              </CardContent>
            </Card>

            {/* Agitation */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl">The Reality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 font-semibold mb-4">
                  "You're not bad at ecommerce — your store just isn't built to convert."
                </p>
                <p className="text-slate-600">
                  Most stores are designed to look pretty, not to sell. They ignore buyer psychology, friction points, and the psychology of trust. Every pixel should drive conversions.
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">Sales psychology-driven design</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">Optimized checkout & trust signals</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">Mobile-first, conversion-focused</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600">Measurable results & ongoing optimization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Store Previews */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
          Example Stores We've Built
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          See how we've transformed stores across different industries with conversion-focused design.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Luxury Fashion', conversion: '3.2%', increase: '+185%', image: '👗' },
            { name: 'Eco Products', conversion: '2.8%', increase: '+142%', image: '🌿' },
            { name: 'Tech Gadgets', conversion: '4.1%', increase: '+210%', image: '⚡' },
          ].map((store, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-6xl">
                {store.image}
              </div>
              <CardHeader>
                <CardTitle>{store.name}</CardTitle>
                <CardDescription>Conversion Rate: {store.conversion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-4">{store.increase}</div>
                <Button variant="outline" className="w-full">
                  See Full Store <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features & Benefits */}
      <section id="features" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
            Built for Conversion
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-6 w-6 text-blue-600" />,
                title: 'Mobile-First Design',
                desc: '60% of sales come from mobile. We design for phones first.',
              },
              {
                icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
                title: 'Optimized Checkout Flow',
                desc: 'Reduce cart abandonment with a streamlined, trust-building checkout.',
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
                title: 'Sales-Focused Layouts',
                desc: 'Every section is designed to guide customers toward purchase.',
              },
              {
                icon: <Brain className="h-6 w-6 text-blue-600" />,
                title: 'Buyer Psychology',
                desc: 'Leverage scarcity, social proof, and urgency to drive conversions.',
              },
              {
                icon: <Zap className="h-6 w-6 text-blue-600" />,
                title: 'Shopify & Headless Support',
                desc: 'Built on Shopify or custom Next.js—your choice.',
              },
              {
                icon: <Users className="h-6 w-6 text-blue-600" />,
                title: 'Expert Setup & Guidance',
                desc: 'We handle setup, training, and ongoing optimization.',
              },
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
          Two Ways to Build Your Store
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Choose the option that works best for your business.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Shopify Option */}
          <Card>
            <CardHeader>
              <CardTitle>Shopify Store Setup</CardTitle>
              <CardDescription>Hosted & Managed</CardDescription>
              <div className="text-3xl font-bold mt-4">$2,500</div>
              <p className="text-sm text-slate-600">One-time setup</p>
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
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-6">Get Started</Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>

          {/* Headless Option */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <Badge className="w-fit mb-2">Recommended</Badge>
              <CardTitle>Self-Hosted Custom Store</CardTitle>
              <CardDescription>Next.js / Headless</CardDescription>
              <div className="text-3xl font-bold mt-4">$4,500</div>
              <p className="text-sm text-slate-600">One-time setup</p>
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
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-6">Get Started</Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
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
              <Card key={idx}>
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
                  <CardTitle className="text-base">{testimonial.author}</CardTitle>
                  <CardDescription>{testimonial.company}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
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
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Build Your Store the Right Way
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free audit of your store and a personalized roadmap to increase conversions.
          </p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary" className="px-8">
                Get Your Free Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-200 p-4 shadow-lg">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              Get Free Store Audit
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Add padding to account for sticky mobile CTA */}
      <div className="md:hidden h-20" />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">StoreBuilder</span>
              </div>
              <p className="text-sm">Building conversion-focused ecommerce stores.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2025 StoreBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
