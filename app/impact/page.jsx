'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import '../../styles/impact.css'

export default function LimobilieImpactPage() {
  return (
    <div className="impact-wrapper">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="impact-hero">
          <Image
            src="/images/impact-img.png" 
            alt="LIMOBILIÉ Impact"
            fill
            priority
            className="hero-img"
          />
          <div className="hero-impact">
            <div className="hero-text-impact">
              <h1>LIMOBILIÉ IMPACT</h1>
              <p>
                Un programme d’immobilier à impact social, porté par LIMOBILIÉ
                en partenariat avec TÉDIE ANGE FOUNDATION (TAF)
              </p>
            </div>
          </div>
        </section>





          {/* --- SECTION VIDÉOS D'IMPACT (Vidéo à gauche, Texte à droite) --- */}
            <section className="impact-video-top-section">
              
              {/* Vidéo 1 - Santé */}
              <div className="video-story-item">
                <div className="video-box">
                  <video 
                    controls 
                    preload="metadata" 
                    poster="/images/poster-sante.jpg"         
                    playsInline
                  >
                    <source src="/videos/impac1.mp4#t=0.5" type="video/mp4" />
                  </video>
                </div>
                <div className="video-desc">
                  <span className="impact-tag">Action Cœur</span>
                  <h3>Limobilié soutient la lutte contre le cancer infantile</h3>
                  <p>
                    Parce que chaque vie est précieuse, <strong>Limobilié</strong> s'engage : une partie des commissions de chaque transaction est reversée pour financer les soins et les traitements des enfants atteints de cancer. 
                  </p>
                  <p className="impact-slogan">
                    Ensemble, transformons l'immobilier en un espoir de guérison.
                  </p>
                </div>
              </div>

              {/* Vidéo 2 - Eau */}
              <div className="video-story-item">
                <div className="video-box">
                  <video 
                    controls 
                    preload="metadata" 
                    poster="/images/poster-eau.jpg"
                    playsInline
                  >
                    <source src="/videos/impac2.mp4#t=0.5" type="video/mp4" />
                  </video>
                </div>
                <div className="video-desc">
                  <span className="impact-tag">Engagement Social</span>
                  <h3>Don à l'Orphelinat de Bingerville</h3>
                  <p>
                    Plus qu'une entreprise, <strong>Limobilié</strong> est un acteur du cœur. Nous avons récemment soutenu l'Orphelinat de Bingerville par un don de vivres et de matériel essentiel pour améliorer le quotidien des enfants.
                  </p>
                  <p className="impact-slogan">
                    Parce que chaque achat chez nous contribue à offrir un sourire et un avenir à ceux qui en ont le plus besoin.
                  </p>
                </div>
              </div>

              {/* Vidéo 3 - Éducation */}
              <div className="video-story-item">
                <div className="video-box">
                  <video 
                    controls 
                    preload="metadata" 
                    poster="/images/poster-edu.jpg"
                    playsInline
                  >
                    <source src="/videos/impac3.mp4#t=0.5" type="video/mp4" />
                  </video>
                </div>
                <div className="video-desc">
                  <span className="impact-tag">Éducation</span>
                  <h3>Kits Scolaires & Écoles</h3>
                  <p>Parce que l'avenir se construit dès l'école, nous accompagnons la scolarisation des enfants en zone rurale.</p>
                </div>
              </div>

            </section>




        {/* PRESENTATION */}
        <section className="impact-container">
          <article className="main-card2">
            <section className="intro-section">
              <h2>1. Présentation Générale</h2>
              <p>
                LIMOBILIÉ Impact est une initiative stratégique de LIMOBILIÉ,
                visant à intégrer l’action sociale communautaire au cœur de chaque
                transaction immobilière. Chaque acquisition devient un acte
                d’impact social direct, mis en œuvre avec TÉDIE ANGE FOUNDATION (TAF).
              </p>
            </section>

            <section className="vision-section">
              <h2>2. Vision</h2>
              <p>
                Faire de l’immobilier un levier durable de transformation sociale.
                LIMOBILIÉ Impact ambitionne de créer de la valeur économique tout
                en générant un impact humain concret dans un cadre structuré et transparent.
              </p>
            </section>

            <section className="mission-section">
              <h2>3. Mission</h2>
              <p>
                La mission est de financer des actions sociales communautaires essentielles,
                via un pourcentage prélevé sur chaque vente immobilière, exécuté par TAF.
              </p>
            </section>

            <section className="promise-section">
              <h2>4. Promesse du programme</h2>
              <p>
                Chaque bien immobilier acquis contribue directement à sauver, améliorer ou transformer des vies.
                Chaque client devient à la fois investisseur immobilier et acteur du développement social.
              </p>
            </section>

            <section className="mechanism-section">
              <h2>5. Mécanisme opérationnel</h2>
              <h3>5.1. Principe financier</h3>
              <ul className="impact-list">
                <li>5% à 10% du montant de chaque transaction affecté au Fonds LIMOBILIÉ Impact</li>
                <li>Fonds dédié uniquement aux actions sociales</li>
              </ul>
              <h3>5.2. Gouvernance financière</h3>
              <ul className="impact-list">
                <li>Séparation stricte entre revenus commerciaux et fonds d’impact</li>
                <li>Suivi financier assuré par TAF</li>
                <li>Rapports d’utilisation périodiques</li>
              </ul>
            </section>

            <section className="axes-section">
              <h2>6. Axes d’impact prioritaires</h2>
              <ul className="impact-list">
                <li>Santé communautaire : soins, maternités rurales, accès aux soins de base</li>
                <li>Eau & assainissement : forages, eau potable, sensibilisation sanitaire</li>
                <li>Éducation & protection de l’enfance : scolarisation, fournitures, soutien éducatif</li>
                <li>Logement social d’urgence : réhabilitation de logements précaires, assistance aux familles vulnérables</li>
              </ul>
            </section>

            <section className="roles-section">
              <h2>7. Rôles et responsabilités</h2>
              <h3>7.1. Rôle de LIMOBILIÉ</h3>
              <ul className="impact-list">
                <li>Identification et commercialisation des biens immobiliers</li>
                <li>Intégration du programme LIMOBILIÉ Impact</li>
                <li>Communication et collecte des fonds</li>
              </ul>
              <h3>7.2. Rôle de TAF</h3>
              <ul className="impact-list">
                <li>Gestion opérationnelle des actions sociales</li>
                <li>Suivi et évaluation des impacts</li>
                <li>Respect de l’éthique et de la dignité des bénéficiaires</li>
              </ul>
            </section>

            <section className="transparency-section">
              <h2>8. Transparence & Traçabilité</h2>
              <ul className="impact-list">
                <li>Certificat LIMOBILIÉ Impact nominatif</li>
                <li>Rapport d’impact simplifié</li>
                <li>Photos, indicateurs et témoignages réguliers</li>
                <li>Communication publique des actions réalisées</li>
              </ul>
            </section>

            <section className="targets-section">
              <h2>9. Cibles stratégiques</h2>
              <ul className="impact-list">
                <li>La diaspora africaine</li>
                <li>Cadres et entrepreneurs</li>
                <li>Investisseurs à impact</li>
                <li>Entreprises engagées dans la RSE</li>
                <li>Organisations et institutions partenaires</li>
              </ul>
            </section>


            <section className="conclusion-section">
              <h2>10. Conclusion</h2>
              <p>
                LIMOBILIÉ Impact incarne une nouvelle génération de projets immobiliers :
                responsables, humains, mesurables et durables. Investir dans la terre,
                c’est aussi investir dans la vie.
              </p>
            </section>


            {/* --- SECTION APPEL À L'ACTION (CTA) --- */}
            <section className="impact-cta-area">
              <div className="cta-card">
                <div className="cta-content">
                  <h3>Prêt à faire la différence ?</h3>
                  <p>
                    Ne vous contentez pas d'acheter un terrain. Participez au changement. 
                    Chaque achat chez LIMOBILIÉ finance directement un projet social concret.
                  </p>
                  <Link href="/acheter" className="impact-btn">
                    Voir nos terrains et acheter
                  </Link>
                </div>
                <div className="cta-badge">
                  <span>10%</span>
                  <small>reversés à la TAF</small>
                </div>
              </div>
            </section>

          </article>
        </section>
      </main>

      <Footer />
    </div>
  )
}