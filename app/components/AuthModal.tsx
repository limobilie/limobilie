'use client'
import { useState, useEffect } from 'react'
import { FaTimes, FaIdCard, FaMoneyCheckAlt, FaMapMarkerAlt, FaGlobe, FaFileContract } from 'react-icons/fa'
import { loginUser, registerUser } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  forcedRole?: string;
}

export default function AuthModal({ isOpen, onClose, forcedRole }: AuthModalProps) {
  const router = useRouter()
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState(forcedRole || 'client')
  
  const [formData, setFormData] = useState({
    nom_prenoms: '',
    date_naissance: '',
    lieu_naissance: '',
    nationalite: 'Ivoirienne',
    profession: '',
    commune: '',
    contact_mm: '',
    contact_secondaire: '',
    type_piece: 'CNI',
    numero_piece: ''
  })

  useEffect(() => {
    if (forcedRole) setRole(forcedRole)
  }, [forcedRole, isOpen])

  const handleClose = () => {
    setAuthMode('login') 
    onClose() 
  }

  // CONDITION DE SORTIE : Si pas ouvert, on ne rend rien
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (authMode === 'register' && password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }

    setLoading(true)
    try {
      if (authMode === 'register') {
        const result = await registerUser(email, password, role, formData)
        if (result.error) throw result.error
        alert("Compte créé avec succès ! Veuillez vérifier votre boîte mail.")
        handleClose()
      } else {
        const result = await loginUser(email, password)
        if (result.error) throw result.error
        const userRole = result.data.user?.user_metadata?.role || 'client'
        if (userRole === 'admin') router.push('/admin/dashboard')
        else if (userRole === 'proprietaire') router.push('/proprietaire')
        else router.push('/client')
        handleClose()
      }
    } catch (error: any) {
      alert("Erreur : " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="auth-popup-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // FORCE LE PASSAGE AU DESSUS DU CONTENU
      }}
      onClick={handleClose}
    >
      <div 
        className="auth-popup-single" 
        style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '15px',
          maxWidth: '500px',
          width: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-popup-pro" onClick={handleClose} style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <FaTimes size={20} color="black" />
        </button>

        <h3 style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>
          {authMode === 'login' ? 'Connexion' : 'Inscription LIMOBILIÉ'}
        </h3>
        
        <form onSubmit={handleSubmit} className="auth-form-scroll">
          {authMode === 'register' && (
            <div className="role-selector-container" style={{ marginBottom: '15px' }}>
              <label className="auth-label" style={{ color: 'black', fontWeight: 'bold' }}>Je souhaite :</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="role-select-box"
                disabled={!!forcedRole}
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
              >
                {forcedRole === 'proprietaire' ? (
                   <option value="proprietaire">Mettre en location (Bailleur)</option>
                ) : (
                  <>
                    <option value="client">Louer un bien (Client)</option>
                    <option value="proprietaire">Mettre en location (Bailleur)</option>
                    <option value="admin">Administrateur (Staff)</option>
                  </>
                )}
              </select>
            </div>
          )}

          <input type="email" placeholder="Email" className="auth-input-field" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px', color: 'black' }} />
          <input type="password" placeholder="Mot de passe" className="auth-input-field" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px', color: 'black' }} />
          
          {authMode === 'register' && (
            <div className="bailleur-extra-fields">
              <input type="password" placeholder="Confirmer mot de passe" className="auth-input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '8px', color: 'black' }} />
              
              <h4 className="form-section-title" style={{ color: '#ff0000', fontSize: '14px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}><FaIdCard /> 1. Identité</h4>
              <input type="text" placeholder="Nom et Prénoms (selon CNI)" className="auth-input-field" onChange={(e) => setFormData({...formData, nom_prenoms: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', color: 'black' }} />
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input type="date" className="auth-input-field" onChange={(e) => setFormData({...formData, date_naissance: e.target.value})} required style={{ flex: 1, padding: '10px', color: 'black' }} />
                <input type="text" placeholder="Lieu de naissance" className="auth-input-field" onChange={(e) => setFormData({...formData, lieu_naissance: e.target.value})} required style={{ flex: 1, padding: '10px', color: 'black' }} />
              </div>

              <h4 className="form-section-title" style={{ color: '#ff0000', fontSize: '14px' }}><FaFileContract /> 2. Pièce d'Identité</h4>
              <select className="auth-input-field" value={formData.type_piece} onChange={(e) => setFormData({...formData, type_piece: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', color: 'black' }}>
                <option value="CNI">CNI Ivoirienne</option>
                <option value="PASSEPORT">Passeport</option>
                <option value="CARTE_CONSULAIRE">Carte Consulaire</option>
              </select>
              <input type="text" placeholder="N° de la pièce d'identité" className="auth-input-field" onChange={(e) => setFormData({...formData, numero_piece: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', color: 'black' }} />

              <h4 className="form-section-title" style={{ color: '#ff0000', fontSize: '14px' }}><FaMoneyCheckAlt /> 3. Contacts Payement</h4>
              <input type="tel" placeholder="N° Mobile Money (Obligatoire)" className="auth-input-field" onChange={(e) => setFormData({...formData, contact_mm: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '10px', color: 'black' }} />
            </div>
          )}
          
          <button type="submit" className="auth-submit-btn" disabled={loading} style={{ width: '100%', padding: '15px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            {loading ? 'Chargement...' : authMode === 'login' ? 'Se connecter' : 'Valider mon inscription'}
          </button>
        </form>

        <div className="auth-switch" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: 'black', fontSize: '14px' }}>
            {authMode === 'login' ? "Nouveau ici ? " : "Déjà membre ? "}
            <span 
              style={{ color: '#ff0000', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }} 
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              {authMode === 'login' ? "Créer un compte" : "Se connecter"}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}