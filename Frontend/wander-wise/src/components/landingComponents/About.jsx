import { MapPin, Users, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function About() {
  const features = [
    {
      icon: MapPin,
      title: 'Smart Trip Planning',
      description: 'Create detailed itineraries with ease using our intuitive planning tools.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Users,
      title: 'Collaborate with Friends',
      description: 'Invite friends and plan together in real-time with seamless collaboration.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Globe,
      title: 'Explore the World',
      description: 'Discover destinations and get personalized recommendations tailored to you.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: CheckCircle2,
      title: 'Stay Organized',
      description: 'Keep all your bookings, documents, and notes in one secure place.',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <section className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className='inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4'>
            About Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Choose WanderWise?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re revolutionizing the way people plan and manage their travel adventures. 
            With intuitive tools and seamless collaboration, we make trip planning effortless.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-lg text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
            To empower travelers around the world with intelligent tools that simplify trip planning, 
            foster meaningful connections, and create unforgettable travel experiences. We believe 
            that travel brings people together, and we&apos;re here to make every journey count.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
              Join WanderWise
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
