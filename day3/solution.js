import fs from "fs";

async function readFile() {
  try {
    return fs.readFileSync("./input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
}

async function solutionPart1() {
  const regex = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g);
  const text = await readFile();

  let total = 0;

  const matches = text.match(regex);

  for (const mul of matches) {
    const middle = mul.split(",");

    const left = middle[0].split("(");
    const right = middle[1].split(")");

    total += Number(left[1]) * Number(right[0]);
  }

  console.log("total is equal to ", total);
}

async function solutionPart2() {
  const beforeDontRegex = new RegExp(/(.*?)(?=don't\(\))/s);
  const doDontRegex = new RegExp(/do\(\)(.*?)(don't\(\)|$)/gs);
  const mulRegex = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g);

  const test =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

  let total = 0;

  const text = await readFile();

  const before = text.match(beforeDontRegex);
  const beforeMatches = before[0].match(mulRegex);

  const between = text.match(doDontRegex);

  total += between.reduce((acc, curr) => {
    acc += calculateMulMatches(curr.match(mulRegex));

    return acc;
  }, 0);

  total += calculateMulMatches(beforeMatches);

  console.log("total is equal to:", total);
}

function calculateMulMatches(matches) {
  let total = 0;

  for (const mul of matches) {
    const middle = mul.split(",");

    const left = middle[0].split("(");
    const right = middle[1].split(")");

    total += Number(left[1]) * Number(right[0]);
  }

  return total;
}

await solutionPart2();
