'use client'

import { useState } from 'react'
// Correction du chemin d'importation selon ta structure
import { supabase } from '../../lib/supabase' 
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/tontine.css'

export default function LimobilieTontinePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false) // État pour afficher/masquer le formulaire

  const handleSubscription = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = {
      nom_complet: e.target.nom.value,
      telephone: e.target.tel.value,
      numero_piece: e.target.piece.value,
      nombre_lots: parseInt(e.target.lots.value),
    }

    const { error } = await supabase
      .from('souscriptions')
      .insert([formData])

    if (error) {
      alert("Erreur : " + error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      const message = `Bonjour LIMOBILIÉ, je viens de souscrire à la tontine.\nNom: ${formData.nom_complet}\nLots: ${formData.nombre_lots}`
      setTimeout(() => {
        window.open(`https://wa.me/2250545935673?text=${encodeURIComponent(message)}`, '_blank')
      }, 2000)
    }
  }

  return (
    <div className="tontine-wrapper">
      <Header />
      <main>
        <section className="tontine-hero">
          <Image
            src="/images/tontine133.png" 
            alt="Infrastructure et Tontine Foncière"
            fill
            priority
            className="hero-img"
          />
          <div className="hero-tontine">
            <div className="hero-text-container">
              <div className="hero-text-tontine">
                <h1>LIMOBILIÉ TONTINE FONCIÈRE</h1>
                <p>Transformez votre contribution mensuelle en un patrimoine immobilier concret.</p>
              </div>
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
                <ul>
                  <li><strong>1.000.000 FCFA</strong> par personne</li>
                  <li>Cycle court de <strong>10 mois</strong></li>
                  <li>Transparence totale des flux</li>
                </ul>
              </section>

              <section className="info-box">
                <h3>La Machine D7</h3>
                <ul>
                  <li>Décapage et ouverture de voies</li>
                  <li>Viabilisation aux normes</li>
                  <li>Accélération administrative</li>
                </ul>
              </section>
            </div>

            <section className="delivery-section">
              <h2>Ce que vous recevez</h2>
              <div className="check-list">
                <div className="check-item">✅ 1 lot de terrain approuvé</div>
                <div className="check-item">✅ Localisation stratégique</div>
                <div className="check-item">✅ Documents juridiques conformes</div>
                <div className="check-item">✅ Terrain déjà valorisé</div>
              </div>
            </section>

            <section className="security-section">
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

            {/* SECTION BOUTON OU FORMULAIRE */}
            <section className="subscription-area" id="souscrire">
              {!showForm ? (
                <div className="btn-container-center">
                  <button className="subscribe-btn large-btn" onClick={() => setShowForm(true)}>
                    Souscrire maintenant
                  </button>
                </div>
              ) : (
                <div className="subscription-form-fade-in">
                  {success ? (
                    <div className="success-box">
                      <h3>✅ Souscription Envoyée !</h3>
                      <p>Vous allez être redirigé vers WhatsApp pour finaliser...</p>
                    </div>
                  ) : (
                    <div className="form-card-tontine">
                      <h2>Formulaire de Souscription</h2>
                      <form onSubmit={handleSubscription} className="tontine-form">
                        <div className="form-group">
                          <label>Nom complet *</label>
                          <input type="text" name="nom" placeholder="Nom et prénoms" required />
                        </div>
                        <div className="form-grid-fields">
                          <div className="form-group">
                            <label>WhatsApp *</label>
                            <input type="tel" name="tel" placeholder="0700000000" required />
                          </div>
                          <div className="form-group">
                            <label>N° CNI / Pièce *</label>
                            <input type="text" name="piece" placeholder="C00XXXXXX" required />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Nombre de lots (1.000.000 FCFA/unité)</label>
                          <input type="number" name="lots" min="1" defaultValue="1" required />
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="subscribe-btn" disabled={loading}>
                            {loading ? 'Envoi en cours...' : 'Confirmer ma souscription'}
                          </button>
                          <button type="button" className="cancel-link" onClick={() => setShowForm(false)}>
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="quote-section">
              <blockquote>
                “Votre argent ne dort pas. Il travaille, il creuse, il ouvre des routes… et devient votre terrain.”
              </blockquote>
              <p className="signature">L'équipe LIMOBILIÉ</p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}