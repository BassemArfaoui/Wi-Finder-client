import React from 'react'
import Hero from './Hero'
import Footer from './Footer'

function Home() {
  return (
    <div className='h-100 position-relative overflow-y-hidden'>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Home