const COLOR_STORAGE_KEY = "siteColors";
const MIN_THEME_CONTRAST_RATIO = 4.5;
const THEME_COLOR_PRESETS = {
  light: {
    main: "#0f4c5c",
    secondary: "#9a3412",
  },
  dark: {
    main: "#8bcfc2",
    secondary: "#f1a56b",
  },
};
const COLOR_LABELS = {
  main: "principal",
  secondary: "secundaria",
};

function getCurrentTheme() {
  return document.body.classList.contains("dark") ? "dark" : "light";
}

function getThemePresetColors(theme = getCurrentTheme()) {
  return THEME_COLOR_PRESETS[theme] || THEME_COLOR_PRESETS.light;
}

function getStoredSiteColorThemes() {
  const savedColors = localStorage.getItem(COLOR_STORAGE_KEY);

  if (!savedColors) return {};

  try {
    const parsedColors = JSON.parse(savedColors) || {};

    if (isValidHexColor(parsedColors.main) || isValidHexColor(parsedColors.secondary)) {
      return {
        [getCurrentTheme()]: normalizeSiteColors(parsedColors, getThemePresetColors()),
      };
    }

    return Object.keys(THEME_COLOR_PRESETS).reduce((themes, theme) => {
      if (parsedColors[theme]) {
        themes[theme] = normalizeSiteColors(parsedColors[theme], getThemePresetColors(theme));
      }

      return themes;
    }, {});
  } catch {
    return {};
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

function getRgbColor(hexColor) {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return `${red}, ${green}, ${blue}`;
}

function getRgbColorParts(color) {
  if (isValidHexColor(color)) {
    return color.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16));
  }

  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

  if (!rgbMatch) return null;

  return rgbMatch.slice(1, 4).map(Number);
}

function getRelativeLuminance(color) {
  const rgbParts = getRgbColorParts(color);

  if (!rgbParts) return null;

  const [red, green, blue] = rgbParts.map((part) => {
    const channel = part / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function getContrastRatio(firstColor, secondColor) {
  const firstLuminance = getRelativeLuminance(firstColor);
  const secondLuminance = getRelativeLuminance(secondColor);

  if (firstLuminance === null || secondLuminance === null) return 0;

  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getThemeBackgroundColor(theme = getCurrentTheme()) {
  const variableName = theme === "dark" ? "--color-bg-dark" : "--color-bg";
  const fallbackColor = theme === "dark" ? "#141a1d" : "#ffffff";
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  return themeColor || fallbackColor;
}

function validateSiteColors(colors, theme = getCurrentTheme()) {
  const normalizedColors = normalizeSiteColors(colors, getThemePresetColors(theme));
  const themeBackgroundColor = getThemeBackgroundColor(theme);
  const failedColors = Object.entries(normalizedColors)
    .map(([key, color]) => ({
      key,
      label: COLOR_LABELS[key],
      ratio: getContrastRatio(color, themeBackgroundColor),
    }))
    .filter(({ ratio }) => ratio < MIN_THEME_CONTRAST_RATIO);

  if (!failedColors.length) {
    return { isValid: true, failedKeys: [], message: "" };
  }

  const themeLabel = theme === "dark" ? "escuro" : "claro";
  const failedList = failedColors
    .map(({ label, ratio }) => `${label} (${ratio.toFixed(1)}:1)`)
    .join(" e ");

  return {
    isValid: false,
    failedKeys: failedColors.map(({ key }) => key),
    message: `Contraste insuficiente no tema ${themeLabel}: ${failedList}. Minimo: ${MIN_THEME_CONTRAST_RATIO}:1.`,
  };
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
  const secondaryButtonTextColor = getReadableTextColor(normalizedColors.secondary);

  document.documentElement.style.setProperty("--color-main", normalizedColors.main);
  document.documentElement.style.setProperty("--color-main-rgb", getRgbColor(normalizedColors.main));
  document.documentElement.style.setProperty("--color-hover-main", normalizedColors.secondary);
  document.documentElement.style.setProperty("--color-hover-main-rgb", getRgbColor(normalizedColors.secondary));
  document.documentElement.style.setProperty("--color-text-on-main", buttonTextColor);
  document.documentElement.style.setProperty("--color-text-on-secondary", secondaryButtonTextColor);
  document.documentElement.style.setProperty("--color-button-text-light", buttonTextColor);
  document.documentElement.style.setProperty("--color-button-text-dark", buttonTextColor);
  document.documentElement.style.setProperty("--color-button-text-secondary", secondaryButtonTextColor);

  return normalizedColors;
}

function getSavedSiteColors(theme = getCurrentTheme()) {
  return getStoredSiteColorThemes()[theme] || null;
}

function getActiveSiteColors(theme = getCurrentTheme()) {
  const savedColors = getSavedSiteColors(theme);

  if (savedColors && validateSiteColors(savedColors, theme).isValid) {
    return normalizeSiteColors(savedColors, getThemePresetColors(theme));
  }

  return getThemePresetColors(theme);
}

function applyActiveSiteColors() {
  return applySiteColors(getActiveSiteColors());
}

function saveSiteColors(colors, theme = getCurrentTheme()) {
  const normalizedColors = normalizeSiteColors(colors, getThemePresetColors(theme));
  const storedColorThemes = {
    ...getStoredSiteColorThemes(),
    [theme]: normalizedColors,
  };

  localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(storedColorThemes));
  applySiteColors(normalizedColors);

  return normalizedColors;
}

function resetSiteColors(theme = getCurrentTheme()) {
  const storedColorThemes = getStoredSiteColorThemes();
  delete storedColorThemes[theme];

  if (Object.keys(storedColorThemes).length) {
    localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(storedColorThemes));
  } else {
    localStorage.removeItem(COLOR_STORAGE_KEY);
  }
}

function createColorCustomizer() {
  if (document.getElementById("color-toggle")) return;

  let activeColors = applyActiveSiteColors();

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
      <input id="primary-color-input" type="color" value="${activeColors.main}" aria-describedby="color-feedback">
    </label>
    <label>
      <span>Secund&aacute;ria</span>
      <input id="secondary-color-input" type="color" value="${activeColors.secondary}" aria-describedby="color-feedback">
    </label>
    <p class="color-panel__feedback" id="color-feedback" aria-live="polite"></p>
    <button class="color-reset" type="button">Restaurar</button>
  `;

  document.body.append(colorToggle, colorPanel);

  const primaryColorInput = colorPanel.querySelector("#primary-color-input");
  const secondaryColorInput = colorPanel.querySelector("#secondary-color-input");
  const resetButton = colorPanel.querySelector(".color-reset");
  const feedback = colorPanel.querySelector("#color-feedback");

  function setColorFeedback(message = "", isError = false) {
    feedback.textContent = message;
    feedback.classList.toggle("is-error", isError);
  }

  function setInputErrorState(failedKeys = []) {
    primaryColorInput.classList.toggle("is-invalid", failedKeys.includes("main"));
    secondaryColorInput.classList.toggle("is-invalid", failedKeys.includes("secondary"));
  }

  function setColorPanelState(isOpen) {
    colorPanel.hidden = !isOpen;
    colorToggle.classList.toggle("is-open", isOpen);
    colorToggle.setAttribute("aria-expanded", String(isOpen));
    colorToggle.setAttribute("aria-label", isOpen ? "Fechar paleta de cores" : "Abrir paleta de cores");
  }

  function updateColors() {
    const theme = getCurrentTheme();
    const nextColors = normalizeSiteColors({
      main: primaryColorInput.value,
      secondary: secondaryColorInput.value,
    }, getThemePresetColors(theme));
    const validation = validateSiteColors(nextColors, theme);

    if (!validation.isValid) {
      primaryColorInput.value = activeColors.main;
      secondaryColorInput.value = activeColors.secondary;
      setInputErrorState(validation.failedKeys);
      setColorFeedback(validation.message, true);
      return;
    }

    activeColors = saveSiteColors(nextColors, theme);
    setInputErrorState();
    setColorFeedback();
  }

  function syncColorInputs() {
    const colors = applyActiveSiteColors();

    primaryColorInput.value = colors.main;
    secondaryColorInput.value = colors.secondary;
    activeColors = colors;
    setInputErrorState();
    setColorFeedback();
  }

  colorToggle.addEventListener("click", () => {
    setColorPanelState(colorPanel.hidden);
  });

  primaryColorInput.addEventListener("input", updateColors);
  secondaryColorInput.addEventListener("input", updateColors);

  resetButton.addEventListener("click", () => {
    resetSiteColors();
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
