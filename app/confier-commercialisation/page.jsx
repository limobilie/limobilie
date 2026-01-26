'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/confier-commercialisation.css'

export default function ConfierCommercialisationPage() {
  return (
    <div className="confier-page">
      {/* HEADER */}
      <Header />

      {/* HERO IMAGE */}
      <div className="hero-image">
        <Image
          src="/images/confie-com.webp"
          alt="Confier la commercialisation"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="hero-overlay">
          <h1>Confier la commercialisation de votre bien ?</h1>
          <p>Faites confiance à notre expertise pour vendre ou louer rapidement et au meilleur prix.</p>
        </div>
      </div>

      {/* SECTION INTRODUCTIVE AVEC PHOTO */}
      <div className="section-intro">
        <div className="intro-container">
          <div className="intro-text">
            <h2>Vendre son bien à Abidjan et alentours avec H&A Properties, votre spécialiste local</h2>
            <p>
              Chez H&A Properties, nous vous offrons un service de commercialisation de votre bien immobilier, alliant disponibilité et expertise. Grâce à notre profonde connaissance du marché et des attentes clients, nous apportons une valeur ajoutée à chaque étape de votre projet, que ce soit en phase d'étude ou de travaux.
            </p>
            <p>
              Nous simplifions votre gestion administrative en vous fournissant un accès à une plateforme online pour un suivi en temps réel, la rédaction des contrats, et la coordination avec les parties prenantes. Notre réseau étendu d'agents locaux et internationaux assure la commercialisation de votre actif dans les meilleurs délais.
            </p>
            <p>
              En outre, nous optimisons la valeur de votre bien avec des supports marketing innovants. Cela assurant ainsi une visibilité maximale et un prix de vente optimisé. Contactez-nous au 07 08 27 81 35 dès maintenant pour commercialiser votre bien à Abidjan et alentours.
            </p>
          </div>
          <div className="intro-image">
            <Image
              src="/images/equipe.jpeg"
              alt="Commercialisation bien"
              width={500}
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      {/* SECTION EXPLICATIVE */}
      <div className="section-explique">
        <div className="container">
          <h2>Pourquoi nous confier votre bien ?</h2>
          <p>
            Notre équipe met à votre disposition son savoir-faire et son réseau pour assurer la meilleure commercialisation de votre bien.
          </p>
          <div className="points">
            <div className="point">
              <h3>Expertise locale</h3>
              <p>Nos agents connaissent parfaitement le marché immobilier de votre région.</p>
            </div>
            <div className="point">
              <h3>Visibilité maximale</h3>
              <p>Votre bien sera présenté sur nos plateformes et auprès de clients qualifiés.</p>
            </div>
            <div className="point">
              <h3>Accompagnement personnalisé</h3>
              <p>Nous vous guidons à chaque étape, de l'estimation à la signature.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION FINALE */}
      <div className="final-section">
        <div className="final-container">
          <h2>Prêt à confier votre bien ?</h2>
          <p>Contactez-nous dès aujourd'hui et laissez nos experts s'occuper de tout.</p>
          <button className="cta-button">Confier mon bien</button>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
