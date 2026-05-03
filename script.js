const heartButton = document.querySelector("#burstHearts");
const finalSurprise = document.querySelector("#finalSurprise");
const wishBoard = document.querySelector("#wishBoard");
const toast = document.querySelector("#toast");

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

finalSurprise.addEventListener("click", () => {
  burstHearts(42);
  showToast("One more reminder: she is deeply loved.");
});
