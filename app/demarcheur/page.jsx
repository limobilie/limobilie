'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/demarcheur.css'

export default function DevenirDemarcheurPage() {

  const avantages = [
    {
      titre: 'Commissions attractives',
      texte: 'Gagnez des commissions motivantes sur chaque transaction conclue.'
    },
    {
      titre: 'Horaires flexibles',
      texte: 'Travaillez librement selon votre disponibilité et votre rythme.'
    },
    {
      titre: 'Accompagnement professionnel',
      texte: 'Nous vous formons et vous accompagnons sur le terrain.'
    },
    {
      titre: 'Opportunités illimitées',
      texte: 'Accédez à un large réseau de biens et de clients.'
    }
  ]

  return (
    <div className="demarcheur-page">
      <Header />

      {/* HERO */}
      <section className="demarcheur-hero">
        <Image
          src="/images/contact.webp"
          alt="Devenir démarcheur immobilier"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />

        <div className="demarcheur-hero-overlay">
          <h1>Devenez démarcheur immobilier</h1>
          <p>
            Rejoignez notre réseau et générez des revenus en apportant
            des biens et des clients.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="demarcheur-intro">
        <div className="demarcheur-intro-container">
          <h2>Pourquoi devenir démarcheur chez nous ?</h2>
          <p>
            Notre agence immobilière basée à Abidjan collabore avec des
            démarcheurs indépendants pour identifier des opportunités
            immobilières fiables : terrains, maisons, immeubles et clients.
          </p>
          <p>
            Que vous soyez étudiant, entrepreneur ou professionnel,
            vous pouvez démarrer sans expérience préalable.
          </p>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="demarcheur-avantages">
        <div className="demarcheur-grid">
          {avantages.map((item, index) => (
            <div className="demarcheur-card" key={index}>
              <h3>{item.titre}</h3>
              <p>{item.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="demarcheur-cta">
        <h2>Intéressé pour devenir démarcheur ?</h2>
        <p>
          Contactez-nous dès maintenant et commencez à collaborer
          avec une agence immobilière de confiance.
        </p>
        <a href="tel:0787026518" className="demarcheur-btn">
          Nous contacter
        </a>
      </section>

      <Footer />
    </div>
  )
}
