'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/blog.css'

export default function BlogPage() {

  const articles = [
    {
      titre: "Investir dans l’immobilier à Abidjan",
      extrait: "Découvrez les quartiers les plus rentables pour investir en toute sécurité.",
      image: "/images/blog1.jpg"
    },
    {
      titre: "Acheter un terrain : les erreurs à éviter",
      extrait: "Nos conseils pour éviter les pièges lors de l’achat d’un terrain.",
      image: "/images/terrain2.jpg"
    },
    {
      titre: "Pourquoi confier la gestion locative ?",
      extrait: "Gagnez du temps et sécurisez vos revenus locatifs.",
      image: "/images/bien1.jpg"
    },
    {
      titre: "Maison ou appartement : que choisir ?",
      extrait: "Analyse des avantages selon votre budget et vos objectifs.",
      image: "/images/blog4.jpg"
    },
    {
      titre: "Les documents essentiels pour acheter",
      extrait: "Tout savoir sur les papiers indispensables en Côte d’Ivoire.",
      image: "/images/blog5.jpg"
    },
    {
      titre: "Les tendances immobilières à Abidjan",
      extrait: "Les zones en plein essor et les nouvelles opportunités.",
      image: "/images/blog6.jpg"
    }
  ]

  return (
    <div className="blog-page">
      <Header />

      {/* HERO IMAGE */}
      <div className="hero-image">
        <Image
          src="/images/acceuil1.png"
          alt="Abidjan"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-overlay">
          <h1>Actualités & Conseils immobiliers</h1>
         <p>Tout savoir pour réussir vos projets en Côte d’Ivoire</p>

        </div>
      </div>

      {/* BLOG CARDS */}
      <section className="blog-section">
        <div className="blog-grid">
          {articles.map((article, index) => (
            <div className="blog-card" key={index}>
              <div className="blog-image">
                <Image
                  src={article.image}
                  alt={article.titre}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="blog-content">
                <h3>{article.titre}</h3>
                <p>{article.extrait}</p>
                <span className="blog-link">Lire l’article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
