// Theme Toggle (light/dark with storage)
const themeToggleBtn = document.getElementById("theme-toggle");
const bodyElement = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  bodyElement.classList.add("dark");
  themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
}

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  bodyElement.classList.toggle("dark");
  const isDark = bodyElement.classList.contains("dark");
  themeToggleBtn.innerHTML = isDark
    ? `<i class="fas fa-sun"></i>`
    : `<i class="fas fa-moon"></i>`;
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Header hide on scroll down, show on scroll up
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollTop = scrollTop;
});
