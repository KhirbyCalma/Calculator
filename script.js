// CALCULATOR DISPLAY
const previousDisplayOutput = document.querySelector('#calculator-display #calculator-previous-output');
const currentDisplayOutput = document.querySelector('#calculator-display #calculator-current-output');
// CALCULATOR NUMBERS AND DECIMAL
const listNumpad = Array.from(document.querySelectorAll('#calculator-numpad .num-button'));
// CALCULATOR OPERATORS
const listOperators = Array.from(document.querySelectorAll('#calculator-operators .operator-button'));
// CALCULATOR EQUALS
const equalButton = document.querySelector('#calculator-operators #equal-button');
// CALCULATOR CLEAR
const clearButton = document.querySelector('#calculator-functions #clear-button');
// CALCULATOR DELETE
const deleteButton = document.querySelector('#calculator-functions #delete-button');
// CALCULATOR EQUATION COMPONENTS
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let finalResult = '';
// OTHER
const NON_BREAKING_SPACE = '\u00A0';

listNumpad.forEach((numButton) => {
    numButton.addEventListener('click', (event) => {
        // start new equation as previous equation already has been solved
        if (firstOperand && currentOperator && secondOperand && finalResult) clearDisplay();
        updateOperands(event.target.textContent);
        updateDisplay();
    });
});

function updateOperands(operand){
    // first operand only
    if (!firstOperand && !currentOperator && !secondOperand && !finalResult ||
        firstOperand && !currentOperator && !secondOperand && !finalResult) {
        firstOperand += operand;
    }
    // second operand only
    else if (firstOperand && currentOperator && !secondOperand && !finalResult ||
             firstOperand && currentOperator && secondOperand && !finalResult) {
        secondOperand += operand;
    }
}

listOperators.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (event) => {
        // continue next equation from previous equation (if the previous has its second operand OR final result)
        if (firstOperand && currentOperator && secondOperand && !finalResult ||
            firstOperand && currentOperator && secondOperand && finalResult) {
            firstOperand = operate(currentOperator, stringToNumber(firstOperand), stringToNumber(secondOperand));
            currentOperator = '';
            secondOperand = '';
            finalResult = '';
        }
        updateOperator(event.target.textContent);
        updateDisplay();
    });
});

function updateOperator(operator){
    // first operator
    if (firstOperand && !currentOperator && !secondOperand && !finalResult){
        currentOperator = operator;
    }
}

equalButton.addEventListener('click', () => {
    if (firstOperand && currentOperator && secondOperand && !finalResult) finalResult = operate(currentOperator, stringToNumber(firstOperand), stringToNumber(secondOperand));
    updateDisplay();
});

function updateDisplay(){
    // nothing inputted 
    if (!firstOperand && !currentOperator && !secondOperand && !finalResult){
        previousDisplayOutput.textContent = NON_BREAKING_SPACE;
        currentDisplayOutput.textContent = `Calculator`;
    }
    // first operand, by itself, goes in current display
    else if (firstOperand && !currentOperator && !secondOperand && !finalResult){
        previousDisplayOutput.textContent = NON_BREAKING_SPACE;
        currentDisplayOutput.textContent = `${stringToNumber(firstOperand).toLocaleString("en-US")}`;
    }
    // first operand and current operator goes to previous display while current display blank for second operand
    else if (firstOperand && currentOperator && !secondOperand && !finalResult) {
        previousDisplayOutput.textContent = `${stringToNumber(firstOperand).toLocaleString("en-US")} ${currentOperator}`;
        currentDisplayOutput.textContent = NON_BREAKING_SPACE;
    }
    // first operand and current operator goes to previous display while current display for second operand
    else if (firstOperand && currentOperator && secondOperand && !finalResult) {
        previousDisplayOutput.textContent = `${stringToNumber(firstOperand).toLocaleString("en-US")} ${currentOperator}`;
        currentDisplayOutput.textContent = `${stringToNumber(secondOperand).toLocaleString("en-US")}`;
    }
    // first operand, current operator, and second operand goes to previous display while current display for final result
    else if (firstOperand && currentOperator && secondOperand && finalResult) {
        previousDisplayOutput.textContent = `${stringToNumber(firstOperand).toLocaleString("en-US")} ${currentOperator} ${stringToNumber(secondOperand).toLocaleString("en-US")} =`;
        currentDisplayOutput.textContent = `${stringToNumber(finalResult).toLocaleString("en-US")}`;
    }
}

clearButton.addEventListener('click', clearDisplay);

function clearDisplay(){
    firstOperand = '';
    currentOperator = '';
    secondOperand = '';
    finalResult = '';
    previousDisplayOutput.textContent = NON_BREAKING_SPACE;
    currentDisplayOutput.textContent = `Calculator`;
}

deleteButton.addEventListener('click', () => {
    // only deletes calculated result
    if (firstOperand && currentOperator && secondOperand && finalResult){
        finalResult = '';
    }
    // deletes second operand character one at a time (once final result does not exist)
    else if (firstOperand && currentOperator && secondOperand && !finalResult){
        secondOperand = secondOperand.slice(0, -1);
    }
    // deletes current operator character(once final result and second operand does not exist)
    else if (firstOperand && currentOperator && !secondOperand && !finalResult){
        currentOperator = '';
    }
    // deletes first operand character one at a time (once final result, second operand, and first operand does not exist)
    else if (firstOperand && !currentOperator && !secondOperand && !finalResult){
        firstOperand = firstOperand.slice(0, -1);
    }
    updateDisplay();
});

function stringToNumber(str){ return Number(str); }

function add(a, b){ return a + b; }

function subtract(a, b){ return a - b; }

function multiply(a, b){ return a * b; }

function divide(a, b){ return a / b; }

function operate(operator, a, b){
    switch (operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
}