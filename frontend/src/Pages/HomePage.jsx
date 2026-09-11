import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import About from '../Components/About'
import CTA from '../Components/CTA'
import Assistant from '../Components/Assistant'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <main>
    <HeroSection/>
    <About/>
    </main>
    <Assistant/>
    </>
  )
}

export default HomePage