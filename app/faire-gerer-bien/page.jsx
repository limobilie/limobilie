'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Image from 'next/image'
import '../../styles/faire-gerer-bien.css'

export default function NotreEquipePage() {
 

  return (
    <div className="faire-gerer-bien">
      {/* HEADER */}
      <Header />

      {/* IMAGE DE FOND */}
      <div className="hero-image">
        <Image
          src="/images/bien101.png"
          alt="Équipe"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="hero-overlay">
          <h1>Faites-nous confiance pour gérer vos biens efficacement</h1>
        </div>
      </div>
      
       {/* SECTION BIENS À GÉRER */}
<section className="biens-section">
  <div className="biens-container">

    {/* BIEN 1 */}
    <div className="bien-row">
      <div className="bien-image">
        <Image
          src="/images/bien1.jpg"
          alt="Gestion locative"
          width={500}
          height={350}
        />
      </div>
      <div className="bien-text">
        <h2>Gestion locative complète</h2>
        <p>
          Nous prenons en charge l’ensemble de la gestion de vos biens locatifs :
          recherche de locataires, rédaction des contrats, encaissement des loyers
          et suivi administratif.
        </p>
      </div>
    </div>

    {/* BIEN 2 */}
    <div className="bien-row reverse">
      <div className="bien-image">
        <Image
          src="/images/bien2.jpg"
          alt="Gestion immeuble"
          width={500}
          height={350}
        />
      </div>
      <div className="bien-text">
        <h2>Gestion d’immeubles</h2>
        <p>
          Confiez-nous la gestion technique et financière de vos immeubles.
          Nous assurons l’entretien, le suivi des charges et la valorisation
          de votre patrimoine.
        </p>
      </div>
    </div>

    {/* BIEN 3 */}
    <div className="bien-row">
      <div className="bien-image">
        <Image
          src="/images/bien3.jpg"
          alt="Gestion biens commerciaux"
          width={500}
          height={350}
        />
      </div>
      <div className="bien-text">
        <h2>Biens commerciaux</h2>
        <p>
          Nous accompagnons les propriétaires de locaux commerciaux
          avec une gestion adaptée aux exigences professionnelles
          et à la rentabilité du bien.
        </p>
      </div>
    </div>

  </div>
</section>



      {/* FOOTER */}
      <Footer />
    </div>
  )
}
