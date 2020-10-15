let calculatorInputs = [];
const result = document.getElementById("result");

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

function evaluate() {}

function clear() {
  calculatorInputs = [];
  displayOnInput();
}

//displays the contexts on to the screen
function displayOnInput() {
  result.value = calculatorInputs.join("");
}
