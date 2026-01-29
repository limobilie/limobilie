'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/partenaire.css'

export default function PartenairesPage() {

  const partenaires = [
    {
      nom: 'Storiz',
      description: 'Partenaire financier pour vos projets immobiliers.',
      logo: '/images/partenaire1.png'
    },
    {
      nom: 'Limobilié impact',
      description: 'Limobilié impact pour le bien de tous.',
      logo: '/images/partenaire2.png'
    },
    {
      nom: 'TAF',
      description: 'TEDIE ANGE FONDATION.',
      logo: '/images/partenaire3.png'
    }
  ]

  // Le message est encodé pour l'URL (espaces = %20)
  const whatsappMessage = "Bonjour,%20je%20souhaiterais%20obtenir%20des%20informations%20pour%20devenir%20partenaire%20de%20LIMOBILIÉ."

  return (
    <div className="partenaires-page">
      <Header />

      <main>
        {/* SECTION HERO */}
        <section className="partenaires-hero">
          <Image
            src="/images/partenaire5.png"
            alt="Nos partenaires de confiance"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="partenaires-hero-overlay">
            <h1>Nos partenaires de confiance</h1>
            <p>Un réseau solide pour sécuriser et réussir vos projets immobiliers</p>
          </div>
        </section>

        {/* SECTION GRILLE PARTENAIRES */}
        <section className="partenaires-section">
          <div className="partenaires-grid">
            {partenaires.map((item, index) => (
              <div className="partenaire-card" key={index}>
                <div className="partenaire-logo-container">
                  <Image
                    src={item.logo}
                    alt={`Logo ${item.nom}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3>{item.nom}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION APPEL À L'ACTION (CTA) */}
        <section className="partenaires-cta">
          <div className="cta-container">
            <h2>Vous souhaitez devenir partenaire ?</h2>
            <p>Rejoignez notre réseau et construisons ensemble des projets durables en Côte d'Ivoire.</p>
            {/* LIEN WHATSAPP AVEC MESSAGE AUTOMATIQUE */}
            <a 
              href={`https://wa.me/2250545935673?text=${whatsappMessage}`} 
              className="partenaires-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nous contacter maintenant
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}