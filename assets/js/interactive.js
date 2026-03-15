(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  const tiltCards = document.querySelectorAll(".timeline-card, .photo-card, .focus-card");
  tiltCards.forEach((card) => card.classList.add("tilt-card"));

  const updateGlow = (card, event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  const resetTilt = (card) => {
    card.style.removeProperty("transform");
    card.style.removeProperty("--mx");
    card.style.removeProperty("--my");
  };

  tiltCards.forEach((card) => {
    if (prefersReducedMotion) {
      card.addEventListener("mousemove", (event) => updateGlow(card, event));
      card.addEventListener("mouseleave", () => resetTilt(card));
      return;
    }

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const rotateX = (-dy / rect.height) * 6;
      const rotateY = (dx / rect.width) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      updateGlow(card, event);
    });

    card.addEventListener("mouseleave", () => resetTilt(card));
  });

  const magneticButtons = document.querySelectorAll(".hero-btn");
  magneticButtons.forEach((button) => {
    if (prefersReducedMotion) return;

    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.removeProperty("transform");
    });
  });
})();
