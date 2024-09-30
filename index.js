var clearButton = document.getElementById('clear');
var plusNeg = document.getElementById('toggle-sign');
var percent = document.getElementById('percent');
var display = document.getElementById('display');
var divide = document.getElementById('divide');
var add = document.getElementById('add');
var equals = document.getElementById('equals');
var subtract = document.getElementById('subtract');
var multiply = document.getElementById('multiply');
var decimal = document.getElementById('decimal');
var function1 = document.getElementById('power');
var numbers = [
    document.getElementById('n0'),
    document.getElementById('n1'),
    document.getElementById('n2'),
    document.getElementById('n3'),
    document.getElementById('n4'),
    document.getElementById('n5'),
    document.getElementById('n6'),
    document.getElementById('n7'),
    document.getElementById('n8'),
    document.getElementById('n9')
];

let currentValue = 0;
let storedValue = null;
let operation = '';
let newInput = true;

numbers.forEach(function(item, index) {
    item.addEventListener('click', function() {
        if (newInput) {
            display.value = '';
            newInput = false;
        }
        display.value += index;
    });
});

clearButton.addEventListener('click', function() {
    clear();
});

percent.addEventListener('click', function() {
    let currentValue = parseFloat(display.value);
    if (!isNaN(currentValue)) {
        display.value = currentValue / 100;
    }
});

function handleOperator(op) {
    if (storedValue === null) {
        storedValue = parseFloat(display.value);
    } else {
        performCalculation();
    }
    operation = op;
    newInput = true;
}

add.addEventListener('click', function() {
    handleOperator('+');
});

subtract.addEventListener('click', function() {
    handleOperator('-');
});

multiply.addEventListener('click', function() {
    handleOperator('*');
});

divide.addEventListener('click', function() {
    handleOperator('/');
});

decimal.addEventListener('click', function() {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
});

equals.addEventListener('click', function() {
    performCalculation();
    operation = '';
    newInput = true;
});

function performCalculation() {
    let secondValue = parseFloat(display.value);
    if (storedValue !== null && !isNaN(secondValue)) {
        if (operation === '+') {
            storedValue += secondValue;
        } else if (operation === '-') {
            storedValue -= secondValue;
        } else if (operation === '*') {
            storedValue *= secondValue;
        } else if (operation === '/') {
            if (secondValue !== 0) {
                storedValue /= secondValue;
            } else {
                alert("Cannot divide by zero");
                storedValue = 0;
            }
        }
        display.value = storedValue;
    }
}

plusNeg.addEventListener('click', function() {
    let currentValue = parseFloat(display.value);
    if (!isNaN(currentValue)) {
        display.value = currentValue * -1;
    }
});

document.addEventListener('keydown', function(event){
    if (event.key >= '0' && event.key <= '9') {
        handleNumberInput(event.key);
    }
    else if (event.key === '+') {
        handleOperator("+");
    }
    else if (event.key === '-') {
        handleOperator('-');
    }
    else if (event.key === '*') {
        handleOperator('*');
    }
    else if (event.key === '/') {
        handleOperator('/');
    }
    else if (event.key === 'Enter') {
        performCalculation();
    }
    else if (event.key === 'Escape') {
        clear();
    }
});

function clear() {
    storedValue = null;
    display.value = '';
    currentValue = 0;
    newInput = true;
}

function handleNumberInput(number) {
    if (newInput) {
        display.value = '';
        newInput = false;
    }
    display.value += number;
}
