'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/faire-gerer-bien.css'

export default function NotreEquipePage() {
  // État pour la modale
  const [activeService, setActiveService] = useState(null)

  const services = [
    {
      id: 1,
      titre: 'Gestion locative complète',
      image: '/images/bien1.jpg',
      description: 'Nous prenons en charge l’ensemble de la gestion de vos biens locatifs : recherche de locataires, rédaction des contrats, encaissement des loyers et suivi administratif.',
      details: 'Notre expertise inclut : \n• Étude de solvabilité des locataires.\n• État des lieux rigoureux.\n• Gestion des impayés et contentieux.\n• Rapports de gérance mensuels.'
    },
    {
      id: 2,
      titre: 'Gestion d’immeubles',
      image: '/images/bien2.jpg',
      description: 'Confiez-nous la gestion technique et financière de vos immeubles. Nous assurons l’entretien, le suivi des charges et la valorisation de votre patrimoine.',
      details: 'Nous gérons pour vous : \n• Entretien des parties communes.\n• Coordination des travaux de rénovation.\n• Négociation des contrats d’assurance.\n• Optimisation des charges de copropriété.'
    },
    {
      id: 3,
      titre: 'Biens commerciaux',
      image: '/images/bien3.jpg',
      description: 'Nous accompagnons les propriétaires de locaux commerciaux avec une gestion adaptée aux exigences professionnelles et à la rentabilité du bien.',
      details: 'Services spécifiques : \n• Rédaction de baux commerciaux.\n• Révision des loyers selon les indices.\n• Gestion des dépôts de garantie.\n• Conseil en stratégie immobilière.'
    },
  ]

  // Fonction pour envoyer sur WhatsApp
  const handleWhatsApp = (serviceTitre) => {
    const phone = "2250545935673"
    const message = encodeURIComponent(`Bonjour H&A Properties, je souhaite avoir plus d'informations concernant le service : ${serviceTitre}`)
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <div className="faire-gerer-bien">
      <Header />

      <main>
        {/* SECTION HERO */}
        <div className="hero-image">
          <Image 
            src="/images/bien101.png" 
            alt="Gestion immobilière" 
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
          />
          <div className="hero-overlay">
            <h1>Faites-nous confiance pour gérer vos biens efficacement</h1>
          </div>
        </div>

        {/* SECTION SERVICES */}
        <section className="biens-section">
          <div className="biens-container">
            {services.map((service, index) => (
              <div key={service.id} className={`bien-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="bien-image">
                  <Image 
                    src={service.image} 
                    alt={service.titre} 
                    width={650} 
                    height={450} 
                    className="img-fluid" 
                  />
                </div>
                <div className="bien-text">
                  <h2>{service.titre}</h2>
                  <p>{service.description}</p>
                  <button className="btn-details" onClick={() => setActiveService(service)}>
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODALE (POPUP) */}
        {activeService && (
          <div className="modal-overlay" onClick={() => setActiveService(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveService(null)}>&times;</button>
              
              <h3>{activeService.titre}</h3>
              
              <div className="modal-body">
                <p className="main-desc">{activeService.description}</p>
                <div className="divider"></div>
                <p className="details-text">{activeService.details}</p>
              </div>

              <button 
                className="btn-contact-modal" 
                onClick={() => handleWhatsApp(activeService.titre)}
              >
                Nous contacter sur WhatsApp
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}