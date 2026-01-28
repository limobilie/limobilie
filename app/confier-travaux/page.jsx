'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/confier-travaux.css'

export default function ConfierTravauxPage() {

  const services = [
    {
      titre: 'Peinture intérieure & extérieure',
      images: ['/images/peinture1.jpg', '/images/peinture2.jpg', '/images/peinture3.jpg'],
      description: 'Finitions propres et durables pour maisons et bureaux.'
    },
    {
      titre: 'Décoration & aménagement',
      images: ['/images/deco1.jpg', '/images/deco2.jpg', '/images/deco3.jpg'],
      description: 'Optimisation de vos espaces avec élégance.'
    },
    {
      titre: 'Pose de carrelage',
      images: ['/images/carrelage1.jpg', '/images/carrelage2.jpg', '/images/carrelage3.jpg'],
      description: 'Carrelage moderne, précis et résistant.'
    },
    {
      titre: 'Staff & enduit',
      images: ['/images/staff1.jpg', '/images/staff2.jpg', '/images/staff3.jpg'],
      description: 'Plafonds et finitions haut de gamme.'
    },
    {
      titre: 'Rénovation & BTP',
      images: ['/images/btp1.jpg', '/images/btp2.jpg', '/images/btp3.jpg'],
      description: 'Travaux solides et bien planifiés.'
    },
  ]

  return (
    <div className="confier-travaux-page">
      <Header />

      <main>
        {/* SECTION HERO */}
        <section className="hero-image-confier">
          <Image
            src="/images/confie-com.png"
            alt="Travaux professionnels"
            fill
            className="hero-img"
            priority
          />
          <div className="hero-overlay-dark"></div>
          <div className="hero-confier">
            <div className="hero-content-wrapper">
              <h1>Confiez-nous vos travaux</h1>
              <p style={{color: 'white'}}> 
                BTP, décoration et rénovation réalisés par des professionnels qualifiés.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION SERVICES */}
        <section className="services-section">
          <div className="container-wide">
            <h2>Nos Services</h2>

            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  {/* SLIDER ANIMÉ */}
                  <div className="service-slider">
                    {service.images.map((img, i) => (
                      <div key={i} className="slide">
                        <Image src={img} alt={service.titre} fill style={{ objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>

                  {/* TEXTE SERVICE */}
                  <div className="service-content">
                    <h3>{service.titre}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}