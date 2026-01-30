'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/blog.css'

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState(null)

  const articles = [
    {
      id: 1,
      titre: "Investir dans l’immobilier à Azagué",
      extrait: "Découvrez pourquoi Azaguié est la nouvelle pépite du Grand Abidjan en 2026.",
      contenu: `1. Pourquoi Azaguié peut être un bon choix pour investir
                 Localisation stratégique — Azaguié est une commune située dans le GRAND ABIDJAN, à l’est/sud d’Abidjan. Elle bénéficie d’un bon réseau routier, à 20 minutes  d’ABIDJAN via la Y4, proche de l’autoroute et de grands axes, des bus SOTRA , le metro, un aérodrome non loin y sont prevus, ce qui la rend accessible pour des projets résidentiels ou mixtes (résidence + commerce) à moindre coût comparé à Abidjan même. 
                  Développement peri-urbain — la zone est considérée comme en développement, avec une urbanisation progressive, ce qui peut faire monter la valeur des terrains et augmenter la demande locative à moyen terme. 

                  2. Aperçu des prix des terrains à Azaguié (2025–2026)
                  Les prix varient selon la taille du lot, la localisation précise et les documents disponibles 
                  Un terrain approuvé y coûte de 1.500.000 à 6.000.000f CFA selon la zone`,
      image: "/images/azague.png"
    },
    {
      id: 2,
      titre: "Investir dans l’immobilier à Abidjan",
      extrait: "Découvrez les quartiers les plus rentables pour investir en toute sécurité en 2026.",
      contenu: "Le marché immobilier d'Abidjan connaît une croissance sans précédent. En 2026, les zones comme Cocody Angré et la Riviera continuent de séduire, mais de nouvelles opportunités émergent à Anyama et Ebimpé grâce aux nouvelles infrastructures routières.\n\nPour un investissement locatif réussi, privilégiez les petites surfaces (2-3 pièces) qui offrent un rendement moyen de 8% à 10%. Il est crucial de vérifier l'accès aux services de base.",
      image: "/images/blog1.jpg"
    },
    {
      id: 3,
      titre: "Acheter un terrain : les erreurs à éviter",
      extrait: "Nos conseils d'experts pour éviter les pièges lors de l’achat d’un terrain en Côte d'Ivoire.",
      contenu: "L'achat d'un terrain est une étape cruciale. L'erreur la plus fréquente est de ne pas vérifier l'ACD (Arrêté de Concession Définitive) auprès du cadastre.\n\nAssurez-vous également que le terrain n'est pas situé dans une zone non constructible ou réservée aux infrastructures publiques. Nous conseillons toujours de réaliser une levée topographique contradictoire.",
      image: "/images/terrain11.png"
    },
    {
      id: 4,
      titre: "Pourquoi confier la gestion locative ?",
      extrait: "Gagnez du temps et sécurisez vos revenus locatifs grâce à un accompagnement professionnel.",
      contenu: "Confier votre bien à H&A Properties, c'est l'assurance d'une tranquillité d'esprit. Nous nous occupons de la sélection rigoureuse des locataires via une étude de solvabilité.\n\nNous gérons la rédaction des baux, le recouvrement des loyers et le suivi technique des travaux. En moyenne, un bien géré par nos soins présente un taux d'impayés inférieur à 2%.",
      image: "/images/bien1.png"
    }
  ]

  const openWhatsApp = (titre) => {
    const message = encodeURIComponent(`Bonjour H&A Properties, j'ai lu votre article "${titre}" et j'aimerais avoir plus de conseils.`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="blog-page">
      <Header />

      <main>
        <section className="hero-image">
          <Image
            src="/images/blog1235.png"
            alt="Actualités immobilières Abidjan"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-blog2">
            <h1>Actualités & Conseils immobiliers</h1>
            <p>Tout savoir pour réussir vos projets en Côte d’Ivoire</p>
          </div>
        </section>

        <section className="blog-section">
          <div className="blog-grid">
            {articles.map((article) => (
              <article 
                className="blog-card" 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
              >
                <div className="blog-image-container">
                  <Image src={article.image} alt={article.titre} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="blog-content">
                  <h3>{article.titre}</h3>
                  <p>{article.extrait}</p>
                  <div className="blog-footer">
                    <button className="blog-btn">Lire l’article <span className="arrow">→</span></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedArticle && (
          <div className="blog-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="blog-close-btn" onClick={() => setSelectedArticle(null)}>&times;</button>
              <div className="blog-modal-body">
                <div className="blog-modal-header-img">
                  <Image src={selectedArticle.image} alt={selectedArticle.titre} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="blog-modal-info">
                  <div className="blog-modal-meta"><span className="meta-badge">Conseil</span></div>
                  <h2 style={{ color: '#000000' }}>{selectedArticle.titre}</h2>
                  <div className="blog-full-text">
                    <p style={{ whiteSpace: 'pre-line' }}>{selectedArticle.contenu}</p>
                  </div>
                  <div className="blog-modal-footer">
                    <button className="btn-whatsapp-expert" onClick={() => openWhatsApp(selectedArticle.titre)}>
                      Poser une question à un expert sur WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}