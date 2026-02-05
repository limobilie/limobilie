const BienDetailsModal = ({ bien, isOpen, onClose }) => {
  const [activePhoto, setActivePhoto] = useState(bien?.image_url);

  if (!isOpen || !bien) return null;

  // Fusionner la photo principale et les secondaires pour la galerie
  const toutesLesPhotos = [bien.image_url, ...(bien.images_secondaires || [])];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        
        <div className="modal-body">
          {/* Photo principale affichée en grand */}
          <div className="main-display">
            <img src={activePhoto || bien.image_url} alt="Vue principale" />
          </div>

          {/* Miniatures cliquables */}
          <div className="thumbnail-bar">
            {toutesLesPhotos.map((url, idx) => (
              <img 
                key={idx} 
                src={url} 
                className={activePhoto === url ? 'thumb active' : 'thumb'}
                onClick={() => setActivePhoto(url)}
                alt={`Miniature ${idx}`}
              />
            ))}
          </div>

          <div className="details-info">
            <h2>{bien.titre}</h2>
            <p className="modal-price">{parseInt(bien.prix).toLocaleString()} FCFA / mois</p>
            <hr />
            <p><strong>Type:</strong> {bien.type_bien}</p>
            <p><strong>Localisation:</strong> {bien.commune}, {bien.quartier}</p>
            <p className="description">{bien.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};