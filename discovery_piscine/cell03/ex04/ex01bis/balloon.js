$(function () {
  const $balloon = $("#balloon");
  const colors = ["red", "green", "blue"];
  const originalSize = 200;
  const maximumSize = 420;
  let size = originalSize;
  let colorIndex = 0;

  function updateBalloon() {
    $balloon.css({
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: colors[colorIndex]
    });
  }

  $balloon.on("click", function () {
    size += 10;
    colorIndex = (colorIndex + 1) % colors.length;

    if (size > maximumSize) {
      size = originalSize;
    }

    updateBalloon();
  });

  $balloon.on("mouseleave", function () {
    size = Math.max(originalSize, size - 5);
    colorIndex = (colorIndex - 1 + colors.length) % colors.length;
    updateBalloon();
  });
});
