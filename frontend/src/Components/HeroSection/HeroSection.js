import React from 'react'
import video from "./pottery2.mp4"
import Button from '../Button/button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
        <video src={video} autoPlay loop muted />


    <div align="center" className='textoverlay'>
    <h1 className="H1">Carthage Cares
    </h1>      
    <h1 className="H2">Become a member of our team and choose your dream
    </h1>      

    <div style={{marginTop: '10px'}} >
    
<Button name="Learn More"> commandez</Button> 
    </div> </div> </div>
  )
}

export default HeroSection