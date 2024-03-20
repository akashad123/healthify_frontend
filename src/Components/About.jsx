import React from 'react'
import about from '../Images/about.jpg'

function About() {
  return (
    <>
    <div id='about' className='about-main'>

        <div className='about-img'><img src={about}/></div>

        <div className='about-text'>
            <h1>About Us</h1>
            <p>
            Welcome to healthiFy, where healthcare meets compassion, and every patient is at the heart of our mission. Situated in the heart of [City/Town], we stand as a beacon of healing and hope, committed to redefining the healthcare experience.
            Founded with a vision to provide unparalleled medical services, we bring together a dedicated team of healthcare professionals and cutting-edge technology. Our commitment to excellence is evident in every aspect of our services, ensuring that you receive the highest standard of care.
            At the core of our values is compassion. We believe in treating each patient with dignity and respect, fostering an environment where empathy and understanding prevail. Our experienced physicians, nurses, and support staff are united in their dedication to providing personalized and comprehensive care.
            We are more than just a healthcare facility; it's a community partner. Actively engaged in initiatives to promote health and well-being, we aim to make a positive impact beyond our hospital walls.
            Our modern facilities are equipped with the latest advancements in medical technology, enabling accurate diagnostics, precise treatments, and successful outcomes. From primary care to specialized medical and surgical services, we offer a comprehensive range of healthcare options to meet the diverse needs of our community.
            Thank you for considering us for your healthcare needs. We look forward to being your trusted partner on your journey to wellness.
            </p>
        </div>

    </div>
    </>
  )
}

export default About