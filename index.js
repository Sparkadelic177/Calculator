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



let calculatorInputs = [];
const result = document.getElementById("result");
let buildNumber = "";
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
      calculatorInputs = [];
      break;
    case "/":
    case "*":
    case "+":
    case "-":
    case "(":
    case ")":
      buildEquation(value)
    default:
      buildNumber += value
      break;
  }
  displayOnInput();
}

function buildEquation(value){
  if(buildNumber != ""){ 
    calculatorInputs.push(buildNumber);
  }
  calculatorInputs.push(value)
  buildNumber = "";
}

//this function follows PEMDAS order
function evaluate() {
  let paraenthesis = false;
  do{ 
    let equationInsideParenthesis = checkForParenthesis(); //check for undefinded
    if(equationInsideParenthesis){
      // paraenthesis = true;
      multiplyOrDivide(equationInsideParenthesis);
      additionOrSubtraction(equationInsideParenthesis);

      displayOnInput()
    }else{
      paraenthesis = false;

    }
  }while(paraenthesis);
}


function multiplyOrDivide(equation){

  console.log(equation);

  if(equation.indexOf("*") > equation.indexOf("/")){
    equation = divide(equation);
    if(equation.includes("/")){
      multiplyOrDivide(equation);
    }
    equation = multiply(equation);
    if(equation.includes("*")){
      multiplyOrDivide(equation);
    }
  }else if(equation.indexOf("/") > equation.indexOf("*")){
    equation = multiply(equation);
    if(equation.includes("*")){
      multiplyOrDivide(equation);
    }
    equation = divide(equation);
    if(equation.includes("/")){
      multiplyOrDivide(equation);
    }
  }

  console.log(equation);
}

function multiply(equation){
  if(equation.includes("*")){
    let operationIndex = equation.indexOf("*");
    let leftHandSide = equation[operationIndex - 1];
    let rightHandSide = equation[operationIndex + 1];
    let answer = leftHandSide * rightHandSide;
    equation.splice(operationIndex - 1, 3, answer);
  }
  return equation;
}

function divide(equation){
  if(equation.includes("/")){
    let operationIndex = equation.indexOf("/");
    let leftHandSide = equation[operationIndex - 1];
    let rightHandSide = equation[operationIndex + 1];
    let answer = leftHandSide / rightHandSide;
    equation.splice(operationIndex - 1, 3, answer);
  }
  return equation;
}

function additionOrSubtraction(equation){

}

function replaceOperationWithValue(operator){
  // let operatorIndex = 
}


function checkForParenthesis(){
  let equationInsideParenthesis = [];
  for(let i = 0; i < calculatorInputs.length; i++){
    if(calculatorInputs[i] === "("){ //if open parenthesis found
      for(let j = i + 1; j < calculatorInputs.length; j++){
        if(calculatorInputs[j] === ')'){
          return equationInsideParenthesis;
        }
        equationInsideParenthesis.push(calculatorInputs[j]);
      }
    }
  }
  return; 
}

//displays the contexts on to the calculator
function displayOnInput() {
  result.value = calculatorInputs.join("");
}
