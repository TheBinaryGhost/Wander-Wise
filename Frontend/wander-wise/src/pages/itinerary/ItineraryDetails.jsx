import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useApi from '@/hooks/useApi';
import { formatDate } from '@/lib/formatter';
import { Ellipsis, Loader2, Plus } from 'lucide-react';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const ItineraryDetails = () => {

  const { tripId } = useParams();
  const navigate = useNavigate();

  const { data, error, loading } = useApi(`/${tripId}/itineraries`);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-24">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    )
  }

  const handleDelete = async (itineraryId) =>{
    try {
      const response = await api.delete(`/${tripId}/itineraries/${itineraryId}`);

      if (response.status === 200){
        toast.success("Itinerary deleted successfully");
        window.location.reload();
      }else{
        toast.error( response.data.message || "Error deleting itinerary");
      }
    } catch (error) {
      toast.error( error.response?.data?.message || "Some error occured");
    }
  }

  return (
    <div className="mt-16 p-4 md:p-8 lg:p-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Itineraries</h1>
          <p className="text-gray-500 mt-1">View and manage itineraries for this trip.</p>
        </div>
        <Button onClick={() => { navigate(`/itinerary/add/${tripId}`) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Itinerary
        </Button>
      </div>

      {!data || data.length === 0 ? (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No itineraries yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Create an itinerary to start planning your trip activities.
            </p>
            <Button onClick={() => { navigate(`/itinerary/add/${tripId}`) }}>Create an Itinerary</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="mt-1">{formatDate(item.date)}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Ellipsis size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link className="w-full" to={`/itinerary/edit/${tripId}/${item._id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => { handleDelete(item._id) }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {item.description && (
                  <CardDescription>{item.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                {item.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className='border border-gray-200 p-4 rounded-md space-y-1'>
                    <p className='text-lg font-medium'>{activity.name}</p>
                    <p className='text-sm text-gray-500'>{activity.time}</p>
                    {activity.notes.length > 0 && (
                      <ul className='list-disc pl-6 text-sm text-gray-600'>
                        {activity.notes.map((note, noteIndex) => (
                          <li key={noteIndex}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ItineraryDetails
