const balloon = document.getElementById("balloon");
const colors = ["red", "green", "blue"];
const originalSize = 200;
const maximumSize = 420;
let size = originalSize;
let colorIndex = 0;

function updateBalloon() {
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size}px`;
  balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener("click", function () {
  size += 10;
  colorIndex = (colorIndex + 1) % colors.length;

  if (size > maximumSize) {
    size = originalSize;
  }

  updateBalloon();
});

balloon.addEventListener("mouseleave", function () {
  size = Math.max(originalSize, size - 5);
  colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  updateBalloon();
});
