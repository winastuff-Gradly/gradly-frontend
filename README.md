# 💚 Gradly Frontend V2.5

Frontend React pour **Gradly** - _Le cœur avant les yeux_

Application de rencontre révolutionnaire avec photo 100% floutée et défloutage progressif basé sur les conversations.

---

## 📋 Stack Technique

- **Framework :** React 18
- **Build :** Vite
- **Routing :** React Router v6
- **Auth :** Supabase Auth
- **API :** Axios
- **Détection visage :** face-api.js
- **Animations :** Framer Motion
- **Confettis :** canvas-confetti
- **Toasts :** react-toastify
- **Graphiques :** recharts
- **Icônes :** lucide-react
- **Tests E2E :** Playwright

---

## 🔧 Installation

### 1. Prérequis

- Node.js >= 20.0.0
- npm >= 9.0.0
- Backend Gradly lancé sur `http://localhost:3000`
- Compte Supabase configuré

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration

Copier `.env.example` vers `.env.development` :

```bash
cp .env.example .env.development
```

Remplir les variables dans `.env.development` :

```bash
# API Backend
REACT_APP_API_URL=http://localhost:3000

# Supabase
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Télécharger les modèles face-api.js

Placer les 6 fichiers dans `public/models/` :
- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`
- `face_landmark_68_model-weights_manifest.json`
- `face_landmark_68_model-shard1`
- `face_recognition_model-weights_manifest.json`
- `face_recognition_model-shard1`

Télécharger depuis : https://github.com/justadudewhohacks/face-api.js/tree/master/weights

---

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`

### Build production

```bash
npm run build
```

### Preview production

```bash
npm run preview
```

---

## 📚 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarrer en mode développement (Vite) |
| `npm run build` | Build pour production |
| `npm run preview` | Preview du build |
| `npm test` | Lancer les tests unitaires |
| `npm run test:e2e` | Tests E2E Playwright |
| `npm run lint` | Linter le code |
| `npm run lint:fix` | Corriger automatiquement les erreurs |

---

## 🗂️ Structure du projet

```
gradly-frontend/
├── public/
│   ├── index.html         # HTML principal
│   ├── manifest.json      # PWA manifest
│   └── models/            # Modèles face-api.js (6 fichiers)
└── src/
    ├── App.js             # Composant principal + providers
    ├── index.js           # Point d'entrée
    ├── index.css          # CSS global + variables
    ├── config/            # Configuration (api, supabase)
    ├── services/          # Services (apiService, authService, faceDetection)
    ├── context/           # Contexts React (AuthContext, CreditsContext)
    ├── hooks/             # Hooks custom
    ├── pages/             # Pages principales + admin
    ├── components/        # Composants réutilisables + admin
    ├── styles/            # Styles (theme, animations)
    ├── utils/             # Utilitaires
    └── assets/            # Assets (sons)
```

---

## 🎨 Design

### Thème Dark Mode

- **Couleur primaire :** Vert émeraude (#10b981)
- **Couleur secondaire :** Rose/Rouge doux (#ff6b6b)
- **Background :** Noir profond (#0a0a0a)
- **Surface :** Gris anthracite (#1a1a1a)
- **Texte :** Blanc cassé (#f5f5f5)

### Polices

- **Titres :** Poppins (Google Fonts)
- **Corps :** Inter (Google Fonts)

### Accessibilité

- ✅ Contraste minimum 4.5:1 (WCAG AA)
- ✅ Taille texte ≥ 15px
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Texte alternatif sur toutes les images

---

## 🔐 Sécurité

### Détection Visage Obligatoire

Lors de l'inscription (Étape 2), une photo avec visage détectable est **obligatoire**.

- Modèles face-api.js chargés au démarrage
- Bouton "Suivant" disabled sans détection valide
- Message clair : "😅 On ne voit pas de visage sur ta photo"

### Auto-refresh Token

- Intercepteur Axios détecte `TOKEN_EXPIRED`
- Appel automatique `supabase.auth.refreshSession()`
- Rejoue la requête avec nouveau token
- Déconnexion si refresh échoue

### Protection Photo

- Check `photo_path` à chaque connexion
- Redirect `/register/photo` si manquante
- Pas d'accès Dashboard sans photo

---

## 🎯 Fonctionnalités Principales

### 1. Inscription (4 étapes)

1. **Infos perso** - Prénom, date de naissance, ville, code postal, sexe, orientation
2. **Photo** - Upload + détection visage obligatoire (bloquante)
3. **4 questions** - q1_smoke, q2_serious, q3_morning, q4_city
4. **Email + Password** - Création compte Supabase

### 2. Matching (30 secondes exactes)

- Animation style Hearthstone
- Progress bar circulaire 0% → 100%
- Carte compatibilité (score + distance + phrase)
- POST /matches/find (3 niveaux géo)

### 3. Chat

- **Layout responsive** - 40%|60% desktop, vertical mobile
- **Polling 2s** - setInterval(GET /chat/:id/messages, 2000)
- **Défloutage progressif** - CSS blur(99%) → blur(0%)
- **Animation Cupidon** - Flèche + son + vibration à chaque message
- **Barre progression** - "Défloutage : 42% 💘"
- **Message 100%** - Félicitations automatique + confettis

### 4. Paiements

- **Pack 3 crédits** - 4,99€
- **Pack 10 crédits** - 9,99€
- **Abonnement Mensuel** - 14,99€ (badge 💎)
- **Abonnement Annuel** - 99€ (badge 👑)
- **Confettis** après achat réussi

### 5. Panel Admin (7 pages)

- Dashboard stats + graphiques
- Liste reports + actions
- Recherche users + profils
- Monitoring logs
- Analytics funnels

---

## 🧪 Tests

### Tests E2E Playwright

```bash
npm run test:e2e
```

**Tests critiques :**
- ✅ Inscription 4 étapes + photo valide
- ✅ Photo sans visage refusée
- ✅ Matching → carte compatibilité → chat
- ✅ 100 messages → 100% défloutage
- ✅ Session expirée → auto-refresh
- ✅ Achat crédits → confettis

---

## 🌍 Déploiement

### Vercel

1. Créer compte Vercel
2. Import GitHub repo
3. Framework Preset : Create React App
4. Ajouter variables d'environnement :
   - `REACT_APP_API_URL=https://api.gradly.me`
   - `REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY=xxxxx`
5. Deploy automatique

### Variables d'environnement Production

```bash
REACT_APP_API_URL=https://api.gradly.me
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=xxxxx
```

---

## 📖 Documentation

- **Composants** - Liste des composants réutilisables
- **Hooks** - Hooks custom disponibles
- **Utils** - Fonctions utilitaires
- **Services** - Services API

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -m 'Ajout ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Créer une Pull Request

---

## 📝 License

**UNLICENSED** - Propriété privée de Gradly

---

## 👥 Équipe

Développé avec 💚 par l'équipe **Gradly**

Contact : contact@gradly.me

---

## 🔗 Liens

- [Backend API](https://github.com/gradly/gradly-backend)
- [Documentation](https://docs.gradly.me)
- [Site web](https://gradly.me)
- [Application](https://app.gradly.me)