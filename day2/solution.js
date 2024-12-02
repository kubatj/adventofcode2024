import fs from "fs";
import readline from "readline";

async function getReports() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const reports = [];

  for await (const line of rl) {
    const report = line.split(" ");

    reports.push(report);
  }

  return reports;
}

async function solutionA() {
  const reports = await getReports();
  let safeReports = 0;

  for (let k = 0; k < reports.length; k++) {
    const report = reports[k];

    let direction = Math.sign(Number(report[1]) - Number(report[0]));

    if (direction === 0) {
      continue;
    }

    let isSafe = true;

    for (let i = 0; i < report.length - 1; i++) {
      let l = Number(report[i]);
      let r = Number(report[i + 1]);

      if (Math.sign(r - l) !== direction || Math.abs(l - r) > 3) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      safeReports += 1;
    }
  }

  console.log("Total of safe Reports --> ", safeReports);
}

// SOLUTION PART 2

function isSafe(report) {
  let direction = Math.sign(Number(report[1]) - Number(report[0]));
  if (direction === 0) return false;

  for (let i = 1; i < report.length; i++) {
    const diff = Number(report[i]) - Number(report[i - 1]);
    if (Math.sign(diff) !== direction || Math.abs(diff) > 3) {
      return false;
    }
  }
  return true;
}

async function solutionB() {
  const reports = await getReports();
  let safeReports = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      safeReports++;
      continue;
    }

    let canBeSafe = false;
    for (let i = 0; i < report.length; i++) {
      const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
      if (isSafe(modifiedReport)) {
        canBeSafe = true;
        break;
      }
    }

    if (canBeSafe) {
      safeReports++;
    }
  }

  console.log(
    "Total nbr of safe Reports for part 2 solution  --> ",
    safeReports,
  );
}

await solutionB();
