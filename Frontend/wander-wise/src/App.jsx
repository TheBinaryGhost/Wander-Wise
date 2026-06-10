import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Landing /> } />
        <Route path="/About" element={ <About/> } />
        <Route path="/Contact" element={ <About/> } />
    </Routes>
    </BrowserRouter>
  )
}

export default App