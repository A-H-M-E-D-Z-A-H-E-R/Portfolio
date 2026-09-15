const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");

const closeMenu = () => navMenu?.classList.remove("show");

navToggle?.addEventListener("click", () => navMenu.classList.add("show"));
navClose?.addEventListener("click", closeMenu);
navLinks.forEach(link => link.addEventListener("click", closeMenu));

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    entry.target.style.transitionDelay = `${Math.min(index * 40, 180)}ms`;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("section[id]")];
const links = [...document.querySelectorAll(".nav__link")];

const activeSection = () => {
  const y = window.scrollY + 180;
  let current = "home";

  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });

  links.forEach(link => {
    link.classList.toggle(
      "active-link",
      link.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener("scroll", activeSection, { passive: true });
activeSection();

document.querySelectorAll('.project__visual[href="#"]').forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});
