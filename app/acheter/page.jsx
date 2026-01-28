'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ComboSearch from '../components/ComboSearch'
import Image from 'next/image'
import { biens } from '../../data/biensData'
import '../../styles/acheter.css'

export default function BiensPage() {
  const [filters, setFilters] = useState({
    offerType: 'vente',
    typeBien: '',
    localisation: '',
    budgetMax: '',
    surfaceMin: '',
    reference: '',
    piecesMin: '',
    chambresMin: '',
    salleBainMin: '',
    balcon: false,
    ascenseur: false,
    stationnement: false,
    pmr: false,
    piscine: false,
    searchText: ''
  })

  const [selectedBien, setSelectedBien] = useState(null) // Pour la modale
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // --- FILTRAGE ---
  const filteredBiens = biens.filter(bien => {
    const prix = parseInt(bien.prix.replace(/[^0-9]/g, '')) || 0
    const surface = parseInt(bien.surface.replace(/[^0-9]/g, '')) || 0
    const pieces = parseInt(bien.pieces.replace(/[^0-9]/g, '')) || 0

    const matchOfferType = !filters.offerType ? true : bien.offerType.toLowerCase() === filters.offerType.toLowerCase()
    const matchLocalisation = !filters.localisation || bien.localisations.includes(filters.localisation)
    const matchTypeBien = !filters.typeBien || bien.titre.toLowerCase().includes(filters.typeBien.toLowerCase())
    const matchBudget = !filters.budgetMax || prix <= parseInt(filters.budgetMax)
    const matchSurface = !filters.surfaceMin || surface >= parseInt(filters.surfaceMin)
    const matchSearchText = !filters.searchText || bien.titre.toLowerCase().includes(filters.searchText.toLowerCase())

    return matchOfferType && matchLocalisation && matchTypeBien && matchBudget && matchSurface && matchSearchText
  })

  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)
  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openWhatsApp = (bien) => {
    const message = encodeURIComponent(`Bonjour H&A Properties, je suis intéressé par le bien : ${bien.titre} (${bien.prix})`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />

      <div className="biens-hero-image">
        <Image src="/images/acheter.png" alt="Biens" fill style={{ objectFit: 'cover' }} priority />
        <div className="biens-hero-overlay">
          <h1>Biens en vente</h1>
          <p>Trouvez la propriété de vos rêves avec H&A Properties.</p>
        </div>
      </div>

      <div className="biens-search-container">
        <ComboSearch filters={filters} onChange={handleFilterChange} />
      </div>

      {filteredBiens.length === 0 ? (
        <div className="no-results">⚠️ Aucun bien ne correspond à votre recherche.</div>
      ) : (
        <>
          <div className="biens-grid">
            {currentBiens.map((bien, index) => (
              <div key={index} className="biens-card" onClick={() => setSelectedBien(bien)}>
                <div className="biens-image-container">
                  <Image src={bien.image} alt={bien.titre} fill style={{ objectFit: 'cover' }} />
                  <div className="card-badge">{bien.offerType}</div>
                </div>
                <div className="biens-info">
                  <div className="biens-price">{bien.prix}</div>
                  <h3>{bien.titre}</h3>
                  <p className="locat"><i className="pin"></i> {bien.localisations.join(', ')}</p>
                  <div className="biens-specs">
                    <span>{bien.pieces} p.</span>
                    <span>{bien.surface}</span>
                    <span>{bien.chambres} ch.</span>
                  </div>
                  <button className="btn-view-more">Voir les détails</button>
                </div>
              </div>
            ))}
          </div>

          {/* MODALE DE DÉTAILS */}
          {selectedBien && (
            <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
              <div className="details-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
                
                <div className="modal-grid">
                  <div className="modal-gallery">
                    <div className="main-img-modal">
                        <Image src={selectedBien.image} alt={selectedBien.titre} fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  
                  <div className="modal-info-side">
                    <span className="modal-price">{selectedBien.prix}</span>
                    <h2>{selectedBien.titre}</h2>
                    <p className="modal-loc">{selectedBien.localisations.join(', ')}</p>
                    
                    <div className="modal-features">
                        <div><strong>Surface:</strong> {selectedBien.surface}</div>
                        <div><strong>Pièces:</strong> {selectedBien.pieces}</div>
                        <div><strong>Chambres:</strong> {selectedBien.chambres}</div>
                    </div>

                    <div className="modal-description">
                        <h4>Description</h4>
                        <p>{selectedBien.description}</p>
                    </div>

                    <div className="modal-amenities">
                        {selectedBien.piscine && <span>🏊 Piscine</span>}
                        {selectedBien.ascenseur && <span>🛗 Ascenseur</span>}
                        {selectedBien.stationnement && <span>🚗 Parking</span>}
                    </div>

                    <button className="btn-whatsapp-bien" onClick={() => openWhatsApp(selectedBien)}>
                      Contacter l'agent sur WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGINATION */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => { setCurrentPage(i + 1); window.scrollTo(0, 500); }} className={currentPage === i + 1 ? 'active' : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}