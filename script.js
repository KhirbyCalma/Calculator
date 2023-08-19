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
    if (!firstOperand && !currentOperator && !secondOperand && !finalResult){
        previousDisplayOutput.textContent = NON_BREAKING_SPACE;
        currentDisplayOutput.textContent = `Calculator`;
    }
    // first operand, by itself, goes in current display
    else if (firstOperand && !currentOperator && !secondOperand && !finalResult){
        previousDisplayOutput.textContent = NON_BREAKING_SPACE;
        currentDisplayOutput.textContent = `${firstOperand}`;
    }
    // first operand and current operator goes to previous display while current display blank for second operand
    else if (firstOperand && currentOperator && !secondOperand && !finalResult) {
        previousDisplayOutput.textContent = `${firstOperand} ${currentOperator}`;
        currentDisplayOutput.textContent = NON_BREAKING_SPACE;
    }
    // first operand and current operator goes to previous display while current display for second operand
    else if (firstOperand && currentOperator && secondOperand && !finalResult) {
        previousDisplayOutput.textContent = `${firstOperand} ${currentOperator}`;
        currentDisplayOutput.textContent = `${secondOperand}`;
    }
    // 
    else if (firstOperand && currentOperator && secondOperand && finalResult) {
        previousDisplayOutput.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
        currentDisplayOutput.textContent = `${finalResult}`;
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
    if (firstOperand && currentOperator && secondOperand && finalResult){
        finalResult = '';
    }
    else if (firstOperand && currentOperator && secondOperand && !finalResult){
        secondOperand = secondOperand.slice(0, -1);
    }
    else if (firstOperand && currentOperator && !secondOperand && !finalResult){
        currentOperator = '';
    }
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