const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedCategory = btn.getAttribute("data-filter");

    // marcar botão ativo
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    projectItems.forEach(item => {
      let categories;

      try {
        categories = JSON.parse(item.dataset.category); // transforma em array
      } catch {
        categories = [item.dataset.category]; // fallback se não for JSON
      }

      if (selectedCategory === "all" || categories.includes(selectedCategory)) {
        item.style.display = "block"; // mostra
      } else {
        item.style.display = "none"; // esconde
      }
    });
  });
});
