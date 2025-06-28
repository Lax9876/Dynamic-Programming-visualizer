// --- Max Path Sum (maximizes sum from top-left to bottom-right) ---
export function maxPathSumDP(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));
  const steps = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j];
        steps.push({ i, j, val: dp[i][j], codeLine: 7 });
      } else {
        const fromTop  = i > 0 ? dp[i-1][j] : -Infinity;
        const fromLeft = j > 0 ? dp[i][j-1] : -Infinity;
        dp[i][j] = grid[i][j] + Math.max(fromTop, fromLeft);

        steps.push({ i, j, val: dp[i][j], codeLine: 10 });
      }
    }
  }

  return {
    result: dp[n-1][m-1],
    steps
  };
}
