import { useState, useEffect, useRef } from "react";
import "./GenreGenerator.css";
import AppFooter from "./AppFooter";
import SaveImageButton from "./SaveImageButton.jsx";
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const STYLE_KEYS = [
//
"animated-text-fill", 
"animated-signature", 
"line-text-animation", 
"animated-text-shadow-pattern", 
"svg-path-animated-text", 
"multi-layered-text-shadow", 
"neon-text-shadow", 
"embossed-shadow", 
"3d-letters", 
"3d-text-shadow",
 "striped-text-background", 
 "gradient-clipped-text", 
 "image-clipped-text", 
 "underline-clip-hover", 
 "neon-hover-glow", 
 "spring-pop-hover", 
 "glitching-text", 
 "sliced-text", 
 "fire-text-shadow", 
 "pixelated-arcade-typography", 
 "text-reveal", 
 "shimmer-text", 
 "ribbon-text", 
 "skewed-multiline", 
 "typing-animation", 
 "rotating-text", 
 "animated-gradient-text", 
 "split-clip-path", 
 "text-reflect", 
 "drop-cap", 
 "text-blur", 
 "blend-mode-effects", 
 "parallax-text", 
 "masked-gradient", 
 "text-stroke-outline", 
 "outline-fill", 
 "liquid-fill", 
 "soap-bubble", 
 "caution-tape", 
 "long-shadow", 
 "peeled-sticker", 
 "anaglyph-3d", 
 "vintage-retro-lines", 
 "embossed-metal", 
 "masked-pattern", 
 "metallic-chrome", 
 "hologram", 
 "vhs-glitch", 
 "neon-flicker", 
 "hand-written-draw",


  //

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
  "glitchRGB",
"glitchVHS",
"glitchJitter",
"glitchScan",
"glitchAscii",
"glitchPixel",
    // ... tes anciens styles ...
  
  "jellyWobble",
  "crtTurnOn",
  "searchlight",
  "circuitBoard",

  "ghostFloat",
  "vaporGrid",
  "pixelSort",
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
  "jumpWave2",
  "handWrite",
  "revealWords",
  "frozenGlow",
  "waveClip2",
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
  "neonLights2",
  "rainbowSweep",
  "lineThrough3d",
  "neonBorder",
  "softGlitch",
  "musicGlow",
  "blendOverlay",
//
  "rainbowSlide",
  "hueShift",
  "chromaWave",
  "neonPulse",
  "spectrumBars",
  "prismRotate",
  "kineticGradient",
  "thermal",
  "strobeRainbow",
  "holoShift",
  "spectralOutline",
  "multiStroke",
  "aurora",
  "disco",
  "maskSweep",
  "prismGlint",
  "spookyBlur",
  "spaciousTracking",
  "cartoonPop",
  "tilt3d",
  "wordSwipe",
  "luminanceClip",
  "barFadeIn",

  // === NEW STYLES ===
  "hyperSpeed",

  "cyberGlitch",
  "goldenLux",
  "popArt",

  "chromaticAb",
  "magicalGirl",

  // === DESIGNYOURWAY INSPIRED ===
  "anaglyph3d",
  "peeled",
  "longShadow",
  "maskedPattern",
  "embossed",
  "slashed",

  "vintageLines",
  "soapBubble",
  "cautionTape",
  "superSaiyan",
  "blueprint",


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
    "badComa",
  "metropolitan",
  "creamCake",
  "nextUpsBlack",
  "aerosoldier",
  "docallisme",
  "graffitiYouth",
  "saiba45",
  "saiba45Outline",
  "polarSnow",
    "darkcastle",
  "streetsoul",
  "gangsta",
  "cyberpunk",
  "lcd",
  "lazer",
  "roadrage",
  "hippie",
  "luxepop",
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

  "dracutaz",
  "dragonforce",
  "grunge",
  "if",
  "maiden",
  "metalmania",
  "punkkid",
  "puree2",
  "queensoftheapocalypse",
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

const EXTRA_FONT_KEYS = [
  "retroDisplay",
  "neonBlock",
  "vapor80s",
  "astro",
  "chromeCold",
  "graffitiTag",
  "rawHand",
  "luxe",
  "typedColor",
  "chip",
  "metalSplash",
  "disco",
  "blackGoth",
  "retroRounded",
  "neonOutline",
  "brush",
  "tapeWarm",
  "synth",
  "pastelDuo",
  "grungeFade",
  "chromeWarm",
  "electric",
  "arcade",
  "signatureColor",
    "badComa",
  "metropolitan",
  "creamCake",
  "nextUpsBlack",
  "aerosoldier",
  "docallisme",
  "graffitiYouth",
  "saiba45",
  "saiba45Outline",
  "polarSnow",
];

function getRandomStyle() {
  const index = Math.floor(Math.random() * STYLE_KEYS.length);
  return STYLE_KEYS[index];
}

function getRandomFont() {
  // Merge original FONT_KEYS with EXTRA_FONT_KEYS at runtime
  const pool = Array.isArray(FONT_KEYS) ? FONT_KEYS.concat(EXTRA_FONT_KEYS) : EXTRA_FONT_KEYS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
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

      
      {/* <div className="genre-generator__bottom-controls">
        <SaveImageButton 
            captureRef={captureRef} 
            fileName={`genre-${styleKey}`} 
        />
      </div> */}

      <AppFooter />
    </div>
    
  );
}

export default GenreGenerator;