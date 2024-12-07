import fs from "fs";
async function getMatrix() {
  try {
    const text = fs.readFileSync("testInput.txt", "utf8");

    return text.split("\n");
  } catch (err) {
    console.error("error while reading the input file");
  }
}

function findStartingPosition(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let k = 0; k < matrix[i].length; k++) {
      if (matrix[i][k] === "^") {
        return [i, k];
      }
    }
  }
}

async function solutionPart1() {
  const matrix = await getMatrix();
  const startingPoint = findStartingPosition(matrix);
  const visited = new Set();
  visited.add(`${startingPoint[0]},${startingPoint[1]}`);

  //we simulate
  let currentx = startingPoint[1];
  let currenty = startingPoint[0];
  let direction = "top";

  while (
    currentx >= 0 &&
    currentx <= matrix[0].length - 1 &&
    currenty >= 0 &&
    currenty <= matrix.length - 1
  ) {
    if (direction === "top") {
      while (matrix[currenty - 1][currentx] !== "#") {
        currenty--;
        visited.add(`${currenty},${currentx}`);
      }
      direction = "right";
      currentx++;
    } else if (direction === "right") {
      while (matrix[currenty][currentx + 1] !== "#") {
        currentx++;
        visited.add(`${currenty},${currentx}`);
        console.log(currentx);
      }

      direction = "bottom";
      currenty++;
    } else if (direction === "bottom") {
      while (matrix[currenty + 1][currentx] !== "#") {
        currenty++;
        visited.add(`${currenty},${currentx}`);
      }
      direction = "left";
      currentx--;
    } else if (direction === "left") {
      while (matrix[currenty][currentx - 1] !== "#") {
        currentx--;
        visited.add(`${currenty},${currentx}`);
      }
      direction = "top";
      currenty--;
    }
    console.log("direction", direction);
    console.log("set", visited);
  }
  console.log(visited);
  console.log("visited that many = ", visited.size);
}

await solutionPart1();
