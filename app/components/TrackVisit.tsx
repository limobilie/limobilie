'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TrackVisit() {
  useEffect(() => {
    const recordVisit = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // On récupère le pays et on le traduit immédiatement si c'est Ivory Coast
        let paysMatch = data.country_name || 'Inconnu';
        if (paysMatch === 'Ivory Coast') {
          paysMatch = "Côte d'Ivoire";
        }
        
        const villeMatch = data.city || 'Inconnu';

        // Insertion dans Supabase
        await supabase.from('visites').insert([{ 
          pays: paysMatch, 
          ville: villeMatch 
        }]);

      } catch (error) {
        console.error("Erreur tracking:", error);
        // En cas d'échec de l'API de géolocalisation, on enregistre une visite anonyme
        await supabase.from('visites').insert([{ 
          pays: 'Inconnu', 
          ville: 'Inconnu' 
        }]);
      }
    }
    
    // On ne lance le tracking qu'une seule fois par chargement de page
    recordVisit();
  }, [])

  return null // Le composant reste invisible
}