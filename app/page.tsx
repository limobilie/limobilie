'use client'

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Link from "next/link";
import Image from 'next/image'
import { supabase } from '@/lib/supabase' 
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa'

import '../styles/page-acceuil.css'

export default function AccueilPage() {
  const [latestBiens, setLatestBiens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data, error } = await supabase
          .from('biens_immobiliers')
          .select('*')
          .eq('statut', 'valide') 
          .order('date_creation', { ascending: false })
          .limit(3)

        if (error) {
          console.error("Erreur Supabase:", error.message)
        } else {
          setLatestBiens(data || [])
        }
      } catch (err) {
        console.error("Erreur chargement accueil:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [])

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
            <a href="https://youtube.com/@limobilie?si=Q_G4FCcjsH08d3xi" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={28} />
            </a>
            <a href="https://www.facebook.com/share/1DEKHno3b9/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={28} />
            </a>
            <a href="https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={28} />
            </a>
            <a href="https://wa.me/2250545935673" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              <FaWhatsapp size={28} />
              <span className="whatsapp-number">+225 0545935673</span>
            </a>
          </div>
        </div>
      </section>

      {/* PRÉSENTATION LIMOBILIÉ IMPACT */}
      <section className="presentation-section">
        <div className="presentation-container">
          <div className="presentation-text">
            <h2>Votre Agence Immobilière de Confiance en Côte d’Ivoire</h2>
            <p>Au-delà de l’investissement, <strong>LIMOBILIÉ</strong> a créé <strong>LIMOBILIÉ Impact</strong>.</p>
          </div>

          <div className="presentation-image">
            <Image
              src="/images/agence334.png"
              alt="Agence Limobilié"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* MAISONS À LOUER */}
      <section className="terrains-section">
        <h2 className="terrains-title">Nos maisons disponibles à la location</h2>
        <div className="terrains-grid">
          {loading ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Chargement...</p>
          ) : latestBiens.length > 0 ? (
            latestBiens.map((bien) => (
              <div key={bien.id} className="terrain-card">
                <Link href="/client">
                  <div className="terrain-image">
                    <Image
                      src={bien.image_url || '/images/placeholder-bien.png'}
                      alt={bien.titre || 'Annonce'}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '15px' }}>
                    <strong style={{ color: '#ff0000' }}>
                      {bien.prix ? parseFloat(bien.prix).toLocaleString() : 0} F CFA
                    </strong>
                    <h3>{bien.titre}</h3>
                    <p>📍 {bien.commune}, {bien.quartier}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Aucun bien disponible</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
