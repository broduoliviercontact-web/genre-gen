# 🎵 React Genre Generator

Petit projet React qui génère aléatoirement des noms de styles musicaux à partir de l'API **Genrenator** (`binaryjazz.us`), et les affiche avec **50 styles CSS animés** différents (glitch, néon, chrome, matrix, melting, 3D, etc.).

Idéal pour :
- s'amuser avec des genres musicaux absurdes 🤘  
- montrer des exemples de **text animations / text effects en CSS** à des élèves  
- expérimenter avec les `@keyframes`, `::before` / `::after`, `text-shadow`, `clip-path`, etc.

---

## 🚀 Fonctionnalités

- Récupération d’un genre musical aléatoire depuis l’API :

  ```text
  https://binaryjazz.us/wp-json/genrenator/v1/genre/5/
  ```

- Mise en forme du texte (majuscule sur chaque mot).
- Attribution **aléatoire d’un style visuel** parmi ~50 effets CSS :
  - Néon / glow
  - Chrome / métal
  - Matrix / glitch / VHS
  - Lava, fire, ice, hologram, pixel, outline, glass, etc.
- Un simple bouton **“Nouveau genre”** qui :
  - fetch un nouveau genre
  - choisit un nouveau style aléatoire

---

## 🧱 Stack technique

- **React** (hooks `useState`, `useEffect`)
- **CSS pur** (pas de Tailwind / pas de framework CSS)
- Fetch natif (`window.fetch`) vers une API publique

---

## 📁 Structure du projet

Les fichiers importants :

```text
src/
  GenreGenerator.jsx   # Composant principal React
  GenreGenerator.css   # Tous les styles + animations pour le texte
  App.jsx / App.js     # Point d'entrée qui importe <GenreGenerator />
```

Exemple d’utilisation dans `App.jsx` :

```jsx
import GenreGenerator from "./GenreGenerator";

function App() {
  return (
    <div>
      <GenreGenerator />
    </div>
  );
}

export default App;
```

---

## ⚙️ Installation & lancement

Dans un terminal, à la racine du projet :

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de dev
# selon ton setup :
npm run dev   # (Vite)
# ou
npm start     # (Create React App)
```

Ensuite ouvre ton navigateur sur l’URL indiquée (souvent `http://localhost:5173` pour Vite ou `http://localhost:3000` pour CRA).

---

## 🌐 À propos de l’API & CORS

Le composant utilise :

```js
const response = await fetch(
  "https://binaryjazz.us/wp-json/genrenator/v1/genre/5/"
);
```

Selon le navigateur / les règles CORS du serveur, il est possible que l’appel direct soit **bloqué** par le navigateur.

Si c’est le cas, deux solutions :

1. **Passer par un backend / proxy**  
   Exemple : route API dans un serveur Node, Express, ou Next.js qui fait le `fetch` côté serveur et renvoie le résultat au front.

2. **Remplacer l’API par un mock**  
   Par exemple un tableau local de genres aléatoires :

   ```js
   const MOCK_GENRES = [
     "Post-Internet Jazz",
     "Neo-Trap Ambient",
     "Electro-Breitling Core",
   ];
   ```

   et piocher dedans au hasard sans `fetch`.

---

## 🧠 Logique principale

Dans `GenreGenerator.jsx` :

- `STYLE_KEYS` : liste de toutes les clés de style disponibles.
- `getRandomStyle()` : choisit une clé de style au hasard.
- `formatGenre()` : met une majuscule à chaque mot.
- `fetchGenre()` :
  - `setLoading(true)` / `setError(null)`
  - `fetch(...)`
  - parsing du JSON (`Array` ou `string`)
  - formatage du texte
  - mise à jour du `genre` **et** du style aléatoire :

    ```js
    setGenre(formatted);
    setStyleKey(getRandomStyle());
    ```

- `useEffect(() => { fetchGenre(); }, [])` : charge un premier genre au montage du composant.

---

## 🎨 Styles & animations CSS

Dans `GenreGenerator.css` :

- Un style de base pour le conteneur :

  ```css
  .genre-generator {
    /* fond sombre, box-shadow, etc. */
  }
  ```

- Une classe commune pour le texte :

  ```css
  .genre-generator__genre {
    margin-top: 2rem;
    text-align: center;
    position: relative;
  }
  ```

- Puis **un style par effet**, par ex. :

  ```css
  .genre-generator__genre--neon { ... }
  .genre-generator__genre--matrix { ... }
  .genre-generator__genre--melting { ... }
  .genre-generator__genre--chrome { ... }
  /* etc. */
  ```

Beaucoup d’effets utilisent `data-text` dans le JSX pour créer des faux-doubles via `::before` / `::after` :

```jsx
<p
  className={`genre-generator__genre genre-generator__genre--${styleKey}`}
  data-text={genre}
>
  {genre}
</p>
```

Ce `data-text` est ensuite récupéré en CSS :

```css
.genre-generator__genre--matrix::before {
  content: attr(data-text);
  /* ... */
}
```

---

## 🔧 Ajouter un nouveau style

1. Choisir un nom de style, par exemple `myCrazyEffect`.
2. L’ajouter dans le tableau :

   ```js
   const STYLE_KEYS = [
     // ...
     "myCrazyEffect",
   ];
   ```

3. Créer la classe CSS correspondante dans `GenreGenerator.css` :

   ```css
   .genre-generator__genre--myCrazyEffect {
     /* tes propriétés, animations, shadows, etc. */
   }
   ```

4. (Optionnel) Utiliser aussi `::before` ou `::after` avec `content: attr(data-text);`.

À partir de là, le style sera automatiquement utilisé de temps en temps, via la sélection aléatoire.

---

## 🧪 Idées d’évolutions

- Page de **galerie** qui affiche tous les styles avec leur nom.
- Switch / toggle pour :
  - activer / désactiver certaines familles d’effets (glitch, néon, “calme”…)
  - choisir un style au lieu de le rendre aléatoire.
- Exporter les genres générés dans un fichier texte ou JSON (idées de noms d’EP 😏).
- Bouton “Copier le genre” pour le coller directement dans un projet musical.

---

## 📄 Licence

À adapter selon ton choix (MIT, Apache 2.0, etc.).

Exemple très courant :

```text
MIT License

Copyright (c) ...

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## 🙌 Crédit

- Idée de base de l’API : **Genrenator** (Binary Jazz)  
- De nombreux styles CSS sont inspirés de collections publiques d’animations et d’effets de texte (FreeFrontend, Prismic, etc.), puis réécrits / adaptés pour ce projet.
