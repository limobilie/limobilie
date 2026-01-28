'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/tontine.css'

export default function LimobilieTontinePage() {
  return (
    <div className="tontine-wrapper">
      <Header />
      <main>
        <section className="tontine-hero">
          <Image
            src="/images/tontine13.png" 
            alt="Infrastructure et Tontine Foncière"
            fill
            priority
            className="hero-img"
          />
          <div className="hero-tontine">
            <div className="hero-text-content">
              <h1>LIMOBILIÉ TONTINE FONCIÈRE</h1>
              <p>Transformez votre contribution mensuelle en un patrimoine immobilier concret.</p>
            </div>
          </div>
        </section>

        <div className="tontine-container">
          <article className="main-card">
            <section className="intro-section">
              <h2>Le principe, simplement</h2>
              <p>
                Avec <strong>LIMOBILIÉ Tontine Infra</strong>, vous ne cotisez pas pour de l’argent liquide. 
                Vous investissez collectivement dans la puissance technique (machine D7) nécessaire à la création de valeur foncière.
              </p>
              <div className="result-badge">
                <span>👉</span> Résultat : au bout de 10 mois, chaque souscripteur reçoit un lot de terrain approuvé.
              </div>
            </section>

            <div className="details-grid">
              <section className="info-box">
                <h3>💰 Conditions</h3>
                <ul style={{ color: 'black' }}>
                  <li><strong>1.000.000 FCFA</strong> par personne</li>
                  <li>Cycle court de <strong>10 mois</strong></li>
                  <li>Transparence totale des flux</li>
                </ul>
              </section>

              <section className="info-box">
                <h3>La Machine D7</h3>
                <ul style={{ color: 'black' }}>
                  <li>Décapage et ouverture de voies</li>
                  <li>Viabilisation aux normes</li>
                  <li>Accélération administrative</li>
                </ul>
              </section>
            </div>

            <section className="delivery-section">
              <h2>Ce que vous recevez</h2>
              <div style={{ color: 'black' }} className="check-list">
                <div className="check-item">✅ 1 lot de terrain approuvé</div>
                <div className="check-item">✅ Localisation stratégique</div>
                <div className="check-item">✅ Documents juridiques conformes</div>
                <div className="check-item">✅ Terrain déjà valorisé</div>
              </div>
            </section>

            <section style={{ color: 'black' }} className="security-section">
              <h2>Sécurité & Transparence</h2>
              <div className="security-cards">
                <div className="s-card">
                  <h4>Contrat Notarié</h4>
                  <p>Sécurité juridique totale pour chaque membre.</p>
                </div>
                <div className="s-card">
                  <h4>Reporting Mensuel</h4>
                  <p>Suivez l'avancement réel sur le terrain.</p>
                </div>
              </div>
            </section>

            <section className="quote-section">
              <blockquote>
                “Votre argent ne dort pas. Il travaille, il creuse, il ouvre des routes… et devient votre terrain.”
              </blockquote>
              <p className="signature">L'équipe LIMOBILIÉ</p>
            </section>

            <div className="subscribe-section">
              <button className="subscribe-btn" onClick={() => alert('Page de souscription')}>
                Souscrire
              </button>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}