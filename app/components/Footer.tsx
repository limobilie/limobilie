'use client'

import '../../styles/Footer.css'
import { FaWhatsapp, FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa' // Importation FaFacebookF ajoutée
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer-page">
      <div className="footer-container">
        {/* Gauche : numéro de téléphone avec image */}
        <div className="footer-left">
          <div className="phone-wrapper">
            <Image
              src="/images/phone4.png"
              alt="Téléphone"
              width={24}
              height={24}
            />
            <span className="phone-number">+225 05 45 93 56 73</span>
          </div>
        </div>

        {/* Droite : icônes réseaux */}
        <div className="footer-right">
          <a href="https://www.facebook.com/share/1DEKHno3b9/" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="Facebook">
            <FaFacebookF size={24} />
          </a>
          
          <a href="https://wa.me/2250545935673" target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label="WhatsApp">
            <FaWhatsapp size={24} />
          </a>

          <a href="https://youtube.com/@limobilie?si=Q_G4FCcjsH08d3xi" target="_blank" rel="noopener noreferrer" className="youtube icon-circle" aria-label="YouTube">
            <FaYoutube size={24} />
          </a>
          
          <a href="https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==" target="_blank" rel="noopener noreferrer" className="instagram icon-circle" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Texte centré en dessous */}
      <div className="footer-bottom">
        <p style={{ color: 'white'}}>© 2026 LIMOBILIÉ. Tous droits réservés.</p>
        <p style={{ color: 'white'}}>✉ limobilie2025@gmail.com</p>
      </div>
    </footer>
  )
}