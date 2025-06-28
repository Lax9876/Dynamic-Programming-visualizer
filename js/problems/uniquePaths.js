export function uniquePathsDP(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  const steps = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) dp[i][j] = 1;
      else {
        const up = i > 0 ? dp[i - 1][j] : 0;
        const left = j > 0 ? dp[i][j - 1] : 0;
        dp[i][j] = up + left;
      }
      steps.push({ i, j, val: dp[i][j] });
    }
  }

  return { steps, result: dp[m - 1][n - 1] };
}

export const uniquePathsCode = `
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) dp[i][j] = 1;
      else {
        const up = i > 0 ? dp[i - 1][j] : 0;
        const left = j > 0 ? dp[i][j - 1] : 0;
        dp[i][j] = up + left;
      }
    }
  }
  return dp[m - 1][n - 1];
}`;
