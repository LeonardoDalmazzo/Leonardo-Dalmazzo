document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
    <p>SPA (Single Page Application) / Portfolio</p>
    <small>
      Built with HTML, CSS & JS • Designed and developed by: © 2025 Leonardo Dalmazzo •
      <a href="https://github.com/LeonardoDalmazzo" target="_blank">
        <i class="fab fa-github"></i> GitHub
      </a> •
      <a href="https://linkedin.com/in/leonardodalmazzo" target="_blank">
        <i class="fab fa-linkedin"></i> LinkedIn
      </a>
    </small>
  `;

  document.body.appendChild(footer);
});