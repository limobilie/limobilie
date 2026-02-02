'use client'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase' 
import '../../styles/header.css'

export default function Header({ isDashboard = false }) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [produitsOpen, setProduitsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // 1. Vérification initiale de la session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    checkUser()

    // 2. Écouteur de changement d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
      
      // PROTECTION : On ne redirige vers l'accueil QUE si l'utilisateur est sur 
      // une page admin et qu'il se déconnecte explicitement.
      if (!session && pathname.startsWith('/admin')) {
        router.push('/')
      }
    })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [router, pathname])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert("Erreur : " + error.message)
    } else {
      setShowLogin(false)
      setEmail('')
      setPassword('')
      router.push('/admin/dashboard')
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push('/')
  }

  return (
    <header className={`header ${scrolled || isDashboard ? 'scrolled' : ''} ${isDashboard ? 'dashboard-mode' : ''}`}>
      
      {/* BOUTON MENU MOBILE */}
      <div className="menu-button" onClick={() => setMenuOpen(true)}>
        <FaBars size={30} />
        <span>Menu</span>
      </div>

      <div className="logo-container">
        <div className="logo-class">
          <Link href="/">
            <Image src="/images/logo2.png" alt="Logo" width={190} height={190} priority />
          </Link>

          {/* BOUTON ACCÈS ADMIN */}
          <button className="admin-access-btn" onClick={() => setShowLogin(!showLogin)}>
            <FaUser size={22} style={{ color: isLoggedIn ? '#2ecc71' : '#ff0000' }} />
          </button>

          {/* POPUP DE CONNEXION */}
          {showLogin && !isLoggedIn && (
            <div className="login-popup">
              <button className="close-popup-pro" onClick={() => setShowLogin(false)}><FaTimes size={18} /></button>
              <h3>Connexion Admin</h3>
              <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* DRAWER (MENU LATÉRAL) */}
      <div className={`menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="close-button" onClick={() => setMenuOpen(false)}>
          <FaTimes size={40} />
        </div>

        <ul className="menu-list">
          {isLoggedIn ? (
            /* MENU SI CONNECTÉ */
            <>
              <li className="admin-link-special">
                <Link href="/admin/dashboard" onClick={() => setMenuOpen(false)}>📊 TABLEAU DE BORD</Link>
              </li>
              <li><Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
              <li><Link href="/notre-equipe" onClick={() => setMenuOpen(false)}>Notre équipe</Link></li>
              <li><Link href="/acheter" onClick={() => setMenuOpen(false)}>Acheter</Link></li>
              <li><Link href="/louer" onClick={() => setMenuOpen(false)}>Louer</Link></li>
              <li onClick={handleLogout} className="logout-btn" style={{cursor: 'pointer', color: '#ff4d4d', fontWeight: 'bold'}}>🚪 Déconnexion</li>
            </>
          ) : (
            /* MENU SI DÉCONNECTÉ (PUBLIC) */
            <>
              <li><Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
              
              {/* SOUS-MENU NOS PRODUITS */}
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
              <li><Link href="/rapports-immobiliers" onClick={() => setMenuOpen(false)}>Consulter nos rapports immobiliers</Link></li>
              <li><Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
              <li><Link href="/partenaire" onClick={() => setMenuOpen(false)}>Partenaire</Link></li>
              <li><Link href="/demarcheur" onClick={() => setMenuOpen(false)}>Devenir démarcheur</Link></li>
              <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}