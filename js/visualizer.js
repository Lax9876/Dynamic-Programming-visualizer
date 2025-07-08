let interval = null;
let currentStep = 0;
let steps = [];
let gridSize = { m: 0, n: 0 };

// --- Initialization ---
export function initVisualizer({ steps: s, gridSize: size, code }) {
  steps = s;
  gridSize = size;
  currentStep = 0;
  clearInterval(interval);
  createGrid(size.m, size.n);
  highlightCode(code);
}

// --- Playback ---
export function playVisualizer(delay =2000) {
  if (interval) return;
  interval = setInterval(() => {
    if (currentStep >= steps.length) {
      pauseVisualizer();
      return;
    }
    fillGridStep(steps[currentStep++]);
  }, delay);
}

export function pauseVisualizer() {
  clearInterval(interval);
  interval = null;
}

export function stepVisualizer() {
  if (currentStep < steps.length) {
    fillGridStep(steps[currentStep++]);
  }
}

export function resetVisualizer() {
  pauseVisualizer();
  currentStep = 0;
  createGrid(gridSize.m, gridSize.n);
}


// --- Helper Functions ---

function createGrid(m, n) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.style.gridTemplateRows = `repeat(${m}, 40px)`;
  grid.style.gridTemplateColumns = `repeat(${n}, 40px)`;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}-${j}`;
      grid.appendChild(cell);
    }
  }
}

function fillGridStep(step) {
  const { i, j, val, type, line } = step;

  // 🔸 Always highlight the current code line (if any)
  if (typeof line === "number") {
    highlightCodeLine(line);
  }

  // 🔸 Process only for visual cell types
  const visualTypes = ["start", "visited", "processing", "end"];
  const isVisual = visualTypes.includes(type);

  if (isVisual) {
    const cell = document.getElementById(`cell-${i}-${j}`);
    if (!cell) return;

    // Remove all visual classes
    cell.classList.remove(...visualTypes);

    // Add current type
    cell.classList.add(type);

    // Show special character for "processing"
    cell.innerText = (type === "processing") ? "…" : val;
  }

  // 🔸 Always update the info panel if there's a type
  if (type) {
    const infoPanel = document.getElementById("infoPanel");
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    infoPanel.innerHTML = `
      <h3>${label}</h3>
      ${i !== undefined && j !== undefined ? `<p>Cell: (${i}, ${j})</p>` : ""}
      ${val !== undefined ? `<p>Value: ${type === "processing" ? "…" : val}</p>` : ""}
    `;
  }
}



export function highlightCode(code, lang = "cpp") {
  const codeDisplay = document.getElementById("codeDisplay");

  const lines = code.split("\n").map((line, idx) => {
    return `<div class="code-line" data-line="${idx + 1}">${Prism.highlight(line, Prism.languages[lang], lang)}</div>`;
  });

  codeDisplay.innerHTML = lines.join("");
  codeDisplay.className = `language-${lang}`;
}



export function highlightCodeLine(lineNum) {
  const allLines = document.querySelectorAll(".code-line");
  allLines.forEach(line => line.classList.remove("highlight"));
  const currentLine = document.querySelector(`.code-line[data-line="${lineNum}"]`);
  if (currentLine) {
    currentLine.classList.add("highlight");
    currentLine.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}













  
