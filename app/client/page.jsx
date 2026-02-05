'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ComboSearch from '../components/ComboSearch'
import Image from 'next/image'
import { supabase } from '@/lib/supabase' 
import '../../styles/client.css'

export default function LouerPage() {
  const [biensDb, setBiensDb] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    offerType: '', 
    typeBien: '',
    localisation: '',
    budgetMax: '',
    surfaceMin: '',
    searchText: ''
  })

  const [selectedBien, setSelectedBien] = useState(null)
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  // 1. Récupération des données depuis ta table SQL
  useEffect(() => {
    const fetchBiens = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('biens_immobiliers')
          .select('*')
          .order('date_creation', { ascending: false }) // Tri par ta colonne date_creation

        if (error) {
          console.error("Erreur Supabase:", error.message)
        } else {
          setBiensDb(data || [])
        }
      } catch (err) {
        console.error("Erreur système:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBiens()
  }, [])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // 2. Filtrage synchronisé avec tes colonnes SQL
  const filteredBiens = biensDb.filter(bien => {
    const prix = parseFloat(bien.prix) || 0
    
    // Recherche par texte (Titre, Commune ou Quartier)
    const searchLower = filters.searchText.toLowerCase()
    const matchSearchText = !filters.searchText || 
      (bien.titre || '').toLowerCase().includes(searchLower) ||
      (bien.commune || '').toLowerCase().includes(searchLower) ||
      (bien.quartier || '').toLowerCase().includes(searchLower)

    // Localisation (Commune)
    const matchLocalisation = !filters.localisation || 
      (bien.commune || '').toLowerCase().includes(filters.localisation.toLowerCase())

    // Budget
    const matchBudget = !filters.budgetMax || prix <= parseFloat(filters.budgetMax)

    // Type de bien
    const matchType = !filters.typeBien || bien.type_bien === filters.typeBien

    return matchSearchText && matchLocalisation && matchBudget && matchType
  })

  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)
  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openWhatsApp = (bien) => {
    const message = encodeURIComponent(`Bonjour Limobilié, je suis intéressé par : ${bien.titre} à ${bien.commune} (${bien.prix} FCFA)`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />

      <div className="biens-hero-image">
        <Image src="/images/acheter.png" alt="Louer" fill style={{ objectFit: 'cover' }} priority />
        <div className="biens-hero-overlay">
          <h1>Biens à louer</h1>
          <p>Découvrez nos opportunités de location exclusives avec Limobilié.</p>
        </div>
      </div>

      <div className="biens-search-container-louer">
        <ComboSearch filters={filters} onChange={handleFilterChange} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px', fontSize: '1.2rem', color: '#666' }}>
          Chargement des meilleures offres...
        </div>
      ) : (
        <>
          <div className="biens-grid gallery-view">
            {currentBiens.length > 0 ? (
              currentBiens.map((bien) => (
                <div key={bien.id} className="biens-card" onClick={() => setSelectedBien(bien)}>
                  <div className="biens-image-container">
                    <Image 
                      src={bien.image_url || '/images/placeholder-bien.png'} 
                      alt={bien.titre} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      unoptimized={true}
                    />
                    <div className="card-badge">{bien.statut === 'valide' ? 'Disponible' : 'En attente'}</div>
                  </div>
                  <div className="biens-info">
                    <div className="biens-price">{parseFloat(bien.prix).toLocaleString()} FCFA</div>
                    <h3>{bien.titre}</h3>
                    <p className="loc-text">📍 {bien.commune}, {bien.quartier}</p>
                    <div className="biens-specs">
                      <span>{bien.unites_locatives || '1'} Unité(s)</span> • <span>{bien.type_bien}</span>
                    </div>
                    <button className="btn-view-more">Voir les détails</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px' }}>
                <h3>Aucun bien ne correspond à votre recherche.</h3>
                <p>Réessayez en modifiant vos filtres.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
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
          )}
        </>
      )}

      {selectedBien && (
        <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
            <div className="modal-layout-grid">
              <div className="modal-gallery-side">
                <div className="main-display-image">
                  <Image 
                    src={selectedBien.image_url || '/images/placeholder-bien.png'} 
                    alt="Vue principale" 
                    fill 
                    style={{objectFit: 'cover'}} 
                    unoptimized={true}
                  />
                </div>
              </div>

              <div className="modal-info-side">
                <span className="modal-price">{parseFloat(selectedBien.prix).toLocaleString()} FCFA / mois</span>
                <h2>{selectedBien.titre}</h2>
                <p className="modal-loc">📍 {selectedBien.commune}, {selectedBien.quartier}</p>
                
                <div className="modal-features-grid">
                  <div className="feat"><strong>Type</strong> {selectedBien.type_bien}</div>
                  <div className="feat"><strong>Unités</strong> {selectedBien.unites_locatives || 'N/A'}</div>
                  <div className="feat"><strong>Document</strong> {selectedBien.type_document || 'Non spécifié'}</div>
                  <div className="feat"><strong>ID Lot</strong> {selectedBien.num_lot || 'N/A'}</div>
                </div>

                <div className="modal-desc-box">
                  <h4>Description</h4>
                  <p>{selectedBien.description || 'Aucune description fournie.'}</p>
                </div>

                <button className="btn-whatsapp-full" onClick={() => openWhatsApp(selectedBien)}>
                  Contacter sur WhatsApp
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