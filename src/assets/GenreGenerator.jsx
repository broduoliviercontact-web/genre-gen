import { useState, useEffect } from "react";
import "./GenreGenerator.css";

const STYLE_KEYS = [
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
];


function getRandomStyle() {
  const index = Math.floor(Math.random() * STYLE_KEYS.length);
  return STYLE_KEYS[index];
}

function GenreGenerator() {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [styleKey, setStyleKey] = useState(() => getRandomStyle());

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

      // 👉 on change le genre ET on choisit un style aléatoire
      setGenre(formatted);
      setStyleKey(getRandomStyle());
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
        🎵 Random Genre : Genrenator 🎵
      </h1>

      <button
        onClick={fetchGenre}
        disabled={loading}
        className="genre-generator__button"
      >
        {loading ? "Chargement..." : "Nouveau genre"}
      </button>

      {error && (
        <p className="genre-generator__error">
          Erreur : {error}
        </p>
      )}

      {!error && genre && (
        <p
          className={`genre-generator__genre genre-generator__genre--${styleKey}`}
          data-text={genre}
        >
          {genre}
        </p>
      )}
    </div>
  );
}

export default GenreGenerator;
