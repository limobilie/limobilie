'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Image from 'next/image'
import '../../styles/notre-equipe.css'

export default function NotreEquipePage() {
  const equipe = [
    { nom: 'Jean Dupont', poste: 'Directeur', photo: '/images/membre1.jpg' },
    { nom: 'Marie Martin', poste: 'Responsable Marketing', photo: '/images/membre2.jpg' },
    { nom: 'Aliou Kouassi', poste: 'Agent Immobilier', photo: '/images/membre3.jpg' },
    // Ajoute ici autant de membres que tu veux
  ]

  return (
    <div className="notre-equipe-page">
      {/* HEADER */}
      <Header />

      {/* IMAGE DE FOND */}
      <div className="hero-image">
        <Image
          src="/images/acheter.webp"
          alt="Équipe"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="hero-overlay">
          <h1>Rencontrez notre équipe.</h1>
          <p>Nos conseillers mettent tout leur savoir-faire au service de votre satisfaction et vivent leur passion pour l’immobilier au quotidien.</p>
        </div>
      </div>
      


      {/* SECTION MEMBRES */}
      <div className="team-members">
        {equipe.map((membre, index) => (
          <div className="member-card" key={index}>
            <Image
              src={membre.photo}
              alt={membre.nom}
              width={200}
              height={200}
              className="member-photo"
            />
            <h3>{membre.nom}</h3>
            <p>{membre.poste}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
