'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ComboSearch from '../components/ComboSearch'
import Image from 'next/image'
import { biens } from '../../data/loueData'
import '../../styles/loue.css'

export default function LouerPage() {
  // 🔹 État des filtres
  const [filters, setFilters] = useState({
    offerType: 'location', // Défini sur location par défaut pour cette page
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

  const [selectedBien, setSelectedBien] = useState(null) // Pour la modale de détails
  const [viewType, setViewType] = useState('galerie')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    if ((newFilters.type || '').toLowerCase() === 'liste') setViewType('liste')
    else setViewType('galerie')
    setCurrentPage(1)
  }

  // =============================
  // FILTRAGE
  // =============================
  const filteredBiens = biens.filter(bien => {
    const prix = parseInt(bien.prix?.replace(/[^0-9]/g, '')) || 0
    const surface = parseInt(bien.surface?.replace(/[^0-9]/g, '')) || 0
    const pieces = parseInt(bien.pieces?.replace(/[^0-9]/g, '')) || 0

    const matchOfferType = !filters.offerType ? true : (bien.offerType || '').toLowerCase() === filters.offerType.toLowerCase()
    const matchLocalisation = !filters.localisation || (bien.localisation || bien.localisations || '').toString().toLowerCase().includes(filters.localisation.toLowerCase())
    const matchTypeBien = !filters.typeBien || (bien.titre || '').toLowerCase().includes(filters.typeBien.toLowerCase())
    const matchBudget = !filters.budgetMax || prix <= parseInt(filters.budgetMax)
    const matchSurface = !filters.surfaceMin || surface >= parseInt(filters.surfaceMin)
    const matchPieces = !filters.piecesMin || pieces >= parseInt(filters.piecesMin)
    
    // Options checkbox
    if (filters.piscine && !bien.piscine) return false
    if (filters.ascenseur && !bien.ascenseur) return false
    if (filters.stationnement && !bien.stationnement) return false

    const matchSearchText = !filters.searchText || 
      (bien.titre || '').toLowerCase().includes(filters.searchText.toLowerCase()) ||
      (bien.description || '').toLowerCase().includes(filters.searchText.toLowerCase())

    return matchOfferType && matchLocalisation && matchTypeBien && matchBudget && matchSurface && matchPieces && matchSearchText
  })

  // Pagination
  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)
  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openWhatsApp = (bien) => {
    const message = encodeURIComponent(`Bonjour H&A Properties, je suis intéressé par la location de : ${bien.titre} (${bien.prix})`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />

      {/* HERO */}
      <div className="biens-hero-image">
        <Image src="/images/acheter.png" alt="Louer" fill style={{ objectFit: 'cover' }} priority />
        <div className="biens-hero-overlay">
          <h1>Biens à louer</h1>
          <p>Découvrez nos opportunités de location exclusives avec H&A Properties.</p>
        </div>
      </div>

      {/* COMBO SEARCH */}
      <div className="biens-search-container-louer">
        <ComboSearch filters={filters} onChange={handleFilterChange} />
      </div>

      {/* RÉSULTATS */}
      {filteredBiens.length === 0 ? (
        <div className="no-results">
          ⚠️ Aucun bien ne correspond à votre recherche.
        </div>
      ) : (
        <>
          <div className={`biens-grid ${viewType === 'liste' ? 'list-view' : 'gallery-view'}`}>
            {currentBiens.map((bien, index) => (
              <div key={index} className="biens-card" onClick={() => setSelectedBien(bien)}>
                <div className="biens-image-container">
                  <Image src={bien.image} alt={bien.titre} fill style={{ objectFit: 'cover' }} />
                  <div className="card-badge">Location</div>
                </div>
                <div className="biens-info">
                  <div className="biens-price">{bien.prix}</div>
                  <h3>{bien.titre}</h3>
                  <p className="loc-text">📍 {bien.localisation}</p>
                  <div className="biens-specs">
                    <span>{bien.pieces} p.</span>
                    <span>{bien.surface}</span>
                    <span>{bien.chambres || 0} ch.</span>
                  </div>
                  <button className="btn-view-more">Voir les détails</button>
                </div>
              </div>
            ))}
          </div>

          {/* MODALE DE DÉTAILS (Comme sur Acheter) */}
          {selectedBien && (
            <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
              <div className="details-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
                <div className="modal-grid">
                  <div className="main-img-modal">
                    <Image src={selectedBien.image} alt={selectedBien.titre} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="modal-info-side">
                    <span className="modal-price">{selectedBien.prix}</span>
                    <h2>{selectedBien.titre}</h2>
                    <p className="modal-loc">📍 {selectedBien.localisation}</p>
                    <div className="modal-features">
                      <div><strong>Surface:</strong> {selectedBien.surface}</div>
                      <div><strong>Pièces:</strong> {selectedBien.pieces}</div>
                      <div><strong>Chambres:</strong> {selectedBien.chambres || 'N/A'}</div>
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
              <button 
                key={i} 
                onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }} 
                className={currentPage === i + 1 ? 'active' : ''}
              >
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