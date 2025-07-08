export function uniquePathsDP(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  const steps = [];

  // 1. Highlight function signature
  steps.push({ type: "processing", line: 1,val: "" });

  // 2. Highlight DP initialization
  steps.push({ type: "processing", line: 2,val: "" });

  for (let i = 0; i < m; ++i) {
    // 3. Highlight outer loop header
    steps.push({ type: "processing", line: 3, i });

    for (let j = 0; j < n; ++j) {
      // 4. Highlight inner loop header
      steps.push({ type: "processing", line: 4, i, j });

      if (i === 0 && j === 0) {
        // 5. Highlight if condition
        steps.push({ type: "processing", line: 5, i, j });
        // 6. Assignment
        dp[i][j] = 1;
        steps.push({ type: "start", line: 5, i, j, val: 1 });
      } else {
        // 7. Highlight else
        steps.push({ type: "processing", line: 6, i, j });
        // 8. Highlight up calculation
        steps.push({ type: "processing", line: 7, i, j });
        const up = i > 0 ? dp[i-1][j] : 0;
        // 9. Highlight left calculation
        steps.push({ type: "processing", line: 8, i, j });
        const left = j > 0 ? dp[i][j-1] : 0;
        // 10. Assignment
        dp[i][j] = up + left;
        steps.push({ type: "visited", line: 9, i, j, val: dp[i][j] });
      }
    }
  }

  // 11. Highlight return statement
  steps.push({ type: "end", line: 13, i: m-1, j: n-1, val: dp[m-1][n-1] });

  return {
    result: dp[m-1][n-1],
    steps
  };
}
