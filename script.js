"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const useMobileImages = window.matchMedia("(max-width: 700px)").matches;
  const imageSuffix = useMobileImages ? "-mobile" : "";
  const slideSources = [1, 2, 3, 4].map((number) =>
    `./assets/images/background-${number}${imageSuffix}.jpg`
  );
  const layers = [
    document.querySelector(".slideshow__layer--one"),
    document.querySelector(".slideshow__layer--two")
  ];
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-navigation");
  const video = document.querySelector(".ministry-video");
  const videoMessage = document.querySelector(".video-message");
  const year = document.querySelector("#current-year");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const closeMenu = (returnFocus = false) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    if (returnFocus) menuButton.focus();
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
      if (!isOpen) {
        const firstLink = navigation.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (
        menuButton.getAttribute("aria-expanded") === "true" &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.matchMedia("(min-width: 701px)").addEventListener("change", () => closeMenu());
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  if (video && videoMessage) {
    video.addEventListener("loadedmetadata", () => {
      videoMessage.hidden = true;
    });
    video.addEventListener("error", () => {
      videoMessage.hidden = false;
    });
  }

  if (layers.some((layer) => !layer)) {
    console.error("The slideshow layer elements are missing; the page fallback background will be shown.");
    return;
  }

  const preloadImage = (source) => new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => {
      console.warn(`Could not load slideshow image: ${source}`);
      resolve(false);
    };
    image.src = source;
  });

  const showInitialSlide = async () => {
    let firstSource;
    for (const source of slideSources) {
      if (await preloadImage(source)) {
        firstSource = source;
        break;
      }
    }

    if (!firstSource) {
      console.error("No slideshow images could be loaded; the CSS fallback background will remain visible.");
      return;
    }

    let activeLayer = 0;
    layers[activeLayer].style.backgroundImage = `url("${firstSource}")`;
    layers[activeLayer].classList.add("is-active");

    if (reducedMotion.matches) return;

    const availableSlides = [firstSource];
    for (const source of slideSources) {
      if (source !== firstSource && await preloadImage(source)) availableSlides.push(source);
    }

    if (availableSlides.length < 2) return;

    let slideIndex = 0;
    window.setInterval(() => {
      slideIndex = (slideIndex + 1) % availableSlides.length;
      const nextLayer = 1 - activeLayer;
      layers[nextLayer].style.backgroundImage = `url("${availableSlides[slideIndex]}")`;
      layers[nextLayer].classList.add("is-active");
      layers[activeLayer].classList.remove("is-active");
      activeLayer = nextLayer;
    }, 5500);
  };

  showInitialSlide();
});
