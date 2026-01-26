'use client'

import { useState } from 'react'
import '../../styles/ComboSearch2.css'

// Définition du type des props
interface ComboSearchProps {
  types: string[]
  sortingOptions: string[]
  onChange?: (filters: { type: string; sort: string }) => void
}

export default function ComboSearch({ types, sortingOptions, onChange }: ComboSearchProps) {
  const [selectedType, setSelectedType] = useState<string>('')   // type string
  const [selectedSort, setSelectedSort] = useState<string>('')   // type string

  // Gestion du changement de type
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedType(value)
    if (onChange) onChange({ type: value, sort: selectedSort })
  }

  // Gestion du changement de tri
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedSort(value)
    if (onChange) onChange({ type: selectedType, sort: value })
  }

  return (
    <div className="combo-search2">
      <div className="combo-item2">
        <label htmlFor="type-select" className="combo-label2">Type d'affichage</label>
        <select
          id="type-select"
          value={selectedType}
          onChange={handleTypeChange}
          className="combo-select2"
        >
          <option value="">Sélectionner</option>
          {types.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="combo-item2">
        <label htmlFor="type-select" className="combo-label2">Type d'offre</label>
        <select
          id="type-select"
          value={selectedType}
          onChange={handleTypeChange}
          className="combo-select2"
        >
          <option value="">Sélectionner</option>
          {types.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

     

    </div>
  )
}
