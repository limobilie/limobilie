/**
 * MOTEUR DE RECHERCHE ULTRA-INTELLIGENT LIMOBILIÉ (V5 – PRO)
 * Filtrage strict + IA sémantique + Budget intelligent
 */

// ================= OUTILS =================

// Distance de Levenshtein (fautes de frappe)
const levenshtein = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : Math.min(dp[i - 1][j - 1] + 1, dp[i][j - 1] + 1, dp[i - 1][j] + 1);
    }
  }
  return dp[a.length][b.length];
};

// Normalisation texte
const normalize = (str) =>
  str
    ? str
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
    : "";

// ================= CONFIG =================

const config = {
  types: {
    studio: ["studio", "studette", "f1", "1 piece", "une piece", "chambre salon"],
    appartement: ["appartement", "appt", "f2", "f3", "f4", "f5"],
    maison: ["maison", "villa", "duplex", "triplex", "concession"],
    terrain: ["terrain", "lot", "parcelle", "hectare"],
  },
  communes: [
    "cocody", "abobo", "adjame", "plateau", "treichville",
    "koumassi", "marcory", "port bouet", "yopougon",
    "bingerville", "anyama", "songon", "bassam",
    "jacqueville", "assinie", "yamoussoukro", "bouake"
  ],
  stopWords: [
    "je", "veux", "cherche", "recherche", "un", "une", "des",
    "a", "à", "de", "pour", "dans", "en", "location", "louer",
    "budget", "prix", "svp", "bonjour", "limobilie"
  ]
};

// ================= MOTEUR =================

export const intelligentFilter = (biens, searchText) => {
  if (!searchText || !searchText.trim()) return biens;

  const input = normalize(searchText);

  // ===== 1. EXTRACTION CRITÈRES =====

  // Budget (max)
  const nums = input.match(/\d+/g);
  let budgetMax = null;
  if (nums) {
    budgetMax = Math.max(...nums.map(Number));
    if (input.includes("million") || input.includes("m")) {
      if (budgetMax < 1000) budgetMax *= 1_000_000;
    }
  }

  // Type de bien demandé
  let typeRecherche = null;
  for (const [type, words] of Object.entries(config.types)) {
    if (words.some(w => input.includes(w))) {
      typeRecherche = type;
      break;
    }
  }

  // Commune demandée (OBLIGATOIRE si présente)
  const communeRecherchee =
    config.communes.find(c => input.includes(c)) || null;

  // Mots clés utiles
  const keywords = input
    .split(/\s+/)
    .filter(w => !config.stopWords.includes(w) && w.length > 2);

  // ===== 2. FILTRAGE + SCORING =====

  const results = biens.map(bien => {
    let score = 0;

    const bTitre = normalize(bien.titre);
    const bType = normalize(bien.type_bien);
    const bCommune = normalize(bien.commune);
    const bQuartier = normalize(bien.quartier);
    const bDesc = normalize(bien.description);
    const bPrix = parseFloat(bien.prix || 0);

    const full = `${bTitre} ${bType} ${bCommune} ${bQuartier} ${bDesc}`;

    // 🔒 FILTRE STRICT COMMUNE
    if (communeRecherchee && !bCommune.includes(communeRecherchee)) {
      return { ...bien, searchScore: -1 };
    }

    // 🔒 FILTRE STRICT TYPE
    if (typeRecherche) {
      const motsType = config.types[typeRecherche];
      if (!motsType.some(w => full.includes(w))) {
        return { ...bien, searchScore: -1 };
      }
      score += 40;
    }

    // 🔒 FILTRE STRICT BUDGET
    if (budgetMax && bPrix > budgetMax) {
      return { ...bien, searchScore: -1 };
    }

    if (budgetMax) {
      score += bPrix <= budgetMax ? 25 : 10;
    }

    // ===== SCORING SÉMANTIQUE =====
    keywords.forEach(word => {
      if (full.includes(word)) score += 10;

      // Logique floue communes
      config.communes.forEach(c => {
        if (levenshtein(word, c) === 1 && bCommune.includes(c)) {
          score += 20;
        }
      });
    });

    return { ...bien, searchScore: score };
  });

  // ===== 3. TRI FINAL =====
  return results
    .filter(b => b.searchScore >= 0)
    .sort((a, b) => b.searchScore - a.searchScore);
};
