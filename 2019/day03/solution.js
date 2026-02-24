const fs = require("fs");

function getData(filename) {
  const fileData = fs.readFileSync(filename, "utf8").trim();
  const wirePathStrings = fileData.split("\n").map(String);

  return {
    wireOne: wirePathStrings[0].split(",").map(String),
    wireTwo: wirePathStrings[1].split(",").map(String),
  };
}

function getWireMap(wireArray) {
  const wireMap = new Map();
  const curPos = { x: 0, y: 0 };
  let count = 0;
  wireArray.forEach((instruction) => {
    count++;
    const direction = instruction[0];
    let distance = parseInt(instruction.slice(1));
    while (distance > 0) {
      if (direction === "U") {
        curPos.y += 1;
      } else if (direction === "R") {
        curPos.x += 1;
      } else if (direction === "D") {
        curPos.y -= 1;
      } else if (direction === "L") {
        curPos.x -= 1;
      }
      wireMap.set(`${curPos.x},${curPos.y}`, count);
      distance -= 1;
    }
  });
  return wireMap;
}

function findClosestIntersection(wireOneArray, wireTwoArray) {
  const wireOneMap = getWireMap(wireOneArray);
  const wireTwoMap = getWireMap(wireTwoArray);
  let minDistance = -1;

  wireOneMap.forEach((cords, pos) => {
    console.log("something:", cords, pos);
    if (wireTwoMap.has(pos)) {
      const manhattanDistance = Math.abs(cords.x) + Math.abs(cords.y);
      if (minDistance === -1 || manhattanDistance < minDistance) {
        minDistance = manhattanDistance;
      }
    }
  });

  return minDistance;
}

const { wireOne, wireTwo } = getData("./input.txt");

console.log(findClosestIntersection(wireOne, wireTwo));
