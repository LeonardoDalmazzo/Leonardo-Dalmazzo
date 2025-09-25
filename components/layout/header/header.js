// components/layout/header/header.js
function loadHeader() {
  const header = document.createElement("header");
  header.id = "header";

  header.innerHTML = `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <a href="${getLink("#home")}" aria-label="Go to Home section"><i class="fas fa-house"></i> Home</a>
      <a href="${getLink("#about")}" aria-label="Go to About section"><i class="fas fa-user"></i> About</a>
      <a href="${getLink("#contact")}" aria-label="Go to Contact section"><i class="fas fa-envelope"></i> Contact</a>
      <a href="${getLink("#moreOptions")}" aria-label="Go to More Options section"><i class="fas fa-plus"></i> More</a>
      
      <button id="theme-toggle" aria-label="Switch to dark theme">
        <i class="fas fa-moon"></i>
      </button>
    </nav>
  `;

  document.body.prepend(header);

  // ======== Funções auxiliares ========

  // Ajusta links de navegação: se estamos no index usa "#", se estamos fora usa "index.html#"
  function getLink(hash) {
    const isIndex = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    return isIndex ? hash : `index.html${hash}`;
  }

  // Atualiza label do botão de tema
  function updateThemeLabel(isDark) {
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  // ======== Toggle de tema ========
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      updateThemeLabel(document.body.classList.contains("dark"));
    });

    // Acessibilidade para teclado (Enter ou Espaço)
    toggleBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleBtn.click();
      }
    });

    // Estado inicial
    updateThemeLabel(document.body.classList.contains("dark"));
  }
}

// Chama a função ao carregar
document.addEventListener("DOMContentLoaded", loadHeader);
