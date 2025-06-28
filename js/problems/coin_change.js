// --- Coin Change (min # coins to make amount) ---
export function coinChangeDP(coins, amount) {
  const INF = amount + 1;
  const dp = Array(amount + 1).fill(INF);
  const steps = [];

  dp[0] = 0;
  steps.push({ i: 0, j: 0, val: 0, codeLine: 3 });

  for (let c of coins) {
    for (let x = c; x <= amount; x++) {
      dp[x] = Math.min(dp[x], dp[x - c] + 1);
      steps.push({
        i: x,            // we’ll map i→amount axis
        j: coins.indexOf(c), // and j→which coin
        val: dp[x],
        codeLine: 6     // line in your C++ coinChange snippet
      });
    }
  }

  return {
    result: dp[amount] > amount ? -1 : dp[amount],
    steps
  };
}
