import useApi from '@/hooks/useApi'
import { Loader2, Calendar, DollarSign, FolderOpen, Luggage } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatter';

const Baggage = () => {
  const [dependency] = React.useState(0);
  const { data, error, loading } = useApi("/trips", {}, [dependency]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-24">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    )
  }

  return (
    <div className="mt-16 p-4 md:p-8 lg:p-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Baggage</h1>
          <p className="text-gray-500 mt-1">Select a trip to manage your baggage items.</p>
        </div>
      </div>

      {!data || data.length === 0 ? (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Create a trip first to start managing your baggage items.
            </p>
            <Link to="/trips/add">
              <Button>Create a Trip</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((trip) => (
            <Card key={trip._id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {trip.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(trip.startDate)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">${trip.budget.total}</span>
                    <span className="text-gray-400">budget</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-red-500" />
                    <span className="font-medium">${trip.budget.spent}</span>
                    <span className="text-gray-400">spent</span>
                  </div>
                </div>
                <Link to={`/baggage/${trip._id}`}>
                  <Button className="w-full" variant="outline">
                    <Luggage className="w-4 h-4 mr-2" />
                    View Baggages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Baggage