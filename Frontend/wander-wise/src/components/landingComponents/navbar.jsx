import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Compass } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="px-6 md:px-12 py-4 fixed top-0 z-30 bg-white/90 backdrop-blur-md w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <Compass className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">WanderWise</h1>
            </Link>

            {/* Navigation */}
            <div className='flex items-center gap-8'>
                <nav className='hidden md:flex items-center gap-6'>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <Button variant="ghost" className="font-medium">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="bg-blue-600 hover:bg-blue-700 font-medium">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar