'use client'
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChartBar, FaIdCard, FaMoneyCheckAlt, FaChevronDown } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase' 
import '../../styles/header.css'

export default function Header({ isDashboard = false }) {
  const router = useRouter()
  const pathname = usePathname()
  
  // États d'affichage
  const [menuOpen, setMenuOpen] = useState(false)
  const [produitsOpen, setProduitsOpen] = useState(false)
  const [limobilierOpen, setlimobilierOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false) // Pour le menu de déconnexion rapide

  // États pour Auth
  const [authMode, setAuthMode] = useState('login') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') 
  const [role, setRole] = useState('client')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Données Bailleur
  const [formData, setFormData] = useState({
    nomPrenom: '', dateNaissance: '', nationalite: '', profession: '', 
    adresseResidence: '', communeResidence: '', typePiece: 'CNI', 
    contactPrincipal: '', contactSecondaire: '', receptionLoyer: 'Mobile Money', 
    rib_ou_numero: '' 
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
      if (event === 'SIGNED_IN') {
        setShowLogin(false)
        setUserDropdown(false)
      }
      if (event === 'SIGNED_OUT') {
        setUserDropdown(false)
        setMenuOpen(false)
        router.push('/')
        router.refresh()
      }
    })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [router, pathname])

  const handleAuth = async (e) => {
    e.preventDefault()
    if (authMode === 'register' && password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }
    setLoading(true)
    try {
      if (authMode === 'register') {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { role, nom_complet: formData.nomPrenom, ...(role === 'proprietaire' ? formData : {}) } }
        })
        if (error) throw error
        alert("Compte créé ! Bienvenue sur LIMOBILIÉ.")
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        const userRole = data.user.user_metadata.role
        if (userRole === 'admin') router.push('/admin/dashboard')
        else if (userRole === 'proprietaire') router.push('/proprietaire')
      }
      setShowLogin(false)
    } catch (error) {
      alert("Erreur : " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserDropdown(false)
    setMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled || isDashboard ? 'scrolled' : ''} ${isDashboard ? 'dashboard-mode' : ''}`}>
      
      {/* BOUTON MENU HAMBURGER */}
      <div className="menu-button" onClick={() => setMenuOpen(true)}>
        <FaBars size={30} />
        <span>Menu</span>
      </div>

      {/* LOGO ET ACCÈS UTILISATEUR */}
      <div className="logo-container">
        <div className="logo-class">
          <Link href="/">
            <Image src="/images/logo2.png" alt="Logo" width={190} height={190} priority />
          </Link>

          <div className="user-action-area" style={{ position: 'relative' }}>
            <button 
              className="admin-access-btn" 
              onClick={() => isLoggedIn ? setUserDropdown(!userDropdown) : setShowLogin(!showLogin)}
            >
              <FaUser size={22} style={{ color: isLoggedIn ? '#2ecc71' : '#ff0000' }} />
              {isLoggedIn && <FaChevronDown size={12} style={{ marginLeft: '5px', color: '#2ecc71' }} />}
            </button>

            {/* DROPDOWN DE DECONNEXION RAPIDE */}
            {isLoggedIn && userDropdown && (
              <div className="user-dropdown-nav">
                <div className="dropdown-user-title">Mon Compte</div>
                <Link href="/proprietaire" onClick={() => setUserDropdown(false)}>Tableau de bord</Link>
                <button onClick={handleLogout} className="dropdown-logout-btn">
                  <FaSignOutAlt /> Déconnexion
                </button>
              </div>
            )}
          </div>

          {/* POPUP DE CONNEXION / INSCRIPTION */}
          {showLogin && !isLoggedIn && (
            <div className="auth-popup-overlay">
              <div className="auth-popup-single">
                <button className="close-popup-pro" onClick={() => setShowLogin(false)}><FaTimes size={18} /></button>
                <h3>{authMode === 'login' ? 'Connexion' : 'Inscription LIMOBILIÉ'}</h3>
                
                <form onSubmit={handleAuth} className="auth-form-scroll">
                  {authMode === 'register' && (
                    <div className="role-selector-container">
                      <label className="auth-label">Je souhaite :</label>
                      <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select-box">
                        <option value="client">Louer un bien (Client)</option>
                        <option value="proprietaire">Mettre en location (Bailleur)</option>
                      </select>
                    </div>
                  )}

                  <input type="email" placeholder="Email" className="auth-input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="password" placeholder="Mot de passe" className="auth-input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  
                  {authMode === 'register' && (
                    <>
                      <input type="password" placeholder="Confirmer mot de passe" className="auth-input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                      {role === 'proprietaire' && (
                        <div className="bailleur-extra-fields">
                          <h4 className="form-section-title"><FaIdCard /> Identité du Bailleur</h4>
                          <input type="text" placeholder="Nom et Prénoms" className="auth-input-field" onChange={(e) => setFormData({...formData, nomPrenom: e.target.value})} required />
                          <input type="text" placeholder="Profession" className="auth-input-field" onChange={(e) => setFormData({...formData, profession: e.target.value})} required />
                          <h4 className="form-section-title"><FaMoneyCheckAlt /> Paiement</h4>
                          <input type="tel" placeholder="N° Mobile Money" className="auth-input-field" onChange={(e) => setFormData({...formData, contactPrincipal: e.target.value})} required />
                        </div>
                      )}
                    </>
                  )}
                  
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    {loading ? 'Chargement...' : authMode === 'login' ? 'Se connecter' : 'Valider mon inscription'}
                  </button>
                </form>

                <div className="auth-switch">
                  <p onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                    {authMode === 'login' ? "Nouveau ici ? Créer un compte" : "Déjà membre ? Se connecter"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MENU LATÉRAL (DRAWER) */}
      <div className={`menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="close-button" onClick={() => setMenuOpen(false)}><FaTimes size={40} /></div>
        
        <ul className="menu-list">
          {isLoggedIn && (
             <li className="admin-link-special">
               <Link href="/admin/dashboard" onClick={() => setMenuOpen(false)}><FaChartBar /> TABLEAU DE BORD</Link>
             </li>
          )}

          <li><Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>

          <li className="has-submenu">
            <div className="submenu-title" onClick={() => setlimobilierOpen(!limobilierOpen)}>
              Immobilier <span>{limobilierOpen ? '−' : '+'}</span>
            </div>
            {limobilierOpen && (
              <ul className="submenu">
                <li><Link href="/proprietaire" onClick={() => setMenuOpen(false)}>Espace Propriétaire</Link></li>
                <li><Link href="/client" onClick={() => setMenuOpen(false)}>Espace Client</Link></li>
              </ul>
            )}
          </li>

          <li className="has-submenu">
            <div className="submenu-title" onClick={() => setProduitsOpen(!produitsOpen)}>
              Nos produits <span>{produitsOpen ? '−' : '+'}</span>
            </div>
            {produitsOpen && (
              <ul className="submenu">
                <li><Link href="/tontine" onClick={() => setMenuOpen(false)}>Tontine immobilière</Link></li>
                <li><Link href="/impact" onClick={() => setMenuOpen(false)}>Limobilié impact</Link></li>
              </ul>
            )}
          </li>

          <li><Link href="/notre-equipe" onClick={() => setMenuOpen(false)}>Notre équipe</Link></li>
          <li><Link href="/acheter" onClick={() => setMenuOpen(false)}>Acheter</Link></li>
          <li><Link href="/louer" onClick={() => setMenuOpen(false)}>Louer</Link></li>
          <li><Link href="/confier-commercialisation" onClick={() => setMenuOpen(false)}>Confier la commercialisation</Link></li>
          <li><Link href="/confier-travaux" onClick={() => setMenuOpen(false)}>Confier vos travaux</Link></li>
          <li><Link href="/faire-gerer-bien" onClick={() => setMenuOpen(false)}>Faire gérer votre bien</Link></li>
          <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
          <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

          {isLoggedIn && (
            <li onClick={handleLogout} className="logout-btn-drawer">
              <FaSignOutAlt /> Déconnexion
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}