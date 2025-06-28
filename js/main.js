import {
  initVisualizer,
  playVisualizer,
  pauseVisualizer,
  stepVisualizer,
  resetVisualizer
} from "./visualizer.js";


import { uniquePathsDP } from "./problems/uniquePaths.js";
import { minimumPathSumDP } from "./problems/minimumPathSum.js";
import { maxPathSumDP } from "./problems/max_path_sum.js";
import { coinChangeDP } from "./problems/coin_change.js";

// --- Utility: Show Code in the Right Panel ---
function getUniquePathsCode() {
  return `int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 0));
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < n; ++j) {
            if (i == 0 && j == 0) dp[i][j] = 1;
            else {
                int up = i > 0 ? dp[i-1][j] : 0;
                int left = j > 0 ? dp[i][j-1] : 0;
                dp[i][j] = up + left;
            }
        }
    }
    return dp[m-1][n-1];

}`;
}


function getMinimumPathSumCode() {
  return `int min_path(vector<vector<int>>& paths){
    int n = paths.size();
    int m =paths[0].size();
    vector<vector<int>> dp(n,vector<int>(m));
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(i == 0 && j==0){
                dp[i][j]=paths[i][j];
            }else{
                int up = (i>0)? dp[i-1][j]:INT_MAX;
                int left =(j>0)?  dp[i][j-1]:INT_MAX;
                dp[i][j] = paths[i][j] + min(up,left);
            }
            
        }

    }
    return dp[n-1][m-1];
}`;
}

function getMaxPathSumCode() {
  return `int maxPathSum(vector<vector<int>>& grid) {
    int n = grid.size();
    int m = grid[0].size();
    vector<vector<int>> dp(n, vector<int>(m));
    for (int i = 0; i < n; ++i) {
      for (int j = 0; j < m; ++j) {
        if (i == 0 && j == 0) {
          dp[i][j] = grid[i][j];
        } else {
          int fromTop  = (i > 0) ? dp[i-1][j] : INT_MIN;
          int fromLeft = (j > 0) ? dp[i][j-1] : INT_MIN;
          dp[i][j] = grid[i][j] + max(fromTop, fromLeft);
        }
      }
    }
    return dp[n-1][m-1];

  }`;
}

function getCoinChangeCode() {
  return `int coinChange(vector<int>& coins, int amount) {
    const int INF = amount + 1;
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;
    for (int c : coins) {
      for (int x = c; x <= amount; ++x) {
        dp[x] = min(dp[x], dp[x - c] + 1);
      }
    }
    return (dp[amount] > amount) ? -1 : dp[amount];
}`;
}


function formatGrid(grid) {
  return `<table style="border-collapse: collapse;">` +
    grid.map(row =>
      `<tr>` +
      row.map(val => `<td style="border: 1px solid #ccc; padding: 5px; text-align: center;">${val}</td>`).join("") +
      `</tr>`
    ).join("") +
    `</table>`;
}


// --- DOM Load & Button Wiring ---
window.addEventListener("DOMContentLoaded", () => {
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const problemSelect = document.getElementById("problem");
  const infoPanel    = document.getElementById("infoPanel"); 
  document.getElementById("startBtn").addEventListener("click", () => {
    
    const m = parseInt(rowsInput.value);
    const n = parseInt(colsInput.value);
    
    let result;
    let code = "";
    let grid;       // we’ll define it per‐problem
    let coins, amount;
    
    if (problemSelect.value === "uniquePaths") {
      result = uniquePathsDP(m, n);
      code   = getUniquePathsCode();

    } else if (problemSelect.value === "minimumPathSum") {
      // random grid for min path sum
      grid = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Math.floor(Math.random() * 9) + 1)
      );
      result = minimumPathSumDP(grid);
      code   = getMinimumPathSumCode();

      infoPanel.innerHTML = `<h3>Input Grid:</h3>` + formatGrid(grid);

    } else if (problemSelect.value === "max_path_sum") {
      // random grid for max path sum
      grid = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Math.floor(Math.random() * 9) + 1)
      );
      result = maxPathSumDP(grid);
      code   = getMaxPathSumCode();

      infoPanel.innerHTML = `<h3>Input Grid:</h3>` + formatGrid(grid);

    } else if (problemSelect.value === "coin_change") {
        // 1. Define coins & amount
        const coins  = [1, 2, 5];
        const amount = Math.floor(Math.random() * 20) + 1;

        // 2. Run the DP, which returns { result, steps }
        const { result: answer, steps } = coinChangeDP(coins, amount);

        // 3. Prepare the code preview
        code = getCoinChangeCode();

        // 4. Show input info
        infoPanel.innerHTML = `
          <p><strong>Coins:</strong> [${coins.join(", ")}]</p>
          <p><strong>Amount:</strong> ${amount}</p>
        `;

        // 5. Initialize the visualizer with the correct dimensions:
        //    - rows = amount+1 (for x = 0…amount)
        //    - cols = number of coins
        initVisualizer({
          steps,
          gridSize: { m: amount + 1, n: coins.length },
          code
        });

        // 6. Start playback immediately
        playVisualizer(300);

        // 7. Return early so you don’t re-init below
        return;
      }


    if (result && result.steps) {
      initVisualizer({
        steps:    result.steps,
        gridSize: { m, n },
        code
      });
      playVisualizer(300);
    }
  });


  document.getElementById("playBtn").addEventListener("click", () => {
    playVisualizer(300);
  });

  document.getElementById("pauseBtn").addEventListener("click", () => {
    pauseVisualizer();
  });

  document.getElementById("stepBtn").addEventListener("click", () => {
    stepVisualizer();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    resetVisualizer();
  });
});
