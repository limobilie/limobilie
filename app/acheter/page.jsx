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

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // 🔹 FILTRAGE
  const filteredBiens = biens.filter(bien => {
    const prix = parseInt(bien.prix.replace(/[^0-9]/g, '')) || 0
    const surface = parseInt(bien.surface.replace(/[^0-9]/g, '')) || 0
    const pieces = parseInt(bien.pieces.replace(/[^0-9]/g, '')) || 0

    const matchOfferType =
      !filters.offerType
        ? true
        : filters.offerType.toLowerCase() === 'autres'
          ? bien.offerType.toLowerCase() === 'autres'
          : bien.offerType.toLowerCase() === filters.offerType.toLowerCase()

    const matchLocalisation = !filters.localisation || bien.localisations.includes(filters.localisation)
    const matchTypeBien = !filters.typeBien || bien.titre.toLowerCase().includes(filters.typeBien.toLowerCase())
    const matchBudget = !filters.budgetMax || prix <= parseInt(filters.budgetMax)
    const matchSurface = !filters.surfaceMin || surface >= parseInt(filters.surfaceMin)
    const matchPieces = !filters.piecesMin || pieces >= parseInt(filters.piecesMin)
    const matchChambres = !filters.chambresMin || bien.chambres >= parseInt(filters.chambresMin)
    const matchSalleBain = !filters.salleBainMin || bien.salleBain >= parseInt(filters.salleBainMin)

    const matchBalcon = filters.balcon ? bien.balcon : true
    const matchAscenseur = filters.ascenseur ? bien.ascenseur : true
    const matchStationnement = filters.stationnement ? bien.stationnement : true
    const matchPMR = filters.pmr ? bien.pmr : true
    const matchPiscine = filters.piscine ? bien.piscine : true

    const matchReference = !filters.reference || bien.titre.toLowerCase().includes(filters.reference.toLowerCase())
    const matchSearchText =
      !filters.searchText ||
      bien.titre.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      bien.description.toLowerCase().includes(filters.searchText.toLowerCase())

    return (
      matchOfferType &&
      matchLocalisation &&
      matchTypeBien &&
      matchBudget &&
      matchSurface &&
      matchPieces &&
      matchChambres &&
      matchSalleBain &&
      matchBalcon &&
      matchAscenseur &&
      matchStationnement &&
      matchPMR &&
      matchPiscine &&
      matchReference &&
      matchSearchText
    )
  })

  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentBiens = filteredBiens.slice(indexOfFirstItem, indexOfLastItem)

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="biens-page">
      <Header />

      <div className="biens-hero-image">
        <Image
          src="/images/acheter.png"
          alt="Biens en vente"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="biens-hero-overlay">
          <h1>Biens en vente</h1>
          <p>Découvrez notre portefeuille.</p>
        </div>
      </div>

      <div className="biens-search-container">
        <ComboSearch filters={filters} onChange={handleFilterChange} />
      </div>

      {filteredBiens.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'red', fontSize: '24px', padding: '100px 0' }}>
          ⚠️ Aucun bien ne correspond à votre recherche.
        </div>
      ) : (
        <>
          <div className="biens-grid gallery-view">
            {currentBiens.map((bien, index) => (
              <div key={index} className="biens-card">
                <div className="biens-image-container">
                  <Image src={bien.image} alt={bien.titre} fill />
                </div>
                <div className="biens-info">
                  <div className="biens-price">{bien.prix}</div>
                  <h3>{bien.titre}</h3>
                  <p>{bien.description}</p>
                  <p>{bien.pieces} | {bien.surface} | {bien.localisations.join(', ')}</p>
                  <p>
                    {bien.balcon && 'Balcon • '}
                    {bien.ascenseur && 'Ascenseur • '}
                    {bien.stationnement && 'Stationnement • '}
                    {bien.pmr && 'PMR • '}
                    {bien.piscine && 'Piscine'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
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
