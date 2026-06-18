import React from 'react'

const Footer = () => {
  return (
    <footer className='px-20 py-24 bg-blue-900 text-white'>
        <div className='grid grid-cols-2'>
            <div>
                <h2 className='text-5xl font-bold'>WanderWise</h2>
                <p className='mt-4 text-lg font-medium'>Contact</p>
                <p>+9779801234567</p>
                <p>+9779801234568</p>

                <p className='mt-4 text-lg font-medium'>Address</p>
                <p>Devkota Chowk, Biratnagar, Nepal</p>
            </div>
            
            <div className='flex gap-24'>
                <nav className='flex flex-col gap-4 [&>a]:text-xl [&>a]:hover:underline'>
                    <a href='/trips'>Trips</a>
                    <a href='/baggages'>Baggages</a>
                    <a href='/iteneraries'>Itineraries</a>
                    <a href='/login'>Login</a>
                </nav>

                <nav className='flex flex-col gap-4 [&>a]:text-xl [&>a]:hover:underline'>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/help">Help</a>
                </nav>
            </div>
        </div>
    </footer>
  )
}

export default Footer