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
clear.addEventListener('click', () => {
    display.textContent = '';
    expression = '';
    result = 0;
})


const buttons = document.querySelectorAll('.number');
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        let element = event.target;
        display.textContent += element.textContent;
        expression += element.textContent;
        console.log(expression);
    })
})

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        let element = event.target;

        if (element.textContent === '-') {
            if (expression === '') {
                expression = '0' + expression;
                display.textContent += '0';
            }
        }
        if (expression.includes('+') || expression.includes('-') || expression.includes('x') || expression.includes('÷')) {
            evalExpression();

        }
        display.textContent += element.textContent;
        expression += ` ${element.textContent} `;
        console.log(expression);
    })
})


equal.addEventListener('click', () => {
    evalExpression();
})

const evalExpression = function () {
    console.log(expression);
    const token = expression.split(' ');
    console.log(token);
    let result = parseInt(token[0]);
    if (isNaN(result)) {
        result = "ERROR!";
    }

    for (let i = 1; i < token.length; i += 2) {
        const operator = token[i];
        const nextNumber = parseInt(token[i + 1]);

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