'use client'

import '../../styles/Footer.css'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer-page">
      <div className="footer-container">
        {/* Gauche : numéro de téléphone avec image */}
        <div className="footer-left">
          <div className="phone-wrapper">
            <Image
              src="/images/phone4.png"  // chemin vers ton image
              alt="Téléphone"
              width={24}                // largeur de l'image
              height={24}               // hauteur de l'image
            />
            <span className="phone-number">+225 05 45 93 56 73</span>
          </div>
        </div>

        {/* Droite : icônes réseaux */}
        <div className="footer-right">
          <a href="https://www.facebook.com/share/1DEKHno3b9/" target="_blank" rel="noopener noreferrer" className="icon-circle">
            <FaFacebookF />
          </a>
          <a href="https://wa.me/2250545935673" target="_blank" rel="noopener noreferrer" className="icon-circle">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Texte centré en dessous */}
      <div className="footer-bottom">
        <p style={{ color: 'white'}}>© 2026 HA-IMMO. Tous droits réservés.</p>
        <p style={{ color: 'white'}}>✉ limobilie2025@gmail.com</p>
      </div>
    </footer>
  )
}
