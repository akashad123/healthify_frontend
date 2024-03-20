import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import specilaised from '../Images/specialised.jpg'
import cancer from '../Images/cancer.jpg'
import womens from '../Images/womens.jpg'
import rehabilitation from '../Images/rehabilitation.jpg'
import dental from '../Images/dental.jpg'
import surgery from '../Images/surgery.jpg'
import child from '../Images/child.jpg'
import mental from '../Images/mental.jpg'
import neuro from '../Images/neuro.jpg'

function Departments() {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

  return (
    <>
    <div className='container-fluid department'>

        <div className='dep-subhead'>
            <h1 className='heading2'>OUR DEPARTMENTS</h1>
            <a href="">View all deparments <i class="fa-solid fa-right-long"></i></a>
        </div>
        <div className='hrline'></div>
        <Carousel transitionDuration={1000} showDots={true} className='carousel' infinite={true} responsive={responsive}>
    
            <div>
                <img src={specilaised} height={'350px'} width={'100%'} />
                <h2>Specialized Medical Departments</h2>
            </div>
            <div>
                <img src={cancer} height={'350px'} width={'100%'} />
                <h2>Cancer Center</h2>
            </div>
            <div>
                <img src={womens} height={'350px'} width={'100%'} />
                <h2>Women's Health Department</h2>
            </div>
            <div>
                <img src={rehabilitation} height={'350px'} width={'100%'} />
                <h2>Rehabilitation Department</h2>
            </div>
            <div>
                <img src={dental} height={'350px'} width={'100%'} />
                <h2>Dental Department</h2>
            </div>
            <div>
                <img src={surgery} height={'350px'} width={'100%'} />
                <h2>Surgical Department</h2>
            </div>
            <div>
                <img src={child} height={'350px'} width={'100%'} />
                <h2>Paediatric Department</h2>
            </div>
            <div>
                <img src={mental} height={'350px'} width={'100%'} />
                <h2>Mental Health Department</h2>
            </div>
            <div>
                <img src={neuro} height={'350px'} width={'100%'} />
                <h2>Neurology Department</h2>
            </div>
        
        </Carousel>;
    </div>
    </>
  )
}

export default Departments