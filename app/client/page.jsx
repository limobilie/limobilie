'use client'

import { useState, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ComboSearch2 from '../components/ComboSearch2'
import Image from 'next/image'
import { supabase } from '@/lib/supabase' 
import { FaMicrophone, FaStop } from 'react-icons/fa' 
import { intelligentFilter } from '@/lib/searchEngine' // IMPORT DU MOTEUR
import '../../styles/client.css'

export default function LouerPage() {
  const [biensDb, setBiensDb] = useState([])
  const [loading, setLoading] = useState(true)
  const [appliedFilters, setAppliedFilters] = useState({ searchText: '' })
  const [selectedBien, setSelectedBien] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isListening, setIsListening] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchBiens = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('biens_immobiliers')
          .select('*')
          .eq('statut', 'valide') 
          .order('date_creation', { ascending: false })

        if (error) console.error("Erreur Supabase:", error.message)
        else setBiensDb(data || [])
      } catch (err) {
        console.error("Erreur système:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBiens()
  }, [])

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la recherche vocale.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleFilterSubmit({ ...appliedFilters, searchText: transcript });
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    if (isListening) recognition.stop();
    else recognition.start();
  }

  const handleFilterSubmit = (newFilters) => {
    setAppliedFilters(newFilters)
    setCurrentPage(1)
  }

  // UTILISATION DU MOTEUR INTELLIGENT
  const filteredBiens = useMemo(() => {
    return intelligentFilter(biensDb, appliedFilters.searchText);
  }, [biensDb, appliedFilters.searchText]);

  const currentBiens = filteredBiens.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredBiens.length / itemsPerPage)

  const openWhatsApp = (bien) => {
    const message = encodeURIComponent(`Bonjour Limobilié, je suis intéressé par : ${bien.titre} à ${bien.commune} (${bien.prix} FCFA)`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  }

  return (
    <div className="biens-page">
      <Header />
      <main className="main-cclient">
        <div className="biens-hero-image">
          <Image src="/images/acheter.png" alt="Louer" fill style={{ objectFit: 'cover' }} priority unoptimized />
          <div className="client-hero">
            <h1>Trouvez le cadre de vie idéal pour votre famille à Abidjan.</h1>
          </div>
        </div>

        <div className="biens-search-container-louer">
          <div className="search-voice-wrapper">
            <ComboSearch2 className="search-voice-wrapper2" filters={appliedFilters} onChange={handleFilterSubmit} />
            <button 
              onClick={startVoiceSearch} 
              className={`voice-search-btn ${isListening ? 'is-active' : ''}`}
              title="Parler à Limobilié"
            >
              {isListening ? <FaStop size={22} /> : <FaMicrophone size={22} />}
              {isListening && <span className="voice-pulse"></span>}
            </button>
          </div>
          {isListening && <p className="voice-status-tag">Limobilié vous écoute...</p>}
        </div>

        {loading ? (
          <div className="loading-state">Analyse des meilleures offres en cours...</div>
        ) : (
          <>
            <div className="biens-grid">
              {currentBiens.length > 0 ? (
                currentBiens.map((bien) => (
                  <div key={bien.id} className="biens-card" onClick={() => setSelectedBien(bien)}>
                    <div className="biens-image-container">
                      <Image src={bien.image_url || '/images/placeholder-bien.png'} alt={bien.titre} fill style={{ objectFit: 'cover' }} unoptimized />
                      <div className="card-badge">{bien.type_bien || 'Offre'}</div>
                    </div>
                    <div className="biens-info">
                      <div className="biens-price">{parseFloat(bien.prix).toLocaleString()} FCFA</div>
                      <h3>{bien.titre}</h3>
                      <p className="loc-text">📍 {bien.commune}, {bien.quartier}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 20px' }}>
                  <h3 style={{fontSize: '24px', color: '#333'}}>Oups ! Aucun résultat.</h3>
                  <p>Essayez de dire : "Studio Angré" ou "Appartement Riviera".</p>
                  <button onClick={() => setAppliedFilters({searchText: ''})} style={{marginTop: '20px', padding: '10px 20px', borderRadius: '50px', border: '1px solid #e31e24', color: '#e31e24', background: 'none', cursor: 'pointer'}}>Voir tous les biens</button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => { setCurrentPage(i + 1); window.scrollTo({top: 400, behavior: 'smooth'}) }}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL DE DÉTAILS */}
      {selectedBien && (
        <div className="details-modal-overlay" onClick={() => setSelectedBien(null)}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBien(null)}>&times;</button>
            <div className="modal-layout-grid">
              <div className="modal-gallery-side">
                <Image src={selectedBien.image_url || '/images/placeholder-bien.png'} alt="Bien" fill style={{objectFit: 'cover'}} unoptimized />
              </div>
              <div className="modal-info-side">
                <span className="modal-price">{parseFloat(selectedBien.prix).toLocaleString()} FCFA</span>
                <h2>{selectedBien.titre}</h2>
                <p className="modal-loc">📍 {selectedBien.commune}, {selectedBien.quartier}</p>
                <div className="modal-desc-box">
                    <p>{selectedBien.description || "Pas de description."}</p>
                </div>
                <button className="btn-whatsapp-full" onClick={() => openWhatsApp(selectedBien)}>
                  Réserver via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}