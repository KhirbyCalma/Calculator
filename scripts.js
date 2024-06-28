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
console.log(displayTextOutput.textContent);