import { useState, useEffect } from "react";

function GenreGenerator() {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
console.log(response.json);

      // L'API peut renvoyer un tableau ou une simple string,
      // on gère les deux cas.
      let value;
      if (Array.isArray(data)) {
        value = data[0];
      } else if (typeof data === "string") {
        value = data;
      } else {
        value = JSON.stringify(data);
      }

      setGenre(value);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement du genre.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // On charge un premier genre au montage du composant
    fetchGenre();
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: 480,
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: 12,
        border: "1px solid #ddd",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
        🎵 Random Genre (Genrenator)
      </h1>

      <button
        onClick={fetchGenre}
        disabled={loading}
        style={{
          padding: "0.6rem 1rem",
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {loading ? "Chargement..." : "Nouveau genre"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Erreur : {error}
        </p>
      )}

      {!error && genre && (
        <p
          style={{
            marginTop: "1.2rem",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          {genre}
        </p>
      )}
    </div>
  );
}

export default GenreGenerator;
