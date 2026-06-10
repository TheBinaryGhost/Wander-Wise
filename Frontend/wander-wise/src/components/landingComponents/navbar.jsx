import React from 'react'

const navbar = () => {
  return (
    <header className="px-20 py-4 flex justify-between items-center">
        <div> 
            <h1 className="text-4xl font-semibold">WanderWise</h1> 
        </div>
        <div className='flex items-center gap-8'>
            <nav className='text-lg'>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </nav>

            <button className='bg-blue-500 px-4 py-1.5 rounded-sm text-white cursor-pointer hover:bg-blue-700'>
                Login
            </button>
        </div>
    </header>
  )
}

export default navbar