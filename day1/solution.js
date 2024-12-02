import fs from "fs";
import readline from "readline";

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const left = [];
  const right = [];

  for await (const line of rl) {
    const [l, r] = line.split("   ");

    left.push(Number(l));
    right.push(Number(r));
  }

  return [left, right];
}

async function solutionA() {
  const [left, right] = await processLineByLine();
  let totalDist = 0;

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  for (let i = 0; i < left.length; i++) {
    totalDist += Math.abs(left[i] - right[i]);
  }

  console.log("Total distance --> ", totalDist);
}

async function solutionB() {
  const [left, right] = await processLineByLine();
  let map = new Map();

  for (let i = 0; i < right.length; i++) {
    map.set(right[i], (map.get(right[i]) || 0) + 1);
  }

  let total = 0;

  for (let i = 0; i < left.length; i++) {
    if (map.has(left[i])) {
      total += left[i] * map.get(left[i]);
    }
  }

  console.log("Total similiraty score --> ", total);
}

await solutionB();
