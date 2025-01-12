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

const clear = document.querySelector('#clear');
const display = document.querySelector('#display');
const equal = document.querySelector('#equal');
clear.addEventListener('click', () => {
    display.textContent = '';
    expression = '';
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
        display.textContent += element.textContent;
        expression += ` ${element.textContent} `;
        console.log(expression);
    })
})


equal.addEventListener('click', () => {
    const token = expression.split(' ');
    console.log(token);
    let result = parseInt(token[0]);

    for (let i = 1; i < token.length; i += 2) {
        const operator = token[i];
        const nextNumber = parseInt(token[i + 1]);

        result = operate(result, operator, nextNumber);
        if (isNaN(result)) {
            result = 'ERROR!';
            break;
        }

    }

    display.textContent = result;
    expression = result.toString();
})

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