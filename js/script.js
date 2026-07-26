const bodyElement = document.body;
const header = document.getElementById("header");
const themeToggleBtn = document.getElementById("theme-toggle");
const scrollTopBtn = document.getElementById("scroll-top");
const menuToggleBtn = document.querySelector("[data-menu-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const aboutSection = document.querySelector(".about");

function setMenuState(isOpen) {
  if (!menuToggleBtn || !navMenu) return;

  menuToggleBtn.classList.toggle("is-open", isOpen);
  navMenu.classList.toggle("is-open", isOpen);
  menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
  menuToggleBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

function setThemeState(isDark) {
  bodyElement.classList.toggle("dark", isDark);

  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = isDark
      ? `<i class="fas fa-sun"></i>`
      : `<i class="fas fa-moon"></i>`;
    themeToggleBtn.setAttribute("aria-label", isDark ? "Alternar para tema claro" : "Alternar para tema escuro");
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

themeToggleBtn?.addEventListener("click", () => {
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

if (aboutSection) {
  const revealAbout = () => aboutSection.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealAbout();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    aboutObserver.observe(aboutSection);
  } else {
    revealAbout();
  }
}

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  scrollTopBtn?.classList.toggle("is-visible", window.scrollY > 320);

  if (!header || navMenu?.classList.contains("is-open")) return;

  const scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollTop = scrollTop;
});
