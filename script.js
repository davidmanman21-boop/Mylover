const heartButton = document.querySelector("#burstHearts");
const finalSurprise = document.querySelector("#finalSurprise");
const wishBoard = document.querySelector("#wishBoard");
const toast = document.querySelector("#toast");
const letterLinks = document.querySelectorAll('a[href="#letter"]');
const letterLock = document.querySelector("#letterLock");
const letterGate = document.querySelector("#letterGate");
const letterPassword = document.querySelector("#letterPassword");
const letterError = document.querySelector("#letterError");
const loveLetterContent = document.querySelector("#loveLetterContent");
const letterCode = "0831";

const wishes = [
  "health",
  "peace",
  "joy",
  "confidence",
  "soft days",
  "big wins",
  "laughter",
  "adventure",
  "love",
  "comfort",
  "growth",
  "dreams",
  "music",
  "beauty",
  "kindness",
  "strength",
  "magic",
  "memories",
  "forever"
];

function loadPhotoSlots() {
  document.querySelectorAll(".photo-slot[data-image]").forEach((slot) => {
    const source = slot.dataset.image;
    const testImage = new Image();

    testImage.onload = () => {
      slot.style.backgroundImage = `linear-gradient(rgba(33, 16, 20, 0.04), rgba(33, 16, 20, 0.1)), url("${source}")`;
      slot.classList.add("loaded");
    };

    testImage.src = source;
  });
}

function createHeart() {
  const heart = document.createElement("span");
  const colors = ["#ffe1e7", "#f7dfac", "#f0a6b4", "#ffffff"];

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.35 ? "♥" : "♡";
  heart.style.setProperty("--x", `${Math.random() * 100}vw`);
  heart.style.setProperty("--size", `${Math.random() * 18 + 18}px`);
  heart.style.setProperty("--duration", `${Math.random() * 2.4 + 3.8}s`);
  heart.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);

  document.body.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function burstHearts(count = 24) {
  for (let index = 0; index < count; index += 1) {
    window.setTimeout(createHeart, index * 55);
  }
}

function createLetterHeart(sourceRect) {
  const heart = document.createElement("span");
  const colors = ["#ffe1e7", "#f7dfac", "#f0a6b4", "#ffffff", "#ff8fa3", "#ffd1dc"];
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 330 + 180;

  heart.className = "letter-burst-heart";
  heart.textContent = Math.random() > 0.2 ? "♥" : "♡";
  heart.style.setProperty("--start-x", `${sourceRect.left + sourceRect.width / 2}px`);
  heart.style.setProperty("--start-y", `${sourceRect.top + sourceRect.height / 2}px`);
  heart.style.setProperty("--move-x", `${Math.cos(angle) * distance}px`);
  heart.style.setProperty("--move-y", `${Math.sin(angle) * distance - Math.random() * 150}px`);
  heart.style.setProperty("--early-spin", `${Math.random() * 90 - 45}deg`);
  heart.style.setProperty("--spin", `${Math.random() * 300 - 150}deg`);
  heart.style.setProperty("--size", `${Math.random() * 22 + 22}px`);
  heart.style.setProperty("--duration", `${Math.random() * 360 + 960}ms`);
  heart.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);

  document.body.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function burstLetterHearts(source, count = 72) {
  const sourceRect = source.getBoundingClientRect();

  for (let index = 0; index < count; index += 1) {
    window.setTimeout(() => createLetterHeart(sourceRect), index * 7);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function buildCandles() {
  wishes.forEach((wish, index) => {
    const candle = document.createElement("button");
    const height = 82 + (index % 5) * 14;

    candle.className = "candle";
    candle.type = "button";
    candle.setAttribute("aria-label", `Birthday wish ${index + 1}: ${wish}`);
    candle.style.setProperty("--height", `${height}px`);
    candle.addEventListener("click", () => {
      candle.classList.toggle("blown");
      showToast(`Wish ${index + 1}: ${wish}`);
    });

    wishBoard.appendChild(candle);
  });
}

loadPhotoSlots();
buildCandles();

heartButton.addEventListener("click", () => {
  burstHearts(30);
});

letterLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (letterLock.classList.contains("is-locked")) {
      window.setTimeout(() => letterPassword.focus(), 650);
    }
  });
});

letterGate.addEventListener("submit", (event) => {
  event.preventDefault();

  if (letterPassword.value === letterCode) {
    letterLock.classList.remove("is-locked");
    letterLock.classList.add("is-unlocked");
    loveLetterContent.removeAttribute("aria-hidden");
    letterError.textContent = "";
    burstLetterHearts(letterGate, 86);
    window.setTimeout(() => {
      letterGate.setAttribute("hidden", "");
    }, 320);
    return;
  }

  letterError.textContent = "Try again, my love.";
  letterGate.classList.remove("shake");
  void letterGate.offsetWidth;
  letterGate.classList.add("shake");
  letterPassword.select();
});

finalSurprise.addEventListener("click", () => {
  burstHearts(42);
  showToast("One more reminder: she is deeply loved.");
});
