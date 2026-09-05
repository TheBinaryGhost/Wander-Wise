import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Plane, MapPin, Calendar } from 'lucide-react'

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20">
                    <Plane className="w-32 h-32 text-white transform rotate-45" />
                </div>
                <div className="absolute bottom-20 right-20">
                    <MapPin className="w-24 h-24 text-white" />
                </div>
                <div className="absolute top-1/2 left-1/4">
                    <Calendar className="w-16 h-16 text-white transform -rotate-12" />
                </div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
                    <Plane className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">Your Journey Starts Here</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Plan Your Perfect Trip with{' '}
                    <span className="text-blue-200">WanderWise</span>
                </h1>

                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Create detailed itineraries, track expenses, and collaborate with friends 
                    — all in one beautiful platform designed for modern travelers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                        <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg font-semibold">
                            Get Started Free
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                            Sign In
                        </Button>
                    </Link>
                </div>

                <div className="mt-16 flex items-center justify-center gap-8 text-blue-100">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>10,000+ Happy Travelers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>150+ Countries</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>4.9★ Rating</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero