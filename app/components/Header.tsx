'use client'
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChartBar, FaChevronDown } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase' 
import { logoutUser } from '@/lib/auth'
import AuthModal from './AuthModal' 
import '../../styles/header.css'

export default function Header({ isDashboard = false }) {
  const router = useRouter()
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [produitsOpen, setProduitsOpen] = useState(false)
  const [limobilierOpen, setlimobilierOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false) 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsLoggedIn(true)
        setUserRole(session.user.user_metadata?.role || 'client')
      }
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
      setUserRole(session?.user.user_metadata?.role || null)
      if (event === 'SIGNED_OUT') {
        setUserDropdown(false)
        setMenuOpen(false)
        router.push('/')
      }
    })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [router])

  return (
    <header className={`header ${scrolled || isDashboard ? 'scrolled' : ''}`}>
      <div className="menu-button" onClick={() => setMenuOpen(true)}>
        <FaBars size={30} />
        <span>Menu</span>
      </div>

      <div className="logo-container">
        <div className="logo-class">
          <Link href="/">
            {/* CORRECTION ICI : 
                Ajout de style auto pour maintenir l'aspect ratio et supprimer l'erreur de console.
            */}
            <Image 
              src="/images/logo2.png" 
              alt="Limobilié Logo" 
              width={190} 
              height={190} 
              priority 
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          <div className="user-action-area">
            <button className="admin-access-btn" onClick={() => isLoggedIn ? setUserDropdown(!userDropdown) : setShowLogin(true)}>
              <FaUser size={22} style={{ color: isLoggedIn ? '#2ecc71' : '#ff0000' }} />
              {isLoggedIn && <FaChevronDown size={12} />}
            </button>

            {isLoggedIn && userDropdown && (
              <div className="user-dropdown-nav">
                <div className="dropdown-user-title">Profil: {userRole}</div>
                {userRole === 'admin' && <Link href="/admin/dashboard">Admin</Link>}
                {userRole === 'proprietaire' && <Link href="/proprietaire">Mon Espace</Link>}
                {userRole === 'client' && <Link href="/client">Mon Espace</Link>}
                <button onClick={() => logoutUser()} className="dropdown-logout-btn"><FaSignOutAlt /> Déconnexion</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      <div className={`menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="close-button" onClick={() => setMenuOpen(false)}><FaTimes size={40} /></div>
        <ul className="menu-list">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>

            {isLoggedIn && userRole === 'admin' ? (
              <>
                <li className="admin-link-special">
                  <Link href="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                    <FaChartBar /> TABLEAU DE BORD
                  </Link>
                </li>
                <li><Link href="/admin/validations" onClick={() => setMenuOpen(false)}>✅ Valider les Biens</Link></li>
                <li><Link href="/admin/utilisateurs" onClick={() => setMenuOpen(false)}>👥 Gestion Utilisateurs</Link></li>
              </>
            ) : (
              <>
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
                <li><Link href="/confier-commercialisation" onClick={() => setMenuOpen(false)}>Confier la commercialisation</Link></li>
                <li><Link href="/confier-travaux" onClick={() => setMenuOpen(false)}>Confier vos travaux</Link></li>
                <li><Link href="/faire-gerer-bien" onClick={() => setMenuOpen(false)}>Faire gérer votre bien</Link></li>
                <li><Link href="/rapports-immobiliers" onClick={() => setMenuOpen(false)}>Rapports Immobiliers</Link></li>
                <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                <li><Link href="/partenaire" onClick={() => setMenuOpen(false)}>Partenaire</Link></li>
                <li><Link href="/demarcheur" onClick={() => setMenuOpen(false)}>Devenir démarcheur</Link></li>
                <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
              </>
            )}

            {isLoggedIn && (
              <li onClick={() => logoutUser()} className="logout-btn-drawer">
                <FaSignOutAlt /> Déconnexion
              </li>
            )}
          </ul>
      </div>
    </header>
  )
}