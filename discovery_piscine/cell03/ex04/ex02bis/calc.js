$(function () {
  const $form = $("#calculator-form");
  const $leftInput = $("#left-number");
  const $rightInput = $("#right-number");
  const $operatorInput = $("#operator");
  const nonNegativeInteger = /^\d+$/;

  $form.on("submit", function (event) {
    event.preventDefault();

    const leftText = $leftInput.val().trim();
    const rightText = $rightInput.val().trim();
    const operator = $operatorInput.val();

    if (!nonNegativeInteger.test(leftText) || !nonNegativeInteger.test(rightText)) {
      window.alert("Error :(");
      return;
    }

    const left = Number(leftText);
    const right = Number(rightText);

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
});
