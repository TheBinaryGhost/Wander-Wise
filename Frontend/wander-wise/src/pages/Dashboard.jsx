import React, { useEffect, useMemo, useState } from 'react'
import useApi from '@/hooks/useApi'
import api from '@/api/axios'
import { Loader2, Users, CalendarDays, Clock3, CheckCircle, DollarSign, MapPin, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/formatter'

const Dashboard = () => {
  const { data: trips, error, loading } = useApi('/trips')
  const [userMap, setUserMap] = useState({})
  const [userLoading, setUserLoading] = useState(false)

  const stats = useMemo(() => {
    const now = new Date()
    const totalTrips = trips?.length || 0
    const upcomingTrips = trips?.filter((trip) => new Date(trip.startDate) > now).length || 0
    const ongoingTrips = trips?.filter((trip) => {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      return start <= now && now <= end
    }).length || 0
    const completedTrips = trips?.filter((trip) => new Date(trip.endDate) < now).length || 0
    const totalSpent = trips?.reduce((sum, trip) => sum + (trip.budget?.spent || 0), 0) || 0

    return {
      totalTrips,
      upcomingTrips,
      ongoingTrips,
      completedTrips,
      totalSpent,
    }
  }, [trips])

  const allDestinationLabels = useMemo(() => {
    if (!trips) return []
    const destinations = trips.flatMap((trip) => trip.destinations || [])
    return Array.from(new Set(destinations))
  }, [trips])

  const allUserIds = useMemo(() => {
    if (!trips) return []
    const ids = new Set()
    trips.forEach((trip) => {
      const ownerId = typeof trip.user === 'object' ? trip.user._id : trip.user
      if (ownerId) ids.add(ownerId)
      ;(trip.collaborators || []).forEach((collaborator) => {
        const collabId = typeof collaborator === 'object' ? collaborator._id : collaborator
        if (collabId) ids.add(collabId)
      })
    })
    return Array.from(ids)
  }, [trips])

  useEffect(() => {
    let mounted = true
    const loadUsers = async () => {
      if (!trips?.length || !allUserIds.length) {
        setUserMap({})
        return
      }

      setUserLoading(true)

      try {
        const response = await api.get('/users/batch', {
          params: { ids: allUserIds.join(',') }
        })
        const users = response.data?.data || response.data || []
        if (mounted) {
          const map = {}
          users.forEach((u) => { map[u._id] = u })
          setUserMap(map)
        }
      } catch {
        if (mounted) {
          const fallback = {}
          allUserIds.forEach((id) => { fallback[id] = { _id: id, name: 'Unknown', email: '' } })
          setUserMap(fallback)
        }
      } finally {
        if (mounted) setUserLoading(false)
      }
    }

    loadUsers()

    return () => {
      mounted = false
    }
  }, [trips, allUserIds])

  const getUserLabel = (userOrId) => {
    if (typeof userOrId === 'object' && userOrId !== null) {
      return userOrId.name || userOrId.email || userOrId._id || 'Unknown'
    }
    const user = userMap[userOrId]
    if (!user) return userOrId
    return user.name || user.email || userOrId
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-24">
        <Loader2 className="animate-spin h-10 w-10 text-amber-500" />
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-red-600">Error loading dashboard: {error.message}</div>
  }

  return (
    <div className="mt-16 space-y-6 p-4 md:p-8 lg:p-12">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Clock3 className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="text-slate-800">Total Trips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-slate-800">{stats.totalTrips}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <CalendarDays className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-slate-800">Upcoming Trips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-slate-800">{stats.upcomingTrips}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-slate-800">Ongoing Trips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-slate-800">{stats.ongoingTrips}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <CardTitle className="text-slate-800">Completed Trips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-slate-800">{stats.completedTrips}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="text-slate-800">Total Spent</CardTitle>
            </div>
            <CardDescription>Sum of spent budgets across all trips.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-slate-800">${stats.totalSpent}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-slate-800">Destinations Visited</CardTitle>
            </div>
            <CardDescription>Unique destinations across your trips.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {allDestinationLabels.length > 0 ? (
              allDestinationLabels.map((destination) => (
                <Badge key={destination} variant="outline" className="px-3 py-1 border-amber-200 text-amber-700">
                  {destination}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-slate-500">No destinations added yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <CalendarDays className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="text-slate-800">Trip Dates</CardTitle>
            </div>
            <CardDescription>Start and end date for each trip.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trips.map((trip) => (
              <div key={trip._id} className="space-y-2 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{trip.title}</p>
                    <p className="text-sm text-slate-500">{trip.description}</p>
                  </div>
                  <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-sm font-medium">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
                  <p>Created by: {getUserLabel(trip.user)}</p>
                  <p>
                    Collaborators:{' '}
                    {(trip.collaborators || []).length > 0
                      ? trip.collaborators.map((id) => getUserLabel(id)).join(', ')
                      : 'None'}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <CardTitle className="text-slate-800">Collaborators</CardTitle>
            </div>
            <CardDescription>Loaded from backend for each collaborator and trip creator.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {userLoading ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Loader2 className="animate-spin h-4 w-4" />
                Loading user info...
              </div>
            ) : allUserIds.length === 0 ? (
              <p className="text-sm text-slate-500">No collaborators or creators found.</p>
            ) : (
              allUserIds.map((id) => {
                const user = userMap[id] || { _id: id, name: 'Unknown', email: '' }
                return (
                  <div key={id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-800">{user.name || id}</p>
                      <p className="text-slate-500">{user.email || 'No email available'}</p>
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
