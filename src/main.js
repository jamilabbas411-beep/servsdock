const updateYear = () => {
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
};

const initializeNavigation = () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  if (!toggle || !navigation) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};

const initializeContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const service = new URLSearchParams(window.location.search).get("service");
  const serviceSelect = form.querySelector('[name="service"]');
  if (service && serviceSelect) {
    const matchingOption = Array.from(serviceSelect.options).find(
      (option) => option.value === service || option.text === service,
    );
    if (matchingOption) serviceSelect.value = matchingOption.value;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = form.querySelector("[data-form-feedback]");
    if (!feedback) return;

    feedback.textContent =
      "This is a form preview. Your details were not sent or saved.";
    feedback.classList.add("is-visible");
  });
};

const initializeRevealAnimations = () => {
  const elements = document.querySelectorAll("[data-reveal]");
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element) => observer.observe(element));
};

updateYear();
initializeNavigation();
initializeContactForm();
initializeRevealAnimations();
