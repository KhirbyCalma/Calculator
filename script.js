const calcNumpad = document.getElementById('calculator-nums');
const calcOperators = document.getElementById('calculator-operators');
const calcPreviousOutput = document.getElementById('calculator-previous-output');
const calcCurrentOutput = document.getElementById('calculator-current-output');
const equalButton = document.getElementById('equal-button');
const clearButton = document.getElementById('clear-button');
const listNumpad = Array.from(calcNumpad.children);
const listOperators = Array.from(calcOperators.children);
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

listNumpad.forEach((numButton) => {
    numButton.addEventListener('click', (event) => {
        setOperand(event.target.innerText);
    });
});

listOperators.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (event) => {
        setOperator(event.target.innerText);
    });
});

equalButton.addEventListener('click', () => {
    if (firstOperand && currentOperator && secondOperand){
        updateResult(operate(currentOperator, stringToNumber(firstOperand), stringToNumber(secondOperand)));
    }
});

clearButton.addEventListener('click', () => {
    clear();
});

function setOperand(operand){
    if (!firstOperand && !currentOperator && !secondOperand){
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

function setOperator(operator){
    if (firstOperand && !currentOperator && !secondOperand){
        currentOperator = operator;
    }
}

function updateResult(result){
    calcPreviousOutput.textContent = `${firstOperand} ${currentOperator} ${secondOperand}`;
    calcCurrentOutput.textContent = result;
}

function clear(){
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
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