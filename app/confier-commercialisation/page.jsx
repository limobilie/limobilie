'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/confier-commercialisation.css'

export default function ConfierCommercialisationPage() {
  return (
    <div className="confier-page">
      <Header />

      {/* SECTION HERO */}
      <section className="hero-image">
        <Image
          src="/images/confie-com.webp"
          alt="Confier la commercialisation"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="hero-overlay">
          <h1>Confier la commercialisation de votre bien ?</h1>
          <p>Faites confiance à notre expertise pour vendre ou louer rapidement et au meilleur prix.</p>
        </div>
      </section>

      {/* SECTION INTRODUCTIVE */}
      <section className="section-intro">
        <div className="intro-container">
          <div className="intro-text">
            <h2>Vendre son bien à Abidjan et alentours avec H&A Properties, votre spécialiste local</h2>
            <p>
              Chez H&A Properties, nous vous offrons un service de commercialisation de votre bien immobilier, alliant disponibilité et expertise. Grâce à notre profonde connaissance du marché et des attentes clients, nous apportons une valeur ajoutée à chaque étape de votre projet.
            </p>
            <p>
              Nous simplifions votre gestion administrative en vous fournissant un accès à une plateforme online pour un suivi en temps réel, la rédaction des contrats, et la coordination avec les parties prenantes.
            </p>
            <p>
              En outre, nous optimisons la valeur de votre bien avec des supports marketing innovants. Contactez-nous au <strong>07 08 27 81 35</strong> dès maintenant pour commercialiser votre bien à Abidjan.
            </p>
          </div>
          <div className="intro-image">
            <Image
              src="/images/equipe.jpeg"
              alt="Notre équipe à votre service"
              width={600}
              height={450}
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* SECTION POURQUOI NOUS */}
      <section className="section-explique">
        <div className="container">
          <h2>Pourquoi nous confier votre bien ?</h2>
          <p className="intro-p">Notre équipe met à votre disposition son savoir-faire pour assurer la meilleure commercialisation.</p>
          <div className="points">
            <div className="point">
              <h3>Expertise locale</h3>
              <p>Nos agents connaissent parfaitement le marché immobilier d'Abidjan et de sa région.</p>
            </div>
            <div className="point">
              <h3>Visibilité maximale</h3>
              <p>Votre bien sera présenté sur nos plateformes et auprès de réseaux de clients qualifiés.</p>
            </div>
            <div className="point">
              <h3>Accompagnement</h3>
              <p>Nous vous guidons à chaque étape cruciale, de l'estimation initiale à la signature finale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FINALE */}
      <section className="final-section">
        <div className="final-container">
          <h2>Prêt à confier votre bien ?</h2>
          <p>Contactez-nous dès aujourd'hui et laissez nos experts s'occuper de tout.</p>
          <button className="cta-button">Confier mon bien maintenant</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}