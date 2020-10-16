// 1. User types on an event element that holds a inner text
// 2. Push that elements inner text into an array 
// 3. Display text to string on the output section. (Array.join())
// 4. When user click “ = “ parse the array checks for operators ( pass array to function to iterate through array )
// 5. Start checking for PEMDAS
// 6. Check the entire array for parenthesis, evaluate what’s inside of the parenthesis into a stack / recursion ( if no parenthesis found continue ) 
// 7. If parenthesis found, pass the the contents inside of the array into a new array and pass back into the parsing function and return the value inside that it into a new array.
// 8. Look for multiplication or division operators defined as “n” and splice from n-1 and n+1 and replace with new value 
// 9. Look for addition and subtraction operators defined as “n” and splice from n-1 and n+1 and replace with new value.
// 10. Once the array has one element of type number return that number


const rightSide = "right";
const leftSide = 'left';
let calculatorInputs = [];
const result = document.getElementById("result");
const calculatorKeyCharacters = [ "/", "*","+","-" ]
//event bubbling to all of the
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
    default:
      calculatorInputs.push(value);
      displayOnInput();
      break;
  }
}

//This folllows order of operations
function evaluate() {
    multiplyOrDivide();
    additionOrSubtraction();
    displayOnInput()
}


function multiplyOrDivide(){
  if(calculatorInputs.indexOf("*") > calculatorInputs.indexOf("/")){
    divide();
    if(calculatorInputs.includes("/")){
      multiplyOrDivide();
    }
    multiply();
    if(calculatorInputs.includes("*")){
      multiplyOrDivide();
    }
  }else if(calculatorInputs.indexOf("/") > calculatorInputs.indexOf("*")){
    multiply();
    if(calculatorInputs.includes("*")){
      multiplyOrDivide();
    }
    divide();
    if(calculatorInputs.includes("/")){
      multiplyOrDivide();
    }
  }
}

function divide(){
  if(calculatorInputs.includes("/")){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("/")-1, leftSide, "/");
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("/")+1, rightSide, "/");
    let answer = leftHandSide / rightHandSide;
    calculatorInputs.splice(calculatorInputs.indexOf("/") - 1, 3, answer);
  }
}


function multiply(){
  if(calculatorInputs.includes("*")){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("*")-1, leftSide, "*");
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("*")+1, rightSide, "*");
    let answer = leftHandSide * rightHandSide;
    calculatorInputs.splice(calculatorInputs.indexOf("*") - 1, 3, answer);
  }
}

//builds the number for the left or right side of the operator
function buildNumber(equation, operationIndex, side, operator){
  let numberBuilder = []
  if(side === leftSide){
    let leftSideCounter = 0;
    while(operationIndex >= 0) { 
      if(calculatorKeyCharacters.includes(equation[operationIndex])){
        calculatorInputs.splice(operationIndex + 1,leftSideCounter, numberBuilder.join(""));
        return numberBuilder.join("");
      } 
      numberBuilder.unshift(equation[operationIndex]);
      operationIndex -= 1; 
      leftSideCounter+= 1;
    }
    //replace the single string numbers together 
    calculatorInputs.splice(operationIndex + 1,leftSideCounter, numberBuilder.join(""));
  }


  if(side === rightSide){
    let rightSideCounter = 0;
    while(operationIndex < equation.length) { 
      if(calculatorKeyCharacters.includes(equation[operationIndex])) {
        calculatorInputs.splice(calculatorInputs.indexOf(operator) + 1,rightSideCounter, numberBuilder.join(""));
        return numberBuilder.join("");
      } 
      numberBuilder.push(equation[operationIndex]);
      operationIndex += 1; 
      rightSideCounter += 1;
    }
    calculatorInputs.splice(calculatorInputs.indexOf(operator) + 1,rightSideCounter, numberBuilder.join(""));
  }

  return numberBuilder.join("");
}


function additionOrSubtraction(){
  if(calculatorInputs.indexOf("+") > calculatorInputs.indexOf("-")){
    subtraction();
    if(calculatorInputs.includes("-")){
      additionOrSubtraction();
    }
    addition();
    if(calculatorInputs.includes("+")){
      additionOrSubtraction();
    }
  }else if(calculatorInputs.indexOf("-") > calculatorInputs.indexOf("+")){
    addition();
    if(calculatorInputs.includes("+")){
      additionOrSubtraction();
    }
    subtraction();
    if(calculatorInputs.includes("-")){
      additionOrSubtraction();
    }
  }
}

function addition(){
  if(calculatorInputs.includes("+")){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("+")-1, leftSide, "+");
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("+")+1, rightSide, "+");
    let answer = parseInt(leftHandSide) + parseInt(rightHandSide);
    calculatorInputs.splice(calculatorInputs.indexOf("+") - 1, 3, answer);
  }
}

function subtraction(){
  if(calculatorInputs.includes("-")){
    let leftHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("-")-1, leftSide, "-");
    let rightHandSide = buildNumber(calculatorInputs, calculatorInputs.indexOf("-")+1, rightSide, "-");
    let answer = leftHandSide - rightHandSide;
    calculatorInputs.splice(calculatorInputs.indexOf("-") - 1, 3, answer);
  }
}


// function checkForParenthesis(){
//   let equationInsideParenthesis = [];
//   for(let i = 0; i < calculatorInputs.length; i++){
//     if(calculatorInputs[i] === "("){ //if open parenthesis found
//       for(let j = i + 1; j < calculatorInputs.length; j++){
//         if(calculatorInputs[j] === ')'){
//           return equationInsideParenthesis;
//         }
//         equationInsideParenthesis.push(calculatorInputs[j]);
//       }
//     }
//   }
//   return; 
// }

//restart the calculator
function clear() {
  calculatorInputs = [];
  displayOnInput();
}

//displays the contexts on to the calculator
function displayOnInput() {
  result.value = calculatorInputs.join("");
}
