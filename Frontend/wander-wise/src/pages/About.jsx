import Navbar from '../components/landingComponents/Navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Compass, Globe, Map, Users } from 'lucide-react'

const features = [
    {
        icon: Compass,
        title: 'Plan Your Trip',
        description: 'Create detailed itineraries for your adventures with day-by-day planning and activity scheduling.'
    },
    {
        icon: Map,
        title: 'Manage Baggage',
        description: 'Keep track of what to pack for each trip with organized baggage lists and categories.'
    },
    {
        icon: Users,
        title: 'Collaborate',
        description: 'Invite friends and family to collaborate on trip planning and share the excitement.'
    },
    {
        icon: Globe,
        title: 'Explore Destinations',
        description: 'Discover new places and get inspired for your next adventure around the world.'
    }
]

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-24 pb-16 px-4 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                            <Compass className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">About WanderWise</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Your ultimate travel companion for planning, organizing, and sharing amazing travel experiences.
                        </p>
                    </div>

                    {/* Mission Statement */}
                    <Card className="mb-12">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                WanderWise was created to make travel planning simple, enjoyable, and collaborative.
                                We believe that the best trips start with great planning, and we're here to help you
                                create unforgettable memories. Whether you're a solo traveler, a couple, or a group
                                of friends, WanderWise has everything you need to plan your perfect adventure.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Features Grid */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <feature.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <Card className="bg-blue-600 text-white">
                        <CardContent className="p-8 text-center">
                            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Adventure?</h2>
                            <p className="text-blue-100 mb-6">
                                Join thousands of travelers who trust WanderWise to plan their perfect trips.
                            </p>
                            <a
                                href="/register"
                                className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Get Started for Free
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default About
