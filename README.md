export async function runVisualizer({ steps, delay = 300 }) {
  for (const step of steps) {
    const { i, j, val } = step;
    const cell = document.getElementById(`cell-${i}-${j}`);
    if (cell) {
      cell.classList.add("active");
      cell.innerText = val;
      await new Promise(r => setTimeout(r, delay));
      cell.classList.remove("active");
      cell.classList.add("filled");
    }
  }
}
