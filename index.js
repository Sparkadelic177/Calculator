const rightSide = "right";
const leftSide = 'left';
const multiplication = "*";
const division = "/";
const addition = "+"
const subtraction = "-"
let calculatorInputs = []; //holds all of the calculator inputs and displays on input
const calculatorKeyCharacters = [ division, multiplication, addition, subtraction ]
const result = document.getElementById("result");

//event bubbling to all of the buttons with the class of .calculatorInput
window.addEventListener("click", function (event) {
  if (!event.target.matches(".calculatorInput")) return;
  calcButtonClickHandler(event.target.value);
});

//handles every button click on the calculator
function calcButtonClickHandler(value) {
  switch (value) {
    case "=":
      evaluate();
      break;
    case "c":
      clear();
      break;
    case "undo":
      undo();
      break;
    default:
      calculatorInputs.push(value);
      displayOnInput();
      break;
  }
}

//This folllows order of operations
function evaluate() {
    multiplyOrDivide();
    addOrSubtract();
    displayOnInput()
}


//divides two numbers together
function divide(){
  if(calculatorInputs.includes(division)){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(division)-1, leftSide, division);
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(division)+1, rightSide, division);
    let answer = leftHandSide / rightHandSide;
    replaceOperationWithValue(division, answer)
  }
}

//multiplys two numbers together
function multiply(){
  if(calculatorInputs.includes(multiplication)){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(multiplication)-1, leftSide, multiplication);
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(multiplication)+1, rightSide, multiplication);
    let answer = leftHandSide * rightHandSide;
    replaceOperationWithValue(multiplication, answer)
  }
}

//adds two numbers together
function add(){
  if(calculatorInputs.includes(addition)){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(addition)-1, leftSide, addition);
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(addition)+1, rightSide, addition);
    let answer = parseInt(leftHandSide) + parseInt(rightHandSide);
    replaceOperationWithValue(addition, answer)
  }
}

//subtracts two numbers togther
function subtract(){
  if(calculatorInputs.includes(subtraction)){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(subtraction)-1, leftSide, subtraction);
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf(subtraction)+1, rightSide, subtraction);
    let answer = leftHandSide - rightHandSide;
    replaceOperationWithValue(subtraction, answer)
  }
}

//handles muliplication or division left to right recusivley 
function multiplyOrDivide(){
  if(calculatorInputs.indexOf(multiplication) > calculatorInputs.indexOf(division)){
    divide();
    if(calculatorInputs.includes(division)){
      multiplyOrDivide();
    }
    multiply();
    if(calculatorInputs.includes(multiplication)){
      multiplyOrDivide();
    }
  }else if(calculatorInputs.indexOf(division) > calculatorInputs.indexOf(multiplication)){
    multiply();
    if(calculatorInputs.includes(multiplication)){
      multiplyOrDivide();
    }
    divide();
    if(calculatorInputs.includes(division)){
      multiplyOrDivide();
    }
  }
}

//handles addition or subtraction left to right recusivly 
function addOrSubtract(){
  if(calculatorInputs.indexOf(addition) > calculatorInputs.indexOf(subtraction)){
    subtract();
    if(calculatorInputs.includes(subtraction)){
      addOrSubtract();
    }
    add();
    if(calculatorInputs.includes(addition)){
      addOrSubtract();
    }
  }else if(calculatorInputs.indexOf(subtraction) > calculatorInputs.indexOf(addition)){
    add();
    if(calculatorInputs.includes(addition)){
      addOrSubtract();
    }
    subtract();
    if(calculatorInputs.includes(subtraction)){
      addOrSubtract();
    }
  }
}

//builds the number for the left or right side of the operator
function buildNumber(equation, operationIndex, side, operator){
  let numberBuilder = []

  //builds the number of left side of the operator
  if(side === leftSide){
    let leftSideCounter = 0;
    while(operationIndex >= 0) { 
      //if we reach a operator, replace single number strings together and return
      if(calculatorKeyCharacters.includes(equation[operationIndex])){
        calculatorInputs.splice(operationIndex + 1,leftSideCounter, numberBuilder.join(""));
        return numberBuilder.join("");
      } 
      //unshift the strings of the left side number of the operator
      numberBuilder.unshift(equation[operationIndex]);
      operationIndex -= 1; 
      leftSideCounter+= 1;
    }
    //replace the single string numbers with the numberBuilder of the left side
    calculatorInputs.splice(operationIndex + 1,leftSideCounter, numberBuilder.join(""));
  }


  //builds the right side of the operator 
  if(side === rightSide){
    let rightSideCounter = 0;
    while(operationIndex < equation.length) { 
      //if we reach a operator, replace single number strings together and return
      if(calculatorKeyCharacters.includes(equation[operationIndex])) {
        calculatorInputs.splice(calculatorInputs.indexOf(operator) + 1,rightSideCounter, numberBuilder.join(""));
        return numberBuilder.join("");
      } 
      //push the strings of the right side number of the operator
      numberBuilder.push(equation[operationIndex]);
      operationIndex += 1; 
      rightSideCounter += 1;
    }
    //replace the single number strings with the numberBuilder of the right side
    calculatorInputs.splice(calculatorInputs.indexOf(operator) + 1,rightSideCounter, numberBuilder.join(""));
  }

  return numberBuilder.join(""); 
}

//pops the last number in the array
function undo(){
  calculatorInputs.pop();
  displayOnInput();
}

//restart the calculatorInputs array
function clear() {
  calculatorInputs = [];
  displayOnInput();
}

//displays the contexts on to the calculator
function displayOnInput() {
  result.value = calculatorInputs.join("");
}

function replaceOperationWithValue(operator, answer){
  calculatorInputs.splice(calculatorInputs.indexOf(operator) - 1, 3, answer);
}
