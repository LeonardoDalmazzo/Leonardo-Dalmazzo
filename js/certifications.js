/**
 * js/certifications.js
 * - filtros (suporta data-category = '["cloud","tools"]')
 * - carousel por card (prev/next + autoplay)
 * - modal fullscreen ao clicar na imagem do card
 *
 * Salve em: js/certifications.js e garanta <script src="js/certifications.js" defer></script>
 */

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const cards = Array.from(document.querySelectorAll(".card"));

  // -----------------------
  // UTIL: parse categories safely (JSON array or fallback)
  // -----------------------
  function parseCategories(raw) {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(s => String(s).toLowerCase().trim());
      return String(parsed).split(/\s*,\s*|\s+/).map(s => s.toLowerCase().trim()).filter(Boolean);
    } catch (err) {
      return String(raw).split(/\s*,\s*|\s+/).map(s => s.toLowerCase().trim()).filter(Boolean);
    }
  }

  // -----------------------
  // FILTERING
  // -----------------------
  function applyFilter(filterValue) {
    const f = String(filterValue || "all").toLowerCase().trim();

    cards.forEach(card => {
      const categories = parseCategories(card.dataset.category);
      const match = (f === "all") || categories.includes(f);

      card.style.display = match ? "" : "none";
      card.setAttribute("aria-hidden", (!match).toString());
    });

    // atualiza botões (visual + aria-pressed)
    filterButtons.forEach(btn => {
      const val = String(btn.dataset.filter || "").toLowerCase().trim();
      if (val === f) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    // se AOS estiver presente, refresh
    if (window.AOS && typeof AOS.refresh === "function") {
      setTimeout(() => AOS.refresh(), 60);
    }
  }

  // eventos dos botões
  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = btn.dataset.filter || "all";
      applyFilter(filter);
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // estado inicial (botão com .active ou "all")
  const initial = filterButtons.find(b => b.classList.contains("active")) ||
                  filterButtons.find(b => (b.dataset.filter || "").toLowerCase() === "all") ||
                  filterButtons[0];
  if (initial) applyFilter(initial.dataset.filter || "all");

  // -----------------------
  // CAROUSEL POR CARD
  // -----------------------
  const cardStates = new WeakMap(); // armazena estado por card (index, timer)

  cards.forEach(card => {
    const imgContainer = card.querySelector(".card-img");
    if (!imgContainer) return;

    const imgs = Array.from(imgContainer.querySelectorAll("img"));
    if (!imgs.length) return;

    // inicializa: mostra primeira imagem
    imgs.forEach((img, i) => {
      img.classList.toggle("active", i === 0);
    });

    // cria controles se tiver mais de 1 imagem
    let currentIndex = 0;
    let timer = null;

    function showIndex(idx) {
      idx = (idx + imgs.length) % imgs.length;
      imgs.forEach((img, i) => img.classList.toggle("active", i === idx));
      currentIndex = idx;
    }

    function next() { showIndex(currentIndex + 1); }
    function prev() { showIndex(currentIndex - 1); }

    // adicionar controles visuais
    const controls = document.createElement("div");
    controls.className = "carousel-controls";

    const btnPrev = document.createElement("button");
    btnPrev.type = "button";
    btnPrev.setAttribute("aria-label", "Previous image");
    btnPrev.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;

    const btnNext = document.createElement("button");
    btnNext.type = "button";
    btnNext.setAttribute("aria-label", "Next image");
    btnNext.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

    // hide controls if only one image
    if (imgs.length <= 1) {
      btnPrev.setAttribute("aria-hidden", "true");
      btnNext.setAttribute("aria-hidden", "true");
    }

    controls.appendChild(btnPrev);
    controls.appendChild(btnNext);
    imgContainer.appendChild(controls);

    // autoplay (apenas se mais de 1 imagem)
    function startAuto() {
      if (imgs.length <= 1) return;
      stopAuto();
      timer = setInterval(() => {
        next();
      }, 4000);
      cardStates.set(card, { currentIndex, timer });
    }

    function stopAuto() {
      const st = cardStates.get(card);
      if (st && st.timer) {
        clearInterval(st.timer);
      }
      cardStates.set(card, { currentIndex, timer: null });
    }

    // eventos controles
    btnNext.addEventListener("click", (e) => { e.stopPropagation(); next(); });
    btnPrev.addEventListener("click", (e) => { e.stopPropagation(); prev(); });

    // pause on hover (desktop)
    card.addEventListener("mouseenter", () => stopAuto());
    card.addEventListener("mouseleave", () => startAuto());

    // abrir modal ao clicar na imagem ativa
    imgContainer.addEventListener("click", (e) => {
      // abrir modal mostrando a imagem atual
      openModal(imgs.slice(), currentIndex, {
        title: card.querySelector("h3")?.textContent || "",
        subtitle: card.querySelector(".sub-title")?.textContent || "",
        description: card.querySelector(".description")?.textContent || ""
      });
    });

    // inicia autoplay
    startAuto();

    // guardar estado inicial
    cardStates.set(card, { currentIndex, timer });
  });

  // -----------------------
  // MODAL FULLSCREEN
  // -----------------------
  // cria estrutura do modal (apenas uma vez)
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-inner" role="dialog" aria-modal="true" aria-label="Image preview">
      <img class="modal-image" alt="">
      <div class="modal-caption"></div>
      <div class="modal-controls">
        <button type="button" class="modal-prev" aria-label="Previous">◀</button>
        <button type="button" class="modal-next" aria-label="Next">▶</button>
        <button type="button" class="modal-close" aria-label="Close">Close ✕</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector(".modal-image");
  const modalCaption = modal.querySelector(".modal-caption");
  const modalPrev = modal.querySelector(".modal-prev");
  const modalNext = modal.querySelector(".modal-next");
  const modalClose = modal.querySelector(".modal-close");

  let modalImages = [];
  let modalIndex = 0;

  function openModal(images, index, meta = {}) {
    modalImages = images;
    modalIndex = (index || 0) % modalImages.length;

    modal.classList.add("active");
    updateModal();

    // lock scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modalImages = [];
    modalIndex = 0;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  function updateModal() {
    if (!modalImages.length) return;
    const imgEl = modalImages[modalIndex];
    modalImg.src = imgEl.src;
    modalImg.alt = imgEl.alt || "";
    const title = imgEl.dataset.title || "";
    modalCaption.innerHTML = `
      <strong>${title}</strong>
      <div style="font-size:0.9rem; opacity:0.9; margin-top:6px;">${imgEl.dataset.caption || ""}</div>
    `;
  }

  function modalNextFn() {
    if (!modalImages.length) return;
    modalIndex = (modalIndex + 1) % modalImages.length;
    updateModal();
  }

  function modalPrevFn() {
    if (!modalImages.length) return;
    modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
    updateModal();
  }

  modalNext.addEventListener("click", modalNextFn);
  modalPrev.addEventListener("click", modalPrevFn);
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") modalNextFn();
    if (e.key === "ArrowLeft") modalPrevFn();
  });

  // helper: open modal from outside (used by cards)
  function openModalFromElements(imageElements, startIndex) {
    // clone the images as objects (we only need src, alt, dataset fields)
    const clones = imageElements.map(img => {
      const c = document.createElement("img");
      c.src = img.src;
      c.alt = img.alt || "";
      c.dataset.title = img.dataset.title || "";
      c.dataset.caption = img.dataset.caption || "";
      return c;
    });
    openModal(clones, startIndex || 0);
  }

  // expose a global function used earlier when clicking card image
  // but we built openModal(imageElements, index, meta). To keep simple, implement openModal(images, index) usage:
  // The card click calls openModal(imgs.slice(), currentIndex, meta)
  // That works because openModal accepts image elements array.
});
