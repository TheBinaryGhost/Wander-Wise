import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardContent className="flex flex-col items-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                        <MapPin className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                    <p className="text-gray-500 mb-6">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/dashboard">
                        <Button>Back to Dashboard</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default NotFound
