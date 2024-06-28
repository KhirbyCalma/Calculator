// FUNCTIONS
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    } return a / b;
}

function operate(leftOperand, rightOperand, operator) {
    switch (operator) {
        case ("ADD") :
            return add(leftOperand, rightOperand);
        case ("SUBTRACT"):
            return subtract(leftOperand, rightOperand);
        case ("MULTIPLY"):
            return multiply(leftOperand, rightOperand);
        case ("DIVIDE"):
            return divide(leftOperand, rightOperand);
        default:
            return "OPERATE FUNCTION ERROR";
    }
}

// VARIABLES 
let leftOperand;
let rightOperand;
let operator;

// QUERY SELECTORS
const displayTextOutput = document.querySelector(".display .text-output");
const numpadButtons = document.querySelectorAll(".numpad button.number");
for (const numberButton of numpadButtons) {
    numberButton.addEventListener("click", () => displayTextOutput.textContent += numberButton.textContent);
}
const operatorButtons = document.querySelectorAll(".operators button.operator");
for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", () => displayTextOutput.textContent += operatorButton.textContent);
}