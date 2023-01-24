const calcPreviousOutput = document.getElementById('calculator-previous-output');
const calcCurrentOutput = document.getElementById('calculator-current-output');
const equalButton = document.getElementById('equal-button');
const clearButton = document.getElementById('clear-button');
const listNumbers = Array.from(document.getElementsByClassName('num-button'));
const listOperators = Array.from(document.getElementsByClassName('operator-button'));
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let finalResult = '';

listNumbers.forEach((numButton) => {
    numButton.addEventListener('click', (event) => {
        updateOperand(event.target.innerText);
        updateResult();
    });
});

listOperators.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (event) => {
        updateOperator(event.target.innerText);
        updateResult();
    });
});

equalButton.addEventListener('click', () => {
    if (firstOperand && currentOperator && secondOperand){
        finalResult = operate(currentOperator, stringToNumber(firstOperand), stringToNumber(secondOperand))
        updateResult();
    }
});

clearButton.addEventListener('click', () => {
    clearDisplay();
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    finalResult = '';
});

function updateOperand(operand){
    if (finalResult && firstOperand && currentOperator && secondOperand){
        firstOperand = operand;
        currentOperator = '';
        secondOperand = '';
        finalResult = '';
    }
    else if (!firstOperand && !currentOperator && !secondOperand){
        firstOperand = operand;
    }
    else if (firstOperand && !currentOperator && !secondOperand){
        firstOperand += operand;
    }
    else if (firstOperand && currentOperator && !secondOperand){
        secondOperand = operand;
    }
    else if (firstOperand && currentOperator && secondOperand){
        secondOperand += operand;
    }
}

function updateOperator(operator){
    if (firstOperand && !currentOperator && !secondOperand){
        currentOperator = operator;
    }
    else if (firstOperand && currentOperator && secondOperand){
        finalResult = operate(currentOperator, stringToNumber(firstOperand), stringToNumber(secondOperand))
        updateResult();
        firstOperand = finalResult;
        secondOperand = '';
        currentOperator = operator;
        finalResult = '';
    }
}

function updateResult(){
    calcPreviousOutput.textContent = `${firstOperand} ${currentOperator} ${secondOperand}`;
    calcCurrentOutput.textContent = finalResult;
}

function clearDisplay(){
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    calcPreviousOutput.textContent = '';
    calcCurrentOutput.textContent = '';
}

function stringToNumber(str){
    return Number(str);
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

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