const display = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let previousInput = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
  display.value = currentInput;
}

function handleNumber(num) {
  if (currentInput === '0' || shouldReset) {
    currentInput = num;
    shouldReset = false;
  } else {
    currentInput += num;
  }
}

function handleOperator(op) {
  if (operator && !shouldReset) {
    currentInput = calculate(previousInput, currentInput, operator);
  }
  operator = op;
  previousInput = currentInput;
  shouldReset = true;
}

function calculate(first, second, op) {
  const a = parseFloat(first);
  const b = parseFloat(second);

  if (isNaN(a) || isNaN(b)) return '0';

  switch (op) {
    case '+': return (a + b).toString();
    case '-': return (a - b).toString();
    case '*': return (a * b).toString();
    case '/': return b !== 0 ? (a / b).toString() : 'Error';
    default: return second;
  }
}

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  const val = e.target.value;

  if (!isNaN(val)) {
    handleNumber(val);
  } else if (val === '.') {
    if (!currentInput.includes('.')) {
      currentInput += '.';
    }
  } else if (val === 'all-clear') {
    currentInput = '0';
    previousInput = null;
    operator = null;
    shouldReset = false;
  } else if (val === '=') {
    if (operator !== null) {
      currentInput = calculate(previousInput, currentInput, operator);
      operator = null;
      previousInput = null;
      shouldReset = true;
    }
  } else {
    handleOperator(val);
  }

  updateDisplay();
});

updateDisplay();
