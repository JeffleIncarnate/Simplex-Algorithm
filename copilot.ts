// fuckin bing co pilot solution don't even work
function simplexMethod(
  c: number[],
  A: number[][],
  b: number[]
): number[] | null {
  const m = A.length; // Number of constraints
  const n = c.length; // Number of variables

  // Initialize the tableau
  const tableau: number[][] = [];
  for (let i = 0; i < m; i++) {
    tableau.push([...A[i], b[i]]);
  }
  tableau.push([...c, 0]);

  // Perform the simplex iterations
  while (true) {
    // Find the entering variable (pivot column)
    const pivotCol = tableau[m].findIndex((val) => val > 0);
    if (pivotCol === -1) {
      // No positive coefficients in the objective function
      break;
    }

    // Find the leaving variable (pivot row)
    let minRatio = Infinity;
    let pivotRow = -1;
    for (let i = 0; i < m; i++) {
      if (tableau[i][pivotCol] > 0) {
        const ratio = tableau[i][n] / tableau[i][pivotCol];
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotRow = i;
        }
      }
    }

    if (pivotRow === -1) {
      // Unbounded solution
      return null;
    }

    // Update the tableau using pivot row and column
    const pivotVal = tableau[pivotRow][pivotCol];
    for (let i = 0; i <= n; i++) {
      tableau[pivotRow][i] /= pivotVal;
    }
    for (let i = 0; i <= m; i++) {
      if (i !== pivotRow) {
        const factor = tableau[i][pivotCol];
        for (let j = 0; j <= n; j++) {
          tableau[i][j] -= factor * tableau[pivotRow][j];
        }
      }
    }
  }

  // Extract the optimal solution
  const solution: number[] = [];
  for (let i = 0; i < n; i++) {
    const col = tableau.map((row) => row[i]);
    const nonZeroRow = col.findIndex((val) => val === 1);
    solution.push(nonZeroRow !== -1 ? tableau[nonZeroRow][n] : 0);
  }

  return solution;
}

// Example usage
const c = [2500, -0.25, 1.85, 0.3333333, -1, 5]; // Coefficients of the objective function
const A = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
]; // Coefficients of constraints
const b = [5000, 2, 100, 24, 10, 10]; // Right-hand side values

const optimalSolution = simplexMethod(c, A, b);
if (optimalSolution) {
  console.log("Optimal solution found:");
  console.log(
    `m = ${optimalSolution[0]}, x2 = ${optimalSolution[1]}, x3 = ${optimalSolution[2]}, x4 = ${optimalSolution[3]}, x5 = ${optimalSolution[4]}, x6 = ${optimalSolution[5]},`
  );
} else {
  console.log("No feasible solution found.");
}
