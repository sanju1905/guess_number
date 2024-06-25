const readLine = require("readline");
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const player = {
  username: "",
  attempts: 0,
};

const options = {
  max: 100,
  min: 1,
  goal: -1,
  thresh: 5,
  maxAttempts: 10,
};
function setGoal() {
  console.log("Generating the Goal");
  const goal = Math.floor(
    Math.random() * (options.max - options.min + 1) + options.min
  );
  options.goal = goal;
  console.log("Goal Generated Goal successfully");
  takeguess();
}
function user() {
  rl.question("May i know ur Name:", (name) => {
    console.log("Hello " + name);
    player.username = name;
    setGoal();
  });
}
const maxThresh = options.goal + options.thresh;
const minThresh = options.goal - options.thresh;
function takeguess() {
  rl.question("Guess any Random value:", (guess) => {
    if(isNaN(Number(guess))){
        console.log("Enter the Valid Number.")
        process.exit(0);
    }
    if (guess == options.goal) {
      console.log(`You found it Congratulations in ${player.attempts}`);
      rl.close;
      process.exit(0);
    } else if (guess < maxThresh && guess > minThresh) {
      console.log("You are too Close");
    } else {
      if (guess > options.goal) {
        console.log("Guess less");
      } else {
        console.log("Guess higher");
      }
    }

    player.attempts += 1;

    if (player.attempts > options.maxAttempts - 1) {
      console.log("You are Exceeded Max Attempts");
      rl.close;
      process.exit(0);
    } else {
      takeguess();
    }
  });
}

user();
