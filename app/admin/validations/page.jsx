'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { 
  FaCheck, FaClock, FaTimes, FaEye, FaUserShield, 
  FaSpinner, FaExternalLinkAlt, FaBan 
} from 'react-icons/fa'
import '../../../styles/admin-validations.css'

export default function AdminValidationsPage() {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [biens, setBiens] = useState([])
  const [filter, setFilter] = useState('all') 

  useEffect(() => {
    checkAdmin()
    fetchBiens()
  }, [filter])

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const role = session.user.user_metadata?.role || 'client'
      setUser(session.user)
      setUserRole(role)
    }
    setLoading(false)
  }

  const fetchBiens = async () => {
    let query = supabase.from('biens_immobiliers').select('*')
    if (filter !== 'all') {
      query = query.eq('statut', filter)
    }
    const { data, error } = await query.order('date_creation', { ascending: false })
    if (!error) setBiens(data)
  }

  const updateStatut = async (id, newStatut) => {
    const { error } = await supabase
      .from('biens_immobiliers')
      .update({ statut: newStatut })
      .eq('id', id)

    if (!error) {
      alert(`Le dossier est désormais : ${newStatut.replace('_', ' ')}`)
      fetchBiens()
    }
  }

  if (loading) return (
    <div className="admin-status-screen">
      <FaSpinner className="spinner-icon" />
      <p>Vérification de l'identité administrative...</p>
    </div>
  )

  if (!user || userRole !== 'admin') {
    return (
      <div className="admin-status-screen denied">
        <FaUserShield size={80} color="#ff0000" />
        <h1>Accès Strictement Réservé</h1>
        <p>Cette zone nécessite des privilèges d'administrateur système.</p>
        <button onClick={() => window.location.href='/'} className="btn-back">Quitter la zone</button>
      </div>
    )
  }

  return (
    <div className="admin-main-wrapper">
      {/* Header avec une classe spéciale pour forcer le style rouge via le CSS parent si besoin */}
      <div className="admin-red-header-zone">
        <Header />
        <div className="admin-warning-bar">
          <FaUserShield /> MODE ADMINISTRATEUR - GESTION DES VALIDATIONS MAIRIE
        </div>
      </div>
      
      <div className="admin-container">
        <header className="admin-page-header">
          <div className="admin-title-section">
            <h1>Contrôle des Dossiers</h1>
            <p>Inspection des soumissions de biens immobiliers</p>
          </div>

          <div className="filter-bar">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tous</button>
            <button className={filter === 'en_attente' ? 'active' : ''} onClick={() => setFilter('en_attente')}>En attente</button>
            <button className={filter === 'valide' ? 'active' : ''} onClick={() => setFilter('valide')}>Validés</button>
            <button className={filter === 'refuse' ? 'active' : ''} onClick={() => setFilter('refuse')}>Refusés</button>
          </div>
        </header>

        <div className="responsive-table-container">
          <table className="pro-admin-table">
            <thead>
              <tr>
                <th>Bien & Emplacement</th>
                <th>Prix (FCFA)</th>
                <th>Documents Officiels</th>
                <th>État du Dossier</th>
                <th>Décision</th>
              </tr>
            </thead>
            <tbody>
              {biens.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign: 'center', padding: '50px'}}>Aucun dossier dans cette catégorie.</td></tr>
              ) : (
                biens.map((bien) => (
                  <tr key={bien.id}>
                    <td>
                      <div className="product-cell">
                        <img src={bien.image_url || '/images/placeholder.png'} alt="bien" />
                        <div>
                          <h4>{bien.titre}</h4>
                          <p>📍 {bien.commune}, {bien.quartier}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="price-tag">{parseInt(bien.prix).toLocaleString()}</span></td>
                    <td>
                      <div className="doc-links">
                        <a href={bien.document_url} target="_blank" className="btn-view-doc">
                          <FaEye /> {bien.type_document || 'Justificatif'}
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${bien.statut}`}>
                        {bien.statut === 'en_attente' ? 'Vérification' : bien.statut === 'valide' ? 'Approuvé' : 'Rejeté'}
                      </span>
                    </td>
                    <td>
                      <div className="actions-btns">
                        <button className="btn-check" onClick={() => updateStatut(bien.id, 'valide')} title="Valider">
                          <FaCheck />
                        </button>
                        <button className="btn-wait" onClick={() => updateStatut(bien.id, 'en_attente')} title="Mettre en attente">
                          <FaClock />
                        </button>
                        <button className="btn-cross" onClick={() => updateStatut(bien.id, 'refuse')} title="Refuser le dossier">
                          <FaBan />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}