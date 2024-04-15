// deno-lint-ignore-file
function simplex(
  aij: number[][],
  pivotElement: number,
  cj: number[],
  zj: number[],
  cjzj: number[],
  pivotX: number,
  pivotY: number,
  b: number[],
  cb: number[],
  ratio: number[],
  objectiveFunction: number[]
) {
  // Checker to exit recusion if we are done:
  const copy = [...cjzj];
  copy.sort((a, b) => {
    return b - a;
  });

  for (let i = 0; i < cjzj.length; i++) {
    if (!(copy[0] > 0)) {
      return;
    }
  }

  // Now we just do the same thing over and over again, the reason is because all pivot element will be 0, and the aij table will NOT change
  // The math dictates that the aij row will NOT change due the the pivot element always being 1, and all other elements in the aij column will be 0

  // Now we need to calculate the new zj value
  for (let i = 0; i < aij[0].length; i++) {
    let tmp = 0;
    for (let j = 0; j < aij.length; j++) {
      const currColElement = aij[j][i];
      const cbNumber = cb[j];

      tmp += cbNumber * currColElement;
    }

    zj[i] = tmp;
  }

  // calculate cj-zj
  for (let i = 0; i < zj.length; i++) {
    cjzj[i] = cj[i] - zj[i];
  }

  // Next we need to find the smallest element in the array,and make that x value out pivot x
  let max = -1;
  let x = -1;
  for (let i = 0; i < cjzj.length; i++) {
    if (cjzj[i] > max) {
      max = cjzj[i];
      x = i;
    }
  }

  let y = -1;

  // next we need to calculate the ratio and find the pivotY
  for (let i = 0; i < cb.length; i++) {
    const colElement = aij[i][x];
    if (b[i] / colElement !== Infinity) {
      y = i;
    }
    ratio[i] = b[i] / colElement;
  }

  cb[y] = objectiveFunction[x];

  simplex(
    aij,
    pivotElement,
    cj,
    zj,
    cjzj,
    x,
    y,
    b,
    cb,
    ratio,
    objectiveFunction
  );
}

function setup() {
  // m, tv, x, tc, pa, pt
  const coEfficients = [2500, -1 / 4, 1.85, 1 / 3, -1, 5];
  // m, tv, x, tc, pa, pt, s1, s2, s3, s4, s5, s6
  const objectiveFunction = [
    2500,
    -1 / 4,
    1.85,
    1 / 3,
    -1,
    5,
    0,
    0,
    0,
    0,
    0,
    0,
  ];
  const cb = [0, 0, 0, 0, 0, 0];
  const zj: number[] = [];
  const b: number[] = [5000, 2, 100, 24, 10, 10];
  const cjzj: number[] = [];
  const ratio: number[] = [];

  // Table
  const cj = [...objectiveFunction];
  let aij = [
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  ];

  if (cjzj.length !== 0) {
    let cjzjCopyHasNegative = [...cjzj].some((v) => v < 0);

    if (!cjzjCopyHasNegative) {
      return;
    }
  }

  // Calculate zj
  for (let i = 0; i < aij[0].length; i++) {
    let tmp = 0;
    for (let j = 0; j < aij.length; j++) {
      const currColElement = aij[j][i];
      const cbNumber = cb[j];

      tmp += cbNumber * currColElement;
    }

    zj[i] = tmp;
  }

  // calculate cj-zj
  for (let i = 0; i < zj.length; i++) {
    cjzj[i] = cj[i] - zj[i];
  }

  // Index of max value in cjzj
  let maxValueInCjZj = cjzj.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  let y = -1;

  // Calculate ratio of all elements
  for (let i = 0; i < cb.length; i++) {
    const colElement = aij[i][maxValueInCjZj];
    if (b[i] / colElement !== Infinity) {
      y = i;
    }
    ratio[i] = b[i] / colElement;
  }

  // Calculate pivot element
  let x = maxValueInCjZj;

  cb[y] = objectiveFunction[x];

  const pivotElement = aij[y][x];

  // simplex recursive function to solve the cats problem
  simplex(
    aij,
    pivotElement,
    cj,
    zj,
    cjzj,
    x,
    y,
    b,
    cb,
    ratio,
    objectiveFunction
  );
  console.log(
    `m: ${b[0]}, tv: ${cb[1]}, x: ${b[2]}, tc: ${b[3]}, pa: ${cb[4]}, pt: ${b[5]}`
  );
}

setup();
