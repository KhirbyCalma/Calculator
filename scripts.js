// FUNCTIONS
function add(a, b) { return +a + +b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    } return a / b;
}

function convertOperatorToWord(operator) {
    // use charcodeat method to convert char to integer w/in utf-16 
    switch(operator.charCodeAt(0)) {
        // addition
        case (43):
            return "ADD";
        // subtraction
        case (8722):
            return "SUBTRACT";
        // multiplication
        case (215):
            return "MULTIPLY";
        // division
        case (247):
            return "DIVIDE";
        default:
            console.log("CONVERT OPERATOR TO WORD ERROR");
    }
}

function operate(leftOperand, rightOperand, operator) {
    switch (convertOperatorToWord(operator)) {
        case ("ADD"):
            return add(leftOperand, rightOperand);
        case ("SUBTRACT"):
            return subtract(leftOperand, rightOperand);
        case ("MULTIPLY"):
            return multiply(leftOperand, rightOperand);
        case ("DIVIDE"):
            return divide(leftOperand, rightOperand);
        default:
            console.log("OPERATE FUNCTION ERROR");
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
    // meaning there has to exist a left operand AND right operand not exist for an operator to be set
    if (leftOperand && !rightOperand) {
        operator = op;
    }
}

function updateDisplay() {
    displayTextOutput.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}

function clearDisplay() {
    leftOperand = '';
    rightOperand = '';
    operator = ''; 
    displayTextOutput.textContent = '';
}

function deleteSingleCharDisplay() {
    // meaning right operand exist to be deleted first
    if (rightOperand) {
        rightOperand = rightOperand.slice(0, -1); 
    }
    // meaning right operand is gone and operator still exists
    else if (operator) {
        operator = '';
    }
    // meaning right operand AND operator is gone and left operand exists
    else if (leftOperand) {
        leftOperand = leftOperand.slice(0, -1); 
    }
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
const equalButton = document.getElementById("EQUAL");
equalButton.addEventListener("click", () => {
    // meaning every element of an math equation exists to be executed
    if (leftOperand && operator && rightOperand) {
        leftOperand = operate(leftOperand, rightOperand, operator).toString();
        rightOperand = '';
        operator = '';
        updateDisplay();
    }
});
const clearButton = document.getElementById("CLEAR");
clearButton.addEventListener("click", clearDisplay);
const deleteButton = document.getElementById("DELETE");
deleteButton.addEventListener("click", () => {
    deleteSingleCharDisplay();
    updateDisplay();
});