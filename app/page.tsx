'use client'

import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Link from "next/link";
import Image from 'next/image'
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa'
import SEO_KEYWORDS, { MESSAGES_VIDEO } from '../data/seo'
import '../styles/page-acceuil.css'

export default function AccueilPage() {
  return (
    <div className="acceuil-page">
      <Header />

      {/* HERO VIDEO SECTION */}
      <section className="acceuil-image">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/video-acceuil.mp4" type="video/mp4" />
        </video>

        <div className="class-acceuil hero-overdlay">
          <h1>AGENCE IMMOBILIÈRE À ABIDJAN</h1>
          <h2 id='titre-2'>ENSEMBLE, CONSTRUISONS L’AVENIR</h2>
          <h2>Vente · Location · Gestion Immobilière · Aménagement · Conseils</h2>

          <div className="social-icons">
            <a href="https://youtube.com/@limobilie?si=Q_G4FCcjsH08d3xi" target="_blank" rel="noopener noreferrer" className="youtube" aria-label="YouTube">
              <FaYoutube size={28} />
            </a>
            <a href="https://www.facebook.com/share/1DEKHno3b9/" target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook">
              <FaFacebook size={28} />
            </a>
            <a href="https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==" target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram">
              <FaInstagram size={28} />
            </a>

            <a href="https://wa.me/2250545935673" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              <FaWhatsapp size={28} />
              <span className="whatsapp-number">+225 0545935673</span>
            </a>
          </div>
        </div>

        {/* MESSAGES DÉFILANTS */}
        <div className="video-messages">
          {MESSAGES_VIDEO.map((msg, index) => (
            <span key={index}>{msg.toUpperCase()}</span>
          ))}
        </div>
      </section>

      {/* ZONE SEO INVISIBLE */}
      <div style={{ display: 'none' }}>
        {SEO_KEYWORDS.accueil.map((mot, index) => (
          <p key={index}>{mot}</p>
        ))}
      </div>

      {/* PRÉSENTATION MISE À JOUR (LIMOBILIÉ IMPACT) */}
      <section className="presentation-section">
        <div className="presentation-container">
          <div className="presentation-text">
            <h2>Votre Agence Immobilière de Confiance en Côte d’Ivoire</h2>
            
            <p>
              Au-delà de l’investissement, <strong>LIMOBILIÉ</strong> a créé <strong>LIMOBILIÉ Impact</strong>, 
              un programme d’aide sociale intégré à chaque vente de terrain.
            </p>
            
            <p>
              Grâce à ce programme, une partie de chaque transaction est consacrée à des actions sociales concrètes, 
              notamment le soutien aux <strong>enfants atteints de cancer</strong>, en partenariat avec 
              la <strong>TÉDIE ANGE FOUNDATION (TAF)</strong>.
            </p>

            <p>
              LIMOBILIÉ exerce dans le <strong>Grand Abidjan</strong> ainsi qu’à <strong>Yamoussoukro</strong>, 
              et propose des lots sécurisés, disposant de documents administratifs transparents, incluant :
            </p>
            
            <ul className="impact-feature-list">
              <li>Approbation administrative</li>
              <li>ACD (Arrêté de Concession Définitive)</li>
            </ul>

            <p className="impact-conclusion">
              👉 <strong>Acheter un terrain devient ainsi un acte utile et responsable</strong>, 
              qui contribue à sauver des vies tout en sécurisant votre avenir foncier.
            </p>

            <div className="presentation-contact">
              <span style={{ color: 'black', fontWeight: 'bold' }}>📞 Service Client :</span>
              <a style={{color: 'red'}} href="tel:2250545935673">+225 05 45 93 56 73</a>
            </div>
          </div>

          <div className="presentation-image">
            <Image
              src="/images/agence334.png"
              alt="Expert conseil en immobilier Abidjan et BTP"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* SECTION TERRAINS */}
      <section className="terrains-section">
        <h2 style={{ color: 'black'}} className="terrains-title">Nos Terrains et Opportunités Immobilières</h2>
        <div className="terrains-grid">
            <div className="terrain-card">
                <Link href="/acheter">
                    <div className="terrain-image">
                      <Image
                        src="/images/terrain1.jpg"
                        alt="Vente terrain avec ACD à Bingerville"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <h3 style={{ color: "black" }}>Terrain à Bingerville</h3>
                    <p className="card-seo-text">
                      Lots sécurisés pour projets résidentiels ou commerciaux dans la zone de Bingerville.
                    </p>
                </Link>
            </div>

            <div className="terrain-card">
              <Link href="/acheter">
                <div className="terrain-image">
                  <Image src="/images/terrain2.jpg" alt="Achat terrain viabilisé Bassam Côte d'Ivoire" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ color: 'black'}}>Terrain viabilisé à Bassam</h3>
                <p className="card-seo-text">Parcelles stratégiques à Grand-Bassam, idéales pour investissement locatif ou résidence.</p>
              </Link>
            </div>

            <div className="terrain-card">
              <Link href="/acheter">
                <div className="terrain-image">
                  <Image src="/images/terrain3.jpg" alt="Terrain résidentiel Anyama vente immobilier" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ color: 'black'}}>Terrain résidentiel à Anyama</h3>
                <p className="card-seo-text">Terrains plats et accessibles à Anyama, parfaits pour une construction immédiate.</p>
              </Link>
            </div>
        </div>
      </section>

      {/* SECTION POURQUOI NOUS CHOISIR */}
      <section className="last-section-pro">
        <h2 style={{ color: 'black'}} className="last-section-title">Pourquoi choisir notre expertise immobilière ?</h2>
        <div className="features-grid-pro">
          <div className="feature-card-pro">
            <span>🏠</span>
            <h3 style={{ color: 'black'}}>Biens de Qualité</h3>
            <p>Des terrains sécurisés et des appartements sélectionnés selon des critères rigoureux de fiabilité.</p>
          </div>
          <div className="feature-card-pro">
            <span>🧑‍💼</span>
            <h3 style={{ color: 'black'}}>Accompagnement Pro</h3>
            <p>De l'achat du terrain à la remise des clés, nous gérons toutes les étapes de votre projet.</p>
          </div>
          <div className="feature-card-pro">
            <span>📍</span>
            <h3 style={{ color: 'black'}}>Expertise Locale</h3>
            <p>Une présence forte sur le marché d'Abidjan pour dénicher les meilleures pépites foncières.</p>
          </div>
          <div className="feature-card-pro">
            <span>🏗️</span>
            <h3 style={{ color: 'black'}}>BTP et Design</h3>
            <p>Un service d'aménagement intérieur et de construction pour un projet clé en main.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}