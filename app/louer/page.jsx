'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ComboSearch from '../components/ComboSearch'
import Image from 'next/image'
import { biens } from '../../data/loueData'
import '../../styles/loue.css'

export default function LouerPage() {
  const [filters, setFilters] = useState({
    offerType: 'location',
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

  // Reset l'index de l'image quand on ouvre un nouveau bien
  useEffect(() => {
    setActiveImg(0)
  }, [selectedBien])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const filteredBiens = biens.filter(bien => {
    const prix = parseInt(bien.prix?.replace(/[^0-9]/g, '')) || 0
    const matchOfferType = !filters.offerType ? true : (bien.offerType || '').toLowerCase() === filters.offerType.toLowerCase()
    const matchLocalisation = !filters.localisation || (bien.localisation || '').toLowerCase().includes(filters.localisation.toLowerCase())
    const matchBudget = !filters.budgetMax || prix <= parseInt(filters.budgetMax)
    const matchSearchText = !filters.searchText || (bien.titre || '').toLowerCase().includes(filters.searchText.toLowerCase())

    return matchOfferType && matchLocalisation && matchBudget && matchSearchText
  })

  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)
  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openWhatsApp = (bien) => {
    const message = encodeURIComponent(`Bonjour H&A Properties, je suis intéressé par la location de : ${bien.titre} (${bien.prix})`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />

      <div className="biens-hero-image">
        <Image src="/images/acheter.png" alt="Louer" fill style={{ objectFit: 'cover' }} priority />
        <div className="biens-hero-overlay">
          <h1>Biens à louer</h1>
          <p>Découvrez nos opportunités de location exclusives avec H&A Properties.</p>
        </div>
      </div>

      <div className="biens-search-container-louer">
        <ComboSearch filters={filters} onChange={handleFilterChange} />
      </div>

      <div className="biens-grid gallery-view">
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
                <span>{bien.pieces}</span> • <span>{bien.surface}</span>
              </div>
              <button className="btn-view-more">Voir les détails</button>
            </div>
          </div>
        ))}
      </div>

      {selectedBien && (
        <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
            
            <div className="modal-layout-grid">
              {/* GALERIE GAUCHE */}
              <div className="modal-gallery-side">
                <div className="main-display-image">
                  <Image 
                    src={selectedBien.imagesGallery ? selectedBien.imagesGallery[activeImg] : selectedBien.image} 
                    alt="Vue principale" 
                    fill 
                    style={{objectFit: 'cover'}} 
                  />
                </div>
                {selectedBien.imagesGallery && (
                  <div className="modal-thumbnails-list">
                    {selectedBien.imagesGallery.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`thumb-item ${activeImg === idx ? 'active' : ''}`}
                        onClick={() => setActiveImg(idx)}
                      >
                        <Image src={img} alt="miniature" fill style={{objectFit: 'cover'}} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* INFOS DROITE */}
              <div className="modal-info-side">
                <span className="modal-price">{selectedBien.prix}</span>
                <h2>{selectedBien.titre}</h2>
                <p className="modal-loc">📍 {selectedBien.localisation}</p>
                
                <div className="modal-features-grid">
                  <div className="feat"><strong>Surface</strong> {selectedBien.surface}</div>
                  <div className="feat"><strong>Pièces</strong> {selectedBien.pieces}</div>
                  <div className="feat"><strong>Chambres</strong> {selectedBien.chambres || 'N/A'}</div>
                  <div className="feat"><strong>Salles de bain</strong> {selectedBien.salleBain || 1}</div>
                </div>

                <div className="modal-desc-box">
                  <h4>Description</h4>
                  <p>{selectedBien.description}</p>
                </div>

                <div className="tags-container">
                  {selectedBien.piscine && <span>🏊 Piscine</span>}
                  {selectedBien.ascenseur && <span>🛗 Ascenseur</span>}
                  {selectedBien.stationnement && <span>🚗 Parking</span>}
                </div>

                <button className="btn-whatsapp-full" onClick={() => openWhatsApp(selectedBien)}>
                  Contacter sur WhatsApp
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
            onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  )
}