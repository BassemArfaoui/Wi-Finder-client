import React from 'react'
import Hero from './Hero'
import Footer from './Footer'

function Home() {
  return (
    <div className='h-100 position-relative overflow-y-hidden ' style={{backgroundColor:'rgba(139, 190, 232,0.5)'}}>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Home