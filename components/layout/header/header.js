// components/layout/header/header.js
// Resolve paths from this shared script, including pages in nested directories.
const siteRootUrl = new URL("../../../", document.currentScript.src);

function loadHeader() {
  const header = document.createElement("header");
  header.id = "header";

  header.innerHTML = `
    <nav class="navbar" aria-label="Navega&ccedil;&atilde;o principal">
      <a class="nav-brand" href="${getLink("#home")}" aria-label="Ir para o in&iacute;cio">ADML</a>
      <div class="nav-actions">
        <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="primary-navigation" aria-expanded="false" data-menu-toggle>
          <i class="fas fa-bars" aria-hidden="true"></i>
          <span>Menu</span>
        </button>
        <div class="nav-drawer" id="primary-navigation" data-nav-menu>
          <a href="${getLink("services.html")}"><i class="fas fa-briefcase" aria-hidden="true"></i> Servi&ccedil;os</a>
          <a href="${getLink("projects.html")}"><i class="fas fa-laptop-code" aria-hidden="true"></i> Projetos</a>
          <a href="${getLink("#about")}"><i class="fas fa-user" aria-hidden="true"></i> Sobre</a>
          <a href="${getLink("certifications.html")}"><i class="fas fa-award" aria-hidden="true"></i> Certifica&ccedil;&otilde;es</a>
          <a href="${getLink("repositories.html")}"><i class="fab fa-github" aria-hidden="true"></i> Reposit&oacute;rios</a>
          <a class="nav-contact" href="${getLink("#contact")}"><i class="fas fa-envelope" aria-hidden="true"></i> Contato</a>
        </div>
      </div>
    </nav>
  `;

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.after(header);
  } else {
    document.body.prepend(header);
  }

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

  function getLink(path) {
    const homeUrl = new URL("index.html", siteRootUrl);
    const isHome = window.location.pathname === homeUrl.pathname
      || window.location.pathname === siteRootUrl.pathname;
    if (path.startsWith("#")) {
      return isHome ? path : `${homeUrl.href}${path}`;
    }
    return new URL(path, siteRootUrl).href;
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
    const icon = menuToggleBtn.querySelector("i");
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-xmark", isOpen);
  }

  function updateCurrentLink() {
    navMenu.querySelectorAll("a").forEach((link) => {
      const target = new URL(link.href);
      const homePath = new URL("index.html", siteRootUrl).pathname;
      const currentPath = location.pathname === siteRootUrl.pathname ? homePath : location.pathname;
      const isCurrent = target.pathname === currentPath && target.hash === location.hash;
      if (isCurrent) {
        link.setAttribute("aria-current", target.hash ? "location" : "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  updateCurrentLink();
  window.addEventListener("hashchange", updateCurrentLink);
  window.matchMedia("(min-width: 1180px)").addEventListener("change", () => setMenuState(false));

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
    if (event.key === "Escape" && navMenu?.classList.contains("is-open")) {
      setMenuState(false);
      menuToggleBtn?.focus();
    }
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn?.classList.toggle("is-visible", window.scrollY > 320);
  });
}

document.addEventListener("DOMContentLoaded", loadHeader);
