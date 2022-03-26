import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

import './../css/Footer.css'


const Footer=() => {
  return (

    <footer className="bg-dark text-white mt-5">
      <div className="container">
        <div className="text-center">
          <div className='text-center pt-4 pb-3'>
            <span className='mx-3 footer_icons'><FontAwesomeIcon icon={faFacebook} /></span>
            <span className='mx-3 footer_icons'><FontAwesomeIcon icon={faInstagram} /></span>
            <span className='mx-3 footer_icons'><FontAwesomeIcon icon={faLinkedin} /></span>
          </div>

          <div className='pt-1'>Terms of use Privacy Policy</div>
          <p className='pb-2 pt-1 copyright'>&copy; 2022 DevFUM</p>


        </div>

      </div>
    </footer>

  )
}

export default Footer;