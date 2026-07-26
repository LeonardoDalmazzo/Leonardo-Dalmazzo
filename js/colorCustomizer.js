const COLOR_STORAGE_KEY = "siteColors";
const THEME_COLOR_PRESETS = {
  light: {
    main: "#000000",
    secondary: "#be5103",
  },
  dark: {
    main: "#cccccc",
    secondary: "#be5103",
  },
};

function getCurrentTheme() {
  return document.body.classList.contains("dark") ? "dark" : "light";
}

function getThemePresetColors(theme = getCurrentTheme()) {
  return THEME_COLOR_PRESETS[theme] || THEME_COLOR_PRESETS.light;
}

function getSavedSiteColors() {
  const savedColors = localStorage.getItem(COLOR_STORAGE_KEY);

  if (!savedColors) return null;

  try {
    return JSON.parse(savedColors) || null;
  } catch {
    return null;
  }
}

function isValidHexColor(color) {
  return /^#[0-9a-f]{6}$/i.test(color);
}

function getReadableTextColor(hexColor) {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150 ? "#111" : "#fff";
}

function normalizeSiteColors(colors, fallbackColors = getThemePresetColors()) {
  return {
    main: isValidHexColor(colors?.main) ? colors.main : fallbackColors.main,
    secondary: isValidHexColor(colors?.secondary) ? colors.secondary : fallbackColors.secondary,
  };
}

function applySiteColors(colors) {
  const normalizedColors = normalizeSiteColors(colors);
  const buttonTextColor = getReadableTextColor(normalizedColors.main);

  document.documentElement.style.setProperty("--color-main", normalizedColors.main);
  document.documentElement.style.setProperty("--color-hover-main", normalizedColors.secondary);
  document.documentElement.style.setProperty("--color-button-text-light", buttonTextColor);
  document.documentElement.style.setProperty("--color-button-text-dark", buttonTextColor);

  return normalizedColors;
}

function getActiveSiteColors() {
  return normalizeSiteColors(getSavedSiteColors(), getThemePresetColors());
}

function applyActiveSiteColors() {
  return applySiteColors(getActiveSiteColors());
}

function saveSiteColors(colors) {
  const normalizedColors = normalizeSiteColors(colors, getThemePresetColors());

  localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(normalizedColors));
  applySiteColors(normalizedColors);
}

function createColorCustomizer() {
  if (document.getElementById("color-toggle")) return;

  const activeColors = applyActiveSiteColors();

  const colorToggle = document.createElement("button");
  colorToggle.id = "color-toggle";
  colorToggle.type = "button";
  colorToggle.setAttribute("aria-label", "Abrir paleta de cores");
  colorToggle.setAttribute("aria-controls", "color-panel");
  colorToggle.setAttribute("aria-expanded", "false");
  colorToggle.innerHTML = `<i class="fas fa-palette"></i>`;

  const colorPanel = document.createElement("section");
  colorPanel.id = "color-panel";
  colorPanel.className = "color-panel";
  colorPanel.setAttribute("aria-label", "Paleta de cores do site");
  colorPanel.hidden = true;
  colorPanel.innerHTML = `
    <h2>Paleta</h2>
    <label>
      <span>Principal</span>
      <input id="primary-color-input" type="color" value="${activeColors.main}">
    </label>
    <label>
      <span>Secund&aacute;ria</span>
      <input id="secondary-color-input" type="color" value="${activeColors.secondary}">
    </label>
    <button class="color-reset" type="button">Restaurar</button>
  `;

  document.body.append(colorToggle, colorPanel);

  const primaryColorInput = colorPanel.querySelector("#primary-color-input");
  const secondaryColorInput = colorPanel.querySelector("#secondary-color-input");
  const resetButton = colorPanel.querySelector(".color-reset");

  function setColorPanelState(isOpen) {
    colorPanel.hidden = !isOpen;
    colorToggle.classList.toggle("is-open", isOpen);
    colorToggle.setAttribute("aria-expanded", String(isOpen));
    colorToggle.setAttribute("aria-label", isOpen ? "Fechar paleta de cores" : "Abrir paleta de cores");
  }

  function updateColors() {
    saveSiteColors({
      main: primaryColorInput.value,
      secondary: secondaryColorInput.value,
    });
  }

  function syncColorInputs() {
    const colors = applyActiveSiteColors();

    primaryColorInput.value = colors.main;
    secondaryColorInput.value = colors.secondary;
  }

  colorToggle.addEventListener("click", () => {
    setColorPanelState(colorPanel.hidden);
  });

  primaryColorInput.addEventListener("input", updateColors);
  secondaryColorInput.addEventListener("input", updateColors);

  resetButton.addEventListener("click", () => {
    localStorage.removeItem(COLOR_STORAGE_KEY);
    syncColorInputs();
  });

  window.addEventListener("site-theme-change", syncColorInputs);

  document.addEventListener("click", (event) => {
    const clickedPanel = colorPanel.contains(event.target);
    const clickedToggle = colorToggle.contains(event.target);

    if (!colorPanel.hidden && !clickedPanel && !clickedToggle) {
      setColorPanelState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setColorPanelState(false);
    }
  });
}

document.addEventListener("DOMContentLoaded", createColorCustomizer);
