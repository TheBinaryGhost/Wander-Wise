import CustomButton from '../shared/CustomButton'
import { NavLink } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

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

            <div onClick={logout}>
                <CustomButton text="Logout"/>
            </div>
            

        </div>
    </header>
  )
}

export default AppNavbar
