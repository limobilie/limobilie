'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/partenaire.css'

export default function PartenairesPage() {
  // État pour gérer le partenaire sélectionné dans la modale
  const [selectedPartenaire, setSelectedPartenaire] = useState(null);

  const partenaires = [
    {
      id: 1,
      nom: 'Storiz',
      description: 'STORIZ, bien plus qu’une marque de mode : une histoire que vous portez.',
      fullDescription: `STORIZ ne se contente pas de créer des vêtements ; elle donne vie à des récits. 
      Chaque pièce de la collection s’inspire du parcours inspirant d'une célébrité : ses débuts modestes, ses épreuves marquantes et ses victoires éclatantes. 
      
      Derrière chaque couture se cache une ambition et une leçon de vie. Porter STORIZ, ce n’est pas simplement s'habiller, c'est incarner une trajectoire, une vision et un mindset de réussite. 
      
      STORIZ transforme la mode en une mémoire vivante. Parce que si le style passe, les histoires, elles, marquent à jamais.`,
      logo: '/images/partenaire1.png',
      facebook: 'https://www.facebook.com/share/17Nzh5AWqS/'
    },
    {
      id: 2,
      nom: 'Limobilié Impact',
      description: 'L’immobilier au service de l’humain et de la solidarité.',
      fullDescription: `<strong>LIMOBILIÉ Impact</strong> est le programme d’engagement social de LIMOBILIÉ. 
      Il transforme chaque acquisition immobilière en une action sociale concrète.
    
      En partenariat avec la <strong>TÉDIE ANGE FOUNDATION</strong>, une partie de chaque transaction est directement reversée pour soutenir les <strong>enfants atteints de cancer</strong>. 
    
      👉 En achetant un lot chez LIMOBILIÉ, vous ne faites pas qu’investir dans la terre : vous sécurisez votre avenir foncier tout en contribuant activement à sauver des vies. 
     
      <strong>LIMOBILIÉ Impact :</strong> Construire un patrimoine, c'est aussi bâtir l'espoir.`,
      logo: '/images/partenaire2.png',
      facebook: 'https://www.facebook.com/share/1DEKHno3b9/'
    },





    {
      id: 3,
      nom: 'Tédie Ange Foundation',
      description: 'Une organisation humanitaire dédiée à la lutte contre la précarité.',
      fullDescription: `TÉDIE ANGE FOUNDATION est une organisation humanitaire fondée par <a href="https://www.facebook.com/share/1HLkSbMcR8/" target="_blank" style="color: #000; font-weight: 800; text-decoration: none;"> Monsieur TÉDIE ANGE</a>, basée à Abidjan, elle se consacre avec détermination à la lutte contre la pauvreté sous toutes ses formes.

      La fondation s’engage à soutenir les populations les plus vulnérables à travers des programmes sociaux, éducatifs et économiques à fort impact communautaire. 

      Portée par une vision profondément humaine et responsable, la fondation œuvre pour l’autonomisation, la dignité et la restauration de l’espoir. Elle privilégie des solutions durables et structurantes capables de transformer positivement et durablement les trajectoires de vie.`,
      logo: '/images/partenaire333.png',
      facebook: 'https://www.facebook.com/share/1HLkSbMcR8/'
    },
  ]

  const whatsappMessage = "Bonjour,%20je%20souhaiterais%20obtenir%20des%20informations%20pour%20devenir%20partenaire%20de%20LIMOBILIÉ."

  return (
    <div className="partenaires-page">
      <Header />

      <main>
        {/* SECTION HERO */}
        <section className="partenaires-hero">
          <Image
            src="/images/partenaire5.png"
            alt="Nos partenaires"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="partenaires-hero-overlay">
            <h1>Nos partenaires de confiance</h1>
            <p>Un réseau solide pour sécuriser et réussir vos projets immobiliers</p>
          </div>
        </section>

        {/* SECTION GRILLE PARTENAIRES */}
        <section className="partenaires-section">
          <div className="partenaires-grid">
            {partenaires.map((item) => (
              <div className="partenaire-card" key={item.id}>
                <div className="partenaire-logo-container">
                  <Image
                    src={item.logo}
                    alt={`Logo ${item.nom}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              
                <p>{item.description}</p>
                
                <div className="card-actions">
                  <button 
                    className="btn-see-more" 
                    onClick={() => setSelectedPartenaire(item)}
                  >
                    Voir plus
                  </button>
                  <a href={item.facebook} target="_blank" rel="noopener noreferrer" className="fb-link">
                    <span className="fb-icon">f</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODALE (POPUP) */}
        {selectedPartenaire && (
          <div className="modal-overlay" onClick={() => setSelectedPartenaire(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedPartenaire(null)}>&times;</button>
              
              <div className="modal-body">
                <div className="modal-logo">
                  <Image src={selectedPartenaire.logo} alt={selectedPartenaire.nom} width={120} height={80} style={{ objectFit: 'contain' }} />
                </div>
                <h2>{selectedPartenaire.nom}</h2>
                {/* Utilisation de dangerouslySetInnerHTML pour rendre le nom en gras/noir */}
                <p 
                  className="modal-desc-full"
                  dangerouslySetInnerHTML={{ __html: selectedPartenaire.fullDescription }}
                ></p>
                <div className="modal-footer">
                  <a href={selectedPartenaire.facebook} target="_blank" rel="noopener noreferrer" className="btn-fb-modal">Suivre sur Facebook</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION CTA */}
        <section className="partenaires-cta">
          <div className="cta-container">
            <h2>Vous souhaitez devenir partenaire ?</h2>
            <p>Rejoignez notre réseau et construisons ensemble des projets durables en Côte d'Ivoire.</p>
            <a 
              href={`https://wa.me/2250545935673?text=${whatsappMessage}`} 
              className="partenaires-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nous contacter maintenant
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}