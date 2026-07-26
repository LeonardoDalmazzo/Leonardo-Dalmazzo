document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
    <p>SPA (Aplica&ccedil;&atilde;o de P&aacute;gina &Uacute;nica) / Portf&oacute;lio</p>
    <small>
      Criado com HTML, CSS e JS &bull; Projetado e desenvolvido por: &copy; 2025 Leonardo Dalmazzo &bull;
      <a href="https://github.com/LeonardoDalmazzo" target="_blank">
        <i class="fab fa-github"></i> GitHub
      </a> &bull;
      <a href="https://linkedin.com/in/leonardodalmazzo" target="_blank">
        <i class="fab fa-linkedin"></i> LinkedIn
      </a>
    </small>
  `;

  document.body.appendChild(footer);
});
