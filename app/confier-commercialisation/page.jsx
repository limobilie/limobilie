'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/confier-commercialisation.css'

export default function ConfierCommercialisationPage() {
  return (
    <div className="confier-page">
      <Header />

      <main>
        {/* SECTION HERO */}
        <section className="hero-commercial">
          <Image
            src="/images/confie-bien.png"
            alt="Confier la commercialisation"
            fill
            className="hero-img-bg"
            priority
          />
          <div className="hero-overlay-commercial">
            <div className="hero-title-container">
              <h1>Confier la commercialisation de votre bien ?</h1>
            </div>
          </div>
        </section>

        {/* SECTION INTRODUCTIVE */}
        <section className="section-intro">
          <div className="intro-container">
           <div className="intro-text">
                <h2>Vendez votre bien plus vite et au meilleur prix avec <strong>Limobilié</strong></h2>
                <p className="subtitle">
                  L'expertise immobilière nouvelle génération à Abidjan.
                </p>

                <p>
                  Vous souhaitez vendre une villa, un appartement ou un terrain ? Chez <strong>Limobilié</strong>, nous ne nous contentons pas de lister votre bien ; nous le propulsons sur le marché. En tant que spécialistes locaux, nous combinons une maîtrise parfaite du terrain avec des outils digitaux innovants pour garantir une transaction fluide et sécurisée.
                </p>

                <h3>Pourquoi choisir Limobilié pour votre vente ?</h3>
                <ul>
                  <li>
                    <strong>Visibilité Maximale :</strong> Nous utilisons des supports marketing premium (photos pro, réseaux sociaux, réseaux d'investisseurs) pour attirer les meilleurs acheteurs.
                  </li>
                  <li>
                    <strong>Transparence Totale :</strong> Suivez l'avancement de votre vente en temps réel grâce à notre <strong>plateforme online exclusive</strong>. Vous savez exactement où on en est, de la première visite à la signature.
                  </li>
                  <li>
                    <strong>Gestion Clé en Main :</strong> Nous nous occupons de tout : rédaction des contrats, vérification administrative et coordination avec les notaires. 
                  </li>
                </ul>

                <p className="call-to-action">
                  Votre projet mérite l'excellence.
                </p>

                <p className="contact-info">
                  <strong>Contactez votre expert Limobilié dès aujourd'hui :</strong><br />
                  <strong>+225 05 45 93 56 73</strong>
                </p>
              </div>
            <div className="intro-image">
              <Image
                src="/images/equipe.jpeg"
                alt="Notre équipe à votre service"
                width={600}
                height={450}
                className="img-responsive-team"
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
      </main>

      <Footer />
    </div>
  )
}