'use client'

import { useState, useEffect } from 'react'
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
    searchText: ''
  })

  const [selectedBien, setSelectedBien] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setActiveImg(0)
  }, [selectedBien])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const filteredBiens = biens.filter(bien => {
    const prix = parseInt(bien.prix.replace(/[^0-9]/g, '')) || 0
    const matchOfferType = !filters.offerType ? true : bien.offerType.toLowerCase() === filters.offerType.toLowerCase()
    const matchLocalisation = !filters.localisation || bien.localisations.includes(filters.localisation)
    const matchBudget = !filters.budgetMax || prix <= parseInt(filters.budgetMax)
    const matchSearchText = !filters.searchText || bien.titre.toLowerCase().includes(filters.searchText.toLowerCase())

    return matchOfferType && matchLocalisation && matchBudget && matchSearchText
  })

  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)
  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openWhatsApp = (bien) => {
    const isOther = bien.offerType === 'autres';
    const actionText = isOther ? "commander" : "obtenir des détails sur";
    const message = encodeURIComponent(`Bonjour Limobilié, je souhaite ${actionText} : ${bien.titre} (${bien.prix})`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />

      <div className="biens-hero-image">
        <Image src="/images/acheter.png" alt="Biens" fill style={{ objectFit: 'cover' }} priority />
        <div className="biens-hero-overlay">
          <h1>Biens immobiliers</h1>
          <p>La sélection exclusive Limobilié.</p>
        </div>
      </div>

      <div className="biens-search-container">
        <ComboSearch filters={filters} onChange={handleFilterChange} />
      </div>

      <div className="biens-grid">
        {currentBiens.length > 0 ? (
          currentBiens.map((bien, index) => (
            <div key={index} className="biens-card" onClick={() => setSelectedBien(bien)}>
              <div className="biens-image-container">
                <Image src={bien.image} alt={bien.titre} fill style={{ objectFit: 'cover' }} />
                <div className="card-badge">{bien.offerType}</div>
              </div>
              <div className="biens-info">
                <div className="biens-price">{bien.prix}</div>
                <h3>{bien.titre}</h3>
                <p className="locat">📍 {bien.localisations.filter(l => l !== "").join(', ')}</p>
                <div className="biens-specs">
                  {bien.pieces && <span>{bien.pieces}</span>}
                  {bien.pieces && <span> • </span>}
                  <span>{bien.surface}</span>
                </div>
                <button className="btn-view-more">Voir les détails</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Aucun bien ne correspond à votre recherche.</p>
        )}
      </div>

      {selectedBien && (
        <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
            
            <div className="modal-layout-grid">
              {/* GAUCHE : Galerie */}
              <div className="modal-gallery-side">
                <div className="main-display-image">
                  <Image 
                    src={selectedBien.imagesGallery ? selectedBien.imagesGallery[activeImg] : selectedBien.image} 
                    alt="Vue principale" 
                    fill 
                    style={{objectFit: 'cover'}} 
                  />
                </div>
                {selectedBien.imagesGallery && selectedBien.imagesGallery.length > 1 && (
                  <div className="modal-thumbnails-list">
                    {selectedBien.imagesGallery.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`thumb-item ${activeImg === idx ? 'active' : ''}`}
                        onClick={() => setActiveImg(idx)}
                      >
                        <Image src={img} alt="thumb" fill style={{objectFit: 'cover'}} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DROITE : Infos adaptatives */}
              <div className="modal-info-side">
                <div className="sticky-info-header">
                  <span className="modal-price">{selectedBien.prix}</span>
                  <h2>{selectedBien.titre}</h2>
                  {selectedBien.localisations.some(l => l !== "") && (
                    <p className="modal-loc">📍 {selectedBien.localisations.filter(l => l !== "").join(', ')}</p>
                  )}
                </div>

                <div className="modal-features-grid">
                  <div className="feat">
                    <strong>{selectedBien.offerType === 'autres' ? 'Quantité / Taille' : 'Surface'}</strong> 
                    {selectedBien.surface}
                  </div>
                  {/* On n'affiche pièces/chambres que si elles existent (Habitations) */}
                  {selectedBien.pieces && selectedBien.pieces !== "" && selectedBien.pieces !== "N/A" && (
                    <div className="feat"><strong>Pièces</strong> {selectedBien.pieces}</div>
                  )}
                  {selectedBien.chambres > 0 && (
                    <div className="feat"><strong>Chambres</strong> {selectedBien.chambres}</div>
                  )}
                  {selectedBien.salleBain > 0 && (
                    <div className="feat"><strong>Douche</strong> {selectedBien.salleBain}</div>
                  )}
                </div>

                <div className="modal-desc-box">
                  <h4>Description</h4>
                  <p>{selectedBien.description}</p>
                </div>

                {/* Équipements : uniquement si c'est une habitation avec au moins un équipement */}
                {selectedBien.offerType !== 'autres' && (selectedBien.piscine || selectedBien.ascenseur || selectedBien.stationnement || selectedBien.balcon) && (
                  <div className="modal-amenities-tags">
                    <h4>Équipements & Services</h4>
                    <div className="tags-container">
                      {selectedBien.piscine && <span>🏊 Piscine</span>}
                      {selectedBien.ascenseur && <span>🛗 Ascenseur</span>}
                      {selectedBien.stationnement && <span>🚗 Parking</span>}
                      {selectedBien.balcon && <span>🏙️ Balcon</span>}
                      <span>🛡️ Sécurité 24h/7</span>
                    </div>
                  </div>
                )}

                <button className="btn-whatsapp-full" onClick={() => openWhatsApp(selectedBien)}>
                  {selectedBien.offerType === 'autres' ? 'Commander sur WhatsApp' : "Contacter l'agent sur WhatsApp"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => { setCurrentPage(i + 1); window.scrollTo(0, 500); }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  )
}