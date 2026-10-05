const aboutSection = document.querySelector(".about");

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
