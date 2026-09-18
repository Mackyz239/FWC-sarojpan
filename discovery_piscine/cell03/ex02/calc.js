const form = document.getElementById("calculator-form");
const leftInput = document.getElementById("left-number");
const rightInput = document.getElementById("right-number");
const operatorInput = document.getElementById("operator");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const leftText = leftInput.value.trim();
  const rightText = rightInput.value.trim();
  const nonNegativeInteger = /^\d+$/;

  if (!nonNegativeInteger.test(leftText) || !nonNegativeInteger.test(rightText)) {
    window.alert("Error :(");
    return;
  }

  const left = Number(leftText);
  const right = Number(rightText);
  const operator = operatorInput.value;

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    window.alert("Error :(");
    return;
  }

  if ((operator === "/" || operator === "%") && right === 0) {
    window.alert("It's over 9000!");
    console.log("It's over 9000!");
    return;
  }

  let result;

  switch (operator) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      result = left / right;
      break;
    case "%":
      result = left % right;
      break;
    default:
      window.alert("Error :(");
      return;
  }

  window.alert(result);
  console.log(result);
});

window.setInterval(function () {
  window.alert("Please, use me...");
}, 30000);
