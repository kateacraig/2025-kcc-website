// Kate Craig Consulting - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Mobile dropdown toggle
  if (window.innerWidth <= 760) {
    dropdowns.forEach((dropdown) => {
      const dropdownLink = dropdown.querySelector("a");
      dropdownLink.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest("nav") && !e.target.closest(".hamburger")) {
      if (navMenu && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get all required fields
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      if (isValid) {
        alert("Thank you for your submission! We will get back to you soon.");
        form.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .testimonial, .grid-item, .portfolio-item"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Add active state to current page in navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.style.color = "var(--light-blue)";
    }
  });
});

// Resize handler for responsive adjustments
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Reload page if crossing tablet breakpoint
    location.reload();
  }, 250);
});
