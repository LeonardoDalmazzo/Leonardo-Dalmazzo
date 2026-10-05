(function () {
  const AUTOPLAY_INTERVAL = 9000;
  const TALL_IMAGE_RATIO = 1.8;

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
        <div class="showcase-modal__image-viewport" tabindex="-1" aria-label="Imagem ampliada. Role para visualizar a imagem completa.">
          <img class="showcase-modal__image" src="" alt="">
        </div>
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
    const modalImageViewport = modal.querySelector(".showcase-modal__image-viewport");
    const modalCaption = modal.querySelector(".showcase-modal__caption");
    const previousButton = modal.querySelector(".showcase-modal__prev");
    const nextButton = modal.querySelector(".showcase-modal__next");
    const closeButton = modal.querySelector(".showcase-modal__close");
    let currentImages = [];
    let currentIndex = 0;
    let lastTrigger = null;
    let isProjectGallery = false;

    modalImage.addEventListener("load", () => {
      const isTallProjectImage = isProjectGallery
        && modalImage.naturalHeight / modalImage.naturalWidth >= TALL_IMAGE_RATIO;

      modal.classList.toggle("is-scrollable", isTallProjectImage);
      modalImageViewport.tabIndex = isTallProjectImage ? 0 : -1;
    });

    function updateModal() {
      const imageData = currentImages[currentIndex];
      if (!imageData) return;

      modal.classList.remove("is-scrollable");
      modalImageViewport.tabIndex = -1;
      modalImage.src = imageData.src;
      modalImage.alt = imageData.alt || imageData.title || "Imagem ampliada";
      modalImageViewport.scrollTop = 0;
      modalImageViewport.scrollLeft = 0;
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
      lastTrigger?.focus();
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
      open(images, index = 0, trigger = null, options = {}) {
        currentImages = images;
        currentIndex = index;
        lastTrigger = trigger;
        isProjectGallery = Boolean(options.isProjectGallery);
        modal.classList.toggle("is-project-gallery", isProjectGallery);
        updateModal();
        modal.classList.add("active");
        closeButton.focus();
      },
    };
  }

  function getCardText(card, selector, fallback = "") {
    return card.querySelector(selector)?.textContent.trim() || fallback;
  }

  function initCardCarousel(card, modalApi, options = {}) {
    const media = card.querySelector("[data-showcase-media], .card-img, .project-img");

    if (!media) return;

    const images = Array.from(media.querySelectorAll("img"));
    const title = getCardText(card, "[data-showcase-title]", getCardText(card, "h3"));
    const subtitle = getCardText(card, "[data-showcase-subtitle]", getCardText(card, ".sub-title, .project-tech"));
    const isProjectGallery = Boolean(card.closest(".projects"));
    const autoplay = options.autoplay !== false;
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
      if (!autoplay || images.length <= 1) return;
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
    media.tabIndex = 0;
    media.setAttribute("role", "button");
    media.setAttribute("aria-label", `Abrir galeria de imagens: ${title}`);

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

      if (autoplay) {
        card.addEventListener("mouseenter", stopTimer);
        card.addEventListener("mouseleave", startTimer);
        card.addEventListener("focusin", stopTimer);
        card.addEventListener("focusout", startTimer);
        startTimer();
      }
    }

    function openModal() {
      modalApi.open(images.map((image) => ({
        src: image.currentSrc || image.src,
        alt: image.alt,
        title,
        subtitle,
      })), currentIndex, media, { isProjectGallery });
    }

    media.addEventListener("click", openModal);
    media.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openModal();
    });
  }

  function initGallery(gallery, modalApi) {
    const cards = Array.from(gallery.querySelectorAll("[data-category]"))
      .sort((firstCard, secondCard) => Number(firstCard.dataset.showcaseOrder || 0) - Number(secondCard.dataset.showcaseOrder || 0));
    const autoplay = gallery.dataset.showcaseAutoplay !== "manual";
    cards.forEach((card) => gallery.appendChild(card));
    cards.forEach((card) => initCardCarousel(card, modalApi, { autoplay }));
    window.ShowcaseFilters.init(gallery);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const galleries = Array.from(document.querySelectorAll("[data-showcase-gallery]"));

    if (!galleries.length) return;

    const modalApi = initModal();
    galleries.forEach((gallery) => initGallery(gallery, modalApi));
  });
}());
