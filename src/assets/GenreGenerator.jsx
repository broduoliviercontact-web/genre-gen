import { useState, useEffect, useRef } from "react";
import "./GenreGenerator.css";
import AppFooter from "./AppFooter";
import SaveImageButton from "./SaveImageButton";

const STYLE_KEYS = [
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

  // === NEW STYLES ===
  "hyperSpeed",
  "toxicSlime",
  "cyberGlitch",
  "goldenLux",
  "retroTerminal",
  "popArt",
  "electricZap",
  "chromaticAb",
  "steampunk",
  "magicalGirl",
  "paperCut",

  // === DESIGNYOURWAY INSPIRED ===
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

  // === FOOLISH DEVELOPER INSPIRED ===
  "liquidWater",
  "smokyDissolve",
  "cinematicZoom",
  "shiningGold",
  "neonFlicker",
  "elasticBounce",
  "layer3d",
  "focusBlur",
];

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

  // === NEW FONTS ===
  "audiowide",
  "rockSalt",
  "permanentMarker",
  "cinzel",
  "stardos",
  "russo",
  "neonderthaw",
  "bangers",
  "playfair",
  "alfa",
  "amatic",
  "specialElite",
  "shadows",
  "unica",
  "creepster",
  "impact",
  "courier",
  "times",
  "comicSans",
  "arialBlack",
];

function getRandomStyle() {
  const index = Math.floor(Math.random() * STYLE_KEYS.length);
  return STYLE_KEYS[index];
}

function getRandomFont() {
  const index = Math.floor(Math.random() * FONT_KEYS.length);
  return FONT_KEYS[index];
}

function GenreGenerator() {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [styleKey, setStyleKey] = useState(() => getRandomStyle());
  const [fontKey, setFontKey] = useState(() => getRandomFont());
  
  const captureRef = useRef(null);

  function formatGenre(text) {
    if (!text) return "";
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
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
        {/* Static title or empty */}
      </h1>

      <button
        onClick={fetchGenre}
        disabled={loading}
        className="genre-generator__button"
      >
        {loading ? "LOADING..." : "🎵 GENERATE 🎵"}
      </button>

      {error && <p className="genre-generator__error">Erreur : {error}</p>}

      {!error && genre && (
        <p
          ref={captureRef}
          className={
            `genre-generator__genre ` +
            `genre-generator__genre--${styleKey} ` +
            `font-${fontKey}`
          }
          data-text={genre}
          // Inline-block ensures screenshot captures only the text bounds
          style={{ display: 'inline-block' }} 
        >
          {genre}
        </p>
      )}

      
      <div className="genre-generator__bottom-controls">
        <SaveImageButton 
            captureRef={captureRef} 
            fileName={`genre-${styleKey}`} 
        />
      </div>

      <AppFooter />
    </div>
    
  );
}

export default GenreGenerator;