import fs from "fs";

async function readInput() {
  try {
    const text = fs.readFileSync("./input.txt", "utf8");

    const [rules, pages] = text.split("\n\n");

    return [rules, pages];
  } catch (err) {
    console.error("error while reading the input ");
  }
}

async function solutionPart1() {
  const [rules, pages] = await readInput();

  const rulesMap = new Map();

  // setting up the rules map
  for (const rule of rules.split("\n")) {
    const [l, r] = rule.split("|");
    if (rulesMap.has(l)) {
      rulesMap.set(l, [...rulesMap.get(l), r]);
    } else {
      rulesMap.set(l, [r]);
    }
  }

  const validPages = [];

  const lines = pages.split("\n");

  for (const page of lines) {
    const line = page.split(",");

    if (verifyPage(line, rulesMap)) {
      validPages.push(line);
    }
  }

  let total = 0;

  for (const validPage of validPages) {
    let mid = Math.round((validPage.length - 1) / 2);

    total += Number(validPage[mid]);
  }

  console.log("the answer is -->", total);
}

function verifyPage(pages, map) {
  let valid = true;
  // validate the first one
  for (let i = 1; i < pages.length; i++) {
    if (map.has(pages[i]) && map.get(pages[i]).includes(pages[0])) {
      return false;
    }
  }
  for (let i = pages.length - 1; i > 0; i--) {
    for (let k = i - 1; k > 0; k--) {
      if (!map.has(pages[k]) || !map.get(pages[k]).includes(pages[i])) {
        return false;
      }
    }
  }

  return valid;
}

await solutionPart1();
