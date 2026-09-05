import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Button } from './ui/button'
import { LogOut, Menu, X, Compass, User } from 'lucide-react'
import { useState } from 'react'

const AppNavbar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-2 text-base font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-8">
        <Link to="/dashboard" className="flex items-center gap-2 mr-8">
          <Compass className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">WanderWise</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 flex-1">
          <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/trips" className={navLinkClass}>Trips</NavLink>
          <NavLink to="/baggage" className={navLinkClass}>Baggage</NavLink>
          <NavLink to="/itinerary" className={navLinkClass}>Itinerary</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <NavLink to="/profile" className={navLinkClass}>
            <User className="h-4 w-4 mr-1 inline" />
            Profile
          </NavLink>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <button
          className="md:hidden ml-auto p-2 rounded-md hover:bg-accent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-1">
          <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/trips" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Trips</NavLink>
          <NavLink to="/baggage" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Baggage</NavLink>
          <NavLink to="/itinerary" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Itinerary</NavLink>
          <NavLink to="/profile" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
            <User className="h-4 w-4 mr-2 inline" />
            Profile
          </NavLink>
          <div className="pt-2 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default AppNavbar
