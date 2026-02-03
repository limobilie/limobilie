'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { PAYS_VILLES } from '@/data/countries'
import * as XLSX from 'xlsx'
import '@/styles/dashboard.css'

export default function Dashboard() {
  const router = useRouter()
  const [souscriptions, setSouscriptions] = useState([])
  const [listeVisites, setListeVisites] = useState([])
  const [totalVisites, setTotalVisites] = useState(0)
  const [loading, setLoading] = useState(true)

  const [filtreDate, setFiltreDate] = useState('all')
  const [dateSpecifique, setDateSpecifique] = useState('')
  const [filtrePays, setFiltrePays] = useState('all')
  const [filtreVille, setFiltreVille] = useState('all')

  const exportToExcel = () => {
    const dataToExport = listeVisites.map(v => ({
      Pays: v.pays,
      Ville: v.ville,
      Date: new Date(v.date_visite).toLocaleDateString('fr-FR'),
      Heure: new Date(v.date_visite).toLocaleTimeString('fr-FR')
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visites")
    XLSX.writeFile(workbook, `Visites_Limobilie_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`)
  }

  useEffect(() => {
    async function checkAuthAndFetch() {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/')
        return
      }

      try {
        const resSous = await supabase
          .from('souscriptions')
          .select('*')
          .order('date_creation', { ascending: false })

        // REQUÊTE VISITES AVEC FILTRES ANTI-BOTS
        let queryVisitesDetailed = supabase
          .from('visites')
          .select('*')
          .neq('pays', 'Inconnu')     // Exclut les pays inconnus
          .neq('ville', 'Santa Clara') // Exclut les robots USA
          .order('date_visite', { ascending: false })

        // Filtre par Date
        if (filtreDate === 'today') {
          const today = new Date(); today.setHours(0, 0, 0, 0)
          queryVisitesDetailed = queryVisitesDetailed.gte('date_visite', today.toISOString())
        } 
        else if (filtreDate === 'custom' && dateSpecifique) {
          const debut = new Date(dateSpecifique); debut.setHours(0, 0, 0, 0)
          const fin = new Date(dateSpecifique); fin.setHours(23, 59, 59, 999)
          queryVisitesDetailed = queryVisitesDetailed.gte('date_visite', debut.toISOString()).lte('date_visite', fin.toISOString())
        }

        // Filtre Pays et Ville
        if (filtrePays !== 'all') queryVisitesDetailed = queryVisitesDetailed.eq('pays', filtrePays)
        if (filtreVille !== 'all') queryVisitesDetailed = queryVisitesDetailed.eq('ville', filtreVille)

        const { data: dataVisites } = await queryVisitesDetailed
        
        if (resSous.data) setSouscriptions(resSous.data)
        if (dataVisites) {
          setListeVisites(dataVisites)
          setTotalVisites(dataVisites.length)
        }
      } catch (err) {
        console.error("Erreur:", err)
      } finally {
        setLoading(false)
      }
    }
    checkAuthAndFetch()
  }, [filtreDate, dateSpecifique, filtrePays, filtreVille, router])

  const handlePaysSearch = (e) => {
    const valeur = e.target.value
    if (PAYS_VILLES[valeur]) {
      setFiltrePays(valeur)
      setFiltreVille('all')
    } else if (valeur === "" || valeur === "Toutes les destinations") {
      setFiltrePays('all')
      setFiltreVille('all')
    }
  }

  return (
    <>
      <Header isDashboard={true} />
      <main className="dashboard-container">
        <div className="dashboard-content">
          <h1 className="dashboard-title">Tableau de Bord Limobilié</h1>
          
          {/* --- TABLEAU SOUSCRIPTIONS --- */}
          <div className="table-section">
            <h2 className="section-title">Liste des Souscripteurs Tontine</h2>
            <div className="table-wrapper">
              <table className="data-table bordered">
                <thead>
                  <tr>
                    <th>Nom Complet</th>
                    <th>Téléphone</th>
                    <th>Lots</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {souscriptions.map((item) => (
                    <tr key={item.id}>
                      <td className="font-bold">{item.nom_complet}</td>
                      <td>{item.telephone}</td>
                      <td>{item.nombre_lots}</td>
                      <td>{new Date(item.date_creation).toLocaleDateString('fr-FR')}</td>
                      <td><span className={`status-badge ${item.statut}`}>{item.statut}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- TABLEAU DÉTAILS DES VISITES --- */}
          <div className="table-section" style={{ marginTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 className="section-title">Détails des Visites Réelles</h2>
              <button onClick={exportToExcel} className="btn-export-excel">
                📥 Exporter Excel
              </button>
            </div>
            
            <div className="table-wrapper">
              <table className="data-table bordered">
                <thead>
                  <tr>
                    <th>Pays</th>
                    <th>Ville</th>
                    <th>Date</th>
                    <th>Heure</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>Chargement...</td></tr>
                  ) : listeVisites.length > 0 ? (
                    listeVisites.map((v) => (
                      <tr key={v.id}>
                        <td>{v.pays}</td>
                        <td>{v.ville}</td>
                        <td>{new Date(v.date_visite).toLocaleDateString('fr-FR')}</td>
                        <td>{new Date(v.date_visite).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>Aucune visite trouvée</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- SECTION STATISTIQUES ET FILTRES (Rétablie) --- */}
          <div className="visits-section-bottom">
            <h2 className="section-title">Statistiques des Visites</h2>
            
            <div className="filters-bar search-mode">
               {/* Sélecteur de Date */}
               <div className="filter-group">
                  <select className="black-select" value={filtreDate} onChange={(e) => setFiltreDate(e.target.value)}>
                    <option value="all">Toutes les dates</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="custom">📅 Choisir une date</option>
                  </select>
                  {filtreDate === 'custom' && (
                    <input type="date" className="black-date-input" value={dateSpecifique} onChange={(e) => setDateSpecifique(e.target.value)} />
                  )}
               </div>

               {/* Recherche Pays */}
               <div className="filter-group">
                  <input list="list-pays" className="black-select search-input" placeholder="🔍 Rechercher un pays..." onChange={handlePaysSearch} />
                  <datalist id="list-pays">
                    <option value="Toutes les destinations" />
                    {Object.keys(PAYS_VILLES).map(p => <option key={p} value={p} />)}
                  </datalist>
               </div>

               {/* Recherche Ville */}
               <div className="filter-group">
                  <input 
                    list="list-villes" 
                    className="black-select search-input" 
                    placeholder="🔍 Rechercher une ville..." 
                    disabled={filtrePays === 'all'} 
                    onChange={(e) => {
                       const v = e.target.value;
                       if (v === "" || PAYS_VILLES[filtrePays]?.includes(v)) setFiltreVille(v === "" ? 'all' : v)
                    }} 
                  />
                  <datalist id="list-villes">
                    {filtrePays !== 'all' && PAYS_VILLES[filtrePays]?.map(v => <option key={v} value={v} />)}
                  </datalist>
               </div>
            </div>

            <div className="stat-card-visit">
              <p className="stat-number-large">{loading ? '...' : totalVisites}</p>
              <p className="stat-label-black">
                {filtrePays === 'all' ? "Visiteurs (Humains)" : `Visiteurs : ${filtrePays} ${filtreVille !== 'all' ? `> ${filtreVille}` : ''}`}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}