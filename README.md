# Math Shit

Where:

The reason for the constraints that I have chosen is so that no non-real numbers are chosen to be inputted into the function, this would be a problem if you say you spend “$2600i” on a cat (where i is the square root of -1) this is not possible, as i is imaginary. Another implied constraint is that all the variables have to be greater than 1. The reason for this is due to a non-negativity constraint with the Simplex Algorithm.

The objective function was formed by taking the average for all our variables, The average amount of money needed to be spent on a cat is 2500, the time to vet should be 15 minutes, and the average space needed for a cat is 1.85 metres. The reason pa is -ve is because pa is the number of people allergic to cats, this would decrease our final answer, however, if pa is 0, then the -ve is null in void.
Constraints and Basic Solution
The constraints we chose to use, had to adhere to the rules of the simplex algorithm. This would imply that we need one for the non-negativity of variables and a maximum value of variables. From these constraints, we would need to convert them to Standard form, with slack variables. From then, we can set up the Simplex tableau.

The LP constraints we chose were as follows:

Standard Form:

From these slack variables, we can set all non-basic variables to 0, to find our slack variables. From there, we put those 0 values into the standard form equations to find the values of our standard variables: which results in: (m, x, tv, tc, pa, pt, s1, s2, s3, s4, s5, s6) => (0, 0, 0, 0, 0, 0, 5000, 100, 2, 24, 10, 10). This is our basic feasible solution.
Pivots/Simplex Tableau
From here, we need to set up the Simplex Tableau. The simplex tableau is a way to solve a linear programming problem with more than 2 variables. In the cat's example, we need to set up a table with key rows and columns. The rows are as follows: cj which are coefficients of the objective function WITH slack variables. Below that we have the aij row, which is a partial table with all the coefficients of the equality’s. Then we have the cb column, that cb column is the column with the coefficients of the basis variables, initially the coefficients are 0 as they are the coefficients of the slack variables in the Objective Function. Below that we have the zj row. Which is the cb row multiplied by the aij key column array. To the right of aij we have the b column, the b column is the quality Right Hand Side (RHS) of that specific equality in relation to the basis sn property. Then we have the cj-zj row, this row is the cj row minus the zj row, this provides up with the net evaluation row, this is the row that will affect the Objective function by the cjzj value. E.g is x1 has the cj value of 7, and a cjzj value of +7, then if xz increases by 1, then the Objective Function will increase by 7. From here we take the ratio of the b row, divided by the key pivot column, this will give us a ratio, from there if we take the maximum value in the cjzj row, we will have the key pivot column. Then we take the x and y value of the aij matrix and make that the key pivot element. From that step, we just repeat this process.

Reasoning and Optimal Solution
The reasoning for the objective function was made to optimise some specific variables more than others. Like for example, the m variable coefficient is much more important than the x variable coefficient, this is because the m variable is more important than x. Another example is the variables are the coefficients of tv and pa the reason both of them are -ve (negative) in the objective because they are negatives. Because if someone is allergic to cats in a family, it would be bad for both the cat and the family. Therefore if a negative variable changes, then it will decrease the Objective Function.

In the code in the Appendix, I wrote the simplex algorithm to find the most optimal solution for the linear programming with the Simplex Algorithm, in Appendix 1, the code returns the best solution for the linear program. Where m: 5000, tv: 0, x: 100, tc: 24, pa: 0, pt: 10. This returns the optimal solution of 12,500,213. Generally the higher the score the better, as if tv increases from 0, to 1, that would decrease the Objective Function from 12,500,213 to 12,500,212.75.
