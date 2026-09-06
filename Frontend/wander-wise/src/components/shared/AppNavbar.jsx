import CustomButton from '../shared/CustomButton'
import { NavLink } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { User } from 'lucide-react'

const AppNavbar = () => {

    const {logout} = useAuth();

  return (
    <header className="px-4 md:px-8 lg:px-20 py-4 fixed top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 w-full flex justify-between items-center">
        {/* left part */}
        <div>
            <h1 className="text-2xl md:text-4xl font-semibold text-amber-500">WanderWise</h1>
        </div>

        {/* right part  */}
        <div className='flex items-center gap-16'>
            <nav className='hidden md:block text-lg space-x-8'>
                <NavLink to={"/dashboard"} className={({isActive}) => isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-500 transition-colors"} >Dashboard</NavLink>
                <NavLink to={"/trips"} className={({isActive}) => isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-500 transition-colors"} >Trips</NavLink>
                <NavLink to={"/itinerary"} className={({isActive}) => isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-500 transition-colors"} >Itinerary</NavLink>
                <NavLink to={"/baggage"} className={({isActive}) => isActive ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-500 transition-colors"} >Baggage</NavLink>
            </nav>

            <div className="flex items-center gap-3">
                <NavLink to="/profile" className={({isActive}) => `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                </NavLink>
                <div onClick={logout}>
                    <CustomButton text="Logout"/>
                </div>
            </div>

        </div>
    </header>
  )
}

export default AppNavbar
