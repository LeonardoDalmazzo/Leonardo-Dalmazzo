// components/layout/header/header.js
function loadHeader() {
  const header = document.createElement("header");
  header.id = "header";

  header.innerHTML = `
    <nav class="navbar" aria-label="Navega&ccedil;&atilde;o principal">
      <a class="nav-brand" href="${getLink("#home")}" aria-label="Ir para o in&iacute;cio">ADML</a>
      <div class="nav-actions">
        <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="primary-navigation" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-drawer" id="primary-navigation" data-nav-menu>
          <a href="${getLink("#home")}"><i class="fas fa-house" aria-hidden="true"></i> In&iacute;cio</a>
          <a href="${getLink("#about")}"><i class="fas fa-code" aria-hidden="true"></i> Sobre</a>
          <a href="services.html"><i class="fas fa-briefcase" aria-hidden="true"></i> <span>Servi<span class="nav-label__accent">&ccedil;</span>os</span></a>
          <a href="projects.html"><i class="fas fa-folder-open" aria-hidden="true"></i> Projetos</a>
          <a href="${getLink("#contact")}"><i class="fas fa-envelope" aria-hidden="true"></i> Contato</a>
        </div>
      </div>
    </nav>
  `;

  document.body.prepend(header);

  const themeButton = document.createElement("button");
  themeButton.id = "theme-toggle";
  themeButton.setAttribute("aria-label", "Alternar tema");
  themeButton.innerHTML = `<i class="fas fa-moon"></i>`;
  document.body.appendChild(themeButton);

  const scrollTopButton = document.createElement("button");
  scrollTopButton.id = "scroll-top";
  scrollTopButton.setAttribute("aria-label", "Voltar ao topo");
  scrollTopButton.innerHTML = `<i class="fas fa-arrow-up"></i>`;
  document.body.appendChild(scrollTopButton);

  function getLink(hash) {
    const isIndex = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    return isIndex ? hash : `index.html${hash}`;
  }

  const bodyElement = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const scrollTopBtn = document.getElementById("scroll-top");
  const menuToggleBtn = header.querySelector("[data-menu-toggle]");
  const navMenu = header.querySelector("[data-nav-menu]");

  function setMenuState(isOpen) {
    if (!menuToggleBtn || !navMenu) return;

    menuToggleBtn.classList.toggle("is-open", isOpen);
    navMenu.classList.toggle("is-open", isOpen);
    menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
    menuToggleBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  }

  function setThemeState(isDark) {
    bodyElement.classList.toggle("dark", isDark);

    if (toggleBtn) {
      toggleBtn.innerHTML = isDark
        ? `<i class="fas fa-sun"></i>`
        : `<i class="fas fa-moon"></i>`;
      toggleBtn.setAttribute("aria-label", isDark ? "Alternar para tema claro" : "Alternar para tema escuro");
    }

    window.dispatchEvent(new CustomEvent("site-theme-change", {
      detail: { theme: isDark ? "dark" : "light" }
    }));
  }

  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  if (!savedTheme) {
    localStorage.setItem("theme", initialTheme);
  }

  setThemeState(initialTheme === "dark");

  toggleBtn?.addEventListener("click", () => {
    const isDark = !bodyElement.classList.contains("dark");
    setThemeState(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  menuToggleBtn?.addEventListener("click", () => {
    const isOpen = menuToggleBtn.getAttribute("aria-expanded") !== "true";
    setMenuState(isOpen);
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    const isOpen = navMenu?.classList.contains("is-open");
    const clickedInsideMenu = navMenu?.contains(event.target);
    const clickedToggle = menuToggleBtn?.contains(event.target);

    if (isOpen && !clickedInsideMenu && !clickedToggle) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn?.classList.toggle("is-visible", window.scrollY > 320);
  });
}

document.addEventListener("DOMContentLoaded", loadHeader);
