import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import React from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';

const AcceptInvite = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const { tripId } = useParams();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    if (!user) {
        return <Navigate to={`/login?redirect=/trips/${tripId}/invite/accept?token=${token}`} />;
    }

    const accept = async () => {
        try {
            const response = await api.post(`trips/${tripId}/invite/accept`, { token });

            if(response.status === 200){
                toast.success("Invitation accepted");
                navigate(`/trips/${tripId}`);
            }else{
                toast.error( response.data.message || "Some error occured");
            }
        } catch (error) {
            toast.error( error?.response?.data?.message || error.message || "Some error occured");
        }
    }

  return (
    <div className='w-full h-90 flex items-center justify-center'>

        <Button onClick={accept} className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer">Accept Invitation</Button>

    </div>
  )
}

export default AcceptInvite
