import { useState, useEffect } from "react";
import "./GenreGenerator.css";
import AppFooter from "./AppFooter"; // adapte le chemin si besoin

const STYLE_KEYS = [

    // === ADD THESE NEW COOL STYLES ===
    
  "hyperSpeed",

    // === NEW DESIGNYOURWAY INSPIRED STYLES ===
  "anaglyph3d",
  "peeled",
  "longShadow",
  "maskedPattern",
  "embossed",
  "slashed",
  "folded",
  "vintageLines",
  "soapBubble",
  "cautionTape",
  "superSaiyan",
  "blueprint",
  "xray",
  "vampireBite",
  "prism",
  "stickerSlap",
  "voidPortal",
  "bassDrop",
  "vinylSpin",
  "laserScan",
  "strobeBeat",
  "equalizerBars",
  "reverbEcho",
  "synthWave",
  "raveGlow",
  "tempoShake",
  "dubstepSlice",
  "sidechainPulse",
  "chorusEcho",
  "tapeWobble",
  "arenaLight",
  "clubTunnel",
  "morphWave",
  "bpmFlash",
  "monoStereo",
  "waveformTrace",
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
  "dropBounce",
  "scanLines",
  "flashStroke",
  "innerFade",
  "outlinePop",
  "shakeRotate",
  "glitchBlocks",
  "holoShift",
  "warpWave",
  // === FOOLISH DEVELOPER INSPIRED STYLES ===
  "liquidWater",
  "smokyDissolve",
  "cinematicZoom",
  "shiningGold",
  "neonFlicker",
  "elasticBounce",
  "layer3d",
  "focusBlur",

  "neonLights2",
  "rainbowSweep",
  "lineThrough3d",
  "neonBorder",
  "softGlitch",
  "musicGlow",
  "blendOverlay",
  "liquidDrop",
  "spookyBlur",
  "spaciousTracking",
  "cartoonPop",
  "tilt3d",
  "wordSwipe",
  "luminanceClip",
  "barFadeIn",
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
  "rockybilly",
  "quivert",
  "morvanh",
  "redband",
  "kaijuz",
  "simbiot",
  "noxis",
  "megaroomCrimes",
  "backToSchool",
  "timesMusic",
  "mosca",
  "larokeVortex",
  "dominionMusic",
  "angost",
  "chopin",
  "d2k",
  "dracutaz",
  "dragonforce",
  "grunge",
  "if",
  "maiden",
  "metalmania",
  "punkkid",
  "puree2",
  "queensoftheapocalypse",
  "scarbes",
  "scaryglyphs",
  "sedgwick",
  "sickness",
  "slaytanic",
  "thebattlecont",
  "waveform",
];

const SYSTEM_FONT_CHOICES = [
  '"Segoe UI", system-ui, sans-serif',
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
  '"Roboto", system-ui, sans-serif',
  '"Helvetica Neue", Arial, sans-serif',
  '"Nunito", system-ui, sans-serif',
  '"Fira Sans", system-ui, sans-serif',
    '"Segoe UI", system-ui, sans-serif',
  '"Helvetica Neue", Arial, sans-serif',

  // === HARD ROCK & HEAVY METAL ===
  '"Metal Mania", "Impact", "Haettenschweiler", sans-serif',  // Thrash / Heavy Metal
  '"Russo One", "Arial Black", sans-serif',                   // Industrial / Hard Rock
  '"Alfa Slab One", "Impact", sans-serif',                    // Stoner Rock / Doom
  '"Black Ops One", "Stencil", fantasy',                      // Nu-Metal / Military
  
  // === PUNK & GRUNGE ===
  '"Rock Salt", "Bradley Hand", cursive',                     // Grunge / Messy
  '"Permanent Marker", "Comic Sans MS", cursive',             // Punk / Garage
  
  // === GOTHIC & HORROR ===
  '"Creepster", "Chiller", fantasy',                          // Shock Rock / Horror
  '"UnifrakturMaguntia", "Old English Text MT", serif',       // Black Metal / Gothic
  
  // === PROG & ALTERNATIVE ===
  '"Copperplate", "Copperplate Gothic Bold", serif',          // Prog Rock
  '"Oswald", "Impact", sans-serif',                           // Alternative / Indie
  '"Bangers", "Impact", sans-serif',                          // Pop Punk
   // === HIP HOP / PARENTAL ADVISORY ===
  // Big, blocky, in-your-face
  '"Anton", "Impact", "Arial Black", "Haettenschweiler", sans-serif',
  '"Oswald", "Franklin Gothic Medium", sans-serif',

  // === INDIE / FOLK / ACOUSTIC ===
  // Handwritten, skinny, whimsical
  '"Amatic SC", "Bradley Hand", "Chalkboard SE", cursive',
  '"Shadows Into Light", "Patrick Hand", cursive',

  // === TECHNO / EDM / FUTURISTIC ===
  // Wide, geometric, sci-fi
  '"Audiowide", "Orbitron", "OCR A Std", monospace',
  '"Russo One", "Eurostile", "BankGothic", sans-serif',

  // === CLASSIC ROCK / 70s PSYCHEDELIC ===
  // Groovy scripts and thick serifs
  '"Lobster", "Brush Script MT", "Cooper Black", cursive',
  '"Alfa Slab One", "Rockwell Extra Bold", serif',

  // === JAZZ / SOUL / LUXURY ===
  // High contrast, elegant, fashion magazine style
  '"Playfair Display", "Didot", "Bodoni MT", serif',
  '"Cinzel", "Trajan Pro", serif',

  // === GRUNGE / INDUSTRIAL / 90s ===
  // Distressed, typewriter, messy
  '"Special Elite", "Courier New", "American Typewriter", monospace',
  '"Rock Salt", "Chalkduster", fantasy',

  // === VAPORWAVE / RETRO 80s ===
  // Neon style, brush scripts
  '"Permanent Marker", "Mistral", "Comic Sans MS", cursive',
  '"Bebas Neue", "Futura", sans-serif',

  // === METAL / HORROR SOUNDTRACK ===
  '"Creepster", "Chiller", "Ravie", fantasy',
  '"Metal Mania", "Stencil Std", "Impact", sans-serif',
];

function getRandomSystemFont() {
  const index = Math.floor(Math.random() * SYSTEM_FONT_CHOICES.length);
  return SYSTEM_FONT_CHOICES[index];
}


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
 <AppFooter />
      
    </div>
  );
}

export default GenreGenerator;
