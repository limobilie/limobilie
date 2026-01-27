


"use client";

import { useEffect, useState } from "react";
import '../../styles/CookieBanner.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const refuseCookies = () => {
    localStorage.setItem("cookieConsent", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        <strong>Le respect de votre vie privée est une priorité.</strong><br />
        Nous utilisons des cookies pour améliorer votre expérience et proposer
        un contenu adapté. Vous pouvez accepter ou refuser les cookies non
        essentiels.
        <br />
        <a href="/politique-de-confidentialite">
          Politique de confidentialité
        </a>
      </p>

      <div className="cookie-actions">
        <button className="accept" onClick={acceptCookies}>
          Accepter
        </button>
        <button className="refuse" onClick={refuseCookies}>
          Refuser
        </button>
      </div>
    </div>
  );
}
