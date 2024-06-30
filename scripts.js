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
    // Check that operator and right operand DOES NOT EXIST to guarantee left operand needs to be filled in first
    // also checks if beginning number is 0 (meaning you cannot add numbers further (unless decimal))
    if ( !operator && !rightOperand && leftOperand.charAt(0) !== '0' ) {
        leftOperand += num;
    } 
    // Check that left operand and operator DOES EXIST to guarantee right operand needs to be filled in next
    // also checks if beginning number is 0 (meaning you cannot add numbers further (unless decimal))
    else if ( leftOperand && operator && rightOperand.charAt(0) !== '0' ) {
        rightOperand += num;
    }
}   

function setOperator(op) {
    // Check that left operand DOES EXIST and right operand DOES NOT EXIST to guarantee operator needs to be filled in next
    if (leftOperand && !rightOperand) {
        operator = op;
    }
    // Check all parts of equation needed EXIST to operate to guarantee that equation needs to be evaluated and new operator needs to be filled in after calculation
    else if (leftOperand && operator && rightOperand) {
        leftOperand = operate(leftOperand, rightOperand, operator).toString()
        operator = op;
        rightOperand = '';
        updateDisplay();
    }
}

function updateDisplay() {
    displayTextOutput.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}

function clearDisplay() {
    leftOperand = '';
    rightOperand = '';
    operator = ''; 
    updateDisplay();
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