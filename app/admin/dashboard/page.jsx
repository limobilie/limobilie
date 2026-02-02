'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { PAYS_VILLES } from '@/data/countries' 
import '@/styles/dashboard.css' 

export default function Dashboard() {
  const router = useRouter()
  const [souscriptions, setSouscriptions] = useState([])
  const [totalVisites, setTotalVisites] = useState(0)
  const [loading, setLoading] = useState(true)

  const [filtreDate, setFiltreDate] = useState('all')
  const [dateSpecifique, setDateSpecifique] = useState('')
  const [filtrePays, setFiltrePays] = useState('all')
  const [filtreVille, setFiltreVille] = useState('all')

  useEffect(() => {
    async function checkAuthAndFetch() {
      setLoading(true)
      
      // SECURITÉ : Vérifier si l'utilisateur est connecté avant de charger les données
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

        let queryVisites = supabase
          .from('visites')
          .select('*', { count: 'exact', head: true })

        if (filtreDate === 'today') {
          const today = new Date(); today.setHours(0, 0, 0, 0)
          queryVisites = queryVisites.gte('date_visite', today.toISOString())
        } 
        else if (filtreDate === 'custom' && dateSpecifique) {
          const debut = new Date(dateSpecifique); debut.setHours(0, 0, 0, 0)
          const fin = new Date(dateSpecifique); fin.setHours(23, 59, 59, 999)
          queryVisites = queryVisites.gte('date_visite', debut.toISOString()).lte('date_visite', fin.toISOString())
        }

        if (filtrePays !== 'all') queryVisites = queryVisites.eq('pays', filtrePays)
        if (filtreVille !== 'all') queryVisites = queryVisites.eq('ville', filtreVille)

        const resVisites = await queryVisites
        if (resSous.data) setSouscriptions(resSous.data)
        if (resVisites.count !== null) setTotalVisites(resVisites.count)

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
    } else if (valeur === "") {
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
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-title">Souscripteurs Tontine</h3>
              <p className="stat-number">{loading ? '...' : souscriptions.length}</p>
              <span className="stat-hint">Total inscriptions</span>
            </div>
          </div>

          {/* ... reste de ton code de table et filtres inchangé ... */}
          <div className="table-section">
            <h2 className="section-title">Liste des Souscripteurs Tontine</h2>
            <div className="table-wrapper">
              <table className="data-table">
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

          <div className="visits-section-bottom">
            <h2 className="section-title">Statistiques des Visites</h2>
            <div className="filters-bar search-mode">
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
               <div className="filter-group">
                  <input list="list-pays" className="black-select search-input" placeholder="🔍 Rechercher un pays..." onChange={handlePaysSearch} />
                  <datalist id="list-pays">
                    <option value="Toutes les destinations" />
                    {Object.keys(PAYS_VILLES).map(p => <option key={p} value={p} />)}
                  </datalist>
               </div>
               <div className="filter-group">
                  <input list="list-villes" className="black-select search-input" placeholder="🔍 Rechercher une ville..." disabled={filtrePays === 'all'} 
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
                {filtrePays === 'all' ? "Visiteurs (Monde Entier)" : `Visiteurs : ${filtrePays} ${filtreVille !== 'all' ? `> ${filtreVille}` : ''}`}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}