export function minimumPathSumDP(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  const steps = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j];
      } else {
        const up = i > 0 ? dp[i - 1][j] : Infinity;
        const left = j > 0 ? dp[i][j - 1] : Infinity;
        dp[i][j] = grid[i][j] + Math.min(up, left);
      }
      steps.push({ i, j, val: dp[i][j] });
    }
  }

  return { steps, result: dp[m - 1][n - 1] };
}
