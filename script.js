// ==========================================
// SUSHI POPUP FUNCTIONALITY - MUST BE FIRST
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const sushiPopup = document.getElementById("sushiPopup");
  const closePopup = document.getElementById("closePopup");
  const enterButton = document.getElementById("enterSite");
  const popupOverlay = document.getElementById("popupOverlay");

  // Ensure popup is visible on load
  if (sushiPopup) {
    sushiPopup.style.display = "flex";
    sushiPopup.classList.remove("hidden");
  }

  // Function to close popup
  function closeSushiPopup() {
    if (sushiPopup) {
      sushiPopup.classList.add("hidden");
      setTimeout(() => {
        sushiPopup.style.display = "none";
      }, 500);
    }
  }

  // Close button
  if (closePopup) {
    closePopup.addEventListener("click", closeSushiPopup);
  }

  // Enter button
  if (enterButton) {
    enterButton.addEventListener("click", closeSushiPopup);
  }

  // Close on overlay click
  if (popupOverlay) {
    popupOverlay.addEventListener("click", closeSushiPopup);
  }

  // Prevent closing when clicking inside popup content
  const popupContent = document.querySelector(".popup-content");
  if (popupContent) {
    popupContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

// ==========================================
// MUSIC FUNCTIONALITY
// ==========================================
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let musicStarted = false;

bgMusic.volume = 0.3;

// Set start time to 10 seconds and autoplay
bgMusic.addEventListener('loadedmetadata', function() {
  bgMusic.currentTime = 10;
  // Attempt autoplay
  bgMusic.play().then(() => {
    console.log("Autoplay started successfully");
    musicStarted = true;
    musicToggle.classList.remove("paused");
  }).catch((e) => {
    console.log("Autoplay blocked, waiting for user interaction:", e);
  });
});

// Loop between 10-160 seconds
bgMusic.addEventListener('timeupdate', function() {
  if (bgMusic.currentTime >= 160) {
    bgMusic.currentTime = 10;
  }
});

// Fallback: Start music on first user interaction if autoplay failed
document.addEventListener(
  "click",
  function initMusic() {
    if (!musicStarted) {
      bgMusic.currentTime = 10;
      bgMusic.play().catch((e) => console.log("Audio play failed:", e));
      musicStarted = true;
      musicToggle.classList.remove("paused");
    }
  },
  { once: true }
);

musicToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.remove("paused");
  } else {
    bgMusic.pause();
    musicToggle.classList.add("paused");
  }
});

// ==========================================
// PHOTO CARD CLICK - SHOW MESSAGE
// ==========================================
const photoCards = document.querySelectorAll(".photo-card");

photoCards.forEach((card) => {
  card.addEventListener("click", function () {
    // Get associated message
    const messageId = this.getAttribute("data-message");
    const messageBox = document.querySelector(`[data-message-id="${messageId}"]`);

    // Toggle message visibility
    if (messageBox.classList.contains("visible")) {
      messageBox.classList.remove("visible");
    } else {
      messageBox.classList.add("visible");
      const messageText = messageBox.querySelector("p");
      typewriterEffect(messageText);
    }
  });
});

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function typewriterEffect(element) {
  const text = element.textContent;
  element.textContent = "";
  element.classList.add("typewriter");

  let i = 0;
  const speed = 30;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove("typewriter");
    }
  }

  type();
}

// ==========================================
// FLOATING ELEMENTS
// ==========================================
const floatingContainer = document.getElementById("floatingContainer");
const symbols = ["☕", "♥", "☕", "♥", "☕"];

function createFloatingElement() {
  const element = document.createElement("div");
  element.classList.add("floating-element");
  element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  element.style.left = Math.random() * 100 + "%";
  element.style.animationDuration = Math.random() * 6 + 8 + "s";
  element.style.animationDelay = Math.random() * 2 + "s";
  element.style.fontSize = (Math.random() * 10 + 18) + "px";
  
  floatingContainer.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, 12000);
}

setInterval(createFloatingElement, 2500);

for (let i = 0; i < 6; i++) {
  setTimeout(createFloatingElement, i * 600);
}

// ==========================================
// SCROLL FADE-IN
// ==========================================
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  }
);

fadeElements.forEach((el) => observer.observe(el));

// ==========================================
// FINAL MESSAGE
// ==========================================
const finalSection = document.querySelector(".final-section");
const finalMessage = document.querySelector(".final-message");
const finalText = document.getElementById("finalText");

let finalTyped = false;

const finalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !finalTyped) {
        finalTyped = true;
        finalMessage.classList.add("visible");
        setTimeout(() => {
          typewriterEffect(finalText);
        }, 500);
      }
    });
  },
  {
    threshold: 0.3
  }
);

finalObserver.observe(finalSection);

// ==========================================
// COUNTDOWN TIMER
// ==========================================
const startDate = new Date("2026-01-24T16:34:00+08:00");

function updateTimer() {
  const now = new Date();
  const diffMs = now - startDate;
  
  if (diffMs < 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// ==========================================
// COFFEE CUP HOVER
// ==========================================
const coffeeCup = document.querySelector('.coffee-bouquet');
if (coffeeCup) {
  coffeeCup.addEventListener('mouseenter', () => {
    coffeeCup.style.animation = 'gentleSway 1s ease-in-out infinite';
  });
  
  coffeeCup.addEventListener('mouseleave', () => {
    coffeeCup.style.animation = 'gentleSway 4s ease-in-out infinite';
  });
}

console.log('%c☕ Brewing love, one memory at a time... ♥', 
  'color: #8d6e63; font-size: 16px; font-weight: bold; font-family: "Dancing Script", cursive;');
