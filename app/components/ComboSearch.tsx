'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import '../../styles/ComboSearch.css'

/* 🔹 Types MINIMAUX (pour satisfaire TypeScript) */
type Filters = {
  offerType: string
  typeBien: string
  localisation: string
  budgetMax: string
  surfaceMin: string
  reference: string
  piecesMin: string
  chambresMin: string
  salleBainMin: string
  balcon: boolean
  ascenseur: boolean
  stationnement: boolean
  pmr: boolean
  piscine: boolean
  searchText?: string
}

type Props = {
  filters: Filters
  onChange: (filters: Filters) => void
}

export default function ComboSearch({ filters, onChange }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  // 🔹 Dès que l'utilisateur sélectionne "Autres"
  useEffect(() => {
    if (localFilters.offerType.toLowerCase() === 'autres') {
      onChange(localFilters)
    }
  }, [localFilters.offerType])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' && e.target instanceof HTMLInputElement
        ? e.target.checked
        : undefined

    const val = type === 'checkbox' ? checked : value

    setLocalFilters(prev => ({ ...prev, [name]: val }))
  }

  const handleSearchClick = () => onChange(localFilters)
  const isAutres = localFilters.offerType.toLowerCase() === 'autres'

  return (
    <div className="search-container">
      <div className="search-main-bar">
        <div className="search-row">
          <div className="search-field">
            <label htmlFor="offerType">Type d'offre</label>
            <select
              style={{ color: 'black' }}
              name="offerType"
              value={localFilters.offerType}
              onChange={handleInputChange}
            >
              <option value="vente">Vente</option>
              <option value="location">Location</option>
              <option value="neuf">Neuf</option>
              <option value="autres">Autres</option>
            </select>
          </div>

          {isAutres ? (
            <>
              <div className="search-field">
                <label>Recherche libre</label>
                <input
                  style={{ color: 'black' }}
                  type="text"
                  name="searchText"
                  placeholder="Que recherchez-vous ?"
                  value={localFilters.searchText || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="search-actions">
                <button type="button" className="btn-search" onClick={handleSearchClick}>
                  <Search size={18} /> Rechercher
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="search-field">
                <label>Type de bien</label>
                <select
                  style={{ color: 'black' }}
                  name="typeBien"
                  value={localFilters.typeBien}
                  onChange={handleInputChange}
                >
                  <option value="">Tous</option>
                  <option value="Terrain">Terrain</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Maison">Maison</option>
                </select>
              </div>

              <div className="search-field">
                <label>Localisation</label>
                <select
                  style={{ color: 'black' }}
                  name="localisation"
                  value={localFilters.localisation}
                  onChange={handleInputChange}
                >
                  <option value="">Toutes</option>
                  <option value="COCODY">COCODY</option>
                  <option value="PORT-BOUET">PORT-BOUET</option>
                  <option value="BASSAM">BASSAM</option>
                  <option value="BINGERVILLE">BINGERVILLE</option>
                </select>
              </div>

              <div className="search-field">
                <label>Budget max (FCFA)</label>
                <input
                  style={{ color: 'black' }}
                  type="text"
                  name="budgetMax"
                  value={localFilters.budgetMax}
                  onChange={handleInputChange}
                />
              </div>

              <div className="search-field">
                <label>Surface min (m²)</label>
                <input
                  style={{ color: 'black' }}
                  type="text"
                  name="surfaceMin"
                  value={localFilters.surfaceMin}
                  onChange={handleInputChange}
                />
              </div>

              <div className="search-actions">
                <button type="button" className="btn-toggle" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? '-' : '+'}
                </button>

                <button type="button" className="btn-search" onClick={handleSearchClick}>
                  <Search size={18} /> Rechercher
                </button>
              </div>

              {isExpanded && (
                <div className="search-expanded-content">
                  <div className="search-row border-top">
                    <div className="search-field">
                      <label>Référence</label>
                      <input type="text" name="reference" value={localFilters.reference} onChange={handleInputChange} />
                    </div>
                    <div className="search-field">
                      <label>Pièces min</label>
                      <input type="text" name="piecesMin" value={localFilters.piecesMin} onChange={handleInputChange} />
                    </div>
                    <div className="search-field">
                      <label>Chambres min</label>
                      <input type="text" name="chambresMin" value={localFilters.chambresMin} onChange={handleInputChange} />
                    </div>
                    <div className="search-field">
                      <label>Salle de bain min</label>
                      <input type="text" name="salleBainMin" value={localFilters.salleBainMin} onChange={handleInputChange} />
                    </div>

                    <div className="search-checkboxes">
                      <label><input type="checkbox" name="balcon" checked={localFilters.balcon} onChange={handleInputChange} /> Balcon</label>
                      <label><input type="checkbox" name="ascenseur" checked={localFilters.ascenseur} onChange={handleInputChange} /> Ascenseur</label>
                      <label><input type="checkbox" name="stationnement" checked={localFilters.stationnement} onChange={handleInputChange} /> Stationnement</label>
                      <label><input type="checkbox" name="pmr" checked={localFilters.pmr} onChange={handleInputChange} /> PMR</label>
                      <label><input type="checkbox" name="piscine" checked={localFilters.piscine} onChange={handleInputChange} /> Piscine</label>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
