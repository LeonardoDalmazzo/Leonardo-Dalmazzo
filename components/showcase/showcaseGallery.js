(function () {
  const AUTOPLAY_INTERVAL = 4000;

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

  function createIconButton(className, iconClass, label) {
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
    return button;
  }

  function getSharedModal() {
    const existingModal = document.querySelector(".showcase-modal");

    if (existingModal) {
      return existingModal;
    }

    const modal = document.createElement("div");
    modal.className = "showcase-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Visualizacao ampliada");
    modal.innerHTML = `
      <div class="showcase-modal__inner">
        <img class="showcase-modal__image" src="" alt="">
        <div class="showcase-modal__caption"></div>
        <div class="showcase-modal__controls">
          <button class="showcase-modal__prev" type="button" aria-label="Imagem anterior">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button class="showcase-modal__close" type="button">Fechar</button>
          <button class="showcase-modal__next" type="button" aria-label="Proxima imagem">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function initModal() {
    const modal = getSharedModal();
    const modalImage = modal.querySelector(".showcase-modal__image");
    const modalCaption = modal.querySelector(".showcase-modal__caption");
    const previousButton = modal.querySelector(".showcase-modal__prev");
    const nextButton = modal.querySelector(".showcase-modal__next");
    const closeButton = modal.querySelector(".showcase-modal__close");
    let currentImages = [];
    let currentIndex = 0;

    function updateModal() {
      const imageData = currentImages[currentIndex];
      if (!imageData) return;

      modalImage.src = imageData.src;
      modalImage.alt = imageData.alt || imageData.title || "Imagem ampliada";
      modalCaption.replaceChildren();

      const title = document.createElement("strong");
      title.textContent = imageData.title;
      modalCaption.appendChild(title);

      if (imageData.subtitle) {
        const subtitle = document.createElement("span");
        subtitle.textContent = imageData.subtitle;
        modalCaption.appendChild(subtitle);
      }

      modal.classList.toggle("is-single", currentImages.length <= 1);
    }

    function closeModal() {
      modal.classList.remove("active");
      modalImage.removeAttribute("src");
    }

    function showNextImage() {
      if (!currentImages.length) return;
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateModal();
    }

    function showPreviousImage() {
      if (!currentImages.length) return;
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateModal();
    }

    previousButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showPreviousImage();
    });

    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showNextImage();
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("active")) return;

      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
    });

    return {
      open(images, index = 0) {
        currentImages = images;
        currentIndex = index;
        updateModal();
        modal.classList.add("active");
        closeButton.focus();
      },
    };
  }

  function getCardText(card, selector, fallback = "") {
    return card.querySelector(selector)?.textContent.trim() || fallback;
  }

  function initCardCarousel(card, modalApi) {
    const media = card.querySelector("[data-showcase-media], .card-img, .project-img");

    if (!media) return;

    const images = Array.from(media.querySelectorAll("img"));
    const title = getCardText(card, "[data-showcase-title]", getCardText(card, "h3"));
    const subtitle = getCardText(card, "[data-showcase-subtitle]", getCardText(card, ".sub-title, .project-tech"));
    let currentIndex = 0;
    let interval = null;

    if (!images.length) return;

    function showImage(index) {
      currentIndex = (index + images.length) % images.length;
      images.forEach((image, imageIndex) => {
        image.classList.toggle("active", imageIndex === currentIndex);
      });
    }

    function startTimer() {
      if (images.length <= 1) return;
      interval = window.setInterval(() => showImage(currentIndex + 1), AUTOPLAY_INTERVAL);
    }

    function stopTimer() {
      window.clearInterval(interval);
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    showImage(0);

    if (images.length > 1) {
      const controls = document.createElement("div");
      controls.className = "carousel-controls";
      controls.appendChild(createIconButton("prev-btn", "fas fa-chevron-left", "Imagem anterior"));
      controls.appendChild(createIconButton("next-btn", "fas fa-chevron-right", "Proxima imagem"));
      media.appendChild(controls);

      controls.querySelector(".next-btn").addEventListener("click", (event) => {
        event.stopPropagation();
        showImage(currentIndex + 1);
        resetTimer();
      });

      controls.querySelector(".prev-btn").addEventListener("click", (event) => {
        event.stopPropagation();
        showImage(currentIndex - 1);
        resetTimer();
      });

      card.addEventListener("mouseenter", stopTimer);
      card.addEventListener("mouseleave", startTimer);
      card.addEventListener("focusin", stopTimer);
      card.addEventListener("focusout", startTimer);
      startTimer();
    }

    media.addEventListener("click", () => {
      modalApi.open(images.map((image) => ({
        src: image.currentSrc || image.src,
        alt: image.alt,
        title,
        subtitle,
      })), currentIndex);
    });
  }

  function initGallery(gallery, modalApi) {
    const section = gallery.closest(".showcase-page") || document;
    const filterButtons = Array.from(section.querySelectorAll("[data-filter]"));
    const cards = Array.from(gallery.querySelectorAll("[data-category]"));

    function applyFilter(filterValue) {
      const selectedFilter = normalizeCategory(filterValue || "all");

      cards.forEach((card) => {
        const categories = parseCategories(card.dataset.category);
        const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);

        card.classList.toggle("is-hidden", !isVisible);

        if (isVisible) {
          card.classList.add("aos-animate");
        }
      });

      filterButtons.forEach((button) => {
        const isActive = normalizeCategory(button.dataset.filter) === selectedFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }

    filterButtons.forEach((button) => {
      button.type = "button";
      button.addEventListener("click", () => applyFilter(button.dataset.filter));
    });

    cards.forEach((card) => initCardCarousel(card, modalApi));
    applyFilter(filterButtons.find((button) => button.classList.contains("active"))?.dataset.filter || "all");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const galleries = Array.from(document.querySelectorAll("[data-showcase-gallery]"));

    if (!galleries.length) return;

    const modalApi = initModal();
    galleries.forEach((gallery) => initGallery(gallery, modalApi));
  });
}());
