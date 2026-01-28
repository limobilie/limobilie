'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/contact.css'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <Header />

      <main>
        {/* SECTION HERO */}
        <section className="hero-image">
          <Image
            src="/images/contact.webp"
            alt="Contact immobilier Abidjan"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-overlay">
            <h1>Contactez-nous</h1>
            <p>Nous sommes là pour vous accompagner dans vos projets immobiliers</p>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section className="contact-section">
          <div className="contact-container">

            {/* BLOC INFOS AU-DESSUS */}
            <div className="contact-info-inline">
              <div className="info-block">
                <span className="info-icon">📞</span>
                <div>
                  <strong>Téléphone</strong>
                  <p>07 08 27 81 35</p>
                </div>
              </div>
              <div className="info-block">
                <span className="info-icon">📍</span>
                <div>
                  <strong>Adresse</strong>
                  <p>
                    Cocody, Riviera Golf 4, Laguna Golf<br />
                    Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULAIRE */}
            <form className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nom & Prénom *</label>
                  <input type="text" id="name" placeholder="Votre nom complet" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" placeholder="votre@email.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input type="tel" id="phone" placeholder="Votre numéro" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input type="text" id="subject" placeholder="Sujet de votre message" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Votre message *</label>
                <textarea
                  id="message"
                  placeholder="Comment pouvons-nous vous aider ?"
                  rows="6"
                  required
                ></textarea>
              </div>

              <div className="form-footer">
                <div className="rgpd">
                  <input type="checkbox" id="rgpd" required />
                  <label htmlFor="rgpd">
                    J'accepte le traitement de mes données personnelles conformément au RGPD.
                  </label>
                </div>

                <p className="rgpd-text">
                  Si vous ne souhaitez pas faire l'objet de prospection commerciale par voie téléphonique, 
                  vous pouvez vous inscrire gratuitement sur <a href="https://www.bloctel.gouv.fr" target="_blank" rel="noopener noreferrer">www.bloctel.gouv.fr</a>.
                </p>

                <button type="submit" className="submit-btn">Envoyer le message</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}