const fs = require("fs");

function parseInput() {
  const content = fs.readFileSync("./input.txt", "utf8").trim();
  return content.split("\n").map(Number);
}

function partOneFuelSum(moduleMassList) {
  let sum = 0;
  moduleMassList.forEach((mass) => {
    sum += Math.floor(mass / 3) - 2;
  });
  return sum;
}

function partTwoFuelSum(moduleMassList) {
  let sum = 0;
  moduleMassList.forEach((mass) => {
    let fuelToAdd = mass;
    while (fuelToAdd > 0) {
      fuelToAdd = Math.floor(fuelToAdd / 3) - 2;
      if (fuelToAdd > 0) {
        sum += fuelToAdd;
      }
    }
  });
  return sum;
}

const moduleMassList = parseInput();
console.log("Part One Code:", partOneFuelSum(moduleMassList));
console.log("Part Two Code:", partTwoFuelSum(moduleMassList));
