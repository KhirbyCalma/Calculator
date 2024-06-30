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

function setOperand(num) {
    // meaning operator has not been set (meaning left operand needs to be filled)
    if ( !operator ) {
        leftOperand += num;
    } 
    // meaning operator has been set (meaning left operand is locked in)
    else if (operator) {
        rightOperand += num;
    }
}   

function setOperator(op) {
    // meaning there has to exist a left operand for an operator to be set
    if (leftOperand) {
        operator = op;
    }
}

function updateDisplay() {
    displayTextOutput.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}

// VARIABLES 
let leftOperand = '';
let rightOperand = '';
let operator = '';

// QUERY SELECTORS
const displayTextOutput = document.querySelector(".display .text-output");
const numpadButtons = document.querySelectorAll(".numpad button.number");
for (const numberButton of numpadButtons) {
    numberButton.addEventListener("click", () => {
        setOperand(numberButton.textContent);
        updateDisplay();
});
}
const operatorButtons = document.querySelectorAll(".operators button.operator");
for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", () => {
        setOperator(operatorButton.textContent);
        updateDisplay();
    });
}