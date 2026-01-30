'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/contact.css'

export default function ContactPage() {
  
  const handleWhatsApp = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Construction du message WhatsApp élégant
    const text = `*NOUVEAU CONTACT SITE WEB*\n\n*👤 Nom:* ${name}\n*📌 Sujet:* ${subject}\n*💬 Message:* ${message}`;
    const encodedText = encodeURIComponent(text);
    
    window.open(`https://wa.me/2250545935673?text=${encodedText}`, '_blank');
  };

  return (
    <div className="contact-page">
      <Header />
      <main>
        {/* HERO SECTION PRO */}
        <section className="hero-image">
          <Image src="/images/contact.png" alt="Contact Limobilié" fill priority style={{ objectFit: 'cover' }} />
          <div className="hero-overlay">
            <h1>Parlons de votre projet</h1>
            <p>Une expertise immobilière à votre écoute pour un accompagnement sur mesure.</p>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-container">
            
            {/* INFOS CARDS */}
            <div className="contact-info-inline">
              <div className="info-block">
                <div className="info-icon">📞</div>
                <div>
                  <strong>Appelez-nous</strong>
                  <p>+225 05 45 93 56 73</p>
                </div>
              </div>
              <div className="info-block">
                <div className="info-icon">📍</div>
                <div>
                  <strong>Adresse</strong>
                  <p>Côte d’Ivoire, Abidjan, Bingerville, Paris-Village</p>
                </div>
              </div>
            </div>

            {/* FORMULAIRE PROFESSIONNEL */}
            <form className="contact-form" onSubmit={handleWhatsApp}>
              <h2 className="form-title">Envoyez-nous un message</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nom & Prénom *</label>
                  <input type="text" id="name" placeholder="Ex: Jean Kouassi" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Sujet de votre demande</label>
                  <input type="text" id="subject" placeholder="Ex: Achat de terrain / Devis" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Votre message *</label>
                <textarea id="message" placeholder="Détaillez votre projet ici..." rows="6" required></textarea>
              </div>

              <div className="form-footer">
                <button type="submit" className="submit-btn-whatsapp">
                   Continuer sur WhatsApp
                </button>
                <p className="form-note">Réponse généralement en moins de 30 minutes.</p>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}