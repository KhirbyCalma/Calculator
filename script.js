const calcPreviousOutput = document.getElementById('calculator-previous-output');
const calcCurrentOutput = document.getElementById('calculator-current-output');
const equalButton = document.getElementById('equal-button');
const clearButton = document.getElementById('clear-button');
const decimalButton = document.getElementById('decimal-button');
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

decimalButton.addEventListener('click', (event) => {
    updateOperand(event.target.innerText);
    updateResult();
});

function updateOperand(operand){
    if (finalResult && firstOperand && currentOperator && secondOperand){
        if (operand !== '.'){
            firstOperand = operand;
            currentOperator = '';
            secondOperand = '';
            finalResult = '';
        }
        else{
            firstOperand = `0${operand}`;
            currentOperator = '';
            secondOperand = '';
            finalResult = '';
        }
    }
    else if (!firstOperand && !currentOperator && !secondOperand){
        if (operand !== '.'){
            firstOperand = operand;
        }
        else{
            firstOperand = `0${operand}`
        }
    }
    else if (firstOperand && !currentOperator && !secondOperand){
        firstOperand += operand;
    }
    else if (firstOperand && currentOperator && !secondOperand){
        if (operand !== '.'){
            secondOperand = operand;
        }
        else{
            secondOperand = `0${operand}`
        }
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
    if (finalResult){
        calcCurrentOutput.textContent = `${firstOperand} ${currentOperator} ${secondOperand} = ${finalResult}`;
    }
    else{
        calcCurrentOutput.textContent = `${firstOperand} ${currentOperator} ${secondOperand}`;
    }
}

function clearDisplay(){
    firstOperand = '';
    secondOperand = '';
    currentOperator = '';
    calcCurrentOutput.textContent = String.fromCharCode(160);
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