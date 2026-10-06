const aboutSection = document.querySelector(".about");

// Content stays visible when JavaScript or motion effects are unavailable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    element.classList.add('reveal-pending');
    revealObserver.observe(element);
  });
}

document.querySelectorAll("[data-contact-interest]").forEach((link) => {
  link.addEventListener("click", () => {
    const interest = document.getElementById("contact-interest");
    if (interest) interest.value = link.dataset.contactInterest;
  });
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
