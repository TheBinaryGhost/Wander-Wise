import React from 'react'
import Navbar from '../components/landingComponents/Navbar'
import Hero from '../components/landingComponents/Hero'
import Features from '../components/landingComponents/Features'
import About from '../components/landingComponents/About'
import Testimonials from '../components/landingComponents/Testimonials'

const Landing = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Testimonials />
    </div>
  )
}

export default Landing