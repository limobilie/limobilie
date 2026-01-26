'use client'

import Header from './components/Header'
import Footer from './components/Footer'
import Image from 'next/image'
import { FaBars, FaTimes, FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa'
import '../styles/page-acceuil.css'

export default function AccueilPage() {
  return (
    <div className="acceuil-page">
      <Header />

      {/* HERO VIDEO */}
      <section className="acceuil-image">
        <video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source src="/videos/video-acceuil.mp4" type="video/mp4" />
</video>


        <div className="class-acceuil hero-overdlay">
          <h1>ENSEMBLE, CONSTRUISONS L’AVENIR</h1>
          <h2>Location · Vente · Gestion · Aménagement · Conseils</h2>

          {/* Réseaux sociaux sur la même ligne avec couleurs */}
          <div className="social-icons">
            <a href="https://youtube.com/toncompte" target="_blank" rel="noopener noreferrer" className="youtube">
              <FaYoutube size={28} />
            </a>
            <a href="https://facebook.com/toncompte" target="_blank" rel="noopener noreferrer" className="facebook">
              <FaFacebook size={28} />
            </a>
            <a href="https://instagram.com/toncompte" target="_blank" rel="noopener noreferrer" className="instagram">
              <FaInstagram size={28} />
            </a>

            {/* WhatsApp isolé avec numéro */}
            <a href="https://wa.me/0505050505" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              <FaWhatsapp size={28} />
              <span className="whatsapp-number">+225 05 05 05 05 05</span>
            </a>
          </div>
        </div>

         
         

        {/* Messages qui défilent */}
        <div className="video-messages">
          <h1>VENTE</h1>
          <h1>LOCATION</h1>
          <h1>VENTE</h1>
          <h1>TRAVAUX D'AMENAGEMENT</h1>
          <h1>BTP</h1>
          <h1>GESTION LOCATIVE</h1>
          <h1>ARCHITECTURE D'INTERIEURE</h1>
          
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="presentation-section">
        <div className="presentation-container">
          <div className="presentation-text">
            <h2>À propos de notre agence</h2>
            <p>
              Notre agence immobilière en <strong>Côte d’Ivoire</strong> accompagne
              particuliers et investisseurs dans leurs projets de
              <strong> vente</strong>, <strong>location</strong>,
              <strong> gestion immobilière</strong> et <strong>conseil</strong>.
            </p>
            <p>
              Grâce à notre parfaite connaissance du marché immobilier d’Abidjan,
              nous vous proposons des biens fiables et un accompagnement
              personnalisé à chaque étape.
            </p>
            <p>
              Notre priorité :
              <strong> confiance, transparence et satisfaction client</strong>.
            </p>

          <div className="presentation-contact">
            <span style={{ color: 'black' }}>📞 Contact :</span>
            <a href="tel:0787026518">0787 026 518</a>
          </div>

          </div>

          <div className="presentation-image">
            <Image
              src="/images/agence3.jpg"
              alt="Agence immobilière"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

        {/* SECTION ACHAT DE TERRAIN */}
        <section className="terrains-section">
          

          <div className="terrains-grid">
            <div className="terrain-card">
              <div className="terrain-image">
                <Image
                  src="/images/terrain1.jpg"
                  alt="Terrain à vendre - Bingerville"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Terrain à Bingerville</h3>
            </div>

            <div className="terrain-card">
              <div className="terrain-image">
                <Image
                  src="/images/terrain2.jpg"
                  alt="Terrain viabilisé - Bassam"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Terrain viabilisé à Bassam</h3>
            </div>

            <div className="terrain-card">
              <div className="terrain-image">
                <Image
                  src="/images/terrain3.jpg"
                  alt="Terrain résidentiel - Anyama"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Terrain résidentiel à Anyama</h3>
            </div>

            <div className="terrain-card">
              <div className="terrain-image">
                <Image
                  src="/images/terrain3.jpg"
                  alt="Terrain résidentiel - Anyama"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Terrain résidentiel à Anyama</h3>
            </div>

            <div className="terrain-card">
              <div className="terrain-image">
                <Image
                  src="/images/terrain3.jpg"
                  alt="Terrain résidentiel - Anyama"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Terrain résidentiel à Anyama</h3>
            </div>
            
            <div className="terrain-card">
              <div className="terrain-image">
                <Image
                  src="/images/terrain3.jpg"
                  alt="Terrain résidentiel - Anyama"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3>Terrain résidentiel à Anyama</h3>
            </div>

           

            

           

          </div>
        </section>


       


        {/* SECTION POUR TERMINER LA PAGE */}
        <section className="last-section-pro">
          <h2 className="last-section-title">Pourquoi nous choisir ?</h2>

          <div className="features-grid-pro">
            <div className="feature-card-pro">
              <span>🏠</span>
              <h3>Biens de qualité</h3>
              <p>Des propriétés soigneusement sélectionnées pour répondre à vos besoins.</p>
            </div>
            <div className="feature-card-pro">
              <span>🧑‍💼</span>
              <h3>Accompagnement personnalisé</h3>
              <p>Nous vous guidons à chaque étape de votre projet immobilier.</p>
            </div>
            <div className="feature-card-pro">
              <span>📍</span>
              <h3>Connaissance du marché</h3>
              <p>Une expertise locale pour trouver le bien parfait rapidement.</p>
            </div>
            <div className="feature-card-pro">
              <span>💬</span>
              <h3>Satisfaction client</h3>
              <p>Notre priorité : votre confiance et votre satisfaction.</p>
            </div>
          </div>

          
        </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
