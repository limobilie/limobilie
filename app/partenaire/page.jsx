'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/partenaire.css'
export default function PartenairesPage() {

  const partenaires = [
    {
      nom: 'Banque Atlantique',
      description: 'Partenaire financier pour vos projets immobiliers.',
      logo: '/images/partenaire1.png'
    },
    {
      nom: 'Entreprise BTP CI',
      description: 'Construction et rénovation de biens immobiliers.',
      logo: '/images/partenaire2.png'
    },
    {
      nom: 'Notaire Conseil',
      description: 'Sécurisation juridique de vos transactions.',
      logo: '/images/partenaire3.png'
    },
    {
      nom: 'Architecte Design',
      description: 'Architecture et aménagement intérieur.',
      logo: '/images/partenaire4.png'
    }
  ]

  return (
    <div className="partenaires-page">
      <Header />

      {/* HERO */}
      <section className="partenaires-hero">
        <Image
          src="/images/partenaire5.png"
          alt="Nos partenaires"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        <div className="partenaires-hero-overlay">
          <h1>Nos partenaires de confiance</h1>
          <p>Un réseau solide pour sécuriser et réussir vos projets immobiliers</p>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="partenaires-section">
        <div className="partenaires-grid">
          {partenaires.map((item, index) => (
            <div className="partenaire-card" key={index}>
              <div className="partenaire-logo">
                <Image
                  src={item.logo}
                  alt={item.nom}
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

      {/* CTA */}
      <section className="partenaires-cta">
        <h2>Vous souhaitez devenir partenaire ?</h2>
        <p>Contactez-nous pour construire ensemble des projets durables.</p>
        <a href="tel:0787026518" className="partenaires-btn">
          Nous contacter
        </a>
      </section>

      <Footer />
    </div>
  )
}
