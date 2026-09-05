import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import useAuth from './hooks/useAuth'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddTrip from './pages/trips/AddTrip'
import Trip from './pages/trips/Trip'
import EditTrip from './pages/trips/EditTrip'
import TripDetails from './pages/trips/TripDetails'
import AcceptInvite from './pages/trips/AcceptInvite'
import Baggage from './pages/baggage/Baggage'
import BaggageDetails from './pages/baggage/BaggageDetails'
import Itinerary from './pages/itinerary/Itinerary'
import AddItinerary from './pages/itinerary/AddItinerary'
import ItineraryDetails from './pages/itinerary/ItineraryDetails'
import EditItinerary from './pages/itinerary/EditItinerary'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const ProtectedRoutes = () => {
    const { token } = useAuth();

  try {
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken?.userId;

    if (!token || !userId) {
      return <Navigate to="/login" />;
    }

    if (decodedToken && decodedToken.exp) {
      const currentTime = Date.now() / 1000;
      if (currentTime > decodedToken.exp) {
        return <Navigate to="/login" />;
      }
    }

    return <AppLayout />;
  } catch (error) {
    console.error("Token validation failed:", error);
    return <Navigate to="/login" />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/trips/:tripId/invite/accept" element={<AcceptInvite />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trips/add" element={<AddTrip />} />
          <Route path="/trips" element={<Trip />} />
          <Route path="/trips/edit/:tripId" element={<EditTrip />} />
          <Route path="/trips/:tripId" element={<TripDetails />} />
          <Route path="/baggage" element={<Baggage />} />
          <Route path="/baggage/:tripId" element={<BaggageDetails />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/itinerary/add/:tripId" element={<AddItinerary />} />
          <Route path="/itinerary/:tripId" element={<ItineraryDetails />} />
          <Route path="/itinerary/edit/:tripId/:itineraryId" element={<EditItinerary />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
