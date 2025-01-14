const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}



let expression = '';
let result = 0;


const clear = document.querySelector('#clear');
const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
const point = document.querySelector('#point');
const del = document.querySelector('#del');


const Delete = function () {
    display.textContent = display.textContent.slice(0, -1);

    const delLast = expression.split(' ');
    if (delLast.length > 0) {
        let lastElement = delLast[delLast.length - 1];

        if (lastElement.length > 1) {
            delLast[delLast.length - 1] = lastElement.slice(0, -1);
        }
        else {
            delLast.pop();
        }
    }

    expression = delLast.join(' ');
    console.log(expression);
}


del.addEventListener('click', Delete);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        Delete();
    }
    if ((event.key >= 0 && event.key <= 9) || event.key === '.') {
        let element = event.key;
        buttonPress(element);
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        let element = event.key;
        if (event.key === '*') {
            element = 'x';
        }
        if (event.key === '/') {
            element = '÷';
        }
        Operator(element);
    }
    if (event.key === '=') {
        evalExpression();
    }

})


clear.addEventListener('click', () => {
    display.textContent = '';
    expression = '';
    point.disabled = false;
    result = 0;
})

function buttonPress(element) {
    display.textContent += element;
    expression += element;
    decimalCheck(expression);
    console.log(expression);
}

const buttons = document.querySelectorAll('.number');
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        let element = event.target.textContent;
        buttonPress(element);
    })
})


const decimalCheck = function (expression) {

    const breakPoint = expression.split(' ');
    let n = breakPoint.length;
    if (breakPoint[0].includes('.')) {
        point.disabled = true;
    }
    point.disabled = false;
    if (breakPoint[n - 1].includes('.')) {
        point.disabled = true;
    }

}


function Operator(element) {
    if (element === '-') {
        if (expression === '') {
            expression = '0' + expression;
            display.textContent += '0';
        }
    }
    if (expression.includes('+') || expression.includes('-') || expression.includes('x') || expression.includes('÷')) {
        evalExpression();

    }
    display.textContent += element;
    expression += ` ${element} `;
    console.log(expression);
}


const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        let element = event.target.textContent;
        Operator(element);
    })
})


equal.addEventListener('click', () => {
    evalExpression();
})

const evalExpression = function () {
    console.log(expression);
    const token = expression.split(' ');
    console.log(token);
    let result = parseFloat(token[0]);
    if (isNaN(result)) {
        result = "ERROR!";
    }

    for (let i = 1; i < token.length; i += 2) {
        const operator = token[i];
        const nextNumber = parseFloat(token[i + 1]);

        if (isNaN(nextNumber)) {
            result = 'ERROR!';
            break;
        }

        result = operate(result, operator, nextNumber);
        if (result === Infinity || result === -Infinity) {
            result = "Don't divide by 0";
            break;
        }
        if (result % 1 !== 0) {
            result = result.toFixed(2);
        }

        if (isNaN(result)) {
            result = 'ERROR!';
            break;
        }

    }

    display.textContent = result;
    expression = result.toString();
}

const operate = function (a, sign, b) {
    switch (sign) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            break;
    }
}