'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/blog.css'

export default function BlogPage() {
  // État pour gérer l'ouverture de la modale
  const [selectedArticle, setSelectedArticle] = useState(null)

  const articles = [
    {
      id: 1,
      titre: "Investir dans l’immobilier à Abidjan",
      extrait: "Découvrez les quartiers les plus rentables pour investir en toute sécurité en 2026.",
      contenu: "Le marché immobilier d'Abidjan connaît une croissance sans précédent. En 2026, les zones comme Cocody Angré et la Riviera continuent de séduire, mais de nouvelles opportunités émergent à Anyama et Ebimpé grâce aux nouvelles infrastructures routières. Pour un investissement locatif réussi, privilégiez les petites surfaces (2-3 pièces) qui offrent un rendement moyen de 8% à 10%. Il est crucial de vérifier l'accès aux services de base et la proximité des futurs pôles économiques.",
      image: "/images/blog1.jpg",
      date: "28 Jan 2026",
      auteur: "Expert H&A"
    },
    {
      id: 2,
      titre: "Acheter un terrain : les erreurs à éviter",
      extrait: "Nos conseils d'experts pour éviter les pièges lors de l’achat d’un terrain en Côte d'Ivoire.",
      contenu: "L'achat d'un terrain est une étape cruciale. L'erreur la plus fréquente est de ne pas vérifier l'ACD (Arrêté de Concession Définitive) auprès du cadastre. Assurez-vous également que le terrain n'est pas situé dans une zone non constructible ou réservée aux infrastructures publiques. Nous conseillons toujours de réaliser une levée topographique contradictoire et de solliciter l'avis d'un notaire avant tout versement d'acompte.",
      image: "/images/terrain2.jpg",
      date: "20 Jan 2026",
      auteur: "Direction Juridique"
    },
    {
      id: 3,
      titre: "Pourquoi confier la gestion locative ?",
      extrait: "Gagnez du temps et sécurisez vos revenus locatifs grâce à un accompagnement professionnel.",
      contenu: "Confier votre bien à H&A Properties, c'est l'assurance d'une tranquillité d'esprit. Nous nous occupons de la sélection rigoureuse des locataires via une étude de solvabilité, de la rédaction des baux conformes à la législation en vigueur, du recouvrement des loyers et du suivi technique des travaux. En moyenne, un bien géré par nos soins présente un taux d'impayés inférieur à 2% grâce à notre suivi rigoureux.",
      image: "/images/bien1.jpg",
      date: "15 Jan 2026",
      auteur: "Service Gestion"
    },
    {
      id: 4,
      titre: "Maison ou appartement : que choisir ?",
      extrait: "Analyse complète des avantages selon votre budget et vos objectifs patrimoniaux.",
      contenu: "L'appartement est idéal pour un premier investissement locatif en centre-ville (Plateau, Marcory), offrant une liquidité rapide. La maison (villa), quant à elle, offre une meilleure plus-value à long terme et un cadre de vie très recherché par les familles expatriées et la classe moyenne supérieure. L'analyse de H&A montre que les villas duplex en cité sécurisée sont actuellement les produits les plus demandés à la Riviera.",
      image: "/images/blog4.jpg",
      date: "10 Jan 2026",
      auteur: "Conseil Patrimoine"
    },
    {
      id: 5,
      titre: "Les documents essentiels pour acheter",
      extrait: "ACD, Certificat de mutation, extraits topographiques : tout savoir sur les papiers.",
      contenu: "Pour toute transaction sécurisée en Côte d'Ivoire, vous devez impérativement exiger : l'Arrêté de Concession Définitive (ACD) original, le dossier technique topographique, le certificat d'urbanisme récent et l'attestation de non-litige. Le rôle du notaire est de séquestrer les fonds jusqu'à la vérification complète de la chaîne de propriété. Ne signez jamais sous seing privé sans conseil juridique.",
      image: "/images/blog5.jpg",
      date: "05 Jan 2026",
      auteur: "Expert Immobilier"
    },
    {
      id: 6,
      titre: "Les tendances immobilières à Abidjan",
      extrait: "Focus sur les zones en plein essor comme Anyama, Ebimpé et Bassam.",
      contenu: "La décentralisation du Grand Abidjan crée de nouveaux pôles de croissance. Bassam se transforme en cité balnéaire résidentielle haut de gamme, tandis qu'Anyama et Ebimpé profitent de l'effet 'Stade Olympique' et des nouvelles autoroutes. C'est le moment stratégique pour investir dans le foncier dans ces zones dont la valeur pourrait doubler d'ici 5 ans selon nos projections.",
      image: "/images/blog6.jpg",
      date: "01 Jan 2026",
      auteur: "Analyste Marché"
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
        {/* HERO SECTION */}
        <section className="hero-image">
          <Image
            src="/images/acceuil1.png"
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

        {/* GRILLE D'ARTICLES */}
        <section className="blog-section">
          <div className="blog-grid">
            {articles.map((article) => (
              <article 
                className="blog-card" 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
              >
                <div className="blog-image-container">
                  <Image
                    src={article.image}
                    alt={article.titre}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="blog-date-badge">{article.date}</div>
                </div>

                <div className="blog-content">
                  <h3>{article.titre}</h3>
                  <p>{article.extrait}</p>
                  <div className="blog-footer">
                    <button className="blog-btn">
                      Lire l’article <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* MODALE (POPUP) D'ARTICLE */}
        {selectedArticle && (
          <div className="blog-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="blog-close-btn" onClick={() => setSelectedArticle(null)}>
  &times;
</button>
              
              <div className="blog-modal-body">
                <div className="blog-modal-header-img">
                  <Image 
                    src={selectedArticle.image} 
                    alt={selectedArticle.titre} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div className="blog-modal-info">
                  <div className="blog-modal-meta">
                    <span className="meta-badge">Conseil</span>
                    <span className="meta-date">{selectedArticle.date} • Par {selectedArticle.auteur}</span>
                  </div>
                  <h2>{selectedArticle.titre}</h2>
                  <div className="blog-full-text">
                    <p>{selectedArticle.contenu}</p>
                  </div>
                  <div className="blog-modal-footer">
                    <button 
                      className="btn-whatsapp-expert" 
                      onClick={() => openWhatsApp(selectedArticle.titre)}
                    >
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