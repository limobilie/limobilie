'use client'

import React from 'react'
import { FaFacebookF, FaWhatsapp, FaLinkedinIn} from 'react-icons/fa'
import '../../styles/SocialIcons.css'

const SocialIcons: React.FC = () => {
  return (
    <div className="social-icons">
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
      </a>
      <a href="https://wa.me/2250708278135" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn />
      </a>
      
    </div>
  )
}

export default SocialIcons
