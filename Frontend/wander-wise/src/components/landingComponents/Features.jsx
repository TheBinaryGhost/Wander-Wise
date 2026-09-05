import { MapPinned, Plane, Users, Wallet, ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

const Features = () => {

  const featuresData = [
    {
      icon: MapPinned,
      title: "Smart Itineraries",
      description: "Build organized travel plans with destinations, activities, schedules, and recommendations in one place.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Coordinate trips with friends, share updates, assign tasks, and manage decisions collaboratively.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Wallet,
      title: "Expense Tracking",
      description: "Monitor travel budgets, record shared expenses, split costs fairly, and avoid overspending.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Plane,
      title: "Booking Manager",
      description: "Keep flights, accommodations, and reservations organized with quick access throughout your journey.",
      color: "bg-orange-50 text-orange-600"
    }
  ]

  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <span className='inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4'>
            Features
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Everything You Need for the Perfect Trip
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            From planning to execution, WanderWise has all the tools to make your travel dreams a reality.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className='group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 bg-white'
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className='w-7 h-7' />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.description}
              </p>

              <Link to="/register" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group/link">
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='mt-16 text-center'>
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Start Planning Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Features