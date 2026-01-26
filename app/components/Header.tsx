'use client'
import { FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import '../../styles/header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [produitsOpen, setProduitsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>

      {/* MENU HAMBURGER */}
      <div className="menu-button" onClick={() => setMenuOpen(true)}>
        <FaBars size={30} />
        <span>Menu</span>
      </div>

      {/* LOGO */}
      <div className="logo-container">
        <div className="logo-class">
          <Image
            id="logo-image"
            src="/images/logo2.png"
            alt="Logo"
            width={190}
            height={190}
          />
        </div>
      </div>

      {/* MENU DRAWER */}
      <div className={`menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="close-button" onClick={() => setMenuOpen(false)}>
          <FaTimes size={40} />
        </div>

        <ul className="menu-list">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>

          {/* NOS PRODUITS AVEC SOUS-MENU */}
          <li className="has-submenu">
            <div
              className="submenu-title"
              onClick={() => setProduitsOpen(!produitsOpen)}
            >
              Nos produits <span>{produitsOpen ? '−' : '+'}</span>
            </div>

            {produitsOpen && (
              <ul className="submenu">
                <li>
                  <Link href="/tontine" onClick={() => setMenuOpen(false)}>
                    Tontine immobilière
                  </Link>
                </li>
                <li>
                  <Link href="/impact" onClick={() => setMenuOpen(false)}>
                   Limobilié impact
                  </Link>
                </li>
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
        </ul>
      </div>
    </header>
  )
}
