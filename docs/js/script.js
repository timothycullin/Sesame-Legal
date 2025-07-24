// Dummy touchstart listener to ensure touch events trigger active states on mobile browsers
document.addEventListener("touchstart", () => { }, true);

// menu-closeBtn.js
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('close-toggle');
  const dropbar = document.getElementById('dropbar');
  const links = document.querySelectorAll('.dropbar .dropbar-link-style');
  const logoLink = document.querySelector('.logo-link');

  const isMobile = () => window.innerWidth <= 768;

  function openDropbar() {
    dropbar.classList.add('open');
    dropbar.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    closeBtn.style.display = 'flex';
    menuBtn.style.display = 'none';
  }

  function closeDropbar() {
    dropbar.classList.remove('open');
    dropbar.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (isMobile()) {
      closeBtn.style.display = 'none';
      menuBtn.style.display = 'flex';
    }
  }

  menuBtn.addEventListener('click', openDropbar);
  closeBtn.addEventListener('click', closeDropbar);

  links.forEach(link => {
    link.addEventListener('click', closeDropbar);
  });

  if (logoLink) {
    logoLink.addEventListener('click', closeDropbar);
  }

  function updateButtonVisibility() {
    if (isMobile()) {
      if (!dropbar.classList.contains('open')) {
        menuBtn.style.display = 'flex';
        closeBtn.style.display = 'none';
      }
    } else {
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'none';
      dropbar.classList.remove('open');
      dropbar.setAttribute('aria-hidden', 'true');
    }
  }

  window.addEventListener('resize', updateButtonVisibility);
  window.addEventListener('load', updateButtonVisibility);
});

// logo-homeCursor.js
const logoLink = document.querySelector('.logo-link');
if (
  window.location.pathname === '/' ||
  window.location.pathname.endsWith('index.html')
) {
  logoLink.classList.add('home');
}

// dropbar-link-style.js
const currentPath = window.location.pathname.split("/").pop();

const dropbarLinks = document.querySelectorAll('.dropbar-link-style');

dropbarLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});

// deck-cardRotation.js
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".deck-wrapper").forEach((wrapper) => {
    const deckContainer = wrapper.querySelector(".deck-container");
    const cards = Array.from(deckContainer.querySelectorAll(".deck-card"));
    const prevBtn = wrapper.querySelector(".left-mobile-arrow");
    const nextBtn = wrapper.querySelector(".right-mobile-arrow");

    let currentCards = cards.slice(); // make a copy

    function updateCardTransforms() {
      currentCards.forEach((card, i) => {
        // Highest zIndex for front card (i=0)
        card.style.zIndex = currentCards.length - i;
        card.style.transform = getTransform(i);
      });
    }

    function getTransform(i) {
      const transforms = [
        "translateX(-50%) translateY(0)",
        "translateX(-50%) translateY(6px)",
        "translateX(-50%) translateY(12px)",
        "translateX(-50%) translateY(18px)",
      ];
      return transforms[i] || transforms[transforms.length - 1];
    }

    function rotateCards(direction) {
      if (direction === "prev") {
        const last = currentCards.pop();
        currentCards.unshift(last);
      } else {
        const first = currentCards.shift();
        currentCards.push(first);
      }
      updateCardTransforms();
    }

    prevBtn.addEventListener("click", () => rotateCards("prev"));
    nextBtn.addEventListener("click", () => rotateCards("next"));

    updateCardTransforms(); // set initial positions
  });
});

// Accordion.js
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    // Close all accordion items
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      if (h.nextElementSibling) {
        h.nextElementSibling.hidden = true;
      }
    });

    // Open clicked if it was closed
    if (!isExpanded) {
      header.setAttribute('aria-expanded', 'true');
      if (header.nextElementSibling) {
        header.nextElementSibling.hidden = false;
      }
    }
  });
});

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('mousedown', () => header.classList.add('active'));
  header.addEventListener('mouseup', () => header.classList.remove('active'));
  header.addEventListener('mouseleave', () => header.classList.remove('active'));

  header.addEventListener('touchstart', () => header.classList.add('active'));
  header.addEventListener('touchend', () => header.classList.remove('active'));
  header.addEventListener('touchcancel', () => header.classList.remove('active'));
});

// ContactForm.js
// ContactForm validation handler
const form = document.getElementById('contactForm');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Clear all previous errors
  form.querySelectorAll('.input-wrapper').forEach(wrapper => {
    wrapper.classList.remove('error');
    const tooltip = wrapper.querySelector('.error-tooltip');
    if (tooltip) tooltip.textContent = '';
  });

  const inputs = Array.from(form.querySelectorAll('input, textarea'));
  let firstInvalid = null;

  // Find the first invalid input
  for (const input of inputs) {
    if (!input.checkValidity()) {
      firstInvalid = input;
      break;
    }
  }

  // Custom validation: message length
  const message = form.querySelector('#message');
  if (!firstInvalid && message.value.length > 1000) {
    firstInvalid = message;
  }

  // If there's an invalid field, show error
  if (firstInvalid) {
    const wrapper = firstInvalid.closest('.input-wrapper');
    wrapper.classList.add('error');
    const tooltip = wrapper.querySelector('.error-tooltip');

    if (firstInvalid === message && message.value.length > 1000) {
      tooltip.textContent = "Please keep your message under 1000 characters.";
    } else {
      tooltip.textContent = firstInvalid.validationMessage;
    }

    firstInvalid.focus();
    return false;
  }

  // No validation errors - proceed with form submission
  form.submit();
});

// ContactForm.js
// Button Active State Toggle on Mouse and Touch Events
const submitButton = document.querySelector('.contact-form button');

submitButton.addEventListener('mousedown', () => submitButton.classList.add('active'));
submitButton.addEventListener('mouseup', () => submitButton.classList.remove('active'));
submitButton.addEventListener('mouseleave', () => submitButton.classList.remove('active'));

submitButton.addEventListener('touchstart', () => submitButton.classList.add('active'));
submitButton.addEventListener('touchend', () => submitButton.classList.remove('active'));
submitButton.addEventListener('touchcancel', () => submitButton.classList.remove('active'));
