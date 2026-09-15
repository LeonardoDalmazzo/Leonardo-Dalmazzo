document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  footer.innerHTML = `
    <div class="footer__container">
      <div class="footer__main">
        <div class="footer__intro">
          <p class="footer__name">Leonardo Dalmazzo</p>
          <p class="footer__message">Vamos conversar sobre seu pr&oacute;ximo projeto?</p>
        </div>
        <a class="footer__contact" href="https://wa.me/5511991795884" target="_blank" rel="noopener noreferrer">
          Fale comigo no WhatsApp
          <i class="fab fa-whatsapp" aria-hidden="true"></i>
        </a>
      </div>
      <div class="footer__bottom">
        <small class="footer__copyright">&copy; ${new Date().getFullYear()} Leonardo Dalmazzo. Todos os direitos reservados.</small>
        <nav class="footer__social" aria-label="Redes sociais">
          <a href="https://linkedin.com/in/leonardodalmazzo" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin-in" aria-hidden="true"></i>
            LinkedIn
          </a>
          <a href="https://github.com/LeonardoDalmazzo" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github" aria-hidden="true"></i>
            GitHub
          </a>
        </nav>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
});
