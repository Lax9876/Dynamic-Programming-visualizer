export function coinChangeDP(coins, amount) {
  const INF = amount + 1;
  const n = coins.length;
  const dp = Array.from({ length: amount + 1 }, () => Array(n).fill(INF));
  const steps = [];

  // Line 1: Function signature
  steps.push({ type: "processing", line: 1 });

  // Line 2: int n = coins.size();
  steps.push({ type: "processing", line: 2 });

  // Line 3: vector<vector<int>> dp...
  steps.push({ type: "processing", line: 3 });

  // Line 4: for (int j = 0; j < n; ++j) dp[0][j] = 0;
  for (let j = 0; j < n; ++j) {
    dp[0][j] = 0;
    steps.push({ i: 0, j, val: 0, type: j === 0 ? "start" : "visited", line: 4 });
  }

  // Line 5: for (int x = 1; x <= amount; ++x)
  for (let x = 1; x <= amount; ++x) {
    steps.push({ type: "processing", line: 5, i: x });

    // Line 6: for (int j = 0; j < n; ++j)
    for (let j = 0; j < n; ++j) {
      steps.push({ type: "processing", line: 6, i: x, j });

      // Line 7: without coin
      const without = j > 0 ? dp[x][j - 1] : INF;
      steps.push({ type: "processing", line: 7, i: x, j });

      // Line 8: with coin
      const withCoin = x - coins[j] >= 0 ? dp[x - coins[j]][j] + 1 : INF;
      steps.push({ type: "processing", line: 8, i: x, j });

      // Line 9: take minimum
      dp[x][j] = Math.min(without, withCoin);
      steps.push({
        i: x,
        j,
        val: dp[x][j] === INF ? "–" : dp[x][j],
        type: "visited",
        line: 9
      });
    }
  }

  // Line 12: return result
  const finalVal = dp[amount][n - 1];
  steps.push({
    type: "end",
    i: amount,
    j: n - 1,
    val: finalVal === INF ? -1 : finalVal,
    line: 12
  });

  return {
    result: finalVal === INF ? -1 : finalVal,
    steps
  };
}
