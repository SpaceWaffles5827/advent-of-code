const fs = require("fs");

function parseInput(filename) {
  const content = fs.readFileSync(filename, "utf8").trim();
  return content.split(",").map(Number);
}

function getParamValue(program, position, mode) {
  const value = program[position];
  if (mode === 0) {
    // Position mode
    return program[value];
  } else {
    // Immediate mode
    return value;
  }
}

function runIntcode(program, input) {
  const memory = [...program];
  let ip = 0;
  const outputs = [];

  while (true) {
    const instruction = memory[ip];
    const opcode = instruction % 100;
    // Hundreds digit
    const mode1 = Math.floor(instruction / 100) % 10;
    // Thousands digit
    const mode2 = Math.floor(instruction / 1000) % 10;

    if (opcode === 99) break;

    if (opcode === 1) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      const param2 = getParamValue(memory, ip + 2, mode2);
      const outputPos = memory[ip + 3];
      memory[outputPos] = param1 + param2;
      ip += 4;
    } else if (opcode === 2) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      const param2 = getParamValue(memory, ip + 2, mode2);
      const outputPos = memory[ip + 3];
      memory[outputPos] = param1 * param2;
      ip += 4;
    } else if (opcode === 3) {
      const outputPos = memory[ip + 1];
      memory[outputPos] = input;
      ip += 2;
    } else if (opcode === 4) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      outputs.push(param1);
      ip += 2;
    } else if (opcode === 5) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      const param2 = getParamValue(memory, ip + 2, mode2);
      if (param1 != 0) {
        ip = param2;
      } else {
        ip += 3;
      }
    } else if (opcode === 6) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      const param2 = getParamValue(memory, ip + 2, mode2);
      if (param1 == 0) {
        ip = param2;
      } else {
        ip += 3;
      }
    } else if (opcode === 7) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      const param2 = getParamValue(memory, ip + 2, mode2);
      const param3 = getParamValue(memory, ip + 3, 1);
      if (param1 < param2) {
        memory[param3] = 1;
      } else {
        memory[param3] = 0;
      }
      ip += 4;
    } else if (opcode === 8) {
      const param1 = getParamValue(memory, ip + 1, mode1);
      const param2 = getParamValue(memory, ip + 2, mode2);
      const param3 = getParamValue(memory, ip + 3, 1);
      if (param1 == param2) {
        memory[param3] = 1;
      } else {
        memory[param3] = 0;
      }
      ip += 4;
    } else {
      throw new Error(`Unknown opcode: ${opcode} at position ${ip}`);
    }
  }

  return outputs;
}

const path = require("path");
const program = parseInput(path.join(__dirname, "input.txt"));
const outputs = runIntcode(program, 5);

console.log("Outputs:", outputs);

const diagnosticTests = outputs.slice(0, -1);
const allTestsPassed = diagnosticTests.every((test) => test === 0);

if (allTestsPassed) {
  console.log("Diagnostics Passed");
} else {
  console.log("Diagnostics Failed:", diagnosticTests);
}

console.log("Code:", outputs[outputs.length - 1]);
