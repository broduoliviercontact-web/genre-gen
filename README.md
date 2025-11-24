# 🎵 GENRENATOR – Random Music Genre 

**Genrenator** est un petit jouet / sandbox pour musiciens et nerds du CSS :  
à chaque clic, l’app :

- génère un **nouveau style musical aléatoire** (via une API)
- l’affiche avec un **style de texte animé** aléatoire
- applique une **police ultra stylée** (metal, punk, cartoon, techno…)
- pose tout ça sur un **fond dynamique** lui aussi aléatoire

👉 Démo en ligne : **https://genrenarator.netlify.app/**  

---

## ✨ Fonctionnalités

- 🎲 **Genre aléatoire**  
  Récupéré depuis l’API [Binary Jazz – Genrenator](https://binaryjazz.us), puis formaté avec majuscule à chaque mot.

- 🎨 **Styles de texte animés**  
  Des dizaines (voire centaines 😈) d’effets CSS :
  - néon, glitch, VHS, chrome, hologramme  
  - waves, melts, spins 3D, glitch lines, heartbeat, etc.

- 🔤 **Polices custom “music vibes”**  
  Large collection de fonts :
  - polices metal / rock / punk
  - fonts pixel, arcade, comic, graffiti, handwrite…
  - plus une sélection aléatoire de “system fonts” pour varier encore plus

- 🌌 **Backgrounds dynamiques**  
  Fond aléatoire à chaque nouveau genre :
  - néon grid / synthwave  
  - purple fog, sunset glow, blue aurora, noise film…

- 🔘 **Bouton animé “New Genre”**  
  Bouton avec effet “arcade / arcade button”, survol & clic animés.

- 📱 **Responsive**  
  Interface adaptée aux mobiles, tablettes et desktop.

- 👣 **Footer**  
  Petit footer :  
  `made by pliskain` (lien mail) + lien vers l’API utilisée.

---

## 🧩 Stack technique

- [React](https://react.dev/)
- CSS pur (animations, @font-face, gradients…)
- Déploiement : [Netlify](https://www.netlify.com/)
- API : [Binary Jazz – Genrenator](https://binaryjazz.us/wp-json/genrenator/v1/genre/)

---

## 🚀 Installation & lancement en local

```bash
# 1. Cloner le repo
git clone https://github.com/ton-compte/ton-repo.git
cd ton-repo

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de dev
npm run dev        # (Vite)
# ou
npm start          # (Create React App, selon ta config)


🗂 Structure simplifiée du projet
public/
  fonts/
    music/
      ... toutes les polices custom (.ttf, .otf)

src/
  GenreGenerator.jsx    # Composant principal
  GenreGenerator.css    # Toutes les animations + @font-face
  AppFooter.jsx         # Petit footer "made by pliskain"
  main.jsx / App.jsx    # Entrée React standard

🙏 Crédits

API Genre :
Binary Jazz – Genrenator
 ❤️

Polices :
Une grande partie des fonts vient de sites comme 1001fonts.com
 & co.
Elles sont intégrées ici à des fins pédagogiques / démo, pas pour un usage commercial.

Inspiration CSS :
Plusieurs animations sont inspirées / remixées à partir de collections publiques de text-effects & text-animations (DevSnap, FreeFrontend, blogs CSS, etc.), puis réécrites / adaptées pour ce projet.

📜 Licence / usage

Projet perso / pédagogique.
Utilisation libre pour apprendre, forker, bidouiller, s’inspirer.
Pour un usage commercial, vérifiez bien les licences des polices et ressources que vous conservez.

📧 Contact

Made by pliskain
📩 pliskain@gmail.com

Si tu t’amuses avec ce projet, que tu l’utilises en cours ou en live, envoie un petit message, ça fera plaisir 🎧🔥
