const buttons = document.querySelectorAll('.btn');
const resultDisplay = document.querySelector('.result');
const previousDisplay = document.querySelector('.previous');

let currentInput = '0';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText;

    if (!isNaN(value) || value === '.') {
      handleNumber(value);
    } else if (value === 'AC') {
      resetCalculator();
    } else if (value === '←') {
      backspace();
    } else if (value === '+/-') {
      toggleSign();
    } else if (value === '%') {
      percentage();
    } else if (value === '=') {
      calculate();
    } else {
      handleOperator(value);
    }

    updateDisplay();
  });
});

function handleNumber(num) {
  if (currentInput === '0' || resultDisplayed) {
    currentInput = num;
    resultDisplayed = false;
  } else {
    currentInput += num;
  }
}

function handleOperator(op) {
  if (operator) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '0';

  previousDisplay.innerText = `${previousInput} ${operator}`;
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '−':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      if (current === 0) {
        result = 'Error';
      } else {
        result = prev / current;
        result = parseFloat(result.toFixed(6)); 
      }
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  resultDisplayed = true;

  previousDisplay.innerText = '';
}

function resetCalculator() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  resultDisplayed = false;
  previousDisplay.innerText = '';
}

function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
}

function percentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
}

function updateDisplay() {
  resultDisplay.innerText = currentInput;

  resultDisplay.classList.add('pop');
  setTimeout(() => {
    resultDisplay.classList.remove('pop');
  }, 200);
}
