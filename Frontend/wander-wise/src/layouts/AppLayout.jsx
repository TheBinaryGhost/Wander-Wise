import { Outlet } from 'react-router-dom'
import AppNavbar from '../components/shared/AppNavbar'

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
        <AppNavbar />
        <Outlet />
    </div>
  )
}

export default AppLayout
