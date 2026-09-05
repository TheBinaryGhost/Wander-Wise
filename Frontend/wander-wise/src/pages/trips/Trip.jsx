import useApi from '@/hooks/useApi'
import { Ellipsis, Loader2, MapPin, Calendar, DollarSign, FolderOpen } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import api from '@/api/axios';
import { toast } from 'sonner';

const Trip = () => {
  const [dependency, setDependency] = React.useState(0);
  const { data, error, loading } = useApi("/trips", {}, [dependency]);

  const handleDelete = async (tripId) => {
    try {
      const response = await api.delete(`/trips/${tripId}`);
      if (response.status === 200) {
        toast.success("Trip deleted successfully");
        setDependency(dependency + 1);
      } else {
        toast.error(response.data.message || "Error deleting trip");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error deleting trip");
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Your Trips</h1>
          <p className="text-gray-500 mt-1">Manage all your travel plans in one place.</p>
        </div>
        <Link to="/trips/add">
          <Button>Add Trip</Button>
        </Link>
      </div>

      {!data || data.length === 0 ? (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Start planning your next adventure by creating your first trip.
            </p>
            <Link to="/trips/add">
              <Button>Create Your First Trip</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((trip) => (
            <Card key={trip._id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl truncate group-hover:text-blue-600 transition-colors">
                      <Link to={`/trips/${trip._id}`}>{trip.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(trip.startDate)}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Ellipsis size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link to={`/trips/${trip._id}`} className="w-full">View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/trips/edit/${trip._id}`} className="w-full">Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(trip._id)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
                {trip.destinations && trip.destinations.length > 0 && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {trip.destinations.slice(0, 3).map((destination, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                          {destination}
                        </span>
                      ))}
                      {trip.destinations.length > 3 && (
                        <span className="text-gray-500 text-xs">+{trip.destinations.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Trip