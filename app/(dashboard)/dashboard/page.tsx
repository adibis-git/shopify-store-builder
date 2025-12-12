'use client'

import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, TrendingUp, Clock, Award } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'Learner'}!
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey and master dropshipping
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              Courses Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Start learning today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              Learning Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0h</div>
            <p className="text-xs text-muted-foreground mt-1">Total time spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Earned certificates</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
          <Button asChild>
            <a href="/courses">Browse Courses</a>
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Button asChild>
                <a href="/courses">Explore Courses</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Recommended For You</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Coming soon</h3>
              <p className="text-muted-foreground">
                Personalized course recommendations will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
