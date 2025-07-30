const commandMap = {
  dig: digFn,
  move: moveFn,
};

function digFn() {
  console.log("You are digging");
}

function moveFn() {
  console.log("You are moving");
}

export default commandMap;
