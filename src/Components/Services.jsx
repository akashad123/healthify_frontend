import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Typewriter from './Typewriter'

export default function Services() { 

    useEffect(()=>{
        AOS.init({duration:1500})
      },[])   

  return (
    <>
    <h1 className='heading1'>WHAT WE OFFER</h1>
    <div className='hrline'></div>
    
    <div id='services' className='services'>

    <div className="cards">
      <div><h1>OUR SERVICES</h1>
      </div>
      <div className='cards-flex'>
        <div className="text-card shadow" data-aos="slide-up">
        <i class="fa-solid fa-hospital"></i>
          <h3>Imaging&Diagnostic Services</h3>
          <p>Empowering precision in healthcare, our Imaging and Diagnostic Services utilize advanced technology to uncover insights for your well-being. From state-of-the-art imaging equipment to expert analysis, we are dedicated to providing accurate diagnostics swiftly. Your health journey is our priority, and our commitment to excellence shines through our modern diagnostic services.</p>
        </div>
        <div className="text-card shadow" data-aos="slide-up">
        <i class="fa-solid fa-user-doctor"></i>
        <h3>Specialized Procedures</h3>
          <p>Elevate your healthcare experience with our Specialized Procedures. Our expert medical team performs cutting-edge interventions, ensuring precision and effectiveness in treatments. From advanced surgeries to specialized medical techniques, we are dedicated to providing tailored solutions for your unique health needs, fostering a pathway to optimal well-being.</p>
        </div>
        <div className="text-card shadow" data-aos="slide-up">
        <i class="fa-solid fa-user-nurse"></i>
        <h3>Rehabilitation Services</h3>
          <p>Restore, rejuvenate, and reclaim your well-being with our Rehabilitation Services. Our expert team is dedicated to guiding your journey to recovery through personalized physical therapy, occupational therapy, and speech therapy. Experience compassionate care that empowers you to regain strength, mobility, fostering a healthier and more fulfilling life.</p>
        </div>
      </div>
    </div>

    <div className="cards">
      <div><h1>OUR SERVICES</h1></div>
      <div className='cards-flex'>
        <div className="text-card shadow" data-aos="slide-up">
        <i class="fa-solid fa-hospital"></i>
        <h3>24x7 Emergency Care</h3>
        <p>Experience peace of mind with our 24x7 Emergency Care services. Our dedicated team of highly trained medical professionals is ready to provide immediate and expert care, ensuring that you receive prompt attention and support during any medical emergency. Your health and well-being are our top priorities, and our round-the-clock emergency services are here to serve you in times of need</p>
        </div>
        <div className="text-card shadow" data-aos="slide-up">
        <i class="fa-solid fa-user-doctor"></i>
        <h3>Modern Laboratories</h3>
        <p>Step into the future of diagnostics with our modern laboratories. Equipped with cutting-edge technology and staffed by skilled professionals, our labs offer precise and swift analysis for accurate diagnoses. We are committed to delivering high-quality results, fostering innovation, and advancing healthcare through state-of-the-art laboratory services.</p>
        </div>
        <div className="text-card shadow" data-aos="slide-up">
        <i class="fa-solid fa-user-nurse"></i>
        <h3>Blood Bank</h3>
        <p>Ensuring a lifeline in times of need, our Blood Bank stands as a beacon of hope. Committed to saving lives, we maintain a secure and well-equipped facility, ready to provide timely and safe blood transfusions. Your health is our priority, and our Blood Bank plays a crucial role in delivering compassionate care during critical moments.</p>
        </div>
      </div>
    </div>

    </div>

    <Typewriter/>

    
    </>
  )
}
