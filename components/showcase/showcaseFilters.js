(function () {
  function parseCategories(rawCategories) {
    if (!rawCategories) return [];

    try {
      const parsedCategories = JSON.parse(rawCategories);

      if (Array.isArray(parsedCategories)) {
        return parsedCategories.map(normalizeCategory).filter(Boolean);
      }

      return splitCategories(parsedCategories);
    } catch {
      return splitCategories(rawCategories);
    }
  }

  function splitCategories(value) {
    return String(value)
      .split(/\s*,\s*|\s+/)
      .map(normalizeCategory)
      .filter(Boolean);
  }

  function normalizeCategory(value) {
    return String(value || "").toLowerCase().trim();
  }

  function init(gallery) {
    const section = gallery.closest(".showcase-page");
    const filterButtons = Array.from(section.querySelectorAll("[data-filter]"));
    const cards = Array.from(gallery.querySelectorAll("[data-category]"));
    const controls = section.querySelector("[data-showcase-controls]");
    const results = section.querySelector("[data-showcase-results]");
    const cardCategories = new Map(cards.map((card) => [card, parseCategories(card.dataset.category)]));
    const categorySelect = document.createElement("select");
    categorySelect.className = "showcase-select";
    categorySelect.setAttribute("aria-controls", gallery.id);

    filterButtons.forEach((button) => {
      const filter = normalizeCategory(button.dataset.filter);
      const label = button.querySelector("[data-filter-label]")?.textContent.trim() || button.textContent.trim();
      const count = cards.filter((card) => filter === "all" || cardCategories.get(card).includes(filter)).length;
      const badge = document.createElement("span");
      badge.className = "filter-btn__count";
      badge.textContent = count;
      badge.setAttribute("aria-hidden", "true");
      button.appendChild(badge);
      button.setAttribute("aria-controls", gallery.id);
      categorySelect.add(new Option(`${label} (${count})`, filter));
    });

    if (controls) {
      const label = controls.querySelector(".showcase-controls__label");
      categorySelect.setAttribute("aria-labelledby", label.id);
      controls.appendChild(categorySelect);
      controls.classList.add("is-enhanced");
    }

    function applyFilter(filterValue) {
      const selectedFilter = normalizeCategory(filterValue || "all");
      let visibleCount = 0;

      cards.forEach((card) => {
        const categories = cardCategories.get(card);
        const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);

        card.classList.toggle("is-hidden", !isVisible);

        if (isVisible) {
          visibleCount += 1;
          card.classList.add("aos-animate");
        }
      });

      filterButtons.forEach((button) => {
        const isActive = normalizeCategory(button.dataset.filter) === selectedFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      categorySelect.value = selectedFilter;
      if (results) {
        const itemLabel = visibleCount === 1 ? gallery.dataset.itemSingular : gallery.dataset.itemPlural;
        const selectedLabel = categorySelect.selectedOptions[0].textContent.replace(/ \(\d+\)$/, "");
        results.textContent = `${visibleCount} ${itemLabel} · ${selectedLabel}`;
      }
    }

    categorySelect.addEventListener("change", () => applyFilter(categorySelect.value));

    filterButtons.forEach((button) => {
      button.type = "button";
      button.addEventListener("click", () => applyFilter(button.dataset.filter));
    });

    applyFilter(filterButtons.find((button) => button.classList.contains("active"))?.dataset.filter || "all");
  }

  window.ShowcaseFilters = { init };
}());
