'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { 
  FaHome, 
  FaPlusCircle, 
  FaFileUpload, 
  FaMapMarkerAlt, 
  FaShieldAlt, 
  FaInfoCircle,
  FaCamera,
  FaVideo
} from 'react-icons/fa'
import '../../styles/propriétaire.css'

export default function ProprietairePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  
  const [bien, setBien] = useState({
    titre: '',
    type_bien: 'Appartement',
    prix: '',
    commune: '',
    quartier: '',
    adresse_precise: '',
    num_lot: '',
    unites_locatives: '1',
    description: '',
    type_document: 'ACD'
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Fonction d'upload avec identification précise de l'erreur
  const uploadFile = async (file, bucket) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        // Erreur spécifique si le bucket est manquant
        if (uploadError.message.includes('bucket not found')) {
          throw new Error(`Le dossier "${bucket}" n'existe pas dans le Storage Supabase. Veuillez le créer.`);
        }
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
      return data.publicUrl
    } catch (err) {
      throw err;
    }
  }

       const handleAjouterBien = async (e) => {
    e.preventDefault()
    if (!user) return
    setUploading(true)

    try {
      const photoFile = document.getElementById('photo_main').files[0]
      const videoFile = document.getElementById('video_bien').files[0]
      const docFile = document.getElementById('doc_propriete').files[0]

      if (!photoFile || !docFile) {
        throw new Error("La photo et le document de propriété sont obligatoires.");
      }

      // 1. Uploads (On garde ta logique qui fonctionne)
      console.log("Uploads en cours...");
      const imageUrl = await uploadFile(photoFile, 'photos_biens')
      const docUrl = await uploadFile(docFile, 'documents_propriete')
      let videoUrl = videoFile ? await uploadFile(videoFile, 'videos_biens') : ''

      // 2. Insertion SQL : ON LISTE LES COLONNES EXPLICITEMENT
      // N'utilise plus "...bien" car il peut contenir des clés qui n'existent pas en SQL
      const { error: dbError } = await supabase.from('biens_immobiliers').insert([
        { 
          titre: bien.titre,
          type_bien: bien.type_bien,
          prix: parseFloat(bien.prix) || 0, 
          commune: bien.commune,
          quartier: bien.quartier,
          num_lot: bien.num_lot,
          proprietaire_id: user.id, 
          image_url: imageUrl,
          video_url: videoUrl,
          document_url: docUrl,
          statut: 'en_attente',
          frais_gestion_acceptes: true 
        }
      ])

      if (dbError) throw dbError

      alert("🚀 Dossier transmis avec succès à la Mairie !");
      window.location.reload()

    } catch (error) {
      console.error("Détail erreur:", error)
      alert("Erreur lors de l'envoi : " + error.message)
    } finally {
      setUploading(false)
    }
  }



  if (loading) return <div className="loader-container"><p>Chargement du portail sécurisé...</p></div>

  return (
    <>
      <Header />
      <main className="owner-main">
        <div className="container-limited">
          {!user ? (
            <div className="owner-portal-card" style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <FaHome size={80} color="#ff0000" style={{ marginBottom: '20px' }} />
              <h1>Espace Bailleur Sécurisé</h1>
              <p>Créez un compte bailleur pour soumettre vos preuves de propriété.</p>
              <button className="login-trigger-btn" onClick={() => window.dispatchEvent(new CustomEvent('openAuth'))}>
                S'identifier / S'inscrire
              </button>
            </div>
          ) : (
            <div className="add-bien-section">
              <div className="section-header">
                <h1>Bonjour, {user.user_metadata?.nom_complet || 'Cher Bailleur'}</h1>
                <p style={{ color: '#d35400', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaShieldAlt /> Portail de Validation Institutionnelle
                </p>
              </div>

              <div className="info-banner">
                <FaInfoCircle />
                <span>Vérification municipale sous 48h à 72h.</span>
              </div>

              <form onSubmit={handleAjouterBien} className="pro-form">
                <h3 className="form-subtitle"><FaPlusCircle /> 1. Descriptif du bien</h3>
                <div className="input-group">
                  <div className="input-field">
                    <label>Titre de l'annonce</label>
                    <input type="text" placeholder="Ex: Studio moderne Angré" required value={bien.titre} onChange={(e) => setBien({...bien, titre: e.target.value})} />
                  </div>
                  <div className="input-field">
                    <label>Type de bien</label>
                    <select value={bien.type_bien} onChange={(e) => setBien({...bien, type_bien: e.target.value})}>
                      <option value="Chambre">Chambre seule</option>
                      <option value="Studio">Studio</option>
                      <option value="Appartement">Appartement</option>
                      <option value="Maison">Maison / Villa</option>
                    </select>
                  </div>
                </div>

                <h3 className="form-subtitle"><FaMapMarkerAlt /> 2. Localisation & Prix</h3>
                <div className="input-group">
                  <div className="input-field">
                    <label>Ville / Commune</label>
                    <input type="text" placeholder="Ex: Tiassalé" required value={bien.commune} onChange={(e) => setBien({...bien, commune: e.target.value})} />
                  </div>
                  <div className="input-field">
                    <label>Quartier</label>
                    <input type="text" placeholder="Ex: Quartier Commerce" required value={bien.quartier} onChange={(e) => setBien({...bien, quartier: e.target.value})} />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-field">
                    <label>Loyer mensuel (FCFA)</label>
                    <input type="number" placeholder="Ex: 75000" required value={bien.prix} onChange={(e) => setBien({...bien, prix: e.target.value})} />
                  </div>
                  <div className="input-field">
                    <label>Numéro de lot</label>
                    <input type="text" placeholder="Optionnel" value={bien.num_lot} onChange={(e) => setBien({...bien, num_lot: e.target.value})} />
                  </div>
                </div>

                <h3 className="form-subtitle"><FaCamera /> 3. Médias du bien</h3>
                <div className="input-group">
                  <div className="input-field">
                    <label>Photo principale</label>
                    <input type="file" id="photo_main" accept="image/*" required className="file-input" />
                  </div>
                  <div className="input-field">
                    <label>Vidéo (Optionnel)</label>
                    <input type="file" id="video_bien" accept="video/*" className="file-input" />
                  </div>
                </div>

                <h3 className="form-subtitle"><FaFileUpload /> 4. Preuve de propriété</h3>
                <div className="input-field">
                  <label>Type de document</label>
                  <select value={bien.type_document} onChange={(e) => setBien({...bien, type_document: e.target.value})}>
                      <option value="ACD">ACD</option>
                      <option value="Titre Foncier">Titre Foncier</option>
                      <option value="Attestation Villageoise">Attestation Villageoise</option>
                  </select>
                </div>
                <div className="file-upload-zone">
                  <p>Charger le document (PDF, JPG)</p>
                  <input type="file" id="doc_propriete" required className="file-input" />
                </div>

                <div className="legal-notice">
                  <h4>Mandat de Gestion</h4>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" required /> Je signe électroniquement le mandat.
                  </label>
                </div>

                <button type="submit" className="main-btn" disabled={uploading}>
                  {uploading ? "Patientez..." : "🚀 Soumettre pour contrôle Mairie"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}