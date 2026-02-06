'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ComboSearch2 from '../components/ComboSearch2'
import Image from 'next/image'
import { supabase } from '@/lib/supabase' 
import '../../styles/client.css'

export default function LouerPage() {
  const [biensDb, setBiensDb] = useState([])
  const [loading, setLoading] = useState(true)
  const [appliedFilters, setAppliedFilters] = useState({ searchText: '' })
  const [selectedBien, setSelectedBien] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchBiens = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('biens_immobiliers')
          .select('*')
          .order('date_creation', { ascending: false })
        if (error) console.error("Erreur Supabase:", error.message)
        else setBiensDb(data || [])
      } catch (err) {
        console.error("Erreur système:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBiens()
  }, [])

  const handleFilterSubmit = (newFilters) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1)
  }

  const filteredBiens = biensDb.filter(bien => {
    const searchLower = appliedFilters.searchText.toLowerCase()
    return !appliedFilters.searchText || 
      (bien.titre || '').toLowerCase().includes(searchLower) ||
      (bien.commune || '').toLowerCase().includes(searchLower) ||
      (bien.quartier || '').toLowerCase().includes(searchLower)
  })

  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)

  const openWhatsApp = (bien) => {
    const message = encodeURIComponent(`Bonjour Limobilié, je suis intéressé par : ${bien.titre} à ${bien.commune} (${bien.prix} FCFA)`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />

      <main className="main-content">
        <div className="biens-hero-image">
          <Image src="/images/acheter.png" alt="Louer" fill style={{ objectFit: 'cover' }} priority unoptimized />
          <div className="biens-hero-overlay">
            <h1>Biens à louer</h1>
            <p>Opportunités exclusives avec Limobilié.</p>
          </div>
        </div>

        <div className="biens-search-container-louer">
          <ComboSearch2 filters={appliedFilters} onChange={handleFilterSubmit} />
        </div>

        {loading ? (
          <div className="loading-state">Chargement...</div>
        ) : (
          <>
            <div className="biens-grid gallery-view">
              {currentBiens.map((bien) => (
                <div key={bien.id} className="biens-card" onClick={() => setSelectedBien(bien)}>
                  <div className="biens-image-container">
                    <Image src={bien.image_url || '/images/placeholder-bien.png'} alt={bien.titre} fill style={{ objectFit: 'cover' }} unoptimized />
                    <div className="card-badge">{bien.statut === 'valide' ? 'Dispo' : 'Attente'}</div>
                  </div>
                  <div className="biens-info">
                    <div className="biens-price">{parseFloat(bien.prix).toLocaleString()} F</div>
                    <h3>{bien.titre}</h3>
                    <p className="loc-text">📍 {bien.commune}</p>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL (POPUP) */}
      {selectedBien && (
        <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
            <div className="modal-layout-grid">
              <div className="modal-gallery-side">
                <div className="main-display-image">
                  <Image src={selectedBien.image_url || '/images/placeholder-bien.png'} alt="Vue" fill style={{objectFit: 'cover'}} unoptimized />
                </div>
              </div>
              <div className="modal-info-side">
                <span className="modal-price">{parseFloat(selectedBien.prix).toLocaleString()} FCFA</span>
                <h2>{selectedBien.titre}</h2>
                <p className="modal-loc">📍 {selectedBien.commune}, {selectedBien.quartier}</p>
                <div className="modal-desc-box">
                    <p>{selectedBien.description || "Aucune description disponible."}</p>
                </div>
                <button className="btn-whatsapp-full" onClick={() => openWhatsApp(selectedBien)}>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}