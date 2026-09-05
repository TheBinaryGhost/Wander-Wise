import React from 'react'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import About from '../components/landing/About'
import Testimonials from '../components/landing/Testimonials'
import Footer from '../components/landing/Footer'

const Landing = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Testimonials />
        <Footer />
    </div>
  )
}

export default Landing