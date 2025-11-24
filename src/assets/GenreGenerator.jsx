import { useState, useEffect } from "react";
import "./GenreGenerator.css";

const STYLE_KEYS = [
  // ⚠️ tu peux remettre ici TOUTE ta liste de styles
  "neon",
  "meta",
  "lights",
  "rainbow",
  "variable",
  "melting",
  "matrix",
  "spin",
  "burst",
  "shadowDance",
  "mask",
  "typewriter",
  "shimmer",
  "wave",
  "bounce",
  "glitch2",
  "fadeUp",
  "shadow3d",
  "reflect",
  "chrome",
  "outlineGlow",
  "blockSlide",
  "scanner",
  "lava",
  "hologram",
  "shadowLayers",
  "pixel",
  "stencil",
  "duotone",
  "innerShadow",
  "glass",
  "outlineDash",
  "fire",
  "ice",
  "rain",
  "vhs",
  "zoomPop",
  "spiral",
  "heartbeat",
  "shake",
  "tilt",
  "slideUp",
  "slideDown",
  "flipX",
  "flipY",
  "blurIn",
  "blurOut",
  "rainbowWave",
  "glitchLines",
  "strokeGrow",
   "slideReveal",
  "zoomRotate",
  "glowFlash",
  "outlineFill",
  "waveSkew",
  "shineSweep",
  "jumpWave2",
  "handWrite",
  "revealWords",
  "frozenGlow",
  "waveClip2",
  "smokeFade",
  "whipSpin",
  "gradientLoop",
  "particleGlow",
    "splitVertical",
  "dropBounce",
  "scanLines",
  "flashStroke",
  "innerFade",
  "outlinePop",
  "shakeRotate",
  "glitchBlocks",
  "holoShift",
  "warpWave",

];

function getRandomStyle() {
  const index = Math.floor(Math.random() * STYLE_KEYS.length);
  return STYLE_KEYS[index];
}

/* === FONTS ALÉATOIRES === */

const FONT_KEYS = [
  "sans",
  "serif",
  "mono",
  "bebas",
  "pixel",
  "cursive",
  "condensed",
  "funky",
  "metal",
  "punk",
  "gothic",
  "stencil",
  "retro80s",
  "techno",
  "handwritten",
  "brutal",
  "graffiti",
  "neonSign",
  "comic",
  "elegant",
  "slab",
  "thin",
  "typewriter2",
  "signature",
  "wide",
  "horror",
  // === nouvelles fonts 1001fonts ===
  "rockybilly",
  "quivert",
];




function getRandomFont() {
  const index = Math.floor(Math.random() * FONT_KEYS.length);
  return FONT_KEYS[index];
}

function GenreGenerator() {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠️ CES DEUX LIGNES DOIVENT ÊTRE DANS LA FONCTION, COMME ICI :
  const [styleKey, setStyleKey] = useState(() => getRandomStyle());
  const [fontKey, setFontKey] = useState(() => getRandomFont());

  // Mettre une majuscule à chaque mot
  function formatGenre(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  async function fetchGenre() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://binaryjazz.us/wp-json/genrenator/v1/genre/5/"
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      let value;
      if (Array.isArray(data)) {
        value = data[0];
      } else if (typeof data === "string") {
        value = data;
      } else {
        value = JSON.stringify(data);
      }

      const formatted = formatGenre(value);

      // 👉 on change le genre, le style ET la font
      setGenre(formatted);
      setStyleKey(getRandomStyle());
      setFontKey(getRandomFont());
    } catch (err) {
      setError(err.message || "Erreur lors du chargement du genre.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <div className="genre-generator">
      <h1 className="genre-generator__title">
     
      </h1>

<button
  onClick={fetchGenre}
  disabled={loading}
  className="genre-generator__button"
>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  {loading ? "Chargement..." : "🎵 GENRENATOR 🎵"}
</button>

      {error && (
        <p className="genre-generator__error">
          Erreur : {error}
        </p>
      )}

      {!error && genre && (
        <p
          className={
            `genre-generator__genre ` +
            `genre-generator__genre--${styleKey} ` +
            `font-${fontKey}`
          }
          data-text={genre}
        >
          {genre}
        </p>
      )}
    </div>
  );
}

export default GenreGenerator;
