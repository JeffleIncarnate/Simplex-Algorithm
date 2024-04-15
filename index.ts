// deno-lint-ignore-file
// My First Solution, only got half way through with it
// First we need to take all the values for the objective funciton, and put them in the array (I was thinking linked list)

const objectiveFunction: Record<string, number> = {
  m: 2500,
  tv: -1 / 4,
  x: 1.85,
  tc: 1 / 3,
  pa: -1,
  pt: 5,
  s1: 0,
  s2: 0,
  s3: 0,
  s4: 0,
  s5: 0,
  s6: 0,
};

// Second, take all the contraints, and create some sort of linear algebra solver to solve all the values and give us our slack variables
const constraints = [
  "m <= 5000",
  "tv <= 2",
  "x <= 100",
  "tc <= 24",
  "pa <= 10",
  "pt <= 10",
];

const solvedSlackValues: number[] = [];

for (let i = 1; i <= constraints.length; i++) {
  const currContraint = constraints[i - 1];

  const tmp = currContraint.split(" ");

  solvedSlackValues.push(parseInt(tmp[tmp.length - 1]));
}
// add them to the list and then get the basic solution
console.log(
  `Basic Solution: (m, tv, x, tc, pa, pt, s1, s2, s3, s4, s5, s6) => (0, 0, 0, 0, 0, 0, ${solvedSlackValues[0]}, ${solvedSlackValues[1]}, ${solvedSlackValues[2]}, ${solvedSlackValues[3]}, ${solvedSlackValues[4]}, ${solvedSlackValues[5]}})`
);

// then we create the simplex tableau table
const recurse = () => {
  const cj = { ...objectiveFunction };

  // m, tv, x, tc, pa, pt
  const cij = [
    /* 1 */ [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    /* 2 */ [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    /* 3 */ [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    /* 4 */ [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    /* 5 */ [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    /* 6 */ [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  ];

  const cb = [0, 0, 0, 0, 0, 0];
  const ratio = [];

  const zj = [];
  const cjzj: number[] = [];

  // calculate zj
  for (let i = 0; i < cij[0].length; i++) {
    let tmp = 0;

    for (let j = 0; j < cij.length; j++) {
      tmp += cb[j] * cij[j][i];
    }

    zj.push(tmp);
  }

  // calculate cj-zj by looping over cj and getting the value
  for (let i = 0; i < zj.length; i++) {
    let v = Object.values(objectiveFunction);
    cjzj.push(v[i] - zj[i]);
  }

  // Now we need to find the max value and make that the pivot in the cjzj row!!!!
  let max = -100000000000000000;
  let maxIndex = -1;
  for (let i = 0; i < cjzj.length; i++) {
    if (cjzj[i] > max) {
      maxIndex = i;
      max = cjzj[i];
    }
  }

  // We need to calculate the ratio
  let indexOfRealNumber = 0;

  for (let i = 0; i < cij.length; i++) {
    // calculate ratio
    if (solvedSlackValues[i] / cij[maxIndex][i] === Infinity) {
      ratio.push(null);
      indexOfRealNumber = i;
    } else {
      ratio.push(solvedSlackValues[i] / cij[maxIndex][i]);
    }
  }

  // Now we iterate:
  // find max item in Objective function
  let maximum = -100000;
  let maximumIndex = 0;
  const ojCoeffiencets = Object.values(objectiveFunction);

  for (let i = 0; i < ojCoeffiencets.length; i++) {
    if (ojCoeffiencets[i] > maximum) {
      maximum = ojCoeffiencets[i];
      maximumIndex = i;
    }
  }

  // Continue untill all values are cj-zj values are +ve
  const continueUntill = () => {
    // This is the breaking loop
    // for (let i = 0; i < cjzj.length; i++) {
    //   if (cjzj[i] > 0) {
    //     return;
    //   }
    // }

    // Run
    cb[indexOfRealNumber] = maximum;

    console.log(cb);
  };

  continueUntill();
};

recurse();

// then we pivot untill we find the optimal solution
