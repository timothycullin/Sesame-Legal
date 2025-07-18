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
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    headers.forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      h.nextElementSibling.hidden = true;
    });

    if (!isExpanded) {
      header.setAttribute('aria-expanded', 'true');
      header.nextElementSibling.hidden = false;
    }
  });
});

document.body.addEventListener("touchstart", function () { }, { passive: true });


// ContactForm.js
function validateForm(event) {
  const textarea = document.getElementById('message');
  if (textarea.value.length > 1000) {
    alert("Please keep your message under 1000 characters.");
    event.preventDefault();
    return false;
  }
  return true;
}


