const fs = require("fs");

function parseInput(filename) {
  const content = fs.readFileSync(filename, "utf8").trim();
  return content.split(",").map(Number);
}

function runIntcode(program, noun, verb) {
  const memory = [...program];
  memory[1] = noun;
  memory[2] = verb;
  let ip = 0;

  while (true) {
    const opcode = memory[ip];

    if (opcode === 99) break;

    if (opcode === 1) {
      const value1 = memory[memory[ip + 1]];
      const value2 = memory[memory[ip + 2]];
      const outputPos = memory[ip + 3];
      memory[outputPos] = value1 + value2;
      ip += 4;
    } else if (opcode === 2) {
      const value1 = memory[memory[ip + 1]];
      const value2 = memory[memory[ip + 2]];
      const outputPos = memory[ip + 3];
      memory[outputPos] = value1 * value2;
      ip += 4;
    }
  }

  return memory[0];
}

function partTwo(program) {
  for (let noun = 0; noun <= 100; noun++) {
    for (let verb = 0; verb <= 100; verb++) {
      let result = runIntcode(program, noun, verb);

      if (result === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
  return -1;
}

const path = require("path");
const program = parseInput(path.join(__dirname, "input.txt"));
const codeOne = runIntcode(program, 12, 2);
const codeTwo = partTwo(program);

console.log("Part One Code", codeOne);
console.log("Part Two Code", codeTwo);
