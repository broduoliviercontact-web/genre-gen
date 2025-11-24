// src/AppFooter.jsx
function AppFooter({
  authorName = "pliskain",
  authorEmail = "pliskain@gmail.com",
  apiName = "Binaryjazz",
  apiUrl = "https://binaryjazz.us/genrenator-api/",
}) {
  return (
    <footer className="genre-generator__footer">
      <span>
        Made by{" "}
        <a
          href={`mailto:${authorEmail}`}
          className="genre-generator__footer-link"
        >
          {authorName}
        </a>{" "}
        • Powered by{" "}
        <a
          href={apiUrl}
          target="_blank"
          rel="noreferrer"
          className="genre-generator__footer-link"
        >
          {apiName}
        </a>
      </span>
    </footer>
  );
}

export default AppFooter;
