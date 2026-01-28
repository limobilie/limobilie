'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/rapports-immobiliers.css'

export default function RapportsImmobiliersPage() {
  const rapports = [
    {
      titre: "Analyse du Marché - Abidjan 2026",
      description: "Étude complète sur l'évolution des prix au m² à Cocody, Marcory et Assinie.",
      icon: "📊"
    },
    {
      titre: "Guide de l'Investisseur",
      description: "Tout savoir sur la fiscalité immobilière et les zones à fort potentiel de rendement.",
      icon: "💡"
    },
    {
      titre: "Rapport Juridique",
      description: "Sécurisation foncière : comprendre l'ACD et les étapes clés de l'achat.",
      icon: "⚖️"
    }
  ]

  return (
    <div className="rapports-page">
      <Header />

      {/* HERO SECTION */}
      <div className="hero-image">
        <Image
          src="/images/acheter.png" 
          alt="Rapports Immobiliers H&A"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="hero-content">
          <h1>Rapports & Analyses Immobilières</h1>
          <p>Éclairez vos décisions d'investissement avec nos données exclusives sur le marché ivoirien.</p>
        </div>
      </div>

      {/* SECTION INTRODUCTION */}
      <section className="intro-section">
        <div className="container">
          <h2>Votre boussole sur le marché immobilier</h2>
          <p>
            Chez <strong>H&A Properties</strong>, nous croyons que la transparence est la clé d'un projet réussi. 
            Nos experts analysent quotidiennement les tendances pour vous offrir des rapports précis et actionnables.
          </p>
        </div>
      </section>

      {/* GRID DES RAPPORTS */}
      <section className="reports-grid-section">
        <div className="container">
          <div className="reports-grid">
            {rapports.map((rpt, index) => (
              <div className="report-card" key={index}>
                <div className="report-icon">{rpt.icon}</div>
                <h3>{rpt.titre}</h3>
                <p>{rpt.description}</p>
                <button className="btn-download">Consulter l'analyse</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION APPEL À L'ACTION */}
      <section className="cta-expert">
        <div className="cta-box">
          <h2>Besoin d'une étude personnalisée ?</h2>
          <p>Vous avez un projet spécifique ? Nos analystes réalisent pour vous une étude de marché sur-mesure.</p>
          <a href="https://wa.me/2250545935673" className="btn-cta-red">Prendre rendez-vous avec un expert</a>
        </div>
      </section>

      <Footer />
    </div>
  )
}