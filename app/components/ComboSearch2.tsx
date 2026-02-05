'use client'

import { FaSearch, FaTimes } from 'react-icons/fa'
import '../../styles/ComboSearch2.css'

interface ComboSearchProps {
  filters: { searchText: string };
  onChange: (filters: any) => void;
}

export default function ComboSearch2({ filters, onChange }: ComboSearchProps) {
  
  // Gestion de la saisie
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange({ ...filters, searchText: value });
  };

  // Effacer la recherche
  const clearSearch = () => {
    onChange({ ...filters, searchText: '' });
  };

  return (
    <div className="combo-search-wrapper2">
      <div className="search-bar-modern2">
        <FaSearch className="search-icon2" />
        
        <input
          type="text"
          placeholder="Où cherchez-vous ? (ex: Angré, Studio, 2 pièces...)"
          value={filters.searchText || ''}
          onChange={handleInputChange}
          className="search-input2"
        />

        {filters.searchText && (
          <button className="clear-btn2" onClick={clearSearch} title="Effacer">
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  )
}