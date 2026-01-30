'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/rapports-immobiliers.css'

export default function RapportsImmobiliersPage() {
  const [activeReport, setActiveReport] = useState(null);

  const rapports = [
    {
      id: 1,
      titre: "Analyse du Marché - Abidjan 2025",
      description: "Étude complète sur l'évolution des prix au m² à Cocody, Marcory et Assinie.",
      icon: "📊",
      pdfUrl: "/documents/analyse-marche-2026.pdf",
      content: (
        <div className="report-detail">
          <h2>Analyse du Marché Côte d’Ivoire 2025</h2>
          <p>Voici une analyse claire et structurée du marché immobilier en Côte d’Ivoire en 2025...</p>
          <h3>🏙️ 1. Taille et perspectives du marché global</h3>
          <p>👉 En 2025, le marché immobilier ivoirien est important et en croissance, avec une valeur estimée à environ <strong>377,62 milliards USD</strong>. D’ici 2029, il pourrait atteindre 459,6 milliards USD (+5% / an).</p>
          <h3>📈 2. Dynamique régionale : Abidjan en tête</h3>
          <p><strong>🔝 Abidjan :</strong> Secteurs haut de gamme (Cocody, Marcory, Riviera). Prix entre 1 200 000 et 1 500 000 FCFA/m².</p>
          <h3>🏡 3. Segments de marché principaux</h3>
          <p><strong>Immobilier résidentiel :</strong> Dominant avec 335,5 milliards USD en 2025. Forte demande pour le moderne.</p>
          <h3>🌍 4. Facteurs clés</h3>
          <p>✅ Croissance du PIB et digitalisation. ⚠️ Accès difficile au crédit pour les primo-accédants.</p>
        </div>
      )
    },
    {
      id: 2,
      titre: "Guide de l'Investisseur",
      description: "Tout savoir sur la fiscalité immobilière et les zones à fort potentiel de rendement.",
      icon: "💡",
      pdfUrl: "/documents/guide-investisseur-2025.pdf",
      content: (
        <div className="report-detail">
          <h2>📘 GUIDE DE L’INVESTISSEUR IMMOBILIER - 2025</h2>
          <h3>1️⃣ Pourquoi investir ?</h3>
          <p>Urbanisation rapide, déficit de logements et rendements supérieurs à la moyenne africaine.</p>
          <h3>2️⃣ Grandes zones d’investissement</h3>
          <ul>
            <li><strong>Abidjan :</strong> Cocody/Riviera (Sécurité), Marcory (Premium), Bingerville (Spéculation).</li>
            <li><strong>Villes secondaires :</strong> Bouaké, San Pedro, Yamoussoukro.</li>
          </ul>
          <h3>3️⃣ Budget & Stratégies</h3>
          <p>De 5M FCFA (périphérie) à +100M FCFA (Promotion immobilière).</p>
          <table className="report-table">
            <thead>
              <tr><th>Zone</th><th>Rendement</th></tr>
            </thead>
            <tbody>
              <tr><td>Haut Standing</td><td>5 – 7 %</td></tr>
              <tr><td>Villes secondaires</td><td>8 – 14 %</td></tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 3,
      titre: "Rapport Juridique",
      description: "Sécurisation foncière : comprendre l'ACD et les étapes clés de l'achat.",
      icon: "⚖️",
      pdfUrl: "/documents/rapport-juridique-2025.pdf",
      content: (
        <div className="report-detail">
          <h2>📑 RAPPORT JURIDIQUE - 2025</h2>
          <h3>I. OBJET DU RAPPORT</h3>
          <p>Analyser le cadre juridique applicable aux investissements immobiliers en Côte d’Ivoire.</p>
          <h3>II. TYPOLOGIE DES DROITS</h3>
          <p><strong>ACD (Arrêté de Concession Définitive) :</strong> Le titre le plus sécurisé. Confère un droit de propriété définitif.</p>
          <h3>III. PROCÉDURE LÉGALE</h3>
          <ol>
            <li>Vérification du titre foncier.</li>
            <li>Signature devant notaire (obligatoire).</li>
            <li>Mutation officielle.</li>
          </ol>
          <div className="warning-box">⚠️ Toute vente sans notaire est juridiquement fragile.</div>
        </div>
      )
    }
  ]

  return (
    <div className="rapports-page">
      <Header />

      <div className="hero-image">
        <Image src="/images/rapport123.png" alt="Rapports" fill style={{ objectFit: 'cover' }} priority />
        <div className="hero-content">
          <h1>Rapports & Analyses Immobilières</h1>
          <p>Éclairez vos décisions d'investissement avec nos données exclusives sur le marché ivoirien.</p>
        </div>
      </div>

      <section className="intro-section">
        <div className="container">
          <h2>Votre boussole sur le marché immobilier</h2>
          <p>Chez <strong>Limobilié</strong>, nous transformons les données en opportunités.</p>
        </div>
      </section>

      <section className="reports-grid-section">
        <div className="container">
          <div className="reports-grid">
            {rapports.map((rpt) => (
              <div className="report-card" key={rpt.id}>
                <div className="report-icon">{rpt.icon}</div>
                <h3>{rpt.titre}</h3>
                <p>{rpt.description}</p>
                <button className="btn-download" onClick={() => setActiveReport(rpt)}>Consulter l'analyse</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALE D'AFFICHAGE */}
      {activeReport && (
        <div className="modal-overlay" onClick={() => setActiveReport(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setActiveReport(null)}>×</button>
            <div className="modal-scroll-area">
              {activeReport.content}
            </div>
            <div className="modal-footer">
               {/* BOUTON DE TÉLÉCHARGEMENT DIRECT */}
               <a 
                 href={activeReport.pdfUrl} 
                 download 
                 className="btn-download-pdf"
               >
                 📥 Télécharger le PDF Complet
               </a>
               <a href="https://wa.me/2250545935673" className="btn-whatsapp-outline">Parler à un expert</a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}