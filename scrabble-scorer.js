// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = ""
function initialPrompt() {
   console.log(`Let's play some Scrabble!\n`)
   word = input.question("Enter a word to score: ");
   return word;
};

let simpleScore = function(word){
  // word = word.toUpperCase();
  let letterPoints = word.length;
  return letterPoints
}

let vowelBonusScore = function(word){
  word = word.toUpperCase()
  let letterPoints = word.length;
  let vowels = ["A","E","I","O","U","Y"]
  for (let i = 0; i<word.length; i++){
    if(vowels.includes(word[i])){
      letterPoints += 2;
    }
  }
  return letterPoints;
}

let scrabbleScore = function(word){
  word = word.toLowerCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++){
    for(each in newPointStructure){
      if(each === word[i]){
        letterPoints = (letterPoints + Number(newPointStructure[each]));
      }
    }
  }
  return letterPoints;
}



let scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScore
  },
];

function scorerPrompt() {
  console.log(`Which scoring method would you like to use?\n`);
  let choice = ""
  for (let i = 0; i < scoringAlgorithms.length; i++){
    let option = scoringAlgorithms[i];
    console.log(`${i} - ${option.name}: ${option.description}`)
  }
  choice = Number(input.question("Enter 0, 1, or 2: "));
  return scoringAlgorithms[choice];
}

function transform(oldPointStructure) {
  let newPoints = {};
  for (pointValue in oldPointStructure){
    for (let i = 0; i < oldPointStructure[pointValue].length; i++){
      let upperLetter = oldPointStructure[pointValue][i];

      newPoints[upperLetter.toLowerCase()] = Number(pointValue);
    }
  }
  return newPoints;
} 


let newPointStructure = transform(oldPointStructure);


function runProgram() {
   let wordToScore = initialPrompt();
   let scoringObject=scorerPrompt();
   let score = scoringObject.scorerFunction(wordToScore);

  console.log(`Score for '${wordToScore}': ${score}`)
   
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

