import fs from "fs";

async function getInput() {
  try {
    const text = fs.readFileSync("./input.txt", "utf8");
    const line = text.split("\n");

    return line;
  } catch (err) {
    console.error("error reading the file");
  }
}

async function solutionPart1() {
  const test =
    "MMMSXXMASM\n" +
    "MSAMXMSMSA\n" +
    "AMXSXMAAMM\n" +
    "MSAMASMSMX\n" +
    "XMASAMXAMM\n" +
    "XXAMMXXAMA\n" +
    "SMSMSASXSS\n" +
    "SAXAMASAAA\n" +
    "MAMMMXMMMM\n" +
    "MXMXAXMASX";

  const matrix = await getInput();
  let total = 0;

  const wordToFind = "XMAS";

  const rLimit = matrix[0].length;
  const bLimit = matrix.length;

  for (let l = 0; l < matrix.length; l++) {
    for (let c = 0; c < matrix[l].length; c++) {
      if (matrix[l][c] === "X") {
        //check top
        if (l - 3 >= 0) {
          if (
            matrix[l][c] +
              matrix[l - 1][c] +
              matrix[l - 2][c] +
              matrix[l - 3][c] ===
            wordToFind
          ) {
            total++;

            console.log(
              `vertical top ! total = ${total}, new word at {${l}, ${c}} {${l - 1}, ${c}} { ${l - 2}}, ${c} {${l - 3}, ${c}}`,
            );
          }
        }
        // check right
        if (c + 3 < rLimit) {
          if (
            matrix[l][c] +
              matrix[l][c + 1] +
              matrix[l][c + 2] +
              matrix[l][c + 3] ===
            wordToFind
          ) {
            total++;

            console.log(`right ! total = ${total}, new word at {${l}, ${c}}`);
          }
        }

        // check bottom
        if (l + 3 < bLimit) {
          if (
            matrix[l][c] +
              matrix[l + 1][c] +
              matrix[l + 2][c] +
              matrix[l + 3][c] ===
            wordToFind
          ) {
            total++;
            console.log(`bottom ! total = ${total}, new word at {${l}, ${c}}`);
          }
        }

        // check left

        if (c - 3 >= 0) {
          if (
            matrix[l][c] +
              matrix[l][c - 1] +
              matrix[l][c - 2] +
              matrix[l][c - 3] ===
            wordToFind
          ) {
            total++;
            console.log(`left! total = ${total}, new word at {${l}, ${c}}`);
          }
        }

        // check top left diago
        if (c - 3 >= 0 && l - 3 >= 0) {
          if (
            matrix[l][c] +
              matrix[l - 1][c - 1] +
              matrix[l - 2][c - 2] +
              matrix[l - 3][c - 3] ===
            wordToFind
          ) {
            total++;
            console.log(
              `diago left ! total = ${total}, new word at {${l}, ${c}} {${l - 1}, ${c - 1}} { ${l - 2}}, ${c - 2} {${l - 3}, ${c - 3}}`,
            );
          }
        }
        // check top right diago
        if (c + 3 < rLimit && l - 3 >= 0) {
          if (
            matrix[l][c] +
              matrix[l - 1][c + 1] +
              matrix[l - 2][c + 2] +
              matrix[l - 3][c + 3] ===
            wordToFind
          ) {
            total++;
            console.log(
              `top right diago! total = ${total}, new word at {${l}, ${c}}`,
            );
          }
        }

        // check bottom left diago
        if (c - 3 >= 0 && l + 3 < bLimit) {
          if (
            matrix[l][c] +
              matrix[l + 1][c - 1] +
              matrix[l + 2][c - 2] +
              matrix[l + 3][c - 3] ===
            wordToFind
          ) {
            total++;
            console.log(
              `bottom left diago! total = ${total}, new word at {${l}, ${c}}`,
            );
          }
        }

        // check botto right diago
        if (c + 3 < rLimit && l + 3 < bLimit) {
          if (
            matrix[l][c] +
              matrix[l + 1][c + 1] +
              matrix[l + 2][c + 2] +
              matrix[l + 3][c + 3] ===
            wordToFind
          ) {
            total++;
            console.log(
              `bottom right diago! total = ${total}, new word at {${l}, ${c}}`,
            );
          }
        }
      }
    }
  }

  console.log("found Xmas =", total);
}

await solutionPart1();
