'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/notre-equipe.css'

export default function NotreEquipePage() {
  const equipe = [
    { nom: 'TEDIE ANGE', poste: 'DIRECTEUR', numero: '+225 07 87 02 34 56', photo: '/images/photo1.jpeg' },
    { nom: 'ELIE GOUEROU', poste: 'Responsable Marketing', numero: '+225 05 45 93 56 73', photo: '/images/photo2.jpeg' }
    // ajoute d'autres membres ici
  ]

  const defaultPhoto = '/images/default-profile.jpg'

  return (
    <div className="notre-equipe-page">
      <Header />

      {/* HERO SECTION */}
      <div className="hero-image">
        <Image
          src="/images/equipe.jpeg"
          alt="Équipe"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 10%'
          }}
        />
        <div className="hero-overlay">
          <h1>Rencontrez notre équipe.</h1>
          <p>Nos conseillers mettent tout leur savoir-faire au service de votre satisfaction.</p>
        </div>
      </div>

      {/* SECTION MEMBRES */}
      <div className="team-container">
        <div className="team-members">
          {equipe.map((membre, index) => (
            <div className="member-card" key={index}>
              <div className="photo-wrapper">
                <Image
                  src={membre.photo ? membre.photo : defaultPhoto}
                  alt={membre.nom}
                  width={220}
                  height={220}
                  className="member-photo"
                />
              </div>
              <h3>{membre.nom}</h3>
              <p className="poste">{membre.poste}</p>
              <p className="phone">
                <Image
                  src="/images/phone1.png"
                  alt="Téléphone"
                  width={20}
                  height={20}
                  style={{ marginRight: '8px', verticalAlign: 'middle' }}
                />
                {membre.numero ? membre.numero : 'Non disponible'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION FINALE */}
      <section className="final-section">
        <div className="final-container">
          <h2>Notre engagement</h2>
          <p>Chez notre agence, nous plaçons la satisfaction de nos clients au cœur de notre métier.</p>
          <div className="final-points">
            <div className="point">
              <h3>✅ Accompagnement</h3>
              <p>Chaque client bénéficie d’un suivi adapté à ses besoins.</p>
            </div>
            <div className="point">
              <h3>✅ Biens de qualité</h3>
              <p>Nous sélectionnons uniquement des biens fiables.</p>
            </div>
            <div className="point">
              <h3>✅ Expertise locale</h3>
              <p>Notre connaissance d’Abidjan garantit les meilleures opportunités.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
