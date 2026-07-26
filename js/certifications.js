/**
 * js/certifications.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    const cards = Array.from(document.querySelectorAll(".card"));
  
    // -----------------------
    // 1. Lógica de filtros
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
  
    function applyFilter(filterValue) {
      const f = String(filterValue || "all").toLowerCase().trim();
      
      cards.forEach(card => {
        const categories = parseCategories(card.dataset.category);
        const match = (f === "all") || categories.includes(f);
        
        card.style.display = match ? "flex" : "none";
        if(match) {
            card.classList.add("aos-animate");
        }
      });
  
      filterButtons.forEach(btn => {
        const val = String(btn.dataset.filter || "").toLowerCase().trim();
        btn.classList.toggle("active", val === f);
      });
    }
  
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        applyFilter(btn.dataset.filter);
      });
    });
  
    // -----------------------
    // 2. Lógica de carrossel e modal
    // -----------------------
    
    // Estrutura do Modal
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-inner">
        <img class="modal-image" src="" alt="Pr&eacute;via do certificado">
        <div class="modal-caption"></div>
        <div class="modal-controls">
            <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-close">Fechar</button>
            <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  
    const modalImg = modal.querySelector(".modal-image");
    const modalCaption = modal.querySelector(".modal-caption");
    
    // Variáveis de estado do Modal
    let currentModalImages = [];
    let currentModalIndex = 0;
  
    function updateModal() {
        if(currentModalImages.length === 0) return;
        const data = currentModalImages[currentModalIndex];
        modalImg.src = data.src;
        modalCaption.innerHTML = `
            <strong>${data.title}</strong><br>
            <span style="font-size:0.9em">${data.subtitle}</span>
        `;
    }
  
    // Eventos do Modal
    modal.querySelector(".modal-next").onclick = (e) => {
        e.stopPropagation();
        currentModalIndex = (currentModalIndex + 1) % currentModalImages.length;
        updateModal();
    };
    
    modal.querySelector(".modal-prev").onclick = (e) => {
        e.stopPropagation();
        currentModalIndex = (currentModalIndex - 1 + currentModalImages.length) % currentModalImages.length;
        updateModal();
    };
  
    const closeModal = () => { modal.classList.remove("active"); };
    modal.querySelector(".modal-close").onclick = closeModal;
    modal.onclick = (e) => { if(e.target === modal) closeModal(); };
    document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });
  
    // Lógica para cada Card
    cards.forEach(card => {
        const imgContainer = card.querySelector(".card-img");
        const imgs = Array.from(imgContainer.querySelectorAll("img"));
        
        // Pegar dados do card para usar no modal
        const cardTitle = card.querySelector("h3")?.textContent || "";
        const cardSubtitle = card.querySelector(".sub-title")?.textContent || "";
  
        if (imgs.length === 0) return;
  
        // Mostrar primeira imagem
        imgs.forEach((img, i) => img.classList.toggle("active", i === 0));
  
        let currentIndex = 0;
        let interval = null;
  
        // Se tiver mais de uma imagem, criar controles
        if (imgs.length > 1) {
            const controls = document.createElement("div");
            controls.className = "carousel-controls";
            controls.innerHTML = `
                <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
            `;
            imgContainer.appendChild(controls);
  
            const showImage = (index) => {
                imgs.forEach(img => img.classList.remove("active"));
                currentIndex = (index + imgs.length) % imgs.length;
                imgs[currentIndex].classList.add("active");
            };
  
            controls.querySelector(".next-btn").onclick = (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
                resetTimer();
            };
            controls.querySelector(".prev-btn").onclick = (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
                resetTimer();
            };
  
            // Autoplay
            const startTimer = () => { interval = setInterval(() => showImage(currentIndex + 1), 4000); };
            const resetTimer = () => { clearInterval(interval); startTimer(); };
            
            card.onmouseenter = () => clearInterval(interval);
            card.onmouseleave = startTimer;
            startTimer();
        }
  
        // Click na imagem abre o Modal
        imgContainer.onclick = () => {
            // Prepara lista de imagens para o modal com os metadados do card
            currentModalImages = imgs.map(img => ({
                src: img.src,
                title: cardTitle,
                subtitle: cardSubtitle
            }));
            currentModalIndex = currentIndex; // Começa da imagem que estava vendo
            updateModal();
            modal.classList.add("active");
        };
    });
});
