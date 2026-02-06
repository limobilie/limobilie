/**
 * MOTEUR DE RECHERCHE ULTRA-INTELLIGENT LIMOBILIÉ (V4 - PRO)
 * IA Sémantique, Analyse de Budget et Logique Floue
 */

// --- OUTILS DE CALCUL ---

// Calcule la distance entre deux mots pour gérer les fautes de frappe
const levenshtein = (a, b) => {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) tmp[i] = [i];
  for (let j = 0; j <= b.length; j++) tmp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = a[i - 1] === b[j - 1] ? tmp[i - 1][j - 1] : Math.min(tmp[i - 1][j - 1] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j] + 1);
    }
  }
  return tmp[a.length][b.length];
};

// Nettoyage profond des chaînes (Accents, Caractères spéciaux)
const normalize = (str) => {
  return str ? str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") : "";
};

export const intelligentFilter = (biens, searchText) => {
  if (!searchText || searchText.trim().length === 0) return biens;

  const inputOriginal = searchText;
  const input = normalize(searchText);
  
  // --- 1. CONFIGURATION DES DICTIONNAIRES ---
  const config = {
    synonyms: {
      'maison': ['villa', 'duplex', 'triplex', 'maison', 'residence', 'concession', 'pavillon', 'entree couche'],
      'studio': ['studio', '1 piece', 'une piece', 'chambre salon', 'f1', 'studette', 'independant'],
      'appartement': ['appt', 'appartement', 'immeuble', 'etage', 'f2', 'f3', 'f4', 'f5', 'f6', 'condo'],
      'terrain': ['lot', 'parcelle', 'hectare', 'terrain', 'site', 'acd', 'tf', 'approbation'],
      'luxe': ['piscine', 'haut standing', 'moderne', 'propre', 'neuf', 'chic', 'standing', 'premium', 'jacuzzi', 'baignoire'],
      'meuble': ['equipe', 'meuble', 'pret a habiter', 'design', 'climatise', 'frigo', 'tv'],
      'pas cher': ['promotion', 'abordable', 'bas prix', 'moindre cout', 'petit budget', 'economique', 'cadeau', 'opportunite'],
    },
    communes: ['cocody', 'abobo', 'adjame', 'plateau', 'treichville', 'koumassi', 'marcory', 'port bouet', 'yopougon', 'bingerville', 'anyama', 'songon', 'bassam', 'jacqueville', 'assinie', 'yamoussoukro', 'bouake'],
    stopWords: ['je', 'veux', 'un', 'une', 'le', 'la', 'les', 'cherche', 'recherche', 'besoin', 'dans', 'autour', 'de', 'a', 'à', 'pour', 'environ', 'prix', 'budget', 'location', 'louer', 'secteur', 'zone', 'quartier', 'moi', 'quelque', 'chose', 'est-ce', 'que', 'svp', 'bonjour', 'limobilie']
  };

  // --- 2. EXTRACTION DES CRITÈRES NUMÉRIQUES ---

  // A. Budget
  const numbers = input.match(/\d+/g);
  let budget = null;
  if (numbers) {
    budget = Math.max(...numbers.map(Number));
    if (input.includes('k') && budget < 2000) budget *= 1000; // 200k -> 200000
    if (input.includes('million') || input.includes('m') && budget < 1000) budget *= 1000000; 
  }

  // B. Nombre de pièces
  const pieceRegex = /(\d+)\s*(piece|chambre|f)/;
  const piecesRecherchees = input.match(pieceRegex) ? parseInt(input.match(pieceRegex)[1]) : null;

  // C. Mots-clés restants
  const keywords = input.split(/\s+/)
    .filter(word => !config.stopWords.includes(word) && word.length > 1);

  // --- 3. ALGORITHME DE SCORING ---

  const results = biens.map(bien => {
    let score = 0;
    const bTitre = normalize(bien.titre);
    const bCommune = normalize(bien.commune);
    const bQuartier = normalize(bien.quartier);
    const bType = normalize(bien.type_bien);
    const bDesc = normalize(bien.description);
    const bPrix = parseFloat(bien.prix);
    const bFull = `${bTitre} ${bCommune} ${bQuartier} ${bType} ${bDesc}`;

    // A. Filtrage Prix (Coupure si > Budget + 15%)
    if (budget && budget > 10000) {
      if (bPrix > budget * 1.15) return { ...bien, searchScore: -1 };
      score += (bPrix <= budget) ? 25 : 10;
    }

    // B. Filtrage Pièces
    if (piecesRecherchees) {
      if (bFull.includes(`${piecesRecherchees} piece`) || bTitre.includes(`f${piecesRecherchees}`)) score += 35;
      else if (bFull.includes(piecesRecherchees.toString())) score += 10;
    }

    // C. Analyse des Mots-Clés et Synonymes
    keywords.forEach(word => {
      // Match direct (Très important)
      if (bFull.includes(word)) {
        score += 20;
        if (bCommune.includes(word)) score += 15; // Priorité à la localisation
        if (bQuartier.includes(word)) score += 12;
      }

      // Match Synonymes
      for (const [key, values] of Object.entries(config.synonyms)) {
        if (word === key || word.includes(key)) {
          if (values.some(v => bFull.includes(v))) score += 15;
        }
      }

      // Logique Floue (Levenshtein) sur les Communes
      config.communes.forEach(c => {
        if (word.length > 3 && levenshtein(word, c) === 1) {
          if (bCommune.includes(c)) score += 25; // On a trouvé la commune malgré l'erreur
        }
      });
    });

    return { ...bien, searchScore: score };
  });

  // --- 4. TRI ET RETOUR ---
  return results
    .filter(b => b.searchScore >= 0) // Supprime les hors-budgets
    .sort((a, b) => b.searchScore - a.searchScore) // Plus pertinent en haut
    .filter(b => b.searchScore > 5 || keywords.length === 0); // Écarte les résultats trop faibles
};