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
export function playVisualizer(delay = 300) {
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
  const { i, j, val } = step;
  const cell = document.getElementById(`cell-${i}-${j}`);
  if (cell) {
    cell.classList.add("active");
    cell.innerText = val;
    setTimeout(() => {
      cell.classList.remove("active");
      cell.classList.add("filled");
    }, 200);
  }
}


function highlightCode(code, language = "cpp") {
  const codeDisplay = document.getElementById("codeDisplay");
  codeDisplay.className = `language-${language}`; // Set correct language
  codeDisplay.textContent = code;
  Prism.highlightElement(codeDisplay);
}





  
