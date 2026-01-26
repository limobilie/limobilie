'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import '../../styles/contact.css'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <Header />

      {/* HERO */}
      <div className="hero-image">
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
      </div>

      {/* SECTION CONTACT */}
      <section className="contact-section">
        <div className="contact-container">

          {/* BLOC INFOS AU-DESSUS */}
          <div className="contact-info-inline">
            <div className="info-block">
              <strong>Téléphone</strong>
              <p>07 08 27 81 35</p>
            </div>
            <div className="info-block">
              <strong>Adresse</strong>
              <p>
                Cocody, Riviera Golf 4, Laguna Golf<br />
                Abidjan
              </p>
            </div>
          </div>

          {/* FORMULAIRE */}
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom & Prénom *</label>
              <input type="text" id="name" placeholder="Entrez votre nom" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" placeholder="Entrez votre email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input type="tel" id="phone" placeholder="Entrez votre téléphone" />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input type="text" id="subject" placeholder="Sujet de votre message" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Votre message *</label>
              <textarea
                id="message"
                placeholder="Entrez votre message"
                rows="6"
                required
              ></textarea>
            </div>

            <div className="rgpd">
              <input type="checkbox" id="rgpd" required />
              <label htmlFor="rgpd">
                J'accepte le traitement de mes données personnelles conformément au RGPD.
              </label>
            </div>

            <p className="rgpd-text">
              Si vous ne souhaitez pas faire l'objet de prospection commerciale par voie téléphonique, 
              vous pouvez vous inscrire gratuitement sur la liste d'opposition au démarchage téléphonique sur 
              <a href="https://www.bloctel.gouv.fr" target="_blank">www.bloctel.gouv.fr</a>.
            </p>

            <button type="submit">Envoyer le message</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
