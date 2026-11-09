const paletteElement = document.getElementById("palette");
const generateButton = document.getElementById("generate-button");
const statusElement = document.getElementById("status");

let colors = [
  { hex: "#6C63FF", locked: false },
  { hex: "#FF6584", locked: false },
  { hex: "#FFC857", locked: false },
  { hex: "#36C9A7", locked: false },
  { hex: "#3A86FF", locked: false }
];

function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let hex = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hex += characters[randomIndex];
  }

  return hex;
}

function getTextColor(hex) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150 ? "#202432" : "#FFFFFF";
}

function renderPalette() {
  paletteElement.innerHTML = "";

  colors.forEach((color, index) => {
    const card = document.createElement("article");
    card.className = "color-card";

    card.innerHTML = `
      <div
        class="color-preview"
        style="background-color: ${color.hex}; color: ${getTextColor(color.hex)}"
      >
        <button
          class="lock-button"
          data-action="lock"
          data-index="${index}"
          aria-label="${color.locked ? "Unlock" : "Lock"} ${color.hex}"
          title="${color.locked ? "Unlock color" : "Lock color"}"
        >
          ${color.locked ? "🔒" : "🔓"}
        </button>
      </div>

      <div class="color-details">
        <button
          class="hex-button"
          data-action="copy"
          data-index="${index}"
          title="Copy color code"
        >
          ${color.hex}
        </button>
        <span>${color.locked ? "Locked" : "Color"}</span>
      </div>
    `;

    paletteElement.appendChild(card);
  });
}

function generatePalette() {
  colors = colors.map((color) => {
    if (color.locked) {
      return color;
    }

    return {
      hex: generateRandomHex(),
      locked: false
    };
  });

  renderPalette();
  statusElement.textContent = "New palette generated!";
}

generateButton.addEventListener("click", generatePalette);

paletteElement.addEventListener("click", async (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.action;

  if (action === "lock") {
    colors[index].locked = !colors[index].locked;
    renderPalette();

    statusElement.textContent = colors[index].locked
      ? `${colors[index].hex} is locked.`
      : `${colors[index].hex} is unlocked.`;
  }

  if (action === "copy") {
    const hex = colors[index].hex;

    try {
      await navigator.clipboard.writeText(hex);
      statusElement.textContent = `${hex} copied to clipboard!`;
    } catch {
      statusElement.textContent = `Color code: ${hex}`;
    }
  }
});

renderPalette();