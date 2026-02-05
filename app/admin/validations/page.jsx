'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import AuthModal from '@/app/components/AuthModal'
import { 
  FaPlusCircle, FaShieldAlt, FaCamera, FaListUl, FaClock, 
  FaCheckCircle, FaLock, FaMapMarkerAlt, FaUserShield 
} from 'react-icons/fa'
import '../../styles/propriétaire.css'

export default function ProprietairePage() {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [mesBiens, setMesBiens] = useState([]) 
  
  const [bien, setBien] = useState({
    titre: '',
    description: '',
    prix: '',
    type_bien: 'Appartement',
    commune: '',
    quartier: '',
    adresse_precise: '',
    num_lot: '',
    unites_locatives: '',
    type_document: 'ACD',
    frais_gestion_acceptes: false
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const role = session.user.user_metadata?.role || 'client'
        setUser(session.user)
        setUserRole(role)
        if (role === 'proprietaire') fetchMesBiens(session.user.id)
      }
      setLoading(false)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const role = session.user.user_metadata?.role || 'client'
        setUser(session.user)
        setUserRole(role)
        if (role === 'proprietaire') fetchMesBiens(session.user.id)
      } else {
        setUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchMesBiens = async (userId) => {
    const { data, error } = await supabase
      .from('biens_immobiliers')
      .select('*')
      .eq('proprietaire_id', userId)
      .order('date_creation', { ascending: false })
    if (!error) setMesBiens(data)
  }

  const uploadFile = async (file, bucket) => {
    if (!file) return null
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${user.id}/${fileName}`
    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file)
    if (uploadError) throw uploadError
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleAjouterBien = async (e) => {
    e.preventDefault()
    if (userRole !== 'proprietaire') return alert("Profil propriétaire requis.")
    if (!bien.frais_gestion_acceptes) return alert("Veuillez accepter les frais de gestion.")

    const photoInput = document.getElementById('photo_main')
    const docInput = document.getElementById('doc_propriete')
    const videoInput = document.getElementById('video_bien')

    if (!photoInput?.files?.[0] || !docInput?.files?.[0]) return alert("Photo et Document obligatoires.")

    setUploading(true)
    try {
      const imageUrl = await uploadFile(photoInput.files[0], 'photos_biens')
      const docUrl = await uploadFile(docInput.files[0], 'documents_propriete')
      const videoUrl = videoInput?.files?.[0] ? await uploadFile(videoInput.files[0], 'videos_biens') : null

      const { error } = await supabase.from('biens_immobiliers').insert([{ 
        ...bien, 
        prix: parseFloat(bien.prix), 
        proprietaire_id: user.id,
        image_url: imageUrl, 
        video_url: videoUrl, 
        document_url: docUrl, 
        statut: 'en_attente'
      }])

      if (error) throw error
      alert("🚀 Dossier transmis à la Mairie avec succès !");
      setBien({ titre: '', description: '', prix: '', type_bien: 'Appartement', commune: '', quartier: '', adresse_precise: '', num_lot: '', unites_locatives: '', type_document: 'ACD', frais_gestion_acceptes: false })
      fetchMesBiens(user.id)
    } catch (err) { alert(err.message) } finally { setUploading(false) }
  }

  // 1. ÉTAT CHARGEMENT
  if (loading) return <div className="loader-container">Vérification de sécurité...</div>

  // 2. ÉCRAN ROUGE SI CONNECTÉ MAIS PAS PROPRIÉTAIRE
  if (user && userRole !== 'proprietaire') {
    return (
      <>
        <Header isDashboard={true} /> {/* Header avec style Dashboard (souvent plus sombre ou coloré) */}
        <main className="owner-main">
          <div className="container-limited">
            <div className="admin-status-screen denied">
              <FaUserShield size={80} color="#ff0000" />
              <h1>Accès Réservé</h1>
              <div className="denied-info">
                <p><strong>Utilisateur :</strong> {user.email}</p>
                <p>Votre compte est actuellement défini comme <strong>{userRole}</strong>.</p>
                <p>Vous n'avez pas les droits nécessaires pour accéder à l'espace Bailleur Institutionnel.</p>
              </div>
              <button onClick={() => window.location.href='/'} className="main-btn btn-back-home">
                Retour à l'accueil
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // 3. RENDU NORMAL (PAS CONNECTÉ OU PROPRIÉTAIRE VALIDE)
  return (
    <>
      <Header />
      <main className="owner-main">
        <div className="container-limited">
          
          {!user ? (
            <section className="owner-hero-card">
              <div className="hero-icon-wrapper"><FaShieldAlt className="main-shield-icon" /></div>
              <h1 className="hero-title">Espace Bailleur Institutionnel</h1>
              <p className="hero-subtitle">Connectez-vous pour soumettre vos biens et bénéficier de la garantie de paiement mairie.</p>
              <button className="hero-cta-btn" onClick={() => setShowAuth(true)}>
                <FaLock /> S'identifier / Créer un compte
              </button>
            </section>
          ) : (
            <div className="dashboard-layout">
              <header className="dashboard-header">
                <div>
                  <h1>Tableau de bord Propriétaire</h1>
                  <p className="text-muted">Gérez vos biens et vos soumissions institutionnelles.</p>
                </div>
                <div className="mairie-badge"><FaShieldAlt /> Compte Certifié</div>
              </header>

              <section className="add-bien-section">
                <form onSubmit={handleAjouterBien} className="pro-form">
                  
                  <h3 className="form-subtitle"><FaPlusCircle /> 1. Détails du Bien</h3>
                  <div className="input-group">
                    <div className="input-field">
                      <label>Titre de l'annonce</label>
                      <input type="text" placeholder="ex: Appartement F4 de luxe" required value={bien.titre} onChange={(e) => setBien({...bien, titre: e.target.value})} />
                    </div>
                    <div className="input-field">
                      <label>Loyer mensuel (FCFA)</label>
                      <input type="number" required value={bien.prix} onChange={(e) => setBien({...bien, prix: e.target.value})} />
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-field">
                      <label>Type de bien</label>
                      <select value={bien.type_bien} onChange={(e) => setBien({...bien, type_bien: e.target.value})}>
                        <option value="Appartement">Appartement</option>
                        <option value="Studio">Studio</option>
                        <option value="Villa">Villa / Maison</option>
                        <option value="Magasin">Magasin / Bureau</option>
                      </select>
                    </div>
                    <div className="input-field">
                      <label>Unités (ex: 3 pièces, 2 douches)</label>
                      <input type="text" placeholder="ex: 2 pièces" value={bien.unites_locatives} onChange={(e) => setBien({...bien, unites_locatives: e.target.value})} />
                    </div>
                  </div>

                  <div className="input-field full-width">
                    <label>Description détaillée</label>
                    <textarea rows="3" placeholder="Décrivez les atouts du bien..." value={bien.description} onChange={(e) => setBien({...bien, description: e.target.value})}></textarea>
                  </div>

                  <h3 className="form-subtitle"><FaMapMarkerAlt /> 2. Localisation</h3>
                  <div className="input-group">
                    <div className="input-field">
                      <label>Commune</label>
                      <input type="text" required value={bien.commune} onChange={(e) => setBien({...bien, commune: e.target.value})} />
                    </div>
                    <div className="input-field">
                      <label>Quartier</label>
                      <input type="text" required value={bien.quartier} onChange={(e) => setBien({...bien, quartier: e.target.value})} />
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-field">
                      <label>Adresse précise</label>
                      <input type="text" value={bien.adresse_precise} onChange={(e) => setBien({...bien, adresse_precise: e.target.value})} />
                    </div>
                    <div className="input-field">
                      <label>Numéro de lot / îlot</label>
                      <input type="text" value={bien.num_lot} onChange={(e) => setBien({...bien, num_lot: e.target.value})} />
                    </div>
                  </div>

                  <h3 className="form-subtitle"><FaCamera /> 3. Médias & Juridique</h3>
                  <div className="input-group">
                    <div className="input-field">
                      <label>Photo principale (obligatoire)</label>
                      <input type="file" id="photo_main" accept="image/*" required className="file-input" />
                    </div>
                    <div className="input-field">
                      <label>Type de document</label>
                      <select value={bien.type_document} onChange={(e) => setBien({...bien, type_document: e.target.value})}>
                        <option value="ACD">ACD</option>
                        <option value="Titre Foncier">Titre Foncier</option>
                        <option value="Attestation Villageoise">Attestation Villageoise</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-field">
                      <label>Charger le document (PDF/Image)</label>
                      <input type="file" id="doc_propriete" accept=".pdf,image/*" required className="file-input" />
                    </div>
                    <div className="input-field">
                      <label>Vidéo (Optionnel)</label>
                      <input type="file" id="video_bien" accept="video/*" className="file-input" />
                    </div>
                  </div>

                  <div className="legal-notice-box">
                    <input type="checkbox" id="fees" required checked={bien.frais_gestion_acceptes} onChange={(e) => setBien({...bien, frais_gestion_acceptes: e.target.checked})} />
                    <label htmlFor="fees">J'accepte le prélèvement institutionnel de 8% (Gestion) et 4% (Mairie) sur les loyers encaissés.</label>
                  </div>

                  <button type="submit" className="main-btn" disabled={uploading}>
                    {uploading ? "Transfert en cours..." : "🚀 Envoyer le dossier à la Mairie"}
                  </button>
                </form>
              </section>

              <section className="mes-biens-section">
                <h3 className="section-title"><FaListUl /> Historique de mes soumissions</h3>
                <div className="biens-grid">
                  {mesBiens.length === 0 ? (
                    <div className="no-data">Aucun bien enregistré pour le moment.</div>
                  ) : (
                    mesBiens.map((item) => (
                      <div key={item.id} className="bien-mini-card">
                        <div className="bien-img-sm" style={{ backgroundImage: `url(${item.image_url})` }}>
                           <span className={`status-tag ${item.statut}`}>
                             {item.statut === 'en_attente' ? <FaClock /> : <FaCheckCircle />} 
                             {item.statut === 'en_attente' ? 'En vérification' : 'Validé'}
                           </span>
                        </div>
                        <div className="bien-info-sm">
                          <h4>{item.titre}</h4>
                          <p>{item.commune}, {item.quartier}</p>
                          <span className="bien-price">{parseInt(item.prix).toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} forcedRole="proprietaire" />
      <Footer />
    </>
  )
}